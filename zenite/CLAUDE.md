# Zênite (conceito)

Site-conceito da Madolio pro nicho de **observatório / turismo astronômico**. **Observatório fictício** — não existe (o fundador "Rogério Vidigal" também é inventado). Vite + React 19 + TypeScript + Tailwind v4 + `framer-motion`. Página única. Localização fictícia: São Bento do Sapucaí, SP, na Serra da Mantiqueira — cidade real conhecida como destino real de turismo astronômico (altitude ~1.100 m, perto da Pedra do Baú, céu comparativamente escuro por estar longe da poluição luminosa da Grande São Paulo).

## Deploy (Cloudflare Workers)

Worker `zenite`, em `https://zenite.sneakpeek.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Lugar/objeto real:** a ocular de um telescópio — moldura circular que começa desfocada/inclinada e vai ganhando nitidez conforme se gira a roda de foco.
- **Emoção em 3s:** a respiração suspensa um instante antes de algo entrar em foco no escuro — não "espetáculo", quietude.
- **Colisão:** turismo astronômico × catálogo real de astronomia (catálogo Messier, magnitude aparente, distância em anos-luz, calendário real de chuva de meteoros da IMO) — nunca nome bonito solto tipo "Nebulosa Misteriosa".
- **Nunca parecer:** (1) fundo quase-preto + um único acento neon "espacial" (armadilha óbvia num tema de céu noturno — evitada com paleta de materiais reais de observatório: latão de tubo de telescópio, um verde-fósforo P1 dessaturado, âmbar de lanterna, nunca azul-neon saturado); (2) hero frio de startup aeroespacial (SpaceX-style, high-tech, sem calor humano); (3) app de horóscopo com estrelinhas soltas e emoji.
- **Wildcard:** `Foco.tsx` + `ContainerScroll.tsx` — a seção-assinatura da página. A moldura do efeito Aceternity vira uma ocular circular com bezel de latão; dentro, uma ilustração autoral em SVG dos anéis de Saturno ganha nitidez (`blur` de 6px a 0) e se endireita (`rotateX` de 22° a 0°) conforme a página rola — o mesmo gesto físico de girar o foco de um telescópio de verdade.

## ContainerScroll reaproveitado de bruma — com justificativa e adaptações

`bruma/src/components/ContainerScroll.tsx` documenta a regra: só reaproveitar quando existir um motivo **natural** de revelar algo dentro de uma moldura durante o scroll, nunca só pra aproveitar código. Aqui o motivo é direto: a ocular de um telescópio já É fisicamente uma moldura circular que começa desfocada e foca com um gesto giratório — o mesmo tipo de movimento que `rotateX`/`scale` já anima. Nenhum outro projeto do portfólio tinha esse encaixe (confirmado em `bruma/CLAUDE.md`, que lista os candidatos já descartados).

O arquivo foi **copiado e adaptado** para `zenite/src/components/ContainerScroll.tsx` (não importado entre pastas — cada projeto é standalone). Adaptações feitas, resolvendo as três pendências documentadas no original:

1. **`prefers-reduced-motion`:** via `useReducedMotion()` do framer-motion. Quando ativo, os ranges de `useTransform` colapsam pro valor final constante (`rotateX` sempre 0, `scale` sempre 1, `blur` sempre 0, parallax do título sempre 0) — a moldura renderiza direto no estado focado/reto, sem depender de scroll. Confirmado visualmente via Puppeteer com `emulateMediaFeatures`.
2. **Altura da seção em mobile:** reduzida de `h-[60rem] md:h-[80rem]` (original) pra `h-[46rem] md:h-[72rem]` — menos scroll morto em telas pequenas, mantendo espaço suficiente pro gesto de "focar" acontecer.
3. **Moldura circular:** o `Card` retangular original virou um círculo (`rounded-full`, `aspect-square`, bezel de 10–14px em `--color-latao`) pra remeter a uma ocular. Testado com conteúdo curto e centralizado (ilustração + uma linha de dado real) — texto em `dl`/`p` maior que ~55–60% da largura do círculo foi evitado de propósito, porque cantos de um conteúdo quadrado ficam cortados pela máscara circular.

Novidade em relação ao original: um quarto valor animado, `blur` (de 6px a 0), amarrado ao mesmo `scrollYProgress` — reforça literalmente a metáfora de "foco" além do `rotateX`/`scale` que já existiam.

## Dados reais de astronomia, não nome bonito solto

- `data/ceu.ts`: dados dos anéis de Saturno usados na seção `Foco.tsx` — diâmetro real ~282.000 km, espessura de ~10 m a poucos km (não confundir com o diâmetro: os anéis são proporcionalmente mais finos que uma folha de papel numa quadra de tênis), composição majoritariamente de gelo de água.
- `data/sessoes.ts`: cada uma das 6 sessões tem um dado verificável — distância média da Lua (384.400 km), magnitude aparente e distância real do Grande Aglomerado de Hércules (M13: magnitude 5,8, ~22.200 anos-luz, ~145 anos-luz de diâmetro), datas de pico real das chuvas de meteoros Eta Aquáridas (5–6 de maio, originada do cometa Halley, boa visibilidade no hemisfério sul) e Geminídeas (13–14 de dezembro, originada do asteroide 3200 Phaethon).
- Cuidado deliberado com precisão geográfica: chuvas de meteoros populares no hemisfério norte (como as Perseidas, radiante baixo no horizonte visto do Brasil) foram propositalmente deixadas de fora do catálogo principal em favor de Eta Aquáridas e Geminídeas, mais bem posicionadas pro hemisfério sul — coerente com a localização fictícia em São Paulo.

## Componentes

- `Hero.tsx` — cena de céu noturno em SVG autoral (`CeuNoturno`): campo de estrelas gerado por posição pseudo-aleatória determinística (sem lib de partículas), faixa de via láctea sugerida por gradiente, silhueta de serra recortada contra o céu.
- `Foco.tsx` — a seção-assinatura (ver acima).
- `Sessoes.tsx` — grade de 6 cards com o dado real de `data/sessoes.ts`.
- `Processo.tsx` — quatro etapas reais de uma sessão (adaptação escotópica ao escuro, escolha do alvo pela fase da Lua, foco assistido, registro opcional) — evita o "por que nos escolher" genérico.
- `Depoimentos.tsx` — três depoimentos fictícios curtos, cada um amarrado a uma sessão real do catálogo.
- `Faq.tsx` — acordeão acessível (`aria-expanded`/`aria-controls`, sem depender de animação de scroll), seis perguntas específicas (cancelamento por nuvem, o que levar pro frio da serra, idade mínima, equipamento fornecido, por que a fase da lua importa, como reservar).
- `Contato.tsx` / `DemoDialog.tsx` / `demo.ts` — modo demonstração igual ao resto do portfólio: nenhum botão abre WhatsApp real, mostra a mensagem que seria enviada e oferece o WhatsApp real da Madolio.

## Referência visual

Paleta — noite real de observatório, não "preto + neon espacial": `--color-noturno` #0a0f1c (fundo principal, índigo quase-preto), `--color-cupula` #131c2e (painéis/cards), `--color-cupula-alta` #1b2740 (interior da moldura circular), `--color-latao` #b28a4a (latão de tubo de telescópio — bordas, acento secundário), `--color-latao-fundo` #7d5f30 (latão escuro/hover), `--color-marfim` #f0e9da (texto principal sobre fundo escuro), `--color-neblina` #8b93a8 (texto secundário), `--color-fosforo` #7fd9a0 (verde-fósforo P1 dessaturado — CTA principal e único acento "vivo", usado com moderação, nunca saturado tipo neon), `--color-vela` #e0954a (âmbar de lanterna/vela, reservado a pequenos destaques). Nenhum hex reciclado dos outros ~48 projetos do repositório (conferido por grep em todos os `index.css` antes de fechar a paleta).

Fontes: **Cinzel** (display — serifa clássica gravada, remete a placa de latão de instrumento óptico antigo) + **Inter Tight** (corpo). Nenhuma das duas usada em nenhum outro projeto do repositório, e a combinação como par também é inédita (conferido por grep nos `<link>` de Google Fonts de todos os `index.html` do monorepo).

## Decisões

- Owner fictício: **Rogério Vidigal**, astrônomo amador, São Bento do Sapucaí/SP — cidade real na Serra da Mantiqueira, já destino real de turismo de observação por causa da altitude e do céu comparativamente escuro.
- 6 sessões (não catálogo enorme): mesma lógica de profundidade de dado real por item já usada em outros projetos do portfólio (Estufa, Fornada) — cada sessão carrega um fato específico verificável, não um adjetivo solto.
- Nenhuma seção usa `og:image` (não existe imagem gerada pra este conceito) — mesmo padrão de Bruma/Estufa/Fornada.
