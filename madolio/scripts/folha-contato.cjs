// Monta folhas de contato (grades 3x3) com as capturas de auditoria, pra
// comparar muitos projetos lado a lado de uma vez — e enxergar repeticao de
// padrao (mesmo hero, mesma paleta, mesma estrutura), que so aparece na
// comparacao cruzada, nunca olhando um projeto por vez.
//
//   node scripts/folha-contato.cjs <pasta-da-auditoria> [hero|mobile|full]
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SHOTS = process.argv[2];
const TIPO = process.argv[3] || 'hero';
if (!SHOTS) {
  console.error('uso: node scripts/folha-contato.cjs <pasta-da-auditoria> [hero|mobile|full]');
  process.exit(1);
}

const CEL_L = 420, CEL_A = 280, COLS = 3, LINHAS = 3, ROTULO = 22;
const POR_FOLHA = COLS * LINHAS;

(async () => {
  const slugs = fs.readdirSync(SHOTS)
    .filter((f) => f.endsWith(`-${TIPO}.jpg`))
    .map((f) => f.replace(`-${TIPO}.jpg`, ''))
    .sort();

  for (let f = 0; f * POR_FOLHA < slugs.length; f++) {
    const lote = slugs.slice(f * POR_FOLHA, (f + 1) * POR_FOLHA);
    const comp = [];
    for (let i = 0; i < lote.length; i++) {
      const slug = lote[i];
      const col = i % COLS, lin = Math.floor(i / COLS);
      const img = await sharp(path.join(SHOTS, `${slug}-${TIPO}.jpg`))
        .resize(CEL_L, CEL_A, { fit: 'cover', position: 'top' }).toBuffer();
      comp.push({ input: img, left: col * CEL_L, top: lin * (CEL_A + ROTULO) + ROTULO });
      comp.push({
        input: Buffer.from(
          `<svg width="${CEL_L}" height="${ROTULO}"><rect width="${CEL_L}" height="${ROTULO}" fill="#111"/>` +
          `<text x="6" y="16" font-family="monospace" font-size="14" fill="#fff">${i + 1 + f * POR_FOLHA}. ${slug}</text></svg>`),
        left: col * CEL_L, top: lin * (CEL_A + ROTULO),
      });
    }
    const arquivo = path.join(SHOTS, `folha-${TIPO}-${f + 1}.jpg`);
    await sharp({ create: { width: COLS * CEL_L, height: LINHAS * (CEL_A + ROTULO), channels: 3, background: '#000' } })
      .composite(comp).jpeg({ quality: 78, mozjpeg: true }).toFile(arquivo);
    console.log('ok', arquivo, '—', lote.join(' '));
  }
})();
