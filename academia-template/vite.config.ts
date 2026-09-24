import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { site } from './src/config/site.ts'

// Gera, a partir de src/config/site.ts, tudo o que depende da marca e do
// endereço do site fora do React: <head> do index.html, robots.txt,
// sitemap.xml e favicon.svg. Assim o cliente novo só edita site.ts.
function marcaDoCliente(): Plugin {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const { seo } = site
  const ogImage = seo.ogImage
    ? [
        `<meta property="og:image" content="${seo.url}${seo.ogImage}" />`,
        `<meta name="twitter:image" content="${seo.url}${seo.ogImage}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
      ].join('\n    ')
    : '<meta name="twitter:card" content="summary" />'
  const tokens: Record<string, string> = {
    '{{SEO_TITLE}}': esc(seo.title),
    '{{SEO_DESCRIPTION}}': esc(seo.description),
    '{{SEO_URL}}': seo.url,
    '{{SEO_THEME_COLOR}}': seo.themeColor,
    '{{SITE_NAME}}': esc(`${site.name} — ${site.descriptor}`),
    '{{OG_IMAGE_TAGS}}': ogImage,
    '{{FONTS_QUERY}}': esc(site.fonts),
  }
  const arquivos: Record<string, { tipo: string; texto: string }> = {
    'robots.txt': { tipo: 'text/plain', texto: `User-agent: *\nAllow: /\n\nSitemap: ${seo.url}/sitemap.xml\n` },
    'sitemap.xml': {
      tipo: 'application/xml',
      texto: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${seo.url}/</loc></url>\n</urlset>\n`,
    },
    'favicon.svg': {
      tipo: 'image/svg+xml',
      texto: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="${seo.faviconBg}"/><text x="32" y="46" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-size="42" font-weight="700" fill="${seo.faviconFg}">${esc(site.initial)}</text></svg>\n`,
    },
  }
  return {
    name: 'marca-do-cliente',
    transformIndexHtml: (html) => Object.entries(tokens).reduce((h, [k, v]) => h.split(k).join(v), html),
    generateBundle() {
      if (this.environment?.name && this.environment.name !== 'client') return
      for (const [fileName, { texto }] of Object.entries(arquivos)) this.emitFile({ type: 'asset', fileName, source: texto })
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const nome = (req.url ?? '').split('?')[0].slice(1)
        const arq = arquivos[nome]
        if (!arq) return next()
        res.setHeader('content-type', arq.tipo)
        res.end(arq.texto)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare(), marcaDoCliente()],
})
