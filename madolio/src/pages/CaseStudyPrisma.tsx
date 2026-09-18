import Seo from '../components/Seo'
import PrismaDemo from '../components/makingof/demos/PrismaDemo'
import { Capa, Briefing, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Prisma. Números e arquivos vêm de prisma/CLAUDE.md, do
// código-fonte, de um build real e do git log.
const marcos = [
  { data: '16/09 · 15:00', hash: '0905144', texto: 'Nasce o Prisma: uma gema no hero com índice de refração real, e a correção do bug de stagger em botões.' },
  { data: '16/09 · 16:04', hash: '838deb2', texto: 'Vira configurador: peça (anel, colar) com a gema encaixada, em vez da gema sozinha.' },
  { data: '16/09 · 16:21', hash: '326363b', texto: 'Os brincos saem e entra a pulseira.' },
  { data: '16/09 · 16:32', hash: '297ce1b', texto: 'A pulseira vira uma pulseira de pedras em fileira, com fecho.' },
  { data: '16/09 · 16:47', hash: '9c19bf0', texto: 'Hero em duas colunas: joia à esquerda, escolha de peça e pedra à direita.' },
  { data: '16/09 · 16:57', hash: 'c42515b', texto: 'Pulseira centralizada na coluna; o catálogo redundante de gemas é trocado pela calculadora de aro.' },
  { data: '16/09 · 17:01', hash: 'e700a00', texto: 'Colar com corrente curva de verdade, no lugar de duas hastes retas.' },
  { data: '16/09 · 17:09', hash: '8e6a11f', texto: 'Correção de gemas que apareciam pretas e opacas em vez de brilhantes e facetadas.' },
  { data: '16/09 · 17:59', hash: '7a8b7a2', texto: 'Troca das fontes serifadas de título por fontes sem serifa, em todo o portfólio.' },
  { data: '17/09 · 11:20', hash: '2eb0afb', texto: 'A rotação automática passa a respeitar prefers-reduced-motion.' },
  { data: '17/09 · 12:21', hash: 'ee292d2', texto: 'robots.txt e sitemap.xml.' },
]

export default function CaseStudyPrisma() {
  return (
    <>
      <Seo
        title="Making of: Prisma — joia com índice de refração real | Madolio"
        description="O processo real por trás do Prisma, site-conceito de joalheria sob medida fictícia: um configurador 3D em que cada pedra usa o índice de refração da tabela gemológica. Mexa nos números, veja as capturas e os problemas."
        path="/projetos/prisma"
      />

      <Capa
        nome="Prisma"
        nicho="Joalheria sob medida"
        resumo={
          <>
            Um configurador 3D de joias fictício. Cada pedra é um material com o índice de refração e a dispersão de
            uma tabela gemológica, não um brilho desenhado a olho.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Joalheria sob medida' },
          { rotulo: 'Stack', valor: 'React 19 · Three.js · GSAP' },
          { rotulo: 'No ar desde', valor: '16/09/2026' },
          { rotulo: 'Pedras · peças', valor: '6 · 3' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/prisma/anel-rubi.jpg"
          alt="Hero do Prisma: um anel dourado em 3D com um rubi, e à direita os botões de peça (Anel, Colar, Pulseira) e de pedra."
          width={1280}
          height={800}
          url="prisma.fenoninho-max.workers.dev"
          legenda="A vitrine com o rubi (IOR 1,762). A captura foi feita com WebGL por software."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="A primeira versão foi rejeitada">
        <Prosa>
          <p>
            O CLAUDE.md descreve o ponto de partida como um site-conceito de joalheria sob medida em que a gema do
            hero usa física de refração de verdade. A primeira versão mostrava só a gema, um octaedro gigante
            girando sozinho. Segundo o mesmo arquivo, a reação foi de que a interatividade era fraca e o visual
            estranho:
          </p>
        </Prosa>
        <div className="mt-8">
          <Briefing rotulo="Reação à primeira versão" quando="16/09/2026">
            A primeira versão foi recusada: a gema ficou grande demais e o resultado desagradou.
          </Briefing>
        </div>
        <div className="mt-8">
          <Prosa>
            <p>
              Isso virou o commit 838deb2: em vez da gema sozinha, um configurador com a peça (aro de ouro, corrente
              ou pulseira) e a gema encaixada nela, em escala.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="O material é o dado">
        <Prosa>
          <p>
            Em <code className="font-mono text-base">prisma/src/data/gemas.ts</code> cada pedra tem o IOR e a
            dispersão de tabela gemológica. A cena repassa esses números ao material:{' '}
            <code className="font-mono text-base">ior={'{gema.ior}'}</code> e{' '}
            <code className="font-mono text-base">chromaticAberration={'{gema.dispersao * 8}'}</code>. A geometria é
            um octaedro simplificado, não uma lapidação de 50 facetas: o foco é o material.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Maior IOR', valor: '2,417', nota: 'Diamante. A ametista, a menor da lista, tem 1,544.' },
              { rotulo: 'Contraste do acento', valor: '7,61:1', nota: '#b98cff sobre #100c14. O mínimo WCAG AA para texto é 4,5:1.' },
              { rotulo: 'Cena 3D (chunk)', valor: '983 kB', nota: '265,28 kB com gzip, medido em npx vite build. O restante do site tem 347,54 kB (118,47 kB com gzip).' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa nos números" titulo="O que o IOR significa">
        <Prosa>
          <p>
            Os valores de IOR e dispersão são os do site. A lei de Snell e o ângulo crítico não estão no site: são
            física derivada do mesmo IOR, para mostrar o que o número faz com a luz. Escolha uma pedra e mude o ângulo
            de entrada.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <PrismaDemo />
        </div>
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2">
          <Figura
            n={2}
            src="/makingof/prisma/anel-diamante.jpg"
            alt="Anel dourado com um diamante de reflexos claros e faixas coloridas, com o texto 'Índice de refração real: 2.417 — Diamante'."
            width={1280}
            height={800}
            url="prisma.fenoninho-max.workers.dev"
            legenda="Diamante, IOR 2,417."
          />
          <Figura
            n={3}
            src="/makingof/prisma/colar-rubi.jpg"
            alt="Colar dourado com pingente em octaedro, na vitrine do Prisma."
            width={1280}
            height={800}
            url="prisma.fenoninho-max.workers.dev"
            legenda="O colar. A câmera é fixa: nesta coluna estreita ele sai cortado nas bordas, limitação registrada no CLAUDE.md."
          />
        </div>
      </Secao>

      <Secao n="04" rotulo="Decisões com evidência" titulo="Calculadora de aro e vitrine arrastável">
        <Prosa>
          <p>
            A vitrine usa <code className="font-mono text-base">OrbitControls</code> com zoom e pan desligados, para
            girar a peça com o mouse sem rolar a página. O catálogo de gemas que ficava mais abaixo foi removido
            porque repetia a escolha de pedra do hero, e no lugar entrou a calculadora de aro (
            <code className="font-mono text-base">Medida.tsx</code>): diâmetro = circunferência ÷ π e aro ≈ diâmetro em
            mm − 11,6, rotulada como estimativa que não substitui o anelímetro.
          </p>
        </Prosa>
        <Figura
          className="mt-10"
          n={4}
          src="/makingof/prisma/pulseira-ametista.jpg"
          alt="Pulseira em fileira de pedras em torno de um aro, com um vão e fecho de um lado, na vitrine do Prisma."
          width={1280}
          height={800}
          url="prisma.fenoninho-max.workers.dev"
          legenda="A pulseira: 15 pedras pequenas em torno de um aro fino, segundo o CLAUDE.md."
        />
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Problemas reais">
        <div className="space-y-8">
          <Ficha
            titulo="A rotação automática ignorava prefers-reduced-motion"
            sintoma="Quem pede menos movimento no sistema ainda via a joia girando sem parar."
            causa="O autoRotate do OrbitControls rodava incondicionalmente, diferente do Reveal e das animações CSS, que já respeitavam a preferência."
            correcao="Commit 2eb0afb: um guard com matchMedia e autoRotate={!movimentoReduzido}."
          >
            <pre className="overflow-x-auto font-mono text-sm text-ink/75">{`- autoRotate
+ autoRotate={!movimentoReduzido}`}</pre>
          </Ficha>
          <Ficha
            titulo="Botões que ficavam invisíveis para sempre"
            sintoma="A grade de seis botões de gema ficava travada em opacity: 0, mesmo com onEnter e onComplete do GSAP disparando."
            causa="A combinação de stagger com ScrollTrigger once: true em botões que têm transition do Tailwind e className condicional. Isolado removendo o WebGL (não era a causa) e removendo o stagger (aí funcionou)."
            correcao="Cada botão virou seu próprio Reveal com delay manual crescente, sem a opção stagger. Registrado no CLAUDE.md e no commit inicial."
          />
          <Ficha
            titulo="Ajustar a cena sem olhar o resultado"
            sintoma="Gema flutuando longe da peça, gancho do brinco renderizado como blob e câmera errada deixando tudo gigante ou minúsculo."
            causa="O gancho tinha rotation passada como prop do cylinderGeometry em vez de no mesh, e a câmera foi calibrada sem conferir cada peça."
            correcao="Cada uma das peças foi conferida com screenshot real (Playwright). Depois, com o layout em duas colunas, foi preciso recalibrar a escala da pulseira."
          />
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/60">Datas e hashes do histórico real do repositório (git log).</p>
      </Secao>

      <CtaMakingOf
        nome="Prisma"
        url="https://prisma.fenoninho-max.workers.dev"
        texto="Escolha uma peça, troque a pedra e arraste para girar. Joalheria fictícia."
      />
    </>
  )
}
