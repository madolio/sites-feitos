# Ninho Educação Infantil (conceito)

Site-conceito da Madolio pro nicho de **creche/escolinha infantil** (0 a 5
anos). **Escola fictícia**, não existe (a coordenadora "Fernanda
Bittencourt" também é inventada). Vite + React 19 + TypeScript + Tailwind
v4 + GSAP (`Reveal.tsx`, cópia canônica de `arcada`). Página única.

## Deploy (Cloudflare Workers)

Worker `ninho`, em `https://ninho.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Lugar/objeto:** a ficha de acompanhamento de desenvolvimento que toda
  escola de Educação Infantil séria usa pra registrar o que cada turma está
  trabalhando, por faixa etária.
- **Colisão:** creche × marcos reais de desenvolvimento infantil por faixa
  etária, na mesma divisão usada pela BNCC pra Educação Infantil no Brasil
  (bebês 0-1a6m, crianças bem pequenas 1a7m-3a11m, crianças pequenas
  4a-5a11m).
- **Nunca parecer:** banco de imagem de "criança feliz brincando" com
  bloco de cor primária tipo parquinho, nem grid de card+badge+CTA
  genérico. O mecanismo mostra estrutura pedagógica real, não decoração
  fofa.

## O wildcard: marcos de desenvolvimento reais por faixa etária

`MarcosDesenvolvimento.tsx` + `data/faixas.ts`: as três faixas etárias reais
da Educação Infantil brasileira (mesma estrutura da BNCC), cada uma com
marcos de desenvolvimento documentados em quatro domínios (motor,
linguagem, social/emocional, cognitivo):

- **Bebês (0 a 1a6m):** sustentar a cabeça, sentar, engatinhar, primeiros
  passos, primeiras palavras, vínculo de apego.
- **Crianças bem pequenas (1a7m a 3a11m):** andar com firmeza, frases
  curtas, brincar paralelo, início do controle de esfíncteres.
- **Crianças pequenas (4a a 5a11m):** jogos com regra, coordenação fina,
  contar histórias, brincar cooperativo, noções de quantidade.

Nenhum marco tem idade fechada: o texto usa linguagem de referência geral
("costuma", "em geral", "por volta de"), porque desenvolvimento infantil
varia de criança pra criança, e uma idade cravada seria informação
incorreta (mesmo cuidado de hedge do `razao` com prazo fiscal e do `escuta`
com eficácia clínica). Clicar numa aba de faixa etária (`role="tablist"`)
troca o conteúdo; clicar num domínio (motor/linguagem/social/cognitivo)
troca a lista de marcos daquela faixa — o mecanismo é a ficha pedagógica
sendo folheada diante do visitante, não um carrossel decorativo.

## Rotina do dia e segurança

`RotinaDoDia.tsx` + `data/rotina.ts`: sequência real de rotina diária de
creche (acolhida, refeições em horário fixo, atividade pedagógica, parque,
descanso, higiene, saída) — horários fictícios da escola inventada, mas a
lógica e a sequência são as práticas reais de Educação Infantil.

`Seguranca.tsx`: proporção de adultos por criança tratada em linguagem
genérica de referência ("recomendações de proporção adulto-criança usadas
como referência na Educação Infantil brasileira"), sem inventar um número
específico de proporção que não dava pra verificar com confiança (a
proporção exata varia por norma municipal/estadual e por faixa etária).
Também cobre entrega controlada, formação da equipe e comunicação diária.

## FAQ e prova social (`Faq.tsx` / `Depoimentos.tsx`)

Padrão de casa desde torque/esmalte/razao/trama/escuta: acordeão acessível
(`<button aria-expanded aria-controls>` + `<div role="region">`, operável
por teclado por ser `<button>` nativo) e três depoimentos fictícios
específicos (nunca "ótimo atendimento"):

- Seis perguntas reais de quem decide matricular: período de adaptação, o
  que levar no primeiro dia, alimentação/restrições, como doença ou
  acidente é tratado, visita durante o horário de aula, lista de espera.
- Três depoimentos com primeiro nome + inicial do sobrenome, cada um com
  caso concreto: adaptação difícil resolvida com comunicação diária,
  alergia alimentar tratada com cuidado na matrícula, recado diário sobre
  rotina da criança.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso/Vereda/Razão/Escuta: `demo.ts` +
`DemoDialog.tsx`. Nenhum botão abre um WhatsApp real, mostra a mensagem que
seria enviada e oferece o contato da Madolio. `Contato.tsx` monta a
mensagem a partir do nome (opcional) e da faixa etária escolhida num
`<select>` (reaproveita `data/faixas.ts`).

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card
(sem `og:image`, mesmo padrão dos irmãos) e JSON-LD `ChildCare` (tipo
schema.org específico pra creche/cuidado infantil, mais preciso que
`LocalBusiness` genérico). `public/robots.txt` e `public/sitemap.xml`
existem.

## Acessibilidade

Um único `<h1>` real (no Hero). As abas de faixa etária usam
`role="tablist"`/`role="tab"`/`aria-selected`; os botões de domínio (motor/
linguagem/social/cognitivo) usam `aria-pressed`. O FAQ usa `button` real
com `aria-expanded`/`aria-controls`/`role="region"`. Foco visível
(`:focus-visible`) em todo elemento interativo. SVGs decorativos do hero
têm `aria-hidden`. Todo o movimento de `Reveal` e das animações CSS
respeita `prefers-reduced-motion: reduce`, regra global no fim de
`index.css`.

## Paleta e não-colisão

`--color-tinta` #2e2620 (marrom-tinta quase-preto, fundo escuro e texto
principal), `--color-papel` #faf4e9 (creme quente, fundo claro),
`--color-papel-forte` #efe0c8 (creme mais escuro, cartões), `--color-linha`
#ddc9a8 (borda sobre o papel), `--color-broto` #6d8a63 (verde-broto,
acento secundário/crescimento) + `--color-broto-hover` #567350,
`--color-ninho` #c96f4a (argila/terracota, CTA principal/WhatsApp) +
`--color-ninho-hover` #a8562f.

Paleta pensada pra fugir do clichê "bloco de cor primária de parquinho":
neutros quentes considerados (creme + tinta marrom) com só dois acentos,
um verde-broto discreto e uma terracota confiante, em vez da fórmula
azul-vermelho-amarelo saturado que domina material gráfico de creche
genérico.

Conferido com `grep -rh -- '--color-' */src/index.css` (raiz do
repositório, contra os ~41 projetos irmãos) antes de fechar a paleta:
todos os 8 hexadecimais exatos são inéditos, nenhum colide.

## Tipografia e não-colisão

**Frank Ruhl Libre** (display serifado, calor humano sem ares de "letra de
caderno infantil") + **Onest** (corpo, sans humanista arredondado o
suficiente pra soar acolhedor sem ficar infantilizado) + **Noto Sans Mono**
(`--font-dado`, só pra dado real: faixa etária, horário da rotina, nunca
decorativo). Conferido com `grep -rhoE "family=[^&\"]+" */index.html`
(raiz do repositório) contra todos os ~41 irmãos: a combinação testada
inicialmente usava **Azeret Mono**, que colidia exatamente com o mono do
`trinco` (chaveiro, construído em paralelo na mesma leva) — trocado por
**Noto Sans Mono** antes de fechar, porque o grep só pega irmãos já
commitados e os dois agentes não podiam se ver em tempo real. Frank Ruhl
Libre e Onest são inéditos no repositório.

## Decisões

- Escola fictícia: **Ninho Educação Infantil**, coordenação pedagógica de
  **Fernanda Bittencourt** (pedagoga), em **Maringá, PR** — cidade real de
  porte médio no interior paranaense, não repete Sorocaba (`torque`/`razao`),
  Juiz de Fora (`escuta`) nem Uberlândia (`esmalte`), já usadas por projetos
  irmãos lidos nesta sessão.
- Três faixas etárias (não mais, não menos): a divisão oficial de bebês,
  crianças bem pequenas e crianças pequenas é a estrutura real usada na
  Educação Infantil brasileira, então reproduzir qualquer outra contagem
  seria inventar uma taxonomia que não existe.
- Nenhuma idade fechada aparece como marco ("aos 8 meses X"): todo marco usa
  linguagem de referência geral, porque desenvolvimento infantil varia por
  criança e uma idade cravada seria informação incorreta.
- Nenhum número específico de proporção adulto-criança foi inventado em
  `Seguranca.tsx`: a norma exata varia por município/estado e faixa etária,
  então o texto fica em linguagem de referência geral em vez de citar um
  número que não dava pra verificar com confiança.
- Passe de humanização com o skill `humanizer`: título, meta description,
  OG e a prosa de `Hero.tsx`, `MarcosDesenvolvimento.tsx`, `RotinaDoDia.tsx`,
  `Seguranca.tsx`, `Contato.tsx`, `Footer.tsx` e os arquivos de `data/`
  foram revisados, travessões usados como conector genérico trocados por
  vírgula, ponto ou dois-pontos conforme a relação real entre as frases.
