# Taça (conceito)

Site-conceito da Madolio pro nicho de vinícola de altitude. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + React Three Fiber. Página única, com rolagem.

## Deploy (Cloudflare Workers)

Worker `taca`, em `https://taca.fenoninho-max.workers.dev`. `npm run deploy`. Tem `.npmrc` com `legacy-peer-deps=true` (mesmo motivo do Torno/Cardume/Calibre: peers opcionais de Expo do React Three Fiber).

## A cena: arraste a taça, o vinho gira de verdade

`src/cena/Vitrine.tsx` monta a taça (`geometria.ts`, `criarTaca()` — um único perfil revolvido em `LatheGeometry`, do pé ao aro) e o vinho por dentro (`criarVinho()`, o mesmo perfil recortado só na região do bojo e encolhido pra caber dentro da parede). Como as duas geometrias são cascas de espessura zero (não sólidos), o vinho fica visível através do "vidro" sem precisar modelar parede dupla.

**Gotcha sério — `MeshTransmissionMaterial` do drei quebrou em teste (renderizava a taça inteira preta, sem transmitir nada)** sob o Chrome headless/SwiftShader usado pros screenshots automatizados deste repo; não dava pra confirmar se funcionaria de verdade nem em navegador com GPU real sem esse teste. Trocado por `meshPhysicalMaterial` comum com `transparent + opacity baixa + clearcoat` — sem depender do passe de render-to-texture que a transmissão de verdade exige, então funciona em qualquer lugar, ao custo de um vidro menos fisicamente correto (mas ainda convincente com os reflexos do `Environment`).

**Gotcha de ordem de transparência:** com vinho e taça como duas malhas transparentes sobrepostas, a ordem de desenho do WebGL (por padrão, do centro da bounding box mais distante pro mais próximo) às vezes desenhava a taça por cima do vinho e escondia ele. Corrigido com `renderOrder` explícito (vinho 1 → taça 2 → parede de lágrimas 3) e `depthWrite={false}` na taça, pra ela nunca ocluir o que está atrás.

**A interação inteira é arrastar** (`Hero.tsx` captura o gesto de ponteiro, escreve direto em `estado.ts` — nunca em `useState`, o giro muda a cada quadro): arrastar pro lado gira a taça (`taca.angulo`); soltar mantém a velocidade e ela desacelera sozinha por atrito. O vinho por dentro **atrasa** em relação à taça — um filtro passa-baixa simples em `Vitrine.tsx` (`vinhoRotacao` persegue `taca.angulo` a cada quadro) — física de mentirinha, mas dá exatamente a sensação de líquido continuando a girar depois que sua mão já parou.

Depois de um giro forte (`taca.velocidade` acima de 0.7 rad/s), `taca.pernas` sobe pra 1 e decai devagar: uma parede fina logo acima do vinho (`criarParedeLagrimas()`) recebe uma textura de estrias verticais (`texturaLagrimas()`) cuja opacidade segue esse valor. **Gotcha de textura:** a primeira versão das estrias (finas, 1.5–5px numa textura 512×256) simplesmente sumia — a região da tela onde a parede aparece é pequena o bastante pra mipmapping/minificação borrar detalhe fino até virar quase nada. Corrigido com estrias bem mais largas (6–14px) e `generateMipmaps = false` na textura.

## O fundo nunca é foto

`Vinhedo.tsx`: céu em cor-por-vértice (gradiente do topo escuro ao horizonte alaranjado, sem luz incidindo — só `MeshBasicMaterial vertexColors`), três cristas de morro em `ShapeGeometry` cada vez mais claras e mais longe (perspectiva aérea), fileiras de parreiral (cones minúsculos repetidos) na crista mais próxima. Tudo silhueta, nada texturizado como paisagem realista.

## Sequência real → numeração

`Processo.tsx` numera as seis etapas (colheita → prensagem → fermentação → estágio em carvalho → engarrafamento → decantação) porque são, de fato, sempre nessa ordem — a última etapa, de propósito, acontece fora da vinícola ("na sua taça"), fechando o conceito do hero.

## Catálogo sem foto de garrafa

`Rotulo.tsx` desenha, em SVG, a mesma linha de horizonte de serra do fundo da cena 3D — reduzida a três traços — como assinatura visual repetida em cada rótulo do catálogo (`Catalogo.tsx`). Mesmo espírito do Encaixe (desenho técnico) e do Calibre (mostrador em SVG): nenhuma foto de produto no site inteiro.

## Referência visual

Paleta: `--color-parchment` #f3ecdd (fundo das seções de conteúdo, tom de rótulo de vinho) + `--color-dusk` #241832 (fundo do hero 3D, entardecer de serra) + `--color-garnet` #7a1030 (vinho — cor de verdade, não um "accent" arbitrário) + `--color-sage` #7c8c5b (verde de parreiral, só nos números do processo). Fontes: **Spectral** (títulos, itálico reservado pros nomes de rótulo) + **Manrope** (interface) — combinação não usada em nenhum outro projeto do repositório.

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.
