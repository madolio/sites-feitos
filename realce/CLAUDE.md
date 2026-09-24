# Realce & Cia (redesenho conceitual)

Redesenho do site do **Realce & Cia**, salão de beleza e escola de cabeleireiros que **existe de verdade** em São Roque (SP), desde 2004. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Isto NÃO é um conceito fictício

Todos os outros projetos desta pasta são negócios inventados. Este não é — e isso muda as regras:

- **Nenhum preço em lugar nenhum.** Não temos a tabela deles; publicar valor inventado seria divulgar informação falsa sobre um negócio real. A seção de serviços explica por que o orçamento vai na mensagem em vez de ficar na página.
- **Nenhum nome de profissional, depoimento, número de clientes ou prêmio.** Nada disso existe no material público deles.
- **Nenhum telefone na página.** Eles publicam dois números, mas o site não os mostra: todo botão passa pelo modo demonstração, e imprimir o número atrairia ligação de verdade pra um salão que não encomendou este site.
- **O rodapé declara** que é conceito da Madolio, não o site oficial, e que os textos descritivos são ilustrativos.

Fatos reais usados (do site atual + ficha pública): nome, "desde 2004", endereço (Av. Anhanguera 388, Jardim Bandeirantes, São Roque-SP, 18134-240), horário (segunda fechado, terça a sábado 9h–19h), a lista de serviços, o fato de ser salão **e escola**, e o slogan "sua beleza é seu cartão de visita" (no site atual sai com erro de digitação, "cartão de vista" — aqui está corrigido).

Erros do site antigo que este corrige: link de e-mail apontando pro placeholder `info@example.com`, calendário desatualizado e ícones de rede social sem link.

## Deploy (Cloudflare Workers)

Worker `realce`, em `https://realce.sneakpeek.workers.dev`. `npm run deploy`.

## Vibe — "Camarim"

- **Lugar/objeto:** camarim de teatro. Parede preta, espelho com lâmpadas quentes em volta, ferragem dourada.
- **Colisão:** a marca se chama *Realce* — a página é literalmente sobre a luz que realça.
- **Nunca parecer:** o kit rosa/dourado/mármore/script que praticamente todo site de salão usa, nem o "Corte" (barbearia deste mesmo repositório, que usa painel de senha e quadro de preços).
- **Esqueleto próprio:** `Marquise.tsx` — no lugar de sublinhado ou pílula marcando a seção ativa, cada item da nav tem uma **lâmpada** que acende quando você entra na seção. A barra inteira é o espelho de camarim em miniatura.
- **Wildcard:** `MonteSuaVisita.tsx` — ver abaixo.
- **Efeito de assinatura:** `Lampadas.tsx` — lâmpadas posicionadas por trigonometria ao longo de um arco, acendendo em sequência (sobe pela esquerda, cruza o arco, desce pela direita) como alguém ligando o espelho numa chave só. Usado no Hero e de novo no CTA final, fechando a página.

## O wildcard: montar a visita

O problema real de um salão com 14 serviços de durações muito diferentes é que ninguém sabe o que cabe na própria manhã. Então:

1. Você escolhe os serviços **na ordem** em que quer fazer.
2. Escolhe a hora de chegada (09:00 a 17:00, dentro do expediente).
3. A agenda monta sozinha: cada serviço vira um bloco com **altura proporcional à duração**, com horário de início e fim calculados em cadeia.
4. Mostra total e horário de saída, e **avisa se a visita passa das 19h** (fechamento) — detalhe que quase nenhum site de agendamento trata.
5. O botão gera uma mensagem de WhatsApp com o itinerário inteiro escrito, em vez do "olá, quero agendar" genérico.

A duração de cada serviço fica em `src/data/servicos.ts` e é a **mesma fonte** usada pela lista de serviços — não existem dois números pra conferir.

### Gotcha: altura do bloco da agenda

Os blocos usam `min-height`, **nunca `height`**, com piso de 78px. Com `height` fixo, um serviço de 30 min (56px na primeira versão) ficava menor que o próprio conteúdo (horário + nome + botão "tirar") e o texto vazava por cima do bloco seguinte — bug real, pego em screenshot de navegador.

## Paleta e contraste

**A paleta é a deles, não inventada.** A primeira versão deste site usou verde/jade porque uma leitura automática do site atual afirmou que o logo era "verde/teal" — estava errado. A paleta real foi extraída de duas fontes:

1. `wp-content/themes/curly/assets/css/style_dynamic.css` (o CSS que o customizador do tema WordPress gera), onde o accent aparece como `rgba(195, 157, 84, 1)`.
2. As cores efetivamente pintadas na página, lidas com `getComputedStyle` em todos os elementos e contadas por frequência: preto, branco, `#333333`, `#cccccc`, `#f5f5f5` e **`rgb(197, 157, 95)` = `#c59d5f`** — o dourado do logo.

Tokens: `--color-preto` (#000000) + `--color-branco` (#ffffff) + `--color-cinza` (#f5f5f5, seções claras alternadas) + `--color-dourado` (#c59d5f, o dourado do logo) + `--color-dourado-escuro` (#8a6a2f) + `--color-fumo` (#aaaaaa) + `--color-grafite` (#333333).

Pares testados (proporção WCAG calculada, não estimada):

| par | razão | uso |
| --- | --- | --- |
| `branco` sobre `preto` | 21:1 | texto principal em seção escura |
| `fumo` sobre `preto` | 10,2:1 | texto secundário em seção escura |
| `dourado` sobre `preto` | 8,4:1 | rótulos, horários e filetes em seção escura |
| `preto` sobre `dourado` | 8,4:1 | texto do botão primário e do chip selecionado |
| `grafite` sobre `branco` | 12,6:1 | texto secundário em seção clara |
| `grafite` sobre `cinza` | 11,6:1 | idem, na seção clara alternada |
| `dourado-escuro` sobre `branco` | 4,9:1 | destaque em seção clara |
| `dourado-escuro` sobre `preto` | 4,3:1 | anel de foco (serve nos dois fundos) |

**O que NÃO passa:** `--color-dourado` como texto sobre fundo claro — 2,5:1 no branco e 2,3:1 no cinza. O próprio site deles tem isso (logo dourado no branco), mas logo é marca gráfica e não cai na regra de texto da WCAG. Aqui, em fundo claro o dourado entra **só** como preenchimento (botão, chip selecionado) ou decoração; pra texto dourado em fundo claro existe `--color-dourado-escuro`.

É o inverso da regra dos outros projetos do repositório, onde o accent costuma falhar no escuro. Aqui o accent é claro: falha no claro, brilha no escuro.

Fontes: **Bodoni Moda** (display — didone de alto contraste, marquise de teatro) + **Karla** (corpo). O site atual deles usa Montserrat em tudo; a tipografia aqui é escolha de projeto, não da marca — só a paleta foi mantida fiel.

## Animação: por que sem GSAP

As animações daqui são só `opacity`/`translate`. A classe utilitária `transition` do Tailwind brigaria com o GSAP nessas mesmas propriedades (gotcha já documentado em outros projetos do repositório), então a revelação por rolagem é um `IntersectionObserver` único (`useRevelar.ts`) ligando `data-visivel` na classe `.revelar`, e o resto é `@keyframes` CSS. Zero dependência de animação no bundle.

`useRevelar` só observa o que existe no primeiro render — blocos da agenda montada aparecem depois e de propósito **não** usam `.revelar`.

## Modo demonstração

`demo.ts` + `DemoDialog.tsx`, igual aos outros projetos, com o texto adaptado pro fato de o salão ser real. `<dialog>` já nasce com `m-auto` (sem isso o preflight do Tailwind zera a margem e o modal cola no canto — bug corrigido em 19 projetos deste repositório).

## FAQ (`Faq.tsx`) — e por que sem depoimentos

A pedido do dono da agência, todos os sites mais antigos do portfólio
ganharam um acordeão de FAQ e uma seção de prova social, no padrão de
`razao/src/components/Faq.tsx` e `Depoimentos.tsx`. Aqui só entrou o FAQ.

Este projeto é o único do repositório sobre um negócio **real** (ver seção
"Isto NÃO é um conceito fictício" acima), com a regra explícita de nunca
publicar depoimento, nome de profissional ou número de cliente que não
exista no material público deles. Uma seção de depoimentos fictícios
quebraria essa regra na primeira frase, então foi omitida de propósito, não
esquecida.

`Faq.tsx`: acordeão acessível (`<button aria-expanded aria-controls>` +
`<div role="region">`, operável por teclado por ser `<button>` nativo),
inserido entre `Escola.tsx` e `Onde.tsx`. Seis perguntas reais de quem está
decidindo marcar horário (antecedência, por que não tem preço na página,
remarcação, cabelo cacheado/com química, se a escola interfere no
atendimento, segunda-feira fechada), com as mesmas duas regras do resto do
site: nenhum preço citado e nenhuma promessa que não dá pra confirmar sem
depender do WhatsApp. Usa `.revelar` (o `useRevelar` do projeto), não o
`Reveal.tsx` do `razao`, porque este projeto não tem GSAP nem esse
componente.

## SEO

`index.html` tem meta description, canonical, Open Graph e **JSON-LD `HairSalon`** com endereço e `openingHoursSpecification` reais (sem `telephone`, pelo mesmo motivo acima). `public/robots.txt` e `public/sitemap.xml` existem.
