import Reveal from './Reveal'
import { servicos } from '../data/servicos'

const GLIFOS: Record<string, string> = {
  Desentupimento: 'M4 12h5M15 12h5M9 12a3 3 0 013-3 3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3z',
  'Conserto de vazamento': 'M12 3c3 4 5 7 5 9.5A5 5 0 0112 18a5 5 0 01-5-5.5C7 10 9 7 12 3z',
  'Instalação de metais e louças': 'M6 4h5v4a3 3 0 003 3h4M8 11v9M16 15v5',
  'Revisão de caixa d’água': 'M5 9h14v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9zM9 9V6a3 3 0 016 0v3',
}

// A mesma dupla de "quatro cards" do Trinco resolvida de outro jeito: aqui o
// esqueleto é o encanamento — um tubo vertical com uma válvula por serviço,
// no mesmo registro técnico/esquemático do medidor de vazão (VazaoDiagnostico).
// Nada de foto de banco de imagem + grade 2x2 — mas a foto entra do lado da
// lista (não substitui o cano), plano médio de corpo/mão ajustando um
// registro, enquadramento deliberadamente diferente do close na fechadura
// do Trinco (foto 35287856): aqui o enquadramento é torso+braço curvado
// sobre a peça, não uma mão isolada em primeiro plano.
export default function Servicos() {
  return (
    <section id="servicos" className="border-b border-linha bg-papel py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-vazao text-fluxo">o que fazemos</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Quatro frentes, o essencial de um encanador avulso</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <Reveal as="ol" stagger={0.08} className="relative">
            <div aria-hidden="true" className="absolute top-2 bottom-2 left-[23px] w-1.5 rounded-full bg-fluxo/20" />

            {servicos.map((s) => (
              <li key={s.nome} className="relative flex gap-6 border-b border-linha py-6 last:border-0">
                <span
                  className="relative z-10 mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-fluxo bg-papel"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-fluxo" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={GLIFOS[s.nome]} />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl">{s.nome}</h3>
                  <p className="mt-2 text-sm text-tinta/75">{s.descricao}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <figure className="overflow-hidden rounded-xl border border-linha">
              <img
                src="https://images.pexels.com/photos/35290675/pexels-photo-35290675.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Encanador curvado sobre um equipamento, girando o registro de uma tubulação com a mão"
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
                width={800}
                height={1067}
              />
              <figcaption className="border-t border-linha bg-papel-forte/60 px-4 py-3 text-sm text-tinta/70">
                Cada frente começa com a mesma coisa: abrir o registro certo e ver o que sai.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
