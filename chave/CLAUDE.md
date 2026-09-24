# Chave (conceito)

Site-conceito da Madolio pro nicho de imobiliária/corretora. **Negócio fictício** — não existe (todos os imóveis listados são exemplos, não estão à venda de verdade). Vite + React 19 + TypeScript + Tailwind v4. Página única.

Um dos 6 conceitos com estilo E estrutura próprios — ver também Pulso, Focinho, Corte, Revelar, Passaporte.

## Deploy (Cloudflare Workers)

Worker `chave`, em `https://chave.sneakpeek.workers.dev`. `npm run deploy`.

## Vibe — "Classificados"

- **Lugar/objeto:** a página de classificados de imóveis de um jornal impresso.
- **Colisão:** imobiliária × classificados de jornal — colunas densas, filete entre colunas, sem nav.
- **Nunca parecer:** planta baixa (isso já é do Traço) ou quadro de chaves óbvio.
- **Wildcard:** `Masthead.tsx` **não é fixo** — rola junto com a página, como a manchete de um jornal de verdade. Nenhum outro site desta leva tem cabeçalho não-persistente; é a página inteira sendo "só pra ler", sem barra de navegação alguma, nem flutuante.

Paleta: `--color-ink` #1a1a1a, `--color-paper` #efece4 (papel-jornal), `--color-steel` #3b5b70 (única cor de marca, validada a ~6:1 contra o papel). Fontes: **PT Serif** (manchete/corpo) + **Roboto Condensed** (classificados, texto denso).

## Arquitetura — colunas de jornal, não grade de cards

`Classificados.tsx` usa `column-count` de CSS puro (`.classificados`, em `index.css`: 1 coluna no celular, 2 no tablet, 3 no desktop, com `column-rule` entre elas) em vez de um grid — os anúncios fluem como texto de jornal, não como cards numa grade. `TipoIcon.tsx` são ícones de traço simples (não fotos, já que os imóveis não existem) por tipo de imóvel.

## Gotcha de contraste — o padrão `/45`, `/55`, `/60` que funcionava em outros projetos falhou aqui

Cuidado: o mesmo `text-ink/60` (ou `/55`, `/45`) que passa em outros projetos desta leva **falhou** aqui porque o par de cores é diferente (`#1a1a1a` sobre `#efece4`, ambos com luminância um pouco diferente dos outros projetos). Calculado e confirmado: `/60` dá só 4.32:1 (abaixo do mínimo), `/55` dá 3.71, `/45` dá 2.79 — todos reprovam. **`/65` é o piso seguro pra texto secundário neste par de cores específico** (dá ~5.05:1). Todos os `text-ink/45`, `/55` e `/60` originais foram trocados pra `/65`.

**Lição geral pras próximas sessões:** a opacidade "segura" de uma cor de texto **não é um número universal** — muda com cada combinação de tom de tinta e de papel. Sempre calcular o contraste (ou pelo menos testar `/65` como primeiro palpite conservador) em vez de copiar a opacidade que funcionou no projeto anterior.

## FAQ e prova social (`Faq.tsx` / `Depoimentos.tsx`)

Adicionados depois de `Classificados.tsx` (o wildcard de coluna de jornal),
antes de `Contato.tsx`, seguindo o mesmo padrão já usado no `razao`
(`Faq.tsx`/`Depoimentos.tsx` de lá). Conferido antes por grep em `src/` por
"FAQ", "Depoimento" e "Avalia": nada existia ainda, então os componentes são
novos, não uma extensão de algo que já estava lá.

- `Faq.tsx`: acordeão acessível, mesmo padrão do `razao` (`<button
  aria-expanded aria-controls>` + `<div id role="region">`, operável por
  teclado por ser `<button>` nativo, sem animação própria além da
  transição de rotação do `+`, que já é `motion-reduce:transition-none`).
  Seis perguntas específicas de quem tá decidindo visitar ou fechar um
  imóvel do classificado (como agendar visita, se o anúncio ainda tá de pé,
  se comissão é cobrada de quem procura, quais documentos levar pra alugar
  ou comprar, se trabalham com financiamento, o que significa o selo
  "Novo"), com políticas fictícias mas coerentes com o resto do site (o
  código do anúncio citado, CH-1042, segue o mesmo formato de `data.ts`; o
  prazo do selo "Novo", 7 dias, é consistente com a lógica de `novo` já
  usada em `Classificados.tsx`).
- `Depoimentos.tsx`: três depoimentos curtos (Marina T. comprando em
  Pinheiros, Eduardo P. alugando em Vila Mariana, Camila S. vendendo em
  Cotia), cada um amarrado a um caso concreto do mecanismo do site (código
  de anúncio, seguro-fiança sem fiador, tempo entre publicar e vender), não
  elogio genérico. Estilizado como cartão de papel simples (borda `line`,
  fundo `paper`) num fundo levemente mais escuro (`bg-ink/[0.03]`) pra
  separar a seção sem introduzir nenhuma cor nova, mantendo o vocabulário
  de jornal (nenhum selo/emoji, nenhuma estrela).
- Ambas as seções reusam só tokens já existentes (`ink`, `paper`, `line`,
  `steel`) e o mesmo `Reveal.tsx` com GSAP + `IntersectionObserver` já
  usado no resto do site, sem alterar Hero, `Masthead.tsx` (o wildcard não
  fixo) nem `index.css`.
- Copy passada pelo skill `humanizer` antes de fechar (a única marca
  encontrada foi um travessão genérico na resposta 2 do FAQ, trocado por
  dois-pontos porque introduz uma consequência direta, não uma pausa
  decorativa).
