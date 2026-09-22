// Compara o preview commitado (public/previews/<slug>.jpg) com a captura
// nova da pagina no ar (<slug>-hero.jpg da auditoria). Diferenca alta =
// preview provavelmente desatualizado.
//
//   node scripts/comparar-previews.cjs <pasta-da-auditoria>
//
// Duas limitacoes conhecidas, que o numero sozinho nao resolve:
//   1. paginas com animacao continua (shader, timeline) sempre diferem um
//      pouco entre dois carregamentos — o numero e evidencia, nao veredito;
//   2. o preview so enquadra o HERO, entao mudanca no miolo da pagina nunca
//      aparece aqui, por mais defasado que o card esteja.
// Confirme os suspeitos com comparar-lado-a-lado.cjs antes de decidir.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SHOTS = process.argv[2];
if (!SHOTS) {
  console.error('uso: node scripts/comparar-previews.cjs <pasta-da-auditoria>');
  process.exit(1);
}
const PREV = path.join(__dirname, '..', 'public', 'previews');
const L = 320, A = 200;

const normalizar = (arquivo) =>
  sharp(arquivo).resize(L, A, { fit: 'fill' }).removeAlpha().raw().toBuffer();

(async () => {
  const slugs = fs.readdirSync(SHOTS)
    .filter((f) => f.endsWith('-hero.jpg'))
    .map((f) => f.replace('-hero.jpg', ''));

  const linhas = [];
  for (const slug of slugs) {
    const pv = path.join(PREV, `${slug}.jpg`);
    if (!fs.existsSync(pv)) { linhas.push({ slug, estado: 'SEM_PREVIEW' }); continue; }
    try {
      const [a, b] = await Promise.all([normalizar(pv), normalizar(path.join(SHOTS, `${slug}-hero.jpg`))]);
      let soma = 0;
      for (let i = 0; i < a.length; i++) soma += Math.abs(a[i] - b[i]);
      const diff = +(soma / a.length / 255 * 100).toFixed(1);
      linhas.push({ slug, diff, estado: diff >= 12 ? 'MUITO_DIFERENTE' : diff >= 5 ? 'DIFERENTE' : 'parecido' });
    } catch (e) {
      linhas.push({ slug, estado: 'ERRO', erro: String(e.message).slice(0, 80) });
    }
  }

  linhas.sort((x, y) => (y.diff ?? -1) - (x.diff ?? -1));
  for (const l of linhas) {
    console.log(String(l.diff ?? '-').padStart(5), l.estado.padEnd(16), l.slug, l.erro || '');
  }
  fs.writeFileSync(path.join(SHOTS, 'previews-diff.json'), JSON.stringify(linhas, null, 2));
})();
