# clinica-template

Template de site para clínicas e profissionais da saúde (estética, odontologia, dermatologia, psicologia, fisioterapia, nutrição, bem-estar e autônomos).

**"Serena — Clínica & Bem-estar" é só conteúdo de demonstração.** Nome, textos, números, depoimentos, contatos e fotos são fictícios e ficam todos em 4 arquivos de configuração. Nenhum componente precisa ser editado para trocar de cliente.

Vite + React 19 + TypeScript + Tailwind v4, publicado como Cloudflare Worker. A única dependência de runtime é o React.

## Como transformar este template em um novo cliente

Você só mexe em quatro arquivos (mais um ícone e o nome do Worker):

| # | O que trocar | Onde |
|---|---|---|
| 1 | **Nome, descritor, slogan** | `src/config/site.ts` → `name`, `descriptor`, `tagline` |
| 2 | **Logo** | `site.ts` → `initial` (letra em círculo) ou `logo: { src, alt }` para usar uma imagem |
| 3 | **Cores** | `src/index.css` → bloco `@theme` (10 cores, com o papel de cada uma comentado) |
| 4 | **Imagens** | `src/config/images.ts` (URL ou arquivo em `public/`; escreva o `alt`) |
| 5 | **Profissional / equipe** | `src/data/conteudo.ts` → `equipe.pessoas` (a 1ª pessoa também aparece no cartão do hero) |
| 6 | **Serviços** | `conteudo.ts` → `servicos.itens` (título, texto, tags, imagem) e `servicos.extras` |
| 7 | **Depoimentos** | `conteudo.ts` → `depoimentos` (um destaque e outros) |
| 8 | **FAQ** | `conteudo.ts` → `faq.itens` |
| 9 | **Contato** | `site.ts` → `whatsapp`, `whatsappLabel`, `phone`, `email`, `address`, `hours` |
| 10 | **Redes sociais** | `site.ts` → `social.instagram` (deixe `url` vazio para esconder o ícone) |
| 11 | **SEO** | `site.ts` → `seo` (`url`, `title`, `description`, `themeColor`, cores do favicon) |
| 12 | **Textos das seções, botões e rótulos** | `conteudo.ts` (`hero`, `sobre`, `metodo`, `cta`, `contato`, `rotulos`) |
| 13 | **Menu** | `site.ts` → `nav` (o `href` é o `id` da seção) |

Nos títulos, `*palavra*` vira o itálico colorido de destaque.

### O que é gerado sozinho a partir de `site.ts`

No build, o plugin de `vite.config.ts` cria `index.html` (title, description, canonical, Open Graph, theme-color), `robots.txt`, `sitemap.xml` e `favicon.svg` (letra + cores). **Não edite esses arquivos à mão**: mude `site.ts` e rode o build.

### O que ainda é manual

- `public/apple-touch-icon.png` (180×180): é um PNG estático com a letra "S". Substitua pelo ícone do cliente.
- `name` em `wrangler.jsonc` e `package.json` (nome do Worker).
- Fontes: trocar a família exige mudar o link do Google Fonts em `index.html`, o `--font-*` em `src/index.css` e as fontes de reserva (`@font-face` no mesmo arquivo).
- Trocar o bloco do mapa por um embed real, se o cliente quiser (`src/components/Contato.tsx`).

### Seções (ordem em `src/App.tsx`)

Header (com menu móvel), Hero, Sobre, Cuidados, Método, Equipe, Relatos, Galeria, FAQ, CTA final, Contato e Footer. Para remover uma seção, tire-a de `App.tsx` e o item de `nav` em `site.ts`.

## Build e publicação

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # tsc + vite build (gera dist/)
npm run deploy    # build + wrangler deploy
```

Para publicar um cliente novo em outro Worker: copie a pasta, troque `name` em `wrangler.jsonc` e `package.json`, ajuste `seo.url` em `site.ts` para o endereço final (`https://<name>.<subdominio>.workers.dev` ou o domínio do cliente) e rode `npm run deploy` dentro da pasta. Confira que a conta do `wrangler` (`npx wrangler whoami`) é a esperada antes de publicar.

## Checklist de entrega

```text
[ ] Nome
[ ] Logo
[ ] Favicon (letra/cores em site.ts) e apple-touch-icon.png
[ ] Cores
[ ] Fotos (troque as de banco de imagens pelas do cliente)
[ ] Profissional
[ ] Serviços
[ ] Depoimentos (só relatos reais e autorizados)
[ ] FAQ
[ ] WhatsApp
[ ] Telefone
[ ] E-mail
[ ] Endereço
[ ] Redes sociais
[ ] SEO (seo.url, title, description)
[ ] Sitemap (gerado: confira o domínio em dist/sitemap.xml)
[ ] Robots (gerado: confira dist/robots.txt)
[ ] Nota de rodapé de demonstração removida (footerNote: '')
[ ] Registro profissional preenchido ou removido
[ ] Teste mobile (320, 375, 390)
[ ] Teste desktop (768, 1024, 1280)
[ ] Deploy
```

## Notas técnicas

- **Sem "pulo" de layout:** `src/main.tsx` carrega as fontes (no máximo 1s) antes de renderizar, e há fontes de reserva com `size-adjust`. Ao trocar de fontes, mantenha essa lógica.
- **Acessibilidade:** contraste dos pares de cor verificado (≥ 4,5:1, ver comentário do `@theme`); ao trocar as cores, confira `clay` sobre `bone`/`sage` e `clay-light` sobre `forest`/`ink`.
- Animações respeitam `prefers-reduced-motion`; o hover só age com `@media (hover:hover)`.
- Verificado em 320, 375, 390, 768, 1024 e 1280 px, e reaproveitado com outra marca, paleta, fotos e textos (simulação "Clínica Aurora") sem editar componentes.
