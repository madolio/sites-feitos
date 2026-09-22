// Captura as 3 pecas do Prisma clicando nos botoes de escolha antes de
// tirar cada screenshot (shot.cjs sozinho nao clica, so screenshotta o
// estado inicial). Uso: node scripts/shot-pecas.cjs <url> <saida-prefixo>
const { chromium } = require('playwright');

const [url, outPrefix] = process.argv.slice(2);
if (!url || !outPrefix) {
  console.error('uso: node scripts/shot-pecas.cjs <url> <saida-prefixo>');
  process.exit(1);
}

const pecas = [
  { label: 'Anel', file: `${outPrefix}-anel.jpg` },
  { label: 'Colar', file: `${outPrefix}-colar.jpg` },
  { label: 'Pulseira', file: `${outPrefix}-pulseira.jpg` },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1000);

  for (const p of pecas) {
    await page.getByRole('button', { name: p.label, exact: true }).click();
    await page.waitForTimeout(6500); // deixa o timeline de construcao terminar
    await page.screenshot({ path: p.file });
    console.log(`ok ${p.file}`);
  }

  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
