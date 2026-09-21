# Trinco Chaveiro e Serralheria (conceito)

Site-conceito da Madolio pro nicho de **chaveiro / serralheria** (abertura de
fechadura, troca de segredo, cópia de chave, e fabricação de grades e
portões sob medida — a combinação real e muito comum de pequeno negócio no
Brasil). **Negócio fictício** — não existe (o chaveiro "Adilson Ferraz"
também é inventado). Vite + React 19 + TypeScript + Tailwind v4 + GSAP
(`Reveal.tsx`, cópia canônica de `arcada`). Página única.

Nicho de alta demanda e fácil de vender, no mesmo espírito do `torque`
(oficina mecânica): todo mundo em algum momento já precisou de um chaveiro
com urgência.

## Deploy (Cloudflare Workers)

Worker `trinco`, em `https://trinco.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Colisão:** chaveiro/serralheiro × triagem real de urgência. Todo
  chaveiro de verdade separa pedido em três categorias antes de despachar
  alguém: **emergência 24h** (porta trancada, chave quebrada), **agendado**
  (troca de segredo, cópia de chave comum ou codificada) e **sob medida**
  (grade e portão, que exige medição e orçamento antes de cortar ferro). Em
  vez de um formulário de orçamento genérico, o site tem uma seção de
  triagem (`Triagem.tsx`) onde o visitante escolhe a situação mais parecida
  com a dele e vê, na hora, em qual categoria ela cai e por quê — a mesma
  pergunta que o chaveiro faria por telefone, só que respondida antes de
  ligar. Também dobra como UX real: ajuda a pessoa a saber se deve chamar
  agora ou pode esperar.
- **Nunca parecer:** o `torque` (oficina mecânica), vizinho mais próximo em
  registro "ofício manual, trabalhador, sem luxo". O Torque usa um painel de
  revisão por quilometragem (`<input type="range">` simulando o odômetro do
  carro) — mecanismo de manutenção preventiva por distância percorrida. O
  Trinco não tem slider nenhum: o mecanismo aqui é uma triagem por situação
  (o que aconteceu agora), não por acúmulo de uso ao longo do tempo. Paleta
  também não colide: Torque usa aço + amarelo de sinalização de oficina
  sobre papel cru; Trinco usa grafite + latão de fechadura sobre limalha,
  com vermelho de emergência como cor de urgência (o Torque não tem CTA de
  emergência, é serviço sempre agendável). Vocabulário: Torque fala de
  quilometragem e peça de carro; Trinco fala de fechadura, segredo, chave
  codificada e ferro.

## O wildcard: triagem de urgência real, não formulário de orçamento

`Triagem.tsx` + `data/triagem.ts` + `data/servicos.ts`: cinco situações reais
("fiquei do lado de fora", "a chave quebrou na fechadura", "preciso de cópia
de chave", "acabei de me mudar", "quero grade ou portão"), cada uma mapeada
pra uma das três categorias reais do ofício de chaveiro/serralheiro:

- **Emergência 24h:** porta trancada e chave quebrada. Não dá pra agendar,
  atendimento no mesmo dia a qualquer hora.
- **Agendado:** troca de segredo/fechadura e cópia de chave (inclusive
  codificada/transponder, que exige leitura e gravação de chip — dado real
  do ofício, não inventado). Não é urgente, mas também não precisa de
  medição.
- **Sob medida:** grade e portão de ferro. Sempre passa por medição no
  local e orçamento por escrito antes de qualquer corte, porque cada vão é
  diferente.

Clicar numa situação (`role="tablist"`) troca o cartão de resultado, que
mostra a categoria, o tempo de resposta esperado daquela categoria
(`categoriaInfo` em `data/servicos.ts`, compartilhado com `Servicos.tsx` pra
não duplicar a taxonomia) e uma explicação de por que aquela situação cai
naquela categoria. Isso é o mesmo raciocínio que um atendente de chaveiro
faz de cabeça ao telefone, exposto como interação, não uma calculadora
inventada nem teste de personalidade.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso/Vereda/Razão/Escuta: `demo.ts` +
`DemoDialog.tsx`. Nenhum botão abre um WhatsApp real, mostra a mensagem que
seria enviada e oferece o contato da Madolio. `Contato.tsx` monta a
mensagem a partir do nome (opcional) e do serviço escolhido num `<select>`
(reaproveita `data/servicos.ts`). O Header e o Hero também têm botão de
WhatsApp direto com mensagem de emergência fixa, cobrindo o CTA duplo e a
urgência que a busca por chaveiro costuma ter (quem procura "chaveiro perto
de mim" às vezes está literalmente trancado do lado de fora agora).

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card
(sem `og:image`, mesmo padrão de Estufa/Fornada/Vereda/Razão/Escuta) e
JSON-LD `Locksmith` — verificado como tipo real e específico do schema.org
(subtipo de `HomeAndConstructionBusiness`), mais adequado que o genérico
`LocalBusiness` usado por outros projetos, porque chaveiro é um tipo
nomeado no vocabulário. `public/robots.txt` e `public/sitemap.xml` existem.
`openingHours` marcado como `Mo-Su 00:00-23:59` porque o plantão de
emergência realmente funciona todos os dias, 24h (os demais serviços seguem
horário comercial, isso fica só no texto do FAQ, não no JSON-LD, pra não
inventar um horário estruturado que não existe de fato pro negócio como um
todo).

## Acessibilidade

Um único `<h1>` real (no Hero). A triagem em `Triagem.tsx` usa
`role="tablist"`/`role="tab"`/`aria-selected`. O FAQ usa `<button
aria-expanded aria-controls>` real + `<div role="region">`, testado
interativamente com Playwright (clique abre o painel e muda
`aria-expanded`; foco + tecla Enter fecha de novo, confirmando que é
operável só de teclado, sem depender de mouse). Foco visível
(`:focus-visible`) em todo elemento interativo, contorno na cor
`--color-latao`. O SVG decorativo do hero (dentes de chave estilizados) tem
`aria-hidden="true"`. Toda a animação (`Reveal` em scroll, deriva do SVG do
hero) respeita `prefers-reduced-motion: reduce`, com a regra global no fim
de `index.css` que zera duração de animação/transição sem exceção.

## Paleta e não-colisão

`--color-grafite` #24211d (grafite quase-preto, fundo escuro e texto
principal), `--color-limalha` #f2ede3 (cor de limalha/serragem de metal,
fundo claro), `--color-limalha-forte` #e6dcc8 (um tom mais escuro,
cartões), `--color-linha` #d6c9ac (borda), `--color-latao` #a67c3d (latão
de fechadura, acento primário/CTA secundário) + `--color-latao-hover`
#8a6530, `--color-emergencia` #b5342a (vermelho de urgência, CTA de
emergência 24h) + `--color-emergencia-hover` #97281f, `--color-seguro`
#4c7a4f (verde, categoria "agendado"/"sob controle").

Conferido com `grep -rh -- '--color-' */src/index.css` (rodado da raiz do
repositório, contra todos os projetos irmãos existentes no momento do
build) antes de fechar a paleta: nenhum dos 9 hexadecimais exatos aparece
em nenhum outro projeto. Cuidado extra com `torque` (mesmo registro de
ofício manual): o Torque usa `--color-chumbo` #2c3236 (aço azulado) como
base escura e `--color-sinal` #e8961f (amarelo de sinalização) como CTA; o
Trinco usa grafite mais neutro/quente como base escura e latão (tom
terroso, não amarelo vívido) como acento, com vermelho de emergência
reservado só pro CTA de urgência, que o Torque não tem. Nenhum hex em
comum entre os dois.

## Tipografia e não-colisão

**Zilla Slab** (display serifado, peso industrial de placa estampada,
diferente da Bitter usada pelo `razao`) + **Cabin** (corpo, sans humanista
levemente arredondada) + **Azeret Mono** (`--font-dado`, só pra dado real:
categoria de serviço, tempo de resposta — nunca decorativo). Conferido com
`grep -rhoE "family=[^&\"]+" */index.html` (raiz do repositório) contra
todos os projetos irmãos: nenhuma das três fontes, nem a combinação,
aparece em nenhum outro projeto (Torque usa Rubik + Fragment Mono, Razão
usa Bitter + Rubik + Fragment Mono).

## FAQ e prova social (`Faq.tsx` / `Depoimentos.tsx`)

Seguindo o padrão consolidado nos últimos builds (torque, esmalte, razao,
trama, escuta): FAQ em acordeão acessível e depoimentos concretos, incluídos
desde o início, não como adendo.

- `Faq.tsx` + `data/faq.ts`: cinco perguntas reais de quem está prestes a
  ligar pro chaveiro (atendimento fora do horário comercial, tempo de
  chegada, cópia de chave codificada, orçamento prévio, residência vs.
  comércio), com respostas específicas que usam linguagem de referência
  geral pra tempo/preço ("depende da região", "informado por telefone antes
  de confirmar") em vez de inventar um número fixo que varia caso a caso.
- `Depoimentos.tsx` + `data/depoimentos.ts`: três depoimentos fictícios
  (Fernanda O., Marcelo T., Juliana P.), nome + inicial do sobrenome, cada
  um com um caso concreto — um deles é justamente a situação de emergência
  noturna (trancada do lado de fora à noite, plantão atendeu em vinte
  minutos), outro é sobre a grade/portão sob medida (medição antes do
  orçamento bater com o corte final), como pedido explicitamente.
- Copy passada pelo skill `humanizer` antes de fechar.

## Decisões

- Owner fictício: **Adilson Ferraz**, chaveiro e serralheiro, 19 anos de
  ofício, atendendo Londrina, PR e região. Cidade real de porte médio no
  norte do Paraná, escolhida por não repetir nenhuma cidade já usada pelos
  projetos irmãos lidos nesta sessão (Sorocaba/razao, Juiz de
  Fora/escuta, entre outras).
- Quatro serviços (não mais) em `Servicos.tsx`/`data/servicos.ts`: abertura
  de porta, troca de segredo e fechadura, cópia de chave (comum e
  codificada), grades e portões sob medida — o conjunto real e comum de um
  chaveiro/serralheiro combinado de pequeno porte no Brasil, sem inventar
  serviço de nicho mais raro (ex: cofre bancário) que fugiria do escopo
  "fácil de vender" pedido.
- Intervalos e vocabulário técnico (transponder/chave codificada, categoria
  emergência vs. agendado vs. sob medida) são conceitos reais e
  documentados do ofício, não inventados. Nenhum preço nem tempo de
  deslocamento fixo aparece no site (nem no FAQ, nem no JSON-LD), porque os
  dois variam de verdade por região, trânsito e complexidade do serviço, e
  um número fixo estaria errado quase sempre.
- Testado com Playwright que o FAQ é operável só de teclado (foco + Enter
  alterna `aria-expanded` e o painel), não só por clique de mouse, antes de
  considerar a acessibilidade do componente validada.
- Passe de humanização com o skill `humanizer`: título, meta description,
  OG e a prosa de `Hero.tsx`, `data/servicos.ts`, `data/triagem.ts`,
  `data/faq.ts` e `data/depoimentos.ts` foram revisados, sem contraste
  forçado tipo "não X, mas Y" e sem travessão genérico como conector (só
  mantido, quando necessário, em pontuação de lista dentro de frase).
