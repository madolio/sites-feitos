import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Taça, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyTaca() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Taça — a roda de aromas que vira catálogo | Madolio"
        description="O processo real por trás do Taça: um site pra vinícola de altitude onde a roda de aromas de sommelier é a navegação. Do pedido inicial aos problemas técnicos resolvidos no caminho."
        path="/projetos/taca"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Taça</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma vinícola de altitude fictícia onde você não navega por menu — navega por aroma. Toque numa fatia da
            roda de aromas de um sommelier de verdade e a lista de rótulos se reorganiza na hora. Aqui está o
            processo real por trás disso, incluindo as duas ideias que foram pro lixo antes desta.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Não é isso. A ideia da taça girando em 3D eu não curti — e o corte da encosta também não, é a mesma
            coisa do projeto de calibre que vocês já me mostraram. Quero de novo, mas com o nicho de vinícola de
            altitude mesmo."
          </blockquote>
          <p className="mt-4 text-ink/70">
            Duas rejeições seguidas ensinam mais do que uma aprovação. Ficou claro que o problema não era o 3D em si
            nem a ideia de mostrar altitude — era usar um objeto genérico (taça girando, corte de encosta) como
            centro da página. A saída era achar um objeto que já pertencesse à cultura do vinho, não inventado pra
            parecer bonito.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            A roda de aromas é a ferramenta que sommeliers de verdade usam numa degustação pra nomear o que estão
            sentindo no copo — dividida em categorias como Fruta escura, Cítrico, Mineral, Torrado, Amadeirado e
            Especiado. Em vez de decorar a página com ela, ela virou o catálogo inteiro: tocar numa fatia filtra os
            rótulos pra mostrar só os que carregam aquele aroma. Os quatro rótulos da vinícola deixam de estar todos
            visíveis o tempo todo e passam a aparecer conforme o gosto que você está procurando.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a roda parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">Nenhum aroma foi inventado pra preencher a roda.</strong> Cada categoria
              já estava escrita na nota de degustação de algum rótulo — a roda só reorganiza esse texto em tags
              estruturadas. "14 meses em carvalho francês" virou Amadeirado e Especiado; "Cítrico e mineral" virou
              Cítrico e Mineral. É o mesmo conteúdo do enólogo, só clicável.
            </li>
            <li>
              <strong className="text-ink">Cada fatia é geometria real, não uma imagem.</strong> A roda é desenhada
              com arcos de SVG calculados por trigonometria — ângulo e raio convertidos em coordenada pra cada fatia
              — o mesmo padrão usado em outros catálogos do estúdio pra desenhar formas circulares clicáveis sem
              depender de ilustração pronta.
            </li>
            <li>
              <strong className="text-ink">O filtro tem toggle, não só ida.</strong> Clicar numa fatia já selecionada,
              ou no botão "ver todos os rótulos", reseta o filtro — porque numa degustação real você prova, some, e
              muda de ideia sobre o que está sentindo.
            </li>
            <li>
              <strong className="text-ink">A altitude não desapareceu, só deixou de ser o eixo visual.</strong> Cada
              talhão continua com sua altitude real no dado e ela aparece na lista de rótulos — só não é mais o
              elemento que organiza a página inteira, papel que passou pro aroma.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Dois problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">A terceira tentativa não podia ser mais uma decoração.</strong> Depois de
              duas rejeições, qualquer objeto visual novo corria o risco de cair na mesma crítica — "bonito, mas não
              serve pra nada". A saída técnica foi transformar o objeto em interface funcional: a roda não é mostrada,
              é usada — cada clique tem uma consequência real na lista abaixo dela.
            </p>
            <p>
              <strong className="text-ink">Reaproveitar sem carregar peso morto.</strong> A ilustração da encosta
              (curvas de nível, neblina animada) foi removida por completo em vez de ficar escondida no código —
              junto dela saíram os tokens de cor que só existiam pra desenhá-la. Etapas do processo (da parreira à
              taça) e a seção de contato, que não tinham relação nenhuma com a ilustração descartada, ficaram exatamente
              como estavam — refazer o que já funcionava seria trabalho sem propósito.
            </p>
            <p>
              <strong className="text-ink">Build novo, preview antigo.</strong> Depois de cada rebuild, o servidor de
              preview local não detectava sozinho os novos nomes de arquivo gerados — e o navegador recebia HTML no
              lugar do JavaScript esperado, quebrando a página silenciosamente. Reiniciar o preview a cada rebuild
              virou parte do checklist do projeto.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — toque numa fatia da roda de aromas e veja o catálogo de rótulos se
            reorganizar na hora.
          </p>
          <a
            href="https://taca.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Taça
          </a>
        </Reveal>
      </div>
    </section>
  )
}
