import { Link } from 'react-router-dom'
import Reveal from './Reveal'

// Mesmos projetos listados em Projetos.tsx (manter em sincronia se a lista
// mudar lá). NBJ Systems é cliente real; os demais são conceitos de estilo.
const names = ['NBJ Systems', 'Doce Ateliê', 'Estúdio Alma', 'Sabor da Vila', 'Bastos Advocacia']

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={duplicate ? 'marquee-duplicate flex flex-wrap' : 'flex flex-wrap'}
      aria-hidden={duplicate}
    >
      {names.map((name) => (
        <span
          key={name}
          className="mx-3 shrink-0 whitespace-nowrap border border-line px-5 py-2.5 font-heading text-sm text-ink/70"
        >
          {name}
        </span>
      ))}
    </div>
  )
}

export default function ProjectsMarquee() {
  return (
    <Reveal className="border-y border-line py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-5 text-sm text-ink/65">Negócios que já ganharam site</p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track">
          <Row />
          <Row duplicate />
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-6xl px-6">
        <Link
          to="/projetos"
          className="text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          Ver todos os projetos
        </Link>
      </div>
    </Reveal>
  )
}
