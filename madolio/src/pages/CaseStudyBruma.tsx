import Seo from '../components/Seo'
import BrumaDemo from '../components/makingof/demos/BrumaDemo'
import { Capa, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of da Bruma. Números e arquivos vêm de bruma/CLAUDE.md, do
// código-fonte, de um build real, de grep nos package.json e do git log.
const marcos = [
  { data: '16/09 · 17:38', hash: 'c947f96', texto: 'Nasce a Bruma: dois componentes prontos (shader e cartão que se endireita) adaptados para Vite, e os dados de perfumaria.' },
  { data: '16/09 · 17:59', hash: '7a8b7a2', texto: 'Troca das fontes serifadas de título por fontes sem serifa, em todo o portfólio.' },
  { data: '17/09 · 12:21', hash: 'ee292d2', texto: 'robots.txt e sitemap.xml.' },
]

export default function CaseStudyBruma() {
  return (
    <>
      <Seo
        title="Making of: Bruma — perfumaria com dado real | Madolio"
        description="O processo real por trás da Bruma, site-conceito de perfumaria artesanal fictícia: concentração de óleo e pirâmide olfativa reais, com um fundo em shader e um cartão de scroll adaptados de componentes de terceiros."
        path="/projetos/bruma"
      />

      <Capa
        nome="Bruma"
        nicho="Perfumaria artesanal"
        resumo={
          <>
            Uma perfumaria fictícia que mostra concentração de óleo essencial e pirâmide olfativa em vez de só nomes
            bonitos. O fundo em shader e o cartão de scroll vêm de componentes de terceiros, adaptados.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Perfumaria artesanal' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4 · framer-motion' },
          { rotulo: 'No ar desde', valor: '16/09/2026' },
          { rotulo: 'Sem foto', valor: 'Frasco em SVG' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/bruma/hero.jpg"
          alt="Hero da Bruma: fundo verde-esmeralda escuro em manchas de shader e o título 'Uma fragrância composta pra você, não escolhida numa vitrine.'"
          width={960}
          height={600}
          url="bruma.fenoninho-max.workers.dev"
          legenda="O hero no ar, com o shader ao fundo. Captura em 960 px de largura, feita com WebGL por software."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Componentes prontos e um tema">
        <Prosa>
          <p>
            Segundo a mensagem do primeiro commit (c947f96), o usuário colou dois componentes prontos, um shader
            “Silk” gerado no 21st.dev e o efeito Container Scroll no padrão Aceternity, e pediu uma página nova
            construída em torno deles, com o tema a escolher. O tema escolhido foi verde-esmeralda noturno, e o nicho,
            perfumaria artesanal. A mesma mensagem registra que não há fotos, seguindo o padrão do portfólio.
          </p>
        </Prosa>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Dado real de perfumaria">
        <Prosa>
          <p>
            Em <code className="font-mono text-base">bruma/src/data/fragancias.ts</code> cada fragrância tem a
            concentração de óleo (faixas padrão: Extrait 20–30%, EDP 15–20%, EDT 5–15%) e a pirâmide de notas de topo,
            coração e fundo. O CLAUDE.md diz que é a concentração, e não o preço do frasco, que determina quanto
            tempo o perfume dura na pele.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Fragrâncias', valor: '4', nota: 'Duas EDP (18% e 20%), um Extrait (25%) e uma EDT (10%), todas dentro da faixa do seu tipo.' },
              { rotulo: 'Contraste do acento', valor: '6,89:1', nota: '#3fae82 sobre #06120f. O mínimo WCAG AA para texto é 4,5:1.' },
              { rotulo: 'JavaScript do site', valor: '373,90 kB', nota: '119,62 kB com gzip, medido em npx vite build (um único arquivo JS).' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa na composição" titulo="Óleo, faixa e notas">
        <Prosa>
          <p>
            Estes são os dados do catálogo. Escolha uma fragrância: o percentual cai dentro da faixa do tipo dela e
            as notas aparecem na ordem em que o perfume as revela.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <BrumaDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/bruma/catalogo.jpg"
          alt="Seção 'Nosso catálogo' da Bruma com quatro cartões: Bruma Noturna, Raiz Seca, Flor de Sal e Fumaça Doce, cada um com concentração, duração e notas de topo, coração e fundo."
          width={1280}
          height={908}
          url="bruma.fenoninho-max.workers.dev"
          legenda="O catálogo real, com os mesmos números do demo acima."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões com evidência" titulo="O que é da Bruma e o que é de terceiros">
        <Prosa>
          <p>
            Dois componentes não foram escritos aqui. <code className="font-mono text-base">ShaderBackground.tsx</code>{' '}
            foi gerado pelo Shader Builder do 21st.dev (“Silk”) e adaptado: removeram o{' '}
            <code className="font-mono text-base">"use client"</code> do Next.js e trocaram a paleta de roxo para verde
            (constante <code className="font-mono text-base">VERDE_ESMERALDA</code>).{' '}
            <code className="font-mono text-base">ContainerScroll.tsx</code> segue o padrão Container Scroll Animation
            da Aceternity: trocaram <code className="font-mono text-base">next/image</code> por{' '}
            <code className="font-mono text-base">&lt;img&gt;</code> e o resto, a lógica de rotateX, scale e translateY
            ligada ao scroll via <code className="font-mono text-base">useScroll</code> e{' '}
            <code className="font-mono text-base">useTransform</code>, veio praticamente intacto.
          </p>
          <p>
            O que é da Bruma: o tema, os dados de perfumaria, o frasco em SVG desenhado com neblina animada em CSS e
            a montagem da página em volta dos dois componentes.
          </p>
        </Prosa>
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Problemas reais">
        <div className="space-y-8">
          <Ficha
            titulo="Uma afirmação de que a Bruma era única, e não era"
            sintoma="O CLAUDE.md da Bruma diz que ela é o único projeto do portfólio sem GSAP e que nenhum outro usa framer-motion. A página antiga repetia isso."
            causa="Conferindo os package.json dos 36 projetos: 32 têm gsap e 4 não têm (bruma, leads, madolio-admin e realce). Além da Bruma, doce-atelie e sabor-da-vila também dependem de motion, e importam de motion/react."
            correcao="Esta página diz só o que se verifica: a Bruma usa framer-motion (usado pelo componente de scroll que ela adaptou) e não usa GSAP, sem superlativo."
          >
            <p className="font-mono text-sm break-words text-ink/75">
              bruma: framer-motion ^12.6.3 · doce-atelie: motion ^13.2.0 (Stepper.tsx) · sabor-da-vila: motion ^13.2.0 (Comanda.tsx)
            </p>
          </Ficha>
          <Ficha
            titulo="Componentes escritos para outro framework"
            sintoma="Os dois componentes de terceiros vieram pensados para React com Next.js."
            causa="A diretiva use client e o next/image não existem num projeto Vite."
            correcao="Remover a diretiva e trocar next/image por img. O shader já não tinha dependências, então o resto veio igual."
          />
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/60">Datas e hashes do histórico real do repositório (git log).</p>
      </Secao>

      <CtaMakingOf
        nome="Bruma"
        url="https://bruma.fenoninho-max.workers.dev"
        texto="Role a página e veja o cartão se endireitar sobre o shader. Perfumaria fictícia."
      />
    </>
  )
}
