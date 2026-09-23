// Gera public/apple-touch-icon.png (180x180) a partir do favicon.svg de cada
// projeto do monorepo.
//
//   node scripts/gera-apple-icon.cjs [--dry]
//
// Por que PNG e nao o favicon.svg que ja existe: o iOS ignora SVG em
// apple-touch-icon. Apontar o link pro favicon existente passaria no HTTP 200
// e mesmo assim nao renderizaria icone nenhum na tela de inicio.
//
// Por que um arquivo por projeto e nao um asset global: cada projeto e um
// Worker num dominio proprio, entao nao existe origem compartilhada pra
// servir um icone unico — e o icone tem que ser a marca daquele projeto.
// Sao ~2.7 KB cada.
//
// O fundo e achatado de proposito: o iOS aplica a propria mascara arredondada
// e transforma canto transparente em preto. A cor vem, nesta ordem, do
// theme-color da pagina, do <rect>/<circle> de fundo do proprio favicon, ou
// do token --color-paper do projeto.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..', '..');
const DRY = process.argv.includes('--dry');

function corDeFundo(proj, svg) {
  const html = fs.readFileSync(path.join(RAIZ, proj, 'index.html'), 'utf8');
  const tema = (html.match(/name="theme-color"\s+content="(#[0-9a-fA-F]{3,8})"/) || [])[1];
  if (tema) return [tema, 'theme-color'];
  const forma = (svg.match(/<(?:rect|circle)[^>]*fill="(#[0-9a-fA-F]{3,8})"/) || [])[1];
  if (forma) return [forma, 'fundo do svg'];
  const css = path.join(RAIZ, proj, 'src', 'index.css');
  if (fs.existsSync(css)) {
    const tok = (fs.readFileSync(css, 'utf8')
      .match(/--color-(?:paper|papel|fundo|base|bg)\s*:\s*(#[0-9a-fA-F]{3,8})/) || [])[1];
    if (tok) return [tok, '--color-paper'];
  }
  return ['#ffffff', 'padrao'];
}

(async () => {
  const projs = fs.readdirSync(RAIZ, { withFileTypes: true })
    .filter((d) => d.isDirectory()
      && fs.existsSync(path.join(RAIZ, d.name, 'public/favicon.svg'))
      && fs.existsSync(path.join(RAIZ, d.name, 'index.html')))
    .map((d) => d.name);

  let total = 0;
  for (const p of projs) {
    const svg = fs.readFileSync(path.join(RAIZ, p, 'public/favicon.svg'), 'utf8');
    const [bg, origem] = corDeFundo(p, svg);
    const destino = path.join(RAIZ, p, 'public/apple-touch-icon.png');
    if (!DRY) {
      await sharp(Buffer.from(svg), { density: 384 })
        .resize(180, 180, { fit: 'contain', background: bg })
        .flatten({ background: bg })
        .png({ compressionLevel: 9, palette: true })
        .toFile(destino);
      total += fs.statSync(destino).size;
    }
    console.log(p.padEnd(15), bg.padEnd(9), origem);
  }
  console.log('\n' + projs.length + ' icones, ' + (total / 1024).toFixed(0) + ' KB no total');
})();
