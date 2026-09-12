import { profissionais } from '../data'

export default function Profissionais() {
  return (
    <section className="border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl">Quem vai te atender</h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {profissionais.map((p) => (
            <div key={p.name}>
              <svg viewBox="0 0 48 48" className="h-12 w-12 text-ink" aria-hidden="true">
                <circle cx="24" cy="17" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M7 42 Q7 27 24 27 Q41 27 41 42" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-ink/65">{p.especialidade}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
