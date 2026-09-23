import { idiomas } from '../data'
import Visto from './Visto'

// Vistos de entrada nas laterais (so lg+): um por idioma ensinado, rotacionados
// como carimbos de verdade. Posicoes em % da secao, entao acompanham a largura.
const POSICOES = [
  { cls: 'left-[6%] top-[14%] -rotate-12', tam: 'w-28' },
  { cls: 'left-[15%] bottom-[10%] rotate-6', tam: 'w-24' },
  { cls: 'right-[7%] top-[12%] rotate-12', tam: 'w-24' },
  { cls: 'right-[16%] bottom-[14%] -rotate-6', tam: 'w-28' },
  { cls: 'right-[4%] top-[46%] rotate-3', tam: 'w-20' },
] as const

export default function Capa() {
  return (
    <section id="inicio" className="relative bg-ink px-6 py-24 text-paper md:py-32">
      {idiomas.map((idioma, i) => (
        <Visto
          key={idioma}
          idioma={idioma}
          className={`pointer-events-none absolute hidden text-paper/25 lg:block ${POSICOES[i].cls} ${POSICOES[i].tam}`}
        />
      ))}
      <div className="mx-auto max-w-2xl text-center">
        <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16 text-paper/85" aria-hidden="true">
          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="32" cy="32" r="21" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M32 16 L36 28 L48 28 L38 35 L42 47 L32 39 L22 47 L26 35 L16 28 L28 28 Z" fill="currentColor" />
        </svg>
        <p className="stamp-number mt-5 text-sm tracking-[0.35em] text-paper/70 uppercase">República do Idioma</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Passaporte</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-paper/85">
          De A1 a C2, cada nível é um carimbo de verdade — não uma barra de
          progresso. Turmas de inglês, espanhol, francês, alemão e italiano.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#matricula" className="btn-teal">
            Fazer teste de nível
          </a>
          <a href="#niveis" className="btn-line">
            Ver os níveis
          </a>
        </div>
      </div>
    </section>
  )
}
