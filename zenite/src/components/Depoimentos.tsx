const depoimentos = [
  {
    nome: 'Bianca R.',
    texto:
      'Levei os filhos pra sessão infantil sem esperar muito e foi o silêncio mais concentrado que já vi nos dois — a fila pra olhar Saturno de novo não acabava mais.',
    sessao: 'Sessão infantil',
  },
  {
    nome: 'Diego M.',
    texto:
      'Fomos pra Eta Aquáridas de madrugada, com direito a chimarrão pra aguentar o frio. Contei mais de trinta riscos no céu em três horas.',
    sessao: 'Chuva de meteoros — Eta Aquáridas',
  },
  {
    nome: 'Paula T.',
    texto:
      'A explicação de por que a lua cheia é pior pra observar mudou minha expectativa — voltei numa lua minguante e o M13 apareceu de um jeito que eu não imaginava num telescópio de 90mm.',
    sessao: 'Aglomerados e nebulosas',
  },
]

export default function Depoimentos() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Quem já observou</h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {depoimentos.map((d) => (
          <figure key={d.nome} className="rounded-2xl border border-latao-fundo/60 bg-cupula p-6">
            <blockquote className="text-sm text-marfim/90">"{d.texto}"</blockquote>
            <figcaption className="mt-4 text-xs text-neblina">
              <span className="text-latao">{d.nome}</span> · {d.sessao}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
