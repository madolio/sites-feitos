# Ferro (conceito)

Site-conceito da Madolio pro nicho de academia (musculação + funcional). **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Pedido explícito do usuário: "faça no estilo de academia" — depois de o Pulso (personal training) ter sido feito de propósito para NÃO parecer academia clássica, este aqui é o oposto: assume a estética de academia de peso livre, mas com identidade própria (não é reskin do Pulso).

## Deploy (Cloudflare Workers)

Worker `ferro`, em `https://ferro.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Anilha"

- **Lugar/objeto:** disco de ferro fundido, fita de segurança amarela do rack de peso, giz na mão.
- **Colisão:** academia de peso livre × sinalização de equipamento industrial.
- **Nunca parecer:** o Pulso (raia de pista de atletismo) nem o clichê genérico "academia preto+vermelho+ícone de halтere solto".
- **Wildcard:** `PlateCounter.tsx` no Hero — contador de carga total (kg levantados/mês) que sobe de 0 até o alvo quando entra na tela, mesma técnica do `RepCounter` do Pulso (`requestAnimationFrame`, sem lib), mas reescrito aqui (projetos são independentes, sem import cruzado).

Paleta: `--color-iron` (#16161a, quase-preto) + `--color-steel-50` (#eef0f2, cinza claro frio — não é o mesmo "chalk" quente do Pulso) + `--color-signal` (#f5c518, amarelo de segurança). Fontes: **Oswald** (display condensada industrial) + **Barlow** (corpo).

## Gotcha de contraste — regra do par, não da cor isolada

Testado com a fórmula de contraste do WCAG antes do deploy: `--color-signal` (amarelo) só é usado em **pares de alto contraste conhecidos** — texto `iron` sobre fundo `signal` (`.btn-signal`), ou texto/borda `signal` sobre fundo `iron` (nunca o contrário). **Nunca texto `signal` direto sobre `steel-50`** (contraste insuficiente, mesmo problema que o Pulso teve com `lane` vívido). Como só apareceu nesses dois pares desde o início, não foi necessário criar uma variante `-ink` como no Pulso.

## Arquitetura — sem nav horizontal comum

`Scoreboard.tsx` substitui a barra de navegação tradicional por uma faixa fixa no topo no espírito de placar de treino (contorno grosso, dígitos tabulares) — marca, dois links de âncora (`#planos`, `#contato`) e um botão que já dispara o modo demonstração, em vez de um menu completo (a página é curta, não precisa de mais que isso).

## Modo demonstração

Igual ao Pulso: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real — todos disparam `sendToWhatsApp(mensagem)`, que abre um `<dialog>` mostrando a mensagem que seria enviada e oferece o contato real da Madolio pra quem quiser "um site assim".

## SEO básico

`index.html` tem meta description, canonical e Open Graph (sem `og:image`/`twitter:image` — não existe `og-image.png` gerado pra este conceito, preferi omitir a tag a referenciar um arquivo inexistente). `public/robots.txt` e `public/sitemap.xml` existem.
