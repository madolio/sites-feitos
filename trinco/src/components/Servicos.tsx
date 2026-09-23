import Reveal from './Reveal'
import { servicos, categoriaInfo } from '../data/servicos'

const corCategoria: Record<string, string> = {
  emergencia: 'text-emergencia',
  agendado: 'text-seguro',
  'sob-medida': 'text-latao',
}

const anelCategoria: Record<string, string> = {
  emergencia: 'border-emergencia',
  agendado: 'border-seguro',
  'sob-medida': 'border-latao',
}

// Os quatro serviços pendurados como um molho de chaves de verdade: um fio
// vertical (o "argola") atravessando cada anel. Nunca a foto de banco de
// imagem + grade 2x2 que virou padrão repetido no portfólio — aqui o
// esqueleto é o próprio objeto do ofício.
export default function Servicos() {
  return (
    <section id="servicos" className="border-b border-linha bg-limalha py-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-placa text-latao">o que fazemos</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Quatro serviços, cada um com seu próprio ritmo</h2>
        </Reveal>

        <Reveal as="ol" stagger={0.08} className="relative mt-12">
          <div aria-hidden="true" className="absolute top-1 bottom-1 left-[19px] w-px bg-linha" />

          {servicos.map((s) => (
            <li key={s.id} className="relative flex gap-6 border-b border-linha py-6 last:border-0">
              <span
                className={`relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] bg-limalha ${anelCategoria[s.categoria]}`}
                aria-hidden="true"
              >
                <ChaveGlifo className={`h-4 w-4 ${corCategoria[s.categoria]}`} />
              </span>
              <div>
                <p className={`dado-placa ${corCategoria[s.categoria]}`}>{categoriaInfo[s.categoria].rotulo}</p>
                <h3 className="mt-1 text-xl">{s.nome}</h3>
                <p className="mt-2 text-sm text-grafite/75">{s.descricao}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function ChaveGlifo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l9 9M17 14l3-3M15 17l2-2" />
    </svg>
  )
}
