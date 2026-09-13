# Sites Feitos

Repositório consolidado com todos os sites da Madolio. Cada pasta é um projeto independente — próprio `package.json`, próprio Worker no Cloudflare, próprio deploy:

- **[madolio/](madolio/)** — site institucional da Madolio (madolio.com.br).
- **[nascente/](nascente/)** — conceito pro nicho de tratamento de água, vibe diagrama técnico de filtração (nascente.fenoninho-max.workers.dev). Era o site de um cliente real (NBJ Systems) que não seguiu adiante; reformulado como conceito de portfólio, sem nenhum dado real da empresa original.
- **[site-template/](site-template/)** — Worker/pasta legado; o conteúdo hoje é o conceito "Bastos Advocacia" (advocacia), não mais um template genérico.
- **[doce-atelie/](doce-atelie/)** — conceito pro nicho de confeitaria (doce-atelie.fenoninho-max.workers.dev).
- **[estudio-alma/](estudio-alma/)** — conceito pro nicho de pilates (estudio-alma.fenoninho-max.workers.dev).
- **[sabor-da-vila/](sabor-da-vila/)** — conceito pro nicho de hamburgueria (sabor-da-vila.fenoninho-max.workers.dev).
- **[torre/](torre/)** — conceito de SaaS de agendamento, vibe torre de controle/radar (torre.fenoninho-max.workers.dev).
- **[traco/](traco/)** — conceito de escritório de arquitetura, vibe planta baixa editorial (traco.fenoninho-max.workers.dev).
- **[ancora/](ancora/)** — conceito de consultoria financeira, vibe extrato/caderneta (ancora.fenoninho-max.workers.dev).
- **[pulso/](pulso/)** — conceito de personal training, vibe raia de atletismo (pulso.fenoninho-max.workers.dev).
- **[focinho/](focinho/)** — conceito de pet shop/veterinária, vibe carteirinha de vacinação (focinho.fenoninho-max.workers.dev).
- **[corte/](corte/)** — conceito de salão/barbearia, vibe painel de senha de atendimento (corte.fenoninho-max.workers.dev).
- **[chave/](chave/)** — conceito de imobiliária, vibe classificados de jornal (chave.fenoninho-max.workers.dev).
- **[revelar/](revelar/)** — conceito de fotografia, vibe folha de contato de laboratório (revelar.fenoninho-max.workers.dev).
- **[passaporte/](passaporte/)** — conceito de escola de idiomas, vibe passaporte com carimbos de visto (passaporte.fenoninho-max.workers.dev).
- **[confete/](confete/)** — conceito de festa infantil, vibe colagem de adesivos (confete.fenoninho-max.workers.dev).
- **[cerne/](cerne/)** — conceito de design de interiores, esqueleto de duas colunas fixas (cerne.fenoninho-max.workers.dev).
- **[tinta/](tinta/)** — conceito de estúdio de tatuagem, esqueleto de rolagem horizontal (tinta.fenoninho-max.workers.dev).
- **[balcao/](balcao/)** — conceito de lanchonete de autoatendimento, esqueleto de catálogo com carrinho, sem hero (balcao.fenoninho-max.workers.dev).
- **[rota/](rota/)** — conceito de software de logística, esqueleto de dashboard/app (rota.fenoninho-max.workers.dev).
- **[torno/](torno/)** — conceito de ateliê de cerâmica, 3D: o site é um torno onde você molda, esmalta e queima uma peça (torno.fenoninho-max.workers.dev).
- **[cardume/](cardume/)** — conceito de escola de mergulho, 3D: rolar a página é descer de 0 a 40 m no oceano (cardume.fenoninho-max.workers.dev).
- **[encaixe/](encaixe/)** — conceito de marcenaria sob medida, catálogo em desenho técnico de elevação em vez de foto, navegação por régua de carpinteiro na borda da tela (encaixe.fenoninho-max.workers.dev).

Todos os vinte e dois são **negócios/produtos fictícios** — exemplos de estilo pra mostrar no portfólio (linkados em `madolio/src/data/projetos.ts`), não clientes reais; hoje a Madolio não tem nenhum cliente real em exibição pública. Nascente, Bastos, Doce Ateliê, Estúdio Alma e Sabor da Vila são todos artesanais/ilustrados; Torre, Traço e Âncora vieram depois com registros mais "tech/corporativo"; Pulso, Focinho, Corte, Chave, Revelar, Passaporte e Encaixe têm cada um sua própria **arquitetura de página** (não só cor/fonte diferente) — nenhum usa barra de navegação horizontal comum, e cada um substitui essa barra por algo do próprio universo do negócio (raia de pista, abas de fichário, painel de senha, cabeçalho de jornal não-fixo, tira de filme, régua de carpinteiro na borda da tela, ou nenhuma barra nenhuma). Cerne, Tinta, Balcão e Rota vão um passo além: mudam o **esqueleto inteiro** da página, não só a navegação — duas colunas fixas com painel sticky, rolagem horizontal de verdade, catálogo com carrinho sem hero, e uma tela de dashboard de software em vez de página institucional, respectivamente. Torno e Cardume são os únicos em **3D de verdade** (three.js / React Three Fiber, com shaders próprios) — cada um tem `.npmrc` com `legacy-peer-deps=true`, senão o `npm install` quebra tentando resolver os peers opcionais de Expo do React Three Fiber. Cada um com WhatsApp tem WhatsApp em modo demonstração (mostra a mensagem que seria enviada, sem apontar pra um número real); Traço e Âncora usam e-mail de contato em vez disso, por serem serviços B2B/consultoria.

Cada pasta mantém o histórico de commits do repositório original de onde veio (juntado via `git subtree`). Ver o `CLAUDE.md` de cada uma pra detalhes específicos (design, deploy, gotchas).

## Deploy

Dentro da pasta do projeto:

```bash
npm install
npm run deploy
```

Autenticação com o Cloudflare via `wrangler login` (uma vez só, token fica salvo na máquina).
