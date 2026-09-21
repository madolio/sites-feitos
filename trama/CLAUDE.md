# Trama (conceito)

Site-conceito da Madolio pro nicho de **loja de roupa de bairro** (pronta-para-vestir,
atendimento de balcão, preço acessível). **Negócio fictício**, não existe. Vite + React 19
+ TypeScript + Tailwind v4 + GSAP (`Reveal.tsx`). Página única.

## Deploy (Cloudflare Workers)

Worker `trama`, em `https://trama.fenoninho-max.workers.dev`. `npm run deploy`.

## Por que este nicho

O agenciamento pediu explicitamente um nicho "fácil de vender": roupa de bairro é procura
constante, ticket baixo, decisão de compra rápida, o oposto do funil consultivo que os três
projetos de moda já existentes no repositório (`encaixe`, `calibre`, `prisma`) constroem.
Os três são registro de luxo/sob medida: alfaiataria com configurador de medidas
(`encaixe`), relojoaria artesanal (`calibre`), joalheria com configurador WebGL de gema
(`prisma`). A Trama precisava ser o oposto inteiro: loja de rua, roupa pronta pra vestir,
sem processo de encomenda, sem preço de luxo, público do bairro, não cliente de butique.

## Vibe Discovery

- **Colisão:** vitrine de loja de roupa × simbologia real de etiqueta de cuidado têxtil
  (ABNT NBR NM ISO 3758 / ISO 3758). Em vez de só mostrar peça e preço, a peça central do
  site é um leitor interativo de etiqueta: escolha um tecido do catálogo da loja e veja o
  símbolo real de lavagem, alvejante, secagem e passar daquele tecido específico, com o
  significado escrito por extenso, porque quase ninguém decora o que o triângulo do
  alvejante ou o ponto do ferro realmente significam. É ferramenta de uso real (evita
  encolher a camiseta, sangrar o jeans, derreter a legging na secadora), não decoração de
  produto.
- **Nunca parecer:** a "vitrine genérica" de e-commerce de moda (grade de cards de produto
  com preço riscado e badge "novo", banner "queima de estoque", modelo de banco de imagens).
  Também não pode se parecer com os três vizinhos de categoria: nada de configurador de
  medida sob encomenda (`encaixe`), nada de relógio/instrumento de precisão (`calibre`),
  nada de gema/WebGL (`prisma`). A mecânica aqui é sobre cuidar da roupa que a pessoa já
  comprou, não sobre configurar a roupa antes de comprar.

## O wildcard: a etiqueta de cuidado, não uma vitrine de produto

`EtiquetaCuidado.tsx` + `data/tecidos.ts`: seis tecidos comuns de loja de bairro (algodão,
jeans/sarjado, viscose, linho, poliéster, malha com elastano), cada um com peça exemplo do
catálogo, composição de fibra, três propriedades reais em escala relativa (absorção de
umidade, elasticidade, respirabilidade) e os quatro símbolos de cuidado reais na ordem em
que aparecem numa etiqueta costurada: lavagem, alvejante, secagem, passar. Clicar num
tecido troca todo o cartão, com ícone SVG de cada símbolo (banheira com onda para lavagem,
triângulo para alvejante, quadrado com círculo para secagem, base com pontos de vapor para
passar) e o texto explicando por que aquele símbolo é aquele, não só qual é.

Os dados vêm de propriedade real de fibra e prática de lavanderia amplamente documentada,
não de número inventado:

- **Algodão:** absorve muito, tolera água quente (até 40°C) e ferro quente (200°C), a fibra
  mais resistente da tabela.
- **Jeans:** lavar com água fria e do avesso porque o índigo é corante de superfície que
  sangra a cada lavagem; nunca alvejante (reage com o índigo); ferro mais baixo que o
  algodão puro por causa do elastano na trama.
- **Viscose:** fibra artificial de celulose que perde até metade da resistência molhada,
  por isso lavagem delicada, nunca torcer, secar na horizontal.
- **Linho:** fibra rígida e pouco elástica, por isso amassa muito; mesma rigidez que dá a
  textura seca característica do tecido; ferro mais alto da tabela (200°C a vapor).
- **Poliéster:** fibra sintética termoplástica, baixa absorção, seca rápido, mas derrete ou
  brilha com ferro acima de 110°C (a temperatura mais baixa da tabela).
- **Malha com elastano:** elasticidade alta vem inteira do fio de elastano, que se degrada
  com calor de secadora e com cloro, por isso nunca secadora quente e nunca alvejante.

Cada observação do card está amarrada ao mecanismo real (por que a fibra se comporta assim),
não é um adjetivo solto.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso/Vereda: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre
um WhatsApp real, mostra a mensagem que seria enviada e oferece o contato da Madolio. O
formulário de contato (`Contato.tsx`) monta a mensagem a partir da categoria de roupa
escolhida num `<select>` + nome opcional.

## Acessibilidade

Um único `<h1>` real (no `Hero.tsx`). Os botões de tecido em `EtiquetaCuidado.tsx` usam
`role="tablist"`/`role="tab"`/`aria-selected`, e os ícones de símbolo de cuidado são
`aria-hidden` (decorativos, o texto ao lado já carrega o significado). Foco visível
(`:focus-visible`) em todo elemento interativo. Todo o movimento respeita
`prefers-reduced-motion: reduce`, inclusive a regra global no fim de `index.css` que zera
duração de animação/transição.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card (sem `og:image`,
não existe imagem gerada pra este conceito fictício, mesmo padrão de Estufa/Fornada/Vereda)
e JSON-LD `ClothingStore`. `public/robots.txt` e `public/sitemap.xml` existem.

## Paleta e não-colisão

`--color-cru` #f7f1e6 (fundo claro, cor de tecido cru/algodão não branqueado),
`--color-carvao` #262220 (texto principal, quase-preto quente), `--color-jeans` #3e5c74
(azul jeans, acento primário) + `--color-jeans-hover` #33495d, `--color-ferrugem` #b5502f
(terracota/ferrugem, CTA) + `--color-ferrugem-hover` #9a4127, `--color-mostarda` #c99a3e
(mostarda, acento secundário e dado de tecido), `--color-linha` #ddd0ba (borda sobre o cru),
`--color-cartao` #efe6d3 (cartão sobre o cru).

Conferido com `grep -rh -- '--color-' */src/index.css` contra todos os ~36 projetos irmãos
antes de fechar: nenhum desses 9 hexadecimais exatos aparece em nenhum outro projeto do
repositório. Checado com atenção redobrada contra os três vizinhos de categoria:
- **`encaixe`** usa `--color-paper` #efe8d8, `--color-accent` #34586c, `--color-fio` #8b5a34
  (paleta de papel/madeira de ateliê de alfaiataria). O `--color-jeans` da Trama (#3e5c74)
  fica perto no tom de azul mas não é o mesmo hex do `--color-accent` (#34586c) do
  `encaixe`, e o restante da paleta não compartilha nenhum valor.
- **`calibre`** é preto-void + creme + latão dourado (`--color-void` #120d08,
  `--color-brass` #caa25e), registro de luxo escuro. A Trama nunca usa preto puro nem
  latão: fundo claro de tecido cru, sem tom metálico.
- **`prisma`** é roxo neon sobre preto-carvão (`--color-acento` #b98cff,
  `--color-noite` #100c14), registro de joalheria noturna. A Trama não usa nenhum tom
  fluorescente nem fundo escuro como base.

## Tipografia e não-colisão

**Bitter** (display, serifa robusta de rótulo, não decorativa) + **Instrument Sans** (corpo,
sans neutra e legível) + **Ubuntu Mono** (`--font-dado`, só pra dado real de cuidado têxtil:
composição, temperatura, símbolo, nunca decorativo). Conferido com
`grep -rhoE "family=[^&\"]+" */index.html` contra todos os ~36 irmãos: nenhuma das três
aparece em nenhum outro projeto (nem em `encaixe`: Syne + Work Sans; nem em `calibre`: Syne
+ Sora; nem em `prisma`: Space Grotesk + Inter), e o trio como combinação também é inédito.

## Decisões

- Owner fictícia: **Marlene Aparecida Souza**, proprietária da Trama no bairro Floresta, em
  Belo Horizonte/MG, atendendo desde 2011. Bairro e cidade escolhidos por ser um contexto
  real de comércio de rua tradicional, coerente com o registro "loja de bairro", sem repetir
  cidade de nenhum projeto irmão já lido (Gramado/RS na `trilha`, Curitiba/PR na `derme`).
- Seis tecidos (não mais) na etiqueta de cuidado: são as fibras reais mais comuns numa loja
  de roupa de bairro (algodão, jeans, viscose, linho, poliéster, malha com elastano) que
  cobrem as categorias reais do catálogo (`data/categorias.ts`). Inventar um sétimo tecido
  "pra parecer mais completo" quebraria a precisão têxtil que o Vibe Discovery pediu.
- As três propriedades de fibra (absorção, elasticidade, respirabilidade) usam escala
  relativa de três níveis (baixa/média/alta), não número absoluto, porque é assim que a
  literatura têxtil geral compara fibra: relativamente, não em unidade métrica exata que
  varia por fabricação.
- Quatro categorias em `Vitrine.tsx` (básicos, jeans e calças, vestidos e conjuntos,
  moletom e inverno): recorte realista do que uma loja de bairro de porte médio mantém em
  estoque o ano todo, não uma lista genérica de "toda categoria de roupa possível".
- Passe de humanização: prosa de `Hero.tsx`, `Contato.tsx`, `Footer.tsx`, `Home.tsx`,
  `DemoDialog.tsx` e `data/tecidos.ts`/`data/categorias.ts` revisada pra trocar travessão
  usado como conector genérico por ponto, vírgula, dois-pontos ou parênteses conforme a
  relação real entre as frases, mantendo travessão só nos comentários de código (onde o
  padrão do repositório o usa em todos os projetos irmãos).
