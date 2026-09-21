# Razão Contábil (conceito)

Site-conceito da Madolio pro nicho de **contabilidade** (MEI, pequenas
empresas do Simples Nacional e profissionais liberais). **Escritório
fictício** — não existe (o contador "Marcos Vieira Andrade" também é
inventado). Vite + React 19 + TypeScript + Tailwind v4 + GSAP
(`Reveal.tsx`, cópia canônica de `arcada`). Página única.

## Deploy (Cloudflare Workers)

Worker `razao`, em `https://razao.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Lugar/objeto:** o calendário fiscal de parede de um escritório de
  contabilidade — o mesmo calendário anual, com vencimento marcado a caneta,
  que qualquer contador tem sobre a mesa.
- **Colisão:** contabilidade × calendário de prazos reais por regime
  tributário (MEI, Simples Nacional, profissional liberal/autônomo).
- **Nunca parecer:** o `ancora` (consultoria financeira/gestão de
  patrimônio, mecânica de extrato bancário carimbado, linguagem de
  lançamento e saldo) nem o `chave` (imobiliária, classificados de jornal em
  colunas). A Razão nunca mostra dinheiro fluindo ou somando (isso é o
  extrato do Âncora) nem usa `column-count` de jornal (isso é o Chave) — o
  wildcard aqui é puramente temporal: quando cada obrigação vence, não
  quanto ela vale. Público também é diferente: dono de pequeno negócio e
  autônomo que precisa não perder prazo, não investidor de patrimônio nem
  comprador de imóvel.

## O wildcard: calendário fiscal real, não funil de vendas

`CalendarioFiscal.tsx` + `data/regimes.ts` + `lib/prazos.ts`: três regimes
(MEI, Simples Nacional, profissional liberal), cada um com suas obrigações
recorrentes reais:

- **MEI:** DAS-MEI (mensal, todo dia 20 ou próximo dia útil) e DASN-SIMEI
  (declaração anual, até 31 de maio).
- **Simples Nacional (ME/EPP):** DAS unificado (mensal, até dia 20 do mês
  seguinte) e DEFIS (declaração anual, até 31 de março).
- **Profissional liberal (pessoa física autônoma):** Carnê-Leão (mensal,
  até o último dia útil do mês seguinte ao recebimento) e Declaração de
  Ajuste Anual do IRPF (geralmente até 31 de maio).

Essas são as obrigações e cadências reais e amplamente documentadas de cada
regime — nenhum valor de alíquota foi inventado (o site não afirma
percentual algum, só estrutura e prazo, porque alíquota exata varia por
faixa e atividade e não dava pra verificar com confiança). O texto de cada
regra de vencimento usa linguagem de referência geral ("geralmente até",
"ou o próximo dia útil") em vez de data fechada, porque o calendário oficial
muda o dia exato conforme cai em fim de semana ou feriado — mesmo cuidado
de hedge que o Vereda (`trilha`) usa pras faixas de semana da reabilitação.

Clicar numa aba de regime (`role="tablist"`) troca quais dos 12 meses
acendem no calendário (obrigação mensal acende os 12; obrigação anual
acende só o mês dela) e recalcula, com `lib/prazos.ts`, qual é o próximo
vencimento real a partir da data de hoje (`new Date()`, não uma data fixa
gravada no código) e quantos dias faltam — a mesma conta que um contador
faria de cabeça olhando pro calendário físico da parede. O Hero já mostra
uma versão compacta desse cálculo pro regime MEI, pro mecanismo aparecer no
primeiro scroll (mesmo padrão do `derme`, que embute uma prévia do wildcard
no hero em vez de só no meio da página).

`lib/prazos.ts` isola a lógica de data (`proximaOcorrencia`,
`proximoPrazoDoRegime`) do componente visual, pra ser reaproveitada tanto no
`Hero.tsx` quanto no `CalendarioFiscal.tsx` sem duplicar a regra de cálculo.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso/Vereda/Cútis: `demo.ts` +
`DemoDialog.tsx`. Nenhum botão abre um WhatsApp real — mostra a mensagem
que seria enviada e oferece o contato da Madolio. `Contato.tsx` monta a
mensagem a partir do nome (opcional) e do regime escolhido num `<select>`.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card
(sem `og:image` — não existe imagem gerada pra este conceito fictício,
mesmo padrão de Trilha/Cútis) e JSON-LD `AccountingService`.
`public/robots.txt` e `public/sitemap.xml` existem.

## Acessibilidade

Um único `<h1>` real (no Hero). As abas de regime em `CalendarioFiscal.tsx`
usam `role="tablist"`/`role="tab"`/`aria-selected`. Os pontos decorativos de
mês ativo têm `aria-hidden="true"` (a informação real já está no texto e na
cor de fundo da célula, não só no ponto). Foco visível (`:focus-visible`)
em todo elemento interativo. Todo o movimento de `Reveal` respeita
`prefers-reduced-motion: reduce`, com a regra global no fim de `index.css`
que zera duração de animação/transição.

## Paleta e não-colisão

`--color-tinta` #241d17 (quase-preto de tinta de carimbo, fundo escuro e
texto principal), `--color-papel` #f4ecd8 (papel de talão/formulário, fundo
claro), `--color-papel-forte` #e9ddc0 (papel mais escuro, cartões),
`--color-linha` #d3c19a (borda sobre o papel), `--color-selo` #24466b (azul
de carimbo de protocolo, acento primário/CTA) + `--color-selo-hover`
#1b3552, `--color-prazo` #b9812a (âmbar, "próximo vencimento" no
calendário), `--color-vencido` #96392b (terracota-vinho, reservado pra
prazo já vencido).

Conferido com `grep -rh -- '--color-' */src/index.css` (rodado da raiz do
repositório, contra os ~36 projetos irmãos) antes de fechar a paleta:
nenhum desses 8 hexadecimais exatos aparece em nenhum outro projeto.
Diferenciação explícita dos dois vizinhos de categoria mais próximos:

- **vs. `ancora`** (`--color-indigo` #241b3a, papel #f3ede0, latão #ab8a53):
  Âncora é roxo-índigo profundo + papel + latão, mecânica de extrato
  bancário. A Razão usa quase-preto de tinta + papel mais amarelado + azul
  de carimbo — nenhum hex em comum, e a paleta aqui nunca soma dinheiro,
  só marca data.
- **vs. `chave`** (`--color-ink` #1a1a1a, `--color-paper` #efece4,
  `--color-steel` #3b5b70): Chave é preto-jornal + papel + azul-aço,
  mecânica de classificado em coluna. A Razão não usa preto puro nem
  `column-count` — o layout é grade de calendário, registro de escritório
  de contabilidade, não jornal impresso.

## Tipografia e não-colisão

**Bitter** (display serifado, ar de formulário/talão impresso) + **Rubik**
(corpo, sans neutro e legível) + **Fragment Mono** (`--font-dado`, só pra
dado fiscal real: sigla, dia, prazo, contagem de dias — nunca decorativo).
Conferido com `grep -rhoE "family=[^&\"]+" */index.html` (raiz do
repositório) contra todos os ~36 irmãos: nenhuma das três fontes aparece em
nenhum outro projeto, então o trio como combinação também é inédito
(Âncora usa Spectral + Roboto Mono; Chave usa PT Serif + Roboto Condensed).
Trocado de **DM Mono** pra **Fragment Mono** depois do build: o `torque`
(oficina mecânica), construído em paralelo na mesma leva, também escolheu
Rubik + DM Mono sem que os dois agentes pudessem ver um ao outro em tempo
real — o grep só pega irmãos já commitados. Corrigido nesta revisão final
antes do commit único dos 4 projetos novos.

## Decisões

- Owner fictício: **Marcos Vieira Andrade**, contador, CRC-SP
  1SP298471/O-4, escritório em Sorocaba, SP — cidade real de porte médio no
  interior paulista, coerente com o público-alvo de pequeno negócio e MEI
  (Sorocaba tem base industrial e comercial relevante, não é capital, não
  repete cidade de nenhum projeto irmão já lido nesta sessão).
- 3 regimes (não mais) porque são os três públicos reais e mais comuns de
  um escritório de contabilidade de porte pequeno/médio no Brasil — Lucro
  Real e Lucro Presumido ficaram de fora por serem tipicamente de empresas
  maiores, fora do público que a Razão descreve atender.
- Nenhuma alíquota percentual aparece no site: o mecanismo mostra estrutura
  e prazo (o que é verificável com confiança), não valor de guia (que
  varia por faixa de faturamento e atividade, e uma cifra errada seria
  informação fiscal incorreta, não só decorativa).
- `lib/prazos.ts` calcula a próxima ocorrência de cada obrigação com a data
  real do navegador (`new Date()`), não uma data fixa: o contador de "faltam
  N dias" no Hero e no calendário muda de verdade dependendo de quando a
  página é aberta, então o wildcard continua correto meses depois do
  deploy, sem precisar de atualização manual de conteúdo.
- Passe de humanização: título, meta description, OG e a prosa de
  `Hero.tsx`, `Servicos.tsx`, `Contato.tsx`, `Footer.tsx` e
  `data/regimes.ts` foram revisados com o skill `humanizer` — travessões
  usados como conector genérico entre duas ideias foram trocados por
  vírgula, ponto ou dois-pontos conforme a relação real entre as frases
  (mantido só no padrão "Nome — subtítulo" de título/H1 curto, que é a
  mesma convenção usada em todos os projetos irmãos lidos) e um contraste
  do tipo "não X, mas Y" no H1 original ("no calendário, não escondidos
  numa planilha") foi removido por só adicionar peso retórico sem
  informação nova.
