# Estufa Cheia (conceito)

Site-conceito da Madolio pro nicho de **floricultura e paisagismo**. **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + GSAP. Página única.

## Deploy (Cloudflare Workers)

Worker `estufa`, em `https://estufa.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Lugar/objeto real:** estufa de vidro / jardim botânico — vidro, luz filtrada, crescimento úmido e controlado.
- **Emoção em 3s:** abundância — densidade, cor cheia, um jardim transbordando, o oposto de minimalismo esparso.
- **Colisão:** floricultura/paisagismo × catálogo científico real de botânica — nomenclatura binomial em latim, ficha de espécime real, ilustração técnica (estilo herbário/field guide), nunca foto de buquê de banco de imagem.
- **Nunca parecer:** e-commerce genérico de flor (grade de produto + preço + carrinho), floricultura pastel-com-fonte-cursiva-e-foto-de-buquê, ou site institucional corporativo (hero gradiente, cards de serviço, "por que nos escolher").

## O wildcard — ficha de espécime, não card de produto

`EspecimeCard.tsx` + `data/especies.ts`: cada uma das 6 espécies do catálogo (Strelitzia reginae, Aechmea fasciata, Heliconia psittacorum, Cattleya labiata, Zantedeschia aethiopica, Tibouchina granulosa) tem nome binomial completo (gênero + epíteto + autoridade botânica, ex. `Cattleya labiata Lindl.`), família, origem, exigência real de luz/água, estação de floração real e nível de cuidado — dado de catálogo/viveiro, pesquisado, não inventado (ex.: a Cattleya labiata floresce no outono e foi a espécie que reacendeu a febre europeia por orquídeas em 1818; o copo-de-leite tem espata, não pétala; a quaresmeira floresce em março–maio, coincidindo com a quaresma católica, daí o nome). Cada ficha também tem uma **ilustração técnica em linha** (`EspecieIlustracao.tsx`, SVG puro, sem preenchimento sólido, traço fino) — estrutura da planta, não still-life fotográfico, no espírito de prancha de herbário.

## Abundância como estrutura, não decoração

`Hero.tsx` (`GrandeEstufa`): o hero inteiro é uma cena de estufa desenhada em SVG — arcos de estrutura de vidro no fundo + ~48 silhuetas de folhagem sobrepostas preenchendo a base de ponta a ponta, densidade real de composição em vez de uma planta única centralizada em espaço vazio. É a resposta direta ao pedido de "abundância" e ao padrão do portfólio contra páginas "mortas, sem vida".

## A assinatura de movimento: a videira que cresce (`VideiraCrescente.tsx`)

Em vez de reveal genérico por fade, a seção de espécies tem uma videira em SVG que se desenha via `strokeDasharray`/`strokeDashoffset` amarrado a um `scrollTrigger` com `scrub` — o traço "cresce" conforme a página rola, e folhas (`<g class="folha">`) desenrolam de escala 0.2 pra 1 com `back.out` no ritmo em que o traço passa por elas. É a metáfora de crescimento vegetal aplicada literalmente ao mecanismo de animação, não só ao conteúdo. Tudo dentro de `gsap.matchMedia()`: com `prefers-reduced-motion: reduce`, o traço e as folhas aparecem completos e estáticos, sem depender de scroll.

`Reveal.tsx` é o componente padrão do repositório (copiado do `site-template`) pra fade+subida em scroll nas demais seções — mesma guarda de `prefers-reduced-motion`.

## Modo demonstração

Igual a Bruma/Fornada/Pulso: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real — mostra a mensagem que seria enviada e oferece o contato da Madolio. O formulário de encomenda (`Encomenda.tsx`) monta a mensagem a partir da espécie escolhida num `<select>` + ocasião opcional, então o texto que aparece no modal de demonstração já reflete o pedido real que a pessoa montou.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card (sem `og:image` — não existe imagem gerada pra este conceito, mesmo padrão da Fornada) e JSON-LD `FloristShop`. `public/robots.txt` e `public/sitemap.xml` existem.

## Referência visual

Paleta: `--color-mata` #10241c (verde quase-preto, fundo escuro/texto), `--color-vidro` #f3efe1 (creme quente, fundo claro — vidro da estufa sob luz), `--color-musgo` #4c7a3f (verde-musgo, acento primário), `--color-terracota` #c17a3a (barro de vaso, CTA), `--color-linha` #d8cfb8 (borda sobre o vidro). Nenhum hex reciclado dos outros 32 projetos do repositório (conferido contra todos os `index.css`/`CLAUDE.md` do monorepo antes de fechar a paleta).

Fontes: **EB Garamond** (display — itálico pro nome científico, como convenção real de nomenclatura binomial) + **Inter** (corpo) + **Spline Sans Mono** (só pra dado real de ficha: luz, floração, família — nunca decorativo). Nenhuma das três usada em outro projeto do repositório, e a combinação como trio também é inédita (EB Garamond aparece só no `site-template`/Torre com pareamento diferente; Spline Sans Mono e a combinação completa não apareciam em nenhum outro `CLAUDE.md`).

## Decisões

- Owner fictícia: **Iara Bicalho**, paisagista e florista, Nova Friburgo/RJ — cidade real conhecida como polo de floricultura de clima serrano, coerente com espécies de meia-sombra/sombra filtrada do catálogo.
- 6 espécies em vez de um catálogo enorme: profundidade de dado real por espécie (nota biológica específica, não genérica) importava mais que quantidade — mesmo princípio de "dado ao vivo, nunca solto" já usado em outros projetos do repositório (Lúmen, Fornada).
- `Processo.tsx` documenta metodologia real de paisagismo (leitura do local → escolha por espécie → cultivo → ficha de cuidado entregue), evitando o "por que nos escolher" genérico proibido pelo Vibe Discovery.
