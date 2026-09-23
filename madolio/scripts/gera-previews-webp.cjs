// Gera as variantes WebP (640w e 1280w) de cada public/previews/<slug>.jpg.
// HeroPreview.tsx serve via srcset: celular/grade de 3 colunas baixam a 640w
// (~22 kB) em vez do JPG de 1280w (~100 kB). Rodar depois de regerar um JPG.
//
//   node scripts/gera-previews-webp.cjs
const sharp = require('sharp');
const fs = require('fs');
const dir = 'public/previews';
(async () => {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.jpg'))) {
    const n = f.replace('.jpg', '');
    await sharp(`${dir}/${f}`).resize(640).webp({ quality: 80 }).toFile(`${dir}/${n}-640.webp`);
    await sharp(`${dir}/${f}`).resize(1280).webp({ quality: 80 }).toFile(`${dir}/${n}-1280.webp`);
  }
})();
