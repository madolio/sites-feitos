# Adriano Souza Passos (site real, não conceito)

**Este NÃO é um projeto de portfólio.** É um site de verdade, encomendado pelo próprio filho do cliente (o usuário desta conversa) pra uso real do pai — Adriano Souza Passos, profissional autônomo de tratamento de água e serviços elétricos. Diferente de todos os outros projetos desta pasta:

- **Sem modo demonstração.** Os botões de WhatsApp abrem o número real dele (`5511971817781`), com mensagem pré-escrita — igual a um site comercial de verdade funcionaria.
- **Sem `demo.ts`/`DemoDialog.tsx`.** Não existe porque não faz sentido aqui. Nunca introduzir esse padrão neste projeto.
- **Nenhum fato foi inventado.** Todo texto vem de fatos confirmados diretamente pelo usuário nesta conversa: nome, 22 anos de experiência, os dois ofícios (tratamento de água — com força em água de alta pureza pro padrão de hemodiálise — e elétrica), atendimento a todo tipo de cliente (residencial e clínico), e região (São Paulo e SP).

## Decisão consultada com o usuário: endereço não é público

O endereço completo (Estrada Manoel Lages do Chão, 600) foi dado pelo usuário, mas **perguntei explicitamente** se deveria aparecer no site, porque é trabalho de instalação/atendimento a domicílio, não um ponto comercial que recebe visita — publicar o endereço residencial sem necessidade seria expor privacidade à toa. O usuário confirmou: só cidade/região aparece ("São Paulo e região"), nunca o endereço completo. Se um dia quiserem mudar isso, é decisão dele/do usuário, não default.

## O que NÃO está no site (de propósito, por falta de fato confirmado)

- Preço ou tabela de valores — não foi informado.
- Nome fantasia — não existe um; o nome do site é o próprio nome do profissional, como é comum em prestadores autônomos.
- Certificações, cursos ou registros formais — não foram mencionados, então não aparecem. A força em "água de alta pureza pra hemodiálise" está descrita como experiência, não como certificação, porque é isso que foi confirmado.
- Depoimentos, fotos de trabalhos, logotipo — nada disso existe ainda.
- Estatística de fachada ("X clientes atendidos", "Y obras entregues") — nada disso foi confirmado. O único número do site é **22 anos de experiência**.

Se qualquer um desses fatos for confirmado depois, atualizar o site é trivial — **todo o texto factual mora em `src/dados.ts`** — mas nunca adicionar sem confirmação nova.

## Deploy (Cloudflare Workers)

Worker `adriano`, em `https://adriano.fenoninho-max.workers.dev`. `npm run deploy`.

## Identidade visual — dupla, sem misturar

Água e elétrica **nunca aparecem no mesmo elemento** — cada seção, cartão, glifo, botão e contorno de foco usa só a cor do ofício que representa. Esta continua sendo a regra número 1 do projeto.

## SEO

`index.html` tem meta description, canonical, Open Graph, Twitter Card e JSON-LD `LocalBusiness` com `areaServed` (só "São Paulo, SP", sem endereço completo, pela mesma razão de privacidade acima) e `telephone` real. `public/robots.txt` e `public/sitemap.xml` existem.

---

## 2026-09-18 — fusão com o Nascente: a identidade técnica absorvida aqui

O `nascente` (site-conceito de equipamentos para tratamento de água) foi aposentado do portfólio e **a identidade visual dele foi absorvida por este site**, a pedido do usuário: "junta os dois num só, mantém como Adriano, com a identidade visual do Nascente mas dizendo que é o Adriano". Nada de fato veio junto — só a linguagem visual. O `nascente/` não foi tocado.

### A ideia que fez a fusão funcionar: P&ID + unifilar

O Nascente inteiro era desenho técnico de **água**: P&ID (piping & instrumentation diagram), canos, registros, estágios de filtração. Isso cobriria metade do Adriano e deixaria a elétrica de fora — o que quebraria a regra de não misturar, ou pior, faria a elétrica parecer um apêndice da água.

A saída foi notar que **o P&ID tem um irmão exato no ofício elétrico: o diagrama unifilar** (one-line diagram). São as duas notações de engenharia reais com que cada ofício é desenhado antes de existir. Então a linguagem do Nascente foi estendida pros dois ofícios, cada um na sua notação e na sua cor:

- **Água → P&ID** (`EsquemaAgua.tsx`): entrada → registro → polipropileno → carvão ativado → osmose reversa → água de alta pureza.
- **Elétrica → unifilar** (`EsquemaEletrica.tsx`): rede → medidor kWh → disjuntor geral → DPS aterrado → quadro de distribuição (DR, barramento, barramento de terra) → circuitos terminais com ponto de luz, tomada e carga resistiva. Símbolos no padrão IEC 60617 / NBR: disjuntor é a chave com o "×" no contato fixo, DPS é o retângulo com a seta diagonal, DR leva o toroide, aterramento são as três barras decrescentes, ponto de luz e tomada são os símbolos da NBR 5444, e o cruzamento sem ligação usa o salto em arco.

Mesma gramática de desenho (condutor/cano grosso e claro, com o tracejado correndo por dentro), duas notações reais, uma cor cada. É isso que honra ao mesmo tempo a identidade do Nascente e a regra de não misturar os ofícios.

**Os esquemas são ilustrações da notação do ofício, não afirmações sobre o Adriano.** Nenhum deles diz que ele fez tal obra, tem tal certificação ou atende tal cliente — descrevem o que qualquer sistema de tratamento e qualquer instalação elétrica têm. As frases sobre ele continuam sendo só as de `src/dados.ts`.

### Paleta final (contraste medido)

| Token | Hex | Uso | Contraste |
| --- | --- | --- | --- |
| `--color-grafite` | `#0f2430` | texto, painel, rodapé | 15.97:1 no branco |
| `--color-papel` | `#ffffff` | fundo do corpo | — |
| `--color-superficie` | `#eef4f6` | faixa neutra (Sobre) | grafite 14.37:1 |
| `--color-linha` | `#c8d5d9` | traço de desenho, filetes | não-texto |
| `--color-fumo` | `#4d5f6b` | texto secundário | 6.64:1 no branco |
| `--color-agua` | `#0a6b87` | ofício da água (texto e botão) | 6.06:1 no branco, 5.21:1 no `agua-clara` |
| `--color-agua-forte` | `#085470` | hover do botão de água | branco 8.36:1 |
| `--color-agua-luz` | `#4cb6d6` | água **sobre o grafite** | 6.82:1 no grafite |
| `--color-agua-clara` | `#e3f0f5` | fundo da seção de água | — |
| `--color-eletrica` | `#95590c` | ofício elétrico (texto e botão) | 5.66:1 no branco, 5.01:1 no `eletrica-clara` |
| `--color-eletrica-forte` | `#74450a` | hover do botão de elétrica | branco 8.08:1 |
| `--color-eletrica-luz` | `#f0b429` | elétrica **sobre o grafite** | 8.56:1 no grafite |
| `--color-eletrica-clara` | `#faf0de` | fundo da seção de elétrica | — |

Gotcha medida: `--color-agua` sobre `--color-grafite` dá só **2.63:1**. Por isso o painel e o rodapé escuros usam exclusivamente as versões `-luz`, inclusive no contorno de foco (`.escuro :focus-visible` e `.escuro .foco-eletrica:focus-visible` no `index.css`). Nunca trocar uma pela outra.

As impurezas do esquema de água (`#8a7f6b` sedimento, `#5f7d5e` cloro, `#2f4356` sais) são propositalmente dessaturadas e de matizes distintos entre si — nenhuma pode ser confundida com o âmbar da elétrica.

### Tipografia

**Archivo**, uma família só (era Space Grotesk + Source Sans 3), com os títulos em `font-stretch: 116%` — o eixo de largura da variável, herdado do Nascente. Carregada com o eixo `wdth,wght@100..125,400..800`.

### Componentes

Adicionados:

- `Painel.tsx` — a navegação virou painel de instrumentos (substitui `Header.tsx`, que era a barra fixa genérica com logo + links + botão). Coluna fixa `w-56` à esquerda no desktop, barra fina + menu no mobile, scroll-spy por `IntersectionObserver`. Cada seção é um estágio com o instrumento do seu ofício e um trilho tracejado que escorre atrás, na cor daquele ofício — a coluna em si é neutra, então nenhum elemento mistura as duas cores.
- `Instrumentos.tsx` — quatro instrumentos reais de painel: **manômetro** (água, o instrumento do P&ID), **amperímetro** (elétrica, o instrumento do unifilar — bobina móvel, com o eixo embaixo e a escala em cima, ao contrário do manômetro), **horímetro** (neutro, conta horas de serviço → seção de experiência) e **sinaleiro** IEC (neutro, acende na seção de contato).
- `EsquemaAgua.tsx` — o P&ID, portado do `TreatmentDiagram.tsx` do Nascente com a cor e o texto do Adriano. GSAP DrawSVG desenha os canos, a água corre e cada impureza para na etapa que a retém.
- `EsquemaEletrica.tsx` — o unifilar, desenhado do zero nesta fusão. DrawSVG desenha os condutores, a corrente corre em âmbar e as cargas pulsam.
- `OficioGlyph.tsx` — glifos técnicos em `currentColor` (vaso de osmose, cartucho, registro, quadro de distribuição, disjuntor) no lugar de ícone genérico ou foto — e não existe foto de trabalho pra usar, o que é um fato do projeto.
- `FichaServicos.tsx` — os serviços viraram ficha em linhas (o `SpecList` do Nascente), não grid de cartões. Sem coluna de número/preço, porque esse dado não existe.
- `Agua.tsx` / `Eletrica.tsx` — as duas seções de ofício (substituem o `Servicos.tsx` de dois cartões lado a lado). O texto real é o mesmo, só reorganizado.
- `Contato.tsx` — o rodapé virou o bloco de contato sobre o grafite (funde `CtaFinal.tsx` + `Footer.tsx`), com o WhatsApp real.
- `Reveal.tsx` — revelação por rolagem com GSAP (substitui `useRevelar.ts` + a classe `.revelar`), usada só nas aberturas de seção e nas fichas.
- `src/dados.ts` — **todo o texto factual do site num arquivo só**, pra que a regra "nada inventado" seja verificável de um olhar.

Mantidos:

- `PurezaGauge.tsx` — o anel que enche até 100% ao entrar na tela, o selo da especialidade real em água de alta pureza. Sobreviveu porque já era um instrumento; ganhou a face com as marcas de escala do resto do painel. Continua sem lib de animação (`IntersectionObserver` + `requestAnimationFrame`) e continua pulando direto pra 100 com `prefers-reduced-motion`.
- `contato.ts` — inalterado, número real.

Removidos (não deixados como código morto): `Header.tsx`, `Footer.tsx`, `CtaFinal.tsx`, `Servicos.tsx`, `useRevelar.ts`.

### Movimento e `prefers-reduced-motion`

Toda animação de GSAP do site está dentro de `gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', ...)` — `EsquemaAgua.tsx`, `EsquemaEletrica.tsx` e `Reveal.tsx`. Com movimento reduzido nenhum timeline é criado e o estado final estático é o próprio HTML: esquemas desenhados, canos cheios, textos visíveis. O trilho do painel é CSS e tem `animation: none` no bloco `@media (prefers-reduced-motion: reduce)`, junto com `scroll-behavior: auto`. O `PurezaGauge` checa `matchMedia` direto e pula pra 100.

Os dois esquemas param o fluxo contínuo quando saem da tela (`ScrollTrigger.onToggle`) — não fica um timeline infinito rodando fora de vista.

Gotcha herdada do `madolio`: não pôr a classe `transition` genérica do Tailwind em elemento que o GSAP anima em opacity/transform. Os instrumentos do painel têm `transition-all` porque **não** são animados por GSAP — são estado de React.

### og-image

`public/og-image.jpg` foi regerado (1200×630, `sharp`) na identidade nova: fundo grafite com duas faixas esquemáticas separadas — o P&ID em `agua-luz` e o unifilar em `eletrica-luz`, cada faixa numa cor só — e o nome, a região e os 22 anos embaixo. As meta tags continuam apontando pra `/og-image.jpg`.
