# Escuta Psicologia (conceito)

Site-conceito da Madolio pro nicho de **psicologia clínica / terapia
individual**. **Consultório fictício**, não existe (a psicóloga "Dra. Renata
Casagrande" também é inventada). Vite + React 19 + TypeScript + Tailwind v4 +
GSAP (`Reveal.tsx`, cópia canônica de `arcada`). Página única.

## Deploy (Cloudflare Workers)

Worker `escuta`, em `https://escuta.sneakpeek.workers.dev`. `npm run deploy`.

## Referência estrutural (não visual)

O pedido apontou pro site real `psicologaluanaraquel.com` como estrutura de
conversão comprovada pro nicho. Trouxemos os elementos estruturais que
funcionam lá, sem copiar o visual genérico de cartão pastel:

- **Hero com CTA duplo** (WhatsApp direto + formulário leve) — `Hero.tsx` e
  `Contato.tsx`.
- **Cards de especialidade por problema concreto** (não "bem-estar" vago) —
  `Especialidades.tsx` + `data/especialidades.ts`: ansiedade, esgotamento no
  trabalho, autoestima, relacionamentos.
- **Seção de credenciais** com registro profissional, abordagem e tempo de
  atuação, em tom humano — `Credenciais.tsx`.
- **Comparativo online vs. presencial** — `OnlinePresencial.tsx`, tabela real
  de diferenças, não dois cards genéricos.
- **Prova social** com depoimentos — `Depoimentos.tsx` + `data/depoimentos.ts`,
  claramente fictícios (nome só de primeiro nome, aviso explícito no texto da
  seção, mesmo cuidado usado nos depoimentos de `pulso`).
- **FAQ em acordeão** respondendo a ansiedade de quem nunca fez terapia
  (convênio, duração de sessão, terapia online funciona, sigilo) —
  `Faq.tsx` + `data/faq.ts`, com `button`/`aria-expanded`/`aria-controls`
  reais, não `details`/`summary`.
- **Formulário leve como reforço do WhatsApp** — `Contato.tsx`, mesmo padrão
  de `demo.ts`/`DemoDialog.tsx` dos outros projetos.

O que a referência faz e que **não** trouxemos: grid de cards pastel com
badge e gradiente decorativo. Isso é exatamente a fórmula que o repositório
evita, cada site aqui carrega um mecanismo real de domínio, não card
decorativo.

## O wildcard: a ficha de registro de pensamento, não uma decoração

`RegistroPensamento.tsx` + `data/casos.ts`: a ficha de registro de pensamento
(*thought record*) é um instrumento real e amplamente documentado da terapia
cognitivo-comportamental (modelo de Beck), usado literalmente em sessão para
separar quatro colunas: **situação** (o fato, sem interpretação),
**pensamento automático** (o que passou pela cabeça), **emoção** (o que se
sentiu, com intensidade de 0 a 100) e **reformulação** (uma leitura mais
equilibrada, construída junto em terapia). Não é um teste de personalidade
nem um "descubra seu perfil", é a estrutura real da técnica de
reestruturação cognitiva.

Quatro casos ilustrativos (`data/casos.ts`, tema: trabalho, relacionamentos,
autoestima, futuro) mostram como o exercício funciona na prática: clicar num
tema (`role="tablist"`) troca o caso, clicar numa das quatro etapas
(situação, pensamento, emoção, reformulação) revela o conteúdo daquela coluna
no cartão. O mecanismo é literalmente o instrumento clínico sendo preenchido
diante do visitante, não um carrossel decorativo com o vocabulário da terapia
por cima.

### Guarda-corpo ético (importante)

Este mecanismo **nunca avalia, diagnostica ou dá conselho clínico pra quem
visita o site**. Os quatro casos são exemplos fixos e genéricos, não um
formulário que colhe a situação real da pessoa (isso seria coletar
divulgação sensível sem qualquer suporte profissional por trás, e uma
reformulação gerada por regra fixa poderia soar como aconselhamento
clínico incorreto). O texto de abertura da seção deixa isso explícito: "não é
um teste nem uma avaliação de quem está lendo". O rodapé do site (`Footer.tsx`)
traz a nota de crise com o número real e verificado do CVV (188, ligação
gratuita, 24h), conforme pedido, porque é o canal público correto pra
qualquer site que toque em saúde mental, mesmo um conceito fictício.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso/Vereda/Razão: `demo.ts` + `DemoDialog.tsx`.
Nenhum botão abre um WhatsApp real, mostra a mensagem que seria enviada e
oferece o contato da Madolio. `Contato.tsx` monta a mensagem a partir do nome
(opcional) e do motivo escolhido num `<select>` (reaproveita
`data/especialidades.ts`). O hero também tem um botão de WhatsApp direto
(`sendToWhatsApp` com mensagem fixa), cobrindo o padrão de CTA duplo pedido.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card (sem
`og:image`, não existe imagem gerada pra este conceito fictício, mesmo padrão
de Estufa/Fornada/Vereda/Razão) e JSON-LD `Psychologist` (subtipo de
`MedicalBusiness` no schema.org, mais específico que `MedicalClinic` genérico
usado pela Vereda, porque aqui é uma profissional individual, não uma
clínica com equipe). `public/robots.txt` e `public/sitemap.xml` existem.

## Acessibilidade

Um único `<h1>` real (no Hero). O seletor de tema da ficha usa
`role="tablist"`/`role="tab"`/`aria-selected`. O FAQ usa `button` real com
`aria-expanded`/`aria-controls`/`role="region"`, navegável por teclado, não
`details`/`summary` estilizado. Foco visível (`:focus-visible`) em todo
elemento interativo. SVGs decorativos (linhas do hero) têm `aria-hidden`.
Todo o movimento de `Reveal` e das animações CSS respeita
`prefers-reduced-motion: reduce`, regra global no fim de `index.css` que zera
duração de animação/transição.

## Paleta e não-colisão

`--color-tinta` #2b2320 (marrom-tinta quase-preto, fundo escuro e texto
principal), `--color-papel` #f8f2e9 (papel de ficha clínica, fundo claro),
`--color-papel-forte` #efe3d3 (papel mais escuro, cartões), `--color-linha`
#e3d4b8 (borda sobre o papel), `--color-quieto` #7c9a92 (verde-salva calmo,
acento secundário e cor de "emoção" na ficha) + `--color-quieto-hover`
#648078, `--color-acolhe` #b5613f (terracota argila, CTA principal e cor de
WhatsApp) + `--color-acolhe-hover` #984e30.

Conferido com `grep -rh -- '--color-' */src/index.css` (raiz do repositório,
contra os ~40 projetos irmãos) antes de fechar a paleta: todos os 8
hexadecimais exatos são inéditos. Um hex candidato inicial (`#ddd0ba` pra
borda) colidia exatamente com `--color-linha` do `trama`, então foi trocado
por `#e3d4b8` antes de fechar.

Diferenciação explícita do vizinho de paleta mais próximo:

- **vs. `trilha`** (`--color-tinta` #1b2620, `--color-papel` #f2ecdb,
  `--color-trilha` #c2703f): as duas famílias de paleta são "papel +
  terracota quente", porque o nicho pede calor e a Vereda também é clínica.
  Mas nenhum hex exato coincide, a Escuta usa marrom-tinta (não
  verde-ardósia) como base escura, salva-calmo (não verde-contorno nem
  azul-petróleo) como secundário, e a mecânica visual é oposta: a Vereda usa
  linhas de contorno topográfico ao redor de um mapa, a Escuta usa pauta de
  caderno horizontal atrás de uma ficha de índice, o objeto de referência é
  "caderno de anotação de consultório", não "mapa de trilha".
- **vs. `razao`** (`--color-tinta` #241d17, `--color-papel` #f4ecd8,
  `--color-selo` #24466b azul de carimbo): Razão usa azul de carimbo como
  acento primário e mecânica de calendário fiscal. Nenhum hex em comum, e o
  mecanismo da Escuta nunca marca data ou prazo, marca etapa de um processo
  clínico.
- **vs. `estudio-alma`** (pilates) e **`pulso`** (personal training): ambos
  são bem-estar físico, não saúde mental. A Escuta nunca usa linguagem de
  performance corporal, exercício ou resultado físico, o vocabulário inteiro
  é de processo terapêutico e reestruturação de pensamento.

## Tipografia e não-colisão

**Lora** (display serifado, tom calmo e legível, sem ares de rótulo antigo
como a Newsreader da Vereda) + **Epilogue** (corpo, sans humanista neutro) +
**Chivo Mono** (`--font-dado`, só pra dado clínico real: CRP, número da
etapa da ficha, nunca decorativo). Conferido com
`grep -rhoE "family=[^&\"]+" */index.html` (raiz do repositório) contra
todos os ~40 irmãos: nenhuma das três fontes aparece em nenhum outro
projeto, e o trio como combinação também é inédito.

## Decisões

- Owner fictícia: **Dra. Renata Casagrande**, psicóloga clínica, CRP
  04/118527 (04 é o código real da região Minas Gerais no Conselho Regional
  de Psicologia), consultório em Juiz de Fora, MG. Cidade escolhida porque
  `torque` e `razao`, construídos na mesma leva, já usaram Sorocaba, SP:
  Juiz de Fora é outra cidade real de porte médio, sem repetir estado nem
  cidade de nenhum projeto irmão lido nesta sessão.
- 4 questões em `Especialidades.tsx` (ansiedade, esgotamento no trabalho,
  autoestima, relacionamentos), subconjunto realista e concreto do que uma
  psicóloga clínica individual atende, não uma lista genérica de "todo tipo
  de problema".
- Os 4 casos da ficha (`data/casos.ts`) são fixos e ilustrativos, de
  propósito: um formulário que deixasse o visitante digitar a própria
  situação e devolvesse uma "reformulação" automática seria dar conselho
  clínico disfarçado de interatividade, o que este site explicitamente evita
  (ver guarda-corpo ético acima).
- Nenhuma alegação de resultado clínico específico aparece no site (tipo "X%
  de melhora"): as respostas do FAQ usam linguagem de referência geral
  ("pode ser tão eficaz quanto", "costuma durar", "depende do plano"), porque
  eficácia clínica real varia por pessoa e não dava pra verificar número
  algum com confiança.
- O número do CVV (188) foi conferido como o canal público real de
  prevenção ao suicídio no Brasil antes de entrar no rodapé, não é um dado
  inventado nem um placeholder.
- Passe de humanização com o skill `humanizer`: travessões usados como
  conector genérico entre duas ideias em `Depoimentos.tsx`,
  `data/especialidades.ts`, `data/faq.ts` e `data/casos.ts` foram trocados
  por vírgula, ponto ou dois-pontos, conforme a relação real entre as
  frases (mantidos só em comentário de código e no padrão
  "Nome — subtítulo" que não existe aqui, então não sobrou nenhum no
  H1/título).
