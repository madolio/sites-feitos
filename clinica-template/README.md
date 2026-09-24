# clinica-template

Template de site para clínicas e profissionais da saúde (estética, odonto, derma, psicologia, fisio, nutrição, bem-estar). Marca fictícia "Serena": todo o conteúdo é de exemplo.

Vite + React 19 + TypeScript + Tailwind v4, publicado como Worker (`npm run deploy`). Sem dependências de runtime além de React.

## Como personalizar para um cliente

| O que | Onde |
|---|---|
| Nome, descritor, letra do logo, contatos, endereço, horários, redes, menu | `src/config/site.ts` |
| Fotos (com `alt`) | `src/config/images.ts` (URLs ou arquivos em `public/`) |
| Textos de cada seção, serviços, equipe, relatos, FAQ, números | `src/data/conteudo.ts` |
| Cores e fontes | bloco `@theme` em `src/index.css` |
| Título, descrição, canonical, og | `index.html` (trocar também o domínio) |
| Ícone do site | `public/favicon.svg` e `public/apple-touch-icon.png` |
| Nome do Worker | `name` em `wrangler.jsonc` e `package.json` |

No texto dos títulos, `*palavra*` vira o itálico colorido de destaque.

## Seções (ordem em `src/App.tsx`)

Header (menu mobile), Hero, Sobre (com números), Cuidados (3 cards + extras), Método (4 passos), Equipe, Relatos, Galeria (grade assimétrica), FAQ (acordeão), CTA final, Contato (com mapa estilizado) e Footer. Para remover uma seção, tire-a de `App.tsx` e o item correspondente de `nav` em `site.ts`.

## Antes de entregar a um cliente

- Trocar todos os textos, números, depoimentos e registros profissionais: nada aqui é real.
- Depoimentos só com relato real e autorizado.
- Trocar as fotos por imagens do cliente (as atuais são de banco de imagens gratuito).
- Substituir o bloco do mapa por um embed real, se o cliente quiser.
- Remover a frase de "site-modelo" do rodapé.
