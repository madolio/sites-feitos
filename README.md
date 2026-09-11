# Sites Feitos

Repositório consolidado com todos os sites da Madolio. Cada pasta é um projeto independente — próprio `package.json`, próprio Worker no Cloudflare, próprio deploy:

- **[madolio/](madolio/)** — site institucional da Madolio (madolio.com.br).
- **[nbj-systems/](nbj-systems/)** — site da NBJ Systems, cliente real (nbj-systems.fenoninho-max.workers.dev).
- **[site-template/](site-template/)** — template padrão usado como ponto de partida pra clientes novos.

Cada pasta mantém o histórico de commits do repositório original de onde veio (juntado via `git subtree`). Ver o `CLAUDE.md` de cada uma pra detalhes específicos (design, deploy, gotchas).

## Deploy

Dentro da pasta do projeto:

```bash
npm install
npm run deploy
```

Autenticação com o Cloudflare via `wrangler login` (uma vez só, token fica salvo na máquina).
