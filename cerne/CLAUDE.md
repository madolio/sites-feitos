# Cerne (conceito)

Site-conceito da Madolio pro nicho de design de interiores. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

**Refeito em set/2026** — a primeira versão (duas colunas fixas com painel sticky trocando de ilustração via scroll) não agradou: nem o esqueleto, nem a execução visual. Reconstruído do zero mantendo só o nicho. Ver também Tinta (rolagem horizontal), Balcão (catálogo sem hero) e Rota (layout de dashboard), feitos na mesma leva de "esqueletos diferentes".

## Deploy (Cloudflare Workers)

Worker `cerne`, em `https://cerne.fenoninho-max.workers.dev`. `npm run deploy`.

## O esqueleto — planta baixa interativa, sem scroll controlando nada

`Explorador.tsx` é a página inteira: uma coluna só, sem hero, sem duas colunas, sem `IntersectionObserver`. A planta baixa (`Planta.tsx`) é a própria navegação — cada cômodo é um `<rect>` clicável (`data/casos.ts` guarda a geometria de cada sala no mesmo `viewBox="0 0 480 320"` pra todos os 4 casos); clicar num cômodo troca o conteúdo de `DetalheSala.tsx` logo abaixo, sem depender de rolagem. Trocar de caso (`Seletor.tsx`, abas) reseta a sala selecionada pra primeira da planta nova.

Essa foi a correção direta do que não funcionou na v1: o usuário rejeitou especificamente o esqueleto de duas colunas com painel sticky — aqui não existe coluna fixa nem estado amarrado a scroll, é 100% clique.

## Referência visual (trocada na v2)

Paleta: `--color-paper` #faf7f2 (branco quente), `--color-panel` #f1ece3 (fundo da moldura da planta), `--color-ink` #221f1c, `--color-pine` #2f4a3e (verde-pinheiro, mais frio/escuro que o musgo da v1 — validado ~9:1 sobre o paper, bem confortável como texto). Fontes: **DM Serif Display** (títulos) + **DM Sans** (corpo) — nenhuma das duas usada em outro projeto do repositório (a v1 usava Petrona/Sora, agora livres pra outro projeto).

Antes eram 4 tipos de ilustração diferentes (planta/corte/axonometria/paleta de material) — um sistema visual disperso. Agora é **um sistema só**: a planta baixa, sempre. Mais coerente e mais forte como identidade.
