import Seo from '../components/Seo'
import EstufaEspecimeDemo from '../components/makingof/demos/EstufaEspecimeDemo'
import { Capa, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Estufa Cheia. Números, hexes, hashes e créditos conferíveis em
// estufa/CLAUDE.md, estufa/src/components/Footer.tsx, estufa/public/especies e git log.
// Contrastes: razão WCAG calculada com os hexes de estufa/src/index.css.
const marcos = [
  { data: '17/09 · 12:42', hash: 'ab038e1', texto: 'Nasce o Estufa Cheia: seis espécies em fichas de herbário, ilustração em traço, uma videira que se desenha ao rolar a página.' },
  { data: '17/09 · 12:53', hash: 'cdf8625', texto: 'Fotos reais das espécies entram, a pedido do dono do portfólio (a página estava sem vida e sem cor). O select do formulário sai do azul e branco padrão.' },
  { data: '17/09 · 12:56', hash: 'ae58174', texto: 'Cada ficha ganha faixa e selo na cor real da flor, com texto claro ou escuro escolhido por luminância. A foto do hero fica menos escurecida.' },
  { data: '18/09 · 11:19', hash: '4732a8d', texto: 'Imagem de compartilhamento (og-image.jpg), que faltava neste projeto e foi achada numa varredura dos 33 projetos.' },
  { data: '18/09 · 17:09', hash: 'b422f2a', texto: 'Correção de contraste achada durante este making-of: rodapé subiu pra 7,55:1 e os selos de família passaram a escolher o texto pela razão WCAG real.' },
]

export default function CaseStudyEstufa() {
  return (
    <>
      <Seo
        title="Making of: Estufa Cheia — o catálogo botânico que virou site | Madolio"
        description="O processo real por trás do Estufa Cheia, uma floricultura fictícia feita como catálogo de botânica: seis espécies com dado real, fotos do Wikimedia Commons e um selo de família que escolhe a cor do texto por luminância."
        path="/projetos/estufa"
      />

      <Capa
        nome="Estufa Cheia"
        nicho="Floricultura e paisagismo"
        resumo={
          <>
            Uma floricultura que não vende buquê: mostra ficha de espécime, como um catálogo de botânica. Este é o
            caminho até ela, inclusive o que estava errado.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Floricultura e paisagismo' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4 · GSAP' },
          { rotulo: 'Primeiro commit', valor: '17/09/2026' },
          { rotulo: 'Negócio', valor: 'Fictício (conceito)' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/estufa/hero.jpg"
          alt="Página inicial do Estufa Cheia: foto de uma ave-do-paraíso laranja numa estufa, com o título 'Cada arranjo começa numa espécie de verdade.'"
          width={1280}
          height={800}
          url="estufa.fenoninho-max.workers.dev"
          legenda="A home do Estufa Cheia, no ar. A foto é da ave-do-paraíso (Wikimedia Commons); o texto por cima é do site."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Quatro respostas antes do código">
        <Prosa>
          <p>
            Não houve um briefing escrito além do nicho. O projeto começou por quatro decisões registradas no{' '}
            <code className="font-mono text-base">CLAUDE.md</code> do site, antes de qualquer tela:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Lugar de referência: uma estufa de vidro, um jardim botânico.</li>
            <li>Emoção em três segundos: abundância. Cor cheia, um jardim transbordando, o oposto do minimalismo vazio.</li>
            <li>A colisão: floricultura contra catálogo científico de botânica, com nome em latim, ficha de espécime e ilustração técnica.</li>
            <li>O que nunca ser: e-commerce genérico de flor, com grade de produto, preço e carrinho.</li>
          </ul>
        </Prosa>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Ficha de espécime, não card de produto">
        <Prosa>
          <p>
            No lugar de um card de produto, cada planta tem uma ficha: nome binomial com a autoridade botânica, família,
            luz, água, estação de floração e nível de cuidado. Os dados seguem referência de catálogo e de viveiro, não
            foram inventados pra encher a tela. São seis espécies, no lugar de um catálogo enorme: preferiu-se
            profundidade de dado por espécie a quantidade.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Espécies', valor: '6', nota: 'Cada uma com nome binomial, família, luz, água, floração e nota biológica própria (estufa/src/data/especies.ts).' },
              { rotulo: 'Fotos reais', valor: '5', nota: 'Cinco fotógrafos do Wikimedia Commons, seis arquivos em estufa/public/especies, cerca de 1,04 MB no total.' },
              { rotulo: 'Selos abaixo de 4,5:1', valor: '0/6', nota: 'Depois da correção b422f2a o pior selo tem 4,59:1 (antes, 4 de 6 ficavam abaixo). Veja na demo.' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa e veja" titulo="Escolha uma espécie">
        <Prosa>
          <p>
            Os dados são os mesmos do catálogo. O selo de família escolhe entre texto escuro e claro pelo maior contraste WCAG e, se nem o melhor chega a 4,5:1, ajusta o fundo aos poucos. A demo repete essa regra e mostra a cor do selo e o contraste real.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <EstufaEspecimeDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/estufa/especies.jpg"
          alt="Seção de espécies do Estufa Cheia com três fichas: ave-do-paraíso, bromélia-prateada e helicônia, cada uma com foto, selo de família colorido e dados de luz, cuidado, floração e água."
          width={1280}
          height={1000}
          url="estufa.fenoninho-max.workers.dev/#especies"
          legenda="As mesmas fichas dentro do site real (primeiras três de seis)."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões com evidência" titulo="Paleta, fotos e formulário">
        <Prosa>
          <p>
            A paleta tem cinco tokens: mata <code className="font-mono text-base">#10241c</code>, vidro{' '}
            <code className="font-mono text-base">#f3efe1</code>, musgo <code className="font-mono text-base">#4c7a3f</code>,
            terracota <code className="font-mono text-base">#c17a3a</code> e linha{' '}
            <code className="font-mono text-base">#d8cfb8</code>. O texto principal, mata sobre vidro, dá 14,13:1 de
            contraste.
          </p>
          <p>
            As fotos vieram do Wikimedia Commons, sob CC BY ou CC BY-SA, com crédito no rodapé: Tanvi.sharmaaa, Dick
            Culbert, 小石川人暉, Priskamarsila29 e Krzysztof Ziarnek. A ilustração técnica em SVG continua por cima,
            no canto, como selo de herbário. O formulário de encomenda monta a mensagem a partir da espécie escolhida,
            e no modo demonstração nenhum botão abre um WhatsApp real.
          </p>
        </Prosa>
        <Figura
          className="mt-10"
          n={3}
          src="/makingof/estufa/encomenda.jpg"
          alt="Formulário de encomenda do Estufa Cheia sobre fundo verde escuro, com seletor de espécie e campo de ocasião."
          width={1280}
          height={587}
          url="estufa.fenoninho-max.workers.dev/#encomenda"
          legenda="O formulário de encomenda, em verde-mata."
        />
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Três problemas, todos resolvidos">
        <div className="space-y-8">
          <Ficha
            titulo="A primeira versão não tinha vida"
            sintoma="Página sem cor e sem foto, pouco viva pra uma floricultura. O dono do portfólio disse isso direto."
            causa="A primeira versão só tinha ilustração em traço num fundo quase vazio."
            correcao="Fotos reais de cada espécie (cdf8625) e, depois, faixa e selo na cor real da flor (ae58174)."
          />
          <Ficha
            titulo="O select saía em branco e azul do navegador"
            sintoma="A lista de espécies do formulário aparecia com o estilo padrão do navegador, fora da paleta."
            causa="Um select nativo abre a lista com as cores do sistema, a menos que se diga o contrário."
            correcao="color-scheme: dark no select e opções com fundo mata e texto vidro (cdf8625, em Encomenda.tsx)."
          />
          <Ficha
            titulo="Contraste fraco no rodapé e nos selos"
            sintoma="Achado ao medir o site durante este making-of: duas linhas do rodapé com 2,50:1 e 3,40:1, e quatro selos de família com 2,73, 3,19, 2,70 e 3,88:1. O mínimo WCAG AA pra texto é 4,5:1."
            causa="Rodapé: texto com classe de opacidade (vidro/30 e vidro/40) copiada sem medir. Selos: um atalho de luminância (corte em 0,6) no lugar da razão WCAG real."
            correcao="Rodapé em vidro/70 (7,55:1). Selo: escolhe o texto de maior contraste e, se preciso, mistura o fundo 6% por vez até 4,5:1. Só o rosa e o magenta mudaram de tom. Commit b422f2a."
          >
            <p className="font-mono text-sm text-ink/70">Rodapé: 2,50:1 e 3,40:1 → 7,55:1 nas duas linhas</p>
            <p className="mt-2 font-mono text-sm break-words text-ink/70">
              Selos, antes → depois: #f2661a 2,73 → 5,18 · #e0518c 3,19 → 4,70 · #ff5a36 2,70 → 5,24 · #c93fa0 3,88 → 4,59 · #7b4fd1 4,70 → 4,70 · #f0b429 8,73 → 8,73
            </p>
          </Ficha>
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/70">Datas e hashes do histórico real do repositório (git log).</p>
      </Secao>

      <CtaMakingOf
        nome="Estufa Cheia"
        url="https://estufa.fenoninho-max.workers.dev"
        texto="Role até o catálogo, veja a videira crescer e monte uma encomenda de demonstração."
      />
    </>
  )
}
