const ENDERECO = 'Av. Anhanguera, 388 — Jardim Bandeirantes, São Roque - SP, 18134-240'

const expediente = [
  { dia: 'Segunda', hora: 'Fechado', aberto: false },
  { dia: 'Terça a sexta', hora: '9h às 19h', aberto: true },
  { dia: 'Sábado', hora: '9h às 19h', aberto: true },
  { dia: 'Domingo', hora: 'Fechado', aberto: false },
]

export default function Onde() {
  return (
    <section id="onde" className="bg-luz py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 sm:grid-cols-2">
          <div className="revelar">
            <p className="rotulo text-jade">Onde estamos</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">São Roque, Jardim Bandeirantes</h2>
            <address className="mt-5 text-lg text-grafite not-italic">
              Av. Anhanguera, 388
              <br />
              Jardim Bandeirantes
              <br />
              São Roque — SP, 18134-240
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-contorno mt-6"
            >
              Abrir no mapa
            </a>
          </div>

          <div className="revelar">
            <h3 className="rotulo text-grafite">Horário</h3>
            <div className="filete mt-2 mb-2" />
            <dl>
              {expediente.map((e) => (
                <div
                  key={e.dia}
                  className="flex items-baseline justify-between gap-4 border-b border-noite/10 py-3.5 last:border-b-0"
                >
                  <dt>{e.dia}</dt>
                  <dd className={e.aberto ? 'tabular text-jade' : 'text-grafite'}>{e.hora}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-grafite">
              Atendemos com hora marcada. O horário só está guardado depois da
              confirmação no WhatsApp — por isso o site monta a mensagem pronta
              em vez de fingir que reservou sozinho.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
