import Seo from '../components/Seo'
import CardumeDemo from '../components/makingof/demos/CardumeDemo'
import { Capa, Briefing, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Cardume. Números, arquivos e commits citados aqui são
// conferíveis em cardume/CLAUDE.md, cardume/src e no git log do repositório.
const marcos = [
  {
    data: '13/09 · 16:33',
    hash: '1a1e91c',
    texto:
      'Nasce o Cardume, junto com o Torno: rolar a página vira descer de 0 a 40 m, com superfície vista de baixo, cáusticas escritas do zero, bolhas, cardume que foge do cursor, lanterna no fundo e visor de mergulho.',
  },
]

export default function CaseStudyCardume() {
  return (
    <>
      <Seo
        title="Making of: Cardume — rolar a página é descer 40 metros | Madolio"
        description="Como o Cardume, um site-conceito de escola de mergulho, transforma o scroll em profundidade: a rampa de cor da água, o visor de mergulho e os problemas reais de uma cena 3D. Mexa na profundidade e veja a conta."
        path="/projetos/cardume"
      />

      <Capa
        nome="Cardume"
        nicho="Escola de mergulho (fictícia)"
        resumo={
          <>
            Um site sem seções e sem menu: o scroll inteiro é profundidade, de 0 a 40 m, num oceano 3D fixo atrás do
            texto. Abaixo, o que existe de verdade na página, medido no código.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Escola de mergulho (empresa fictícia)' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4 · three.js' },
          { rotulo: 'Primeiro commit', valor: '13/09' },
          { rotulo: 'Altura da página', valor: '10 telas = 40 m' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/cardume/hero.jpg"
          alt="Página inicial do Cardume: título Cardume sobre a superfície da água vista de baixo, com o visor de mergulho no canto superior esquerdo e a régua de profundidade à direita."
          width={1280}
          height={800}
          url="cardume.fenoninho-max.workers.dev"
          legenda="A home a 0,0 m: visor de mergulho no canto, régua de profundidade no lugar do menu."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Fugir de tudo que já foi feito">
        <Briefing rotulo="O pedido" quando="13/09">
          Fugir de tudo que já foi feito: efeitos visuais, 3D e nenhum medo de exagerar.
        </Briefing>
        <div className="mt-8">
          <Prosa>
            <p>
              O mesmo pedido gerou dois sites de uma vez, o Cardume e o Torno. Aqui a resposta foi eliminar o que
              todo site tem: não há seção, não há hero, não há barra de navegação. No lugar do menu, uma régua de
              profundidade com os cursos como marcas clicáveis. Cada curso aparece na profundidade máxima que ele
              libera: Batismo a 12 m, Open Water a 18 m, Advanced a 30 m, Deep Diver a 40 m.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Rolar é descer">
        <Prosa>
          <p>
            A página tem 10 telas de altura e um motor em <code className="font-mono text-base">requestAnimationFrame</code>{' '}
            converte a posição do scroll em profundidade, com inércia: a profundidade “atual” persegue a “alvo”, e a
            água freia. Esse estado vive fora do React, num objeto mutável, e o visor escreve direto no DOM.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Texto do visor e das placas', valor: '16,02:1', nota: '#eaf6f7 sobre #051a2a. O mínimo WCAG AA é 4,5:1.' },
              { rotulo: 'Cena 3D, comprimida', valor: '245 kB', nota: 'Chunk Oceano do npm run build: 244,92 kB gzip, carregado à parte do resto (102,18 kB gzip).' },
              { rotulo: 'Peixes na cena', valor: '140', nota: '80 no celular. Um InstancedMesh, com boids simplificado e fuga do cursor.' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Mexa na profundidade" titulo="A água, o visor e a bolha">
        <Prosa>
          <p>
            Esta é a mesma rampa de cor, a mesma curva de temperatura e a mesma tabela de limite sem parada que o
            site usa. Arraste a profundidade e veja o que muda, inclusive o tamanho que uma bolha teria ao chegar à
            superfície.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <CardumeDemo />
        </div>
      </Secao>

      <Secao n="04" rotulo="Decisões" titulo="O que a cena calcula">
        <Prosa>
          <p>
            A cor da água é uma rampa de seis paradas, de #8fdde3 na superfície a #04121f aos 40 m: o vermelho some
            primeiro, depois só sobra azul, depois nem ele. A temperatura tem uma termoclina entre 10 e 20 m. O
            tamanho das bolhas segue a lei de Boyle: o raio é proporcional à raiz cúbica da razão entre a pressão de
            onde nasceu e a pressão de onde está.
          </p>
          <p>
            As cáusticas (as linhas de luz do fundo) são bordas de células de Voronoi animadas, escritas do zero: o
            CLAUDE.md registra que os shaders de cáustica populares do Shadertoy têm licença não comercial.
          </p>
          <p>
            A subida automática do botão “Voltar à superfície” para 3 s aos 5 m, uma parada de segurança, com o
            visor contando os “3 min” 60 vezes mais rápido. Qualquer roda, toque ou tecla devolve o controle.
          </p>
        </Prosa>
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Problemas do caminho">
        <div className="space-y-8">
          <Ficha
            titulo="A névoa saía mais clara que o fundo"
            sintoma="Uma linha dura no horizonte, onde a névoa dos objetos encontrava a cor de fundo."
            causa="Com tone mapping ACES, a névoa dos objetos passava pela curva do renderer, mas a cor de fundo não passava."
            correcao="O Canvas ganhou a propriedade flat, que desliga o tone mapping."
          >
            <p className="font-mono text-sm text-ink/75">cena/Oceano.tsx, linha 52: flat</p>
          </Ficha>
          <Ficha
            titulo="Um floco de neve do tamanho da tela"
            sintoma="Uma partícula passando colada na câmera virava um borrão gigante."
            causa="O tamanho do ponto no shader não tinha teto."
            correcao="Limite no gl_PointSize da neve marinha."
          />
          <Ficha
            titulo="O facho da lanterna era invisível"
            sintoma="Abaixo de 24 m o cone de luz não aparecia."
            causa="Quem segura a lanterna olha de dentro do cone, quase na ponta, e vê a parede só de raspão. O brilho calculado pelo ângulo de frente (o intuitivo) dava quase zero."
            correcao="O brilho passou a vir do ângulo rasante: 1 − |n·v|."
          />
          <Ficha
            titulo="Peixes viraram silhuetas pretas"
            sintoma="Os peixes metálicos apareciam totalmente escuros."
            causa="Material metálico sem mapa de ambiente reflete escuridão."
            correcao="Pouco metal e um emissivo azul-petróleo fraco."
          />
          <Ficha
            titulo="Título largo demais no celular"
            sintoma="Overflow horizontal em telas estreitas."
            causa="A fonte Syne em peso 800 é muito larga."
            correcao="Título bem menor no celular."
          />
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/60">
          Datas e hashes do git log da pasta cardume/. O projeto tem um único commit próprio até agora.
        </p>
      </Secao>

      <CtaMakingOf
        nome="Cardume"
        url="https://cardume.fenoninho-max.workers.dev"
        texto="Role a página até o fundo, ligue a lanterna abaixo de 24 m e ache o naufrágio."
      />
    </>
  )
}
