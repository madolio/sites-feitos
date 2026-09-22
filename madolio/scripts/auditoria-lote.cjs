// Auditoria visual em lote: carrega cada site no ar e captura hero desktop,
// pagina inteira e mobile, junto com sinais objetivos (overflow horizontal,
// erros de pagina, altura, tempo de load). Nao altera nenhum projeto.
//
//   node scripts/auditoria-lote.cjs <pasta-saida> <slug...>
//
// Requer playwright (npx playwright install chromium). Rodar de dentro de
// madolio/, que e onde playwright e sharp estao instalados.
//
// ATENCAO (licao de auditorias anteriores): a rolagem aqui e LENTA de
// proposito. Rolar rapido nao da tempo dos reveals por scroll dispararem e
// a captura de pagina inteira sai com buracos enormes, que parecem bug de
// site mas sao artefato da captura. Nao reduza ESPERA_ROLAGEM sem saber
// disso. Secoes "pinadas" por scroll (ex.: estudio-alma) aparecem como
// vazio na captura de pagina inteira mesmo funcionando — confira com uma
// captura de viewport no meio do vazio antes de chamar de defeito.
const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const SLUGS = process.argv.slice(3);
if (!OUT || !SLUGS.length) {
  console.error('uso: node scripts/auditoria-lote.cjs <pasta-saida> <slug...>');
  process.exit(1);
}

const url = (s) => `https://${s}.fenoninho-max.workers.dev`;
const CONC = 4;
const PASSO_ROLAGEM = 250;
const ESPERA_ROLAGEM = 320;

async function rolar(page) {
  await page.evaluate(async ([passo, espera]) => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, espera));
    }
    window.scrollTo(0, 0);
  }, [PASSO_ROLAGEM, ESPERA_ROLAGEM]);
  await page.waitForTimeout(1500);
}

async function salvar(png, arquivo, larguraFinal, alturaMax) {
  let img = sharp(png);
  if (alturaMax) {
    const meta = await sharp(png).metadata();
    if (meta.height > alturaMax) {
      img = img.extract({ left: 0, top: 0, width: meta.width, height: alturaMax });
    }
  }
  await img.resize({ width: larguraFinal, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true }).toFile(arquivo);
}

async function auditar(browser, slug) {
  const r = { slug, url: url(slug), erros: [], ok: false };
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => r.erros.push(String(e.message).slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') r.erros.push('console: ' + m.text().slice(0, 160)); });
  try {
    const t0 = Date.now();
    await page.goto(r.url, { waitUntil: 'networkidle', timeout: 45000 });
    r.loadMs = Date.now() - t0;
    await page.waitForTimeout(2500);

    await salvar(await page.screenshot(), path.join(OUT, `${slug}-hero.jpg`), 900);

    await rolar(page);
    r.alturaPagina = await page.evaluate(() => document.body.scrollHeight);
    await salvar(await page.screenshot({ fullPage: true, timeout: 60000 }),
      path.join(OUT, `${slug}-full.jpg`), 760, 5200);

    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1200);
    await rolar(page);
    const m = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      culpados: [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 2)
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className || '').slice(0, 60)}`),
    }));
    r.mobileScrollW = m.scrollW;
    r.overflowPx = m.scrollW - m.clientW;
    r.overflowCulpados = r.overflowPx > 2 ? m.culpados : [];
    await salvar(await page.screenshot({ fullPage: true, timeout: 60000 }),
      path.join(OUT, `${slug}-mobile.jpg`), 360, 4200);
    r.ok = true;
  } catch (e) {
    r.falha = String(e.message).slice(0, 200);
  } finally {
    await ctx.close();
  }
  console.log(`${r.ok ? 'ok   ' : 'FALHA'} ${slug} overflow=${r.overflowPx ?? '?'} erros=${r.erros.length} ${r.falha || ''}`);
  return r;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
  });
  const fila = [...SLUGS];
  const res = [];
  await Promise.all(Array.from({ length: CONC }, async () => {
    while (fila.length) res.push(await auditar(browser, fila.shift()));
  }));
  await browser.close();
  res.sort((a, b) => SLUGS.indexOf(a.slug) - SLUGS.indexOf(b.slug));
  fs.writeFileSync(path.join(OUT, 'metrics.json'), JSON.stringify(res, null, 2));
  console.log('\nmetrics.json salvo em', OUT);
})();
