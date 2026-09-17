import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Bruma, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyBruma() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Bruma — Uma perfumaria com pirâmide olfativa de verdade | Madolio"
        description="O processo real por trás do Bruma: uma perfumaria artesanal sob medida onde cada fragrância mostra a concentração real de óleo essencial e a pirâmide olfativa completa. Do pedido inicial aos problemas resolvidos no caminho."
        path="/projetos/bruma"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Bruma</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma perfumaria artesanal fictícia onde cada frasco mostra a concentração real de óleo essencial e a
            pirâmide de notas completa, sobre um fundo de neblina em shader WebGL e um cartão que se endireita
            conforme você rola a página. Aqui está o processo real por trás disso, não só o resultado.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Quero uma perfumaria que pareça artesanal de verdade, não só um catálogo com nomes bonitos de perfume."
          </blockquote>
          <p className="mt-4 text-ink/70">
            "Nomes bonitos" era exatamente o risco a evitar — qualquer site de perfume consegue inventar nomes
            poéticos pras fragrâncias. O que faltava era o dado técnico que só um perfumista de verdade conhece:
            quanto de óleo essencial tem em cada frasco, e como o perfume evolui na pele ao longo do dia. A pergunta
            virou "como mostrar perfumaria como ofício", não "como deixar bonito".
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            O <strong>wildcard</strong> é a ficha técnica de cada fragrância ser dado real de perfumaria, não
            enfeite: a concentração de óleo essencial (Extrait, Eau de Parfum ou Eau de Toilette, cada uma com a
            faixa percentual padrão da indústria) — o número que de fato determina quanto tempo o perfume dura na
            pele — e a pirâmide olfativa completa, com notas de topo, coração e fundo, o conceito real que qualquer
            perfumista usa pra descrever como uma fragrância evolui do primeiro borrifo até horas depois.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a vitrine parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">Nenhum frasco é foto.</strong> Seguindo a convenção do resto do
              portfólio, o frasco em vitrine é um desenho vetorial — uma silhueta simples com neblina animada em
              volta — em vez de foto de estoque genérica, mantendo a identidade visual autoral do site.
            </li>
            <li>
              <strong className="text-ink">O fundo é um shader de verdade, não um gradiente.</strong> A neblina por
              trás da vitrine é renderizada em WebGL com código gráfico escrito à mão, não uma imagem ou gradiente
              CSS — dá um movimento orgânico e contínuo que nenhum gradiente estático replica.
            </li>
            <li>
              <strong className="text-ink">O cartão se endireita conforme a página rola.</strong> Cada fragrância
              aparece inclinada em perspectiva 3D e vai se achatando e centralizando conforme entra na tela — a
              inclinação, a escala e a posição vertical do cartão estão todas amarradas ao progresso do scroll, não
              a uma entrada única de "aparecer e sumir".
            </li>
            <li>
              <strong className="text-ink">A concentração determina o discurso, não o preço.</strong> A faixa de
              óleo essencial de cada frasco (Extrait, EDP ou EDT) é o dado que explica a durabilidade na pele — o
              texto de cada fragrância é escrito a partir desse número, não do valor de venda.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">Dois componentes prontos vieram de um mundo diferente.</strong> O shader
              de fundo e o cartão que se endireita foram adaptados de bibliotecas de componentes pensadas pra
              Next.js, não pro motor de build usado aqui — o shader precisou perder uma diretiva específica do outro
              framework, e o cartão precisou trocar o componente de imagem otimizada daquele framework por uma tag
              de imagem comum, sem perder o efeito.
            </p>
            <p>
              <strong className="text-ink">A ferramenta de animação de scroll do resto do site não servia aqui.</strong>{' '}
              O efeito do cartão que se endireita depende de ler continuamente o progresso do scroll, não de disparar
              uma entrada única quando o elemento aparece na tela — por isso o Bruma é o único projeto do portfólio
              que não usa a mesma biblioteca de animação dos outros, e sim uma abordagem baseada em progresso
              contínuo de scroll, mais adequada a esse tipo de efeito.
            </p>
            <p>
              <strong className="text-ink">A paleta precisava sair do roxo do componente original.</strong> O shader
              de neblina, como veio, usava tons de roxo que não combinavam com a identidade verde-esmeralda noturna
              do Bruma — a paleta de cor dentro do código do shader foi trocada ponto a ponto pra bater com o resto
              do site, mantendo o mesmo movimento e a mesma técnica.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — role a página pra ver os cartões se endireitarem, e confira a pirâmide
            olfativa de cada fragrância.
          </p>
          <a
            href="https://bruma.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Bruma
          </a>
        </Reveal>
      </div>
    </section>
  )
}
