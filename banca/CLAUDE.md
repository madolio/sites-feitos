# Banca (conceito)

Site-conceito da Madolio pro nicho de floricultura de bairro. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

## Deploy (Cloudflare Workers)

Worker `banca`, em `https://banca.fenoninho-max.workers.dev`. Deploy manual:

```
npm run deploy   # = npm run build && wrangler deploy
```

## Por ser conceito: o WhatsApp é demonstração

Nenhum botão abre o WhatsApp de um número inventado (poderia ser de alguém de verdade). `sendToWhatsApp()` (`src/demo.ts`) dispara um evento que abre `DemoDialog.tsx`: mostra a mensagem que seria enviada e oferece o WhatsApp da Madolio ("Quero um site assim"). Se um dia virar cliente real, trocar `sendToWhatsApp` por `window.open('https://wa.me/NUMERO?text=' + encodeURIComponent(msg))`. O rodapé (`Contato.tsx`) também declara que o negócio é fictício — não remover.

## Vibe Discovery — "A Bancada"

- **Lugar/objeto:** a banca de flores de feira livre — fileira de baldes de metal/plástico com água, cada um guardando um tipo de flor, etiqueta de preço presa por barbante e furo, papel kraft e barbante pra embrulhar.
- **Emoção:** fartura fresca de manhã de feira — abundância, escolha na hora, não elegância vazia de boutique.
- **Colisão conceitual:** floricultura × banca de feira/mercado municipal, não florista minimalista.
- **Nunca pode parecer:** loja "boutique" de fundo creme, serif fina alto-contraste e tudo etéreo (o clichê nº1 de site gerado por IA).
- **Wildcard:** a navegação é literalmente a fileira de baldes (`Balde.tsx`) — cada um com nível de água que sobe quando a seção está em foco (scroll-spy) e desce em repouso, com uma florzinha da cor da seção espiando por cima da borda.

Evitado de propósito: não é a "roda de aromas" da Taça (RodaAromas.tsx) nem a "cartela de sabores" do Doce Ateliê (FanDeck.tsx) — em vez de girar ou abrir em leque, aqui o mecanismo é um nível de líquido que enche/esvazia, o mesmo vocabulário de "estoque/frescor" que uma banca de feira de verdade usa.

## Paleta e tipografia

Fundo `--color-bg: #edefe7` — cinza-esverdeado de concreto molhado, deliberadamente **não** o creme (~#F4F1EA) que a `frontend-design` skill lista como clichê nº1. Tinta `--color-ink: #16231c` (verde-preto, não marrom nem preto puro). Em vez de um accent de marca único, cada flor/seção carrega sua própria cor real: magenta (peônia), marigold (cravo/etiqueta), azul-céu (hortênsia), violeta (lisianthus), verde-folha (talo). `--color-kraft` é o papel de embrulho, usado de verdade no rodapé (`Contato.tsx`), não como decoração.

Tipografia: **Zilla Slab** (display — carimbo de crate/feira, não serif elegante de boutique) + **Schibsted Grotesk** (corpo). Nenhuma das duas repete a fonte de outro projeto do portfólio (Torre usa Space Grotesk, Doce Ateliê usa Bricolage Grotesque, Nascente usa Archivo).

## Componentes e de onde vieram os mecanismos

- `Balde.tsx` — o balde de feira em SVG puro (sem lib): corpo trapezoidal, aro, alça, e a água como um `<rect>` recortado por `clipPath` cuja altura anima via CSS (`.balde-agua`, transição de `height`/posição). Reusado em dois tamanhos: pequeno na navegação (`Bancada.tsx`), grande no hero (`Hero.tsx`, com o "ramalhete" completo).
- `Bancada.tsx` — a navegação. Desktop: barra fixa no topo com os 4 baldes ("Início", "Vitrine", "Como funciona", "Encomendar") apoiados numa tábua (`bg-kraft-escuro`), scroll-spy via `IntersectionObserver` decide qual balde está "cheio". Mobile: barra fina (marca + CTA + menu) que abre um grid de baldes menores.
- `Vitrine.tsx` — o catálogo. Cada buquê é uma etiqueta de preço de feira (`Etiqueta`): furo + barbante desenhados em SVG no topo, borda superior colorida pela flor, e uma "receita" (`<dl>`) listando os ingredientes exatos — não um card de SaaS com ícone em caixinha. Filtro por ocasião (`Para hoje/Aniversário/Um agrado/Condolências/Casamento`) é client-side.
- `Processo.tsx` — o "como funciona" é o caderno de encomendas da banca: espiral desenhada com bolinhas (`border-2 rounded-full`), linhas de caderno em `repeating-linear-gradient` mascarado, e cada etapa carimbada como "PEDIDO Nº 0X".
- `Contato.tsx` — rodapé em duas camadas: bloco kraft (`.textura-kraft`, ruído sutil via gradientes radiais) com o CTA de WhatsApp, depois o rodapé escuro com o aviso de negócio fictício e o link pra Madolio.

## Gotcha de teste: header fixo sem fundo

O `<header>` fixo do desktop (`Bancada.tsx`) precisa de `bg-bg/95 backdrop-blur` — sem isso o conteúdo que rola por trás aparece por cima dos baldes/nav (só a tábua de baixo tinha cor sólida). Pego via screenshot Puppeteer scrollado pra `#contato`: o balde "PEDIDO Nº" do Processo aparecia atravessando a barra de navegação. Se qualquer novo header fixo for adicionado, sempre dar um fundo opaco a ele, não só aos filhos.

Full-page screenshots do Puppeteer às vezes "pintam" um fragmento de texto de um elemento fixo (aqui, o botão "Encomendar") flutuando isolado no meio da página — é um artefato de composição do full-page capture com posição fixa, não um bug real. Confirmado rolando a página de verdade (`window.scrollTo` + screenshot de viewport) antes de mexer no CSS por causa disso.

## Contraste

Como a paleta usa cor funcional (flor) em vez de um accent único, várias combinações de opacidade de `--color-ink` foram calculadas à mão (fórmula de luminância relativa) em vez de "chutar" uma opacidade comum:
- Sobre `--color-bg` (#edefe7): mínimo `ink/65` pra texto pequeno (`ink/55` só dava 3.56:1).
- Sobre `--color-kraft` (#c9a66b, mais escuro que o fundo): mínimo `ink/80` — o rodapé kraft (`Contato.tsx`) usa `ink/85` pra parágrafo e legenda.
- Sobre `--color-paper` (#fbfaf4): mínimo `ink/65`.
- Os badges de ocasião/estação (`Vitrine.tsx`) misturam a cor da flor a 35% com branco antes de aplicar texto `text-ink` — testado pra cada cor da paleta, o pior caso (folha) ainda dá ~9.6:1.

## SEO básico

`index.html` tem meta description, canonical, Open Graph e Twitter Card apontando pro subdomínio `.workers.dev` atual, com `og-image.png` (1200×630, screenshot do hero renderizado via `vite preview` + Puppeteer). `public/robots.txt` e `public/sitemap.xml` também apontam pra lá.
