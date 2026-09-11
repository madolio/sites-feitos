import { log } from '../data'

export default function Log() {
  return (
    <section id="depoimentos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="mono text-sm text-cyan">Registro de bordo</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {log.map((entry) => (
            <div key={entry.id} className="grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
              <p className="text-xl leading-snug text-ink">“{entry.text}”</p>
              <p className="mono text-sm whitespace-nowrap text-ink-dim">— {entry.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
