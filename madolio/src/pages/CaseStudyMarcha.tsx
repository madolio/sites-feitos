import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Marcha, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyMarcha() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Marcha — A única loja do portfólio com fotos de verdade | Madolio"
        description="O processo real por trás do Marcha: uma concessionária de esportivos com fotografia licenciada de verdade e uma calculadora de financiamento com a mesma fórmula usada por qualquer financeira. Do pedido inicial aos problemas resolvidos no caminho."
        path="/projetos/marcha"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Marcha</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma concessionária de esportivos fictícia que quebra, de propósito, a regra que o resto do portfólio
            segue: aqui tem foto de verdade. E uma calculadora de financiamento que faz conta de financeira de
            verdade, não um número inventado pra parecer bonito. Aqui está o processo real por trás disso, não só o
            resultado.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Quero uma agência de carros, dessa vez coloque até imagens."
          </blockquote>
          <p className="mt-4 text-ink/70">
            "Até imagens" era a parte que mudava tudo — todos os outros projetos do portfólio evitam foto de
            propósito, usando ilustração ou 3D pra não depender de imagens de estoque genéricas. Aqui o pedido pedia
            o oposto, e isso trouxe uma responsabilidade que nenhum outro projeto teve: garantir que cada foto fosse
            de uso livre de verdade, e que nenhuma legenda inventasse uma marca que a foto não mostra.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            O <strong>wildcard</strong> do Marcha não é um efeito visual — é o compromisso com dado real em duas
            frentes. Primeiro, as fotos: sete imagens de carros esportivos, todas de banco de imagens com licença
            livre pra reuso, conferidas uma a uma antes de entrar no site. Segundo, o dinheiro: uma calculadora de
            financiamento que usa a Tabela Price, a mesma fórmula de amortização que qualquer banco ou financeira
            usa pra calcular parcela de veículo — nunca um valor solto que "parece certo".
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem a loja parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">Nenhuma foto tem placa legível.</strong> Fotos candidatas com placa real
              nítida foram descartadas na curadoria — mesmo sendo um projeto fictício, expor uma placa real de
              terceiros numa foto de estoque não é um risco que vale a pena correr.
            </li>
            <li>
              <strong className="text-ink">Nenhum carro é vendido com a marca da foto.</strong> Cada item do estoque
              é descrito por categoria e especificação genérica — "cupê performance", "muscle car preparado" — nunca
              pelo nome da marca visível na imagem, porque a ficha do carro é fictícia e a foto não é literalmente
              daquele carro que a loja "tem".
            </li>
            <li>
              <strong className="text-ink">A parcela vem sempre do preço real daquele carro.</strong> A calculadora
              deixa escolher o carro do estoque, a entrada em porcentagem e o número de parcelas, e recalcula a
              prestação com a Tabela Price a partir do preço daquele item específico — trocar de carro muda a conta
              de verdade, não é decorativo.
            </li>
            <li>
              <strong className="text-ink">O efeito de paralaxe do hero é sob medida, sem biblioteca extra.</strong>
              A imagem de fundo se move mais devagar que o scroll através de um loop de animação leve, respeitando
              quem prefere menos movimento na tela — é um efeito contínuo, então não precisava da mesma ferramenta
              de entrada em cena usada no resto do site.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Dois problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">A mesma foto entrou duas vezes sem perceber.</strong> Duas fotos baixadas
              em momentos diferentes vieram do mesmo link de origem por engano, gerando dois arquivos idênticos com
              nomes diferentes no estoque. Nome de arquivo sozinho não denuncia isso — a checagem final comparou a
              impressão digital de cada uma das sete imagens antes de publicar, não só o nome delas.
            </p>
            <p>
              <strong className="text-ink">Cor de acento vermelha precisava provar que dava pra ler.</strong> Numa
              paleta escura com vermelho de destaque, é fácil escolher um tom que "parece" legível mas falha em
              contraste real contra o preto de fundo. O tom final foi validado formalmente antes de virar padrão do
              site — acima do mínimo de contraste recomendado pra leitura confortável, não só aprovado no olho.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — escolha um carro do estoque e simule o financiamento com entrada e parcelas
            de verdade.
          </p>
          <a
            href="https://marcha.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Marcha
          </a>
        </Reveal>
      </div>
    </section>
  )
}
