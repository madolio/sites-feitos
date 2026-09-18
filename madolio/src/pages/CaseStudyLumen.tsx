import Seo from '../components/Seo'
import LumenDemo from '../components/makingof/demos/LumenDemo'
import { Capa, Citacao, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Lúmen. Números e arquivos citados aqui vêm de lumen/CLAUDE.md,
// do código-fonte de lumen/, de um build real e do git log.
const marcos = [
  { data: '16/09 · 10:27', hash: 'f8720f4', texto: 'Nasce o Lúmen: hero com o cursor como única fonte de luz, catálogo com cone de feixe real e a calculadora luminotécnica.' },
  { data: '16/09 · 10:44', hash: 'e4ce759', texto: 'Os campos numéricos deixam de usar as setinhas nativas do navegador e ganham botões − e + no estilo do site.' },
  { data: '16/09 · 11:21', hash: 'b345a4d', texto: 'Animações de entrada ligadas ao scroll, junto com outros sites-conceito do portfólio.' },
  { data: '16/09 · 17:59', hash: '7a8b7a2', texto: 'Troca das fontes serifadas de título por fontes sem serifa, em todo o portfólio.' },
  { data: '17/09 · 11:20', hash: '9c97bc3', texto: 'Correção de foco visível: campo numérico sem contorno próprio e sem contraste suficiente.' },
  { data: '17/09 · 11:20', hash: '49688b0', texto: 'robots.txt e sitemap.xml.' },
  { data: '18/09 · 11:27', hash: 'bd69900', texto: 'Adiciona a imagem de compartilhamento que faltava (og-image).' },
]

export default function CaseStudyLumen() {
  return (
    <>
      <Seo
        title="Making of: Lúmen — o cursor que vira luminária | Madolio"
        description="O processo real por trás do Lúmen, site-conceito de um estúdio de projeto luminotécnico fictício: hero em que o cursor é a luminária e uma calculadora com a fórmula real de lux. Mexa na conta, veja os números medidos e os problemas."
        path="/projetos/lumen"
      />

      <Capa
        nome="Lúmen"
        nicho="Projeto luminotécnico"
        resumo={
          <>
            Um estúdio de iluminação fictício em que o hero começa no escuro e só existe onde o cursor aponta. Sem
            WebGL: a ousadia é toda em CSS e DOM, e a calculadora faz a conta que um projetista faria.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Projeto luminotécnico' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4' },
          { rotulo: 'No ar desde', valor: '16/09/2026' },
          { rotulo: 'Limite', valor: 'Sem WebGL' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/lumen/hero.jpg"
          alt="Hero do Lúmen: fundo preto, título 'A luz certa não é a mais forte. É a mais pensada.' iluminado ao centro e escurecendo nas bordas."
          width={1280}
          height={800}
          url="lumen.fenoninho-max.workers.dev"
          legenda="O hero no ar. O título só aparece por inteiro dentro do círculo de luz que segue o cursor."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Ousado, mas sem 3D">
        <Citacao quem="Briefing original, palavras exatas (lumen/CLAUDE.md)" quando="16/09/2026">
          seja ousado que nem a Cardume
        </Citacao>
        <div className="mt-8">
          <Prosa>
            <p>
              O CLAUDE.md do projeto registra o pedido assim e acrescenta a restrição: nada de WebGL ou three.js,
              porque esse orçamento de complexidade ficou reservado para a Cardume e o Torno. Sobrou CSS e DOM. A
              resposta foi uma “sala escura”: uma camada preta cobre o hero e um buraco de luz segue o mouse.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Nenhuma cor decorativa">
        <Prosa>
          <p>
            A regra do Lúmen é que cor e forma saem de dado real. A cor de cada luminária vem de uma conversão de
            temperatura de cor (Kelvin) para RGB, o cone do catálogo é desenhado com o ângulo de feixe da peça, e a
            calculadora usa a fórmula de projeto luminotécnico.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Luminárias no catálogo', valor: '5', nota: 'Cada uma com watts, lumens, ângulo e Kelvin em lumen/src/data/luminarias.ts.' },
              { rotulo: 'Contraste do acento', valor: '11,36:1', nota: '#ffb46b sobre #0a0908. O mínimo WCAG AA para texto é 4,5:1.' },
              { rotulo: 'JavaScript do site', valor: '349,81 kB', nota: '118,72 kB com gzip, medido em npx vite build (um único arquivo JS).' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa na conta" titulo="Quantas luminárias cabem no ambiente">
        <Prosa>
          <p>
            Esta é a lógica da calculadora do site, com os mesmos lux de referência, os mesmos fatores (utilização
            0,7 e manutenção 0,8) e as mesmas luminárias. Troque o ambiente e a peça: a conta aparece escrita, junto
            com o cone e a cor que o site desenharia.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <LumenDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/lumen/calculadora.jpg"
          alt="Seção Calculadora do Lúmen com largura 4, comprimento 5, sala de estar e pendente selecionados, resultando em 4 luminárias e 60W."
          width={1280}
          height={933}
          url="lumen.fenoninho-max.workers.dev/#calculadora"
          legenda="A calculadora no site real, com os valores iniciais: 4 × 5 m, sala de estar, pendente, 4 luminárias."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões com evidência" titulo="O cone e a cor vêm de números">
        <Prosa>
          <p>
            No catálogo, o triângulo de cada luminária tem largura calculada por{' '}
            <code className="font-mono text-base">altura × tan(ângulo ÷ 2)</code>, com o ângulo de catálogo, e a cor
            vem de <code className="font-mono text-base">kelvinParaRgb</code> (aproximação de Tanner Helland do
            espectro de corpo negro, em <code className="font-mono text-base">lumen/src/cor.ts</code>). O efeito do
            cursor só liga com <code className="font-mono text-base">(hover: hover) and (pointer: fine)</code>: no
            toque não existe posição do cursor antes do clique, então o celular recebe o conteúdo visível.
          </p>
          <p>
            As variáveis <code className="font-mono text-base">--mx</code> e <code className="font-mono text-base">--my</code>{' '}
            são escritas direto no DOM por um loop de <code className="font-mono text-base">requestAnimationFrame</code>,
            fora do React, para não renderizar a árvore inteira a cada movimento do mouse.
          </p>
        </Prosa>
        <Figura
          className="mt-10"
          n={3}
          src="/makingof/lumen/catalogo.jpg"
          alt="Catálogo do Lúmen com cinco cartões de luminárias, cada um com um cone de luz de largura e cor diferentes, e ficha de fluxo, potência, feixe e temperatura."
          width={1280}
          height={1113}
          url="lumen.fenoninho-max.workers.dev/#catalogo"
          legenda="Do spot de 24° à fita de 180°: o cone muda de largura porque o ângulo muda."
        />
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Problemas reais">
        <div className="space-y-8">
          <Ficha
            titulo="O TypeScript não estreitava o tipo do ref"
            sintoma="Erro de tipo em Hero.tsx mesmo depois de um if (!x) return."
            causa="O TypeScript não estreita ref.current dentro de uma function declarada no mesmo closure, mesmo depois do guard."
            correcao="Anotação de tipo explícita e ! no ponto de uso, em vez de confiar no estreitamento. Está no CLAUDE.md como gotcha."
          />
          <Ficha
            titulo="O acento não é exatamente 2700 K"
            sintoma="O comentário em index.css diz que --color-acento é a temperatura 2700 K convertida por kelvinParaRgb e validada em cerca de 9:1."
            causa="Conferindo com a mesma função: 2700 K dá rgb(255 167 87), que é #ffa757, e não #ffb46b. O contraste medido de #ffb46b é 11,36:1."
            correcao="Nesta página o acento é tratado como uma cor quente próxima de 2700 K, sem afirmar que é igual. O contraste aqui é o medido, não o do comentário."
          >
            <p className="font-mono text-sm break-words text-ink/75">
              kelvinParaRgb(2700) = rgb(255 167 87) = #ffa757 · acento no CSS = #ffb46b · contraste #ffb46b / #0a0908 = 11,36:1
            </p>
          </Ficha>
          <Ficha
            titulo="Campo numérico sem foco visível"
            sintoma="Quem navega por teclado não via onde estava o foco no campo de largura e comprimento."
            causa="A classe do input tinha outline-none e nenhum contorno de substituição."
            correcao="Commit 9c97bc3: focus-visible:outline-2 no input e uma regra global :focus-visible com contorno de 3px na cor do acento."
          >
            <pre className="overflow-x-auto font-mono text-sm text-ink/75">{`- ... text-marfim outline-none"
+ ... text-marfim focus:outline-none focus-visible:outline-2
+   focus-visible:outline-offset-2 focus-visible:outline-acento"`}</pre>
          </Ficha>
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/60">Datas e hashes do histórico real do repositório (git log).</p>
      </Secao>

      <CtaMakingOf
        nome="Lúmen"
        url="https://lumen.fenoninho-max.workers.dev"
        texto="Mova o cursor no hero e depois dimensione um ambiente na calculadora. Estúdio fictício."
      />
    </>
  )
}
