# Fornada (conceito)

Site-conceito da Madolio pro nicho de padaria artesanal. **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Deploy (Cloudflare Workers)

Worker `fornada`, em `https://fornada.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Quadro de fornada"

- **Lugar/objeto:** quadro-negro de horário de forno, giz, crosta quente saindo do forno.
- **Colisão:** padaria artesanal × quadro de horários escrito à mão.
- **Nunca parecer:** padaria-fofa-pastel-com-ícone-de-pão-genérico (o clichê de landing page de confeitaria/padaria).
- **Wildcard:** `LoafCounter.tsx` no Hero — conta pães saindo do forno por dia, mesma técnica do `RepCounter` (Pulso)/`PlateCounter` (Ferro): `requestAnimationFrame`, sem lib, reescrita aqui porque os projetos são independentes.
- **Esqueleto próprio:** `FornadaDoDia.tsx` — em vez de uma seção genérica de "diferenciais", o conteúdo é literalmente o quadro de horários do forno (o que sai, e quando), fazendo o papel que normalmente seria de uma lista de benefícios.

Paleta: `--color-crosta` (#2b1a12, quase-preto quente) + `--color-farinha` (#f7f1e4, creme) + `--color-trigo` (#c9a86a, decorativo) + `--color-forno` (#d97b29, terracota). Fontes: **Fraunces** (serifada quente, assinatura de padaria) + **Nunito Sans** (corpo).

## Gotcha de contraste — regra do par (mesma do Ferro)

`--color-forno` (terracota) só é usado em pares de alto contraste conhecidos: texto `crosta` sobre fundo `forno` (`.btn-forno`), ou texto/borda `forno` sobre fundo `crosta`. Nunca texto `forno` direto sobre `farinha` — mesmo problema de contraste que o Pulso teve com seu vermelho vívido, evitado desde o início aqui.

## Modo demonstração

Igual ao Pulso/Ferro: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real. **Escrito com `m-auto` na className do `<dialog>` desde o início** — bug real encontrado em 19 outros conceitos (o reset do Tailwind zera `margin`, que é o que centraliza o dialog em `showModal()`); aqui já nasceu correto.

## FAQ + depoimentos

`Faq.tsx` e `Depoimentos.tsx`, entre `Cardapio` e `CtaFinal` no `App.tsx`. Adição pura, sem tocar Hero, `LoafCounter` ou tokens do `index.css` — reusa `--color-crosta/farinha/trigo/forno` e a classe `.tally` já existentes.

- **Faq.tsx:** acordeão acessível (mesmo padrão do `razao/src/components/Faq.tsx`): `<button aria-expanded aria-controls>` controlando um `<div role="region">`, toggle nativo por teclado via elemento `button`, sem lib. 6 perguntas concretas do nicho (antecedência de encomenda, sem glúten/vegano, bolo de aniversário, validade do pão, entrega vs. retirada, horário da fornada) com políticas inventadas e internamente consistentes.
- **Depoimentos.tsx:** 3 depoimentos curtos (nome + inicial do sobrenome), cada um específico sobre uma situação real (bolo de aniversário, hábito de terça de manhã, encomenda grande pra evento), fundo `crosta` pra variar o ritmo visual entre seções claras.

## SEO básico

`index.html` tem meta description, canonical, Open Graph e Twitter Card completos, incluindo `og-image.jpg` gerado na paleta do site. `public/robots.txt` e `public/sitemap.xml` existem.
