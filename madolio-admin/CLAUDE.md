# Madolio Admin (painel interno)

Painel interno da Madolio pra acompanhar métricas dos ~30 sites-conceito do portfólio. **Não é um site-conceito** — é uma ferramenta de uso pessoal do dono da agência. Vite + React 19 + TypeScript + Tailwind v4, com um **Worker script de verdade** (não é assets-only como os outros projetos) que serve uma API sobre um banco **D1** real.

Feito deliberadamente como projeto **separado** de `madolio/` (que é o site real em produção, madolio.com.br) pra não precisar tocar na config de produção de um site já no ar — o classificador de auto-mode bloqueou a primeira tentativa de editar `madolio/wrangler.jsonc` por ser "Modify Shared Resources", e o usuário preferiu isolar em worker próprio em vez de aprovar aquela edição.

## Deploy (Cloudflare Workers + D1)

Worker `madolio-admin`, em `https://madolio-admin.sneakpeek.workers.dev`. `npm run deploy`.

Banco D1 `madolio-metricas` (binding `DB`), compartilhado por convenção de nome mas fisicamente só usado por este worker. Schema em `schema.sql`, aplicado com `npm run db:migrate` (usa `--remote`, escreve direto no banco de produção do Cloudflare — não existe ambiente local por padrão aqui).

## Dados são simulados, mas reais no banco

Os sites-conceito são fictícios — não têm tráfego de verdade. `seed.sql` insere ~7500 eventos (`visita`/`deploy`) por projeto com contagens e datas geradas deterministicamente (seed por hash do nome do projeto, não `Math.random()`, pra ser reproduzível), rodado uma vez via `npm run db:seed`. A visualização (`/api/metricas`) faz um `GROUP BY site` de verdade em SQL — a agregação é real, só a matéria-prima é sintética. Isso é dito explicitamente na UI ("Métricas simuladas... mas persistidas de verdade num banco D1") — nunca fingimos que é tráfego real.

## Autenticação

Sem OAuth/login de verdade — é uso pessoal de uma única pessoa. Uma chave (`ADMIN_KEY`, Workers secret, nunca no código/git) precisa vir no header `x-admin-key` em toda chamada a `/api/*`; o worker (`worker/index.ts`) devolve 401 sem ela. O frontend guarda a chave em `localStorage` depois do primeiro login (`src/data/chave.ts`) e a re-envia a cada requisição — se o servidor disser 401 (chave errada/trocada), a chave salva é descartada e a tela de senha volta.

O HTML/JS estático do painel (login, layout) fica público (sem dado sensível nele) — só a API por trás da senha é protegida. `<meta name="robots" content="noindex, nofollow">` no `index.html` evita indexação, mas não é segurança real; a proteção de fato é o `ADMIN_KEY`.

## Padrão do worker: API + assets no mesmo Worker

`worker/index.ts` é o `main` do wrangler — intercepta `/api/*` (checa a chave, consulta D1) e repassa qualquer outra rota pro binding `ASSETS` (o SPA React). É o padrão "Worker + Assets" do Cloudflare, diferente dos outros ~30 projetos do repo que são assets-only (sem `main`/lógica de servidor).
