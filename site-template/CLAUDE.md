# Bastos Advocacia (conceito — nicho jurídico)

Vite + React + TypeScript + Tailwind v4, hospedado no Cloudflare Workers (`https://site-template.fenoninho-max.workers.dev`). Continua sendo o Worker/pasta chamado `site-template`, mas o conteúdo foi completamente reformulado — ver histórico abaixo.

## O que este projeto é hoje

Um conceito fictício de página única pra um escritório de advocacia (empresarial e civil): "Bastos Advocacia", Dra. Camila Bastos, OAB/SP 312.884 — nomes e dados fictícios, exemplo de estilo pro nicho jurídico, igual aos outros conceitos do madolio (Doce Ateliê, Estúdio Alma, Sabor da Vila), só que como página completa em vez de só um card na vitrine.

## Vibe: "Terminal Wagon-Lit"

**Histórico da direção de design (set/2026):** a primeira versão (paleta carvão-esverdeado + bordô + assinatura cursiva) foi rejeitada pelo usuário como "ainda genérico, aparenta muito a home" — o problema não era a cor, era o processo: eu tinha inventado tudo sozinho e convergido pro clichê óbvio de "advocacia = navy/bordô/serifada". O usuário então apontou o processo de **Vibe Discovery** de https://github.com/2389-research/landing-page-design (skill externa, não instalada neste ambiente — só a lógica foi seguida manualmente) e eu rodei as 4 perguntas de descoberta com ele antes de redesenhar:

- **Q1 (lugar/objeto real):** vagão-leito europeu de luxo (Orient Express) — madeira escura, latão, veludo.
- **Q2 (emoção em 3s):** autoridade serena.
- **Q3 (colisão de duas influências inesperadas):** escritório jurídico + sinalização de aeroporto/trem (wayfinding).
- **Q4 (nunca pode parecer):** escritório de advocacia genérico (aperto de mão, balança da justiça, coluna grega).

A colisão do Q3 é o que dá identidade própria: as áreas de atuação são numeradas como **portões de embarque** ("Nº 01" + seta de sinalização — `GateArrow.tsx`), e o motion assinatura é um **painel de embarque mecânico** (`SplitFlap.tsx` — dígitos "rodam" antes de travar no valor final, como um painel de horários de trem/aeroporto), não uma assinatura cursiva genérica.

- **Paleta ("Terminal Wagon-Lit"):** `#241A14` nogueira escura do vagão (ink), `#F3EDE1` linho/creme (paper), `#1F3A32` veludo verde-vagão (surface-alt, usado invertido na seção de Áreas de atuação), `#B08D57` latão (accent), `#9B3B2E` vermelho de sinalização de plataforma (signal — uso pontual, ex: números das áreas de atuação). Nenhum hex reciclado dos outros dois projetos-irmãos.
- **Tipografia:** Prata (títulos — cartaz de viagem vintage) + Overpass (corpo/rótulos — nascida de sinalização de estrada/highway signage). Terceira combinação distinta da dupla madolio (IBM Plex Serif/Sans) e nbj-systems (Archivo).
- **Wildcard:** a seção de contato (`Footer.tsx`) é formatada como um talão de bilhete de trem perfurado — linha pontilhada, furos circulares nas pontas, "Protocolo Nº SP-2026-00184" no lugar de um número de bilhete. Detalhe que não "combina" com um site jurídico, mas fecha a colisão.
- **Botões:** retos, sem arredondamento — terceiro formato distinto (madolio é pill, nbj-systems é `rounded-sm`).
- Numeração só aparece onde o conteúdo é genuinamente sequencial: os "portões" das áreas de atuação (identidade visual, não sequência real) e os passos de `Process.tsx` (esses sim, sequência real de atendimento).

**Se for pedir uma nova reformulação de vibe no futuro, repetir esse processo** (perguntar Q1-Q4 ao usuário, não inventar sozinho) em vez de ir direto pro clichê mais óbvio do nicho.

## Vibe: "Sessão ao Vivo" (set/2026 — 2ª reformulação de vibe)

**Motivo:** o usuário achou o "Terminal Wagon-Lit" (vagão-leito) polido mas **"muito morta, sem vida"** — estático, sem pulso, nada parecia ao vivo, apesar de tecnicamente bem executado. Não era um problema de paleta, era de linguagem inteira: nada na página realmente "acontecia" continuamente. Rodei as 4 perguntas de Vibe Discovery de novo (processo documentado acima, repetido como prometido em vez de inventar sozinho):

- **Q1 (lugar/objeto real):** sala de audiência em sessão — argumentação acontecendo agora, ao vivo.
- **Q2 (emoção em 3s):** precisão afiada (não mais a autoridade serena da versão anterior).
- **Q3 (colisão):** escritório jurídico + painel de controle de missão espacial — telemetria, indicadores GO/NO-GO, linguagem de contagem regressiva, checklist de sistemas.
- **Q4 (nunca pode parecer):** site institucional corporativo genérico (hero gradiente, cards de serviço, "por que nos escolher") — e nunca mais o Wagon-Lit anterior, que agora lê como "morto".

A colisão do Q3 é o que resolve o Q2/reclamação: a página passou a ter **relógios e contadores de verdade rodando o tempo inteiro** (não só motion de entrada uma vez), porque uma sala de audiência em sessão e uma sala de controle de missão têm isso em comum — algo está sempre em andamento, marcado no segundo.

- **Paleta ("Sessão ao Vivo"):** `#15110d` quase-preto com fundo quente (ink, madeira de bancada de tribunal, não o azul-frio do painel da Torre `#0b1417`), `#1d1712` painel um tom acima (panel), `#f4f0e8` pergaminho claro (paper), `#d9d0bd` (line), `#2f6f93` azul-aço de precisão (precision — cor de instrumento cirúrgico, distinta do âmbar `#f2a93a` e do ciano `#35d6c9` da Torre), `#3f9463` verde de status GO (go), `#cf4b39` vermelho de alerta/"ao vivo" (hold — usado no indicador pulsante). Nenhum hex reciclado da versão anterior deste projeto nem dos projetos-irmãos (Torre, Traço, Âncora).
- **Tipografia:** Oswald (títulos, condensada/maiúscula — cartaz de edital de tribunal e ao mesmo tempo placar técnico) + Inter (corpo) + **IBM Plex Mono** reservada só pra dado real: número de processo, cronômetro, coordenadas, código de sistema (`SYS-01` etc.) — nunca decorativa em rótulo comum, seguindo a diretriz do próprio projeto contra monoespaçada-decorativa como AI tell. Terceira combinação distinta de Torre (Space Grotesk/JetBrains Mono), Âncora (Sora/Roboto Mono) e Traço (Syne/Work Sans).
- **Wildcard:** não é mais um objeto estático (talão de bilhete) — são **dois componentes que contam sozinhos o tempo inteiro**: `SessionTimer.tsx` (cronômetro HH:MM:SS subindo desde que a página carregou, no cabeçalho do `Docket.tsx`, ao lado do nº de processo fictício) e `LiveClock.tsx` (relógio de verdade, tique a cada segundo, no console de contato). Isso é o que resolve diretamente a reclamação de "sem vida" — motion de scroll-reveal (`Reveal.tsx`) já existia antes, mas nada rodava em loop indefinido sem interação do usuário.
- **Arquitetura de componentes** (retimados, não só repintados):
  - `TopBar.tsx` → `StatusBar.tsx`: ganhou o indicador "EM SESSÃO" com ponto pulsante (`.pulse-live`, keyframe de opacidade+escala real, não um pill estático).
  - `Board.tsx` → `Docket.tsx`: o "quadro de partidas" virou um painel rastreando uma sessão ao vivo — cabeçalho com nº de processo + `SessionTimer`, e as áreas de atuação viraram um **checklist de sistemas GO/NO-GO** (`StatusLight.tsx` no lugar do `GateArrow.tsx` — LED circular em vez de seta de embarque; rótulo "GO" em verde por linha).
  - `SplitFlap.tsx` → `Readout.tsx`: mesma mecânica de dígito girando até travar (ainda serve, reconceituada como leitura de telemetria em vez de painel de trem).
  - `Route.tsx` → `Sequence.tsx`: o trajeto de trem virou contagem regressiva de lançamento (T-03 → T-00), continua numerado porque o atendimento é de fato sequencial (a mesma regra de antes se mantém).
  - `Footer.tsx` → `Console.tsx`: o talão de bilhete perfurado virou um console de contato — coordenadas fictícias, nº de processo, `LiveClock` correndo, citação da advogada como entrada de "Log" em vez de citação solta.
  - `Signature.tsx` (assinatura cursiva animada) foi **removida** — não fazia sentido na linguagem de precisão/telemetria; o lugar dela junto ao CTA principal foi ocupado pelo indicador "Canal aberto" + `LiveClock`.
  - `src/data/areas.ts`: campo `number` virou `code` (`SYS-01`, `SYS-02`...) — identificador técnico real de cada linha do checklist, não decoração.
  - `src/config/site.ts`: adicionados `CASE_REF` (nº de processo fictício, reaproveitado no rastreador e no console) e `COORDINATES` (coordenadas fictícias do escritório).
- Botões continuam retos, sem arredondamento (mantido — ainda é a assinatura de formato deste projeto frente aos irmãos).

## Vibe: "Biblioteca Jurídica" (set/2026 — 3ª reformulação de vibe)

**Motivo:** o usuário pediu uma nova reformulação de vibe e desta vez trouxe as respostas de Vibe Discovery já prontas no próprio pedido, rodadas fora desta sessão (processo descrito acima seguido de novo — perguntar Q1-Q4 antes de desenhar, não inventar sozinho):

- **Q1 (lugar/objeto real):** a sala de reunião de um escritório antigo — madeira escura, luz quente de abajur, uma mesa grande. Tradição e confiança, não espetáculo.
- **Q2 (emoção em 3s):** segurança sólida — chão firme, nada vai dar errado.
- **Q3 (colisão):** escritório jurídico + arquivo de biblioteca/catálogo — cada área de atuação é uma seção catalogada e localizável, como o sistema de números de chamada de uma biblioteca de verdade.
- **Q4 (nunca pode parecer):** escritório de advocacia genérico (balança da justiça, aperto de mão, navy/bordô serifado, coluna grega); e nunca mais a "Sessão ao Vivo" anterior — painel de telemetria/missão espacial, rejeitada explicitamente como direção a não repetir.

A colisão do Q3 resolve o Q2 de um jeito diferente da versão anterior: em vez de "algo sempre em contagem, ao vivo" (que resolvia a reclamação de "morta" da 1ª vibe, mas gerava uma tensão nervosa incompatível com "segurança sólida"), aqui o motion vem de **ações medidas do usuário sobre um sistema já organizado** — puxar uma ficha de uma gaveta, não acompanhar um cronômetro correndo sozinho.

- **Paleta ("Biblioteca Jurídica"):** `#1c130d` ink (madeira escura quase-preta, tom de escrivaninha antiga — mais rasa e menos vermelha que o `#241a14` da Wagon-Lit e o `#15110d` da Sessão ao Vivo), `#2a1f16` panel (um tom de madeira de armário acima, usado no rodapé), `#ede2c8` paper (papel envelhecido, mais amarelado que o `#f3ede1`/`#f4f0e8` das duas vibes anteriores), `#cbb894` line (só uso decorativo/borda — 1.51:1 contra paper, não serve pra texto), `#a8672a` accent (dourado de luz de abajur, ~3.5:1 sobre paper/ink — usado só em elementos grandes, decoração e bordas, nunca texto pequeno), `#cf9550` accent-light (variante clara do mesmo tom, 7:1 sobre ink — a única cor de accent que entra como texto pequeno sobre fundo escuro), `#8a3a28` stamp (vermelho de lacre/selo, 6:1 sobre paper, usado no selo do hero e em rótulos sobre papel claro). Nenhum hex reciclado da Wagon-Lit, da Sessão ao Vivo, nem de nenhum projeto-irmão (checado com `grep -rh -- '--color-' */src/index.css` na raiz do monorepo).
- **Tipografia:** Spectral (títulos — serifada de biblioteca/editorial, não a dupla navy/bordô clichê do nicho jurídico) + Karla (corpo, sem serifa, neutra) + Courier Prime (só pra número de chamada CDU, código de estante e numeração de etapa — datilografia de fichário antigo, nunca decorativa em rótulo comum, mesma diretriz das duas vibes anteriores contra monoespaçada decorativa como AI tell). Combinação inédita no repo (checado com `grep -rhoE "family=[A-Za-z0-9+:,@]+" */index.html`); nenhuma das três fontes formava essa tripla em nenhum projeto-irmão.
- **O wildcard — catálogo navegável:** `src/data/catalog.ts` lista as 4 áreas de atuação como fichas catalográficas reais, cada uma com `callNumber` (número CDU de verdade — a Classificação Decimal Universal usada em bibliotecas brasileiras: 347.44 é Direito das obrigações/contratos, 347.7 é Direito comercial/societário, 346 é Direito econômico, 347.9 é Processo civil), `shelf` (estante/gaveta), `scope`, `timeline` (etapas reais do atendimento daquela área) e `documents` (o que o cliente precisa levar). `Catalog.tsx` renderiza isso como um índice clicável (`<nav>` com botões `aria-pressed`) ao lado de um painel de detalhe que troca de conteúdo a cada clique, com transição GSAP de entrada (fade + leve deslocamento horizontal, "puxar a ficha da gaveta") — genuinamente interativo e orientado a dado estruturado, não cards decorativos com texto fixo.
- **Motion "medido, não frenético":** `Stamp.tsx` anima um selo assentando uma vez no carregamento do hero (`back.out`, sem repetição), com um glow por trás em `.lamp-glow` — respiração lenta de opacidade/escala (4.5s, bem mais devagar que o `.pulse-live` de 1.8s da Sessão ao Vivo), a única animação contínua da página, discreta o bastante pra não competir com "segurança sólida". A transição do `Catalog.tsx` ao trocar de ficha é o motion principal, e só acontece por ação do usuário — não existe mais nenhum componente contando sozinho o tempo todo.
- **O que foi removido da "Sessão ao Vivo" e por quê:** `StatusBar.tsx`, `Docket.tsx`, `Sequence.tsx`, `Console.tsx`, `Readout.tsx`, `StatusLight.tsx`, `LiveClock.tsx` e `SessionTimer.tsx` foram deletados por inteiro (não deixados como código morto). Motivo: a linguagem de "sala de audiência × painel de controle de missão" (relógios correndo, LEDs GO/NO-GO, contagem regressiva de lançamento, número de processo fictício como identificador de sessão) contradiz "segurança sólida, chão firme" — aquela vibe passava confiança pela urgência de algo acontecendo agora; esta passa confiança pela organização de algo que já está no lugar certo. `CASE_REF` e `COORDINATES` saíram de `src/config/site.ts` pelo mesmo motivo (eram ganchos específicos da metáfora de sessão/telemetria); entrou `FOUNDING_YEAR` no lugar, dado real reaproveitado na citação do rodapé.
  - `StatusBar.tsx` → `Header.tsx`: mesma barra fixa (nome, telefone, CTA), sem o indicador "Em sessão" pulsando.
  - `Docket.tsx` dividido em `Hero.tsx` (manchete + selo + estatísticas) e `Catalog.tsx` (o wildcard do catálogo, no lugar do checklist GO/NO-GO).
  - `Sequence.tsx` (contagem regressiva T-03→T-00) foi incorporado dentro de cada ficha do catálogo como `timeline` — a numeração de etapas continua legítima (atendimento é sequencial de verdade), mas agora é dado por área, não uma seção genérica única.
  - `Console.tsx` → `Ledger.tsx`: mesmo layout de painel de contato com citação da advogada, sem `LiveClock` — vira uma "ficha de requisição" (metáfora de biblioteca: o papel que se preenche pra retirar um volume do acervo), sem relógio correndo.
  - `Readout.tsx` (dígito girando) e `StatusLight.tsx` (LED GO/NO-GO) não tinham função na linguagem de catálogo — removidos sem substituto direto; o dado que antes girava no readout (casos ativos) não existe mais como conceito, porque a ficha de catálogo já é o formato de exibição.
  - `src/data/areas.ts` → `src/data/catalog.ts`: o campo único `code` (`SYS-01` etc.) virou `callNumber` (CDU real) + `shelf`, e a `description` única virou `scope` + `timeline` + `documents` — dado estruturado bem mais rico, necessário pra a ficha de detalhe funcionar.
- Botões continuam retos, sem arredondamento — mantido como assinatura de formato do projeto desde a 1ª vibe.

**Validação desta rodada:** `npx tsc -b --noEmit` e `npx oxlint` limpos; `npx vite build --outDir .tmp-dist-review` sem erros; testado com Playwright (`madolio/scripts/shot.cjs` + um script de verificação ad-hoc) em 1280px e 390px — 0 erros de console/página, sem overflow horizontal, exatamente um `<h1>`, screenshot do hero e do catálogo (inclusive clicando numa ficha diferente pra confirmar a troca de conteúdo) conferido visualmente.

## Reestruturação de set/2026 — arquitetura, não decoração

Depois de ver Torre/Traço/Âncora, o usuário notou que todos os sites (inclusive este) seguiam a mesma **fórmula estrutural** por baixo de vibes diferentes: nav horizontal com menu de âncoras, hero em duas colunas, lista de cards numa seção separada, rodapé "vamos conversar" genérico. A vibe "Terminal Wagon-Lit" continua a mesma (aprovada) — o que mudou foi a arquitetura da página:

- **`Nav.tsx` → `TopBar.tsx`.** Sem menu de âncoras (`#atuacao`, `#atendimento`, `#contato`) — a página não é mais uma coleção de seções saltáveis, é uma jornada única de cima a baixo. Só nome do escritório, telefone e o CTA "Agendar consulta", sempre visíveis. Sem hambúrguer mobile (não há menu pra abrir).
- **`Hero.tsx` + `PracticeAreas.tsx` → `Board.tsx` (um componente só).** Antes eram duas seções: hero com headline+CTA+3 estatísticas, depois um bloco escuro separado com a lista de áreas de atuação. Agora é **um quadro de partidas de verdade**: a manchete abre a página, e o corpo é o painel escuro único — estatísticas como cabeçalho do quadro, cada área de atuação como uma "partida" (número, nome, descrição, **casos ativos** rodando no `SplitFlap`, seta de embarque). O CTA só aparece **depois** do quadro, não junto da manchete — mostra o que o escritório faz antes de pedir contato. `data/areas.ts` (novo) centraliza as áreas com o campo `casos` (número que anima no SplitFlap).
- **`Process.tsx` → `Route.tsx`.** A numeração do atendimento é genuinamente sequencial (isso legitima numerar), mas virou um **trajeto de trem** — linha horizontal com paradas (rebites) no desktop, linha vertical no celular — em vez de uma lista vertical de cards numerados (a fórmula "como funciona" mais comum por aí).
- **`About.tsx` (citação solta, centralizada) foi removida como seção própria** e incorporada ao talão do `Footer.tsx`, ao lado dos dados de contato — o bilhete de trem (já era o wildcard da página) agora carrega a citação da advogada, não só endereço/e-mail/protocolo. Reduz de 4 seções (Hero, PracticeAreas, About, Process) pra 3 (Board, Route, Footer).
- `Signature.tsx` (componente de assinatura cursiva animada, feito numa passada anterior mas nunca usado em lugar nenhum) finalmente entrou em uso — ao lado do CTA "Falar no WhatsApp" no talão principal do rodapé, reforçando a ideia de "fechar um acordo". Ganhou um parâmetro `className` (antes tinha o tamanho fixo no próprio componente).
- Contraste: o rótulo "ÁREAS DE ATUAÇÃO / CASOS ATIVOS" (cabeçalho da tabela do quadro) estava em `text-paper/45` sobre `bg-ink` — dá ~3.98:1, abaixo do mínimo. Subido pra `/55` (~5.27:1). Nesse par de cores específico (`#241a14`/`#f3ede1`), `/50` é o piso seguro pra texto normal — não usar opacidade menor que essa em texto sobre o fundo `ink`.

**Escopo:** só este projeto. NBJ Systems, Sabor da Vila, Traço, Âncora, Doce Ateliê e Estúdio Alma foram deixados como estão (pedido explícito do usuário, "pág a pág"). madolio (home) já foi reestruturado antes deste; Torre é o próximo.

## Histórico completo

1. Era um "template genérico" (placeholders `{{BUSINESS_NAME}}` etc., cópia visual da home do madolio) — reconstruído a partir do site que já estava publicado sem repositório em lugar nenhum.
2. Reformulado pro conceito de advocacia empresarial/civil — 1ª tentativa (paleta carvão/bordô, assinatura cursiva) — **rejeitada pelo usuário por parecer genérica/copiada da home**.
3. Reformulado de novo com o processo de Vibe Discovery acima ("Terminal Wagon-Lit") — versão atual.

`src/config/site.ts` centraliza os dados fictícios do escritório (nome, OAB, contato).

Ver o CLAUDE.md do `madolio` pra a gotcha de GSAP + Tailwind `transition` e o gotcha de teste do Chrome headless com `--window-size` pequeno — ambos se aplicam aqui.

## Gotcha: servidores de preview zumbis no Windows

`pkill -f "vite preview"` via Git Bash **não mata processos nativos do Windows** de forma confiável nesta máquina — o processo `node.exe` continua vivo e respondendo na porta antiga, mesmo depois de "matar" e reabrir em cima da mesma porta (o novo processo às vezes falha silenciosamente com "port already in use" enquanto o zumbi antigo continua servindo uma build desatualizada, ou passa a responder com página branca depois de ficar muito tempo vivo). Isso já causou falso alarme de "a página quebrou" mais de uma vez.

**Fix:** usar PowerShell pra matar por porta, não por nome de processo:
```powershell
Get-NetTCPConnection -LocalPort <porta> -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```
E sempre confirmar com um screenshot novo (não confiar só no `curl` retornando 200 — isso só confirma que ALGUM processo responde na porta, não qual).
