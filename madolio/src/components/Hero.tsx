import { EMAIL_HREF, WHATSAPP_URL } from '../constants'
import Reveal from './Reveal'
import Scene3DLazy from './Scene3DLazy'
import ShimmerText from './ShimmerText'

const stats = [
  { value: '5–15 dias', label: 'briefing ao ar' },
  { value: '100%', label: 'responsivo' },
  { value: 'direto', label: 'sem intermediário' },
]

// A home não abre em duas colunas (texto de um lado, ilustração do outro) —
// é uma tela cheia só, com a partícula de fundo ocupando tudo e o texto
// centralizado por cima, como uma capa. O "trabalho" de mostrar um site de
// verdade fica pra seção Trabalhos, logo abaixo.
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <Scene3DLazy
        className="pointer-events-none absolute inset-0"
        particleColor="#1d4fd1"
        particleCount={340}
        particleOpacity={0.4}
        particleSize={0.045}
        minRadius={3.6}
        maxRadius={7.2}
        cameraDistance={6.4}
        showGlow={false}
      />

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pt-24 pb-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h1 className="text-[2.75rem] leading-[1.08] font-semibold text-ink sm:text-6xl">
            <ShimmerText>Um site que parece feito à mão pro seu negócio — porque é.</ShimmerText>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
            Do rascunho ao ar: eu cuido do design, do texto e da publicação.
            Você recebe um site pronto pra atrair clientes, sem complicação
            técnica.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary border-beam rounded-full"
            >
              Falar no WhatsApp
            </a>
            <a href={EMAIL_HREF} className="btn-outline">
              Enviar e-mail
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal
        as="dl"
        stagger={0.1}
        delay={0.2}
        className="relative z-10 mx-auto flex w-full max-w-md flex-wrap justify-center gap-x-10 gap-y-4 border-t border-line/70 px-6 py-6 text-center"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="font-heading text-lg font-medium text-ink">{stat.value}</dt>
            <dd className="text-xs text-ink/60">{stat.label}</dd>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
