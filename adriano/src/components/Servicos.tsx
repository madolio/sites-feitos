import { linkWhatsApp } from '../contato'

const areas = [
  {
    id: 'agua',
    titulo: 'Tratamento de água',
    cor: 'agua' as const,
    itens: [
      'Água de alta pureza — o padrão que tratamento de hemodiálise exige',
      'Tratamento de água em geral, residencial e comercial',
      'Manutenção de sistemas já instalados',
    ],
  },
  {
    id: 'eletrica',
    titulo: 'Serviços elétricos',
    cor: 'eletrica' as const,
    itens: ['Instalação e manutenção elétrica residencial e comercial'],
  },
]

// Duas colunas, cada uma na cor do próprio ofício — nunca misturadas no
// mesmo cartão. É a identidade dupla real do Adriano, não um kit de ícone
// genérico de "serviços".
export default function Servicos() {
  return (
    <section id="servicos" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="revelar max-w-2xl">
          <p className="rotulo text-fumo">O que eu faço</p>
          <h2 className="mt-3 text-3xl text-grafite sm:text-4xl">Dois ofícios, o mesmo cuidado</h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {areas.map((area) => (
            <div
              key={area.id}
              className={`revelar rounded-2xl border p-7 ${
                area.cor === 'agua' ? 'border-agua-clara bg-agua-clara' : 'border-eletrica-clara bg-eletrica-clara'
              }`}
            >
              <h3
                className={`font-heading text-xl font-semibold ${
                  area.cor === 'agua' ? 'text-agua' : 'text-eletrica'
                }`}
              >
                {area.titulo}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {area.itens.map((item) => (
                  <li key={item} className="flex gap-2.5 text-grafite">
                    <span
                      className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        area.cor === 'agua' ? 'bg-agua' : 'bg-eletrica'
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={linkWhatsApp(`Olá! Gostaria de saber mais sobre ${area.titulo.toLowerCase()}.`)}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-block font-semibold underline underline-offset-4 ${
                  area.cor === 'agua'
                    ? 'text-agua decoration-agua/30 hover:decoration-agua'
                    : 'text-eletrica decoration-eletrica/30 hover:decoration-eletrica'
                }`}
              >
                Perguntar sobre isso
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
