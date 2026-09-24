# Ferro (conceito)

Site-conceito da Madolio pro nicho de academia (musculação + funcional). **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Histórico — 5 rodadas de reformulação nesta sessão

1. **v1** — vibe "Anilha" (paleta industrial iron/steel/signal-amarelo, nav em placar de treino).
2. **v2** — trocada por completo pra "Cartaz de show": pegada old school/relíquia/rock pesado (fundo escuro, xerox, fita crepe, fonte Metal Mania), a pedido de "coloque uma pegada academia oldschool... rock pauleira".
3. **v3** — dentro da vibe old school, WebGL de verdade (blob de metal derretido em 3D) a pedido de "pode viajar nessa página".
4. **v4** — paleta trocada pra preto/branco/azul (pegada Metallica), e o blob substituído por anilhas 3D com reflexo real de aço.
5. **v5 (esta) — a vibe old school/rock inteira saiu.** O usuário rejeitou o conceito de base, não um elemento isolado: "A vibe old school/rock inteira" era o problema (confirmado quando perguntei especificamente o que reformular). Trocado pra algo no extremo oposto.

Nada da v2–v4 sobrevive como código morto: `Scene3D.tsx`, `Scene3DLazy.tsx`, `TapeHeader.tsx`, `PlateCounter.tsx` foram removidos, junto com as dependências `@react-three/fiber`, `@react-three/drei`, `three`, `@gsap/react`, `gsap` e o `.npmrc`. Bundle caiu de ~950 KB pra 230 KB.

## Deploy (Cloudflare Workers)

Worker `ferro`, em `https://ferro.sneakpeek.workers.dev`. `npm run deploy`.

## O conceito v5: laboratório de performance

- **Lugar/objeto:** ficha de avaliação física / planilha de carga de treino — clínico, orientado a dado, não a estética.
- **Colisão:** academia × ferramenta de cálculo de força.
- **Nunca parecer:** cartaz de show, xerox, fita crepe, qualquer coisa old school/relíquia (era exatamente isso que o usuário rejeitou) — nem academia moderna genérica com ícone de haltere.
- **Wildcard novo:** `CalculadoraRM.tsx` — uma calculadora de carga máxima (1RM) de verdade, usando a fórmula de Epley (`1RM = peso × (1 + reps/30)`), a mesma que treinador de força usa de cabeça. Informa peso e repetições até a falha; devolve a estimativa de 1RM e uma tabela de intensidade (100/90/80/70% do 1RM, correspondendo a força/hipertrofia/resistência) com barras de progresso. Substitui o antigo `PlateCounter` (um número decorativo subindo) por uma ferramenta que o aluno realmente usa.

## Paleta e tipografia — trocadas por completo

`--color-preto` #0a0a0a + `--color-branco` #f5f5f3 + `--color-cinza` #d4d4d0 + `--color-fumo` #8a8a86 (textos secundários) + `--color-lima` #c6ff3d (verde-limão de app de performance, não mais azul/ferrugem de banda de metal). Fontes: **Space Grotesk** (display) + **Archivo** (corpo) — nenhuma das anteriores (Metal Mania, Special Elite) sobrevive.

## Gotcha de contraste — lima só funciona no fundo escuro

`--color-lima` (#c6ff3d) é um verde-limão vívido: funciona bem como texto/preenchimento sobre `--preto` (~14:1), mas sobre `--branco` cai pra ~1.6:1 — inseguro até como decoração. Pra qualquer uso sobre fundo claro (texto, ícone, foco), usar **`--color-lima-escuro`** (#4f6b12, ~4.9:1 contra branco). Mesma regra de sempre: validar cada cor de marca contra CADA fundo, nunca presumir.

## Modo demonstração

Igual aos outros conceitos: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real. `m-auto` na className do `<dialog>` (bug de centralização corrigido em 19 outros conceitos antes da v2).

## SEO básico

`index.html` tem meta description, canonical e Open Graph (sem `og:image`). `public/robots.txt` e `public/sitemap.xml` existem.
