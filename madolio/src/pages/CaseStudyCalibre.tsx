import Seo from '../components/Seo'
import CalibreDemo from '../components/makingof/demos/CalibreDemo'
import { Capa, Briefing, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Calibre. Números, hashes e arquivos citados aqui são conferíveis
// em calibre/CLAUDE.md, calibre/src/index.css, calibre/src/components e git log.
const marcos = [
  { data: '13/09 · 20:37', hash: 'aad103d', texto: 'Nasce o Calibre, na primeira versão: um mecanismo de relógio em 3D, gerado por coordenadas.' },
  { data: '14/09 · 00:06', hash: '37c94a8', texto: 'Texto secundário abaixo do contraste mínimo (AA) é corrigido no Calibre, no Cerne e na Taça.' },
  { data: '15/09 · 16:15', hash: 'dd7abb8', texto: 'Uma avaliação conclui que o Calibre “já excede” o nível pedido e só ganha polimento de hover.' },
  { data: '15/09 · 16:54', hash: '6423a38', texto: 'Rework total: o 3D sai por completo e o mostrador vira a navegação, ao vivo.' },
  { data: '16/09 · 11:24', hash: '728be92', texto: 'Corrige o estouro dos rótulos do relógio em telas pequenas.' },
  { data: '16/09 · 17:59', hash: '7a8b7a2', texto: 'Fontes com serifa dos títulos trocadas por grotesca em todo o portfólio (hoje o título do Calibre usa Syne).' },
]

export default function CaseStudyCalibre() {
  return (
    <>
      <Seo
        title="Making of: Calibre — o relógio que é o menu | Madolio"
        description="Como o Calibre, conceito de relojoaria artesanal, trocou o 3D por um relógio analógico funcionando na hora do visitante, onde os números 12, 4 e 8 são a navegação. Mexa no mostrador e veja os problemas resolvidos."
        path="/projetos/calibre"
      />

      <Capa
        nome="Calibre"
        nicho="Relojoaria artesanal (conceito)"
        resumo={
          <>
            Um site de relojoaria que foi refeito do zero depois que a primeira ideia, um mecanismo em 3D, foi
            rejeitada. A segunda: o mostrador de um relógio de verdade, na hora do visitante, é o menu da página.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Relojoaria artesanal' },
          { rotulo: 'Empresa', valor: 'Fictícia (conceito)' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4 · GSAP' },
          { rotulo: 'Primeiro commit', valor: '13/09/2026' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/calibre/hero.jpg"
          alt="Página inicial do Calibre: título 'O relógio certo, à vista' e um mostrador analógico com ponteiros dourados, com os rótulos Modelos, Como nasce e Encomendar em volta."
          width={1280}
          height={800}
          url="calibre.fenoninho-max.workers.dev"
          legenda="A home do Calibre, no ar. Os ponteiros estão na hora real de quem abre a página."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Rejeitado por inteiro">
        <Prosa>
          <p>
            O Calibre é um conceito (a empresa não existe). Nasceu como uma cena 3D: um calibre de relógio gerado por
            coordenadas, com peças que se juntavam ao entrar e uma coroa que se girava para dar corda. O primeiro commit é de
            13/09 (aad103d). Depois disso, veio este pedido, registrado no CLAUDE.md do projeto:
          </p>
        </Prosa>
        <div className="mt-8">
          <Briefing rotulo="Pedido de refação" quando="15/09/2026">
            Refazer por inteiro: a ideia em 3D não funcionou, então o site precisa de outra ideia.
          </Briefing>
        </div>
        <div className="mt-8">
          <Prosa>
            <p>
              O nicho ficou (relojoaria); a execução inteira saiu. O CLAUDE.md registra que o código do 3D foi removido
              por completo, e não deixado morto: a pasta da cena, o estado compartilhado e as dependências do React
              Three Fiber, incluindo o <code className="font-mono text-base">three</code>.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="O mostrador é a navegação">
        <Prosa>
          <p>
            Em vez de mostrar o mecanismo por dentro, a ideia foi para o lado oposto: um relógio analógico funcionando,
            atualizado a cada segundo com <code className="font-mono text-base">setInterval</code>, sem biblioteca. Três
            marcas do mostrador são links: 12 leva a Modelos, 4 a Como nasce, 8 a Encomendar. O componente é um só
            (<code className="font-mono text-base">RelogioNav.tsx</code>) e aparece em duas escalas: grande no hero, e
            em miniatura na barra fixa do topo.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Marcas que navegam', valor: '3', nota: '12, 4 e 8, a 0°, 120° e 240° do mostrador, uma por seção da página.' },
              { rotulo: 'Bundle JS hoje', valor: '350 kB', nota: 'Medido em build de produção agora: 349,70 kB (118,77 kB com gzip).' },
              { rotulo: 'Latão sobre o fundo', valor: '8,13:1', nota: '#caa25e sobre #120d08, calculado. Mínimo WCAG AA pra texto: 4,5:1.' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa no relógio" titulo="A hora é a sua">
        <Prosa>
          <p>
            É a mesma matemática do site: o ponteiro das horas anda{' '}
            <code className="font-mono text-base">(h + min/60) × 30°</code>, o dos minutos{' '}
            <code className="font-mono text-base">(min + seg/60) × 6°</code>. Deixe a hora vazia para ver a sua, ou
            digite uma e confira os ângulos. Com movimento reduzido ativo no sistema, os ponteiros ficam parados.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <CalibreDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/calibre/catalogo.jpg"
          alt="Seção de modelos do Calibre com cartões de relógios desenhados em SVG, ponteiros parados às 10h09."
          width={1280}
          height={837}
          url="calibre.fenoninho-max.workers.dev/#catalogo"
          legenda="O catálogo: os mostradores dos modelos são SVG, com ponteiros sempre às 10h09, sem nenhuma foto de relógio."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões com evidência" titulo="Por que tem dois relógios">
        <Prosa>
          <p>
            O mostrador grande só existe no hero. Rolando a página, a navegação sumiria, quebrando o padrão do
            repositório de nav sempre visível. A solução, registrada no CLAUDE.md, foi renderizar o mesmo componente
            numa versão <code className="font-mono text-base">compacto</code> dentro da barra do topo: mesma hora, só
            em miniatura. A seção visível é detectada com{' '}
            <code className="font-mono text-base">IntersectionObserver</code> e acende o ponto correspondente em
            latão.
          </p>
          <p>
            A cor de aço azulado, <code className="font-mono text-base">#3a5a72</code>, fica reservada ao ponteiro dos
            segundos do mostrador grande: sobre o fundo dá só 2,65:1, longe de servir para texto, mas como traço
            decorativo de 1 px cumpre o papel do &quot;blued steel&quot; da relojoaria.
          </p>
        </Prosa>
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Três problemas reais">
        <div className="space-y-8">
          <Ficha
            titulo="Texto secundário abaixo do contraste mínimo"
            sintoma="Textos pequenos de apoio no Hero e no Contato usavam cream com 50% de opacidade sobre o fundo escuro."
            causa="A olho nu parecia legível. Medido, ficava um fio abaixo do mínimo AA de 4,5:1."
            correcao="Opacidade subiu de 50% para 60% nos dois lugares (commit 37c94a8), mantendo a hierarquia de texto secundário."
          >
            <p className="font-mono text-sm break-words text-ink/75">
              #ede3d0 a 50% sobre #120d08 = 4,43:1 (falha) · a 60% = 5,92:1 (passa)
            </p>
          </Ficha>

          <Ficha
            titulo="Rótulos do relógio estouravam a tela do celular"
            sintoma="Em telas estreitas, os rótulos de texto em volta do mostrador causavam overflow horizontal."
            causa="Os rótulos usam whitespace-nowrap e ficam posicionados fora do círculo, então passam da largura disponível."
            correcao="Abaixo do breakpoint md os rótulos somem e ficam só os pontos, com o nome no atributo title (commit 728be92)."
          >
            <pre className="overflow-x-auto font-mono text-sm text-ink/75">{`- className="absolute -translate-x-1/2 ... text-xs"
+ className="absolute hidden -translate-x-1/2 ... text-xs md:inline-block"`}</pre>
          </Ficha>

          <Ficha
            titulo="A navegação sumia depois do primeiro scroll"
            sintoma="Com o mostrador grande só no hero, quem rolava a página ficava sem menu."
            causa="A navegação era o próprio mostrador, e ele saía da tela junto com o hero."
            correcao="Segunda instância do mesmo componente, em miniatura, na barra fixa (prop compacto)."
          >
            <p className="font-mono text-sm text-ink/75">
              Hero.tsx renderiza {'<RelogioNav />'} · Nav.tsx renderiza {'<RelogioNav compacto />'}
            </p>
          </Ficha>
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/70">
          Datas e hashes do histórico real do repositório (git log de calibre/). A lista omite commits que mexeram em
          vários sites de uma vez, como o do &lt;dialog&gt;.
        </p>
      </Secao>

      <CtaMakingOf
        nome="Calibre"
        url="https://calibre.fenoninho-max.workers.dev"
        texto="Veja o mostrador na sua hora e clique nos números 12, 4 e 8."
      />
    </>
  )
}
