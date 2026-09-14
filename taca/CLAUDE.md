# Taça (conceito)

Site-conceito da Madolio pro nicho de vinícola de altitude. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única, com rolagem.

**Redesenhado duas vezes.** A primeira vez fundiu hero + catálogo (`Hero.tsx`/`Catalogo.tsx`/`Rotulo.tsx` viraram `Prova.tsx`, a pedido de "reformule a do vinho, inove nela"). A segunda vez — esta — trocou o conceito inteiro do hero: o usuário testou o site e voltou com "a ideia da taça girando em 3d n curti, busca outra, mas genérico ficou u, pouco". Ou seja: não era um problema de polimento, era o conceito em si (a taça 3D que servia o vinho ao vivo) que não convenceu, **e** o resto da página tinha ficado genérico o bastante pra também incomodar. `Prova.tsx` e toda a cena 3D (`cena/Vitrine.tsx`, `cena/Vinhedo.tsx`, `cena/geometria.ts`, `cena/texturas.ts`, `estado.ts`) foram removidos por completo — não deixados como código morto, nem GSAP/React Three Fiber/Three.js/postprocessing como dependência morta no `package.json` (o `.npmrc` com `legacy-peer-deps=true`, que só existia por causa dos peers opcionais de Expo do R3F, também saiu). O bundle caiu de ~1,28 MB pra 232 KB só com essa remoção.

## Deploy (Cloudflare Workers)

Worker `taca`, em `https://taca.fenoninho-max.workers.dev`. `npm run deploy`.

## O conceito novo: a encosta é o catálogo

Antes de redesenhar, voltei ao que a marca já tinha de específico: os rótulos já se chamavam `Talhão Sul`, `Encosta Brut`, `Névoa`, `Reserva do Talhador` — nomes que já sugeriam terreno e altitude, só que a vitrine (a taça 3D) não tinha nada a ver com isso. `Encosta.tsx` literaliza a frase "vinícola de altitude": um corte transversal da encosta, desenhado em SVG (não WebGL — é ilustração 2D, leve, sem Canvas/GPU), com os quatro rótulos ancorados na altitude real do talhão de cada um (`vinhos[].altitude`, em metros — dado novo que substituiu `cor`+`nivel`, que só faziam sentido pra simular líquido numa taça 3D).

Isso não é decoração — plantar em curva de nível é uma técnica real de vinhedo de encosta (evita erosão), então as "carreiras" desenhadas por baixo da crista (`carreiras` em `Encosta.tsx`, cópias do mesmo traçado deslocadas em Y) representam algo verdadeiro sobre como um vinhedo de altitude é plantado, não é só textura. A neblina no canto superior direito (`radialGradient#neblina`) também não é atmosfera gratuita: reforça por que `Névoa` (o rótulo mais alto, 1180 m) tem a acidez que o nome promete — "o frio da altitude segura a acidez", já estava no texto do rótulo, a neblina só torna isso visível. As linhas de grade com "1000 m"/"1100 m"/"1200 m" à esquerda dão escala de verdade ao desenho, como um gráfico de elevação de trilha — não são um enfeite tipo textura topográfica genérica.

**Técnica:** o traçado da crista é um array de pontos com controles de curva Bézier (`crista` em `Encosta.tsx`), convertido em `d` de `<path>` por `caminhoCrista(deslocY)`. Os quatro marcadores usam os MESMOS pontos que formam a curva (`pontos`), então cada bolinha já nasce em cima da crista, na altitude certa — não é preciso alinhar duas fontes de verdade separadas. O SVG é puramente decorativo (`aria-hidden`); os marcadores são `<button>` HTML de verdade, posicionados por `%` sobre um container com `aspect-ratio: 1200/480` idêntico ao `viewBox` — isso é o que garante que a posição em `%` bate exatamente com a posição no desenho, em qualquer largura de tela, sem recalcular nada em JS.

A lista de rótulos abaixo do desenho (herdada da versão anterior, mantida porque já funcionava bem: nome, uva+safra, preço, notas ao selecionar) agora também mostra a altitude por extenso, e compartilha o mesmo `useState` de seleção com os marcadores do desenho — tocar num marcador ou na lista faz a mesma coisa. Isso dá duas formas de escolher (uma espacial, uma convencional), sem depender só do desenho pra quem prefere/precisa de uma lista simples.

## Paleta e tipografia — trocadas, não só reaproveitadas

`--font-heading` trocou de Spectral pra **Newsreader** — a Spectral já era usada pelo Âncora (`ancora/src/index.css`), então mesmo que a nota antiga deste arquivo dissesse "combinação não usada em nenhum outro projeto", isso não era mais verdade. Newsreader também tem uma cara mais de "relatório de campo/observação científica" que combina com o desenho de corte transversal, sem copiar a Fraunces (já usada pelo Traço).

Dois tokens de cor novos, específicos do desenho: `--color-soil` #4a3c28 e `--color-soil-light` #6b5636 (terra da encosta, tom claro o bastante pra se destacar do `--color-dusk` #241832 de fundo — silhueta de terra contra céu de noite, não duas cores escondidas uma atrás da outra) e `--color-mist` #cdd6da (neblina, baixa opacidade). O resto da paleta (parchment/garnet/sage/dusk) continua — não era o problema apontado, e já eram cores literais (garnet é cor de vinho de verdade, não um accent arbitrário).

## Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo)

Depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.
