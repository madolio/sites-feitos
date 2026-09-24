# Prisma (conceito)

Site-conceito da Madolio pro nicho de **joalheria sob medida**. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + Three.js/@react-three/fiber + GSAP (Reveal). Página única.

Terceiro projeto do portfólio com WebGL de verdade (depois de Cardume e Torno) — a gema no hero usa física real de refração, não brilho decorativo.

## Deploy (Cloudflare Workers)

Worker `prisma`, em `https://prisma.sneakpeek.workers.dev`. `npm run deploy`.

## A gema — índice de refração real, não "por olho"

`data/gemas.ts` tem o IOR (índice de refração) e a dispersão reais de cada pedra, de tabela gemológica — o mesmo número que um refratômetro de gemólogo mede. `cena/Gema.tsx` usa `MeshTransmissionMaterial` (drei) com `ior={gema.ior}` e `chromaticAberration` proporcional à dispersão real — o diamante (IOR 2,417, a maior desta lista) refrata visivelmente mais que a ametista (IOR 1,544). A geometria é um octaedro simplificado (não uma lapidação de 50+ facetas): o ponto é a física do material, não a geometria do corte.

## v2: configurador de peça, não só a gema sozinha

Primeira versão mostrava só a gema (um octaedro gigante) girando isolada no hero — o usuário achou a interatividade fraca e o visual estranho ("diamantão gigante horrendo"). Reformulado pra um configurador de verdade: `data/pecas.ts` (anel/colar/brincos) + `cena/Joia.tsx` monta a geometria de cada peça (aro de ouro real via `torusGeometry`, bail, tarraxa de brinco) com a `<Gema>` encaixada nela em escala pequena e proporcional — nunca mais a gema sozinha ocupando a tela. `Hero.tsx` põe o seletor de peça direto sobre a vitrine (visível sem rolar a página) e a `Vitrine.tsx` usa `OrbitControls` (`enableZoom={false}`, `enablePan={false}`, `autoRotate`) pra permitir arrastar e girar a peça manualmente — a interatividade principal não depende mais de rolar até o catálogo.

**Gotcha de proporção**: ajustar câmera/escala de uma cena Three.js "no escuro" (sem olhar o resultado) erra fácil — a primeira tentativa pós-reformulação tinha a gema flutuando longe da peça, o brinco com o "gancho" renderizado como blob (rotation passada como prop de `<cylinderGeometry>` em vez de no `<mesh>`) e a câmera errada deixando tudo gigante ou minúsculo dependendo da peça. Corrigido só depois de testar visualmente cada uma das 3 peças com screenshot real (Playwright), não confiando só na leitura do código.

## v3: brincos → pulseira cravejada, e Hero em duas colunas

Usuário mandou foto de referência de um "tennis bracelet" (fileira de pedras encastoadas, não um solitário) — trocamos "Brincos" por "Pulseira" (`Pulseira` em `cena/Joia.tsx`): 15 gemas pequenas em torno de um aro fino prateado, com vão e fecho de um lado. Depois de testar na home, a composição centrada/simétrica ficava pequena e sem graça — ajustada com escala maior, deslocamento pra esquerda e rotação diagonal em Z, pra abrir mais como a foto de referência (fecho de um lado, pedras se espalhando pro outro).

`Hero.tsx` foi reformulado de "canvas full-bleed com seletor flutuando por cima" pra duas colunas: joia à esquerda (`Vitrine`), escolha de peça + pedra à direita — texto e controles não competem mais com o 3D, e sobra espaço pra crescer (mais peças, mais gemas, mais um bloco) sem esmagar a vitrine. A seleção de pedra agora existe em dois lugares (Hero, rápida; `Catalogo` mais abaixo, com a ficha técnica completa de IOR/dispersão/dureza) — de propósito, não duplicação por descuido.

**Gotcha de aspect ratio**: o canvas do Colar (correntes em V bem largas) foi calibrado pra um canvas full-width; na coluna estreita (metade da tela no desktop), a mesma câmera fixa deixa o colar meio grande/cortado nas bordas por causa do FOV vertical fixo do Three.js — funcional, mas não é o enquadramento ideal; ajuste futuro seria recalcular a câmera com base no aspect ratio real do canvas, não um valor fixo pensado pra tela cheia.

Depois da mudança pra duas colunas, a pulseira (única peça com `position`/`scale` fixos calibrados pra tela cheia) ficou grande e deslocada, cortando o cabeçalho — removido o deslocamento manual e reduzida a escala (`0.8`) pra caber centralizada dentro da coluna estreita. Lição: qualquer offset/escala hardcoded numa cena 3D fica amarrado ao layout do momento — mudar o layout ao redor exige reconferir visualmente cada peça, não só a que motivou a mudança.

## v4: `Catalogo` (fichas de gema) removido — duplicava a escolha do Hero

Depois da v3 (seleção de pedra também no Hero), a seção "Escolha a gema" abaixo (`Catalogo.tsx`, cards clicáveis com IOR/dispersão/dureza) virou uma escolha redundante — mesma ação, dois lugares. Removida e substituída por `Medida.tsx`: uma calculadora de aro que usa geometria pura (circunferência ÷ π = diâmetro) e a aproximação real que joalherias usam pra estimar o aro brasileiro (aro ≈ diâmetro em mm − 11,6, explicitamente rotulada como estimativa, não substituindo o anelímetro físico). Segue o mesmo padrão do resto do portfólio: toda calculadora usa fórmula real, nunca um número decorativo.

## Bug real encontrado e corrigido: stagger + ScrollTrigger `once` em botões

`Catalogo.tsx` originalmente envolvia a grade de 6 botões (as gemas) num único `<Reveal stagger={0.06}>`, igual ao padrão usado em Lúmen/Ferro/etc. Isso **quebrou de verdade**: o `onEnter`/`onComplete` do GSAP disparavam normalmente (confirmado via log), mas o DOM permanecia travado em `opacity: 0` pra sempre — um `MutationObserver` mostrou centenas de escritas de estilo repetidas voltando pra `opacity: 0` mesmo depois do `onComplete`. Isolei removendo o WebGL (não era a causa) e removendo o `stagger` (aí funcionou 100%) — o problema é especificamente a combinação `stagger` + `scrollTrigger.once: true` quando o target é um conjunto de `<button>` com `transition` do Tailwind (que inclui `opacity`/`transform` nas propriedades transicionadas) e `className` condicional.

**Fix aplicado**: em vez de um `Reveal` com `stagger` envolvendo todos os botões, cada botão agora é seu próprio `<Reveal as="button" delay={i * 0.05}>` (delay manual crescente, sem usar a opção `stagger` do GSAP). Mesmo efeito visual, sem o bug. Se outro projeto do portfólio precisar dar `Reveal`+`stagger` em elementos `<button>` interativos com `transition` do Tailwind, vale testar com Playwright + scroll real antes de confiar — o `fullPage` screenshot sozinho não é suficiente pra pegar isso (só apareceu porque testei com scroll incremental real).

## v5: FAQ + depoimentos (prova social)

Adicionados `Depoimentos.tsx` e `Faq.tsx`, entre `Processo` e `Contato` no `App.tsx` — a página só tinha configurador + calculadora de aro + contato, sem responder dúvidas pré-compra nem mostrar peças anteriores. `Faq.tsx` segue o mesmo padrão de acordeão acessível usado em Razão/Calibre (`<button aria-expanded aria-controls>` + `<div role="region">`, sem `stagger` do GSAP nos botões — ver o bug documentado acima em "Bug real encontrado", o mesmo `Reveal` que quebrou em `Catalogo.tsx` com stagger em botões seria o mesmo risco aqui, então o bloco inteiro de perguntas entra num único `Reveal` sem stagger, como em Razão/Calibre). Seis perguntas: prazo de encomenda, certificação gemológica das pedras (laudo com 4 Cs pra diamante), ajuste de aro, documentação de seguro, estrutura de pagamento (sinal + parcelas) e garantia do engaste/revisão de garras. `Depoimentos.tsx` traz três casos fictícios e específicos (anel de noivado com esmeralda de família reengastada, anel desenhado em vídeochamada, reforma de pulseira de herança) — evita depoimento genérico tipo "atendimento excelente".

## Referência visual

Paleta: `--color-noite` #100c14, `--color-acento` #b98cff (violeta ametista). Fontes: **Cormorant Garamond** (display) + **Inter** (corpo).
