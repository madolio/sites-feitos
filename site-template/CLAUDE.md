# Site Template (Madolio)

Template padrão que a Madolio usa como ponto de partida pra sites de clientes novos. Mesmo stack dos projetos-irmãos (`madolio`, `nbj-systems`): Vite + React + TypeScript + Tailwind v4, hospedado no Cloudflare Workers.

## Origem deste repositório

Este código **não foi o original** — o template já existia publicado (`https://site-template.fenoninho-max.workers.dev`, Worker `site-template` no Cloudflare) quando percebi que ele não tinha repositório Git em lugar nenhum que eu achasse. Reconstruí o código a partir do design system do `madolio` (mesmos componentes: `Reveal`, `SketchToSite`, `Scene3D`/`Scene3DLazy`, `ShimmerText`, `Benefits`) e do HTML/config exatos que o site publicado expõe (`index.html` com os placeholders `{{BUSINESS_NAME}}` etc. vieram literalmente do site no ar). Conferido lado a lado por screenshot — o resultado bate pixel a pixel com o que estava publicado.

Se em algum momento aparecer o repositório original (de outra sessão/máquina), vale comparar e reconciliar em vez de simplesmente sobrescrever.

## Como clonar pra um cliente novo

1. Copiar esta pasta pra um repo novo com o nome do cliente.
2. Editar `src/config/site.ts` — `BUSINESS_NAME`, `WHATSAPP_URL`, `EMAIL`.
3. Em `index.html`, buscar e substituir `{{BUSINESS_NAME}}`, `{{TAGLINE}}`, `{{DESCRIPTION}}`, `{{DOMAIN}}` e `{{EMAIL}}` (são tags estáticas de SEO/OG/JSON-LD — não lêem de `site.ts`, precisam ser editadas à parte porque servem pra crawlers que não executam JS).
4. Ajustar `src/index.css` (`@theme`) se o cliente pedir paleta/tipografia diferente da atual (IBM Plex Serif/Sans, navy `#0F1C33` + azul `#1D4FD1`).
5. Reescrever o texto de `Hero.tsx` e `Benefits.tsx` pro negócio específico — hoje eles têm a copy genérica "Um site que parece feito à mão pro seu negócio" que serve de vitrine do próprio serviço da Madolio.
6. `wrangler.jsonc`: trocar `name` pro nome do Worker do cliente e adicionar `routes` com o domínio dele quando tiver.
7. `npm install && npm run deploy`.

## Diferenças em relação ao madolio

- Página única (sem `/projetos`), sem `react-router-dom` — nav usa âncoras (`#beneficios`, `#contato`).
- Copy em voz neutra/plural ("cuidamos", "a gente") em vez da voz pessoal do Kaique ("eu cuido") — porque este texto representa qualquer negócio, não a Madolio.
- Sem `Seo.tsx` (não precisa de meta tags dinâmicas por rota, já que é uma página só).

Ver o CLAUDE.md do `madolio` pra diretrizes de design, a gotcha de GSAP + Tailwind `transition`, e o gotcha de teste do Chrome headless com `--window-size` pequeno — tudo isso se aplica aqui também.
