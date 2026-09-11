# Sabor da Vila (conceito)

Site-conceito da Madolio pro nicho de hamburgueria de bairro. **Negócio fictício** — não é cliente. Vite + React 19 + TypeScript + Tailwind v4 + GSAP + Motion + `@number-flow/react`. Página única.

## Deploy (Cloudflare Workers)

Worker `sabor-da-vila`, em `https://sabor-da-vila.fenoninho-max.workers.dev`. `npm run deploy`.

## WhatsApp é demonstração

Mesmo esquema dos outros conceitos (Doce Ateliê, Estúdio Alma): `sendToWhatsApp()` (`src/demo.ts`) abre `DemoDialog.tsx` com a mensagem que seria enviada + o WhatsApp da Madolio. Nunca apontar pra um número inventado. O rodapé declara que o negócio é fictício.

## Vibe Discovery — "Lambe-lambe"

- **Lugar/objeto:** cartaz de risografia colado em poste — o "lambe-lambe" de banda/evento de bairro.
- **Emoção:** fome, irreverência de esquina.
- **Colisão:** hamburgueria × impressão em risografia (Riso). Cada tinta é uma camada separada com `mix-blend-mode: multiply`, registro levemente desalinhado de propósito, e retícula (halftone) em vez de gradiente.
- **Nunca parecer:** hamburgueria "gourmet" preta e madeira com foto grande de prato.
- **Wildcard:** o adesivo de promoção (`StickerPeel`) que a pessoa descola/arrasta no hero.

Três tintas reais de risografia: Medium Blue `#3255a4`, Fluorescent Pink `#ff48b0`, Yellow `#ffe800`. Fundo "papel" `#fbfaf5`. Onde as tintas se sobrepõem aparecem outras cores (ex: azul+amarelo = o verde da alface), igual na impressão de verdade — **não adicionar essas cores como token**, elas são um efeito, não uma paleta. Fonte de título: **Bungee** (pôster/rótulo). Fonte de texto: **Barlow**. `.riso-type` imprime o título duas vezes (azul base + rosa por cima, `mix-blend-mode: multiply`, leve deslocamento) pra simular o registro torto.

## Componentes e de onde vieram

- `RisoBurger.tsx` — hambúrguer 100% ilustrado (sem foto), com uma camada SVG por tinta (`ink-yellow`, `ink-pink`, `ink-blue`). Na entrada, o GSAP anima cada camada "passando pela máquina" e parando com o registro desalinhado; depois o mouse baila um pouco cada camada (`gsap.quickTo`). Os ângulos/posições de registro (`registration`) são fixos por design, não aleatórios.
- `StickerPeel.tsx` — **copiado quase igual do React Bits** (reactbits.dev/animations/sticker-peel): um adesivo arrastável que descola a ponta no hover/toque, com iluminação SVG (`fePointLight`) seguindo o mouse. Só adiciona `alt` e registra o `InertiaPlugin` do GSAP (o original usa `inertia: true` sem registrar o plugin, o que falha silenciosamente). O SVG do adesivo (`public/adesivo-terca.svg`) foi gerado programaticamente (estrela + texto da promoção de terça).
- `Grain.tsx` — **adaptado do "Noise" do React Bits**: mesmo grão de ruído aleatório, mas desenhado uma vez num tile de 180×180 (não redesenhado a cada 2 frames) e aplicado como `background-image` do `body::after` — bem mais leve que um canvas full-screen redesenhando sempre.
- `Cardapio.tsx` / `Comanda.tsx` — cardápio com contador +/− por item; a comanda flutuante (estilo carrinho) mostra o total com `@number-flow/react` (NumberFlow, pacote real) e abre um modal de "comanda" com forma de retirada/entrega, pagamento e observação, que vira a mensagem do WhatsApp.

## Gotchas

- TypeScript reclama de comparar `string !== false` porque o filter encadeado misturava tipos — a linha de observação (`obs.trim() && ...`) some do array sem cast; resolvido filtrando só por `l !== false` já tipado como união.
- Mesmo cuidado de overflow mobile do Estúdio Alma: qualquer `sr-only`/absolute dentro de container com `overflow-x-auto` precisa de um ancestral `relative`.
