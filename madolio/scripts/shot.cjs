// Ferramenta de captura pros making-of — screenshot real de um site no ar.
//
//   node scripts/shot.cjs <url> <saida.jpg> [--sel "#id"] [--w 1280] [--h 800]
//                         [--scroll] [--wait 1500] [--top N] [--crop-h N] [--click "sel"]
//
// --sel     captura só o elemento (rola até ele antes)
// --scroll  rola a página toda antes (dispara reveals e imagens lazy)
// --top/--crop-h  recorta a região vertical (px) da imagem final
// --click   clica em um seletor antes de capturar (ex.: trocar de aba/estado)
//
// Flags do Chromium ligam o WebGL por software (SwiftShader) pra os sites 3D
// renderizarem em headless. Requer `playwright` (npx playwright install chromium).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

const args = process.argv.slice(2);
const [url, out] = args;
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const flag = (n) => args.includes('--' + n);
if (!url || !out) { console.error('uso: node scripts/shot.cjs <url> <saida.jpg> [opções]'); process.exit(1); }

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'] });
  const page = await browser.newPage({ viewport: { width: Number(opt('w', 1280)), height: Number(opt('h', 800)) } });
  const erros = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(Number(opt('wait', 1500)));
  if (flag('scroll')) {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 350) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
  }
  const click = opt('click', null);
  if (click) { await page.click(click); await page.waitForTimeout(900); }
  const sel = opt('sel', null);
  let png;
  if (sel) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    png = await el.screenshot();
  } else {
    png = await page.screenshot();
  }
  await browser.close();
  let img = sharp(png);
  const top = opt('top', null), ch = opt('crop-h', null);
  if (top !== null && ch !== null) {
    const meta = await sharp(png).metadata();
    img = img.extract({ left: 0, top: Number(top), width: meta.width, height: Math.min(Number(ch), meta.height - Number(top)) });
  }
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  const info = await img.resize({ width: 1400, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log(`ok ${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB${erros.length ? '  (erros de página: ' + erros.length + ')' : ''}`);
})().catch((e) => { console.error(e.message); process.exit(1); });
