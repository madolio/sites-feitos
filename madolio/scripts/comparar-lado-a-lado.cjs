// Comparacao visual empilhada: preview commitado (esquerda) x captura atual
// da pagina no ar (direita), um projeto por linha. E o passo que confirma
// se o preview esta mesmo defasado ou se a diferenca medida era so quadro
// de animacao.
//
//   node scripts/comparar-lado-a-lado.cjs <pasta-da-auditoria> <slug...>
const sharp = require('sharp');
const path = require('path');

const SHOTS = process.argv[2];
const slugs = process.argv.slice(3);
if (!SHOTS || !slugs.length) {
  console.error('uso: node scripts/comparar-lado-a-lado.cjs <pasta-da-auditoria> <slug...>');
  process.exit(1);
}
const PREV = path.join(__dirname, '..', 'public', 'previews');
const L = 440, A = 275, ROT = 20;

(async () => {
  const comp = [];
  for (let i = 0; i < slugs.length; i++) {
    const s = slugs[i];
    const topo = i * (A + ROT) + ROT;
    const esq = await sharp(path.join(PREV, `${s}.jpg`)).resize(L, A, { fit: 'cover', position: 'top' }).toBuffer();
    const dir = await sharp(path.join(SHOTS, `${s}-hero.jpg`)).resize(L, A, { fit: 'cover', position: 'top' }).toBuffer();
    comp.push({ input: esq, left: 0, top: topo }, { input: dir, left: L, top: topo });
    comp.push({
      input: Buffer.from(
        `<svg width="${L * 2}" height="${ROT}"><rect width="${L * 2}" height="${ROT}" fill="#111"/>` +
        `<text x="6" y="15" font-family="monospace" font-size="13" fill="#0f0">${s} — PREVIEW (esq)</text>` +
        `<text x="${L + 6}" y="15" font-family="monospace" font-size="13" fill="#ff0">ATUAL NO AR (dir)</text></svg>`),
      left: 0, top: i * (A + ROT),
    });
  }
  const arquivo = path.join(SHOTS, `previews-lado-a-lado-${slugs[0]}.jpg`);
  await sharp({ create: { width: L * 2, height: slugs.length * (A + ROT), channels: 3, background: '#000' } })
    .composite(comp).jpeg({ quality: 80, mozjpeg: true }).toFile(arquivo);
  console.log('ok', arquivo);
})();
