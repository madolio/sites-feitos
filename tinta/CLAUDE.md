# Tinta (conceito)

Site-conceito da Madolio pro nicho de estúdio de tatuagem. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Feito pra ter um **esqueleto de página** genuinamente diferente dos outros conceitos do portfólio — ver a instrução original do usuário: "mude o esqueleto da página, parece tudo a mesma coisa". Ver também Cerne (duas colunas fixas), Balcão (catálogo sem hero) e Rota (layout de dashboard), feitos na mesma leva.

**Redesenhado uma vez** (a pedido do usuário: "reformule essa também", mesma leva do redesign do Taça). O esqueleto de rolagem horizontal (`Trilho.tsx`) não mudou — continua bom e continua sendo o diferencial da página. O que mudou foi o painel do meio: era uma grade estática de flash que só abria WhatsApp; agora é um provador (`PainelProvador.tsx` + `Corpo.tsx`) — ver seção própria abaixo.

## O painel novo: prova antes de marcar

`Corpo.tsx` desenha uma figura de referência (traço único, mesmo estilo do `Flash.tsx` — gesto, não anatomia exata) com cinco zonas marcadas (`data/flashes.ts`, array `zonas`: peito, ombro, antebraço, pulso, panturrilha, cada uma com posição e diâmetro no viewBox 220×480). Tocar numa zona a seleciona; escolher um desenho na grade ao lado "carimba" aquele flash exatamente ali em cima do corpo, na escala da zona — só libera o botão de marcar (com a combinação certa já escrita na mensagem) depois das duas escolhas.

O carimbo se desenha sozinho, como se a agulha estivesse traçando ali na hora: `Flash.tsx` ganhou a prop `animado`, que aplica `stroke-dasharray`/`-dashoffset` (320, maior que qualquer traço dos ícones de 120×120 — não precisa medir o comprimento real de cada `path`, só a margem) via a classe `.flash-traçando` em `index.css`. Cada troca de zona ou desenho muda a `key` do elemento carimbado em `PainelProvador.tsx`, forçando remount — é o jeito mais simples de replayar a animação CSS em React sem gerenciar classes manualmente.

## Deploy (Cloudflare Workers)

Worker `tinta`, em `https://tinta.fenoninho-max.workers.dev`. `npm run deploy`.

## O esqueleto — a página inteira rola de lado

`Trilho.tsx` é o esqueleto: 4 painéis (`PainelAbertura`, `PainelProvador`, `PainelArtistas`, `PainelContato`), cada um com `width: 100vw`, dentro de um trilho `overflow-x: auto` com `scroll-snap-type: x mandatory` (classe `.trilho`/`.panel` em `index.css`). Não é vertical com `transform: rotate` — é rolagem horizontal real.

- **Desktop:** o wheel vertical do mouse/trackpad é redirecionado pro `scrollLeft` do trilho via `onWheel` (só quando o gesto é majoritariamente vertical — `Math.abs(deltaY) > Math.abs(deltaX)` — pra não atrapalhar quem já rola de lado num trackpad). O CSS `scroll-snap` cuida de encaixar no painel mais próximo ao soltar.
- **Mobile:** nada de JS — o arrasto lateral do dedo já produz `scrollLeft` nativamente; só o scroll-snap.
- **Navegação:** bolinhas fixas embaixo (clicáveis, mostram o painel ativo) + uma seta `→` fixa à direita (some no último painel, com `tabIndex={-1}` e `pointer-events-none` nesse estado — não só invisível, também não-focável).
- **Sem barra de navegação horizontal** (não faria sentido no meio de uma página que já rola de lado): só a marca "Tinta" fixa no canto esquerdo e um atalho "Marcar →" no direito, que pula pro último painel via `scrollTo` direto no elemento `#trilho`.

**Gotcha de teste:** rolagem horizontal não dá pra testar com screenshot `fullPage` (isso assume crescimento vertical do documento). Testar tirando print do viewport fixo em cada posição de `scrollLeft` (`el.scrollTo({ left: i * el.clientWidth })`), não com scroll de página. E, como em todo projeto Cloudflare Vite: reiniciar o `vite preview` depois de rebuildar, senão o navegador recebe HTML no lugar do `.js` (erro de MIME type) porque o preview antigo não pega os novos hashes de asset sozinho.

## Referência visual

Paleta: `--color-void` #121212 (fundo, quase preto, não o `--color-void` #0a0d14 do madolio nem o `--color-carbon` #141414 do Confete — tom ligeiramente diferente de propósito), `--color-paper` #f5f5f0 (texto), `--color-ember` #ff3b3b (vermelho de flash tattoo — validado ~5.3:1 sobre o void, seguro como texto). Fontes: **Staatliches** (pôster, condensada) + **Inter** (corpo) — nenhuma das duas usada em outro projeto do repositório.

`Flash.tsx` tem as 6 ilustrações estilo "flash sheet" tradicional (rosa, punhal, andorinha, raio, cobra, âncora) — traço grosso único, sem preenchimento, nunca foto.
