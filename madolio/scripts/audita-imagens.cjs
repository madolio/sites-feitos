// Mede cada <img> da pagina no ar: quantos pixels o arquivo tem contra
// quantos pixels a tela realmente usa. Sobredimensionada = o navegador
// baixou muito mais do que precisava.
//
//   node scripts/audita-imagens.cjs <slug...>
const { chromium } = require('playwright');

const SLUGS = process.argv.slice(2);
if (!SLUGS.length) { console.error('uso: node scripts/audita-imagens.cjs <slug...>'); process.exit(1); }

async function medir(browser, slug, largura, dpr) {
  const ctx = await browser.newContext({ viewport: { width: largura, height: 900 }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  const bytes = {};
  page.on('response', async (r) => {
    if (/image/.test(r.headers()['content-type'] || '')) {
      try { bytes[r.url()] = (await r.body()).length; } catch {}
    }
  });
  try {
    await page.goto('https://' + slug + '.sneakpeek.workers.dev', { waitUntil: 'networkidle', timeout: 45000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2500);
    const imgs = await page.evaluate(() => [...document.querySelectorAll('img')].map((i) => ({
      src: i.currentSrc || i.src,
      nat: i.naturalWidth + 'x' + i.naturalHeight,
      natW: i.naturalWidth,
      css: Math.round(i.getBoundingClientRect().width) + 'x' + Math.round(i.getBoundingClientRect().height),
      cssW: Math.round(i.getBoundingClientRect().width),
      attrW: i.getAttribute('width'), attrH: i.getAttribute('height'),
      loading: i.getAttribute('loading'), fetchpriority: i.getAttribute('fetchpriority'),
      srcset: !!i.getAttribute('srcset'), sizes: i.getAttribute('sizes'),
    })));
    return imgs.map((i) => ({ ...i, slug, largura, dpr, kb: bytes[i.src] ? +(bytes[i.src] / 1024).toFixed(0) : null }));
  } catch (e) { console.log('FALHA', slug, largura, String(e.message).slice(0, 80)); return []; }
  finally { await ctx.close(); }
}

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const linhas = [];
  for (const s of SLUGS) {
    linhas.push(...await medir(browser, s, 1280, 1));
    linhas.push(...await medir(browser, s, 375, 2));
  }
  await browser.close();
  console.log('slug'.padEnd(14), 'vp'.padEnd(5), 'arquivo'.padEnd(11), 'na tela'.padEnd(10), 'KB'.padStart(5), ' precisa  w/h lazy  sobra');
  for (const l of linhas) {
    if (!l.cssW) continue;
    const precisa = l.cssW * l.dpr;
    const sobra = precisa ? (l.natW / precisa) : 0;
    console.log(l.slug.padEnd(14), (l.largura + 'px').padEnd(5), l.nat.padEnd(11), l.css.padEnd(10),
      String(l.kb ?? '-').padStart(5), String(precisa).padStart(6) + 'px',
      (l.attrW ? 'sim' : 'NAO').padEnd(4), (l.loading || '-').padEnd(6),
      sobra >= 1.6 ? sobra.toFixed(1) + 'x SOBREDIMENSIONADA' : sobra.toFixed(1) + 'x ok');
  }
  require('fs').writeFileSync('C:/Users/kik3p/AppData/Local/Temp/claude/c--Users-kik3p-OneDrive/6c7744b2-e6c0-4640-8538-d204cb15a288/scratchpad/imagens-medidas.json', JSON.stringify(linhas, null, 1));
})();
