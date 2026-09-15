# Encaixe (conceito)

Site-conceito da Madolio pro nicho de marcenaria sob medida. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Conceito

Não é foto de móvel nenhuma vez no site — cada peça do catálogo é um **desenho técnico de elevação** (linha, cota, sem sombreado), como se a página fosse uma folha de bancada de marceneiro. O motivo aparece no próprio hero, texto e produto: "móvel que se sustenta pelo encaixe, não pelo parafuso".

`src/desenho.ts` gera as linhas de cada arquétipo de móvel (mesa, banco, estante, cadeira, aparador, banqueta) por coordenadas — não são ilustrações desenhadas peça a peça; mesa e aparador, por exemplo, só variam a largura da função geradora. Cada `Desenho` carrega também uma cota de largura e o ponto do encaixe em destaque, que o `DesenhoTecnico.tsx` desenha com um círculo e o nome do encaixe ao lado — a etiqueta descreve o encaixe de verdade daquela peça, não é rótulo decorativo.

## Reformulação total — o encaixe (não o móvel) organiza o site

Pedido do usuário, depois de já ter trocado só a ilustração numa rodada anterior: "reformule 100% até a ideia". Não bastava trocar a ilustração de novo — o conceito de base mudou.

**Antes:** régua de carpinteiro fixa como nav lateral (`Regua.tsx`) + catálogo estático com scroll + um movimento automático único no Hero, tocando uma vez ao carregar.

**Agora:** o tipo de encaixe é o eixo de tudo. `data/encaixes.ts` define os 4 tipos reais que aparecem no catálogo (rabo-de-andorinha, espiga-e-furo, meia-madeira, cavilha), cada um com sua descrição estrutural verdadeira (por que aquele encaixe é usado, não decoração). O estado de qual tipo está selecionado mora em `App.tsx` e é compartilhado por dois componentes:

- **`EncaixeInterativo.tsx`** (no Hero) — abas pros 4 tipos + um `<input type="range">` que o visitante arrasta pra montar o encaixe escolhido, do zero ao cem por cento, na velocidade que quiser. Isso substitui o "único movimento não pedido" (que tocava uma vez, sozinho, sem controle) por uma interação de verdade — de passivo pra exploratório.
- **`Catalogo.tsx`** — filtra as peças pelo tipo selecionado (`tipo.match(peca.encaixe)`), mostrando só quem usa aquele encaixe e quantas são, em vez da lista inteira sempre visível.

`Regua.tsx` foi removido por completo (não deixado como código morto) e substituído por `TopoSimples.tsx`, uma barra fixa simples com marca + contato — a navegação real agora é escolher o encaixe, não rolar a página.

### Geometria por tipo (`EncaixeInterativo.tsx`)

Cada ilustração usa a mesma convenção (peça fixa em `--color-ink`, peça móvel em `--color-wood`/`--color-wood-dark`) com uma forma diferente:

- **Rabo-de-andorinha**: zigue-zague triangular entrelaçando.
- **Espiga-e-furo**: um retângulo (espiga) que preenche um vão retangular.
- **Meia-madeira**: cada peça perde a metade da espessura exatamente onde se cruzam.
- **Cavilha**: duas tábuas retas que se encontram, com dois pinos (círculos) entrando em dois furos.

A peça móvel é sempre definida na **posição de repouso** (`avanco = 0`, separada) e recebe `translateX(-avanco * amplitude)` — nunca o contrário, senão a peça nasce encaixada e "desmonta" ao arrastar pra frente, que é o inverso do que o controle promete.

**Gotcha real, pego em teste:** com a peça na posição separada, as coordenadas passam de x=320 (o viewBox é `0 0 320 200`), e como o SVG tinha `overflow-visible`, esse trecho vazava pra fora do card e criava overflow horizontal na página — visível principalmente no celular. Corrigido envolvendo o SVG num `<div className="overflow-hidden">`: a peça afastada agora é recortada pela borda do card, como se estivesse fora de quadro, em vez de vazar pela página.

## Sequência real → numeração

`Processo.tsx` numera as seis etapas (conversa → madeira → desenho do encaixe → corte → acabamento → entrega) porque **são**, de fato, uma sequência fixa de atendimento.

## Referência visual — mantida

Paleta (`--color-paper` #efe8d8, `--color-ink` #2a2420, `--color-accent` #34586c, `--color-wood` #8b5a34) e fontes (**Fraunces** + **Work Sans**) não mudaram — o pedido era sobre a ideia/estrutura, não sobre cor. `rounded-none` em tudo: cantos são encaixados, não arredondados.

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.
