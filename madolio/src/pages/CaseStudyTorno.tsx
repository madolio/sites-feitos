import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Torno, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyTorno() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Torno — Um torno de oleiro de verdade, no navegador | Madolio"
        description="O processo real por trás do Torno: um site pra ateliê de cerâmica onde a página inteira é um torno de oleiro em 3D, e a peça que você molda vira o pedido de inscrição na aula."
        path="/projetos/torno"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Torno</h1>
          <p className="mt-4 text-lg text-ink/70">
            Um ateliê de cerâmica fictício onde não existe formulário de inscrição — existe um torno de oleiro em 3D
            de verdade, e a peça que você molda com o próprio mouse é a sua inscrição na aula. Aqui está o processo
            real por trás disso, não só o resultado.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Fuja de tudo que já fez, coloque efeitos visuais, 3D, se exalte."
          </blockquote>
          <p className="mt-4 text-ink/70">
            De novo, não era pra ser um catálogo bonito de aulas de cerâmica — era pra ser algo que só faz sentido
            existir na tela. Isso virou a pergunta "como é a sensação de moldar barro com a mão", e a resposta foi
            tirar a mão do meio do caminho: deixar a pessoa moldar de verdade, com o dedo dela fazendo o barro subir.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            Não tem seção, nem hero, nem rolagem: a tela inteira é o torno. Um painel lateral com as três etapas
            reais de fazer uma peça de cerâmica — <strong>Moldar → Esmaltar → Queimar</strong> — organiza a
            experiência inteira. Arrastar perto da silhueta faz o barro seguir o dedo naquela altura; escolher um
            esmalte muda a cor de toda a interface pro tom escolhido; e apertar "queimar" dispara uma animação de
            forno de verdade, com a peça esfriando de amarelo-alaranjado pra vermelho. No final, as medidas, o
            esmalte e a turma escolhida viram a mensagem de inscrição.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a peça parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">O barro cede como barro de verdade, não como borracha.</strong> Puxar um
              ponto da parede não move só aquele ponto — a força se espalha pros vizinhos com uma queda suave
              (o mesmo jeito que a pressão da mão se distribui num torno de verdade), e uma passada leve de
              suavização tira os degraus bruscos que ficariam feios numa peça girando.
            </li>
            <li>
              <strong className="text-ink">O esmalte cru não tem a cor final.</strong> Antes de ir ao forno, o
              esmalte aparece fosco e meio embranquecido — porque é assim mesmo que ele existe fora do forno. A cor
              de verdade (o cobalto azul intenso, o celadon verde) só "acende" durante a queima, exatamente como
              acontece num ateliê de cerâmica real.
            </li>
            <li>
              <strong className="text-ink">A queima tem uma frente de fogo que sobe.</strong> Não é a peça inteira
              mudando de cor de uma vez — um anel incandescente sobe da base pro topo, convertendo esmalte cru em
              vítreo conforme passa, e o brilho da peça passa de 1.0 (o limite da luz normal) pra cima, virando um
              resplendor de verdade em vez de só ficar mais clara.
            </li>
            <li>
              <strong className="text-ink">O pé da peça fica sem esmalte, igual no ateliê de verdade.</strong> A
              base onde a peça toca o forno nunca leva esmalte — vira um "biscoito" claro depois de queimada, porque
              é assim que se evita a peça grudar na prateleira do forno. Pequeno detalhe, mas é o tipo de coisa que
              faz alguém que já fez cerâmica reconhecer que o site entende o ofício.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Três problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">O forno não brilhava quando devia brilhar.</strong> A biblioteca de
              efeitos visuais (pós-processamento) que faz o efeito de brilho intenso do forno desliga, por padrão, o
              tratamento de cor normal do motor 3D. Sem esse tratamento de volta como uma etapa final própria, a
              emissão de luz da peça queimando nunca cruzava o limite que dispara o brilho — a correção foi
              reintroduzir esse tratamento de cor explicitamente, só depois do efeito de brilho.
            </p>
            <p>
              <strong className="text-ink">Recriar o barro 60 vezes por segundo ia travar o navegador.</strong> A
              forma mais simples de gerar a geometria de um vaso giratório recriaria toda a malha 3D a cada quadro
              de animação, alocando memória sem parar. A solução foi construir o buffer da peça uma única vez e só
              reescrever as posições e os vetores de superfície quando o barro muda de forma — o resto do
              desempenho ficou de graça.
            </p>
            <p>
              <strong className="text-ink">Um overlay escurecendo o forno derrubava a taxa de quadros.</strong> A
              primeira tentativa de escurecer a cena durante a queima usava uma camada transparente por cima do
              desenho 3D (um "mix-blend-mode" do CSS), o que obriga o navegador a recompor a tela inteira a cada
              quadro. Mover esse escurecimento pra dentro da própria cena 3D — como parte da iluminação, não como
              uma camada por cima — resolveu o engasgo.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — molde uma peça do zero, escolha um esmalte e veja a queima acontecer diante
            dos seus olhos.
          </p>
          <a
            href="https://torno.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Torno
          </a>
        </Reveal>
      </div>
    </section>
  )
}
