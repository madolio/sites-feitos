# Torre (conceito)

Site-conceito da Madolio pro nicho de SaaS (software de agendamento). **Produto fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + GSAP (instalado, não usado ainda — a tela de radar é CSS puro). Página única.

Feito depois de feedback explícito do usuário: os 4 conceitos anteriores (Doce Ateliê, Estúdio Alma, Sabor da Vila, Bastos Advocacia) liam como "uma vertente" só — todos artesanais/ilustrados, pequeno negócio local. Torre, Traço e Âncora (irmãos deste) são a resposta: nichos e registros visuais deliberadamente mais "tech/corporativo/editorial", pra mostrar que a Madolio não tem um estilo só.

## Deploy (Cloudflare Workers)

Worker `torre`, em `https://torre.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery — "Torre de Controle"

- **Lugar/objeto:** tela de radar de uma torre de controle aérea.
- **Emoção:** calma no comando — estar por cima da agenda, não correndo atrás dela.
- **Colisão:** SaaS de agendamento × instrumento de radar/ATC.
- **Nunca parecer:** hero de SaaS genérico com gradiente-glow e mockup de laptop flutuando.
- **Wildcard:** `RadarScreen.tsx` — os agendamentos do dia como blips num radar de verdade, com a varredura girando (CSS puro, `conic-gradient` + `mask`) e um blip novo "piscando" (`blip-pulse`) até ser confirmado.

Paleta: fundo quase-preto mas não puro-preto `#0b1417` (painel `#101b1f`), âmbar `#f2a93a` (alerta/CTA) e ciano `#35d6c9` (confirmado/dado). Fontes: **Space Grotesk** (display) + **JetBrains Mono** (só pra leitura de dado real — coordenadas do radar, preços, timestamps — nunca decorativo). O mono é justificado pelo assunto (um instrumento tem leitura mono de verdade), não é o "monospace pra label pequena" que a `frontend-design` skill lista como tique de IA — aqui ele *é* o dado.

## Gotcha

`RadarScreen.tsx` posiciona os blips em coordenadas polares (`toXY`) — ângulo em graus a partir do topo, raio de 0 a 1. Não trocar pra um anel perfeito (todos no mesmo raio): a dispersão é proposital, senão vira gráfico de pizza.

## Reestruturação de set/2026 — arquitetura, não decoração

Mesmo diagnóstico do madolio e do site-template: a vibe "Torre de Controle" continua a mesma (aprovada) — o problema era a **estrutura** da página (nav horizontal + hero em duas colunas + grid de cards + cards de preço + rodapé CTA), igual à de qualquer landing page de SaaS por aí, só com skin de radar por cima. Mudanças de arquitetura:

- **`Nav.tsx` → `Sidebar.tsx`.** Trocou a barra horizontal por uma coluna fixa à esquerda no desktop (`lg:flex`, `w-56`) — cada seção é um "canal" na coluna, com um blip aceso indicando a seção ativa (scroll-spy via `IntersectionObserver`, não JS de scroll position). O CTA "Testar grátis" fica fixo no rodapé da coluna, sempre visível — não precisa de um bloco de CTA repetido no fim da página. Só o `App.tsx` ganhou `lg:pl-56` pra reservar o espaço da coluna. No celular (sem espaço pra coluna), vira uma barra fina no topo com só a marca e o CTA, sem os links — um fallback, não a identidade principal do componente.
- **`Hero.tsx`:** a tela de radar (`RadarScreen.tsx`) deixou de ficar encolhida do lado da manchete — agora preenche o hero inteiro (`min-h-[100svh]`, `absolute inset-0`) como se você já estivesse olhando pro console ligado, com o texto flutuando centralizado por cima (gradiente escurecendo a base pra legibilidade). `RadarScreen` virou controlado (`active` como prop, não estado interno) — o Hero mantém o índice do blip em destaque numa state só, compartilhada entre o desenho do radar e o painel de leitura abaixo do texto, pra não ter duas animações fora de sincronia.
- **`Produto.tsx` → `SystemCheck.tsx`.** O grid 2×2 de cards virou um log de verificação de sistema — cada recurso é uma linha mono com um indicador "ONLINE" à direita, como a saída de um boot de instrumento de verdade, não uma seção de features de SaaS.
- **`Planos.tsx`:** os 3 cards lado a lado viraram uma **tabela comparativa** (linhas = recursos, colunas = planos, com ✓/— por célula) — mais fácil de comparar o que muda entre planos, e foge do formato de pricing mais repetido que existe. Em telas pequenas, rola horizontalmente dentro de `overflow-x-auto` (padrão permitido pra tabelas).
- **`Footer.tsx`:** como o CTA já é permanente (na Sidebar), o bloco escuro "fale com a gente" virou um rodapé bem mais discreto — só marca, e-mail e o aviso de produto fictício.
- Contraste: `text-ink-dim/70` num índice pequeno (`SystemCheck.tsx`) dava ~4.66:1 sobre `bg-deck` — trocado pra `text-ink-dim` sem opacidade (8.36:1). O traço "—" de "recurso não incluído" na tabela de planos também precisou ficar em `text-ink-dim/80` (não `/60`, que ficava abaixo do mínimo) pra continuar legível como indicador, mesmo sendo intencionalmente mais discreto que o ✓ ciano.

**Escopo:** só este projeto. NBJ Systems, Sabor da Vila, Traço, Âncora, Doce Ateliê e Estúdio Alma continuam como estavam. madolio (home) e site-template (Bastos Advocacia) já foram reestruturados antes deste — com Torre, os três pedidos pelo usuário estão feitos.
