const depoimentos = [
  {
    autor: 'Marina T.',
    fragancia: 'Bruma Noturna',
    texto:
      'Pedi pra recriar o cheiro da casa da minha avó no interior, mistura de jasmim com madeira molhada. Achei que era pedido impossível, mas a Bruma Noturna chegou perto o suficiente pra eu chorar abrindo o frasco.',
  },
  {
    autor: 'Diego F.',
    fragancia: 'Raiz Seca',
    texto:
      'Uso couro e vetiver desde sempre, mas os prontos sempre somem em duas horas. O Extrait de Parfum da Raiz Seca ainda está lá no fim do expediente, o que pra mim já valeu o preço.',
  },
  {
    autor: 'Camila R.',
    fragancia: 'Flor de Sal',
    texto:
      'Trabalho em pé o dia inteiro numa loja com ar-condicionado ligado direto e qualquer perfume mais pesado enjoa. A Flor de Sal em EDT é leve o bastante pra reaplicar sem exagerar.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Quem já tem um frasco numerado</h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {depoimentos.map((d) => (
          <figure key={d.autor} className="rounded-2xl border border-fio bg-carvao/50 p-5">
            <blockquote className="text-sm text-fumo">&ldquo;{d.texto}&rdquo;</blockquote>
            <figcaption className="mt-4 font-display text-sm text-acento">
              {d.autor} <span className="text-fumo">· {d.fragancia}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
