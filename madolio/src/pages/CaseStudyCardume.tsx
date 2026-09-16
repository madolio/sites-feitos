import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Cardume, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyCardume() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Cardume — Como um site vira uma experiência | Madolio"
        description="O processo real por trás do Cardume: um site pra escola de mergulho onde rolar a página é descer no oceano. Do pedido inicial aos problemas técnicos resolvidos no caminho."
        path="/projetos/cardume"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Cardume</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma escola de mergulho fictícia onde rolar a página é literalmente descer no oceano — 40 metros, em 3D,
            com um cardume de peixes de verdade fugindo do seu cursor. Aqui está o processo real por trás disso, não
            só o resultado.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Fuja de tudo que já fez, coloque efeitos visuais, 3D, se exalte."
          </blockquote>
          <p className="mt-4 text-ink/70">
            Não era pra ser mais um site institucional bonito — era pra ser um limite novo do que um site pode
            fazer. Isso mudou a pergunta de "como organizamos o conteúdo" pra "o que é a experiência de mergulhar,
            e como o scroll simula isso de verdade".
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            Em vez de seções empilhadas (hero, sobre, cursos, contato), a página inteira é uma coluna de água de 40
            metros. Não existe navegação tradicional — existe um <strong>profundímetro</strong>, uma régua clicável
            na lateral, porque é assim que um mergulhador real se orienta. Cada curso do calendário de aulas "mora"
            na profundidade máxima que ele libera: o Batismo aparece a 12m, o Advanced a 30m, o Deep Diver no fundo,
            a 40m.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a cena parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">A cor muda com a profundidade.</strong> O vermelho da luz é o primeiro a
              ser absorvido pela água — some já nos primeiros metros. Depois só sobra azul, e mais pra baixo,
              nem isso. A cena replica essa física em vez de escurecer tudo igual.
            </li>
            <li>
              <strong className="text-ink">O cardume foge do cursor.</strong> Cada peixe persegue um ponto numa
              "ciranda" ao redor do grupo, mantém distância dos vizinhos e se afasta quando o cursor se aproxima —
              o mesmo tipo de regra simples (boids) que faz cardumes de verdade se moverem em bloco.
            </li>
            <li>
              <strong className="text-ink">Abaixo de 24 metros, escurece de verdade.</strong> O sol já não alcança
              essa profundidade — então o cursor se torna uma lanterna, e só o que está dentro do facho fica visível.
              Tem garoupas grandes circulando ali no escuro, de propósito: no mergulho real, é assim que se encontra
              vida grande — não vendo tudo, vendo o que a luz revela.
            </li>
            <li>
              <strong className="text-ink">A subida tem uma parada de segurança de verdade.</strong> Clicar em
              "voltar à superfície" não teleporta — sobe aos poucos e para 3 segundos a 5 metros, a parada de
              descompressão que todo mergulhador certificado faz antes de encerrar um mergulho.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Três problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">A névoa da água tinha uma linha dura no horizonte.</strong> O motor de
              iluminação padrão (tone mapping) tratava a névoa e o fundo da cena de formas diferentes, criando uma
              costura visível onde não devia haver nenhuma. A correção foi desligar esse processamento extra — a cor
              crua ficou mais fiel à água real do que a versão "melhorada" automaticamente.
            </p>
            <p>
              <strong className="text-ink">A lanterna, vista de dentro, ficava apagada.</strong> Intuitivamente, o
              facho de luz devia brilhar mais olhando de frente pra ele. Na prática é o oposto — o brilho real de um
              facho de lanterna vem de olhar de raspão pra parede do cone, não de frente. Foi preciso inverter esse
              cálculo pra a luz parecer de verdade, não uma mancha.
            </p>
            <p>
              <strong className="text-ink">Partículas de neve marinha explodindo na tela.</strong> Sem um limite de
              tamanho, uma partícula que passasse muito perto da câmera virava um borrão cobrindo a tela inteira.
              Um teto simples no tamanho máximo resolveu — pequeno ajuste, grande diferença na sensação de estar
              submerso.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — desça até os 40 metros, fuja do cursor sendo um peixe, ou role rápido demais
            pra ver o alerta de subida acender.
          </p>
          <a
            href="https://cardume.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Cardume
          </a>
        </Reveal>
      </div>
    </section>
  )
}
