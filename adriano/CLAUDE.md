# Adriano Souza Passos (site real, não conceito)

**Este NÃO é um projeto de portfólio.** É um site de verdade, encomendado pelo próprio filho do cliente (o usuário desta conversa) pra uso real do pai — Adriano Souza Passos, profissional autônomo de tratamento de água e serviços elétricos. Diferente de todos os outros projetos desta pasta:

- **Sem modo demonstração.** Os botões de WhatsApp abrem o número real dele (`5511971817781`), com mensagem pré-escrita — igual a um site comercial de verdade funcionaria.
- **Sem `demo.ts`/`DemoDialog.tsx`.** Não existe porque não faz sentido aqui.
- **Nenhum fato foi inventado.** Todo texto vem de fatos confirmados diretamente pelo usuário nesta conversa: nome, 22 anos de experiência, os dois ofícios (tratamento de água — com força em água de alta pureza pro padrão de hemodiálise — e elétrica), atendimento a todo tipo de cliente (residencial e clínico), e região (São Paulo e SP).

## Decisão consultada com o usuário: endereço não é público

O endereço completo (Estrada Manoel Lages do Chão, 600) foi dado pelo usuário, mas **perguntei explicitamente** se deveria aparecer no site, porque é trabalho de instalação/atendimento a domicílio, não um ponto comercial que recebe visita — publicar o endereço residencial sem necessidade seria expor privacidade à toa. O usuário confirmou: só cidade/região aparece ("São Paulo e região"), nunca o endereço completo. Se um dia quiserem mudar isso, é decisão dele/do usuário, não default.

## O que NÃO está no site (de propósito, por falta de fato confirmado)

- Preço ou tabela de valores — não foi informado.
- Nome fantasia — não existe um; o nome do site é o próprio nome do profissional, como é comum em prestadores autônomos.
- Certificações, cursos ou registros formais — não foram mencionados, então não aparecem. A força em "água de alta pureza pra hemodiálise" está descrita como experiência, não como certificação, porque é isso que foi confirmado.
- Depoimentos, fotos de trabalhos, logotipo — nada disso existe ainda.

Se qualquer um desses fatos for confirmado depois, atualizar o site é trivial (`Servicos.tsx`, `Sobre.tsx`) — mas nunca adicionar sem confirmação nova.

## Deploy (Cloudflare Workers)

Worker `adriano`, em `https://adriano.fenoninho-max.workers.dev`. `npm run deploy`.

## Identidade visual — dupla, sem misturar

Água (`--color-agua` #0e6ba8, `--color-agua-clara` #eaf4fb) e elétrica (`--color-eletrica` #b9790a, `--color-eletrica-clara` #fdf3e2) nunca aparecem no mesmo elemento — cada seção/cartão de serviço usa só a cor do ofício que representa. Fundo neutro (`--color-papel`, `--color-grafite` no CTA final). Fontes: **Fraunces** (títulos, serifada, transmite confiança sem ser corporativa demais) + **Source Sans 3** (corpo).

## Wildcard: `PurezaGauge.tsx`

Anel SVG que enche até 100% quando entra na tela (`IntersectionObserver` + `requestAnimationFrame`, sem lib de animação) — o selo visual da especialidade real dele em água de altíssima pureza, no lugar de um ícone de gota genérico. Respeita `prefers-reduced-motion` (pula direto pra 100%).

## SEO

`index.html` tem meta description, canonical, Open Graph e JSON-LD `LocalBusiness` com `areaServed` (só "São Paulo, SP", sem endereço completo, pela mesma razão de privacidade acima) e `telephone` real. `public/robots.txt` e `public/sitemap.xml` existem.
