# Vereda Fisioterapia (conceito)

Site-conceito da Madolio pro nicho de **fisioterapia clínica** (ortopédica,
esportiva, neurológica, RPG, pós-operatória). **Clínica fictícia** — não
existe. Vite + React 19 + TypeScript + Tailwind v4 + GSAP (`Reveal.tsx`).
Página única.

## Deploy (Cloudflare Workers)

Worker `trilha`, em `https://trilha.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Colisão:** fisioterapia × cartografia/mapa topográfico de trilha — o
  plano de recuperação é mostrado como uma trilha de montanha num mapa
  topográfico real: cada fase da reabilitação física é um trecho do
  percurso, com linguagem visual real de curva de nível, marco de trilha e
  distância, mapeada sobre a estrutura real de fase de recuperação
  fisioterapêutica (fase aguda/controle da dor, fase de amplitude de
  movimento, fase de fortalecimento, fase de retorno funcional/esportivo).
  O progresso do paciente no tratamento é mostrado como avanço na trilha —
  uma visualização genuinamente útil de uma linha do tempo real de
  semanas/meses de recuperação, não decorativa.
- **Nunca parecer:** propaganda genérica de fisio (foto de banco de imagem
  de atleta sorrindo se alongando, paleta azul/laranja genérica de clínica
  esportiva, "recupere seus movimentos" como texto de enchimento). Não
  parecer com o `pulso` (personal training, nav de pista de atletismo,
  traço de monitor cardíaco) nem com o `ferro` (academia old-school) —
  mecânica diferente (mapa topográfico de trilha, não pista/batimento),
  paleta diferente, enquadramento diferente (reabilitação/clínico, não
  performance atlética).

## O wildcard: o mapa da trilha, não um funil de vendas

`TrilhaMapa.tsx` + `data/fases.ts`: as 4 fases mostradas no mapa são a
estrutura real e amplamente documentada da reabilitação musculoesquelética
(o mesmo modelo usado em protocolos clínicos pós-cirúrgicos e diretrizes de
fisioterapia ortopédica) — controle da dor e inflamação → recuperação de
amplitude de movimento → fortalecimento progressivo → retorno funcional.
Cada fase tem faixa de semana (referência geral, não prescrição — o texto
deixa isso explícito), "altitude" (dado decorativo consistente com o
vocabulário de mapa, cresce com a fase), objetivo clínico real e marcos
concretos do que acontece naquela fase. Clicar num marco do mapa ou numa
aba abaixo dele muda a fase selecionada, preenche o trecho percorrido da
trilha (`strokeDasharray` normalizado por `pathLength={1}`, fração =
`km da fase / 12`) e troca o cartão de detalhe — é literalmente o
mecanismo de progresso do tratamento, não um carrossel decorativo.

### Diferença técnica em relação ao `luthier` (Ressoa)

O `luthier` também usa linguagem de curva de nível, mas para uma razão
diferente: lá, as linhas nodais de uma figura de Chladni vêm de uma
**superposição de dois modos senoidais numa grade quadrada**
(`Z = cos(nπx)cos(mπy) − cos(mπx)cos(nπy)`), a forma real de aproximar onde
uma placa vibrante fica parada — um fenômeno de vibração, renderizado como
grade de retângulos.

Aqui, em `TrilhaMapa.tsx`, as curvas de nível são **anéis fechados ao redor
de um único pico**, com raio perturbado por harmônicos senoidais
determinísticos:

```
r(θ, anel) = raioBase(anel) + a1·sin(3θ + anel) + a2·sin(5θ + 2·anel)
```

— o jeito real como um mapa topográfico desenha elevação ao redor de um
cume: anéis concêntricos levemente irregulares, não uma grade de nós de
vibração. Os pontos polares de cada anel são convertidos num path SVG
suave via interpolação **Catmull-Rom → Bézier cúbica** (`pathSuaveFechado`
em `TrilhaMapa.tsx`), pra um traço de contorno com aparência desenhada à
mão, não uma elipse perfeita. Mecanismo geométrico diferente, vocabulário
visual (curva de nível) parecido de propósito — os dois vizinhos do
portfólio usam cartografia porque cartografia é o jeito real de mapear
tanto vibração quanto elevação, mas cada um resolve o desenho com a
matemática certa pro fenômeno que está representando.

## Movimento contínuo (contra "página morta")

O hero (`Hero.tsx`) tem curvas de nível de fundo que derivam lateralmente
em loop (`@keyframes deriva-contorno`, `animation: ... infinite`) — não um
fade estático de entrada. O marco de fase ativo no mapa pulsa
(`@keyframes pulso-marco`) pra indicar "você está aqui" sem depender de
hover. `Reveal.tsx` cobre o fade+subida em scroll das demais seções, com a
rede de segurança de fim de página já usada nos outros projetos do
repositório. Tudo dentro da guarda global `@media (prefers-reduced-motion:
reduce)` em `index.css`, que zera duração de animação/transição — nenhuma
animação depende de scroll ou de reduced-motion desligado pra que o
conteúdo apareça.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso: `demo.ts` + `DemoDialog.tsx`. Nenhum
botão abre um WhatsApp real — mostra a mensagem que seria enviada e oferece
o contato da Madolio. O formulário de avaliação (`Contato.tsx`) monta a
mensagem a partir da especialidade escolhida num `<select>` + nome
opcional, então o texto que aparece no modal de demonstração já reflete o
agendamento real que a pessoa montou.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card
(sem `og:image` — não existe imagem gerada pra este conceito, mesmo padrão
de Estufa/Fornada) e JSON-LD `MedicalClinic`. `public/robots.txt` e
`public/sitemap.xml` existem.

## Referência visual

Paleta: `--color-tinta` #1b2620 (verde-ardósia quase-preto, fundo escuro e
texto principal), `--color-papel` #f2ecdb (papel de mapa topográfico
envelhecido, fundo claro), `--color-papel-forte` #e8dfc4 (papel mais
escuro, cartões), `--color-contorno` #6b8f6a (verde de curva de nível,
acento primário), `--color-trilha` #c2703f (terracota do marco de trilha,
CTA), `--color-altitude` #2e6b6e (azul-petróleo, dado técnico/altitude),
`--color-linha` #d6c9a3 (borda sobre o papel). Nenhum desses sete hex
aparece em nenhum `index.css` dos outros ~33 projetos do repositório
(conferido via `grep -rh -- '--color-' */src/index.css` antes de fechar a
paleta).

Diferenciação explícita:
- **vs. `pulso`** (`--color-track` #171614, `--color-chalk` #f4f0e6,
  `--color-lane` #e8482f): pulso usa preto-carvão + creme + laranja-avermelhado
  vívido de pista de atletismo. A Vereda usa verde-ardósia + papel amarelado
  de mapa + terracota mais terroso — nenhum hex em comum, paleta mais fria
  e "de mapa" contra o vermelho quente de raia de pista.
- **vs. `ferro`** (`--color-preto` #0a0a0a, `--color-branco` #f5f5f3,
  `--color-lima` #c6ff3d): ferro é preto puro + branco + verde-limão
  industrial de academia. A Vereda nunca usa preto puro nem lima — tons de
  papel e verde-musgo/petróleo, registro clínico e calmo, não academia.
- **vs. `luthier`** (`--color-grafite` #12191c, `--color-fosforo` #5ffbc0,
  `--color-cobre` #b5693a): luthier é grafite de osciloscópio + verde-fósforo
  fluorescente + cobre. A Vereda não usa nenhum tom fluorescente — a
  paleta inteira vem de pigmento de mapa físico (papel, tinta, terracota),
  não de instrumentação eletrônica.

Fontes: **Newsreader** (display — serifa contemporânea com ar de rótulo de
mapa antigo) + **Schibsted Grotesk** (corpo — grotesca neutra e legível) +
**Source Code Pro** (só pra dado técnico do mapa: km, altitude, semana —
nunca decorativo). Conferido contra todo `family=` usado em `*/index.html`
do repositório: nenhuma das três aparecia em nenhum outro projeto (nem em
`pulso`: Anton + Karla; nem em `ferro`: Space Grotesk + Archivo; nem em
`luthier`: Fraunces + Albert Sans + Fira Code), e o trio como combinação
também é inédito.

## Decisões

- Owner fictícia: **Dra. Helena Bittencourt**, CREFITO-10 88214-F, clínica
  em Gramado/RS — cidade real de altitude e relevo serrano no Rio Grande
  do Sul, coerente com o vocabulário de trilha de montanha/altitude usado
  no mapa.
- 4 fases (não mais) porque é a estrutura real e amplamente documentada da
  reabilitação musculoesquelética — inventar uma quinta fase pra "parecer
  mais completo" quebraria a precisão clínica que o Vibe Discovery pediu.
  As faixas de semana são citadas como referência geral, nunca como
  prescrição, tanto na cópia da seção quanto no dado da fase.
- 5 especialidades em `Especialidades.tsx` (ortopédica, pós-operatória,
  esportiva, neurológica, RPG) — subconjunto realista do que uma clínica de
  fisioterapia de porte médio oferece, não uma lista genérica de "todos os
  tratamentos possíveis".
- A "altitude" de cada fase é um dado decorativo (cresce com a fase, no
  vocabulário de mapa) e está documentada como tal aqui — ao contrário da
  distância em km, que é o eixo real de progresso (`fracao = km da fase /
  12`, usado literalmente no preenchimento da trilha), a altitude nunca
  vira lógica de código, só rótulo.
