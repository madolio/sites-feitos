import { EMAIL_HREF, WHATSAPP_URL } from '../constants'
import Reveal from './Reveal'
import Scene3DLazy from './Scene3DLazy'
import ShimmerText from './ShimmerText'
import SketchToSite from './SketchToSite'

const stats = [
  { value: '5 a 15 dias', label: 'Do briefing ao site no ar' },
  { value: '100% responsivo', label: 'Perfeito em qualquer tela' },
  { value: 'Direto', label: 'Você fala comigo, sem intermediário' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <Scene3DLazy
        className="pointer-events-none absolute inset-0"
        particleColor="#1d4fd1"
        particleCount={280}
        particleOpacity={0.3}
        particleSize={0.045}
        minRadius={3.2}
        maxRadius={6.5}
        cameraDistance={6}
        showGlow={false}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.08] text-ink md:text-5xl">
              <ShimmerText>Um site que parece feito à mão pro seu negócio — porque é.</ShimmerText>
            </h1>

            <p className="mt-6 text-lg text-ink/70">
              Do rascunho ao ar: eu cuido do design, do texto e da publicação.
              Você recebe um site pronto pra atrair clientes, sem
              complicação técnica.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
                Falar no WhatsApp
              </a>
              <a href={EMAIL_HREF} className="btn-outline">
                Enviar e-mail
              </a>
            </div>
          </Reveal>

          <Reveal
            as="dl"
            stagger={0.1}
            delay={0.2}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.value}>
                <dt className="font-heading text-xl font-medium text-ink md:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-ink/70">{stat.label}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        <SketchToSite />
      </div>
    </section>
  )
}
