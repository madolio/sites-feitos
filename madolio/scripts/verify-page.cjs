// Verificador padrão das páginas de making-of.
//
//   1) build privado (não use o dist compartilhado — vários agentes rodam ao mesmo tempo):
//        npx vite build --outDir .tmp-dist-<slug> --emptyOutDir
//   2) node scripts/verify-page.cjs .tmp-dist-<slug> projetos/<slug> [captura.png]
//   3) apague a pasta .tmp-dist-<slug> ao terminar.
//
// Checa, em 1280px e em 390px (celular): erros de console/página, rolagem
// horizontal (com os elementos culpados), quantidade de <h1>, <img> sem alt /
// width / height, imagens quebradas, target=_blank sem rel, e conteúdo com texto
// preso em opacidade ~0 depois de rolar a página inteira (Reveal que não disparou).
// Sai com código 1 se achar algo bloqueante.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [distArg, rotaArg, shot] = process.argv.slice(2);
if (!distArg || !rotaArg) { console.error('uso: node scripts/verify-page.cjs <outDir> <rota> [captura.png]'); process.exit(2); }
const dir = path.resolve(distArg);
const rota = rotaArg.replace(/^[/]+/, '');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  let f = path.join(dir, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(dir, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0, async () => {
  const port = server.address().port;
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  let bloqueante = 0;
  const marca = (ok, msg, grave = true) => { console.log((ok ? '  ok   ' : grave ? '  FALHA ' : '  aviso ') + msg); if (!ok && grave) bloqueante++; };

  for (const [w, h, nome] of [[1280, 900, 'desktop 1280'], [390, 844, 'celular 390']]) {
    console.log(`\n== ${nome}`);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const erros = [];
    page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') erros.push('console: ' + m.text()); });
    await page.goto(`http://localhost:${port}/${rota}`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(800);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1600);

    marca(erros.length === 0, erros.length ? 'erros: ' + erros.slice(0, 3).join(' || ') : 'sem erros de console/página');

    const r = await page.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      const culpados = [...document.querySelectorAll('body *')]
        .filter((e) => e.getBoundingClientRect().right > cw + 1 && getComputedStyle(e).position !== 'fixed')
        .slice(0, 4).map((e) => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 40));
      const imgs = [...document.querySelectorAll('img')];
      const preso = [...document.querySelectorAll('main *, header *, section *')].filter((e) => {
        if (e.closest('[aria-hidden="true"], .sr-only')) return false;
        if (!(e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 3))) return false;
        let n = e, op = 1; while (n && n !== document.documentElement) { op *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; }
        return op < 0.05 && e.getBoundingClientRect().height > 0;
      }).slice(0, 3).map((e) => e.textContent.trim().slice(0, 40));
      return {
        sw: document.documentElement.scrollWidth, cw, culpados,
        h1: document.querySelectorAll('h1').length,
        semAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
        semDim: imgs.filter((i) => !(i.getAttribute('width') && i.getAttribute('height'))).map((i) => i.getAttribute('src')).slice(0, 4),
        quebradas: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')).slice(0, 4),
        semRel: [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !/noreferrer|noopener/.test(a.rel)).length,
        preso,
      };
    });
    marca(r.sw <= r.cw, r.sw <= r.cw ? `sem rolagem horizontal (${r.sw}/${r.cw})` : `ROLAGEM HORIZONTAL ${r.sw}>${r.cw} — culpados: ${r.culpados.join(', ')}`);
    marca(r.h1 === 1, `<h1>: ${r.h1} (esperado 1)`);
    marca(r.semAlt === 0, `<img> sem alt: ${r.semAlt}`);
    marca(r.semDim.length === 0, r.semDim.length ? 'img sem width/height: ' + r.semDim.join(', ') : 'todas as <img> têm width/height', false);
    marca(r.quebradas.length === 0, r.quebradas.length ? 'imagens quebradas: ' + r.quebradas.join(', ') : 'nenhuma imagem quebrada');
    marca(r.semRel === 0, `links _blank sem rel: ${r.semRel}`);
    marca(r.preso.length === 0, r.preso.length ? 'texto preso em opacidade 0: ' + r.preso.join(' | ') : 'nenhum texto preso em opacidade 0');
    if (shot && w === 1280) { await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300); await page.screenshot({ path: shot, fullPage: true }); console.log('  captura:', shot); }
    await page.close();
  }
  await browser.close(); server.close();
  console.log(bloqueante ? `\nRESULTADO: ${bloqueante} problema(s) bloqueante(s)` : '\nRESULTADO: tudo ok');
  process.exit(bloqueante ? 1 : 0);
});
