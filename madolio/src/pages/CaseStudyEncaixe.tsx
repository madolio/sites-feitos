import Seo from '../components/Seo'
import EncaixeDemo from '../components/makingof/demos/EncaixeDemo'
import { Capa, Briefing, CtaMakingOf, Ficha, Figura, Marcos, Prosa, Prova, Secao } from '../components/makingof/Kit'

// Making-of do Encaixe. Números, arquivos e commits citados aqui são
// conferíveis em encaixe/CLAUDE.md, encaixe/src e no git log do repositório.
const marcos = [
  { data: '13/09 · 20:23', hash: '2f60b8b', texto: 'Nasce o Encaixe como marcenaria sob medida, com catálogo em desenho técnico e régua de carpinteiro no lugar do menu.' },
  { data: '14/09 · 11:54', hash: '99fa7b8', texto: 'Correção que valeu para 19 sites do portfólio: o diálogo aparecia colado no canto por falta de margem automática.' },
  { data: '15/09 · 16:12', hash: 'a28b123', texto: 'Ajuste de detalhe: halo ao passar o mouse sobre o encaixe, sem quebrar a regra de um único movimento.' },
  { data: '15/09 · 16:44', hash: 'c64be10', texto: 'A ilustração do topo passa a ser um rabo-de-andorinha.' },
  { data: '15/09 · 17:32', hash: 'ed46fd6', texto: 'Segunda versão: o tipo de encaixe passa a organizar o site inteiro.' },
  { data: '15/09 · 18:06', hash: 'ba1ef73', texto: 'Terceira versão: muda até o nicho, de marcenaria para alfaiataria sob medida, mantendo o nome.' },
  { data: '16/09 · 11:17', hash: '1a9361d', texto: 'Entrada suave das seções ao rolar, aplicada em vários projetos de uma vez.' },
  { data: '16/09 · 17:59', hash: '7a8b7a2', texto: 'Commit que trocou fontes de título em todo o portfólio, o Encaixe incluído.' },
]

export default function CaseStudyEncaixe() {
  return (
    <>
      <Seo
        title="Making of: Encaixe — três versões até achar o nicho | Madolio"
        description="O processo real por trás do Encaixe, um site-conceito de alfaiataria sob medida com configurador de orçamento: a regra de preço e prazo, as três reformulações e um bug de desenho técnico. Monte uma peça e veja a conta."
        path="/projetos/encaixe"
      />

      <Capa
        nome="Encaixe"
        nicho="Alfaiataria sob medida (fictícia)"
        resumo={
          <>
            Um site que foi refeito três vezes, a última trocando o próprio negócio. No fim, em vez de uma metáfora no
            menu, ficou uma ferramenta: um configurador que calcula preço e prazo na hora.
          </>
        }
        fatos={[
          { rotulo: 'Nicho', valor: 'Alfaiataria sob medida (empresa fictícia)' },
          { rotulo: 'Stack', valor: 'React 19 · Tailwind v4' },
          { rotulo: 'Primeiro commit', valor: '13/09' },
          { rotulo: 'Versões', valor: '3 reformulações completas' },
        ]}
      >
        <Figura
          n={1}
          src="/makingof/encaixe/hero.jpg"
          alt="Página inicial do Encaixe: título 'A roupa encaixa em você, não o contrário' e o configurador com peça, tecido e corte."
          width={1280}
          height={800}
          url="encaixe.fenoninho-max.workers.dev"
          legenda="A home: o configurador já está no primeiro bloco da página."
        />
      </Capa>

      <Secao n="01" rotulo="O ponto de partida" titulo="Do móvel à roupa">
        <Prosa>
          <p>
            A versão 1 era uma marcenaria sob medida: catálogo em desenho técnico de elevação, régua de carpinteiro
            como menu e um único movimento automático (uma espiga deslizando no furo). A versão 2 continuou
            marcenaria, mas com o tipo de encaixe (rabo-de-andorinha, espiga-e-furo) organizando o site inteiro.
          </p>
          <p>Depois vieram dois retornos do dono, registrados no CLAUDE.md do projeto:</p>
        </Prosa>
        <div className="mt-8 space-y-6">
          <Briefing rotulo="Primeiro retorno" quando="15/09">
            Não funcionou: refazer por completo, até a ideia.
          </Briefing>
          <Briefing rotulo="Segundo retorno" quando="15/09">
            Na verdade, trocar até a ideia de móveis e propor outras.
          </Briefing>
        </div>
        <div className="mt-8">
          <Prosa>
            <p>
              O problema deixou de ser de execução e passou a ser o nicho inteiro. Foram propostas direções novas e o
              dono escolheu alfaiataria sob medida. O nome Encaixe ficou de propósito: serve para roupa (“a roupa
              encaixa em você”) tanto quanto servia para marcenaria, e isso evitou trocar marca e estrutura de
              arquivos.
            </p>
          </Prosa>
        </div>
      </Secao>

      <Secao n="02" rotulo="A ideia central" titulo="Uma ferramenta em vez de uma metáfora">
        <Prosa>
          <p>
            As duas primeiras versões tentavam fazer o tema carregar a página inteira. A terceira oferece o que a
            pessoa realmente usaria antes de fechar com um alfaiate: um orçamento. Peça, tecido e corte; o preço e o
            prazo saem de uma conta, nunca de um número solto. O botão final já monta a mensagem de WhatsApp com a
            combinação.
          </p>
        </Prosa>
        <div className="mt-10">
          <Prova
            itens={[
              { rotulo: 'Combinações possíveis', valor: '60', nota: '4 peças × 5 tecidos × 3 cortes, com preço de R$ 500 a R$ 3.310.' },
              { rotulo: 'Texto sobre o papel', valor: '12,54:1', nota: '#2a2420 sobre #efe8d8. O mínimo WCAG AA é 4,5:1.' },
              { rotulo: 'JavaScript, comprimido', valor: '119 kB', nota: 'Bundle único do npm run build: 119,01 kB gzip (351,19 kB sem compressão).' },
            ]}
          />
        </div>
      </Secao>

      <Secao n="03" rotulo="Monte uma peça" titulo="O orçamento, de verdade">
        <Prosa>
          <p>
            Esta é a conta do configurador do site. Os preços base vêm do catálogo, e os multiplicadores de tecido e
            corte são estimativas do projeto, já que a alfaiataria é fictícia e não existe tabela real para consultar.
          </p>
        </Prosa>
        <div className="mt-8 rounded-2xl bg-void p-6 text-paper md:p-10">
          <EncaixeDemo />
        </div>
        <Figura
          className="mt-10"
          n={2}
          src="/makingof/encaixe/config.jpg"
          alt="Configurador do Encaixe com blazer, tweed e corte clássico selecionados, mostrando R$ 2.880 e prazo de 4 semanas ao lado do desenho técnico do blazer."
          width={1280}
          height={660}
          url="encaixe.fenoninho-max.workers.dev"
          legenda="Blazer em tweed, corte clássico: 2.400 × 1,2 × 1 = R$ 2.880, igual à demonstração acima."
        />
      </Secao>

      <Secao n="04" rotulo="Decisões" titulo="Figurino plano, sem foto">
        <Prosa>
          <p>
            O desenho técnico foi reescrito do zero: as funções de elevação de móvel saíram e entraram blazer, calça,
            colete e camisa em “flat sketch”, o desenho plano que a moda usa para registrar corte e costura sem corpo
            dentro. O componente que desenha continuou genérico e não mudou; só as variáveis de cor passaram de
            madeira para fio.
          </p>
          <p>
            Um detalhe que o código mostra: a regra de prazo multiplica por 1,1 quando o corte é oversized, mas com
            os prazos base atuais (4 e 2 semanas) o arredondamento devolve o mesmo valor. Hoje o corte não muda o
            prazo de nenhuma peça.
          </p>
        </Prosa>
      </Secao>

      <Secao n="05" rotulo="O que deu errado" titulo="Problemas do caminho">
        <div className="space-y-8">
          <Ficha
            titulo="Dois textos por cima um do outro no desenho"
            sintoma="Na calça e na camisa, a cota de tamanho e o rótulo do detalhe ficavam ilegíveis."
            causa="Os dois estavam próximos demais na vertical para a altura original do viewBox, de 200."
            correcao="Aumentar a altura do viewBox e reposicionar a cota abaixo de todo o resto."
          >
            <p className="font-mono text-sm text-ink/75">calça: 200 para 220 · camisa: 200 para 215</p>
          </Ficha>
          <Ficha
            titulo="O navegador recebia HTML no lugar do JavaScript"
            sintoma="Depois de rebuildar, a página de teste quebrava."
            causa="O vite preview não pega sozinho os novos hashes de arquivo."
            correcao="Reiniciar o vite preview depois de cada build."
          />
          <Ficha
            titulo="Três versões para achar o problema certo"
            sintoma="As duas primeiras versões da marcenaria foram rejeitadas."
            causa="O problema não era de execução: era a ideia de móveis."
            correcao="Trocar o nicho, mantendo nome, domínio e a estrutura de arquivos."
          />
        </div>
      </Secao>

      <Secao n="06" rotulo="Histórico" titulo="Como aconteceu">
        <Marcos itens={marcos} />
        <p className="mt-6 max-w-3xl text-sm text-ink/70">Datas e hashes do git log da pasta encaixe/.</p>
      </Secao>

      <CtaMakingOf
        nome="Encaixe"
        url="https://encaixe.fenoninho-max.workers.dev"
        texto="Escolha peça, tecido e corte e veja o preço e o prazo mudarem na hora."
      />
    </>
  )
}
