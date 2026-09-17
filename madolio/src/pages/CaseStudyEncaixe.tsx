import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Encaixe, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyEncaixe() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Encaixe — Um orçamento de alfaiataria que se desenha ao vivo | Madolio"
        description="O processo real por trás do Encaixe: um site pra alfaiataria sob medida onde escolher peça, tecido e corte atualiza preço, prazo e o figurino técnico ao vivo — sem recarregar nada."
        path="/projetos/encaixe"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Encaixe</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma alfaiataria sob medida fictícia onde o site não mostra só um catálogo — ele monta o orçamento com
            você, ao vivo, peça por peça, tecido por tecido. Aqui está o processo real por trás disso, incluindo os
            dois caminhos que jogamos fora antes de chegar nele.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Aqui, muito ruim mesmo, reformule 100% até a ideia. Na verdade muda até essa ideia de móveis, me dá
            outras."
          </blockquote>
          <p className="mt-4 text-ink/70">
            O Encaixe nasceu, na verdade, como um site de marcenaria sob medida — passou por duas versões inteiras
            antes desse feedback direto derrubar não só a execução, mas o nicho todo. A resposta não foi ajustar
            layout: foi trocar de negócio inteiramente e provar que a mesma estrutura técnica aguentava outro ofício.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            As duas versões anteriores tentavam fazer um tema (o encaixe de marcenaria) carregar a navegação inteira
            — régua, slider, filtro. A virada foi perceber que ninguém fecha negócio com um alfaiate olhando uma
            metáfora: fecha vendo um número. Então o site oferece um <strong>configurador de orçamento</strong> de
            verdade: escolha a peça (blazer, calça, colete, camisa), o tecido (lã fria, linho, flanela, tweed,
            algodão egípcio) e o corte (slim, clássico, oversized), e o preço, o prazo e o figurino técnico ao lado
            atualizam na hora — nada de "solicitar orçamento" e esperar resposta.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem o orçamento parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">O preço nunca é um número solto.</strong> Cada peça tem um preço-base, e
              o tecido e o corte entram como multiplicadores sobre esse valor — do jeito que um alfaiate de verdade
              precifica (peça + material + complexidade do corte), não um preço fixo mascarado de "cálculo".
            </li>
            <li>
              <strong className="text-ink">O desenho técnico reage à escolha, não é decorativo.</strong> Ao lado do
              configurador tem um figurino técnico plano — o tipo de desenho que a indústria de moda usa pra
              registrar corte e costura, sem corpo dentro — que muda de peça conforme você escolhe blazer, calça,
              colete ou camisa. Nunca uma foto de roupa no site inteiro.
            </li>
            <li>
              <strong className="text-ink">O botão final já monta a mensagem inteira.</strong> Terminar a
              configuração não abre um formulário — dispara uma mensagem de WhatsApp pronta, com peça, tecido, corte,
              preço e prazo já escritos, porque o objetivo real do configurador é chegar numa conversa, não coletar
              um lead genérico.
            </li>
            <li>
              <strong className="text-ink">O nome sobreviveu à troca de negócio.</strong> "Encaixe" cabe tanto no
              sentido de marcenaria (a junta perfeita entre duas peças de madeira) quanto no de alfaiataria (o
              caimento perfeito de uma peça sob medida) — o que evitou trocar marca, domínio e toda a estrutura de
              arquivos quando o nicho mudou.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Dois problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">Textos colidindo no figurino técnico.</strong> Ao reescrever os desenhos
              de móvel pra desenhos de roupa, a cota de tamanho (embaixo do desenho) e o rótulo do detalhe em
              destaque (no meio da peça) ficaram próximos demais na calça e na camisa — o espaço vertical original,
              pensado pra elevação de móvel, era baixo demais pra essas duas peças. A correção foi aumentar a altura
              do quadro de desenho especificamente nessas duas peças e empurrar a cota de tamanho pra baixo de
              qualquer outro elemento.
            </p>
            <p>
              <strong className="text-ink">O navegador servia a versão antiga do site depois de um novo build.</strong>{' '}
              Depois de gerar uma nova versão dos arquivos, o servidor local de pré-visualização continuava
              respondendo com os nomes de arquivo antigos — o navegador pedia o `.js` novo e recebia HTML no lugar,
              porque o servidor não tinha percebido a troca sozinho. Reiniciar o servidor de pré-visualização depois
              de cada build resolveu — e virou hábito pra todos os projetos do estúdio que usam essa mesma
              infraestrutura.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — monte um blazer em lã fria, troque pra linho oversized e veja o preço e o
            figurino mudarem na hora.
          </p>
          <a
            href="https://encaixe.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Encaixe
          </a>
        </Reveal>
      </div>
    </section>
  )
}
