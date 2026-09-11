# Bastos Advocacia (conceito — nicho jurídico)

Vite + React + TypeScript + Tailwind v4, hospedado no Cloudflare Workers (`https://site-template.fenoninho-max.workers.dev`). Continua sendo o Worker/pasta chamado `site-template`, mas o conteúdo foi completamente reformulado — ver histórico abaixo.

## O que este projeto é hoje

Um conceito fictício de página única pra um escritório de advocacia (empresarial e civil): "Bastos Advocacia", Dra. Camila Bastos, OAB/SP 312.884 — nomes e dados fictícios, exemplo de estilo pro nicho jurídico, igual aos outros conceitos do madolio (Doce Ateliê, Estúdio Alma, Sabor da Vila), só que como página completa em vez de só um card na vitrine.

**Pedido explícito do usuário que motivou a reformulação (set/2026):** "quero reformular ele todo em uma página para um advogado, não algo copiado da home" — ou seja, não é uma variação de cores do site institucional do madolio; é conteúdo, estrutura e motion próprios, pensados pro advogado.

## Direção de design

- **Paleta:** carvão-esverdeado `#1E2823` (tinta), marfim `#F5F1E8` (papel), bordô `#7A2E3A` (accent) — deliberadamente diferente do azul do `madolio` e do teal do `nbj-systems` (ver CLAUDE.md deles: "não convergir os visuais dos projetos-irmãos").
- **Tipografia:** Source Serif 4 (títulos) + Source Sans 3 (corpo) — terceira combinação distinta da dupla (madolio usa IBM Plex Serif/Sans, nbj-systems usa Archivo).
- **Botões:** retos, sem arredondamento — madolio é pill, nbj-systems é `rounded-sm`; este é o terceiro formato, reforça a seriedade do nicho.
- **Layout:** texto-forward, coluna única centrada (max-w-3xl), sem ilustração de "mockup de site" — um escritório de advocacia não vende "olha como seu site vai ficar bonito", vende confiança e clareza.
- **Momento principal:** `src/components/Signature.tsx` — uma assinatura cursiva (floreio abstrato, não letras reais) se desenha uma vez no hero via GSAP `DrawSVGPlugin`, representando "fechar o acordo". Único motion não solicitado da página — Reveal (fade+slide sutil) cobre o resto.
- **Numeração:** só aparece em `Process.tsx` ("Como funciona o atendimento") porque o conteúdo é genuinamente sequencial (1. primeiro contato → 2. análise → 3. proposta → 4. execução). Não usar números decorativos em outras seções.
- Sem `Scene3D`/`ShimmerText`/`SketchToSite` — removidos na reformulação porque eram copiados do madolio e não cabem no tom sóbrio do nicho jurídico.

## Histórico

Esta pasta era antes um "template genérico" (placeholders `{{BUSINESS_NAME}}` etc., cópia visual da home do madolio) — reconstruído a partir do site que já estava publicado sem repositório em lugar nenhum (ver commit inicial). Depois disso, reformulado por completo pro conceito de advocacia acima. Se precisar do template genérico de volta, ele está nos commits anteriores a essa reformulação.

`src/config/site.ts` centraliza os dados fictícios do escritório (nome, OAB, contato) — trocar ali se for adaptar pra outro nicho ou virar cliente real de verdade.

Ver o CLAUDE.md do `madolio` pra a gotcha de GSAP + Tailwind `transition` e o gotcha de teste do Chrome headless com `--window-size` pequeno — ambos se aplicam aqui.
