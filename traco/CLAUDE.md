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

## Gotcha (já corrigido, mas fácil de reintroduzir)

Os `<rect>` de preenchimento dos ambientes em `FloorPlan.tsx` têm `className="fp-fill"` — o seletor CSS correspondente é `.floor-plan .fp-fill` em `index.css`. Se o nome da classe do componente e do CSS divergirem, os retângulos caem no fill preto padrão do SVG e cobrem o desenho inteiro (aconteceu uma vez nesta sessão: a tela toda ficava um bloco preto sólido). Testar sempre com uma screenshot depois de mexer nesse componente.
