# Ressoa (conceito)

Site-conceito da Madolio pro nicho de **luteria de precisão** (violão, viola
caipira, ukulele sob encomenda). **Oficina fictícia** — não existe. Vite +
React 19 + TypeScript + Tailwind v4 + GSAP (`Reveal.tsx`) + Web Audio API
nativa. Página única.

## Deploy (Cloudflare Workers)

Worker `luthier`, em `https://luthier.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Lugar/objeto real:** laboratório de acústica — bancada de medição, modos
  de vibração, figuras de areia de Chladni se formando numa placa vibrante,
  instrumentação tipo osciloscópio. Não uma oficina rústica empoeirada.
- **Emoção em 3s:** ressonância / algo vivo — a sensação de que a página
  ressoa e é genuinamente viva; algo tocou nela e ela soou.
- **Colisão:** luteria × cartografia/mapa topográfico — linhas de contorno
  aplicadas a mapear vibração: a figura de Chladni é literalmente um mapa
  topográfico de onde a placa se move e onde ela fica parada.
- **Nunca parecer:** loja de instrumentos genérica (violão brilhante em fundo
  branco, etiqueta de preço, "compre agora") nem site de artesanato clichê
  (textura de madeira rústica, fonte cursiva, "feito à mão com carinho" sem
  dado real por trás).

## O wildcard: o site soa de verdade

`src/audio/karplusStrong.ts` implementa **Karplus-Strong** de verdade: um
buffer de excitação (ruído branco do tamanho `sampleRate / f`) realimentado
através de um filtro de média móvel com perda (`amortecimento`), a técnica
real de modelagem física de corda dedilhada (Kevin Karplus e Alex Strong,
1983) — não uma amostra gravada, não uma onda decorativa. A saída é escrita
amostra a amostra num `Float32Array`, copiada pra um `AudioBuffer` real via
`getChannelData(0).set(...)` e tocada com `AudioBufferSourceNode` — sem
`AudioWorklet` (não era necessário: gerar ~2,5 s de áudio síncrono num loop
de algumas dezenas de milhares de iterações é barato o bastante pra rodar no
clique, sem latência perceptível).

A frequência que alimenta a síntese vem da **fórmula real de Mersenne**:

```
f = (1 / (2L)) · √(T / μ)
```

`L` = comprimento vibrante da corda (m), `T` = tensão (N), `μ` = densidade
linear (kg/m, = densidade do material × área da seção transversal). No
laboratório (`Laboratorio.tsx`), o visitante controla **L** (comprimento de
escala, 340–660 mm — cobre de ukulele soprano a violão clássico) e a
**bitola** (diâmetro da corda, 0,30–1,10 mm, corda de náilon, densidade real
1140 kg/m³). A tensão é fixada em 80 N (meio da faixa real de 70–90 N por
corda em violão clássico afinado), pra isolar o efeito dos dois parâmetros
controláveis. A **madeira do corpo** não entra na fórmula de frequência —
afeta o coeficiente de amortecimento do filtro Karplus-Strong (sustain/
timbre), seguindo o comportamento real documentado em luteria (madeira mais
densa reflete mais energia e sustenta o som por mais tempo; madeira mais
macia absorve mais e responde mais rápido) — isso é uma aproximação didática
explícita, documentada como tal no código (`data/materiais.ts`), não uma
medição de amortecimento acústico real.

## O contorno: Chladni como mapa topográfico

`Chladni.tsx` aproxima uma figura de Chladni numa placa quadrada por
superposição de modos (estilo Ritz):

```
Z(x, y) = cos(nπx)·cos(mπy) − cos(mπx)·cos(nπy)
```

As linhas onde `Z ≈ 0` são as linhas nodais — exatamente onde a areia real
se acumula numa placa de Chladni vibrando, porque ali o deslocamento é zero.
Os números de modo `(n, m)` são derivados deterministicamente da frequência
que está tocando (`modosDaFrequencia`), então mudar o comprimento de escala
ou a bitola muda a frequência, que muda os modos, que muda o padrão
desenhado — não é uma animação pré-gravada. As linhas nodais são desenhadas
como um grid de retângulos (não uma imagem rasterizada estática), no
vocabulário visual de curva de nível topográfica pedido no Vibe Discovery.

## Movimento contínuo (contra "página morta")

O hero (`Hero.tsx`) tem uma animação contínua de verdade — três senoides
sobrepostas com fases e frequências diferentes desenhadas por
`requestAnimationFrame`, simulando harmônicos de uma corda se sobrepondo —
não um fade estático de entrada. `StringWave.tsx` (na bancada) desenha a
corda com amplitude decaindo exponencialmente enquanto o pluck de
Karplus-Strong está soando, sincronizada com a mesma frequência calculada.
Ambas respeitam `prefers-reduced-motion: reduce` (renderizam um único frame
estático em vez de rodar o loop de animação).

## Áudio: opt-in, nunca surpresa

O `AudioContext` só é criado dentro do handler de clique do botão "Dedilhar
corda" (exigência de gesto do usuário que todo navegador impõe, e que o site
respeita por design, não só por obrigação). Existe botão "Silenciar" (para
a corda tocando) e um toggle "Som ativado/desativado" que bloqueia novos
pulsos enquanto ligado — controle claro, opt-in por interação, nunca
autoplay.

## Referência visual

Paleta: `--color-grafite` #12191c (grafite quase-preto, fundo/texto
principal — cor de gabinete de osciloscópio), `--color-painel` #1a2327
(painel/card, um tom acima do fundo), `--color-osso` #f3ede1 (osso/creme,
texto sobre fundo escuro e superfícies claras), `--color-fosforo` #5ffbc0
(verde-fósforo, o traço do osciloscópio — acento primário/CTA/linhas
nodais), `--color-cobre` #b5693a (cobre/tonewood, acento secundário).
Nenhum desses cinco hex aparece em nenhum `index.css` dos outros 32 projetos
do repositório (conferido via grep de `--color-` em todos os
`*/src/index.css` antes de fechar a paleta).

Fontes: **Fraunces** (display — serifa com eixo óptico, evoca gravação de
precisão em instrumento) + **Albert Sans** (corpo — grotesca geométrica
limpa) + **Fira Code** (rótulos/valores numéricos da bancada — fonte
monoespaçada de leitura técnica, tipo instrumentação de laboratório). As
três foram conferidas contra todo `family=` usado em `*/index.html` do
repositório (Fraunces, Albert Sans e Fira Code não apareciam em nenhum
outro projeto) e o trio como combinação também é inédito.

## Depoimentos e dúvidas frequentes

`Depoimentos.tsx` e `Faq.tsx`, adicionados depois do lançamento inicial,
entram na composição entre `Encomendas` e `Contato`. Nenhum dos dois toca
`Hero.tsx`, o wildcard de síntese de corda ou os tokens de cor/fonte de
`index.css` — reaproveitam `rotulo-mono`, `font-display` e a paleta
grafite/osso/fósforo/cobre já existentes.

`Depoimentos.tsx` traz três depoimentos fictícios (nome + inicial do
sobrenome) amarrados a serviços reais descritos no site (regulagem de
ação/oitavação, restauro de leque harmônico, encomenda com escolha de
madeira por amostra tocada), no registro de instrumentação de laboratório
em vez de elogio genérico.

`Faq.tsx` é um acordeão acessível (`aria-expanded` + `aria-controls` no
botão, `role="region"` no painel, operável por teclado, sem depender de
JS de terceiros) com 6 perguntas de pré-venda: prazo de construção, escolha
de madeira, prazo de reparo vs. instrumento novo, regulagem de ação/afinação
em instrumento de fora, garantia de instrumento novo e restauro de vintage.

## Decisões

- Owner fictício: **Otávio Kessler**, luteria em São Bento do Sul/SC — polo
  real de marcenaria e trabalho fino em madeira no sul do Brasil, coerente
  com o perfil de oficina de precisão.
- Nome jacarandá-da-índia (Dalbergia latifolia) usado deliberadamente em vez
  de jacarandá-da-bahia (Dalbergia nigra), que é protegido por CITES desde
  1992 — fato real pesquisado, citado tanto na ficha de madeira do
  laboratório quanto na seção de encomendas.
- Tensão de corda fixada em 80 N (não controlável) pra manter o formulário
  de 3 parâmetros pedido (escala, bitola, madeira) sem um quarto slider que
  competiria por atenção — decisão de escopo, documentada aqui caso um
  próximo ajuste queira liberar a tensão também.
- Karplus-Strong implementado com buffer síncrono em vez de `AudioWorklet`:
  mais simples, sem thread de áudio separada, e suficiente porque o pulso
  inteiro (2,5 s) é gerado de uma vez antes de tocar — não haveria ganho de
  latência num `AudioWorklet` aqui, já que não é streaming contínuo.
