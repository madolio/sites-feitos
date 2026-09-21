# Meridiana Odontologia (conceito)

Site-conceito da Madolio pro nicho de **odontologia geral / clínica dentária**. **Clínica fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + GSAP (`Reveal.tsx`). Página única.

## Deploy (Cloudflare Workers)

Worker `arcada`, em `https://arcada.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Colisão:** odontologia × cartografia/mapa navegável — a arcada dentária inteira (32 dentes, superior e inferior) é desenhada como um mapa clicável, dente por dente, em vez de uma lista de serviços. Clicar (ou navegar por teclado até) qualquer dente mostra sua função anatômica real e os procedimentos de verdade associados àquele tipo de dente.
- **Nunca parecer:** odontologia genérica azul-e-branco (foto de sorriso largo de banco de imagem, logo de dente estilizado, "cuidamos do seu sorriso"). Checado contra o Cerne (planta baixa clicável) — mecânica adjacente de "diagrama navegável como interface", mas nicho e paleta completamente diferentes; nenhum outro projeto do repositório usa arcada dentária.

## O wildcard — a arcada como mapa navegável

`ArcadaMapa.tsx` é o coração do site. `src/data/dentes.ts` gera os 32 dentes do adulto usando **notação FDI/ISO 3950** (o padrão internacional de numeração odontológica, adotado no Brasil pelo CFO): dois dígitos, o primeiro é o quadrante (1 = superior direito, 2 = superior esquerdo, 3 = inferior esquerdo, 4 = inferior direito, sempre da perspectiva do paciente) e o segundo é a posição a partir da linha média (1 = incisivo central até 8 = terceiro molar). A disposição na tela segue a convenção real de odontograma: quadrante 1 à esquerda da tela em cima, quadrante 4 à esquerda embaixo, espelhados.

`src/data/arco.ts` (`calcularArco`) posiciona os 16 dentes de cada arco ao longo de uma curva senoidal — dentes anteriores (incisivos, no meio da fileira) ficam mais próximos da linha do lábio, posteriores (molares/sisos, nas pontas) recuam, e a largura de cada dente na ilustração reflete a anatomia real (incisivo estreito, molar largo). Não é SVG decorativo estático: a posição de cada dente é calculada, não desenhada à mão.

Cada dente é um `<button>` HTML real (não uma forma SVG com `onClick`), posicionado por percentual sobre um `<svg aria-hidden="true">` puramente decorativo (as curvas de contorno do arco). Isso resolve o requisito de acessibilidade da peça central: cada dente tem `aria-label` real ("Primeiro molar, dente 46, arco inferior"), `aria-pressed` no selecionado, é alcançável por Tab na ordem natural do DOM, e as setas ⇦/⇨ movem o foco entre os dentes do mesmo arco (`onKeyDown` em `Fileira`). O painel de detalhe (`aria-live="polite"`) atualiza content acessível a leitor de tela a cada seleção, sem depender de hover.

## Mapeamento dente → procedimento: como foi verificado

`INFO_POR_TIPO` (em `dentes.ts`) associa cada um dos 5 tipos de dente (incisivo, canino, pré-molar, molar, terceiro molar) à sua função mastigatória real e a um subconjunto de procedimentos plausíveis pra aquele tipo — baseado em anatomia dentária e prática clínica geral, não inventado:

- **Incisivos** cortam (borda incisal fina) e concentram a demanda estética por serem a "vitrine" do sorriso → clareamento, faceta, restauração de fratura (são os dentes mais expostos a trauma frontal).
- **Caninos** rasgam, têm cúspide única e a raiz mais longa da arcada, e fazem a guia canina (contato nos movimentos laterais da mandíbula) → desgaste por bruxismo, canal (canal único, anatomia favorável), coroa.
- **Pré-molares** têm duas cúspides e começam a triturar; por ocupar posição intermediária, são o dente mais comumente extraído em planejamento ortodôntico quando falta espaço na arcada.
- **Molares** têm coroa larga, múltiplas cúspides, sulcos profundos e 2–3 raízes → maior concentração de cárie oclusal, canal mais complexo (mais canais), coroas depois de perda estrutural extensa.
- **Terceiros molares (sisos)** erupcionam por último (tipicamente 17–25 anos) e frequentemente não têm espaço, causando impactação — daí a avaliação radiográfica prévia e a extração cirúrgica (não simples) serem a conduta mais citada, com a ressalva real de que nem todo siso precisa ser removido.

As durações de procedimento (`Procedimentos.tsx` e as entradas de `INFO_POR_TIPO`) são faixas aproximadas de conhecimento odontológico geral (ex.: limpeza 30–45 min, canal em 1–2 sessões de 60–90 min, implante com 3–6 meses de osseointegração), não números inventados com falsa precisão.

## Movimento contínuo (contra "página morta")

O hero tem um anel de "meridiano" cartográfico respirando devagar (`meridiana-respirar`, escala + opacidade em loop de 7–9s) e um ponto orbitando o contorno (`meridiana-orbitar`), ambos só ativos dentro de `@media (prefers-reduced-motion: no-preference)` em `index.css` — com a preferência de redução de movimento, os elementos ficam parados no estado inicial. `Reveal.tsx` (idêntico ao padrão do repositório, copiado da Ressoa) cobre o fade+subida em scroll das demais seções, com a mesma guarda de `matchMedia` e a rede de segurança de fim de página.

## Modo demonstração

Igual a Ressoa/Estufa/Bruma: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real — mostra a mensagem que seria enviada e oferece o contato da Madolio. O formulário de agendamento (`Contato.tsx`) monta a mensagem a partir do nome, dente/região e motivo preenchidos, então o texto no modal de demonstração reflete o pedido real montado pela pessoa.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card (sem `og:image` — mesmo padrão de Bruma/Estufa/Ressoa, sem asset dedicado ainda). `public/robots.txt` e `public/sitemap.xml` existem.

## Referência visual

Paleta: `--color-papel` #f6f0e0 (papel/pergaminho, fundo claro), `--color-tinta` #16283a (tinta cartográfica escura, texto principal), `--color-contorno` #9c8a63 (linha de contorno/topográfica, bordas e rótulos), `--color-esmalte` #dd5f45 (coral-terracota, acento primário/CTA/dente selecionado — o "marcador" do mapa), `--color-gengiva` #2f7a6b (verde-azulado, acento secundário), `--color-linha` #ddd0ac (borda clara sobre o papel). Nenhum desses seis hex aparece em nenhum `index.css` dos outros 33 projetos do repositório (conferido via `grep -rh -- '--color-' */src/index.css` na raiz antes de fechar a paleta).

Fontes: **Cormorant Garamond** (display — serifa de eixo clássico, evoca rótulo gravado de mapa/carta náutica) + **Outfit** (corpo — grotesca geométrica neutra) + **PT Mono** (rótulos técnicos: numeração FDI, durações). Nenhuma das três aparecia em nenhum `family=` de `*/index.html` do repositório (conferido via `grep -rhoE "family=[A-Za-z0-9+]+" */index.html`), e o trio como combinação também é inédito.

## Decisões

- Owner fictícia: **Dra. Marina Kolb**, cirurgiã-dentista, Curitiba/PR.
- Notação FDI escolhida em vez do sistema universal americano (1–32) por ser o padrão usado nos prontuários brasileiros — mais correto pro contexto do site (`pt-BR`, clínica brasileira).
- Curva de posicionamento dos dentes (`calcularArco`) é uma representação estilizada de odontograma "desenrolado", não uma projeção anatômica literal da arcada em 3D — decisão de escopo pra manter o mapa legível e totalmente calculável em 2D, documentada aqui caso um próximo ajuste queira uma ilustração mais anatômica.
- Diagrama construído com `<button>` HTML posicionados por percentual sobre um SVG decorativo, em vez de `<g role="button">` dentro do próprio SVG — prioriza semântica e suporte de teclado nativos sobre pureza de implementação (SVG puro exigiria reimplementar foco/ativação manualmente).
- Seção de procedimentos gerais (`Procedimentos.tsx`) mantém 6 itens (limpeza, restauração, canal, clareamento, extração, implante) — o subconjunto mais comum de uma clínica geral, deixando ortodontia de fora do resumo rápido por já aparecer implicitamente em `Processo.tsx` (tratamento longo por fases).
