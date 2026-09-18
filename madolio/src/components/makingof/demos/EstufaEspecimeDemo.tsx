import { useState } from 'react'

// Espelha estufa/src/data/especies.ts (6 espécies) e a regra corDeTexto de
// estufa/src/components/EspecimeCard.tsx. Duplicado de propósito: é uma
// demonstração dentro do making-of.
const especies = [
  { id: 'strelitzia', cientifico: 'Strelitzia reginae', autor: 'Aiton', comum: 'Ave-do-paraíso', familia: 'Strelitziaceae', luz: 'sol pleno', agua: 'regas espaçadas, solo bem drenado — tolera curtos períodos de seca', floracao: 'outono ao início da primavera, pode florescer o ano todo em clima ameno', cuidado: 'moderado', cor: '#f2661a' },
  { id: 'aechmea', cientifico: 'Aechmea fasciata', autor: '(Lindl.) Baker', comum: 'Bromélia-prateada', familia: 'Bromeliaceae', luz: 'sombra filtrada', agua: 'manter água no "tanque" central da roseta, substrato só úmido', floracao: 'inflorescência dura de semanas a meses, geralmente na primavera', cuidado: 'fácil', cor: '#e0518c' },
  { id: 'heliconia', cientifico: 'Heliconia psittacorum', autor: 'L. f.', comum: 'Helicônia-papagaio', familia: 'Heliconiaceae', luz: 'sol pleno', agua: 'solo sempre úmido, rega frequente em clima quente', floracao: 'praticamente o ano todo em clima tropical, pico no verão', cuidado: 'fácil', cor: '#ff5a36' },
  { id: 'cattleya', cientifico: 'Cattleya labiata', autor: 'Lindl.', comum: 'Orquídea-nacional', familia: 'Orchidaceae', luz: 'sombra filtrada', agua: 'regar e deixar secar entre uma rega e outra — raiz encharcada apodrece', floracao: 'outono, floração breve e intensa (2 a 3 semanas)', cuidado: 'exigente', cor: '#c93fa0' },
  { id: 'zantedeschia', cientifico: 'Zantedeschia aethiopica', autor: '(L.) Spreng.', comum: 'Copo-de-leite', familia: 'Araceae', luz: 'meia-sombra', agua: 'solo sempre úmido a encharcado — tolera beira de lago ou chafariz', floracao: 'inverno à primavera', cuidado: 'moderado', cor: '#f0b429' },
  { id: 'tibouchina', cientifico: 'Tibouchina granulosa', autor: '(Desr.) Cogn.', comum: 'Quaresmeira', familia: 'Melastomataceae', luz: 'sol pleno', agua: 'rega regular até pegar, depois tolera estiagem curta', floracao: 'março a maio, coincidindo com a quaresma católica — daí o nome popular', cuidado: 'fácil', cor: '#7b4fd1' },
]

const MATA = '#10241c'
const VIDRO = '#f3efe1'

type RGB = [number, number, number]
const rgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const luminancia = ([r, g, b]: RGB) => {
  const lin = (c: number) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const contrasteRgb = (a: RGB, b: RGB) => {
  const la = luminancia(a)
  const lb = luminancia(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}
const misturar = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
const paraHex = (c: RGB) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

// Espelha seloDeFamilia de estufa/src/components/EspecimeCard.tsx: texto claro
// ou escuro, o de maior contraste WCAG; se nem o melhor chega a 4,5:1, o fundo
// é misturado 6% por vez na direção oposta (máx. 30 passos).
function seloDeFamilia(hex: string) {
  const escuro = rgb(MATA)
  const claro = rgb(VIDRO)
  let fundo = rgb(hex)
  for (let i = 0; i < 30; i++) {
    // mede a cor já arredondada pra hex — é a que o navegador de fato desenha
    const desenhada = rgb(paraHex(fundo))
    const cE = contrasteRgb(desenhada, escuro)
    const cC = contrasteRgb(desenhada, claro)
    if (Math.max(cE, cC) >= 4.5) return { fundo: paraHex(fundo), texto: cE >= cC ? MATA : VIDRO, razao: Math.max(cE, cC) }
    fundo = cC >= cE ? misturar(fundo, escuro, 0.06) : misturar(fundo, claro, 0.06)
  }
  return { fundo: paraHex(fundo), texto: VIDRO, razao: contrasteRgb(rgb(paraHex(fundo)), claro) }
}

export default function EstufaEspecimeDemo() {
  const [id, setId] = useState('strelitzia')
  const e = especies.find((x) => x.id === id) ?? especies[0]
  const selo = seloDeFamilia(e.cor)
  const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="min-w-0">
        <p id="est-esp" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
          Espécie do catálogo
        </p>
        <div role="group" aria-labelledby="est-esp" className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
          {especies.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={x.id === id}
              onClick={() => setId(x.id)}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm ${foco} ${
                x.id === id ? 'border-paper bg-paper/10 text-paper' : 'border-paper/30 text-fog'
              }`}
            >
              <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: x.cor }} />
              <span className="min-w-0 italic">{x.cientifico}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0" aria-live="polite">
        <article className="overflow-hidden rounded-lg bg-[#faf8f1] text-[#10241c]">
          <div className="h-1.5" style={{ backgroundColor: e.cor }} />
          <div className="relative">
            <img src={`/makingof/estufa/${e.id}.jpg`} alt={`Foto de ${e.comum} (${e.cientifico})`} width={480} height={360} className="block h-48 w-full object-cover sm:h-56" />
            <span
              className="absolute top-3 right-3 rounded-full px-2.5 py-1 font-mono text-xs tracking-wider uppercase"
              style={{ backgroundColor: selo.fundo, color: selo.texto }}
            >
              {e.familia}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-center font-accent text-2xl italic">
              {e.cientifico} <span className="text-sm not-italic text-[#10241c]/70">{e.autor}</span>
            </h3>
            <p className="text-center text-sm text-[#10241c]/75">{e.comum}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-[#d8cfb8] pt-4 text-sm">
              <div><dt className="text-[#10241c]/70">Luz</dt><dd>{e.luz}</dd></div>
              <div><dt className="text-[#10241c]/70">Cuidado</dt><dd className="font-semibold">{e.cuidado}</dd></div>
              <div className="col-span-2"><dt className="text-[#10241c]/70">Floração</dt><dd>{e.floracao}</dd></div>
              <div className="col-span-2"><dt className="text-[#10241c]/70">Água</dt><dd>{e.agua}</dd></div>
            </dl>
          </div>
        </article>
        <p className="mt-4 font-mono text-sm break-words text-fog">
          cor da flor {e.cor} (faixa do topo) · selo {selo.fundo} com texto {selo.texto} · contraste {selo.razao.toFixed(2).replace('.', ',')}:1
        </p>
      </div>
    </div>
  )
}
