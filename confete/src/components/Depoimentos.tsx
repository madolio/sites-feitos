const depoimentos = [
  { nome: 'Larissa T.', cor: 'var(--color-sky)', texto: 'Fechamos o pacote com duas semanas de antecedência e a fita ondulada do convite ficou igualzinha ao que a gente combinou no WhatsApp.' },
  { nome: 'Bruno C.', cor: 'var(--color-mint)', texto: 'Meu filho é bem tímido com gente nova e perguntei antes se dava pra ajustar a animação pra ele — deu, e ele curtiu do início ao fim.' },
  { nome: 'Patrícia G.', cor: 'var(--color-ember)', texto: 'Chegou um convidado extra de última hora e resolveram na hora sem drama, ajustando o pacote conforme o combinado.' },
]

export default function Depoimentos() {
  return (
    <section className="border-t-4 border-carbon bg-cream px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold tracking-wide text-carbon uppercase">Quem já festejou com a gente</p>
        <h2 className="mt-2 text-3xl font-bold text-carbon sm:text-4xl">Antes de fechar, veja como foi</h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <div
              key={d.nome}
              className="rounded-2xl border-2 border-carbon bg-white p-5"
              style={{ boxShadow: `4px 4px 0 ${d.cor}` }}
            >
              <p className="text-sm text-carbon/80">{d.texto}</p>
              <p className="mt-3 text-sm font-bold text-carbon">{d.nome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
