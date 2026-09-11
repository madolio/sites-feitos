# Sites Feitos

Repositório consolidado com todos os sites da Madolio. Cada pasta é um projeto independente — próprio `package.json`, próprio Worker no Cloudflare, próprio deploy:

- **[madolio/](madolio/)** — site institucional da Madolio (madolio.com.br).
- **[nbj-systems/](nbj-systems/)** — site da NBJ Systems, cliente real (nbj-systems.fenoninho-max.workers.dev).
- **[site-template/](site-template/)** — Worker/pasta legado; o conteúdo hoje é o conceito "Bastos Advocacia" (advocacia), não mais um template genérico.
- **[doce-atelie/](doce-atelie/)** — conceito pro nicho de confeitaria (doce-atelie.fenoninho-max.workers.dev).
- **[estudio-alma/](estudio-alma/)** — conceito pro nicho de pilates (estudio-alma.fenoninho-max.workers.dev).
- **[sabor-da-vila/](sabor-da-vila/)** — conceito pro nicho de hamburgueria (sabor-da-vila.fenoninho-max.workers.dev).
- **[torre/](torre/)** — conceito de SaaS de agendamento, vibe torre de controle/radar (torre.fenoninho-max.workers.dev).
- **[traco/](traco/)** — conceito de escritório de arquitetura, vibe planta baixa editorial (traco.fenoninho-max.workers.dev).
- **[ancora/](ancora/)** — conceito de consultoria financeira, vibe extrato/caderneta (ancora.fenoninho-max.workers.dev).

Os sete últimos são **negócios/produtos fictícios** — exemplos de estilo pra mostrar no portfólio (linkados em `madolio/src/pages/Projetos.tsx`), não clientes reais. Os quatro primeiros (Bastos, Doce Ateliê, Estúdio Alma, Sabor da Vila) são todos artesanais/ilustrados; Torre, Traço e Ancora foram feitos depois, com registros visuais deliberadamente diferentes (tech/radar, editorial minimalista, sóbrio corporativo) pra não ler como "uma vertente só". Cada um com WhatsApp real tem WhatsApp em modo demonstração (mostra a mensagem que seria enviada, sem apontar pra um número real); Traço e Ancora usam e-mail de contato em vez disso, por serem serviços B2B/consultoria.

Cada pasta mantém o histórico de commits do repositório original de onde veio (juntado via `git subtree`). Ver o `CLAUDE.md` de cada uma pra detalhes específicos (design, deploy, gotchas).

## Deploy

Dentro da pasta do projeto:

```bash
npm install
npm run deploy
```

Autenticação com o Cloudflare via `wrangler login` (uma vez só, token fica salvo na máquina).
