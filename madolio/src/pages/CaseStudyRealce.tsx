import Seo from '../components/Seo'
import RealceDemo from '../components/makingof/demos/RealceDemo'
import { Capa, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Realce & Cia. O salão é REAL; o site é um redesenho conceitual,
// não o oficial. Fatos reais vêm de realce/CLAUDE.md; números vêm de
// realce/src/index.css, realce/src/data/servicos.ts e de um build real.
const marcos = [
  { data: '15/09 · 10:49', hash: '3a29fba', texto: 'Nasce o redesenho conceitual do salão de São Roque, sem preços, nomes, depoimentos ou telefone.' },
  { data: '15/09 · 11:02', hash: '03e4e3e', texto: 'Paleta trocada pela real do salão (preto, branco e dourado): a primeira versão tinha usado verde por engano.' },
  { data: '15/09 · 15:16', hash: '6881daf', texto: 'Corrige a ordem das seções e a cor de hover da navegação.' },
  { data: '16/09 · 17:59', hash: '7a8b7a2', texto: 'Fontes dos títulos trocadas por grotesca em todo o portfólio (hoje o título usa Unbounded).' },
  { data: '18/09 · 11:27', hash: 'bd69900', texto: 'Adiciona a imagem de compartilhamento (og-image) que faltava.' },
]

export default function CaseStudyRealce() {
  return (
    <>
      <Seo
        title="Making of: Realce & Cia — o camarim que monta sua visita | Madolio"
        description="Como foi feito o redesenho conceitual do Realce & Cia, salão real de São Roque: navegação com lâmpadas de camarim e um montador de visita que soma os tempos e avisa se passa das 19h. Não é o site oficial do salão."
        path="/projetos/realce"
      />

      <Capa
        nome="Realce & Cia"
        nicho="Salão de beleza real · redesenho conceitual"
        resumo={
          <>
            Diferente dos outros projetos do portfólio, este salão existe: fica em São Roque (SP) desde 2004. O site é um
            redesenho conceitual feito pela Madolio, não o site oficial do salão, e por isso segue regras próprias.
          </>
        }
        fatos={[
          { rotulo: 'Negócio', valor: 'Real, em São Roque (SP)' },
          { rotulo: 'Este site', valor: 'Conceito, não oficial' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4' },
          { rotulo: 'Primeiro commit', valor: '15/09/2026' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/realce/hero.jpg"
          alt="Página inicial do redesenho do Realce & Cia: fundo preto, arco de lâmpadas acesas como um espelho de camarim e o título 'Salão e escola, no mesmo espelho.'"
          width={1280}
          height={800}
          url="realce.sneakpeek.workers.dev"
          legenda="O redesenho conceitual, no ar. A marca é a do salão; o texto e o design são da Madolio."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Um negócio de verdade">
        <Prosa>
          <p>
            O CLAUDE.md do projeto abre com um aviso: todos os outros projetos da pasta são negócios inventados, este
            não. Isso muda as regras. Como não temos a tabela do salão, nenhum preço aparece. Nenhum nome de
            profissional, depoimento, número de clientes ou prêmio, porque nada disso está no material público.
            Também não há telefone na página: todo botão passa pelo modo demonstração, para não atrair ligações reais
            para um salão que não encomendou este site. O rodapé declara que é conceito da Madolio e que os textos
            descritivos são ilustrativos.
          </p>
          <p>
            Os fatos reais usados, segundo o CLAUDE.md: nome, &quot;desde 2004&quot;, endereço, horário (segunda
            fechado, terça a sábado das 9h às 19h), a lista de serviços, e o fato de ser salão e escola. O que não é
            real: as descrições dos serviços e as durações usadas na agenda, que são estimativas de conceito.
          </p>
        </Prosa>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Um camarim, com luz que realça">
        <Prosa>
          <p>
            O conceito parte do nome: <em>Realce</em> é a luz que realça, então a página é um camarim de teatro, com
            parede preta, espelho e lâmpadas. A navegação (<code className="font-mono text-base">Marquise.tsx</code>)
            troca o sublinhado de seção ativa por uma lâmpada que acende. O hero e o CTA final são um espelho de camarim
            com lâmpadas dispostas por trigonometria em um arco, acendendo em sequência.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Lâmpadas do espelho', valor: '19', nota: '11 no arco e 4 em cada lado, conforme ARCO_QTD e LADO_QTD em Lampadas.tsx.' },
              { rotulo: 'Serviços na agenda', valor: '14', nota: 'Lista de serviços que o salão oferece, com durações estimadas em servicos.ts.' },
              { rotulo: 'Bundle JS hoje', valor: '243 kB', nota: 'Medido em build de produção agora: 243,10 kB (75,78 kB com gzip), sem biblioteca de animação.' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Monte uma visita" titulo="Quanto tempo leva o seu dia?">
        <Prosa>
          <p>
            O problema que o site resolve: com 14 serviços de durações muito diferentes, ninguém sabe o que cabe na
            própria manhã. Escolha serviços na ordem em que quer fazer e a hora de chegada. Cada início é o fim do
            serviço anterior, e a visita avisa se passa das 19h. Escolha os apliques (3h) e o dia da noiva (4h) e
            chegue às 17:00 para ver o aviso. As durações são estimativas do conceito, não do salão.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <RealceDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/realce/visita.jpg"
          alt="Seção Monte sua visita do Realce & Cia: serviços em cartões agrupados por tipo à esquerda e o painel Sua agenda, ainda vazio, à direita."
          width={1280}
          height={900}
          url="realce.sneakpeek.workers.dev/#visita"
          legenda="A seção real, sem nenhum serviço escolhido. A duração de cada serviço vem do mesmo arquivo que alimenta a lista."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões com evidência" titulo="Cor medida, não estimada">
        <Prosa>
          <p>
            A paleta é a do salão, extraída do CSS do tema do site atual e das cores pintadas na página. O dourado{' '}
            <code className="font-mono text-base">#c59d5f</code> é o do logo. O contraste foi calculado para cada par,
            e o resultado mostra uma assimetria em relação aos outros projetos: aqui o accent é claro, então falha no
            fundo claro e brilha no escuro.
          </p>
        </Prosa>
        <dl className="mt-8 grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-3 border-t-2 border-ink pt-5 text-ink/80">
          <dt>Dourado #c59d5f sobre preto</dt>
          <dd className="font-mono font-semibold text-ink">8,36:1 · passa</dd>
          <dt>Dourado escuro #8a6a2f sobre branco</dt>
          <dd className="font-mono font-semibold text-ink">5,02:1 · passa</dd>
          <dt>Dourado #c59d5f sobre branco</dt>
          <dd className="font-mono font-semibold text-ink">2,51:1 · falha como texto</dd>
        </dl>
        <p className="mt-4 max-w-3xl text-sm text-ink/70">
          Cálculo WCAG feito com os hex de realce/src/index.css. O mínimo AA para texto é 4,5:1. O CLAUDE.md lista 4,9:1
          e 4,3:1 para dois pares próximos; recalculados agora dão 5,02:1 e 4,18:1, e os valores desta página são os
          recalculados.
        </p>
        <div className="mt-6">
          <Prosa>
            <p>
              Por isso, em fundo claro o dourado só entra como preenchimento (botão, chip selecionado) ou decoração. Para
              texto dourado em fundo claro existe o token <code className="font-mono text-base">--color-dourado-escuro</code>.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Dois problemas reais">
        <div className="space-y-8">
          <Ficha
            titulo="A primeira paleta era verde, e o salão é dourado"
            sintoma="A primeira versão do redesenho saiu em verde e jade."
            causa="Uma leitura automática do site atual afirmou que o logo era verde/teal. Estava errada."
            correcao="A paleta foi extraída de duas fontes: o CSS do tema WordPress e as cores realmente pintadas na página, contadas por frequência (commit 03e4e3e)."
          >
            <p className="font-mono text-sm break-words text-ink/75">
              CSS do tema: rgba(195, 157, 84, 1) · cor pintada mais frequente: rgb(197, 157, 95) = #c59d5f
            </p>
          </Ficha>

          <Ficha
            titulo="O texto vazava do bloco de 30 minutos"
            sintoma="Na agenda, um serviço curto ficava menor que o próprio conteúdo, e o texto passava por cima do bloco seguinte."
            causa="A altura do bloco era fixa e proporcional à duração: um serviço de 30 min ficava com 56px na primeira versão, menos que horário, nome e botão juntos."
            correcao="Trocar height por min-height, com piso de 78px."
          >
            <pre className="overflow-x-auto font-mono text-sm text-ink/75">{`const altura = (minutos) => Math.max(78, minutos * 0.8)
// aplicado como min-height, nunca height. Ex.: 30 min -> 78px, 180 min -> 144px`}</pre>
          </Ficha>
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/70">Datas e hashes do histórico real do repositório (git log de realce/).</p>
      </Secao>

      <CtaMakingOf
        nome="Realce & Cia"
        url="https://realce.sneakpeek.workers.dev"
        texto="Conceito da Madolio, não o site oficial do salão. Monte uma visita e veja a que horas você sai."
      />
    </>
  )
}
