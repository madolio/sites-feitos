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

## Reestruturação de set/2026 — a navegação virou a linha de fundeio

Era um dos 5 projetos deliberadamente deixados com o nav genérico (barra fixa full-width, logo + lista de links âncora + botão) enquanto outros conceitos do repositório (Torre, Nascente, Cerne...) já tinham ganhado arquitetura própria. Reestruturado "página a página" a pedido do usuário, seguindo o mesmo método usado no Nascente (`Painel.tsx`): a navegação vira o próprio objeto/vocabulário que já é o assunto do site.

`Nav.tsx` (removido, não deixado como código morto) virou `Fundeio.tsx`: em vez de uma barra de links soltos, a navegação é literalmente a linha de fundeio de uma âncora de verdade — uma corrente descendo verticalmente, com cada seção marcada como uma "profundidade" (Início 0m / Serviços 8m / Como funciona 16m / Equipe 24m / Contato 32m), cada uma com um elo de corrente (`Elo`, SVG de dois anéis entrelaçados) em vez de um link de texto solto. É uma metáfora dupla, não decoração: profundidade financeira (deitar âncora = segurança patrimonial, o próprio nome da empresa) e o objeto físico da marca (`Mark`, reaproveitado do `Nav.tsx` original — só trocado o stroke do corpo da âncora de `#241b3a` fixo para `currentColor`, porque agora o `Mark` aparece tanto sobre `bg-indigo` no desktop quanto sobre `bg-paper` no topo mobile).

- **A corda/corrente (`Corda`) é o próprio indicador de progresso do scroll-spy:** um traço fraco (`bg-paper/15`) do topo ao fundo da coluna representa a linha inteira, com um traço latão sólido sobreposto até a profundidade ativa — a corrente "paga pra fora" conforme o visitante desce a página, em vez de uma barra de progresso separada e genérica.
- **Desktop:** coluna fixa `w-56` à esquerda (mesmo padrão do Nascente/Torre), sempre visível, CTA "Agendar diagnóstico" fixo no rodapé do painel.
- **Mobile:** vira uma barra fina no topo (marca + CTA + botão de menu) — as profundidades ficam atrás de um menu que abre embaixo, não escondidas sem pista nenhuma.
- **Profundidade ativa:** por scroll-spy (`IntersectionObserver`, `useProfundidadeAtiva`) — página única, sem rotas, então não precisa de fallback por rota+hash como no Nascente.
- Como a coluna deixou de ser uma barra fixa no TOPO, o padding-top do Hero mudou de "espaço pra header full-width" pra "espaço só no mobile" — `pt-24 lg:pt-16` no lugar de `pt-28 md:pt-36`. As demais seções já usavam `scroll-mt-16`, que continua servindo tanto pro scroll suave quanto pra folga da barra fina mobile.
- `Footer.tsx` importava `Mark` de `./Nav`; passou a importar de `./Fundeio`.

## FAQ e prova social (set/2026)

Adicionados `Faq.tsx` e `Depoimentos.tsx`, seguindo o mesmo padrão já validado no `razao` (acordeão acessível + cards de depoimento), sem mexer no Hero, no `Extrato.tsx` (wildcard) nem nos tokens de `index.css`. Entram no `App.tsx` depois de `Equipe` e antes do `Footer`/contato: `Depoimentos` primeiro, `Faq` por último, pra quem ainda tem dúvida ler a prova social antes de bater de frente com a objeção.

- **`Faq.tsx`:** acordeão com `<button aria-expanded aria-controls>` controlando um `<div role="region">` por `useState` local (sem CSS de altura/opacidade dependente de transição, então funciona igual com `prefers-reduced-motion`). Seis perguntas pré-venda específicas do nicho de consultoria patrimonial: patrimônio mínimo, forma de cobrança (honorário fixo, sem comissão de banco/corretora — o gancho de confiança do setor), se a consultoria tem acesso ao dinheiro do cliente, frequência de revisão, cancelamento e se cobre sucessão além do dia a dia.
- **`Depoimentos.tsx`:** três depoimentos fictícios (primeiro nome + inicial, ex. "Marina T."), cada um amarrado a um serviço real do `data.ts` (planejamento, sucessório, gestão de carteira) e a um fato concreto, não a elogio genérico. Estilizado só com os tokens já existentes (`bg-paper`, `border-line`, `text-brass`, `.mono`) — nenhum widget de estrelas, porque não combina com o vocabulário sóbrio de "extrato/caderneta" do site.
- Ambas as seções usam `id` + `scroll-mt-16` e `Reveal` como as demais seções de `App.tsx`, mas **não foram adicionadas à `Fundeio.tsx`** (a linha de fundeio): mexer nas profundidades numeradas (0/8/16/24/32 m) e no scroll-spy é fora do escopo de "adição pura" pedido; ficam alcançáveis por scroll normal, sem entrada própria na navegação.

## Gotcha de contraste

O rótulo mono "Extrato ilustrativo — aportes e rendimento" em `Extrato.tsx` estava em `text-indigo/60` sobre o fundo `paper` — dá ~4.14:1, abaixo do mínimo de 4.5:1 pra texto normal. Subido pra `/75` (~6.6:1). Qualquer texto pequeno em `text-indigo/*` sobre `bg-paper` precisa de pelo menos `/70`.
