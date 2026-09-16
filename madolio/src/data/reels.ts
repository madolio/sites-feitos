// Cada reel é o gesto de um segundo, não o site inteiro: um clipe curto em
// loop mostrando SÓ a interação de assinatura daquele projeto (a mesma que o
// CLAUDE.md de cada um chama de "gesto único"), capturado direto do site ao
// vivo via Puppeteer — não é mockup, é o site de verdade. Os arquivos ficam
// em `public/reels/<slug>.gif` (animado, sem áudio, codificado com `gifenc`
// a partir de screenshots do Puppeteer — sem depender de ffmpeg) + o mesmo
// slug com `.png` (o último quadro, servido no lugar do gif quando
// `prefers-reduced-motion: reduce` está ativo — ver `Reels.tsx`/`index.css`).
export type Reel = {
  slug: string
  projeto: string
  categoria: string
  legenda: string
  url: string
}

export const reels: Reel[] = [
  {
    slug: 'taca',
    projeto: 'Taça',
    categoria: 'Vinícola de altitude',
    legenda: 'A roda de aromas de sommelier filtra os rótulos — cada categoria já vem da nota de degustação de algum vinho.',
    url: 'https://taca.fenoninho-max.workers.dev',
  },
  {
    slug: 'torno',
    projeto: 'Torno',
    categoria: 'Ateliê de cerâmica',
    legenda: 'Molde, esmalte e leve ao forno — uma peça de cerâmica em 3D de verdade, do zero até sair pronta.',
    url: 'https://torno.fenoninho-max.workers.dev',
  },
  {
    slug: 'cerne',
    projeto: 'Cerne',
    categoria: 'Design de interiores',
    legenda: 'A navegação é a própria planta baixa — clique num cômodo pra ver o material por trás dele.',
    url: 'https://cerne.fenoninho-max.workers.dev',
  },
  {
    slug: 'calibre',
    projeto: 'Calibre',
    categoria: 'Relojoaria artesanal',
    legenda: 'O mostrador do relógio é a navegação: cada marcação da hora leva pra uma seção do site.',
    url: 'https://calibre.fenoninho-max.workers.dev',
  },
  {
    slug: 'corte',
    projeto: 'Corte',
    categoria: 'Salão de beleza e barbearia',
    legenda: 'Puxe uma senha de verdade — o talão de atendimento de uma barbearia, na tela.',
    url: 'https://corte.fenoninho-max.workers.dev',
  },
  {
    slug: 'tinta',
    projeto: 'Tinta',
    categoria: 'Estúdio de tatuagem',
    legenda: 'Escolha a zona no corpo, escolha o desenho — o flash é carimbado ali na hora, se desenhando sozinho.',
    url: 'https://tinta.fenoninho-max.workers.dev',
  },
  {
    slug: 'ferro',
    projeto: 'Ferro',
    categoria: 'Academia old school',
    legenda: 'Uma calculadora de carga máxima de verdade (fórmula de Epley) — não só um número decorativo.',
    url: 'https://ferro.fenoninho-max.workers.dev',
  },
  {
    slug: 'pulso',
    projeto: 'Pulso',
    categoria: 'Personal training',
    legenda: 'Um traçado de monitor cardíaco corre sem parar no hero — o pulso do negócio, literalmente.',
    url: 'https://pulso.fenoninho-max.workers.dev',
  },
]
