import { processo } from '../data'

export default function Processo() {
  return (
    <section id="processo" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="text-4xl md:text-5xl">Como o projeto acontece</h2>

        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {processo.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="font-serif text-3xl text-ochre">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-xl">{step.title}</h3>
                <p className="mt-1.5 max-w-sm text-ink/75">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
