# Marcha (conceito)

Site-conceito da Madolio pro nicho de **concessionária de esportivos/muscle cars**. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + GSAP (Reveal). Página única.

Pedido: "quero uma agência de carros, dessa vez coloque até imagens" — o primeiro projeto do repositório a usar fotografia de verdade, quebrando de propósito o princípio "nunca foto" dos demais (o Estufa Cheia também usa fotos reais desde 17/09/2026, mas o Marcha abriu a exceção).

## Deploy (Cloudflare Workers)

Worker `marcha`, em `https://marcha.fenoninho-max.workers.dev`. `npm run deploy`.

## Fotos reais — banco de imagens livre, sem inventar marca

As 7 fotos em `public/carros/` são reais (Unsplash, licença livre pra reuso), baixadas com `curl` e conferidas uma a uma antes de usar. **Cuidado tomado de propósito**: descartei candidatas com placa real legível (ex: uma foto de Porsche com placa americana nítida) e nunca legendei nenhum carro com o nome da marca visível na foto (BMW, Chevrolet, etc.) — cada item do estoque (`data/estoque.ts`) é descrito por categoria/especificação genérica ("Cupê performance", "Muscle car preparado"), não por marca, porque a ficha é fictícia e a foto não é do carro que a Marcha "realmente tem".

**Gotcha real**: reusei a mesma URL do Unsplash por engano em dois downloads diferentes, gerando um arquivo duplicado sob nomes diferentes — pego via `md5sum` nos 7 arquivos antes de montar o site, não confiando só no nome do arquivo.

## Calculadora de financiamento — fórmula real, não estimativa

`financiamento.ts`: tabela price (`PMT = P × i × (1+i)ⁿ ÷ ((1+i)ⁿ − 1)`), a mesma fórmula de amortização usada por qualquer financeira de veículo. `Financiamento.tsx` deixa escolher o carro do estoque, a entrada (%) e o número de parcelas, e a parcela mostrada é sempre calculada a partir do preço real daquele carro — nunca um valor solto.

## Paralaxe do Hero — sem lib, barato

`Hero.tsx` move a imagem de fundo mais lento que o scroll via `transform: translate3d` num loop de `requestAnimationFrame`, respeitando `prefers-reduced-motion`. Não usa GSAP aqui (Reveal.tsx é usado nas outras seções) porque é um efeito contínuo ligado à posição do scroll, não uma entrada única — não precisa de ScrollTrigger.

## Referência visual

Paleta: `--color-preto` #0b0b0c, `--color-acento` #ff3b30 (vermelho, validada ~5,5:1 sobre preto — acima do mínimo AA). Fontes: **Space Grotesk** (títulos) + **Inter** (corpo) + **IBM Plex Mono** (rótulos técnicos). `CampoNumero.tsx` (mesmo padrão de Lúmen/Ferro/Taça) no lugar das setinhas nativas de input number.
