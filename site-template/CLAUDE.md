# Bastos Advocacia (conceito — nicho jurídico)

Vite + React + TypeScript + Tailwind v4, hospedado no Cloudflare Workers (`https://site-template.fenoninho-max.workers.dev`). Continua sendo o Worker/pasta chamado `site-template`, mas o conteúdo foi completamente reformulado — ver histórico abaixo.

## O que este projeto é hoje

Um conceito fictício de página única pra um escritório de advocacia (empresarial e civil): "Bastos Advocacia", Dra. Camila Bastos, OAB/SP 312.884 — nomes e dados fictícios, exemplo de estilo pro nicho jurídico, igual aos outros conceitos do madolio (Doce Ateliê, Estúdio Alma, Sabor da Vila), só que como página completa em vez de só um card na vitrine.

## Vibe: "Terminal Wagon-Lit"

**Histórico da direção de design (set/2026):** a primeira versão (paleta carvão-esverdeado + bordô + assinatura cursiva) foi rejeitada pelo usuário como "ainda genérico, aparenta muito a home" — o problema não era a cor, era o processo: eu tinha inventado tudo sozinho e convergido pro clichê óbvio de "advocacia = navy/bordô/serifada". O usuário então apontou o processo de **Vibe Discovery** de https://github.com/2389-research/landing-page-design (skill externa, não instalada neste ambiente — só a lógica foi seguida manualmente) e eu rodei as 4 perguntas de descoberta com ele antes de redesenhar:

- **Q1 (lugar/objeto real):** vagão-leito europeu de luxo (Orient Express) — madeira escura, latão, veludo.
- **Q2 (emoção em 3s):** autoridade serena.
- **Q3 (colisão de duas influências inesperadas):** escritório jurídico + sinalização de aeroporto/trem (wayfinding).
- **Q4 (nunca pode parecer):** escritório de advocacia genérico (aperto de mão, balança da justiça, coluna grega).

A colisão do Q3 é o que dá identidade própria: as áreas de atuação são numeradas como **portões de embarque** ("Nº 01" + seta de sinalização — `GateArrow.tsx`), e o motion assinatura é um **painel de embarque mecânico** (`SplitFlap.tsx` — dígitos "rodam" antes de travar no valor final, como um painel de horários de trem/aeroporto), não uma assinatura cursiva genérica.

- **Paleta ("Terminal Wagon-Lit"):** `#241A14` nogueira escura do vagão (ink), `#F3EDE1` linho/creme (paper), `#1F3A32` veludo verde-vagão (surface-alt, usado invertido na seção de Áreas de atuação), `#B08D57` latão (accent), `#9B3B2E` vermelho de sinalização de plataforma (signal — uso pontual, ex: números das áreas de atuação). Nenhum hex reciclado dos outros dois projetos-irmãos.
- **Tipografia:** Prata (títulos — cartaz de viagem vintage) + Overpass (corpo/rótulos — nascida de sinalização de estrada/highway signage). Terceira combinação distinta da dupla madolio (IBM Plex Serif/Sans) e nbj-systems (Archivo).
- **Wildcard:** a seção de contato (`Footer.tsx`) é formatada como um talão de bilhete de trem perfurado — linha pontilhada, furos circulares nas pontas, "Protocolo Nº SP-2026-00184" no lugar de um número de bilhete. Detalhe que não "combina" com um site jurídico, mas fecha a colisão.
- **Botões:** retos, sem arredondamento — terceiro formato distinto (madolio é pill, nbj-systems é `rounded-sm`).
- Numeração só aparece onde o conteúdo é genuinamente sequencial: os "portões" das áreas de atuação (identidade visual, não sequência real) e os passos de `Process.tsx` (esses sim, sequência real de atendimento).

**Se for pedir uma nova reformulação de vibe no futuro, repetir esse processo** (perguntar Q1-Q4 ao usuário, não inventar sozinho) em vez de ir direto pro clichê mais óbvio do nicho.

## Histórico completo

1. Era um "template genérico" (placeholders `{{BUSINESS_NAME}}` etc., cópia visual da home do madolio) — reconstruído a partir do site que já estava publicado sem repositório em lugar nenhum.
2. Reformulado pro conceito de advocacia empresarial/civil — 1ª tentativa (paleta carvão/bordô, assinatura cursiva) — **rejeitada pelo usuário por parecer genérica/copiada da home**.
3. Reformulado de novo com o processo de Vibe Discovery acima ("Terminal Wagon-Lit") — versão atual.

`src/config/site.ts` centraliza os dados fictícios do escritório (nome, OAB, contato).

Ver o CLAUDE.md do `madolio` pra a gotcha de GSAP + Tailwind `transition` e o gotcha de teste do Chrome headless com `--window-size` pequeno — ambos se aplicam aqui.

## Gotcha: servidores de preview zumbis no Windows

`pkill -f "vite preview"` via Git Bash **não mata processos nativos do Windows** de forma confiável nesta máquina — o processo `node.exe` continua vivo e respondendo na porta antiga, mesmo depois de "matar" e reabrir em cima da mesma porta (o novo processo às vezes falha silenciosamente com "port already in use" enquanto o zumbi antigo continua servindo uma build desatualizada, ou passa a responder com página branca depois de ficar muito tempo vivo). Isso já causou falso alarme de "a página quebrou" mais de uma vez.

**Fix:** usar PowerShell pra matar por porta, não por nome de processo:
```powershell
Get-NetTCPConnection -LocalPort <porta> -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```
E sempre confirmar com um screenshot novo (não confiar só no `curl` retornando 200 — isso só confirma que ALGUM processo responde na porta, não qual).
