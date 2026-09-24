import Seo from '../components/Seo'
import TacaDemo from '../components/makingof/demos/TacaDemo'
import { Capa, Briefing, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of da Taça. Números, hashes e arquivos citados aqui são conferíveis
// em taca/CLAUDE.md, taca/src/data/vinhos.ts, taca/src/index.css e git log.
const marcos = [
  { data: '13/09 · 21:03', hash: 'ded6676', texto: 'Nasce a Taça, versão 1: uma taça 3D que gira e serve vinho.' },
  { data: '13/09 · 21:26', hash: 'ffcf55c', texto: 'Hero e catálogo reformulados numa “prova ao vivo”.' },
  { data: '14/09 · 00:06', hash: '37c94a8', texto: 'Texto secundário com contraste abaixo do mínimo AA é corrigido (Taça, Calibre e Cerne).' },
  { data: '14/09 · 00:24', hash: '2d94e98', texto: 'Versão 2: a taça 3D dá lugar a um corte transversal da encosta.' },
  { data: '15/09 · 16:19', hash: 'a5e18bc', texto: 'A neblina da encosta ganha deriva e as notas do rótulo, uma transição.' },
  { data: '15/09 · 16:59', hash: '9953c8b', texto: 'Versão 3, a atual: a encosta sai e entra a roda de aromas.' },
  { data: '16/09 · 10:44', hash: 'e4ce759', texto: 'Setas nativas dos campos numéricos trocadas por botões no tema do site.' },
  { data: '16/09 · 17:59', hash: '7a8b7a2', texto: 'Fontes com serifa dos títulos trocadas por grotesca em todo o portfólio (hoje o título da Taça usa Syne).' },
]

export default function CaseStudyTaca() {
  return (
    <>
      <Seo
        title="Making of: Taça — a roda de aromas que vira catálogo | Madolio"
        description="Como a Taça, conceito de vinícola de altitude, foi redesenhada três vezes até chegar numa roda de aromas de sommelier que funciona como filtro do catálogo. Clique nas fatias e veja os rótulos mudarem."
        path="/projetos/taca"
      />

      <Capa
        nome="Taça"
        nicho="Vinícola de altitude (conceito)"
        resumo={
          <>
            Um site de vinícola que teve três ideias visuais entre 13/09 e 15/09. A última virou uma roda de aromas: cada fatia
            é um filtro que mostra só os rótulos com aquele aroma.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Vinícola de altitude' },
          { rotulo: 'Empresa', valor: 'Fictícia (conceito)' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4 · GSAP' },
          { rotulo: 'Primeiro commit', valor: '13/09/2026' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/taca/hero.jpg"
          alt="Página inicial da Taça: título 'Vinícola de altitude na Serra Catarinense', uma roda de aromas com seis fatias à esquerda e a lista de rótulos à direita."
          width={1280}
          height={800}
          url="taca.sneakpeek.workers.dev"
          legenda="A home da Taça, no ar: a roda de aromas ao lado da lista de rótulos."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Três versões, uma vencedora">
        <Prosa>
          <p>
            O CLAUDE.md do projeto conta a sequência. Versão 1: uma taça 3D servindo vinho ao vivo, descartada
            porque a ideia da taça girando em 3D não agradou. Versão 2: um corte transversal da encosta,
            com cada rótulo ancorado na altitude do seu talhão. A versão 2 também foi rejeitada, e o nicho (vinícola de
            altitude) foi o único elemento mantido:
          </p>
        </Prosa>
        <div className="mt-8">
          <Briefing rotulo="Reação à segunda versão" quando="15/09/2026">
            A segunda versão também foi recusada: lembrava demais a ideia do Calibre.
          </Briefing>
        </div>
        <div className="mt-8">
          <Prosa>
            <p>
              A Taça é um conceito: a vinícola não existe. O CLAUDE.md lista a v3 como a atual, e o componente que a
              define é <code className="font-mono text-base">RodaAromas.tsx</code>.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="A roda é o catálogo">
        <Prosa>
          <p>
            A roda de aromas é uma ferramenta de degustação, e aqui cada uma das seis fatias (Fruta escura, Cítrico,
            Mineral, Torrado, Amadeirado, Especiado) filtra a lista. O detalhe que importa: nenhum dado foi inventado
            para alimentar o filtro. Cada aroma foi extraído do texto de degustação que já existia em cada rótulo e
            virou uma lista de tags (<code className="font-mono text-base">aromas: string[]</code> em{' '}
            <code className="font-mono text-base">data/vinhos.ts</code>). &quot;14 meses em carvalho francês&quot; virou
            Amadeirado e Especiado.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Fatias da roda', valor: '6', nota: 'Uma por categoria de aroma, cada fatia com 60° de arco.' },
              { rotulo: 'Rótulos filtrados', valor: '4', nota: 'Todos com 2 tags cada, num total de 8 tags. Toda fatia acha pelo menos um rótulo.' },
              { rotulo: 'Bundle JS hoje', valor: '346 kB', nota: 'Medido em build de produção agora: 346,00 kB (117,68 kB com gzip).' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Clique na roda" titulo="Filtre os rótulos">
        <Prosa>
          <p>
            Esta é a mesma lógica do site, com os mesmos quatro rótulos e as mesmas tags: clicar numa fatia mostra só
            quem tem o aroma, e clicar de novo desfaz o filtro. As categorias abaixo da roda são botões para quem
            navega por teclado.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <TacaDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/taca/roda.jpg"
          alt="A roda de aromas da Taça com a fatia Fruta escura selecionada; a lista mostra só o rótulo Talhão Sul."
          width={1280}
          height={913}
          url="taca.sneakpeek.workers.dev/#prova"
          legenda="No site real, com a fatia Fruta escura ativa: sobra um rótulo, o Talhão Sul."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões com evidência" titulo="O que ficou e o que saiu">
        <Prosa>
          <p>
            Cada fatia é um <code className="font-mono text-base">&lt;path&gt;</code> de arco SVG, desenhado com
            trigonometria simples (uma função <code className="font-mono text-base">fatia(inicio, fim)</code>). Fontes e
            paleta principal (parchment, garnet, sage, dusk) foram mantidas, já que a reclamação era só do conceito
            visual. Os tokens de cor que existiam apenas para desenhar a encosta e a neblina saíram do CSS junto com{' '}
            <code className="font-mono text-base">Encosta.tsx</code>. A altitude de cada talhão continua no dado e
            aparece na lista, só deixou de ser o eixo visual da página.
          </p>
        </Prosa>
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Dois problemas reais">
        <div className="space-y-8">
          <Ficha
            titulo="Texto secundário no limite do contraste"
            sintoma="Na seção de prova, textos de apoio usavam parchment com 50% de opacidade sobre o roxo escuro."
            causa="Deu 4,52:1, no limite do mínimo AA de 4,5:1. Qualquer variação de cor de fundo quebraria."
            correcao="Opacidade subiu para 55% (commit 37c94a8), com folga."
          >
            <p className="font-mono text-sm break-words text-ink/75">
              #f3ecdd a 50% sobre #241832 = 4,52:1 · a 55% = 5,18:1
            </p>
          </Ficha>

          <Ficha
            titulo="A taça 3D renderizava preta (versão 1, descartada)"
            sintoma="Sob Chrome headless com SwiftShader, a taça inteira saía preta. Depois, o vinho ficava escondido atrás do vidro."
            causa="O material de transmissão do drei não funcionava nesse renderizador, e a ordem de transparência escondia o vinho."
            correcao="Troca por um material físico comum com clearcoat, e ajuste com renderOrder e depthWrite=false."
          >
            <p className="font-mono text-sm break-words text-ink/75">
              Documentado na mensagem do commit ded6676. Esta cena saiu do projeto na v2, mas o problema é real.
            </p>
          </Ficha>
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/70">
          Datas e hashes do histórico real do repositório (git log de taca/). A lista omite commits que mexeram em
          vários sites de uma vez, como o do &lt;dialog&gt;.
        </p>
      </Secao>

      <CtaMakingOf
        nome="Taça"
        url="https://taca.sneakpeek.workers.dev"
        texto="Clique numa fatia da roda e veja qual rótulo tem aquele aroma."
      />
    </>
  )
}
