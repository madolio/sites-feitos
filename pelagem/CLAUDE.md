# Estúdio Pelagem (conceito)

Site-conceito da Madolio pro nicho de **banho e tosa** (grooming, serviço
padrão de higiene e estética, sem viés veterinário/médico). **Estúdio
fictício** — não existe (a tosadora "Bianca Torres" também é inventada).
Vite + React 19 + TypeScript + Tailwind v4, `Reveal.tsx` cópia canônica de
`arcada`. Página única.

## Deploy (Cloudflare Workers)

Worker `pelagem`, em `https://pelagem.sneakpeek.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Lugar/objeto:** o guia de cuidado de pelagem que qualquer tosador
  profissional carrega na cabeça — qual escova usar, de quanto em quanto
  tempo banhar, se pode tosar ou não, conforme o tipo de pelo do animal.
- **Colisão:** banho e tosa × tipo de pelagem real (curta/lisa, dupla,
  crespa, áspera/arame) e o cuidado que cada uma exige.
- **Nunca parecer o `focinho`** (pet shop/veterinária combinados): o Focinho
  usa mecânica de **prontuário médico** — ficha de atendimento com carimbo
  de "vacina em dia" e navegação por abas de fichário (`FolderTabs.tsx`)
  substituindo o menu. O Pelagem não tem nenhum enquadramento médico (nunca
  fala de vacina, exame ou consulta), a navegação é um header comum de
  âncoras, e o mecanismo não é sobre histórico de atendimento, é sobre tipo
  de pelo e a técnica de tosa que ele pede. Paleta e fontes também não têm
  nenhum hex/família em comum (ver abaixo). O único ponto em comum entre os
  dois é o público (tutor de pet) — a oferta, a mecânica e o vocabulário são
  inteiramente diferentes.

## O wildcard: guia de pelagem real, não decoração

`GuiaPelagem.tsx` + `data/pelagens.ts`: quatro tipos de pelagem
documentados na prática de tosa profissional, cada um com cuidado real e
diferente:

- **Curta e lisa** (Labrador, Pit Bull, Boxer): escovação semanal, banho a
  cada 4-6 semanas, sem necessidade de tosa.
- **Dupla/subpelo** (Golden Retriever, Husky, Pastor Alemão): escovação
  2-3x/semana (diária na muda), banho a cada 4-6 semanas com secagem
  completa, e a regra mais importante do grooming pra esse tipo: **nunca
  raspar** — o subpelo é proteção térmica, e tosar remove essa proteção e o
  pelo pode voltar irregular. É orientação real e amplamente documentada
  entre tosadores profissionais, não invenção do site.
- **Crespa** (Poodle, Bichon Frisé, Lhasa Apso): escovação diária, porque
  esse pelo não cai sozinho e continua crescendo — por isso a tosa é
  obrigatória a cada 4-6 semanas, diferente das outras pelagens onde a tosa
  é opcional.
- **Áspera/arame** (Schnauzer, Fox Terrier de pelo duro): a técnica ideal é
  o hand-stripping (arrancar pelo morto à mão, mantém a textura), com a
  tesoura como alternativa mais comum; tosa recorrente na máquina amolece a
  fibra do pelo com o tempo.

Clicar num tipo (`role="tablist"`) troca a pelagem ativa; clicar numa das
quatro etapas (escovação, banho, tosa, atenção especial) revela o cuidado
correspondente — mesma mecânica de "escolher categoria + revelar etapa" que
`RegistroPensamento.tsx` do `escuta` usa, mas aplicada a um domínio
totalmente diferente (grooming, não terapia), com dado real de cuidado
animal em vez de instrumento clínico.

## Serviços e faixa de preço

`Servicos.tsx` + `data/servicos.ts`: banho, tosa higiênica, tosa completa
(máquina/tesoura), de-shedding (retirada de subpelo), corte de unha e
limpeza de ouvido — lista real de serviço de estúdio de grooming. Faixas de
preço marcadas explicitamente como "a partir de", nota no topo da seção
deixa claro que são ilustrativas e variam por porte/estado do pelo, porque
não dava pra verificar um preço fechado com confiança.

## Modo demonstração

Igual a Estufa/Bruma/Fornada/Pulso/Vereda/Razão/Escuta: `demo.ts` +
`DemoDialog.tsx`. Nenhum botão abre um WhatsApp real, mostra a mensagem que
seria enviada e oferece o contato da Madolio. `Contato.tsx` monta a
mensagem a partir do nome (opcional) e do tipo de pelagem escolhido num
`<select>` (reaproveita `data/pelagens.ts`).

## FAQ e prova social (`Faq.tsx` / `Depoimentos.tsx`)

Seis perguntas reais de quem está decidindo levar o pet pra tosar: frequência
por tipo de pelo, se dói/estressa, se atendem pet agitado ou que já mordeu,
o que fazer se o pet tiver alergia/irritação de pele (aqui o site é
explícito que não trata condição de pele, só adapta o produto do banho, e
recomenda veterinário se a pele estiver inflamada), deixar vs. esperar no
local, e se atendem gato. Testada interativamente com Playwright
(`aria-expanded` alterna, `role="region"` fica visível ao abrir).

Três depoimentos fictícios e específicos, cada um nomeando o pet (Bolinha,
Poodle com tendência a nó; Nina, Husky perdendo subpelo; Toby, cão reativo
com estranhos), não elogio genérico — mesmo padrão de especificidade que
`razao`/`escuta`/`trama` usam.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card
(sem `og:image`, mesmo padrão dos irmãos) e JSON-LD **`LocalBusiness`**.
Considerei `PetGroomer` primeiro mas confirmei que não é um tipo válido do
vocabulário schema.org (schema.org tem `Veterinary`/subtipos de
`MedicalOrganization` pra clínica, e `AnimalShelter`, mas nenhum tipo
específico pra "estúdio de banho e tosa"); `LocalBusiness` é o tipo genérico
correto e verificável pra um estabelecimento de serviço físico como este,
em vez de inventar um `@type` que o schema.org não reconhece.
`public/robots.txt` e `public/sitemap.xml` existem.

## Acessibilidade

Um único `<h1>` real (no Hero). O seletor de tipo de pelagem em
`GuiaPelagem.tsx` usa `role="tablist"`/`role="tab"`/`aria-selected`. O FAQ
usa `button` real com `aria-expanded`/`aria-controls`/`role="region"`,
navegável por teclado (testado com clique via Playwright, não
`details`/`summary`). Foco visível (`:focus-visible`) em todo elemento
interativo. O SVG decorativo de ondas do Hero tem `aria-hidden`. Todo o
movimento de `Reveal` e das animações CSS respeita
`prefers-reduced-motion: reduce`, regra global no fim de `index.css`.

## Paleta e não-colisão

`--color-tinta` #17332f (verde-escuro quase-preto, fundo escuro e texto
principal), `--color-papel` #f7f2e8 (creme de toalha de banho, fundo claro),
`--color-papel-forte` #ede4d1 (creme mais escuro, cartões), `--color-linha`
#ddd0b6 (borda sobre o papel), `--color-agua` #2f8f86 (teal de água de
banho, acento secundário) + `--color-agua-hover` #24746c, `--color-pelo`
#c9622b (terracota tom pelo caramelo, CTA principal/WhatsApp) +
`--color-pelo-hover` #a94f21.

Conferido com `grep -rh -- '--color-' */src/index.css` (raiz do
repositório, contra os ~41 projetos irmãos): nenhum dos 8 hexadecimais
exatos aparece em nenhum outro projeto (busca direcionada pelos hexadecimais
candidatos antes de fechar a paleta, sem achar coincidência).

- **vs. `focinho`** (`--color-ink` #2b3a3a verde-petróleo escuro,
  `--color-paper` #faf7f0 creme, Fredoka + Nunito Sans): o Focinho também
  usa verde-escuro + creme como base, mas nenhum hex exato coincide (petróleo
  #2b3a3a vs. o verde mais profundo #17332f do Pelagem), a fonte de display
  é oposta (Fredoka é arredondada/lúdica, tom de pet shop; Zilla Slab aqui é
  serifada/técnica, tom de estúdio profissional) e o acento de cor é teal de
  água (não terracota-CTA único como o Focinho usa). A diferença mais
  importante não é de paleta, é de mecânica: fichário/carimbo médico vs.
  guia de pelagem.

## Tipografia e não-colisão

**Zilla Slab** (display serifado, ar técnico de manual de cuidado) +
**Libre Franklin** (corpo, sans neutro e legível) + **Overpass Mono**
(`--font-dado`, só pra dado real: etapa do guia, faixa de preço, telefone —
nunca decorativo). Conferido com `grep -rhoE "family=[^&\"]+" */index.html`
(raiz do repositório) contra todos os ~41 irmãos: nenhuma das três fontes
aparece em nenhum outro projeto (Sora/Karla/JetBrains Mono, Fraunces/Work
Sans/IBM Plex Mono e outras combinações populares já estavam em uso por
outros irmãos e foram descartadas antes de fechar este trio).

## Decisões

- Negócio fictício: **Estúdio Pelagem**, tosadora responsável **Bianca
  Torres** (9 anos de estúdio, especialista em hand-stripping e
  de-shedding), em **Joinville, SC** — cidade real de porte médio no
  Rio Grande do Sul, não repete Sorocaba/Juiz de Fora/Uberlândia (já usadas
  por outros irmãos) nem nenhuma cidade lida nesta sessão.
- Os quatro tipos de pelagem (curta, dupla, crespa, áspera) e as
  recomendações de escovação/banho/tosa vêm de prática documentada de
  grooming profissional (regra de nunca tosar subpelo duplo, tosa
  obrigatória em pelagem crespa por não parar de crescer, hand-stripping
  como técnica correta pra pelo arame). Nenhum intervalo foi inventado sem
  base: onde há variação real (ex: banho a cada 4-6 semanas), o texto usa
  faixa, não número fechado.
- Nenhum preço fechado aparece: todas as faixas em `data/servicos.ts` são
  "a partir de", com aviso explícito na seção, porque o valor final real
  varia por porte do animal e estado do pelo.
- JSON-LD usa `LocalBusiness` (não `PetGroomer`, que não existe no
  vocabulário schema.org) — verificado antes de escrever o `index.html`.
- Passe de humanização com o skill `humanizer`: aplicado à prosa de
  `Hero.tsx`, `Servicos.tsx`, `Credenciais.tsx`, `Contato.tsx`,
  `Footer.tsx` e todos os textos de `data/`.
