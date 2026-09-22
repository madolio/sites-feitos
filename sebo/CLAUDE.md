# Sebo Marginália (conceito)

Site-conceito da Madolio pro nicho de livraria/sebo — livros usados. **Sebo fictício** — não existe (o curador "Theo Marins", ex-bibliotecário, também é inventado). Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Deploy (Cloudflare Workers)

Worker `sebo`, em `https://sebo.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery — "Orelha"

- **Lugar/objeto:** a orelha dobrada de página — a dobra física que um leitor deixa num livro pra marcar onde parou. É o traço de manuseio que só um livro *usado* carrega, nunca um exemplar novo de livraria.
- **Emoção:** aconchego com história, não nostalgia piegas nem "cheirinho de livro velho" genérico.
- **Colisão:** catálogo de livraria × o desgaste real e específico de um exemplar de segunda mão (grifo, dedicatória, mancha de café, carimbo de outro sebo).
- **Nunca parecer:** estante de capas em grid + fundo creme + serif alto-contraste + accent terracota — o "look" mais clichê de livraria gerada por IA (ver regra do repositório). Evitado de propósito: fundo é pano de capa de livro antigo (verde-garrafa escuro `#17241b`), não creme; o único acento quente é um vermelho-carimbo (`#c1432e`), não terracota.
- **Wildcard:** `Orelha.tsx` — a navegação não é uma barra, é uma fileira de dobras de página (triângulos recortados por `clip-path`) presa na borda da tela. A seção ativa fica "mais dobrada" (maior, com o vinco em vermelho-carimbo) que as outras, como se o visitante estivesse folheando o site e uma orelha ficasse mais vincada de tanto voltar ali.

Paleta: `--color-pano` #17241b (pano de capa, fundo principal), `--color-pagina` #f1e7ce (papel envelhecido, usado nas fichas/cards), `--color-tinta` #2a1d12 (texto sobre papel), `--color-carimbo` #c1432e (vermelho de carimbo de borracha, único acento quente), `--color-grafite` #9fae9e (texto secundário sobre o pano). Fontes: **Piazzolla** (serif editorial, títulos), **Inter** (corpo) e **Caveat** (manuscrita — só pros rótulos "escritos à mão": nome da marca, legenda da orelha ativa, dedicatórias/notas de margem). Nenhuma das três é usada em outro projeto do repositório (Traço usa Fraunces, Âncora usa Spectral, Cerne usa DM Serif Display, Taça usa Newsreader).

Mecanismo deliberadamente diferente dos outros projetos que já reestruturaram a navegação em algo temático: não é um painel que expande num carimbo de prancha (Traço), não é uma corrente/corda de scroll-spy numa coluna fixa (Âncora), e não é clicar num cômodo de planta baixa pra trocar o conteúdo abaixo (Cerne) — aqui a navegação fica sempre visível (nunca expande/colapsa) e o conteúdo nunca troca de lugar, só rola até a seção.

## Conteúdo — o "honesto e específico" em vez de genérico

O acervo (`src/data/livros.ts`) é a peça central da promessa "cada exemplar é único": cada ficha tem uma nota de margem concreta — página exata do grifo, texto literal da dedicatória, onde fica a mancha de café — nunca um adjetivo solto tipo "bom estado". O processo (`Processo.tsx`) usa quatro carimbos (RECEBIDO / AVALIADO / CATALOGADO / À VENDA) em vez de numeração circular genérica, reaproveitando o mesmo vocabulário de "carimbo de tinta" que já aparece no preço de cada ficha (`.carimbo-preco`, borda irregular imitando carimbo batido à mão).

## Componentes

- `Orelha.tsx` — nav: fileira vertical fixa na borda direita em desktop (`lg:`), vira fileira horizontal fixa no rodapé em mobile/tablet. Scroll-spy via `IntersectionObserver` (`useSecaoAtiva`), com o mesmo ajuste de "força a última seção perto do fim da página" usado em outros projetos do repositório (Traço, Âncora) porque a faixa de observação não cobre o rodapé.
- `Hero.tsx` — `FichaDestaque`: uma ficha de venda ilustrativa (não é produto real do catálogo abaixo, é vitrine) com dedicatória e preço carimbado.
- `Catalogo.tsx` — grade de 6 fichas (`data/livros.ts`), cada uma com edição, nota de margem específica, tag de estado e preço em `.carimbo-preco`.
- `Processo.tsx` — as quatro etapas carimbadas + menção à curadoria (nome fictício) e ao sarau de troca de livros.
- `Contato.tsx` / `DemoDialog.tsx` / `demo.ts` — WhatsApp em modo demonstração, mesmo padrão do `traco/src/demo.ts` (nunca aponta pro número real; o diálogo explica que é conceito e oferece o WhatsApp real da Madolio).
- `Footer.tsx` — aviso de conceito fictício + link pra `https://madolio.com.br`.

## Padding pra não colidir com a nav fixa

`main` tem `lg:pr-14` (espaço pra fileira de orelhas na borda direita em desktop) e `Footer.tsx` tem `pb-24 lg:pb-10` (espaço pra fileira de orelhas no rodapé em mobile, que senão ficaria colada no texto do rodapé).
