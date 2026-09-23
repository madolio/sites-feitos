import type { Especie } from '../data/especies'
import EspecieIlustracao from './EspecieIlustracao'

const corCuidado: Record<Especie['cuidado'], string> = {
  fácil: 'text-musgo',
  moderado: 'text-terracota',
  exigente: 'text-terracota-hover',
}

// Selo de família na cor real da flor. Texto claro ou escuro, o que tiver mais
// contraste (WCAG); se nem o melhor chegar a 4,5:1, o fundo do selo é
// escurecido (ou clareado) aos poucos até passar. A faixa do topo do cartão
// continua na cor pura da flor — só o selo, que carrega texto, se ajusta.
const ESCURO = '#10241c'
const CLARO = '#f3efe1'

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function luminancia([r, g, b]: [number, number, number]) {
  const lin = (c: number) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contraste(a: [number, number, number], b: [number, number, number]) {
  const la = luminancia(a)
  const lb = luminancia(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

function misturar(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

const paraHex = (c: [number, number, number]) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

export function seloDeFamilia(hex: string) {
  const escuro = rgb(ESCURO)
  const claro = rgb(CLARO)
  let fundo = rgb(hex)
  for (let i = 0; i < 30; i++) {
    // mede a cor já arredondada pra hex — é a que o navegador de fato desenha
    const desenhada = rgb(paraHex(fundo))
    const cEscuro = contraste(desenhada, escuro)
    const cClaro = contraste(desenhada, claro)
    if (Math.max(cEscuro, cClaro) >= 4.5) {
      return { fundo: paraHex(fundo), texto: cEscuro >= cClaro ? ESCURO : CLARO }
    }
    fundo = cClaro >= cEscuro ? misturar(fundo, escuro, 0.06) : misturar(fundo, claro, 0.06)
  }
  return { fundo: paraHex(fundo), texto: CLARO }
}

export default function EspecimeCard({ especie }: { especie: Especie }) {
  const selo = seloDeFamilia(especie.cor)
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-linha bg-white/60 shadow-[0_1px_0_var(--color-linha)]">
      <div className="h-1.5 w-full" style={{ backgroundColor: especie.cor }} />

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mata/10">
        <img
          src={`/especies/${especie.ilustracao}.webp`}
          alt={`Foto de ${especie.comum} (${especie.cientifico}) em cultivo`}
          loading="lazy"
          decoding="async"
          width={900}
          height={900}
          className="h-full w-full object-cover"
        />
        <EspecieIlustracao
          tipo={especie.ilustracao}
          className="absolute right-2 bottom-2 h-16 w-11 text-vidro drop-shadow-[0_1px_2px_rgba(16,36,28,0.55)]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span
          className="dado-ficha absolute top-4 right-4 rounded-full px-2.5 py-1 shadow-sm"
          style={{ backgroundColor: selo.fundo, color: selo.texto }}
        >
          {especie.familia}
        </span>

        <div className="mt-1 text-center">
          <h3 className="binomial">
            {especie.cientifico} <span className="text-sm not-italic text-mata/50">{especie.autor}</span>
          </h3>
          <p className="mt-0.5 text-sm text-mata/70">{especie.comum}</p>
        </div>

        <dl className="dado-ficha mt-5 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-linha pt-4 text-mata/80">
          <div>
            <dt className="text-mata/45">Luz</dt>
            <dd className="normal-case">{especie.luz}</dd>
          </div>
          <div>
            <dt className="text-mata/45">Cuidado</dt>
            <dd className={`normal-case font-semibold ${corCuidado[especie.cuidado]}`}>{especie.cuidado}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-mata/45">Floração</dt>
            <dd className="normal-case">{especie.floracao}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-mata/45">Água</dt>
            <dd className="normal-case">{especie.agua}</dd>
          </div>
        </dl>

        <p className="mt-4 border-t border-linha pt-4 text-sm leading-relaxed text-mata/75">{especie.nota}</p>

        <p className="mt-4 text-xs tracking-wide text-mata/50 uppercase">Uso: {especie.uso}</p>
      </div>
    </article>
  )
}
