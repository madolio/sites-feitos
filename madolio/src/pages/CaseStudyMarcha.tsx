import Seo from '../components/Seo'
import FinanciamentoDemo from '../components/makingof/FinanciamentoDemo'
import { Capa, Briefing, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Marcha. Cada número, arquivo e commit citado aqui é
// conferível no repositório (marcha/CLAUDE.md, marcha/public/carros, git log).
const fotos = [
  { arquivo: 'coupe-azul', legenda: 'Cupê 2 portas', md5: 'fe77e557' },
  { arquivo: 'esportivo-azul', legenda: 'Esportivo americano', md5: '74efca52' },
  { arquivo: 'muscle-preto', legenda: 'Muscle car preparado', md5: '1f19a998' },
  { arquivo: 'coupe-cinza', legenda: 'Cupê performance', md5: '1d5ac267' },
  { arquivo: 'esportivo-amarelo', legenda: 'Superesportivo V10', md5: '61cc3b0f' },
  { arquivo: 'hero', legenda: 'Fundo do hero', md5: '95cf3fb4' },
  { arquivo: 'floresta', legenda: 'Fundo do contato', md5: '75c04038' },
]

const marcos = [
  {
    data: '16/09 · 11:57',
    hash: 'b17aaaf',
    texto: 'Nasce o Marcha: primeiro projeto do portfólio com foto de verdade, e a calculadora com a Tabela Price.',
  },
  {
    data: '17/09 · 11:20',
    hash: 'dee312f',
    texto: 'As fotos passam a declarar largura e altura, pra página não pular de lugar quando a imagem termina de carregar.',
  },
  { data: '17/09 · 12:21', hash: 'ee292d2', texto: 'robots.txt e sitemap.xml — o site passa a se apresentar direito pra buscadores.' },
  { data: '18/09 · 11:27', hash: 'bd69900', texto: 'Imagem de compartilhamento, feita com a foto do hero, pra link colado em rede social ter capa.' },
]

export default function CaseStudyMarcha() {
  return (
    <>
      <Seo
        title="Making of: Marcha — a primeira loja do portfólio com foto de verdade | Madolio"
        description="O processo real por trás do Marcha, uma concessionária de esportivos com fotografia licenciada e uma calculadora de financiamento que faz a mesma conta da financeira. Mexa nos números, veja as fotos e os problemas resolvidos."
        path="/projetos/marcha"
      />

      <Capa
        nome="Marcha"
        nicho="Concessionária de esportivos (fictícia)"
        resumo={
          <>
            A primeira vez que a Madolio pôs foto de verdade num site — e tudo que isso exigiu. Mais uma calculadora
            de financiamento que faz a conta que a financeira faz, não um número que “parece certo”.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Concessionária de esportivos (empresa fictícia)' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4 · GSAP' },
          { rotulo: 'No ar desde', valor: '16/09/2026' },
          { rotulo: 'Regra quebrada', valor: '“Nunca foto”' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/marcha/hero.jpg"
          alt="Página inicial do Marcha: foto de uma mão ao volante de um carro ao entardecer, com o título 'Cada carro daqui já foi feito pra ser dirigido rápido.'"
          width={1280}
          height={800}
          url="marcha.sneakpeek.workers.dev"
          legenda="A home do Marcha, no ar. A foto é real (Unsplash License); o texto por cima é do site."
        />
      </Capa>

      <Secao n="01" rotulo="O pedido" titulo="Dessa vez, com fotos">
        <Briefing rotulo="O pedido" quando="16/09/2026">
          Uma concessionária de carros — e, dessa vez, com foto de verdade.
        </Briefing>
        <div className="mt-8">
          <Prosa>
            <p>
              Foto de verdade foi o pedaço que mudou o projeto. Até ali, cada site do portfólio fugia de foto de
              propósito — ilustração, 3D, esquema técnico — pra não parecer banco de imagens genérico. O Marcha foi o
              primeiro a fazer o contrário.
            </p>
            <p>
              Isso trouxe uma responsabilidade nova: cada foto precisava ser de uso livre de verdade, e nenhuma
              legenda podia inventar uma marca que a imagem não mostra. (Depois dele, o Estufa Cheia também passou a
              usar fotos reais — mas foi o Marcha que abriu a exceção.)
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Dado real, nas duas pontas">
        <Prosa>
          <p>
            O wildcard do Marcha não é um efeito visual — é uma regra: tudo que aparece na tela é verificável. As
            fotos vêm de um banco livre e foram conferidas uma a uma. O dinheiro segue a conta que qualquer
            financeira faz.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Fotos reais', valor: '7', nota: 'Todas do Unsplash, licença livre pra reuso, conferidas uma a uma antes de entrar.' },
              { rotulo: 'Taxa da simulação', valor: '1,49%', nota: 'Ao mês — média de mercado pra financiamento de veículo usado.' },
              { rotulo: 'Contraste do vermelho', valor: '5,55:1', nota: '#ff3b30 sobre #0b0b0c. O mínimo WCAG AA pra texto é 4,5:1.' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa na conta" titulo="A parcela, de verdade">
        <Prosa>
          <p>
            Esta é a calculadora do site, com os mesmos preços e a mesma taxa. Troque o carro, a entrada e o prazo: a
            parcela recalcula pela Tabela Price e a conta aparece escrita embaixo — nada de valor solto.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <FinanciamentoDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/marcha/financiamento.jpg"
          alt="Seção de financiamento do Marcha com seletor de carro, entrada e prazo, e a parcela calculada."
          width={1280}
          height={816}
          url="marcha.sneakpeek.workers.dev/#financiamento"
          legenda="A mesma calculadora dentro do site real."
        />
      </Secao>

      <Secao n="04" rotulo="Curadoria" titulo="Sete fotos, nenhuma placa legível">
        <Prosa>
          <p>
            As fotos passaram por uma peneira antes de entrar. Ficaram de fora as candidatas com placa real nítida —
            como um Porsche com placa americana legível — e nenhum carro foi legendado com a marca que a foto mostra.
            O estoque descreve categoria e ficha técnica genéricas (“cupê performance”, “muscle car preparado”),
            porque a ficha é fictícia e a foto não é de um carro que a loja tem.
          </p>
        </Prosa>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {fotos.map((f) => (
            <li key={f.arquivo}>
              <img
                src={`/makingof/marcha/fotos/${f.arquivo}.jpg`}
                alt={`${f.legenda} — foto real do acervo do Marcha`}
                width={520}
                height={347}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-lg border-2 border-ink object-cover"
              />
              <p className="mt-2 text-sm font-semibold text-ink">{f.legenda}</p>
              <p className="font-mono text-xs text-ink/70">md5 {f.md5}</p>
            </li>
          ))}
        </ul>
        <Figura
          className="mt-12"
          n={3}
          src="/makingof/marcha/estoque-topo.jpg"
          alt="Seção de estoque do Marcha com os cartões de carros, cada um com foto, categoria e ficha técnica."
          width={1280}
          height={880}
          url="marcha.sneakpeek.workers.dev/#estoque"
          legenda="O estoque no site: categoria e ficha técnica no lugar de marca."
        />
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Dois problemas no caminho">
        <div className="space-y-8">
          <Ficha
            titulo="A mesma foto entrou duas vezes"
            sintoma="Dois arquivos com nomes diferentes, imagem idêntica, ocupando dois lugares no estoque."
            causa="A mesma URL do Unsplash foi reaproveitada por engano em dois downloads diferentes."
            correcao="Um md5sum nos 7 arquivos antes de montar o site. Nome de arquivo não denuncia duplicata; o conteúdo, sim."
          >
            <p className="font-mono text-sm text-ink/75">$ md5sum public/carros/*.jpg</p>
            <p className="mt-2 font-mono text-sm break-words text-ink/70">
              {fotos.map((f) => f.md5).join(' · ')} (7 diferentes)
            </p>
          </Ficha>

          <Ficha
            titulo="O vermelho parecia legível — e era?"
            sintoma="Numa paleta preta com vermelho de acento, é fácil escolher um tom que parece ótimo a olho nu e falha no contraste."
            causa="Percepção não é medida: o olho perdoa o que o cálculo não perdoa."
            correcao="O tom foi medido antes de virar padrão: #ff3b30 sobre o preto do site dá 5,55:1, acima dos 4,5:1 do WCAG AA."
          >
            <div className="flex flex-wrap items-center gap-4 rounded-lg bg-[#0b0b0c] px-5 py-4">
              <span className="font-mono text-sm tracking-widest text-[#ff3b30] uppercase">Concessionária de esportivos</span>
              <span className="font-mono text-sm text-[#aab3c4]">#ff3b30 / #0b0b0c = 5,55:1</span>
            </div>
          </Ficha>
        </div>
      </Secao>

      <Secao n="06" rotulo="Um detalhe" titulo="Paralaxe sem biblioteca">
        <Prosa>
          <p>
            A foto do hero anda mais devagar que o scroll, com um loop de{' '}
            <code className="font-mono text-base">requestAnimationFrame</code> movendo um{' '}
            <code className="font-mono text-base">translate3d</code>. É um efeito contínuo, ligado à posição da
            página — não uma entrada única — então não precisou do GSAP que anima o resto do site. Quem prefere menos
            movimento na tela recebe a foto parada.
          </p>
        </Prosa>
      </Secao>

      <Secao n="07" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/70">Datas e hashes do histórico real do repositório (git log).</p>
      </Secao>

      <CtaMakingOf
        nome="Marcha"
        url="https://marcha.sneakpeek.workers.dev"
        texto="Escolha um carro, mexa na entrada e no prazo — a parcela sai da conta de verdade."
      />
    </>
  )
}
