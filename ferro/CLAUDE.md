# Ferro (conceito)

Site-conceito da Madolio pro nicho de academia (musculação + funcional). **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Reformulação — pegada old school / relíquia / rock pesado

Pedido explícito do usuário: "reformule a ideia toda, coloque uma pegada academia oldschool. algo relíquia, rock pauleira". Substitui por completo a primeira versão (vibe "Anilha" — paleta industrial iron/steel/signal-amarelo, nav em placar de treino). Mantido: nome, domínio (`ferro`), a técnica de contador animado (`PlateCounter.tsx`, sem lib) e o modo demonstração.

**Ajuste seguinte (v2):** o usuário gostou da direção, mas achou que a paleta clara (papel envelhecido como fundo da página inteira) não combinava com as fontes agressivas, e pediu mais efeitos 3D — "pode viajar nessa página". Resolvido:

- **Fundo virou escuro** (`--color-void`) — o papel/xerox agora só aparece nos "cartazes" individuais (cards, header, plaquinha de recordes), não na página inteira. Isso deu o clima de "galpão à noite com pôster pregado na parede" que faltava, em vez de "documento antigo".
- **WebGL de verdade** (`@react-three/fiber` + `@react-three/drei`, mesmo padrão do Madolio): `Scene3D.tsx`/`Scene3DLazy.tsx` reescritos aqui (projetos são independentes) com um campo de partículas e um `MoltenBlob` — icosaedro distorcido (`MeshDistortMaterial` da drei) com metalness/emissive, girando devagar atrás do título do Hero, representando ferro em fusão. Precisa de `.npmrc` com `legacy-peer-deps=true` (mesma razão dos outros conceitos 3D — peers opcionais de Expo do React Three Fiber).
- Fontes **mantidas** (Metal Mania + Special Elite), só a paleta e o fundo mudaram.

**Ajuste seguinte (v3):** feedback direto — "a paleta de cores e fonte n combinou, mantém a fonte" (v2 tinha ferrugem/laranja) foi corrigido antes de ainda receber outro pedido explícito: "viaje mais, quero cores preto branco e azul, algo na pegada do metallica". Resolvido:

- Paleta inteira trocada de ferrugem/laranja pra **preto/branco/azul elétrico** (`--color-steel` #1b4dab / `--color-steel-bright` #5b9fff no lugar de `--color-rust`/`--color-rust-bright`; `--color-paper` virou branco-chrome #f0f0ee em vez de papel envelhecido tan; `--color-smoke`/`--color-chumbo` viraram cinza-azulado frio). Todas as classes (`.btn-rust` → `.btn-steel`) e usos inline (`text-rust`, `border-rust`) foram renomeados.
- **Fontes mantidas** de novo, intocadas — só cor.
- **Mais 3D** ("pode viajar"): `Scene3D.tsx` ganhou dois meshes novos além do `MoltenBlob` — `CircuitShell` (icosaedro wireframe branco, maior, girando no sentido contrário — efeito "raio-x elétrico" ao redor do metal) e `Shards` (6 octaedros metálicos menores orbitando em posições fixas). Título do Hero ganhou `.chrome-text` (text-shadow em camadas simulando bisel metálico gravado) e um ícone de relâmpago (`Bolt`, `.bolt` com `@keyframes bolt-flicker`) piscando ao lado do texto "desde 1987".
- Favicon e `theme-color` atualizados pra preto puro.

**Ajuste seguinte (v4):** feedback direto sobre a cena 3D — "esse blob azul tá mt feio, reformula ele todo". Estava mesmo: o `MoltenBlob`, a `CircuitShell` e os `Shards` foram removidos inteiros e a cena refeita.

- **O objeto agora é uma anilha olímpica de verdade**, não uma forma abstrata: anel extrudado (`Shape` + `holes` + `ExtrudeGeometry`) com chanfro e seis furos de pegada. Pro site que se chama *Ferro*, o objeto ser literalmente ferro de academia vale mais que um blob genérico. São três, de tamanhos diferentes, girando em velocidades diferentes.
- **A causa raiz da feiura era técnica:** `metalness={1}` sem nada pra refletir renderiza chapado — era por isso que o blob parecia plástico azul, e nenhum ajuste de cor ia resolver. A correção é o `Estudio`: um `<Environment frames={1}>` com `<Lightformer>` da drei montando um cubemap **local**, sem baixar HDR de CDN nenhum. Com ambiente pra refletir, o mesmo material vira aço.
- **Composição:** as anilhas ficam nas laterais, não atrás do título. A primeira tentativa deixou uma anilha cromada gigante bem no meio e o título sumiu em cima dela — erro pego em screenshot, não no código.

### Gotchas da cena

1. **Intensidade dos lightformers é baixa de propósito.** Alta, o aço vira cromo espelhado e estoura de branco: bonito isolado, ilegível com texto por cima.
2. **As anilhas giram, então o brilho atrás do texto muda com o tempo.** Um screenshot legível não prova que continue legível 3 s depois — por isso o Hero tem uma máscara radial escura (`radial-gradient`) entre o canvas e o conteúdo, que trava o contraste independente de onde a rotação parou. Ao revisar, conferir vários instantes, não um.
3. **O grupo escala por `viewport.width`.** As anilhas estão em `x` grande pra ficarem nas bordas; num viewport estreito o mundo visível encolhe e elas sairiam de quadro. O `scale` proporcional faz o conjunto encolher e se aproximar do centro em vez de sumir no mobile.

## Deploy (Cloudflare Workers)

Worker `ferro`, em `https://ferro.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Cartaz de show"

- **Lugar/objeto:** cartaz de show de rock pesado xerocado, colado na parede com fita crepe; placar de recordes pregado há décadas.
- **Colisão:** academia clássica dos anos 80/90 × flyer de show de banda de metal.
- **Nunca parecer:** academia moderna com LED/espelho de Instagram, crossfit colorido, nem a v1 deste próprio site (paleta industrial/institucional).
- **Wildcards:**
  - `Reel` (dentro de `Hero.tsx`) — bobina de fita cassete girando sem parar (`.reel`, CSS puro, `prefers-reduced-motion` respeitado), representando "a trilha nunca para".
  - `PlateCounter.tsx` no Hero — reaproveitado da v1, agora conta anos de casa (1987) em vez de carga levantada.
- **Esqueleto próprio:** `Recordes.tsx` — um quadro de recordes envelhecido (`.xerox-grain` + `.tape`), pregado na parede, no lugar de uma seção genérica de diferenciais.

Paleta (v3, preto/branco/azul — pegada Metallica): `--color-void` (#050505, fundo da página) + `--color-paper` (#f0f0ee, branco-chrome, só nos cartazes) + `--color-ink` (#0a0a0a, texto dentro dos cartazes) + `--color-smoke` (#9aa6b3, texto secundário sobre `void`) + `--color-chumbo` (#545f6b, texto secundário sobre `paper`) + `--color-steel`/`--color-steel-bright` (azul elétrico, ver seção de contraste). Fontes: **Metal Mania** (display — literal fonte de logo de banda de thrash metal, só pra títulos grandes, ilegível em corpo de texto) + **Special Elite** (corpo — datilografia/xerox). Mantidas desde a v1 apesar de duas trocas de paleta, a pedido explícito do usuário nas duas vezes.

## Gotcha de contraste — o oposto do esperado

`--color-steel` é escuro (não um vívido como nas paletas anteriores), então a regra de pares é invertida em relação ao que se esperaria:

- **Steel funciona bem como TEXTO direto sobre `paper`** (branco-chrome) — contraste alto.
- **Steel NÃO funciona como texto sobre `ink`/`void`** (dois tons escuros). Pra esse caso existe `--color-steel-bright` (#5b9fff) — só serve pro limiar de "texto grande" da WCAG (24px+ regular ou 18.66px+ bold), nunca pra texto pequeno de corpo sobre fundo escuro. Usado em `Recordes.tsx` nos valores de peso (`text-2xl`) e no contador do Hero.

Se adicionar um novo elemento com `--color-steel` sobre fundo escuro, usar `--color-steel-bright` e confirmar que o texto é grande — não criar uma terceira variante sem testar o contraste primeiro.

## Modo demonstração

Igual aos outros conceitos: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real. Já mantém `m-auto` na className do `<dialog>` (bug encontrado e corrigido em 19 outros conceitos antes desta reformulação).

## SEO básico

`index.html` tem meta description, canonical e Open Graph (sem `og:image` — não existe imagem gerada pra este conceito). `public/robots.txt` e `public/sitemap.xml` existem.
