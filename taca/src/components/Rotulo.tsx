// Rótulo desenhado, não foto de garrafa nenhuma — o mesmo horizonte de
// serra que aparece atrás da taça no hero, reduzido a três linhas, se repete
// aqui em cada rótulo como assinatura visual da vinícola.
export default function Rotulo() {
  return (
    <svg viewBox="0 0 120 60" className="h-14 w-28" aria-hidden="true">
      <path d="M0 44 L18 26 L30 36 L48 18 L62 34 L80 22 L98 40 L120 30" fill="none" stroke="var(--color-ink)" strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" opacity={0.55} />
      <circle cx={96} cy={16} r={5} fill="none" stroke="var(--color-garnet)" strokeWidth={1.4} />
      <line x1={0} y1={50} x2={120} y2={50} stroke="var(--color-ink)" strokeWidth={1} opacity={0.3} />
    </svg>
  )
}
