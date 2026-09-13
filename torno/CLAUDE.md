# Torno (conceito)

Site-conceito da Madolio pro nicho de ateliê de cerâmica. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + three.js (React Three Fiber + drei + @react-three/postprocessing). Página única, sem rolagem.

Feito a partir do pedido "fuja de tudo que já fez, coloque efeitos visuais, 3D, se exalte" — ver também Cardume, feito junto.

## Deploy (Cloudflare Workers)

Worker `torno`, em `https://torno.fenoninho-max.workers.dev`. `npm run deploy`.

`.npmrc` com `legacy-peer-deps=true`: sem ele o `npm install` tenta resolver os peers opcionais do React Three Fiber (Expo/React Native) e quebra com ERESOLVE.

## O esqueleto — o site é o torno

Não tem seção, nem hero, nem rolagem: a tela inteira é um torno de oleiro em 3D (`cena/Atelie.tsx`) com um bloco de barro girando, e um painel com 3 etapas de verdade (por isso numeradas): **Moldar → Esmaltar → Queimar**. A peça que a pessoa faz vira a mensagem de inscrição na aula (medidas + esmalte + turma).

- **Moldar** (`Maos` em Atelie.tsx): arrastar perto da silhueta faz o barro seguir o dedo naquela altura, com queda gaussiana pros lados (pressão da mão) + uma passada leve de suavização. Começar a arrastada perto da borda de cima estica/achata a altura. Raycast num plano `z = 0` que contém o eixo do torno. Formas prontas (Vaso/Tigela/Caneca) animam o perfil até o alvo em vez de pular.
- **Esmaltar**: esmalte cru é mostrado claro e fosco (cor misturada com branco, rugosidade ~1) — a cor de verdade só aparece no forno, como na vida real. A cor de destaque da **interface inteira** vira a do esmalte escolhido (`--color-glaze`/`--color-on-glaze`, trocadas em App.tsx).
- **Queimar**: timeline GSAP (App.tsx) anima o objeto `forno` (`frente`, `calor`, `temperatura`). O estúdio apaga (`Iluminacao`: fundo, luzes e `scene.environmentIntensity` caem com o calor), a peça emite acima de 1.0 → bloom de verdade, e a cor da brasa desce de amarelo-laranja pra vermelho enquanto esfria. Uma frente de fogo sobe convertendo esmalte cru em vítreo, marcada por um anel incandescente.

### Geometria (`cena/geometria.ts`)

Superfície de revolução feita à mão em vez de `LatheGeometry` (recriar geometria 60×/s alocaria memória sem parar): o buffer é criado uma vez e só posições/normais são reescritas. Layout de vértices e ordem de índices iguais aos do LatheGeometry do three (perfil subindo pela parede externa = face externa pra fora). Perfil tem parede com espessura (7 mm), borda em arco, fundo interno e **quina viva no pé** (ponto duplicado com normais diferentes). Normais analíticas (tangente do perfil girada), não `computeVertexNormals` — que deixaria costura. Ondulação senoidal = marcas dos dedos do torno.

### Quatro materiais, uma geometria, planos de recorte

A mesma geometria é desenhada por 4 malhas recortadas por `clippingPlanes` horizontais (world space — o giro é só em Y, então não altera a altura): barro molhado (só na etapa Moldar), **pé sem esmalte** (abaixo de `PE`, vira biscoito claro no forno — como no ateliê de verdade), esmalte cru (acima da frente de fogo) e esmalte queimado (`MeshPhysicalMaterial` com clearcoat, entre o pé e a frente). `gl.localClippingEnabled = true` no `onCreated`.

### Estado fora do React (`estado.ts`)

O perfil (`peca.raio`, Float32Array) e o forno são objetos mutáveis compartilhados — a cena lê/escreve a 60 fps; a interface só consulta (medidas a cada 150 ms, termômetro por rAF escrevendo direto no DOM). Se fosse estado React, cada arrastada re-renderizaria tudo.

## Gotchas

- **`@react-three/postprocessing` desliga o tone mapping do renderer** (`gl.toneMapping = NoToneMapping`) — por isso tem um `<ToneMapping>` ACES como efeito final. É isso que deixa emissão > 1.0 virar bloom antes do tone mapping.
- **Nada de overlay DOM com `mix-blend-mode` por cima do canvas**: a primeira versão escurecia o "forno" com um div `mix-blend-multiply` — obrigava recompor a tela inteira a cada quadro. O escurecimento agora é dentro da cena.
- **Título durante a queima**: clareia seguindo `forno.calor` (rAF em App.tsx), não a etapa — no começo e no fim da queima o fundo ainda está claro.
- **Teste headless**: WebGL por SwiftShader roda a ~4 fps, e o GSAP (lagSmoothing) anda devagar — o print sai atrasado. Pra capturar um instante da queima, expor a timeline temporariamente e pausá-la. **Cuidado:** `page.evaluate(() => tl.pause())` trava o Puppeteer — `pause()` retorna a própria timeline e o Puppeteer tenta serializar esse grafo circular gigante. Usar chaves: `page.evaluate(() => { tl.pause() })`.
- Painel lateral × folha embaixo: `lateral.ts` (desktop, ou tablet deitado ≥ 768 px). A cena usa a mesma regra pra deslocar a câmera (não a peça — o plano de moldar continua no eixo).

## Referência visual

Paleta: `--color-gesso` #e8e4dd (estúdio), `--color-folha` #f6f4f0 (painel), `--color-barro` #8e877d (grés cru — cinza, não terracota: foge do clichê creme+terracota e é mais fiel ao grés), `--color-ink` #1d1b18. Esmaltes em `data.ts` (cobalto, celadon, tenmoku, shino, óxido), cada um com `onCor` validado ≥ 6:1. Fontes: **Young Serif** (títulos — serifa pesada e mole, lembra barro torneado) + **Hanken Grotesk** (interface) — nenhuma das duas usada em outro projeto do repositório.

Textura de "pintas de ferro" do grés gerada em canvas (`cena/texturas.ts`), multiplicando a cor de todos os materiais da peça; cabeça do torno com anéis e manchas de barbotina pra o giro ficar visível numa peça simétrica.
