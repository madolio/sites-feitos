# Encaixe (conceito)

Site-conceito da Madolio pro nicho de marcenaria sob medida. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Deploy (Cloudflare Workers)

Worker `encaixe`, em `https://encaixe.fenoninho-max.workers.dev`. `npm run deploy`.

## Conceito

Não é foto de móvel nenhuma vez no site — cada peça do catálogo é um **desenho técnico de elevação** (linha, cota, sem sombreado), como se a página fosse uma folha de bancada de marceneiro. O motivo aparece no próprio hero, texto e produto: "móvel que se sustenta pelo encaixe, não pelo parafuso".

`src/desenho.ts` gera as linhas de cada arquétipo de móvel (mesa, banco, estante, cadeira, aparador, banqueta) por coordenadas — não são ilustrações desenhadas peça a peça; mesa e aparador, por exemplo, só variam a largura da função geradora. Cada `Desenho` carrega também uma cota de largura (régua com traço + número) e o ponto do encaixe em destaque, que o `DesenhoTecnico.tsx` desenha com um círculo e o nome do encaixe ao lado — a etiqueta descreve o encaixe de verdade daquela peça (rabo-de-andorinha, espiga-e-furo, cavilha, meia-madeira), não é rótulo decorativo.

## O esqueleto — régua em vez de barra de menu

`Regua.tsx` substitui a barra de navegação por uma trena fixa na borda esquerda da tela (só em telas grandes): um traço vertical com uma marca por seção, que enche de cor quando a seção correspondente está visível (`IntersectionObserver`). Em telas menores a régua some e a navegação vira só rolagem — não existe versão "menu hambúrguer" dela, pra não recriar a barra que ela existe pra evitar.

## O único movimento não pedido

`Hero.tsx`: ao carregar a página, uma espiga desliza e trava no furo de um encaixe desenhado em SVG — o único movimento automático do site, um gesto só, que resume a proposta inteira. `prefers-reduced-motion` pula direto pro estado já encaixado. Toda cor da peça usa `var(--color-wood)`/`--color-wood-dark`, nunca a paleta de tinta/ink usada no resto do desenho de linha — reforça que aquela peça é "madeira de verdade" entrando no encaixe "desenhado a lápis".

## Reformulação — efeitos, mas sem quebrar a regra do "único movimento"

Pedido do usuário: mesmo nível de efeitos/fluidez da Realce, em todos os 7 conceitos desta leva. Aqui isso exigia cuidado: o site inteiro é construído em torno da regra de que **só existe um movimento automático** (a espiga do Hero). Adicionar efeitos decorativos por toda parte quebraria a própria proposta.

A saída: efeitos que só acontecem em **resposta a uma ação do visitante** (hover), nunca automáticos — isso não viola a regra, porque a regra é sobre movimento não pedido, não sobre ausência total de interação.

- `Catalogo.tsx`: cada `<article>` ganhou `className="group"`, e o quadro do desenho sobe de leve (`group-hover:-translate-y-1`) no hover — como levantar a peça da bancada pra examinar.
- `DesenhoTecnico.tsx`: o círculo do encaixe ganhou um halo (`.encaixe-halo`, fill-opacity 0 → 0.16 no hover do card) — destaca exatamente o detalhe que é o argumento de venda da marca, só quando alguém para pra olhar.

## Sequência real → numeração

`Processo.tsx` numera as seis etapas (conversa → madeira → desenho do encaixe → corte → acabamento → entrega) porque **são**, de fato, uma sequência fixa de atendimento — diferente da maioria dos outros conceitos do portfólio, que evitam numeração decorativa quando o conteúdo não é uma sequência real.

## Referência visual

Paleta: `--color-paper` #efe8d8 (papel kraft/engenharia, fundo do site inteiro — nenhum branco puro), `--color-ink` #2a2420 (linha de desenho técnico, quase preto mas quente), `--color-accent` #34586c (azul de grafite/lápis de marcenaria — frio, único contraste "frio" do site contra o papel e a madeira quentes), `--color-wood` #8b5a34 (única cor de preenchimento sólido do site, reservada pra madeira de verdade: a peça do hero e o número das etapas do processo). Fontes: **Fraunces** (títulos, com itálico reservado só pra uma palavra por vez) + **Work Sans** (interface/corpo) — combinação não usada em nenhum outro projeto do repositório. `rounded-none` em tudo: cantos são encaixados, não arredondados.

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.
