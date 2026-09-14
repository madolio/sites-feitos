# Taça (conceito)

Site-conceito da Madolio pro nicho de vinícola de altitude. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + React Three Fiber. Página única, com rolagem.

**Redesenhado uma vez** (a pedido explícito do usuário: "reformule a do vinho, inove nela"). A primeira versão tinha hero 3D + catálogo de rótulos em SVG como seções separadas; a atual funde as duas — ver `Prova.tsx` abaixo. A versão antiga (`Hero.tsx`, `Catalogo.tsx`, `Rotulo.tsx`) foi removida, não deixada como código morto.

## Deploy (Cloudflare Workers)

Worker `taca`, em `https://taca.fenoninho-max.workers.dev`. `npm run deploy`. Tem `.npmrc` com `legacy-peer-deps=true` (mesmo motivo do Torno/Cardume/Calibre: peers opcionais de Expo do React Three Fiber).

## O conceito: a lista de rótulos SERVE a taça, ao vivo

`Prova.tsx` funde o que antes eram duas seções (hero + catálogo) numa só: a cena 3D fica fixa (`lg:sticky`) ao lado de uma lista de rótulos, e tocar num nome não leva a lugar nenhum — **serve aquele vinho na mesma taça**, na hora. Nenhum outro projeto do portfólio tem catálogo "ao vivo" (Encaixe e Calibre mostram desenho técnico/SVG estático); aqui o catálogo é a própria cena reagindo.

`estado.ts` guarda a intenção (`vinho.corProxima`, `vinho.nivelProximo`, `vinho.fase`) escrita por `servir()` quando alguém toca num rótulo. A cena (`cena/Vitrine.tsx`) nunca troca de cor OU de nível de repente: sempre **drena primeiro** (fase `'drenando'`, nível cai até quase o fundo), só troca `corAlvo`/`nivelAlvo` quando a taça já está quase vazia, e então **enche de novo** (fase `'enchendo'`) com a cor e a medida do rótulo novo. O nível de "quase vazio" (`NIVEL_VAZIO`) deixa uma poça mínima visível no fundo, de propósito — taça vazia de verdade não fica com o vidro seco.

**Técnica: plano de recorte (clipping), não geometria nova a cada troca.** A parede do vinho é gerada uma vez só, cheia, do fundo do bojo até o nível máximo possível; o "nível atual" é simulado com `material.clippingPlanes` (um `THREE.Plane` horizontal cujo `.constant` sobe e desce a cada quadro) — corta a parte acima do nível sem recriar a malha. A superfície do vinho (o disco que fecha o topo) acompanha por fora: sua posição em Y e sua escala (`raioNaAltura(nível atual) / raioNaAltura(nível máximo)`) seguem o mesmo valor, pra parecer o mesmo líquido erguendo, não um clone. Precisa de `gl.localClippingEnabled = true` no `onCreated` do `Canvas` — sem isso os planos de recorte são ignorados em silêncio.

**Gotcha sério de animação — passo de quadro sem trava.** A primeira versão desse "drena → enche" usava `nivelAtual += (alvo - nivelAtual) * Math.min(1, delta * k)` direto, sem limitar `delta`. Sob Chrome headless/SwiftShader (o ambiente de screenshot automatizado deste repo), os quadros vêm lentos e irregulares — um único quadro com `delta` de meio segundo faz `delta*k` estourar 1, e a animação **pula direto pro alvo num só quadro**, em vez de suavizar. Descoberto testando a troca de rótulo (a cor mudava instantaneamente, sem a taça visivelmente drenar antes). Corrigido travando `delta` em 50ms no topo do `useFrame` antes de qualquer cálculo de interpolação — mesmo um quadro real muito lento nunca causa mais que um passo pequeno.

**Gotcha sério anterior — `MeshTransmissionMaterial` do drei quebrou em teste** (renderizava a taça inteira preta, sem transmitir nada) sob o mesmo Chrome headless/SwiftShader. Trocado por `meshPhysicalMaterial` comum com `transparent + opacity baixa + clearcoat` — sem depender do passe de render-to-texture que a transmissão de verdade exige, então funciona em qualquer lugar, ao custo de um vidro menos fisicamente correto (mas ainda convincente com os reflexos do `Environment`).

**Gotcha de ordem de transparência:** com vinho e taça como duas malhas transparentes sobrepostas, a ordem de desenho do WebGL (por padrão, do centro da bounding box mais distante pro mais próximo) às vezes desenhava a taça por cima do vinho e escondia ele. Corrigido com `renderOrder` explícito (vinho 1 → taça 2 → parede de lágrimas 3) e `depthWrite={false}` na taça, pra ela nunca ocluir o que está atrás.

**Girar continua funcionando o tempo todo**, inclusive durante o "servir" (`Prova.tsx` captura o gesto de ponteiro, escreve direto em `estado.ts` — nunca em `useState`): arrastar pro lado gira a taça (`taca.angulo`); soltar mantém a velocidade e ela desacelera sozinha por atrito. O vinho por dentro **atrasa** em relação à taça — um filtro passa-baixa simples (`vinhoRotacao` persegue `taca.angulo` a cada quadro) — física de mentirinha, mas dá a sensação de líquido continuando a girar depois que a mão já parou.

Depois de um giro forte (`taca.velocidade` acima de 0.7 rad/s), `taca.pernas` sobe pra 1 e decai devagar: uma parede fina logo acima do vinho (`criarParedeLagrimas()`) recebe uma textura de estrias verticais (`texturaLagrimas()`) cuja opacidade segue esse valor. **Gotcha de textura:** a primeira versão das estrias (finas, 1.5–5px numa textura 512×256) simplesmente sumia — a região da tela onde a parede aparece é pequena o bastante pra mipmapping/minificação borrar detalhe fino até virar quase nada. Corrigido com estrias bem mais largas (6–14px) e `generateMipmaps = false` na textura.

## O fundo nunca é foto

`Vinhedo.tsx`: céu em cor-por-vértice (gradiente do topo escuro ao horizonte alaranjado, sem luz incidindo — só `MeshBasicMaterial vertexColors`), três cristas de morro em `ShapeGeometry` cada vez mais claras e mais longe (perspectiva aérea), fileiras de parreiral (cones minúsculos repetidos) na crista mais próxima. Tudo silhueta, nada texturizado como paisagem realista.

## Sequência real → numeração

`Processo.tsx` numera as seis etapas (colheita → prensagem → fermentação → estágio em carvalho → engarrafamento → decantação) porque são, de fato, sempre nessa ordem — a última etapa, de propósito, acontece fora da vinícola ("na sua taça"), fechando o conceito do hero.

## Referência visual

Paleta: `--color-parchment` #f3ecdd (fundo de Processo/Contato, tom de rótulo de vinho) + `--color-dusk` #241832 (fundo da seção Prova inteira agora, não só do hero — o painel de rótulos também é escuro) + `--color-garnet` #7a1030 (vinho tinto — cor de verdade, não um "accent" arbitrário) + `--color-garnet-light` #d68aa0 (mesma família, clara o bastante pra texto sobre `--color-dusk`) + `--color-sage` #7c8c5b (verde de parreiral, só nos números do processo). Fontes: **Spectral** (títulos, itálico reservado pros nomes de rótulo) + **Manrope** (interface) — combinação não usada em nenhum outro projeto do repositório.

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.
