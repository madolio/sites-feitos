# Âncora (conceito)

Site-conceito da Madolio pro nicho de consultoria financeira / gestão de patrimônio. **Consultoria fictícia** — não existe (o sócio "Renato Vilas Boas" também é inventado). Vite + React 19 + TypeScript + Tailwind v4 + `@number-flow/react`. Página única.

Um dos três conceitos feitos pra responder ao feedback de que os quatro anteriores liam como "uma vertente só" (ver CLAUDE.md do `torre`, irmão deste).

## Deploy (Cloudflare Workers)

Worker `ancora`, em `https://ancora.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery — "Extrato"

- **Lugar/objeto:** a caderneta de banco impressa/carimbada, com lançamentos linha a linha.
- **Emoção:** sobriedade, controle — o oposto da ansiedade de gráfico de bolsa.
- **Colisão:** consultoria de investimentos × extrato bancário antigo.
- **Nunca parecer:** fintech com gráfico de velas, verde/vermelho de day trade e emoji de foguete.
- **Wildcard:** `Extrato.tsx` no Hero — um extrato ilustrativo que soma linha a linha conforme entra na tela (`IntersectionObserver` + `setTimeout` escalonado), com o saldo subindo em `@number-flow/react` até o total. Deixa claro no rótulo que é ilustrativo — nunca seria confundido com uma carteira real de cliente.

Paleta: índigo profundo `#241b3a` (não confundir com os azuis do `nbj-systems`/`madolio`, é um roxo-azulado escuro), papel `#f3ede0`, latão `#ab8a53`. Fontes: **Spectral** (serif) + **Roboto Mono** (números tabulares do extrato — justificado pelo conteúdo, não decorativo). Nenhum gráfico de performance de investimento de verdade — só o extrato ilustrativo, com aviso no rodapé de que não é recomendação de investimento.

## Gotcha de contraste

O rótulo mono "Extrato ilustrativo — aportes e rendimento" em `Extrato.tsx` estava em `text-indigo/60` sobre o fundo `paper` — dá ~4.14:1, abaixo do mínimo de 4.5:1 pra texto normal. Subido pra `/75` (~6.6:1). Qualquer texto pequeno em `text-indigo/*` sobre `bg-paper` precisa de pelo menos `/70`.
