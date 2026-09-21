# Renata Bastos Nail Studio (conceito)

Site-conceito da Madolio pro nicho de **manicure/esmalteria** — pedido
explícito da dona da agência por ser nicho fácil de vender: quase toda
cidade brasileira tem uma esmalteria de bairro, e o dono real reconhece o
próprio negócio na hora. **Negócio fictício** — não existe. Vite + React 19
+ TypeScript + Tailwind v4, `Reveal.tsx` com IntersectionObserver (copiado
da versão canônica do `arcada/`, não a versão antiga com ScrollTrigger).
Página única.

## Deploy (Cloudflare Workers)

Worker `esmalte`, em `https://esmalte.fenoninho-max.workers.dev`.
`npm run deploy`.

## Vibe Discovery

- **Colisão:** esmalteria × tempo de cura sob lâmpada. Toda manicure que
  trabalha com esmalte em gel ou gel de construção cronometra a cabine de
  LED/UV o dia inteiro — é o dado mais real e mais repetitivo do ofício,
  documentado por fabricante de esmalte em gel e ensinado em curso de nail
  design (segundos por camada, sob LED de 405nm ou UV de 340-380nm). O
  wildcard usa esse número de verdade em vez de inventar um "cronômetro"
  decorativo.
- **Nunca parecer:** o `corte/` (barbearia deste mesmo repositório — painel
  de senha de atendimento, paleta azul/branco/vermelho de poste de
  barbeiro), o `realce/` (salão de cabelo — mecânica de camarim/espelho de
  teatro, dourado sobre preto) nem o `tinta/` (estúdio de tatuagem — void
  preto + vermelho ember + ilustração flash). Este é o primeiro dos quatro
  focado especificamente em unha: mecânica de cronômetro de cura, paleta de
  esmalte + luz de LED, sem nenhum dos elementos de identidade visual dos
  três vizinhos.

## O wildcard: `CuraTimer.tsx`, o cronômetro real da cabine

`data/tecnicas.ts` tem as 4 técnicas de esmaltação que qualquer esmalteria
oferece hoje, cada uma com o tempo de cura real documentado por fabricante
de esmalte em gel e por curso de nail design (não são números inventados):

- **Esmalte tradicional:** sem lâmpada, seca ao ar. Toque seco em ~1h, cura
  completa do filme em até 24h.
- **Esmalte em gel:** cura sob luz. 30s por camada em LED (405nm) ou 2min
  por camada em UV fluorescente (340-380nm) — a LED é sempre mais rápida
  pra mesma camada, e o site mostra essa diferença lado a lado. 4 camadas
  (base + 2 de cor + top coat).
- **Unha em pó (dip powder):** sem lâmpada nenhuma, o pó mergulha sobre um
  ativador que endurece ao ar em ~8-12min.
- **Gel de construção (BIAB):** também cura sob luz, 60s por camada em LED
  ou 2min em UV, 3 camadas (base + construção + top coat).

Escolher a técnica (e, quando ela usa lâmpada, escolher LED ou UV) recalcula
o total real (`camadas × segundos por camada`) e alimenta um cronômetro que
conta pra baixo de verdade, segundo a segundo, via `setInterval` — não é
uma barra de progresso fake com duração arbitrária. Sob
`prefers-reduced-motion: reduce`, o cronômetro nasce direto no valor final
(0s) em vez de contar, porque a contagem em si é a única razão do
componente existir e não faz sentido forçar sem motion.

### `Formatos.tsx`: taxonomia real de formato de unha

Seção de apoio (não o wildcard principal) com os 6 formatos de unha
ensinados em curso de nail design — quadrado (90°), squoval (~80°), oval
(~55°), amendoado (~40°), coffin/ballerina (~25°) e stiletto (~15°) — cada
um definido pelo ângulo real de lixamento da lateral, do mais reto ao mais
afunilado. As faixas de ângulo são as citadas em material de treinamento de
manicure, por isso aparecem como aproximação (`~`), nunca como medição de
precisão.

## Modo demonstração

Igual a Trilha/Estufa/Bruma/Fornada: `demo.ts` + `DemoDialog.tsx`. Nenhum
botão abre um WhatsApp real — mostra a mensagem que seria enviada e oferece
o contato da Madolio. `Contato.tsx` monta a mensagem a partir da técnica
escolhida num `<select>`, nome opcional e horário preferido opcional.

## Acessibilidade

Um único `<h1>` real (no Hero). O SVG decorativo de lâmpada/gota de esmalte
no Hero tem `aria-hidden="true"`. Os seletores de técnica e de lâmpada são
`<button>` com `aria-pressed`, navegáveis por teclado. `:focus-visible` em
todo elemento interativo. O valor do cronômetro tem `aria-live="polite"`
pra leitor de tela acompanhar a contagem sem precisar focar de novo. Todo o
movimento (pulso da lâmpada no hero, balanço da gota, `Reveal`) respeita
`prefers-reduced-motion: reduce`, incluindo a regra global no fim de
`index.css` que zera duração de animação/transição pra qualquer elemento.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card
(sem `og:image` — mesmo padrão de Arcada/Estufa/Fornada, sem asset dedicado
pra este conceito) e JSON-LD **`NailSalon`** (tipo válido do schema.org,
subtipo de `HealthAndBeautyBusiness` — verificado antes de usar, em vez de
cair em `BeautySalon` por padrão). `public/robots.txt` e
`public/sitemap.xml` existem.

## Paleta e não-colisão

`--color-marfim` #fdf6f2 (fundo claro, vidro de esmalte fosco),
`--color-tinta` #241220 (ameixa quase-preto, fundo escuro e texto
principal), `--color-uv` #7c5cff (roxo-azulado da luz da lâmpada LED,
acento primário) + `--color-uv-hover` #6446e0, `--color-coral` #ff6f91
(coral de esmalte, CTA/acento secundário) + `--color-coral-hover` #e0557a,
`--color-linha` #f0ddd3 (borda sobre o marfim), `--color-nude` #eccbb4
(tom nude decorativo). Conferido com `grep -rh -- '--color-' */src/index.css`
contra todos os ~36 projetos irmãos antes de fechar: nenhum desses 8
hexadecimais exatos aparece em nenhum outro projeto do repositório (o
único hit do grep pro conjunto é o próprio `esmalte/src/index.css`).

Diferenciação explícita dos três vizinhos de nicho mais próximos:

- **vs. `corte`** (`--color-vermelho` #c8202f, `--color-azul` #1d4e89,
  branco/navy #16233b): paleta de poste de barbeiro clássico, vermelho vivo
  + azul + navy. O Esmalte nunca usa vermelho puro nem navy — roxo-azulado
  de luz de LED e coral de esmalte, sem nenhum hex em comum.
- **vs. `realce`** (`--color-dourado` #c59d5f, preto #000000, branco
  #ffffff): dourado de ferragem de camarim sobre preto/branco puro. O
  Esmalte não usa dourado nem preto/branco puro — ameixa escura, não preto,
  e marfim rosado, não branco neutro.
- **vs. `tinta`** (`--color-void` #121212, `--color-ember` #ff3b3b,
  `--color-paper` #f5f5f0): void quase-preto + vermelho-ember de flash
  tattoo. O Esmalte é mais claro no fundo principal (marfim, não void) e o
  acento quente é coral rosado, não vermelho puro — paletas que não se
  cruzam em nenhum hex.

## Tipografia e não-colisão

**Italiana** (display — serifa fininha e elegante, registro de vidro de
esmalte/vitrine, não script decorativo) + **Urbanist** (corpo, sans
geométrica neutra) + **Red Hat Mono** (`--font-mono`, só pro dado real do
cronômetro e dos ângulos de formato — nunca decorativo). Conferido com
`grep -rhoE "family=[^&\"]+" */index.html` contra todos os irmãos,
**incluindo os três outros conceitos construídos em paralelo nesta mesma
leva** (`torque`, `razao`, `trama`): a primeira escolha de mono foi **DM
Mono**, que checou limpo contra os ~33 projetos já commitados, mas o
`razao/` e o `torque/` (builds paralelos, ainda sem commit) também tinham
escolhido DM Mono — trocado pra **Red Hat Mono**, que não aparece em
nenhum `index.html` do repositório, incluindo os três em paralelo. Nenhuma
das três fontes finais (Italiana, Urbanist, Red Hat Mono) aparece em outro
projeto, e o trio como combinação também é inédito.

## FAQ e depoimentos (`Faq.tsx`, `Depoimentos.tsx`)

Adicionados depois do build inicial, por pedido direto da dona da agência: ela
apontou a página real da psicóloga Luana Raquel
(psicologaluanaraquel.com) como referência comprovada de conversão, e o
esmalte não tinha nem FAQ nem prova social (grep confirmou seção vazia).
Trazidos os padrões estruturais, não o visual do site de referência —
mantendo o mecanismo de cura, a paleta e a tipografia do Esmalte intactos.

- **`Faq.tsx`**: acordeão acessível de verdade, `<button aria-expanded
  aria-controls>` controlando um `<div role="region">`, navegável por
  teclado (Enter/Space nativos do `<button>`), sem JS de animação de altura
  (evita medir/recalcular altura sob `prefers-reduced-motion`; o painel só
  aparece/some via `hidden`). Perguntas em `data/faq.ts`: durabilidade real
  de gel (15-21 dias) vs. BIAB (3-4 semanas), remoção seguro de gel de outro
  salão, custo de nail art à parte, antecedência de agendamento, garantia de
  7 dias pra unha que lasca, e esterilização por autoclave — dúvidas reais de
  quem nunca fez o procedimento, não perguntas genéricas de salão. Copy
  passada pelo skill `humanizer` antes de fechar.
- **`Depoimentos.tsx`**: 3 depoimentos fictícios em `data/depoimentos.ts`,
  nome + inicial do sobrenome (nunca nome completo, cliente fictícia), cada
  um específico sobre uma técnica ou situação real do site (cronômetro de
  cura, garantia de 7 dias, remoção segura) em vez de "adorei, recomendo".
  Cards no estilo swatch do próprio Esmalte (borda `linha`, fundo branco
  sobre `marfim`), sem widget de estrelas genérico.

Posição em `App.tsx`: depois de `Formatos` (conteúdo de apoio) e antes de
`Contato` (CTA final), pra prova social e FAQ aparecerem depois do wildcard
mas antes do formulário de agendamento — igual ao padrão da página de
referência (CTA de contato repetido no Hero e em `Contato`, sem inventar um
terceiro botão de WhatsApp de verdade).

## Decisões

- Owner fictícia: **Renata Bastos**, esmalteria de bairro em
  Uberlândia/MG — cidade não repetida em nenhum projeto irmão já lido
  (Gramado/RS, Curitiba/PR, São Roque/SP).
- 4 técnicas (não mais) porque são as 4 técnicas reais que uma esmalteria
  de porte médio oferece hoje — esmalte tradicional, gel, unha em pó e gel
  de construção — cobrindo tanto o caso sem lâmpada quanto o caso com
  lâmpada (LED vs UV), sem inventar uma quinta técnica pra parecer mais
  completo.
- O seletor de lâmpada (LED/UV) só aparece pras técnicas que de fato usam
  lâmpada (`tecnica.usaLampada`) — esmalte tradicional e unha em pó não
  mostram esse controle, porque mostrar seria sugerir uma opção que não
  existe na vida real dessas técnicas.
- `Formatos.tsx` é catálogo de apoio, não o wildcard: o ângulo de lixa é
  informação real mas estática (não vira lógica de cronômetro), ao
  contrário do tempo de cura em `CuraTimer.tsx`, que é literalmente
  calculado a partir do dado escolhido.
- `Reveal.tsx` é a versão mais recente usada em `arcada/`: ainda anima com
  GSAP (`gsap.to`), mas dispara por `IntersectionObserver` puro em vez de
  `ScrollTrigger` — dependência mais leve, mesmo resultado visual, guardado
  por `prefers-reduced-motion` (sem preferência de movimento, o elemento já
  nasce no estado final, sem animação).
