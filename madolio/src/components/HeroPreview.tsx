import type { Projeto } from '../data/projetos'

// Screenshot estático, não iframe. A página /projetos tinha 28 sites reais
// carregando ao mesmo tempo dentro de iframes — pesado e ruim de
// acessibilidade (cada iframe é outro documento inteiro, com sua própria
// árvore de foco e leitores de tela se perdendo nela). Uma foto da home
// resolve os dois problemas: carrega leve e não é navegável por engano.
// Os arquivos ficam em public/previews/<slug>.jpg, gerados via Playwright;
// o slug é o subdomínio da URL (ex: "pulso" de pulso.fenoninho-max...).
function slugDaUrl(url: string) {
  return new URL(url).hostname.split('.')[0]
}

export default function HeroPreview({ projeto }: { projeto: Projeto }) {
  if (!projeto.url) return null

  return (
    <div className="overflow-hidden rounded-lg border-2 border-ink shadow-[6px_6px_0_0_rgba(29,27,24,0.12)]">
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-white px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="ml-2 truncate rounded-full bg-surface-alt px-3 py-1 text-xs text-ink/55">seudominio.com</span>
      </div>

      <div className="relative w-full overflow-hidden bg-surface-alt" style={{ aspectRatio: '1280 / 760' }}>
        <img
          src={`/previews/${slugDaUrl(projeto.url)}.jpg`}
          alt={`Página inicial do site ${projeto.name}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </div>
  )
}
