# Balcão (conceito)

Site-conceito da Madolio pro nicho de lanchonete de autoatendimento. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Feito pra ter um **esqueleto de página** genuinamente diferente dos outros conceitos do portfólio — ver a instrução original do usuário: "mude o esqueleto da página, parece tudo a mesma coisa". Ver também Cerne (duas colunas fixas), Tinta (rolagem horizontal) e Rota (layout de dashboard), feitos na mesma leva.

## Deploy (Cloudflare Workers)

Worker `balcao`, em `https://balcao.fenoninho-max.workers.dev`. `npm run deploy`.

## O esqueleto — catálogo direto, sem hero, com carrinho de verdade

Diferente de todo o resto do portfólio (que é sempre uma experiência de "ler e rolar"), o Balcão é **orientado a tarefa**: abre direto no cardápio (`Topo.tsx` — marca, "Aberto agora" e abas de categoria, sticky), sem nenhum texto de boas-vindas ou seção "sobre nós" antes do catálogo (`Grade.tsx`). É o único projeto do portfólio com estado de carrinho de verdade (`App.tsx` guarda `Record<itemId, quantidade>`, sobe/desce por item em `ItemCard.tsx`).

`Carrinho.tsx` é uma barra fixa embaixo que só existe quando há item selecionado — mostra contagem + total e, ao clicar "Fazer pedido", monta a mensagem itemizada e dispara pro mesmo fluxo de `DemoDialog.tsx` usado no resto do portfólio (nunca abre WhatsApp de verdade). `App.tsx` reserva `pb-24` no `<main>` quando o carrinho está visível, pra ele não cobrir a última linha de itens.

**Gotcha de mobile:** as abas de categoria (`Topo.tsx`) estouram a largura em telas pequenas — a última ("Combos") ficava cortada sem nenhuma pista visual de que dava pra arrastar. Corrigido com `mask-image: linear-gradient(...)` na `nav` (fade na borda direita) + um spacer depois do último botão, pra sempre sobrar um respiro visível indicando mais conteúdo.

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.

## Referência visual

Paleta: `--color-cream` #fff6e1 (fundo), `--color-card` #fffcf5 (cartão, um tom mais claro), `--color-ink` #2b2115, `--color-leaf` #257a40 (verde — cor seguro pra texto, validada em ~5.0:1 sobre o cream; a variante mais viva #2F8F4E ficava em ~3.78:1, abaixo do mínimo de 4.5:1). Cor escolhida de propósito pra fugir da família laranja/vermelho já usada em Pulso, Focinho, Revelar e Doce Ateliê. Fontes: **Alfa Slab One** (display, bem robusta pra preço/menu) + **Lexend** (corpo) — nenhuma das duas usada em outro projeto do repositório.

`Icone.tsx` tem os 6 glifos do cardápio (burger, wrap, copo, lata, doce, combo) — traço só, sem preenchimento, nunca foto de comida.
