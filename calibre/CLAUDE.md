# Calibre (conceito)

Site-conceito da Madolio pro nicho de relojoaria artesanal. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única, com rolagem.

## Rework total — o 3D saiu por completo

Havia uma avaliação anterior nesta sessão dizendo que o Calibre "já excedia" o nível de ousadia pedido (3D real com física simulada, gesto de girar a coroa) e não precisava de mudança. **O usuário discordou explicitamente**: "calibre - rework total, esse 3d n curti, muda a ideia para outra" — manteve o nicho (relojoaria), mas rejeitou a execução inteira.

Removido por completo, não deixado como código morto: `src/cena/Vitrine.tsx`, `geometria.ts`, `texturas.ts`, `src/estado.ts`, `Coroa.tsx`, `ReservaMarcha.tsx`, e as dependências `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, `three`, `gsap` + `.npmrc` (que só existia por causa dos peers opcionais de Expo do R3F). O bundle caiu de ~1,35 MB pra 234 KB.

## O conceito novo: o mostrador é a navegação, ao vivo

Em vez de mostrar o mecanismo por dentro (3D), a ideia virou literal na direção contrária: um **relógio analógico de verdade**, com ponteiros correndo no horário real do visitante (atualiza a cada segundo via `setInterval`, sem lib), onde os números **12, 4 e 8** do mostrador são a navegação da página — cada um leva a uma seção (`Modelos`/`catálogo`, `Como nasce`/`processo`, `Encomendar`/`contato`).

- **`RelogioNav.tsx`** (novo): calcula os ângulos dos três ponteiros a partir de `new Date()`, desenha o mostrador em SVG (reaproveitando a mesma lógica de marcação de `Mostrador.tsx`) e sobrepõe três pontos clicáveis com scroll-spy (`IntersectionObserver`, mesmo padrão do `Rail.tsx`/`Regua.tsx` de outros conceitos) — o ponto da seção visível acende em latão.
- **Duas instâncias, um componente**: o mostrador grande (`Hero.tsx`) é a peça de exibição; uma versão `compacto` (prop) mora fixa na barra do topo (`Nav.tsx`) — sem essa segunda instância, a navegação desapareceria da tela depois do primeiro scroll, quebrando o padrão do resto do repositório (nav sempre visível). Mesmo relógio, mesma hora, só em miniatura, sem os traços de hora/minuto.

## Sequência real → numeração

`Processo.tsx` numera as seis etapas de fabricação (escolha do calibre → desenho do mostrador → acabamento → montagem/regulagem → caixa → entrega) porque são, de fato, sempre nessa ordem.

## Catálogo sem foto

`Mostrador.tsx` desenha o mostrador de cada modelo em SVG — ponteiros sempre parados às 10h09 (a pose clássica de fotografia de relojoaria), com sub-mostradores de cronógrafo opcionais. Nenhuma foto de relógio no site inteiro, mesmo espírito do Encaixe (desenho técnico em vez de foto), aplicado a outro ofício. `Catalogo.tsx` tem hover consistente com o resto do portfólio (anel de latão + leve elevação no card).

## Referência visual

Paleta: `--color-void` #120d08 (fundo, quase preto mas com calor), `--color-brass` #caa25e (latão — cor de metal de verdade), `--color-steel` #3a5a72 (aço azulado, reservado pro segundeiro do mostrador grande — o mesmo "blued steel" que relojoaria fina usa em ponteiros e parafusos). Fontes: **Cormorant Garamond** (títulos) + **Sora** (interface).

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.

## FAQ e depoimentos (adição pura)

`Faq.tsx` (seção `#duvidas`) e `Depoimentos.tsx` (seção `#depoimentos`) foram adicionados entre `Processo` e `Contato`, sem tocar em Hero, `RelogioNav`/mostrador ou nos tokens de `index.css`. Reaproveitam o mesmo padrão dos irmãos do repo (ex.: Razão): acordeão acessível (`button[aria-expanded][aria-controls]` + `div[role="region"]`, operável por teclado, sem animação de abertura que dependa de `prefers-reduced-motion`) e cards de depoimento com nome + inicial do sobrenome. Seis perguntas cobrem revisão/manutenção, garantia, encomenda sob medida, prazo, tipos de movimento e política de troca. Três depoimentos fictícios (Marcelo A., Beatriz N., Thiago R.), cada um amarrado a um caso concreto (casamento, herança de família, cronógrafo sob medida).
