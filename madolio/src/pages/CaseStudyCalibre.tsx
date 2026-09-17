import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

// Making-of do Calibre, traduzido do CLAUDE.md técnico do projeto pra
// linguagem de cliente — mostra o processo real (pedido → decisão →
// problema resolvido), não só o resultado final.
export default function CaseStudyCalibre() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Making of: Calibre — Um relógio de verdade como menu do site | Madolio"
        description="O processo real por trás do Calibre: um site pra relojoaria artesanal onde o menu é um relógio analógico correndo no horário real do visitante, e os números 12, 4 e 8 são os links de navegação."
        path="/projetos/calibre"
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-6">
          <p className="font-semibold text-accent">Making of</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-ink md:text-5xl">Calibre</h1>
          <p className="mt-4 text-lg text-ink/70">
            Uma relojoaria artesanal fictícia onde o menu do site não é uma lista de links — é um relógio analógico
            de verdade, correndo no horário real de quem está vendo, com três números do mostrador funcionando como
            navegação. Aqui está o processo real por trás disso, incluindo a versão inteira que jogamos fora.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-2xl font-semibold text-ink">O pedido</h2>
          <blockquote className="mt-3 border-l-4 border-accent pl-5 text-lg text-ink/75 italic">
            "Calibre — rework total, esse 3D não curti, muda a ideia para outra."
          </blockquote>
          <p className="mt-4 text-ink/70">
            A versão anterior do Calibre já tinha um mecanismo 3D real, com física simulada e um gesto de girar a
            coroa do relógio — tecnicamente ambicioso, e mesmo assim rejeitado de forma direta. Isso deixou claro
            que "ousado" não é sinônimo de "3D": era preciso achar outra ideia central, igualmente forte, sem
            depender de motor gráfico nenhum.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">A ideia central</h2>
          <p className="mt-3 text-ink/70">
            Em vez de mostrar o mecanismo por dentro (o caminho 3D, descartado), a ideia virou literal na direção
            contrária: o mostrador do relógio é a navegação, e o relógio é real — os ponteiros correm no horário
            exato de quem está olhando a tela, atualizando a cada segundo. Os números <strong>12, 4 e 8</strong> do
            mostrador são os três links do site (Modelos, Como nasce, Encomendar), e o ponto da seção que você está
            lendo acende em latão enquanto você rola a página — o relógio sempre sabe onde você está.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Decisões que fazem o relógio parecer real</h2>
          <ul className="mt-4 space-y-4 text-ink/70">
            <li>
              <strong className="text-ink">Os ponteiros são calculados, não animados.</strong> Os ângulos de hora,
              minuto e segundo saem direto da hora do sistema do visitante a cada segundo — não é uma animação em
              loop fingindo passar o tempo, é o relógio realmente marcando a hora certa, no fuso de quem está
              olhando.
            </li>
            <li>
              <strong className="text-ink">O relógio existe em duas versões, mas é o mesmo componente.</strong> A
              versão grande fica na abertura do site como peça de exibição; uma versão em miniatura, sem os traços
              de hora e minuto, fica fixa na barra do topo — porque sem essa segunda instância a navegação
              desaparecia da tela assim que a pessoa rolasse a página, e todo relógio do site precisa mostrar a
              mesma hora.
            </li>
            <li>
              <strong className="text-ink">Nenhuma foto de relógio no site inteiro.</strong> Cada modelo do catálogo
              é desenhado em SVG, com os ponteiros sempre parados às 10h09 — a pose clássica de fotografia de
              relojoaria — em vez de fotos reais, o mesmo espírito de "desenho técnico em vez de foto" usado em
              outros projetos do estúdio, aplicado à relojoaria.
            </li>
            <li>
              <strong className="text-ink">Rejeitar 3D não foi cortar uma feature — foi cortar o projeto inteiro.</strong>{' '}
              Todo o código do relógio 3D anterior (a cena, as texturas, o gesto de girar a coroa) e as bibliotecas
              gráficas que ele usava foram removidos por completo, não deixados como código morto — o site ficou
              seis vezes mais leve pra carregar.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Dois problemas que apareceram no caminho</h2>
          <div className="mt-4 space-y-5 text-ink/70">
            <p>
              <strong className="text-ink">A navegação sumia depois do primeiro scroll.</strong> Com o mostrador
              grande só existindo na abertura do site, assim que a pessoa rolava a página pra baixo, os únicos links
              de navegação (os números 12, 4 e 8) saíam da tela junto — quebrando o padrão do resto do portfólio,
              onde a navegação fica sempre visível. A correção foi criar uma segunda instância compacta do mesmo
              relógio, fixa na barra do topo, mostrando a mesma hora em miniatura.
            </p>
            <p>
              <strong className="text-ink">O navegador servia a versão antiga do site depois de um novo build.</strong>{' '}
              Como em outros projetos do estúdio que usam a mesma infraestrutura de hospedagem, gerar uma nova
              versão dos arquivos sem reiniciar o servidor local de pré-visualização fazia o navegador pedir um
              arquivo novo e receber HTML no lugar dele. Reiniciar o servidor a cada novo build virou parte do
              processo padrão de teste.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border-2 border-ink bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Veja o resultado</h2>
          <p className="mt-2 text-ink/70">
            O site completo está no ar — confira a hora certa no relógio do topo, e use os números 12, 4 e 8 pra
            navegar.
          </p>
          <a
            href="https://calibre.fenoninho-max.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Abrir o Calibre
          </a>
        </Reveal>
      </div>
    </section>
  )
}
