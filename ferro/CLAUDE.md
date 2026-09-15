# Ferro (conceito)

Site-conceito da Madolio pro nicho de academia (musculação + funcional). **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Reformulação — pegada old school / relíquia / rock pesado

Pedido explícito do usuário: "reformule a ideia toda, coloque uma pegada academia oldschool. algo relíquia, rock pauleira". Substitui por completo a primeira versão (vibe "Anilha" — paleta industrial iron/steel/signal-amarelo, nav em placar de treino). Mantido: nome, domínio (`ferro`), a técnica de contador animado (`PlateCounter.tsx`, sem lib) e o modo demonstração.

## Deploy (Cloudflare Workers)

Worker `ferro`, em `https://ferro.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Cartaz de show"

- **Lugar/objeto:** cartaz de show de rock pesado xerocado, colado na parede com fita crepe; placar de recordes pregado há décadas.
- **Colisão:** academia clássica dos anos 80/90 × flyer de show de banda de metal.
- **Nunca parecer:** academia moderna com LED/espelho de Instagram, crossfit colorido, nem a v1 deste próprio site (paleta industrial/institucional).
- **Wildcards:**
  - `Reel` (dentro de `Hero.tsx`) — bobina de fita cassete girando sem parar (`.reel`, CSS puro, `prefers-reduced-motion` respeitado), representando "a trilha nunca para".
  - `PlateCounter.tsx` no Hero — reaproveitado da v1, agora conta anos de casa (1987) em vez de carga levantada.
- **Esqueleto próprio:** `Recordes.tsx` — um quadro de recordes envelhecido (`.xerox-grain` + `.tape`), pregado na parede, no lugar de uma seção genérica de diferenciais.

Paleta: `--color-paper` (#ddd3b4, papel envelhecido) + `--color-ink` (#211b16, tinta de xerox) + `--color-chumbo` (#5b564c, texto secundário) + `--color-rust` (#7a281b, ferrugem/sangue desbotado). Fontes: **Metal Mania** (display — literal fonte de logo de banda de thrash metal, só pra títulos grandes, ilegível em corpo de texto) + **Special Elite** (corpo — datilografia/xerox).

## Gotcha de contraste — o oposto do esperado

`--color-rust` é escuro (não um amarelo/vermelho vívido como nas paletas anteriores), então a regra de pares é invertida em relação ao que se esperaria:

- **Rust funciona bem como TEXTO direto sobre `paper`** (testado: ~6.5:1, acima do mínimo AA de 4.5:1) — diferente do `--color-signal` da v1, que só entrava como fundo.
- **Rust NÃO funciona como texto sobre `ink`** (dois tons escuros, ~1.7:1, bem abaixo do mínimo). Pra esse caso existe `--color-rust-bright` (#c9622f), testado em ~3.6:1 contra `ink` — só serve pro limiar de "texto grande" da WCAG (24px+ regular ou 18.66px+ bold), nunca pra texto pequeno de corpo sobre `ink`. Usado em `Recordes.tsx` nos valores de peso (`text-2xl`).

Se adicionar um novo elemento com `--color-rust` sobre fundo escuro, usar `--color-rust-bright` e confirmar que o texto é grande — não criar uma terceira variante sem testar o contraste primeiro.

## Modo demonstração

Igual aos outros conceitos: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real. Já mantém `m-auto` na className do `<dialog>` (bug encontrado e corrigido em 19 outros conceitos antes desta reformulação).

## SEO básico

`index.html` tem meta description, canonical e Open Graph (sem `og:image` — não existe imagem gerada pra este conceito). `public/robots.txt` e `public/sitemap.xml` existem.
