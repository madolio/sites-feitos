# Vazão Encanamentos (conceito)

Site-conceito da Madolio pro nicho de **encanador avulso** (reparo e
instalação hidráulica residencial e de pequeno comercial). **Negócio
fictício** — não existe (o encanador "Ailton Rezende Marques" também é
inventado). Vite + React 19 + TypeScript + Tailwind v4 + GSAP
(`Reveal.tsx`, cópia canônica de `arcada`). Página única.

## Deploy (Cloudflare Workers)

Worker `vazao`, em `https://vazao.sneakpeek.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Colisão:** encanador avulso × vazão real de ponto de uso hidráulico
  (litros por minuto, litros por descarga) — o vocabulário direto de
  quem mede se uma torneira "está puxando pouco" ou "está saindo forte
  demais", não um diagrama de engenharia.
- **Diferenciação explícita do `adriano`** (Adriano Souza Passos, tratamento
  de água + elétrica, Casa & Design): o Adriano usa notação de engenharia
  real — P&ID pro lado da água, diagrama unifilar pro lado elétrico — dentro
  de um "painel de instrumentos" com manômetro e amperímetro, porque ele é
  um técnico multi-ofício com fundamentação de projeto. A Vazão nunca usa
  P&ID, nunca usa símbolo de instrumento de painel, e não tem elétrica
  nenhuma no site — é hidráulica só, encanador avulso que atende reparo do
  dia a dia, não instalação projetada. A mecânica aqui não é "como o sistema
  é desenhado antes de existir", é "o que sai da torneira agora comparado ao
  que é normal sair".
- **Diferenciação explícita do `torque`** (oficina mecânica, também
  público blue-collar): paleta e tipografia sem sobreposição (ver abaixo),
  e o mecanismo do Torque é outro domínio inteiro (mecânica automotiva),
  então não há risco de mecânica repetida, só de "sensação" de trade site
  genérico — evitado com o vocabulário bem específico de vazão hidráulica,
  não genérico de "serviço rápido".
- **Nunca card+badge+gradiente genérico.** A Vazão usa uma tabela de
  comparação real como mecanismo, não cards decorativos com ícone.

## O wildcard: diagnóstico de vazão, não decoração

`VazaoDiagnostico.tsx` + `data/fixtures.ts`: seis pontos de uso residenciais
reais (chuveiro elétrico, torneira de banheiro, torneira de cozinha, vaso
sanitário com caixa acoplada, máquina de lavar roupa, mangueira de
jardim/quintal), cada um com uma **faixa de vazão típica** (litro por
minuto, ou litro por descarga no caso do vaso sanitário, que é volume, não
vazão contínua — a diferença de unidade é deixada explícita no componente,
pra não confundir as duas grandezas). Essas faixas são valores de
referência amplamente citados em manuais de instalação hidráulica
residencial no Brasil, tratados com o mesmo cuidado de hedge que o
`razao` usa pras suas obrigações fiscais ("geralmente até" em vez de data
fechada): aqui elas aparecem como **faixa**, nunca como número fechado, e o
texto do site deixa claro que pressão de rede e modelo da peça mudam o
valor real. Nenhum valor foi inventado, mas nenhum é apresentado como
medição exata de uma instalação específica.

Clicar num ponto de uso (`role="tablist"`) troca a faixa mostrada numa
barra visual escalada (a barra vai de 0 a 20 L/min, o teto sendo a faixa
mais alta do conjunto, a mangueira de jardim) e mostra três leituras
possíveis: **bem abaixo da faixa** (indício de entupimento parcial,
arejador sujo ou registro fechado demais), **dentro da faixa** (normal) e
**bem acima da faixa**, com o aviso de que isso combinado com conta de
água alta sem explicação (mais gente em casa, piscina enchendo) é indício
de vazamento antes da torneira, na tubulação — essa é a lógica real e
comumente ensinada de "sua conta subiu, pode ser vazamento": comparar
consumo/vazão observado a um padrão esperado, não uma fórmula inventada.

O mecanismo é uma ferramenta de comparação real, preenchida pelo
visitante ao escolher o ponto de uso, não um carrossel decorativo com
vocabulário de encanador por cima.

## Serviços (`Servicos.tsx` / `data/servicos.ts`)

Quatro frentes, exatamente as pedidas: desentupimento, conserto de
vazamento, instalação de metais e louças, revisão de caixa d'água. Sem
tabela de preço (não existe fato de preço pra um negócio fictício) e sem
estatística de fachada.

**Header quebrando em 2 linhas no mobile (set/2026):** a auditoria apontou `torque · trinco · vazao` com o mesmo defeito — "Vazão Encanamentos" colado no botão "Emergência agora" numa única linha flex sem quebra controlada, forçando o nome pra 2 linhas. `Header.tsx`: "Encanamentos" (`<span className="hidden sm:inline">`) só aparece a partir de `sm`; mobile mostra só "Vazão" + o botão, numa linha. Mesma correção aplicada no `torque` (ver seu `CLAUDE.md`).

**Reescrito set/2026:** a auditoria visual apontou que este componente era
idêntico ao `Servicos.tsx` do `trinco` — mesmo título + banner de foto de
banco de imagem + grade 2x2 de cards, só mudava a paleta. Virou um esquema
de cano vertical: uma barra grossa (`bg-fluxo/20`) atravessando os quatro
serviços, cada um com um anel-válvula (`border-fluxo`) e um glifo simples
(entupimento, gota de vazamento, torneira, caixa d'água) — o mesmo registro
técnico/esquemático do `VazaoDiagnostico.tsx`, sem repetir a solução do
Trinco (que virou um molho de chaves — fio + anéis coloridos por categoria,
sem válvula nem cano). Sem foto de banco de imagem nos dois.

## FAQ e prova social (`Faq.tsx` / `Depoimentos.tsx`)

Seguindo o padrão consolidado desde Torque/Esmalte/Razão/Trama/Escuta:

- `Faq.tsx`: acordeão acessível (`<button aria-expanded aria-controls>` +
  `<div role="region">`, operável por teclado por ser `<button>` nativo).
  Cinco perguntas reais de quem está decidindo chamar um encanador:
  atendimento de emergência, orçamento antes do serviço, se atendem
  apartamento/condomínio (com a ressalva real de que problema de coluna ou
  ramal compartilhado pode não ser da unidade), tempo típico de um
  desentupimento, e o que fazer com o registro geral enquanto o encanador
  não chega numa emergência de vazamento — essa última pergunta é
  literalmente o pedido do briefing, porque é a orientação real e correta
  (fechar o registro geral) que qualquer encanador dá por telefone antes de
  sair.
- `Depoimentos.tsx`: três depoimentos curtos e específicos (Renata M.,
  registro geral estourado à noite; Diego F., pia entupida por gordura
  além do sifão; Camila S., troca de vaso sanitário em apartamento), cada
  um com um caso concreto, incluindo o cenário de vazamento urgente
  resolvido pedido no briefing. Aviso explícito de que são fictícios.
- Testado interativamente com Playwright depois do build: clique no botão
  do FAQ altera `aria-expanded` pra `true` e o painel correspondente fica
  visível.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso/Vereda/Escuta/Razão: `demo.ts` +
`DemoDialog.tsx`. Nenhum botão abre um WhatsApp real, mostra a mensagem que
seria enviada e oferece o contato da Madolio. O Hero já tem um botão de
"Tenho um vazamento agora" com mensagem pré-escrita de urgência, além do
formulário completo em `Contato.tsx` — CTA duplo, com a urgência em
primeiro plano porque busca de encanador costuma ser um momento de
emergência.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card
(sem `og:image`, mesmo padrão dos irmãos fictícios) e JSON-LD `Plumber`
(tipo real e específico do schema.org para encanador, mais preciso que o
`LocalBusiness` genérico ou o `HomeAndConstructionBusiness`).
`public/robots.txt` e `public/sitemap.xml` existem.

## Acessibilidade

Um único `<h1>` real (no Hero, verificado com `verify-page.cjs`: 1 em
desktop e mobile). O seletor de ponto de uso em `VazaoDiagnostico.tsx` usa
`role="tablist"`/`role="tab"`/`aria-selected`. O FAQ usa `button` real com
`aria-expanded`/`aria-controls`/`role="region"`. Foco visível
(`:focus-visible`) em todo elemento interativo. SVGs decorativos (correnteza
do hero) têm `aria-hidden`. Barra de vazão no diagnóstico é `aria-hidden`
porque a informação real (faixa em número) já está no texto ao lado.
`prefers-reduced-motion: reduce` zera duração de animação/transição no fim
de `index.css`.

## Paleta e não-colisão

`--color-tinta` #10202b (azul-ardósia quase-preto, fundo escuro e texto
principal), `--color-papel` #f3f6f5 (branco-cano, fundo claro),
`--color-papel-forte` #e4ebe9 (cartões), `--color-linha` #ccd9d6 (borda),
`--color-fluxo` #1d6fa5 (azul de água corrente, acento primário) +
`--color-fluxo-hover` #155078, `--color-emergencia` #c23f1c
(terracota-vermelho, CTA de urgência/WhatsApp) + `--color-emergencia-hover`
#9c3216, `--color-atencao` #d9a02c (âmbar, faixa "bem abaixo" no
diagnóstico) e `--color-vazamento` #a3273a (vinho, faixa "bem acima"/indício
de vazamento).

Conferido com `grep -rh -- '--color-' */src/index.css` (raiz do
repositório, contra os ~41 projetos irmãos) antes de fechar a paleta:
nenhum dos 8 hexadecimais exatos aparece em nenhum outro projeto — grep de
confirmação rodado sobre cada hex individualmente, zero ocorrências.

Diferenciação explícita dos dois vizinhos de trade blue-collar:

- **vs. `adriano`** (`--color-agua` #0a6b87, `--color-agua-luz` #4cb6d6,
  `--color-eletrica` #95590c, `--color-grafite` #0f2430): o Adriano também
  usa azul pra água, mas nenhum hex exato coincide, e o Adriano tem uma
  segunda paleta inteira pra elétrica que a Vazão nunca precisa (não faz
  elétrica). O `--color-tinta` da Vazão (#10202b) é visualmente próximo do
  `--color-grafite` do Adriano (#0f2430) como categoria ("azul quase-preto
  de fundo escuro"), mas os hexadecimais são diferentes, e a mecânica visual
  é oposta: o Adriano desenha esquema técnico (P&ID/unifilar) que se
  constrói na tela com GSAP DrawSVG, a Vazão mostra uma barra de faixa de
  valor comparativo, sem desenho técnico nenhum.
- **vs. `torque`** (`--color-chumbo` #17181a, `--color-oficina` #ece7dc,
  `--color-sinal` #e8551f): paleta de oficina é cinza-concreto + laranja de
  cone de sinalização. A Vazão nunca usa cinza-concreto como base (usa
  azul-ardósia) nem laranja puro de sinalização (usa terracota-vermelho
  mais escuro pro CTA de emergência). Nenhum hex em comum.

## Tipografia e não-colisão

**Kanit** (display, sans condensado/bold com peso de rótulo de oficina,
sem ares de revista) + **Sen** (corpo, sans neutro arredondado, legível) +
**Noto Sans Mono** (`--font-dado`, só pra dado real de vazão: valor em
L/min, faixa, unidade — nunca decorativo). Conferido com
`grep -rhoE "family=[^&\"]+" */index.html` (raiz do repositório) contra
todos os ~41 irmãos: nenhuma das três fontes aparece em nenhum outro
projeto, então o trio como combinação também é inédito.

## Decisões

- Owner fictício: **Ailton Rezende Marques**, encanador avulso, 17 anos de
  ofício, atende Caxias do Sul, RS — cidade real de porte médio no interior
  gaúcho, escolhida depois de conferir que nenhum projeto irmão já
  commitado usava Caxias do Sul (Sorocaba/Juiz de Fora/Uberlândia/Gramado
  já estavam em uso por outros irmãos, Londrina já tinha sido escolhida
  pelo `trinco`, construído em paralelo na mesma leva).
- Nenhum preço aparece no site: não existe fato de tabela de valor pra um
  negócio fictício, e inventar um número de serviço hidráulico seria
  informação de preço incorreta, não só decorativa.
- As faixas de vazão em `data/fixtures.ts` são citadas como referência,
  nunca como medição de uma instalação real: o texto do
  `VazaoDiagnostico.tsx` explicita que pressão de rede e modelo da peça
  mudam o valor, mesmo cuidado de hedge que o `razao` usa pra prazo fiscal.
- `Faq.tsx` e `VazaoDiagnostico.tsx` testados com Playwright depois do
  `npm run build`, usando `madolio/scripts/verify-page.cjs` (build isolado
  em `.tmp-dist-vazao`, apagado depois) mais um script avulso confirmando
  interação de teclado/clique no acordeão (`aria-expanded` muda pra
  `true`, painel some/aparece).
- Passe de humanização com o skill `humanizer` sobre `Hero.tsx`,
  `VazaoDiagnostico.tsx`, `data/faq.ts` e `data/depoimentos.ts` antes de
  fechar: nenhum travessão usado como conector genérico sobrou fora do
  padrão de título curto.
