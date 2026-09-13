# Cerne (conceito)

Site-conceito da Madolio pro nicho de design de interiores. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Feito pra ter um **esqueleto de página** genuinamente diferente dos outros 18 conceitos do portfólio, não só cor/fonte/gimmick de nav diferente — ver a instrução original do usuário: "mude o esqueleto da página, parece tudo a mesma coisa". Ver também Tinta (rolagem horizontal), Balcão (catálogo sem hero) e Rota (layout de dashboard), feitos na mesma leva.

## Deploy (Cloudflare Workers)

Worker `cerne`, em `https://cerne.fenoninho-max.workers.dev`. `npm run deploy`.

## O esqueleto — duas colunas, sem hero, sem seções empilhadas

`Obra.tsx` é a página inteira. Nada de hero de abertura, nada de seções uma embaixo da outra: a esquerda é o documento normal, rolando (os 4 casos, cada um um "capítulo"); a direita é `position: sticky`, ocupa a tela toda (`h-screen`), e troca de desenho técnico conforme qual capítulo está no meio vertical da tela à esquerda.

A troca usa `IntersectionObserver` com `rootMargin: '-45% 0px -45% 0px'` — cada `<li>` (capítulo) é observado, e o que estiver cruzando a faixa central de 10% da viewport vira o "ativo" (`setActive`). O painel direito renderiza os 4 desenhos técnicos empilhados com `position: absolute; inset: 0`, cada um com opacidade condicionada a `active === i` e `transition-opacity` — troca suave sem re-render pesado nem layout shift.

No mobile (`lg:hidden`), a coluna direita sticky não existe — cada capítulo carrega sua própria ilustração inline, no topo do card, antes do texto.

**Gotcha de teste:** depois de rebuildar (`npm run build`), o servidor `vite preview` (com o plugin do Cloudflare) precisa ser **reiniciado** — ele não pega os novos hashes de asset em memória sozinho, e o navegador recebe `index.html` no lugar do `.js` esperado (erro de MIME type). Sempre matar e subir de novo o preview depois de build novo antes de tirar screenshot.

## Referência visual — "Cerne" (núcleo/madeira)

Paleta: `--color-paper` #ede7dd (putty morno), `--color-panel` #e3dbcb (painel direito, um tom mais escuro), `--color-ink` #2e2118 (marrom nogueira), `--color-moss` #4e6046 (verde musgo — a cor de marca segura pra texto, validada em ~5.5:1 sobre o paper; a variante mais clara #5B6F52 ficava em ~4.44:1, abaixo do mínimo de 4.5:1 pra texto normal). Fontes: **Petrona** (serifada, títulos) + **Sora** (corpo) — nenhuma das duas usada em outro projeto do repositório.

`Ilustracoes.tsx` tem os 4 desenhos técnicos (planta, corte, axonometria, paleta de material), um por caso em `data/casos.ts` — mesma lógica dos outros projetos do portfólio: nunca foto real, sempre um esquema desenhado.

## Sem barra de navegação

`Chrome.tsx`: só a marca "Cerne" fixa no canto (com fundo sólido — sem isso, o texto do capítulo por trás vaza por cima dela ao rolar, já que ela é `position: fixed`) e o CTA de WhatsApp flutuante, igual ao resto do portfólio. WhatsApp em modo demonstração (`demo.ts` + `DemoDialog.tsx`).
