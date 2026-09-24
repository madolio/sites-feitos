# Bruma (conceito)

Site-conceito da Madolio pro nicho de **perfumaria artesanal sob medida**. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + `framer-motion`. Página única.

Não usa GSAP no scroll — e não é o único (conferido em 18/09/2026: bruma, leads, madolio-admin e realce não têm GSAP no package.json). Usa dois componentes de terceiros que o usuário mandou prontos (shader builder do 21st.dev + o padrão "Container Scroll Animation" da Aceternity), adaptados do React/Next.js pro nosso Vite.

## Deploy (Cloudflare Workers)

Worker `bruma`, em `https://bruma.sneakpeek.workers.dev`. `npm run deploy`.

## Componentes de terceiros — adaptados, não copiados cegamente

- `components/ShaderBackground.tsx`: shader WebGL puro (zero dependências, GLSL escrito à mão) — já era portável, só removi o `"use client"` (Next.js App Router, não existe no Vite) e troquei a paleta de roxo pro verde-esmeralda noturno do tema (`VERDE_ESMELALDA`, ver constante no topo do arquivo).
- `components/ContainerScroll.tsx`: efeito "cartão 3D se endireitando" conforme rola a página, via `framer-motion` (`useScroll`/`useTransform`). Trocado `next/image` por `<img>` normal — o resto (a lógica de `rotateX`/`scale`/`translateY` ligada a `scrollYProgress`) veio praticamente intacto. **Desde 22/09/2026, preservado sem uso** — ver seção "ContainerScroll: preservado sem uso" abaixo.

`framer-motion` foi a primeira dependência dessa família no repositório, mas não é mais a única: doce-atelie e sabor-da-vila usam o pacote `motion` (o mesmo motor, importado de `motion/react`). Continua isolado aqui, sem afetar os demais.

## Dados reais de perfumaria, não nomes bonitos soltos

`data/fragancias.ts`: cada fragrância tem a concentração real de óleo essencial (faixas padrão da indústria: Extrait 20–30%, EDP 15–20%, EDT 5–15%) — é esse número, não o preço do frasco, que determina quanto tempo o perfume dura na pele. A pirâmide olfativa (notas de topo/coração/fundo) também é conceito real de perfumaria, não uma lista arbitrária.

## Sem foto (convenção do portfólio)

O frasco em `components/Processo.tsx` é um SVG desenhado (vidro facetado, ombros angulados, tampa e rótulo — ver comentário no topo do arquivo), não uma foto — segue a convenção do resto do portfólio (excepto Marcha, que é a exceção deliberada e documentada).

## ContainerScroll: preservado sem uso (decisão de 22/09/2026)

A Bruma tinha dois efeitos de terceiros na página: o shader do Hero (`ShaderBackground.tsx`) e o `ContainerScroll.tsx` (efeito Aceternity "Container Scroll Animation"), este último envolvido pelo antigo `components/Vitrine.tsx`. O dono decidiu manter só um efeito 21st.dev na página — o do Hero. `Vitrine.tsx` foi **removido de vez** (commit "Consolidate bruma into one perfume scene, remove second 21st.dev effect"); o conteúdo dele (frasco genérico, bolhas animadas em CSS, textos "topo/coração/fundo") era específico da Bruma e não deve ser resgatado. `Processo.tsx` ocupou o lugar da seção removida, logo após o Hero, com uma cena própria (pipeta, gota, macerar, selar).

`ContainerScroll.tsx`, porém, **foi preservado intacto** — não é conteúdo da Bruma, é o motor genérico do efeito (moldura com perspectiva, começa inclinada e se endireita com o scroll via `framer-motion`, recebe `titleComponent`/`children` como props, sem qualquer acoplamento a perfumaria). Fica disponível pra reuso futuro em outro projeto do portfólio, mas com uma regra: **não reaproveitar só pra aproveitar código**. Antes de aplicar em qualquer projeto, confirmar que existe um momento natural de "revelar uma tela/produto/objeto dentro de uma moldura durante o scroll" que acrescente significado à experiência daquele projeto — não só que tecnicamente encaixa. Sem essa justificativa conceitual, não usar.

Em 22/09/2026, nenhum candidato óbvio se qualificou: torre, rota, razão, torque, derme e madolio-admin são todos dashboards/produtos completos onde a página inteira já É o produto (sidebar + conteúdo full-bleed, ou `Layout`/`Home` ocupando a tela toda) — não uma landing page com uma captura de tela pra emoldurar. Enfiar um desses projetos inteiros dentro do card giraria numa "tela dentro de outra tela" sem sentido; não fazer isso só pra encaixar o efeito. Quando surgir um projeto novo, reavaliar: (1) identidade visual existente, (2) conceito/narrativa da página, (3) se o efeito soma significado real, (4) só então reutilizar.

Pendências pra quando for de fato reutilizado (nenhuma foi resolvida ainda): tratar `prefers-reduced-motion` (framer-motion tem `useReducedMotion()` pronto, não implementado), revisar a responsividade além do `isMobile` binário atual, e evitar seção excessivamente alta (`h-[60rem] md:h-[80rem]`) só pra sustentar a animação. Detalhes completos no comentário no topo de `components/ContainerScroll.tsx`.

## Referência visual

Paleta: `--color-noite` #06120f, `--color-acento` #3fae82 (verde-esmeralda). Fontes: **Fraunces** (display) + **Inter** (corpo).

## FAQ e prova social

Adicionados `components/Faq.tsx` e `components/Depoimentos.tsx` (21/09/2026), seguindo o padrão já usado em razao (`Faq.tsx`/`Depoimentos.tsx`). Entram na composição depois de `Processo` (fim do conteúdo/mecânica de vitrine) e antes de `Contato`.

- `Faq.tsx`: acordeão acessível de verdade — `<button aria-expanded aria-controls>` alternando um `<div id role="region">`, sem depender de animação de scroll/shader pra existir (render condicional puro, `motion-reduce` só afasta a transição do ícone `+`). Seis perguntas específicas de perfumaria sob medida: prazo de maceração, política de ajuste, diferença EDT/Extrait, reencomenda, forma de pagamento, entrega fora da cidade.
- `Depoimentos.tsx`: três depoimentos fictícios curtos, nome + inicial (Marina T., Diego F., Camila R.), cada um amarrado a uma fragrância real de `data/fragancias.ts` e a uma situação concreta, não a elogio genérico.
- Nenhum dos dois usa cores/fontes novas — reaproveitam os tokens existentes (`--color-fio`, `--color-acento`, `--color-fumo`, `--color-carvao`, `--font-display`) e a malha de grid/borda já usada em `Processo.tsx`. `Hero.tsx`, `ShaderBackground.tsx` e `ContainerScroll.tsx` não foram tocados.
