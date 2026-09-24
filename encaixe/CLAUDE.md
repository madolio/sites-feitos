# Encaixe (conceito)

Site-conceito da Madolio pro nicho de **alfaiataria sob medida**. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Histórico — 3 reformulações completas

1. **v1**: marcenaria sob medida — catálogo em desenho técnico de elevação + régua de carpinteiro como nav + um movimento automático (espiga deslizando).
2. **v2**: ainda marcenaria, mas com o tipo de encaixe (rabo-de-andorinha, espiga-e-furo, etc.) organizando o site inteiro — abas + slider de montagem arrastável, catálogo filtrado pelo tipo escolhido.
3. **v3 (esta)**: feedback direto — "aqui, muito ruim mesmo, reformule 100% até a ideia", seguido de "na verdade muda até essa ideia de moveis, me de outras". Não era mais um problema de execução, era o nicho inteiro. Perguntei direções novas e o usuário escolheu **alfaiataria sob medida**.

**O nome "Encaixe" foi mantido de propósito** — cai igualmente bem pra roupa ("a roupa encaixa em você", o caimento perfeito de uma peça sob medida) quanto caía pra marcenaria. Isso evitou trocar marca, domínio e todo o "esqueleto" de arquivos — só o negócio por trás mudou.

## Deploy (Cloudflare Workers)

Worker `encaixe`, em `https://encaixe.sneakpeek.workers.dev`. `npm run deploy`.

## O conceito v3: configurador de orçamento, não navegação temática

As duas versões anteriores tentavam fazer o **tema** (encaixe de marcenaria) carregar a página inteira — régua, slider, filtro. Essa v3 é deliberadamente mais direta: em vez de uma metáfora sendo a navegação, o site oferece uma **ferramenta que a pessoa realmente usaria antes de fechar negócio com um alfaiate** — um orçamento.

- **`Configurador.tsx`** (no Hero): escolhe peça (blazer/calça/colete/camisa), tecido (lã fria/linho/flanela/tweed/algodão egípcio) e corte (slim/clássico/oversized). Preço e prazo são calculados ao vivo (`data/configuracao.ts`: `precoBase` de cada peça × multiplicador do tecido × multiplicador do corte — nunca um número solto), e o figurino técnico ao lado atualiza pra mostrar a combinação escolhida. O botão final já manda a mensagem de WhatsApp com peça, tecido, corte, preço e prazo.
- **`Catalogo.tsx`** voltou a ser uma vitrine simples (sem filtro/estado compartilhado) — mostra as 4 peças de referência, cada uma com seu figurino e um convite pra usar o configurador acima pra outras combinações.

## Desenho técnico — de elevação de móvel pra figurino plano

`desenho.ts` foi reescrito do zero: as funções `desenharMesa`/`desenharBanco`/etc. (elevação de móvel) saíram, substituídas por `desenharBlazer`/`desenharCalca`/`desenharColete`/`desenharCamisa` — **figurino técnico plano** (o "flat sketch" que a indústria de moda usa pra registrar corte e costura sem corpo dentro), mesma ideia de "nunca foto" da versão anterior, aplicada a roupa em vez de móvel. O tipo `Desenho` (tracos/junta/cota/viewBox) não mudou — `DesenhoTecnico.tsx` é 100% genérico e não precisou de nenhuma alteração de lógica, só os nomes de variável de cor (`--color-wood` → `--color-fio`, representando fio/costura em vez de madeira).

**Gotcha real, pego em teste:** em `desenharCalca` e `desenharCamisa`, a cota de tamanho (embaixo) e o rótulo do detalhe em destaque (no meio da peça) ficaram próximos demais verticalmente pro `viewBox` original de `200` de altura — os dois textos colidiam e ficavam ilegíveis. Corrigido aumentando a altura do `viewBox` (`calça`: 200→220, `camisa`: 200→215) e reposicionando a cota pra baixo do que qualquer outro elemento.

## Sequência real → numeração

`Processo.tsx` numera as seis etapas reais de alfaiataria (medição → tecido → molde → primeira prova → costura → prova final e entrega) — refeitas do zero pra alfaiataria, não reaproveitadas do texto de marcenaria.

## Referência visual — mantida

Paleta (`--color-paper` #efe8d8, `--color-ink` #2a2420, `--color-accent` #34586c) e fontes (**Fraunces** + **Work Sans**) não mudaram — o tom "caderno de bancada"/kraft funciona bem pra ficha técnica de alfaiate também. `rounded-none` em tudo.

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.

## Adição — FAQ e depoimentos (2026-09-21)

Padrão replicado em vários projetos do monorepo: seção de dúvidas frequentes (`Faq.tsx`) e prova social (`Depoimentos.tsx`), posicionadas depois de `Processo` e antes de `Contato`. Pura adição, sem tocar em `Hero`, `Configurador` (o mecanismo central do site) ou nos tokens de cor/fonte do `index.css`.

- **`Faq.tsx`**: acordeão acessível (`useId` + `useState`, `aria-expanded`/`aria-controls`, painel com `role="region"`), seis perguntas reais de pré-venda pra alfaiataria sob medida (provas, prazo, tecido próprio, ajuste pós-entrega, ajuste de peça externa, pagamento). Usa os tokens já existentes do projeto (`text-fio`, `border-line`, `.rotulo`, `font-heading`) em vez dos de `razao` (`text-selo`/`dado-fiscal`).
- **`Depoimentos.tsx`**: três depoimentos curtos e específicos (blazer, colete, calça), citando etapas reais do `Processo` (prova, tecido próprio, figurino técnico) pra soar concreto em vez de genérico.
- Ambos usam `Reveal` como o resto do site, respeitando `prefers-reduced-motion`.
