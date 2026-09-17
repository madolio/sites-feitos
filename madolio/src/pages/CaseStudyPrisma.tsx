import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Prisma, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyPrisma() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Prisma — Um configurador de joia que usa física de verdade | Madolio"
        description="O processo real por trás do Prisma: um configurador de joia sob medida onde cada gema refrata luz com o índice de refração real da pedra. Do pedido inicial aos problemas técnicos resolvidos no caminho."
        path="/projetos/prisma"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Prisma</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma joalheria sob medida fictícia onde o cliente monta a própria peça — aro, formato, pedra — e vê a gema
            brilhar com a física óptica real daquele mineral, não um brilho de efeito especial. Aqui está o processo
            real por trás disso, não só o resultado.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Quero que a pessoa monte a joia dela na tela antes de encomendar, e que pareça joia de verdade, não
            desenho."
          </blockquote>
          <p className="mt-4 text-ink/70">
            Isso descartava de cara qualquer solução de catálogo com fotos de peças prontas — a pessoa precisava
            escolher aro, tipo de peça e pedra e ver o resultado ali, girando, com a luz se comportando como luz de
            verdade se comporta dentro de uma gema. A pergunta virou "como simular óptica real dentro de um
            navegador", não "como desenhar um anel bonito".
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            Um configurador de verdade, não uma gema girando sozinha no vazio. A pessoa escolhe a peça (anel, colar
            ou pulseira) e a pedra, e a cena 3D monta a joia com a gema encaixada em escala real — aro de ouro,
            bail, fecho, tudo proporcional. O <strong>wildcard</strong> é que a refração de cada pedra usa o índice
            de refração (IOR) real daquele mineral: o diamante (IOR 2,417) refrata visivelmente mais luz que a
            ametista (IOR 1,544), porque são números tirados de tabela gemológica — o mesmo que um refratômetro de
            joalheiro mede na pedra física.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a peça parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">A gema não é decorativa — é um material físico.</strong> Cada pedra usa
              um material de transmissão de luz configurado com o índice de refração e a dispersão real daquele
              mineral, então a curvatura da luz dentro da gema muda de pedra pra pedra, exatamente como aconteceria
              numa lapidação física.
            </li>
            <li>
              <strong className="text-ink">A gema mora dentro da peça, em escala.</strong> A primeira versão
              mostrava só a pedra, gigante, girando sozinha — parecia um objeto solto, não uma joia. A versão final
              monta o aro (com geometria de ouro de verdade), o bail ou a tarraxa, e encaixa a gema nele em tamanho
              proporcional, do jeito que sairia da bancada de um joalheiro.
            </li>
            <li>
              <strong className="text-ink">Arrastar e girar, sem precisar rolar a página.</strong> A vitrine fica
              logo no início, com controle de órbita que trava zoom e movimento lateral mas libera a rotação manual
              — a pessoa gira a peça com o mouse pra ver as facetas de todos os ângulos, sem precisar descer a
              página pra achar essa interação.
            </li>
            <li>
              <strong className="text-ink">A calculadora de aro usa geometria real, não um número solto.</strong>
              Uma seção calcula o aro a partir da medida do dedo com a fórmula que joalherias usam de verdade
              (circunferência dividida por π, com o ajuste padrão pro aro brasileiro) — deixando claro que é uma
              estimativa, não substituto do anelímetro físico.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">A pulseira nasceu deslocada quando o layout mudou.</strong> A pulseira
              cravejada tinha posição e escala calibradas pra um canvas de tela cheia; quando o Hero passou a dividir
              a tela em duas colunas (joia de um lado, controles do outro), ela ficou grande demais e cortava o
              cabeçalho. Qualquer ajuste fino numa cena 3D fica amarrado ao layout do momento em que foi calibrado —
              mudar o layout ao redor exige reconferir visualmente cada peça, não só a que motivou a mudança.
            </p>
            <p>
              <strong className="text-ink">Uma pedra brincou de esconde-esconde da peça.</strong> Depois de trocar a
              gema sozinha por um configurador completo, a primeira tentativa deixou a pedra flutuando longe do aro
              em vez de encaixada, e o gancho do brinco virou um borrão sem forma — a rotação da peça estava sendo
              passada como propriedade da geometria em vez do objeto que a envolve. Só ficou visivelmente certo
              depois de testar cada peça com capturas de tela reais, não só lendo o código.
            </p>
            <p>
              <strong className="text-ink">Girar sem parar incomoda quem prefere menos movimento na tela.</strong>{' '}
              A vitrine gira sozinha por padrão pra mostrar a peça de todos os ângulos, mas descobrimos que quem
              prefere menos animação na tela via o anel girando sem parar mesmo tendo pedido ao sistema pra reduzir
              movimento. A rotação automática agora respeita essa preferência e para para quem configurou isso no
              navegador.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — monte um anel, um colar ou uma pulseira, troque a pedra e veja a luz mudar
            de comportamento em cada uma.
          </p>
          <a
            href="https://prisma.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Prisma
          </a>
        </Reveal>
      </div>
    </section>
  )
}
