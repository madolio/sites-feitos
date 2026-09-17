import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Realce & Cia, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyRealce() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Realce & Cia — um espelho de camarim que monta sua visita | Madolio"
        description="O processo real por trás do Realce & Cia: o redesenho conceitual de um salão de beleza real, com navegação em forma de espelho de camarim e um montador de visita que calcula a agenda ao vivo."
        path="/projetos/realce"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Realce &amp; Cia</h1>
          <p className="mt-4 text-lg text-ink/70">
            Um redesenho conceitual pro Realce &amp; Cia, salão e escola de cabeleireiros de verdade em São Roque
            (SP) desde 2004. A navegação é um espelho de camarim onde cada seção acende uma lâmpada quando você
            chega nela, e o coração da página monta sua visita inteira em tempo real. Aqui está o processo real por
            trás disso — inclusive as regras extras de trabalhar com um negócio que existe de fato.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Quero ver como ficaria um redesenho do nosso site — sem tabela de preço, sem inventar depoimento, sem
            nada que a gente não tenha confirmado de verdade. E não quero parecer salão nenhum que já existe."
          </blockquote>
          <p className="mt-4 text-ink/70">
            Isso muda o exercício inteiro: não dá pra preencher buraco de conteúdo com placeholder bonito, porque
            cada frase precisa ser verificável num negócio real. E "não parecer nenhum salão que já existe" descartou
            de cara o kit visual padrão do nicho — rosa, dourado brilhante, mármore, fonte script — em favor de algo
            que viesse do próprio nome da marca: Realce, a luz que realça.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            O lugar/objeto virou camarim de teatro: parede escura, espelho com lâmpadas quentes ao redor, ferragem
            dourada. A navegação (<strong>Marquise</strong>) troca o sublinhado ou pílula comum de marcar a seção
            ativa por uma lâmpada que acende de verdade ao lado de cada item quando você entra naquela parte da
            página — a barra inteira é o espelho de camarim em miniatura. O wildcard é o <strong>Monte sua
            visita</strong>: um salão com 14 serviços de durações muito diferentes tem um problema real — ninguém
            sabe o que cabe na própria manhã. Então a página monta a agenda pra você, ao vivo.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a visita parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">A agenda se monta em cadeia, não em blocos soltos.</strong> Você escolhe
              os serviços na ordem que quer fazer e a hora de chegada; cada serviço vira um bloco com altura
              proporcional à própria duração, e o horário de início de um é calculado a partir do fim do anterior —
              como uma agenda de verdade, não uma lista genérica.
            </li>
            <li>
              <strong className="text-ink">A página avisa se a visita não cabe no expediente.</strong> Se a
              sequência escolhida passar das 19h (horário de fechamento), aparece um aviso — um detalhe que quase
              nenhum site de agendamento do nicho trata, mas que evita a pessoa chegar e descobrir na hora que não
              vai dar tempo.
            </li>
            <li>
              <strong className="text-ink">Nenhum número de telefone aparece na página.</strong> O salão publica
              dois números reais, mas mostrá-los aqui atrairia ligação de verdade pra um redesenho que eles não
              encomendaram — todo botão de contato passa por um modo demonstração explícito.
            </li>
            <li>
              <strong className="text-ink">A paleta foi extraída, não escolhida no olho.</strong> Uma primeira
              leitura automática do site atual apontou "verde/teal" — estava errada. A cor real (um dourado
              `#c59d5f`) veio do CSS gerado pelo tema WordPress deles e foi confirmada contando, por frequência,
              as cores efetivamente pintadas na página com `getComputedStyle`.
            </li>
            <li>
              <strong className="text-ink">O botão gera o WhatsApp com o itinerário inteiro escrito.</strong> Em vez
              do genérico "olá, quero agendar", a mensagem já sai com cada serviço, horário e duração da visita
              montada — o cliente do salão só confirma.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Três problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">O bloco de um serviço curto vazava o próprio conteúdo.</strong> Os blocos
              da agenda usavam altura fixa proporcional à duração — mas um serviço de 30 minutos gerava um bloco
              menor do que o texto que precisava caber nele (horário, nome, botão de remover), e o conteúdo
              transbordava por cima do bloco seguinte. A correção foi trocar altura fixa por altura mínima, com um
              piso de 78px garantindo espaço pro conteúdo em qualquer duração.
            </p>
            <p>
              <strong className="text-ink">O dourado da marca falha como texto em fundo claro.</strong> O mesmo
              dourado que rende 8,4:1 de contraste sobre preto cai pra 2,5:1 sobre branco — abaixo do mínimo de
              legibilidade. A solução foi ter duas variantes: o dourado claro entra só como preenchimento (botão,
              chip selecionado) em fundo claro, e um dourado mais escuro, testado separadamente, assume o papel de
              texto sempre que o fundo é claro.
            </p>
            <p>
              <strong className="text-ink">O modal de contato colava no canto da tela.</strong> Sem uma margem
              automática explícita, o reset de estilos padrão do Tailwind zera a margem de elementos como o modal —
              e ele nascia grudado no canto em vez de centralizado. Adicionar a margem automática de volta resolveu,
              um ajuste pequeno que também apareceu em outros projetos do mesmo tipo.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — acompanhe as lâmpadas acendendo na navegação e monte uma visita pra ver a
            agenda se calcular sozinha.
          </p>
          <a
            href="https://realce.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Realce &amp; Cia
          </a>
        </Reveal>
      </div>
    </section>
  )
}
