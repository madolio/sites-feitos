# Prisma (conceito)

Site-conceito da Madolio pro nicho de **joalheria sob medida**. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + Three.js/@react-three/fiber + GSAP (Reveal). Página única.

Terceiro projeto do portfólio com WebGL de verdade (depois de Cardume e Torno) — a gema no hero usa física real de refração, não brilho decorativo.

## Deploy (Cloudflare Workers)

Worker `prisma`, em `https://prisma.fenoninho-max.workers.dev`. `npm run deploy`.

## A gema — índice de refração real, não "por olho"

`data/gemas.ts` tem o IOR (índice de refração) e a dispersão reais de cada pedra, de tabela gemológica — o mesmo número que um refratômetro de gemólogo mede. `cena/Gema.tsx` usa `MeshTransmissionMaterial` (drei) com `ior={gema.ior}` e `chromaticAberration` proporcional à dispersão real — o diamante (IOR 2,417, a maior desta lista) refrata visivelmente mais que a ametista (IOR 1,544). A geometria é um octaedro simplificado (não uma lapidação de 50+ facetas): o ponto é a física do material, não a geometria do corte.

## Bug real encontrado e corrigido: stagger + ScrollTrigger `once` em botões

`Catalogo.tsx` originalmente envolvia a grade de 6 botões (as gemas) num único `<Reveal stagger={0.06}>`, igual ao padrão usado em Lúmen/Ferro/etc. Isso **quebrou de verdade**: o `onEnter`/`onComplete` do GSAP disparavam normalmente (confirmado via log), mas o DOM permanecia travado em `opacity: 0` pra sempre — um `MutationObserver` mostrou centenas de escritas de estilo repetidas voltando pra `opacity: 0` mesmo depois do `onComplete`. Isolei removendo o WebGL (não era a causa) e removendo o `stagger` (aí funcionou 100%) — o problema é especificamente a combinação `stagger` + `scrollTrigger.once: true` quando o target é um conjunto de `<button>` com `transition` do Tailwind (que inclui `opacity`/`transform` nas propriedades transicionadas) e `className` condicional.

**Fix aplicado**: em vez de um `Reveal` com `stagger` envolvendo todos os botões, cada botão agora é seu próprio `<Reveal as="button" delay={i * 0.05}>` (delay manual crescente, sem usar a opção `stagger` do GSAP). Mesmo efeito visual, sem o bug. Se outro projeto do portfólio precisar dar `Reveal`+`stagger` em elementos `<button>` interativos com `transition` do Tailwind, vale testar com Playwright + scroll real antes de confiar — o `fullPage` screenshot sozinho não é suficiente pra pegar isso (só apareceu porque testei com scroll incremental real).

## Referência visual

Paleta: `--color-noite` #100c14, `--color-acento` #b98cff (violeta ametista). Fontes: **Cormorant Garamond** (display) + **Inter** (corpo).
