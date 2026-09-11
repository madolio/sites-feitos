import { Children, Fragment, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion, type Variants } from 'motion/react'

// Adaptado do "Stepper" do React Bits (reactbits.dev/components/stepper): mesma
// estrutura — indicadores com variantes do Motion, linha de progresso que
// preenche, conteúdo que desliza entre etapas com a altura animada e o check
// que se desenha (pathLength). Mudanças: cores da cartela, indicadores viraram
// <button> de verdade (teclado + leitor de tela), cada etapa tem rótulo, e
// "Continuar" fica travado até a etapa estar respondida.

type StepperProps = {
  labels: string[]
  children: ReactNode
  canAdvance: (step: number) => boolean
  onComplete: () => void
  completeLabel: string
}

export default function Stepper({ labels, children, canAdvance, onComplete, completeLabel }: StepperProps) {
  const [current, setCurrent] = useState(1)
  const [direction, setDirection] = useState(0)
  const steps = Children.toArray(children)
  const total = steps.length
  const isLast = current === total

  // Só dá pra pular pra uma etapa se todas as anteriores estiverem respondidas.
  const reachable = (step: number) => {
    for (let s = 1; s < step; s++) if (!canAdvance(s)) return false
    return true
  }

  const goTo = (step: number) => {
    setDirection(step > current ? 1 : -1)
    setCurrent(step)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="rounded-2xl bg-card text-ink">
        <ol className="flex items-start px-5 pt-6 sm:px-8 sm:pt-8">
          {labels.map((label, index) => {
            const step = index + 1
            return (
              <Fragment key={label}>
                <li className="flex flex-col items-center">
                  <StepIndicator
                    step={step}
                    label={label}
                    current={current}
                    disabled={!reachable(step)}
                    onClick={() => goTo(step)}
                  />
                </li>
                {index < labels.length - 1 && <StepConnector complete={current > step} />}
              </Fragment>
            )
          })}
        </ol>

        <StepContent current={current} direction={direction}>
          {steps[current - 1]}
        </StepContent>

        <div className="flex items-center justify-between gap-4 px-5 pb-6 sm:px-8 sm:pb-8">
          {current > 1 ? (
            <button type="button" onClick={() => goTo(current - 1)} className="link text-ink/70">
              Voltar
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            disabled={!canAdvance(current)}
            onClick={isLast ? onComplete : () => goTo(current + 1)}
            className="btn-cherry"
          >
            {isLast ? completeLabel : 'Continuar'}
          </button>
        </div>
      </div>
    </MotionConfig>
  )
}

function StepContent({ current, direction, children }: { current: number; direction: number; children: ReactNode }) {
  const [height, setHeight] = useState(0)

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <SlideTransition key={current} direction={direction} onHeight={setHeight}>
          {children}
        </SlideTransition>
      </AnimatePresence>
    </motion.div>
  )
}

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? '50%' : '-50%', opacity: 0 }),
}

function SlideTransition({
  children,
  direction,
  onHeight,
}: {
  children: ReactNode
  direction: number
  onHeight: (h: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    onHeight(el.offsetHeight)
    const ro = new ResizeObserver(() => onHeight(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [onHeight])

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
      className="px-5 pt-8 pb-6 sm:px-8"
    >
      {children}
    </motion.div>
  )
}

function StepIndicator({
  step,
  label,
  current,
  disabled,
  onClick,
}: {
  step: number
  label: string
  current: number
  disabled: boolean
  onClick: () => void
}) {
  const status = current === step ? 'active' : current < step ? 'inactive' : 'complete'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || status === 'active'}
      aria-current={status === 'active' ? 'step' : undefined}
      aria-label={`Etapa ${step}: ${label}`}
      className="group flex flex-col items-center gap-2 disabled:cursor-default"
    >
      <motion.span
        initial={false}
        animate={status}
        variants={{
          inactive: { backgroundColor: '#fffcf7', color: '#33190f', borderColor: 'rgba(51,25,15,0.25)' },
          active: { backgroundColor: '#c4213a', color: '#ffffff', borderColor: '#c4213a' },
          complete: { backgroundColor: '#33190f', color: '#fffcf7', borderColor: '#33190f' },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold"
      >
        {status === 'complete' ? <CheckIcon className="h-4 w-4" /> : step}
      </motion.span>
      <span className={`text-xs font-medium sm:text-sm ${status === 'active' ? 'text-ink' : 'text-ink/65'}`}>
        {label}
      </span>
    </button>
  )
}

function StepConnector({ complete }: { complete: boolean }) {
  return (
    <li aria-hidden="true" className="relative mx-1.5 mt-[1.1rem] h-0.5 flex-1 overflow-hidden rounded bg-ink/15 sm:mx-3">
      <motion.span
        className="absolute inset-y-0 left-0 bg-ink"
        initial={false}
        animate={{ width: complete ? '100%' : '0%' }}
        transition={{ duration: 0.4 }}
      />
    </li>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
