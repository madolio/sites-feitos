# Traço (conceito)

Site-conceito da Madolio pro nicho de arquitetura e design de interiores. **Escritório fictício** — não existe (a arquiteta "Marina Coutinho" também é inventada). Vite + React 19 + TypeScript + Tailwind v4 + GSAP (`DrawSVGPlugin`). Página única.

Um dos três conceitos feitos pra responder ao feedback de que os quatro anteriores liam como "uma vertente só" (ver CLAUDE.md do `torre`, irmão deste).

## Deploy (Cloudflare Workers)

Worker `traco`, em `https://traco.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery — "Planta Baixa"

- **Lugar/objeto:** o desenho técnico de uma planta baixa de arquitetura.
- **Emoção:** clareza, decisão bem fundamentada.
- **Colisão:** portfólio de arquitetura × desenho técnico editorial (nada de fotografia de revista).
- **Nunca parecer:** site de arquitetura com foto de fachada em tela cheia e overlay escuro.
- **Wildcard:** `FloorPlan.tsx` no Hero — uma planta baixa real (quarto, banheiro, cozinha, sala, varanda) que se desenha sozinha com `DrawSVGPlugin` ao entrar na tela: paredes primeiro, depois as portas (arco de abertura), depois o preenchimento dos ambientes.

Sem fotos de projeto — os "projetos" do portfólio (`ProjetoPlan.tsx`) são representados por miniaturas de planta também, um layout diferente por índice, pra não inventar fotos de obras que não existem. Paleta: papel `#f6f4ef`, grafite `#22201b`, linha de cota azul-acinzentada `#7a92a3` (cor de linha de projeto, não decoração), ocre `#c9962d` como único acento quente — evitando de propósito o terracota (`#D97757`-ish), que é o tique mais comum de design gerado por IA. Fontes: **Fraunces** (serif editorial) + **Work Sans**.

## Componentes

- `FloorPlan.tsx` — a planta do Hero, com paredes/portas desenhadas via DrawSVG e ambientes preenchidos em sequência.
- `ProjetoPlan.tsx` — 6 layouts de planta em miniatura (`layouts[]`), um por projeto do portfólio.
- `.dim-line` (em `index.css`) — a "linha de cota" com texto no meio, reaproveitada como divisor pra mostrar a metragem de cada projeto.

## Reestruturação de set/2026 — a navegação virou o carimbo de prancha

Era um dos 5 projetos deliberadamente deixados com o nav genérico (barra fixa full-width, logo + lista de links + botão) enquanto outros conceitos do repositório (Torre, Calibre, Cerne, Nascente...) já tinham ganhado arquitetura própria — ver o `CLAUDE.md` do `madolio`, que documentava essa lista. Reestruturado "página a página" a pedido do usuário, seguindo o mesmo método usado no Nascente (`Painel.tsx`, ver o `CLAUDE.md` dele).

`Nav.tsx` (removido, não deixado como código morto) virou `Carimbo.tsx`: em vez de uma barra full-width, a navegação é o **carimbo de prancha** (title block) — a caixa no canto inferior direito que toda prancha de arquitetura de verdade carrega, com o nome do escritório e o índice de pranchas do projeto. Diferente do `Cerne` (que navega clicando num cômodo da própria planta baixa), o carimbo é a ficha técnica do desenho, não o desenho em si — os dois mecanismos não se repetem.

- **Estado recolhido:** uma aba pequena e sempre visível, fixa no canto inferior direito (`right-4 bottom-4`, `right-6 bottom-6` a partir de `sm`), mostrando só "PRANCHA" + o número (01–05) da seção atual — dá pra saber "onde estou" sem nem abrir o painel. Igual em desktop e mobile, sem variante de layout por breakpoint (diferente do Nascente, que troca coluna fixa por barra fina no topo).
- **Estado expandido:** ao clicar na aba, abre pra cima o carimbo completo — cabeçalho com `Mark` (o logo, movido de `Nav.tsx` pra cá) + "Traço", o índice numerado das 5 seções (Apresentação/Projetos/Processo/Estúdio/Contato) com a seção ativa em destaque (fundo grafite, número em ocre), uma `.dim-line` com metadados decorativos de prancha ("SP · ESC S/ESC.") e o CTA "Falar com o estúdio" como se fosse o campo de assinatura do carimbo. Fecha ao clicar fora, `Esc`, ou ao clicar num item.
- **Seção ativa:** por scroll-spy (`IntersectionObserver`, `usePranchaAtiva`), com uma ressalva importante: a faixa de observação (`rootMargin: '-20% 0px -60% 0px'`) fica só entre 20%–40% da altura da viewport, e a última seção (`#contato`, o rodapé) é mais baixa que essa margem — ela nunca "entra" na faixa mesmo rolado até o fim da página, deixando "Estúdio" preso como ativo. Corrigido com um listener de `scroll` adicional que força a última prancha quando `scrollY + innerHeight` chega a ~2px do fim do documento. Testar esse caso especificamente (rolar até o fim) sempre que mexer nesse componente.
- Sem coluna fixa reservando espaço lateral — o carimbo é um overlay pequeno, então não precisou de padding-left nas seções. Só o padding-top do Hero mudou (`pt-28 md:pt-40` → `pt-16 md:pt-24`), já que não existe mais uma barra full-width no topo ocupando espaço.
- `Footer.tsx` ganhou `pb-28 sm:pb-16` pra abrir espaço pro carimbo recolhido no canto, que senão ficaria colado no texto do rodapé em telas estreitas.
- Import do `Mark` mudou de `./Nav` pra `./Carimbo` (usado também no `Footer.tsx`).

## Diretrizes de design herdadas do repositório

Ver o CLAUDE.md do projeto irmão `madolio` (mesmo usuário) para a diretriz completa sobre evitar visual "AI slop".

## Gotcha (já corrigido, mas fácil de reintroduzir)

Os `<rect>` de preenchimento dos ambientes em `FloorPlan.tsx` têm `className="fp-fill"` — o seletor CSS correspondente é `.floor-plan .fp-fill` em `index.css`. Se o nome da classe do componente e do CSS divergirem, os retângulos caem no fill preto padrão do SVG e cobrem o desenho inteiro (aconteceu uma vez nesta sessão: a tela toda ficava um bloco preto sólido). Testar sempre com uma screenshot depois de mexer nesse componente.
