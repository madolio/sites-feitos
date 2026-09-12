import { Link } from 'react-router-dom'
import ProjectShowcase from '../components/ProjectShowcase'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

export default function Projetos() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Projetos — Sites reais e conceitos | Madolio"
        description="Veja o redesign do site institucional da NBJ Systems e conceitos de sites para confeitaria, pilates, hamburgueria, advocacia, SaaS, arquitetura e consultoria financeira — exemplos do que a Madolio pode criar pro seu negócio."
        path="/projetos"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Link to="/" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← madolio
        </Link>

        <Reveal className="mt-6">
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-ink md:text-5xl">
            O que eu posso criar pro seu negócio
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            A NBJ Systems é um cliente real. Os outros são conceitos — cada
            um pensado do zero pro nicho que representa, sem reaproveitar a
            cara de nenhum dos outros.
          </p>
        </Reveal>

        <div className="mt-14">
          <ProjectShowcase />
        </div>
      </div>
    </section>
  )
}
