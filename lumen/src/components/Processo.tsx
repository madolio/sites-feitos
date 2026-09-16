const etapas = [
  { titulo: 'Levantamento do espaço', texto: 'Medição real do ambiente, pé-direito, aberturas e uso previsto de cada zona.' },
  { titulo: 'Estudo de layout', texto: 'Onde cada ponto de luz vai — geral, tarefa e destaque nunca são a mesma luminária.' },
  { titulo: 'Temperatura de cor', texto: 'Kelvin escolhido pela função do ambiente: quente pra descanso, neutro pra trabalho.' },
  { titulo: 'Simulação de lux', texto: 'Cálculo de quantas luminárias entregam a iluminância certa — o mesmo da Calculadora acima.' },
  { titulo: 'Instalação', texto: 'Execução elétrica e fixação, com checagem de sombra e ofuscamento no local.' },
  { titulo: 'Ajuste fino', texto: 'Dimerização e mira final dos spots já com os móveis no lugar.' },
]

export function Processo() {
  return (
    <section id="processo" className="border-t border-fio bg-carvao px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-sm tracking-widest text-acento uppercase">Processo</p>
        <h2 className="mt-3 text-3xl">Como um projeto de luz é feito</h2>

        <ol className="mt-8 flex flex-col gap-6">
          {etapas.map((e, i) => (
            <li key={e.titulo} className="flex gap-4">
              <span className="tabular font-mono text-acento">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-lg">{e.titulo}</h3>
                <p className="mt-1 text-sm text-fumo">{e.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
