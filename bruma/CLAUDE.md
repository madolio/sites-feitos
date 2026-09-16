# Bruma (conceito)

Site-conceito da Madolio pro nicho de **perfumaria artesanal sob medida**. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + `framer-motion`. Página única.

Único projeto do portfólio sem GSAP — usa dois componentes de terceiros que o usuário mandou prontos (shader builder do 21st.dev + o padrão "Container Scroll Animation" da Aceternity), adaptados do React/Next.js pro nosso Vite.

## Deploy (Cloudflare Workers)

Worker `bruma`, em `https://bruma.fenoninho-max.workers.dev`. `npm run deploy`.

## Componentes de terceiros — adaptados, não copiados cegamente

- `components/ShaderBackground.tsx`: shader WebGL puro (zero dependências, GLSL escrito à mão) — já era portável, só removi o `"use client"` (Next.js App Router, não existe no Vite) e troquei a paleta de roxo pro verde-esmeralda noturno do tema (`VERDE_ESMELALDA`, ver constante no topo do arquivo).
- `components/ContainerScroll.tsx`: efeito "cartão 3D se endireitando" conforme rola a página, via `framer-motion` (`useScroll`/`useTransform`). Trocado `next/image` por `<img>` normal — o resto (a lógica de `rotateX`/`scale`/`translateY` ligada a `scrollYProgress`) veio praticamente intacto.

`framer-motion` é dependência nova no repositório — nenhum outro projeto usa (os outros usam GSAP pra scroll). Isolado neste projeto, sem afetar os demais.

## Dados reais de perfumaria, não nomes bonitos soltos

`data/fragancias.ts`: cada fragrância tem a concentração real de óleo essencial (faixas padrão da indústria: Extrait 20–30%, EDP 15–20%, EDT 5–15%) — é esse número, não o preço do frasco, que determina quanto tempo o perfume dura na pele. A pirâmide olfativa (notas de topo/coração/fundo) também é conceito real de perfumaria, não uma lista arbitrária.

## Sem foto (convenção do portfólio)

O frasco em `components/Vitrine.tsx` é um SVG desenhado (silhueta simples + neblina animada em CSS), não uma foto — segue a convenção do resto do portfólio (excepto Marcha, que é a exceção deliberada e documentada).

## Referência visual

Paleta: `--color-noite` #06120f, `--color-acento` #3fae82 (verde-esmeralda). Fontes: **Fraunces** (display) + **Inter** (corpo).
