# Taça (conceito)

Site-conceito da Madolio pro nicho de vinícola de altitude. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única, com rolagem.

**Redesenhado três vezes.** V1: taça 3D servindo vinho ao vivo — rejeitada ("a ideia da taça girando em 3d n curti"). V2: corte transversal da encosta com os rótulos ancorados na altitude real de cada talhão. V3 (esta): o usuário rejeitou a v2 inteira também — "a mesma coisa do calibre, n curti nada" — pedindo pra trocar de novo, mantendo só o nicho (vinícola de altitude).

## Deploy (Cloudflare Workers)

Worker `taca`, em `https://taca.fenoninho-max.workers.dev`. `npm run deploy`.

## O conceito v3: a roda de aromas é a navegação/catálogo

`Encosta.tsx` (o corte transversal, com curvas de nível e neblina animada) saiu por completo — não ficou como código morto. No lugar: **`RodaAromas.tsx`**, uma roda de aromas de sommelier de verdade (a ferramenta real que se usa numa degustação pra nomear o que se está sentindo no copo), dividida em 6 categorias (Fruta escura, Cítrico, Mineral, Torrado, Amadeirado, Especiado). Clicar numa fatia filtra a lista de rótulos pra mostrar só os que têm aquele aroma — em vez dos quatro rótulos sempre visíveis de uma vez.

**Nenhum dado novo inventado:** cada categoria da roda já estava escrita na nota de degustação de algum rótulo (`data/vinhos.ts`, campo `notas`) — só foi extraído em tags estruturadas (`aromas: string[]`). Ex.: "14 meses em carvalho francês" → `Amadeirado` + `Especiado`; "Cítrico e mineral" → `Cítrico` + `Mineral`. A roda não é decoração, é o mesmo texto reorganizado como filtro.

**Técnica:** cada fatia é um `<path>` de arco SVG (`fatia(inicio, fim)`, trigonometria simples — mesmo padrão de `ponto()` usado em outros conceitos do repositório pra converter ângulo+raio em coordenada), clicável, com toggle (clicar de novo ou no botão "Ver todos os rótulos" reseta o filtro). A altitude de cada talhão (`vinhos[].altitude`) continua existindo no dado e aparece na lista de rótulos, só não é mais o eixo visual principal da página.

`Processo.tsx` (as seis etapas "da parreira à taça") e `Contato.tsx` não mudaram — não tinham relação com a ilustração da encosta, então não precisavam ser refeitos.

## Paleta e tipografia — mantidas

Fontes (**Newsreader** + **Manrope**) e paleta principal (parchment/garnet/sage/dusk) continuam as mesmas da v2 — o usuário não reclamou de cor, só do conceito visual do hero/catálogo. Os tokens `--color-soil`/`--color-soil-light`/`--color-mist`, que só existiam pra desenhar a encosta e a neblina, saíram do `index.css` junto com `Encosta.tsx`.

## Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo)

Depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.
