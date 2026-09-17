import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Lúmen, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyLumen() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Lúmen — o cursor que vira luminária | Madolio"
        description="O processo real por trás do Lúmen: um site pra estúdio de projeto luminotécnico onde o cursor revela uma sala escura e uma calculadora de lux de verdade dimensiona o ambiente. Do pedido inicial aos problemas técnicos resolvidos no caminho."
        path="/projetos/lumen"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Lúmen</h1>
          <p className="mt-4 text-lg text-ink/70">
            Um estúdio de projeto luminotécnico fictício onde o hero começa apagado e só existe onde o seu cursor
            aponta — porque o cursor é a própria luminária. Nada aqui é decoração de tela escura: até a cor de cada
            luminária do catálogo vem de uma conta real de temperatura de cor. Aqui está o processo por trás disso.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Seja ousado que nem o Cardume — mas sem me estourar o orçamento de complexidade com 3D."
          </blockquote>
          <p className="mt-4 text-ink/70">
            Isso descartou de cara o caminho óbvio (motor 3D, cena renderizada) e forçou a pergunta certa: dá pra
            criar um momento de assinatura tão forte quanto o do Cardume usando só CSS e DOM? A resposta virou o
            projeto inteiro — a ousadia não estaria em tecnologia pesada, estaria em levar literalmente a sério o
            que é luz: a ausência dela, e o que ela revela.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            O hero nasce numa sala escura de verdade — uma camada preta cobre toda a seção, e só existe um círculo de
            visibilidade onde o cursor está, como se o mouse fosse a luminária de mão de quem entra num ambiente sem
            luz. Esse mesmo princípio — nada é decorativo, tudo vem de um dado técnico real — se estende pro resto
            da página: a <strong>calculadora de lux</strong> usa a fórmula real de projeto luminotécnico pra dizer
            quantas luminárias um ambiente precisa, e o <strong>catálogo</strong> desenha o cone de luz de cada
            peça no ângulo de abertura real dela, na cor real da temperatura dela.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a sala parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">O efeito só ativa em quem tem mouse de verdade.</strong> A sala escura
              detecta se o dispositivo tem cursor fino e hover — em telas de toque não existe "posição do cursor"
              antes do primeiro toque, então mobile já recebe o conteúdo visível direto, por acessibilidade, em vez
              de simular um efeito que não faz sentido sem mouse.
            </li>
            <li>
              <strong className="text-ink">A luminária não re-renderiza a página a cada pixel de movimento.</strong>
              {' '}A posição do cursor é escrita direto numa variável de CSS por um loop de animação fora do React,
              não por estado do componente — senão cada movimento do mouse disparava uma nova renderização da árvore
              inteira, um custo desnecessário pra um efeito que só precisa mover um gradiente.
            </li>
            <li>
              <strong className="text-ink">A cor de cada luminária vem de uma conta de física, não do olho.</strong>
              {' '}Cada temperatura em Kelvin do catálogo é convertida pra RGB pela mesma aproximação usada em
              software de iluminação de palco e estúdio pra simular o espectro de um corpo negro — a cor quente
              2700K e a cor fria 6500K na tela são a temperatura real da luminária, não uma escolha estética solta.
            </li>
            <li>
              <strong className="text-ink">O cone de luz no catálogo usa o ângulo de feixe real de cada peça.</strong>
              {' '}O triângulo que representa o facho de luz é desenhado com o ângulo de abertura exato do catálogo
              comercial daquela luminária, convertido por trigonometria — não um cone genérico do mesmo tamanho pra
              todas.
            </li>
            <li>
              <strong className="text-ink">A calculadora usa a fórmula que um projetista usaria de verdade.</strong>
              {' '}Número de luminárias = (iluminância desejada × área) ÷ (fluxo luminoso da luminária × fator de
              utilização × fator de manutenção) — com lux de referência de norma técnica pra cada tipo de ambiente e
              watts/lumens reais de catálogo de LED, não estimativas arredondadas.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Dois problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">O TypeScript não confiava que o cursor existia.</strong> Mesmo depois de
              uma verificação explícita garantindo que a referência ao elemento do cursor não era nula, o compilador
              não conseguia manter essa garantia dentro de uma função aninhada no mesmo bloco — tratando a referência
              como potencialmente vazia de novo. A correção foi anotar o tipo explicitamente ali dentro, em vez de
              depender da inferência automática do TypeScript nesse caso específico.
            </p>
            <p>
              <strong className="text-ink">Build novo, preview antigo.</strong> Depois de cada rebuild, o servidor
              de preview local não detectava sozinho os novos nomes de arquivo gerados, e o navegador recebia HTML
              no lugar do JavaScript esperado — a página quebrava de um jeito que parecia bug de código, mas era só
              cache de servidor. Reiniciar o preview a cada rebuild resolveu e virou item fixo de checklist.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — mova o cursor pela sala escura do hero e rode a calculadora de lux com as
            medidas do seu próprio ambiente.
          </p>
          <a
            href="https://lumen.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Lúmen
          </a>
        </Reveal>
      </div>
    </section>
  )
}
