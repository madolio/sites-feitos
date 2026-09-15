# Realce & Cia (redesenho conceitual)

Redesenho do site do **Realce & Cia**, salão de beleza e escola de cabeleireiros que **existe de verdade** em São Roque (SP), desde 2004. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Isto NÃO é um conceito fictício

Todos os outros projetos desta pasta são negócios inventados. Este não é — e isso muda as regras:

- **Nenhum preço em lugar nenhum.** Não temos a tabela deles; publicar valor inventado seria divulgar informação falsa sobre um negócio real. A seção de serviços explica por que o orçamento vai na mensagem em vez de ficar na página.
- **Nenhum nome de profissional, depoimento, número de clientes ou prêmio.** Nada disso existe no material público deles.
- **Nenhum telefone na página.** Eles publicam dois números, mas o site não os mostra: todo botão passa pelo modo demonstração, e imprimir o número atrairia ligação de verdade pra um salão que não encomendou este site.
- **O rodapé declara** que é conceito da Madolio, não o site oficial, e que os textos descritivos são ilustrativos.

Fatos reais usados (do site atual + ficha pública): nome, "desde 2004", endereço (Av. Anhanguera 388, Jardim Bandeirantes, São Roque-SP, 18134-240), horário (segunda fechado, terça a sábado 9h–19h), a lista de serviços, o fato de ser salão **e escola**, e o slogan "sua beleza é seu cartão de visita" (no site atual sai com erro de digitação, "cartão de vista" — aqui está corrigido).

Erros do site antigo que este corrige: link de e-mail apontando pro placeholder `info@example.com`, calendário desatualizado e ícones de rede social sem link.

## Deploy (Cloudflare Workers)

Worker `realce`, em `https://realce.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Camarim"

- **Lugar/objeto:** camarim de teatro. Parede verde profunda, espelho com lâmpadas quentes em volta, ferragem de latão.
- **Colisão:** a marca se chama *Realce* — a página é literalmente sobre a luz que realça.
- **Nunca parecer:** o kit rosa/dourado/mármore/script que praticamente todo site de salão usa, nem o "Corte" (barbearia deste mesmo repositório, que usa painel de senha e quadro de preços).
- **Esqueleto próprio:** `Marquise.tsx` — no lugar de sublinhado ou pílula marcando a seção ativa, cada item da nav tem uma **lâmpada** que acende quando você entra na seção. A barra inteira é o espelho de camarim em miniatura.
- **Wildcard:** `MonteSuaVisita.tsx` — ver abaixo.
- **Efeito de assinatura:** `Lampadas.tsx` — lâmpadas posicionadas por trigonometria ao longo de um arco, acendendo em sequência (sobe pela esquerda, cruza o arco, desce pela direita) como alguém ligando o espelho numa chave só. Usado no Hero e de novo no CTA final, fechando a página.

## O wildcard: montar a visita

O problema real de um salão com 14 serviços de durações muito diferentes é que ninguém sabe o que cabe na própria manhã. Então:

1. Você escolhe os serviços **na ordem** em que quer fazer.
2. Escolhe a hora de chegada (09:00 a 17:00, dentro do expediente).
3. A agenda monta sozinha: cada serviço vira um bloco com **altura proporcional à duração**, com horário de início e fim calculados em cadeia.
4. Mostra total e horário de saída, e **avisa se a visita passa das 19h** (fechamento) — detalhe que quase nenhum site de agendamento trata.
5. O botão gera uma mensagem de WhatsApp com o itinerário inteiro escrito, em vez do "olá, quero agendar" genérico.

A duração de cada serviço fica em `src/data/servicos.ts` e é a **mesma fonte** usada pela lista de serviços — não existem dois números pra conferir.

### Gotcha: altura do bloco da agenda

Os blocos usam `min-height`, **nunca `height`**, com piso de 78px. Com `height` fixo, um serviço de 30 min (56px na primeira versão) ficava menor que o próprio conteúdo (horário + nome + botão "tirar") e o texto vazava por cima do bloco seguinte — bug real, pego em screenshot de navegador.

## Paleta e contraste

`--color-noite` (#14201c, parede do camarim) + `--color-luz` (#f6ecd9, luz de lâmpada quente) + `--color-jade` (#1d6b57) + `--color-jade-claro` (#4fae8f) + `--color-latao` (#c08a3e) + `--color-fumo` (#8a9a92) + `--color-grafite` (#3e4a45).

O jade vem do verde/teal que eles já usam na identidade atual — a paleta respeita a marca deles em vez de inventar uma do zero.

Pares testados (proporção WCAG calculada, não estimada):

| par | razão | uso |
| --- | --- | --- |
| `luz` sobre `noite` | 14,3:1 | texto principal em seção escura |
| `fumo` sobre `noite` | 5,7:1 | texto secundário em seção escura |
| `jade-claro` sobre `noite` | 6,2:1 | destaque em seção escura |
| `latao` sobre `noite` | 5,6:1 | rótulos e filetes em seção escura |
| `grafite` sobre `luz` | 7,9:1 | texto secundário em seção clara |
| `jade` sobre `luz` | 5,4:1 | destaque em seção clara |

**Os dois que NÃO passam:** `jade` sobre `noite` (2,6:1) e `latao` sobre `luz` (2,6:1). Em fundo escuro usar `jade-claro`; o latão só entra sobre fundo escuro, e sobre fundo claro nunca como texto.

Fontes: **Bodoni Moda** (display — didone de alto contraste, marquise de teatro) + **Karla** (corpo).

## Animação: por que sem GSAP

As animações daqui são só `opacity`/`translate`. A classe utilitária `transition` do Tailwind brigaria com o GSAP nessas mesmas propriedades (gotcha já documentado em outros projetos do repositório), então a revelação por rolagem é um `IntersectionObserver` único (`useRevelar.ts`) ligando `data-visivel` na classe `.revelar`, e o resto é `@keyframes` CSS. Zero dependência de animação no bundle.

`useRevelar` só observa o que existe no primeiro render — blocos da agenda montada aparecem depois e de propósito **não** usam `.revelar`.

## Modo demonstração

`demo.ts` + `DemoDialog.tsx`, igual aos outros projetos, com o texto adaptado pro fato de o salão ser real. `<dialog>` já nasce com `m-auto` (sem isso o preflight do Tailwind zera a margem e o modal cola no canto — bug corrigido em 19 projetos deste repositório).

## SEO

`index.html` tem meta description, canonical, Open Graph e **JSON-LD `HairSalon`** com endereço e `openingHoursSpecification` reais (sem `telephone`, pelo mesmo motivo acima). `public/robots.txt` e `public/sitemap.xml` existem.
