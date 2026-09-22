# Bruma (conceito)

Site-conceito da Madolio pro nicho de **perfumaria artesanal sob medida**. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + `framer-motion`. Página única.

Não usa GSAP no scroll — e não é o único (conferido em 18/09/2026: bruma, leads, madolio-admin e realce não têm GSAP no package.json). Usa dois componentes de terceiros que o usuário mandou prontos (shader builder do 21st.dev + o padrão "Container Scroll Animation" da Aceternity), adaptados do React/Next.js pro nosso Vite.

## Deploy (Cloudflare Workers)

Worker `bruma`, em `https://bruma.fenoninho-max.workers.dev`. `npm run deploy`.

## Componentes de terceiros — adaptados, não copiados cegamente

- `components/ShaderBackground.tsx`: shader WebGL puro (zero dependências, GLSL escrito à mão) — já era portável, só removi o `"use client"` (Next.js App Router, não existe no Vite) e troquei a paleta de roxo pro verde-esmeralda noturno do tema (`VERDE_ESMELALDA`, ver constante no topo do arquivo).
- `components/ContainerScroll.tsx`: efeito "cartão 3D se endireitando" conforme rola a página, via `framer-motion` (`useScroll`/`useTransform`). Trocado `next/image` por `<img>` normal — o resto (a lógica de `rotateX`/`scale`/`translateY` ligada a `scrollYProgress`) veio praticamente intacto.

`framer-motion` foi a primeira dependência dessa família no repositório, mas não é mais a única: doce-atelie e sabor-da-vila usam o pacote `motion` (o mesmo motor, importado de `motion/react`). Continua isolado aqui, sem afetar os demais.

## Dados reais de perfumaria, não nomes bonitos soltos

`data/fragancias.ts`: cada fragrância tem a concentração real de óleo essencial (faixas padrão da indústria: Extrait 20–30%, EDP 15–20%, EDT 5–15%) — é esse número, não o preço do frasco, que determina quanto tempo o perfume dura na pele. A pirâmide olfativa (notas de topo/coração/fundo) também é conceito real de perfumaria, não uma lista arbitrária.

## Sem foto (convenção do portfólio)

O frasco em `components/Vitrine.tsx` é um SVG desenhado (silhueta simples + neblina animada em CSS), não uma foto — segue a convenção do resto do portfólio (excepto Marcha, que é a exceção deliberada e documentada).

## Referência visual

Paleta: `--color-noite` #06120f, `--color-acento` #3fae82 (verde-esmeralda). Fontes: **Fraunces** (display) + **Inter** (corpo).

## FAQ e prova social

Adicionados `components/Faq.tsx` e `components/Depoimentos.tsx` (21/09/2026), seguindo o padrão já usado em razao (`Faq.tsx`/`Depoimentos.tsx`). Entram na composição depois de `Processo` (fim do conteúdo/mecânica de vitrine) e antes de `Contato`.

- `Faq.tsx`: acordeão acessível de verdade — `<button aria-expanded aria-controls>` alternando um `<div id role="region">`, sem depender de animação de scroll/shader pra existir (render condicional puro, `motion-reduce` só afasta a transição do ícone `+`). Seis perguntas específicas de perfumaria sob medida: prazo de maceração, política de ajuste, diferença EDT/Extrait, reencomenda, forma de pagamento, entrega fora da cidade.
- `Depoimentos.tsx`: três depoimentos fictícios curtos, nome + inicial (Marina T., Diego F., Camila R.), cada um amarrado a uma fragrância real de `data/fragancias.ts` e a uma situação concreta, não a elogio genérico.
- Nenhum dos dois usa cores/fontes novas — reaproveitam os tokens existentes (`--color-fio`, `--color-acento`, `--color-fumo`, `--color-carvao`, `--font-display`) e a malha de grid/borda já usada em `Processo.tsx`. `Hero.tsx`, `ShaderBackground.tsx` e `ContainerScroll.tsx` não foram tocados.
