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
