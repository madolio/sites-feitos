import Seo from '../components/Seo'
import TornoDemo from '../components/makingof/demos/TornoDemo'
import { Capa, Briefing, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Torno. Números, arquivos e commits citados aqui são
// conferíveis em torno/CLAUDE.md, torno/src e no git log do repositório.
const marcos = [
  {
    data: '13/09 · 16:33',
    hash: '1a1e91c',
    texto:
      'Nasce o Torno, junto com o Cardume: o site é um torno de oleiro em 3D. Molda-se o barro arrastando, escolhe-se o esmalte e leva-se ao forno.',
  },
  {
    data: '16/09 · 17:59',
    hash: '7a8b7a2',
    texto: 'Commit que mexeu nas fontes de título de vários projetos do portfólio de uma vez, o Torno entre eles.',
  },
]

export default function CaseStudyTorno() {
  return (
    <>
      <Seo
        title="Making of: Torno — o site é um torno de oleiro | Madolio"
        description="Como o Torno, um site-conceito de ateliê de cerâmica, virou um torno em 3D: geometria de revolução reescrita a cada arrastada, esmalte que só mostra a cor no forno e os problemas reais de uma cena com bloom."
        path="/projetos/torno"
      />

      <Capa
        nome="Torno"
        nicho="Ateliê de cerâmica (fictício)"
        resumo={
          <>
            Sem seções, sem menu, sem rolagem: a tela inteira é um torno com um bloco de barro girando. Você molda,
            esmalta e queima, e a peça vira o pedido de inscrição na aula.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Ateliê de cerâmica (empresa fictícia)' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4 · three.js' },
          { rotulo: 'Primeiro commit', valor: '13/09' },
          { rotulo: 'Etapas', valor: 'Moldar · Esmaltar · Queimar' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/torno/hero.jpg"
          alt="Página inicial do Torno: um bloco de barro cinza girando sobre o torno em 3D, com o painel de etapas à direita mostrando 12 cm de altura e 15 cm de diâmetro."
          width={1280}
          height={800}
          url="torno.sneakpeek.workers.dev"
          legenda="A tela inicial: barro cru no torno e o painel com as três etapas."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Fugir de tudo que já foi feito">
        <Briefing rotulo="O pedido" quando="13/09">
          Fugir de tudo que já foi feito: efeitos visuais, 3D e nenhum medo de exagerar.
        </Briefing>
        <div className="mt-8">
          <Prosa>
            <p>
              O mesmo pedido gerou o Torno e o Cardume no mesmo commit. A resposta aqui foi trocar a página por um
              objeto: um torno de oleiro. As três etapas do painel são numeradas porque são uma sequência de verdade
              no ateliê: Moldar, Esmaltar, Queimar. A peça feita vira a mensagem de inscrição, com medidas, esmalte e
              turma.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Um perfil de 64 pontos, girado">
        <Prosa>
          <p>
            A peça é uma superfície de revolução feita à mão em vez de <code className="font-mono text-base">LatheGeometry</code>:
            recriar a geometria 60 vezes por segundo alocaria memória sem parar, então o buffer é criado uma vez e só
            posições e normais são reescritas. O perfil externo tem 64 amostras, do pé à borda, guardadas num
            Float32Array fora do React.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Pior contraste dos 5 esmaltes', valor: '6,15:1', nota: 'Celadon (#7fa38c) com texto #1d1b18. Os outros quatro ficam entre 8,39:1 e 16,68:1. Mínimo WCAG AA: 4,5:1.' },
              { rotulo: 'Cena 3D, comprimida', valor: '285 kB', nota: 'Chunk Atelie do npm run build: 284,93 kB gzip, à parte do resto (101,95 kB gzip).' },
              { rotulo: 'Amostras do perfil', valor: '64', nota: 'N em estado.ts. Cada arrastada reescreve esses 64 raios.' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa na peça" titulo="Forma e esmalte, com a conta">
        <Prosa>
          <p>
            Estas são as mesmas quatro formas prontas, os mesmos cinco esmaltes e a mesma regra de medidas do site.
            O site mede altura e diâmetro do perfil e dá um nome à peça; o esmalte cru é a cor misturada 58% com
            branco, porque a cor de verdade só aparece no forno.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <TornoDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/torno/vaso.jpg"
          alt="Torno com um vaso de barro cru moldado, mostrando 22 cm de altura e 19 cm de diâmetro no painel."
          width={1280}
          height={800}
          url="torno.sneakpeek.workers.dev"
          legenda="A forma pronta Vaso no site real: 22 cm por 19 cm, as mesmas medidas da demonstração acima."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões" titulo="Quatro materiais, uma geometria">
        <Prosa>
          <p>
            A mesma geometria é desenhada por quatro malhas recortadas por planos horizontais: barro molhado (só ao
            moldar), pé sem esmalte, esmalte cru e esmalte queimado. No forno, uma frente de fogo sobe convertendo
            esmalte cru em vítreo, e o pé fica sem esmalte como no ateliê de verdade. Enquanto queima, o estúdio
            apaga e a peça emite acima de 1,0, o que gera o bloom.
          </p>
          <p>
            A cor de destaque da interface inteira passa a ser a do esmalte escolhido. Por isso cada esmalte tem um
            texto próprio validado, e o pior caso é o 6,15:1 do celadon.
          </p>
        </Prosa>
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Problemas do caminho">
        <div className="space-y-8">
          <Ficha
            titulo="O bloom não acendia"
            sintoma="Emissão acima de 1,0 não virava brilho."
            causa="O pacote de pós-processamento desliga o tone mapping do renderer."
            correcao="Um ToneMapping ACES como último efeito, para que a emissão vire bloom antes de ser comprimida."
          >
            <p className="font-mono text-sm text-ink/75">cena/Atelie.tsx, linha 102: {'<ToneMapping mode={ToneMappingMode.ACES_FILMIC} />'}</p>
          </Ficha>
          <Ficha
            titulo="Escurecer o forno recompunha a tela toda"
            sintoma="Custo alto por quadro durante a queima."
            causa="A primeira versão escurecia o forno com um div em mix-blend-mode por cima do canvas."
            correcao="O escurecimento passou para dentro da cena: fundo, luzes e intensidade do ambiente caem com o calor."
          />
          <Ficha
            titulo="A captura de teste travava"
            sintoma="O Puppeteer congelava ao pausar a animação do forno."
            causa="page.evaluate devolvia a própria timeline do GSAP, e o Puppeteer tentava serializar esse grafo circular enorme."
            correcao="Chaves ao redor do pause(), para a função não retornar nada."
          >
            <p className="font-mono text-sm text-ink/75">{'page.evaluate(() => { tl.pause() })'}</p>
          </Ficha>
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/70">Datas e hashes do git log da pasta torno/.</p>
      </Secao>

      <CtaMakingOf
        nome="Torno"
        url="https://torno.sneakpeek.workers.dev"
        texto="Arraste o barro, escolha um esmalte e leve a peça ao forno."
      />
    </>
  )
}
