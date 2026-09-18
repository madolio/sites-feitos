import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Estufa Cheia, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyEstufa() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Estufa Cheia — Um catálogo de flores que parece herbário de verdade | Madolio"
        description="O processo real por trás do Estufa Cheia: uma floricultura fictícia onde cada arranjo é uma ficha de espécime real, com nome científico, luz, água e floração de verdade. Do pedido inicial aos problemas resolvidos no caminho."
        path="/projetos/estufa"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Estufa Cheia</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma floricultura e paisagismo fictícios onde cada flor do catálogo tem ficha de espécime de verdade —
            nome científico, família, luz e época de floração reais — em vez de nomes bonitos e foto de buquê de
            banco de imagem. Aqui está o processo real por trás disso, não só o resultado.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Quero uma floricultura que pareça viveiro de verdade, não mais um e-commerce de flor com carrinho de
            compras."
          </blockquote>
          <p className="mt-4 text-ink/70">
            "E-commerce de flor" era exatamente o padrão a evitar — grade de produto, preço, botão de comprar,
            qualquer floricultura genérica tem isso. O que faltava era o conhecimento técnico que só quem cultiva de
            verdade tem: nome científico, exigência real de luz e água, época de floração. A pergunta virou "como
            mostrar botânica como ofício", não "como montar uma vitrine bonita".
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            O <strong>wildcard</strong> é o catálogo inteiro ser ficha de espécime de herbário, não card de produto:
            as 6 espécies (Strelitzia reginae, Aechmea fasciata, Heliconia psittacorum, Cattleya labiata,
            Zantedeschia aethiopica, Tibouchina granulosa) têm nome binomial completo com autoridade botânica —
            <em> Cattleya labiata Lindl.</em>, por exemplo — família, origem, exigência real de luz e água, estação
            de floração verdadeira e uma ilustração técnica em traço fino, sem preenchimento sólido, no espírito de
            prancha de herbário. É dado de viveiro pesquisado, não inventado: a Cattleya labiata floresce no outono e
            foi a espécie que reacendeu a febre europeia por orquídeas em 1818; o copo-de-leite tem espata, não
            pétala; a quaresmeira floresce entre março e maio, coincidindo com a quaresma católica, daí o nome.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem o catálogo parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">O nome científico usa itálico de verdade.</strong> A tipografia de
              display (EB Garamond) entra em itálico só pro binômio latino — gênero e epíteto — seguindo a convenção
              real de nomenclatura botânica, nunca decorativo.
            </li>
            <li>
              <strong className="text-ink">O hero é abundância, não uma planta isolada.</strong> A cena de estufa em
              SVG combina arcos de estrutura de vidro com quase 50 silhuetas de folhagem sobrepostas preenchendo a
              base de ponta a ponta — densidade real de composição, resposta direta ao pedido de "abundância" e ao
              padrão do portfólio contra páginas mortas e sem vida.
            </li>
            <li>
              <strong className="text-ink">A videira se desenha sozinha ao rolar.</strong> Em vez de fade genérico, o
              traço de uma trepadeira em SVG "cresce" amarrado ao progresso do scroll, e as folhas desenrolam no
              ritmo em que o traço passa por elas — a metáfora de crescimento vegetal aplicada literalmente ao
              mecanismo de animação.
            </li>
            <li>
              <strong className="text-ink">A cor de cada ficha vem da flor de verdade.</strong> A faixa e o selo de
              família de cada espécime usam a cor real da flor ou bráctea — laranja da ave-do-paraíso, magenta da
              orquídea, roxo da quaresmeira — com o texto claro ou escuro escolhido por luminância pra manter
              contraste, não uma paleta decorativa genérica.
            </li>
            <li>
              <strong className="text-ink">Cuidado real vira dado, não texto de venda.</strong> Luz, água e floração
              aparecem em fonte monoespaçada (Spline Sans Mono), a única do site reservada pra dado técnico de ficha
              — nunca usada em título ou texto corrido.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">A página ficou sem cor pra um negócio que vende cor.</strong> A primeira
              versão apostava só na ilustração técnica em traço — fiel ao conceito de herbário, mas sem vida pra uma
              floricultura. A correção foi buscar a foto real de cada exemplar no Wikimedia Commons, sob licença CC
              BY/CC BY-SA com crédito no rodapé, e sobrepor a ilustração técnica no canto como selo de herbário, em
              vez de isolá-la num fundo vazio. Durante a busca, a API do Wikimedia limitou o ritmo de requisições —
              foi preciso espaçar as chamadas por espécie em vez de disparar as seis de uma vez.
            </p>
            <p>
              <strong className="text-ink">O select do formulário quebrava a paleta.</strong> O menu suspenso nativo
              do navegador pra escolher a espécie na encomenda renderizava em branco e azul padrão do sistema, fora
              da paleta verde-creme do resto do site. A correção foi declarar <code>color-scheme: dark</code> no
              elemento e estilizar cada <code>&lt;option&gt;</code> manualmente com as cores da estufa.
            </p>
            <p>
              <strong className="text-ink">Ainda contido demais depois da primeira rodada de cor.</strong> Mesmo com
              foto e selo de família coloridos, o feedback foi que a paleta continuava terrosa demais pra floricultura.
              A correção final aumentou a saturação das faixas de cor de cada ficha e clareou bastante o overlay
              escuro sobre a foto do hero, deixando o laranja vibrante da ave-do-paraíso aparecer de verdade em vez
              de só sugerido.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — role a página pra ver a videira se desenhar sozinha e confira a ficha
            técnica de cada espécime.
          </p>
          <a
            href="https://estufa.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Estufa Cheia
          </a>
        </Reveal>
      </div>
    </section>
  )
}
