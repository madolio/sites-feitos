import { especies, type Luz } from '../data/especies'
import Reveal from './Reveal'

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

// Janelas de floração aproximadas a partir do texto já existente em cada
// ficha (especies.ts) — estações do hemisfério sul (outono mar-mai, inverno
// jun-ago, primavera set-nov, verão dez-fev). "pico" marca o trecho mais
// forte da citação original (ex.: "breve e intensa", "pico no verão");
// o resto do intervalo citado entra como floração mais fraca.
const JANELAS: Record<string, { meses: number[]; pico: number[] }> = {
  strelitzia: { meses: [3, 4, 5, 6, 7, 8, 9], pico: [4, 5, 6] },
  aechmea: { meses: [9, 10, 11], pico: [9, 10] },
  heliconia: { meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], pico: [12, 1, 2] },
  cattleya: { meses: [3, 4, 5], pico: [4] },
  zantedeschia: { meses: [6, 7, 8, 9, 10, 11], pico: [7, 8] },
  tibouchina: { meses: [3, 4, 5], pico: [3, 4] },
}

const LUZ_GLIFO: Record<Luz, { rotulo: string; d: string }> = {
  'sol pleno': { rotulo: 'sol pleno', d: 'M8 2v2M8 12v2M2 8h2M12 8h2M4.2 4.2l1.4 1.4M10.4 10.4l1.4 1.4M11.8 4.2l-1.4 1.4M5.6 10.4l-1.4 1.4M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z' },
  'meia-sombra': { rotulo: 'meia-sombra', d: 'M8 5.5a2.5 2.5 0 100 5V5.5zM8 2v2M2 8h2M12.8 3.2l-1.4 1.4M4.2 12.8l-1.4-1.4' },
  'sombra filtrada': { rotulo: 'sombra filtrada', d: 'M13 8.6A5 5 0 116.6 2.2 4 4 0 1013 8.6z' },
}

function LuzIcone({ luz }: { luz: Luz }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <path d={LUZ_GLIFO[luz].d} />
    </svg>
  )
}

export default function ReguaFlorescimento() {
  return (
    <section id="florescimento" className="bg-mata/[0.04] py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-musgo">Régua de florescimento</p>
          <h2 className="mt-2 max-w-xl text-4xl">Quando cada espécie floresce, mês a mês</h2>
          <p className="mt-3 max-w-xl text-mata/70">
            A mesma informação da ficha técnica, só que lida em janela de tempo — cruzada
            com a exigência de luz, porque uma sem a outra não decide onde plantar.
          </p>
        </Reveal>

        <Reveal
          as="div"
          stagger={0.06}
          className="mt-10 overflow-x-auto"
        >
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[10rem_repeat(12,1fr)] items-center gap-x-1">
              <span />
              {MESES.map((m) => (
                <span key={m} className="dado-ficha pb-2 text-center text-mata/40">
                  {m}
                </span>
              ))}
            </div>

            {especies.map((especie) => {
              const janela = JANELAS[especie.ilustracao]
              return (
                <div
                  key={especie.id}
                  className="grid grid-cols-[10rem_repeat(12,1fr)] items-center gap-x-1 border-t border-linha py-3"
                >
                  <div className="flex items-center gap-2 pr-3 text-sm text-mata/80">
                    <span style={{ color: especie.cor }}>
                      <LuzIcone luz={especie.luz} />
                    </span>
                    <span className="truncate italic">{especie.cientifico.split(' ')[0]}</span>
                  </div>

                  {MESES.map((_, i) => {
                    const mes = i + 1
                    const ativo = janela.meses.includes(mes)
                    const pico = janela.pico.includes(mes)
                    return (
                      <span
                        key={mes}
                        className="mx-auto h-2.5 w-full max-w-8 rounded-full"
                        style={
                          ativo
                            ? { backgroundColor: especie.cor, opacity: pico ? 1 : 0.35 }
                            : { backgroundColor: 'var(--color-linha)' }
                        }
                        title={`${especie.comum} — ${MESES[i]}${pico ? ' (pico)' : ativo ? ' (floração leve)' : ''}`}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </Reveal>

        <p className="mt-6 max-w-2xl text-sm text-mata/50">
          Cor cheia = pico de floração · cor fraca = floração ainda ativa, mais esparsa ·
          o ícone ao lado do nome mostra a exigência de luz de cada espécie (sol pleno,
          meia-sombra ou sombra filtrada).
        </p>
      </div>
    </section>
  )
}
