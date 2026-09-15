import { EMAIL_HREF, WHATSAPP_URL } from '../constants'
import Reveal from './Reveal'
import Scene3DLazy from './Scene3DLazy'

const stats = [
  { value: '5–15 dias', label: 'briefing ao ar' },
  { value: '100%', label: 'responsivo' },
  { value: 'direto', label: 'sem intermediário' },
]

// Hero escuro e atmosférico, inspirado em dois estilos de referência que o
// usuário mandou (refero.design): o título vira um bloco de pôster —
// caixa-alta, comprimido, "esmagado" — com UMA palavra em itálico serifado
// no meio (o mesmo recurso do sistema "Air": ênfase numa palavra isolada
// dentro do título, não o título inteiro). O CTA principal não é mais um
// botão sólido — é um contorno fino ("ghost button"), como no mesmo
// sistema: nunca cor em bloco sobre o hero escuro.
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void">
      <Scene3DLazy
        className="pointer-events-none absolute inset-0 opacity-70"
        particleColor="#4da2ff"
        particleCount={340}
        particleOpacity={0.5}
        particleSize={0.045}
        minRadius={3.6}
        maxRadius={7.2}
        cameraDistance={6.4}
        showGlow={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/10 via-void/40 to-void" />

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pt-24 pb-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            <span className="h-px w-8 bg-accent-hero/60" />
            Criação de sites sob medida
            <span className="h-px w-8 bg-accent-hero/60" />
          </p>

          <h1 className="font-poster text-[3.75rem] leading-[0.82] tracking-tight text-white uppercase sm:text-[5.5rem] lg:text-[6.5rem]">
            Um site que parece
            <br />
            <span className="font-accent text-accent-hero tracking-normal italic normal-case">feito à mão</span> pro
            seu negócio
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg text-fog">
            Porque é. Do rascunho ao ar: eu cuido do design, do texto e da
            publicação. Você recebe um site pronto pra atrair clientes, sem
            complicação técnica.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              Falar no WhatsApp
            </a>
            <a href={EMAIL_HREF} className="text-sm font-semibold text-fog underline decoration-fog/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white">
              Enviar e-mail
            </a>
          </div>
        </Reveal>
      </div>

      {/* Preenche o vão entre os botões e a faixa de estatísticas em telas
          altas (o bloco acima é centralizado no espaço restante) — em vez de
          deixar em branco, um convite discreto pra rolar. Posição absoluta
          (não empilhado no flex) pra não interferir na centralização do
          título nem depender da altura variável do vão. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-center sm:bottom-28"
        aria-hidden="true"
      >
        <div className="motion-safe:animate-bounce flex flex-col items-center gap-2 text-fog/70">
          <span className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">role pra ver mais</span>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7l6 6 6-6" />
          </svg>
        </div>
      </div>

      <Reveal
        as="dl"
        stagger={0.1}
        delay={0.2}
        className="relative z-10 mx-auto flex w-full max-w-md flex-wrap justify-center gap-x-10 gap-y-4 border-t border-white/15 px-6 py-6 text-center"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="font-heading text-lg font-medium text-white">{stat.value}</dt>
            <dd className="text-xs text-fog">{stat.label}</dd>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
