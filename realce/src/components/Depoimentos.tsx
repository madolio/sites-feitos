const depoimentos = [
  {
    nome: 'Fernanda A.',
    texto:
      'Levei uma foto de referência bem diferente do meu cabelo natural e a cabeleireira foi sincera sobre o que dava pra chegar perto numa sessão só, sem prometer um resultado impossível.',
  },
  {
    nome: 'Camila R.',
    texto:
      'Marquei o horário de noiva pelo WhatsApp com dois meses de antecedência, como recomendaram, e no teste de penteado já ajustaram o que eu não tinha gostado antes do dia do casamento.',
  },
  {
    nome: 'Débora S.',
    texto:
      'Fiz progressiva ali há um ano e avisei sobre isso antes de agendar a coloração. Combinaram o procedimento certo pro estado do meu cabelo em vez de aplicar a receita padrão.',
  },
]

export default function Depoimentos() {
  return (
    <section className="bg-preto py-20 text-branco md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="revelar">
          <p className="rotulo text-dourado">Quem já passou pela cadeira</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Antes de marcar, veja como foi pra outras clientes</h2>
        </div>

        <div className="revelar mt-10 grid gap-6 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <div key={d.nome} className="border border-dourado/25 p-6">
              <p className="text-sm text-fumo">{d.texto}</p>
              <p className="mt-4 text-sm font-medium text-dourado">{d.nome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
