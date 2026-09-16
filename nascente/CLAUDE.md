# Nascente

Site-conceito da Madolio pro nicho de equipamentos para tratamento de água (filtração, osmose reversa). **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4.

Era o projeto de um cliente real (NBJ Systems) que não seguiu adiante — reformulado em set/2026 como conceito de portfólio: mesma linguagem visual e a mesma ideia de negócio (tratamento de água), mas sem nenhum dado real da empresa original (nome, endereço, telefone, fotos, logo). Ver também o CLAUDE.md do `madolio` — a entrada de Nascente no portfólio.

## Deploy (Cloudflare Workers)

Worker `nascente`, em `https://nascente.fenoninho-max.workers.dev`.

```
npm run build
npx wrangler deploy
```

## Reestruturação de set/2026 — a navegação virou o painel de instrumento

Era um dos 6 projetos deliberadamente deixados com o nav genérico (barra fixa full-width, logo + lista de links + botão) enquanto outros conceitos do repositório (Torre, Calibre, Cerne...) já tinham ganhado arquitetura própria — ver o `CLAUDE.md` do `madolio`, que documentava essa lista. Reestruturado "página a página" a pedido do usuário.

`Nav.tsx` (removido, não deixado como código morto) virou `Painel.tsx`: em vez de uma barra de links soltos, a navegação é o próprio esquema P&ID que já é o assunto do site — cada seção do site é um "estágio" (Captação/Filtração/Osmose reversa/Aplicação/Atendimento, nomes de navegação, não os mesmos nomes das etapas de filtração que já aparecem dentro do `TreatmentDiagram.tsx` do Hero, pra não duplicar/confundir), marcado por um manômetro (`Manometro`, SVG com agulha) que aponta cheio no estágio ativo e em repouso nos outros — não é decoração, é literalmente o mesmo vocabulário visual do diagrama técnico da página. Os manômetros ficam pendurados num cano vertical (`Cano`) com um traço tracejado que "escorre" (`painel-fluxo`, mesma linguagem do `data-water` do diagrama).

- **Desktop:** coluna fixa `w-56` à esquerda (mesmo padrão do Torre), sempre visível, CTA de WhatsApp fixo no rodapé do painel — não precisa de um bloco de CTA repetido no fim da página.
- **Mobile:** vira uma barra fina no topo (marca + WhatsApp + um botão de menu) — os estágios ficam atrás de um menu que abre embaixo, não escondidos sem pista nenhuma.
- **Estágio ativo:** por scroll-spy (`IntersectionObserver`, `useEstagioAtivo`) quando a seção tem uma `id` visível na página atual; fallback por rota+hash quando não há seção observável (ex: `/produtos` sem scroll ainda, ou navegando direto pra uma página sem nenhum estágio em viewport).
- Como a coluna deixou de ser uma barra fixa no TOPO, o padding-top das seções mudou de "espaço pra header full-width" pra "espaço só no mobile" — `pt-24 lg:pt-16` no lugar de `pt-28 md:pt-36` em `Hero.tsx` e no topo de `pages/Produtos.tsx`.
- Adicionado `id="osmose"` na seção de osmose da Home (só existia em `pages/Produtos.tsx`) — o estágio "Osmose reversa" no painel precisa de uma âncora em ambas as páginas.

## Diretrizes de design

Ver o CLAUDE.md do projeto irmão `madolio` (mesmo usuário, mesmo stack) para a diretriz completa sobre evitar visual "AI slop" e a gotcha de GSAP + Tailwind `transition` (não pôr a classe `transition` genérica em elemento que o GSAP anima em opacity/transform).

Direção visual (herdada do redesign original, feita pra fugir do kit "card + ícone em quadradinho + badge em pill + gradiente"):

- **Momento principal:** `src/components/TreatmentDiagram.tsx` — esquema técnico (estilo P&ID) das etapas de um sistema de osmose reversa: entrada → polipropileno → carvão ativado → osmose reversa → água desmineralizada. GSAP desenha os canos (DrawSVGPlugin), faz a água fluir e as impurezas pararem na etapa que as retém. É a única animação "não pedida" do site; não espalhar fade-in em todas as seções.
- **Tipografia:** Archivo (uma família só), títulos com `font-stretch: 116%` (eixo de largura).
- **Produtos** como ficha técnica em linhas (`SpecList`), não grid de cards — sempre com `ProductGlyph` (esquema técnico em SVG), nunca foto de produto real. **Osmose** comparada por vazão em barras (`OsmosisScale`).
- O rodapé é o bloco de contato (fundo `ink`), presente em todas as páginas.
- WhatsApp em modo demonstração (`src/demo.ts` + `DemoDialog.tsx`) — mesmo padrão dos outros conceitos fictícios do portfólio: nunca aponta pra um número real, mostra a mensagem que seria enviada e oferece o contato de verdade da Madolio.
- Chrome headless não avança o relógio do GSAP (lagSmoothing), então screenshots headless mostram a intro no começo. Para revisar layout, usar `--force-prefers-reduced-motion` (estado final estático).
- Ver também o CLAUDE.md do `madolio` — gotcha de teste sobre `chrome --headless --window-size` pequeno (abaixo de ~484px) não refletir a largura real da página; usar o truque do iframe same-origin pra testar mobile de verdade.

## SEO básico

`index.html` tem meta description, canonical, Open Graph e Twitter Card apontando pro subdomínio `.workers.dev` atual. `public/robots.txt` e `public/sitemap.xml` também apontam pra lá.
