# Contrato de template

Define o que um template do monorepo precisa ter para que, no futuro, um gerador (`npm run new-site`) possa copiá-lo e trocar só os pontos configuráveis, sem editar componentes. **Não implementa o gerador.**

Base de observação: `clinica-template/` (commit `8047376`), o único template config-driven hoje. O `restaurante-template/` está sendo feito por outra sessão e **não foi lido nem alterado** para escrever este documento. Tudo que depende dele está marcado:

```text
PENDENTE: validar após conclusão do restaurante-template.
```

Este contrato é uma proposta a partir de **um** exemplo. A conclusão de `arquitetura-de-templates.md` continua valendo: não há evidência para extrair componentes compartilhados nem uma pasta `_base`. Aqui se padroniza **onde a configuração fica**, não o design.

Documentos relacionados: `arquitetura-de-templates.md` (convenção e padrões), `plano-gerador.md` (fluxo do futuro gerador), `guia-de-uso.md` (passo a passo manual), `inventario-e-catalogo.md` (classificação dos projetos).

## 1. Propósito

Um template é um site completo e funcional, com dados fictícios, que outra pessoa consegue transformar em um site de cliente editando **um conjunto pequeno e conhecido de arquivos**. O contrato existe para três coisas:

1. dizer a quem cria um template novo onde cada tipo de informação deve ficar;
2. dar ao gerador um ponto de entrada previsível, para ele falhar alto quando algo não estiver onde deveria;
3. impedir que "template" vire sinônimo de "todos os sites iguais".

## 2. Estrutura esperada

Compare com o que existe de fato no `clinica-template` (30 arquivos versionados, sem `dist/` nem `node_modules/`):

```text
<nome>-template/
├── index.html            # <head> com tokens {{SEO_*}}; nenhum texto de cliente
├── package.json          # name = slug do template; scripts: dev, build, lint, preview, deploy
├── wrangler.jsonc        # name = nome do Worker; assets em modo SPA
├── vite.config.ts        # react + tailwind + cloudflare + plugin que lê src/config/site.ts
├── tsconfig*.json
├── README.md             # tabela "o que trocar e onde" + checklist de entrega
├── public/
│   └── apple-touch-icon.png   # único arquivo estático de marca (favicon/robots/sitemap são gerados)
└── src/
    ├── config/
    │   ├── site.ts       # identidade, contatos, redes, SEO, menu, helpers de link
    │   └── images.ts     # imagens + alt
    ├── data/
    │   └── conteudo.ts   # textos e listas de cada seção, rótulos de interface
    ├── index.css         # @theme (cores, fontes) + estilos globais
    ├── components/       # uma seção = um arquivo; ui.tsx com utilitários
    ├── App.tsx           # ordem das seções
    └── main.tsx
```

**Obrigatório** (o gerador depende): `src/config/site.ts`, `src/data/conteudo.ts`, `src/config/images.ts`, o bloco `@theme` em `src/index.css`, `wrangler.jsonc`, `package.json`, `index.html` com tokens, `README.md`.

**Livre** (cada template decide): nomes e quantidade de componentes, nomes das seções, dependências extras, animações, o que há em `public/` além do ícone. Não se exige `ui.tsx`, `Reveal` nem `Rich`: são convenções úteis, não requisitos.

Para o restaurante: `PENDENTE: validar após conclusão do restaurante-template.` (se ele seguiu esta estrutura, quais arquivos extras trouxe, por exemplo dados de cardápio).

## 3. Responsabilidades dos arquivos

Regra geral: cada camada muda por um motivo diferente.

| Arquivo | Responde a | Muda quando |
| --- | --- | --- |
| `site.ts` | **Quem é o negócio e como ser encontrado** | Troca de cliente |
| `conteudo.ts` | **O que o site diz** | Troca de cliente ou de estratégia de texto |
| `images.ts` | **Que imagens usa** | Troca de cliente |
| `index.css` (`@theme`) | **Como o site parece** | Troca de marca |

### `src/config/site.ts`

Deve conter:

- identidade: `name`, `descriptor`, `initial`, `tagline`, `logo` (opcional);
- contatos: `whatsapp` (formato `DDI+DDD+número`), `whatsappLabel`, `whatsappMessage`, `phone`, `email`;
- endereço e horários **quando o negócio os tem**;
- redes sociais (vazias ficam ocultas no rodapé);
- `seo`: `url`, `title`, `description`, `themeColor`, cores do favicon;
- `footerNote` (aviso de demonstração, vazio na entrega);
- `nav` (itens do menu; o `href` é o `id` de uma seção);
- helpers de link (`whatsappUrl(mensagem)`).

Não deve conter: textos de seção (títulos, parágrafos, listas de serviço), JSX, imports de React, imports de módulos que só existam no navegador. **Restrição técnica:** o `vite.config.ts` importa `site.ts` em Node para gerar o `<head>`, o `robots.txt`, o `sitemap.xml` e o `favicon.svg`. Portanto `site.ts` precisa ser TypeScript puro, sem `import.meta.env`, `window` nem `document`.

### `src/data/conteudo.ts`

Deve conter: o copy de cada seção (`hero`, `servicos`, `faq`, ...), listas de itens, números de exemplo, depoimentos de exemplo, rótulos de interface e mensagens automáticas (`rotulos`), incluindo os `aria-label`.

Convenção de destaque: `*palavra*` em um título vira o trecho estilizado (função `Rich`); é convenção do `clinica-template`, não requisito.

Não deve conter: contato, endereço, URL, número de telefone (isso é `site.ts`); caminhos de imagem (isso é `images.ts`); lógica.

Cada bloco exportado corresponde a **uma seção**. Os nomes dos blocos são do nicho: a clínica tem `servicos` e `equipe`, outro template terá o que fizer sentido. O contrato não fixa a lista de campos.

### `src/config/images.ts`

Deve conter: cada imagem do template como `{ src, alt }`, num objeto único (`images`). `src` pode ser URL ou caminho em `public/`; `alt` descreve a foto para leitores de tela.

Não deve conter: texto de legenda editorial (fica em `conteudo.ts`, que referencia a imagem por chave), nem arquivos de imagem inline.

### `src/index.css`

Deve conter: o bloco `@theme` com cores e famílias de fonte, com o **papel de cada cor comentado**; `@font-face` de fontes de reserva; estilos globais e classes de componente reutilizadas (botões, etiquetas); animação global respeitando `prefers-reduced-motion`.

Não deve conter: valores de cor fixos dentro de componentes (`rgb(...)`, `#hex`); use as variáveis do tema. Os nomes das cores são rótulos livres (`forest`, `clay`...) e mudam por template.

### O que não fica em nenhum desses arquivos

- Layout, estrutura de seções e ordem (isso é `App.tsx` e os componentes).
- Comportamento e interação (menu, acordeão, animações).
- Dependências e scripts (`package.json`).
- Configuração do Worker (`wrangler.jsonc`).

## 4. Separação configuração × apresentação

Regra de ouro: **componente não contém dado de cliente.** Nome, telefone, URL, endereço, preço, nome de profissional e texto de seção vêm de `site.ts`, `conteudo.ts` ou `images.ts`.

Teste prático (o futuro validador do gerador deve fazê-lo): procurar, fora de `src/config/`, `src/data/` e `README.md`, qualquer valor que seja identidade do template. No `clinica-template` hoje esse teste passa: o nome "Serena", os nomes das profissionais, os contatos e o domínio só aparecem em `config/` e `data/`.

Sem `if (cliente)` e sem flags de cliente nos componentes. Uma seção que não existe para o cliente sai de `App.tsx` e de `nav`.

O que **é** aceitável ficar no componente: texto genérico de interface que não muda entre clientes, desde que não seja marca (por exemplo, o nome do ícone), e a estrutura de marcação.

## 5. Requisitos mínimos de um template

1. `npm install && npm run build` termina sem erro (`tsc -b` incluído).
2. Todo dado de cliente está em `site.ts`, `conteudo.ts` ou `images.ts`.
3. `index.html` usa tokens (`{{SEO_TITLE}}`, `{{SEO_DESCRIPTION}}`, `{{SEO_URL}}`, `{{SEO_THEME_COLOR}}`, `{{SITE_NAME}}`) e o build os substitui a partir de `site.ts`.
4. `robots.txt`, `sitemap.xml` e `favicon.svg` são **gerados** pelo build, não versionados em `public/`.
5. Sem overflow horizontal em 320, 375, 390, 768, 1024 e 1280 px; sem erro de console; sem imagem quebrada.
6. Acessibilidade básica: link "ir para o conteúdo", `lang` correto, `alt` em toda imagem informativa, foco visível, menu móvel e acordeões com `aria-expanded`/`aria-controls`, contraste de texto ≥ 4,5:1.
7. Conteúdo visível sem JS nem animação (a animação de entrada só esconde antes quando há JS e movimento permitido).
8. Nenhum dado real de terceiros nos dados de exemplo; depoimentos e números marcados como exemplo.
9. `README.md` do template com a tabela "o que trocar e onde" e a checklist de entrega.
10. Fontes de reserva com `size-adjust` e carregamento das fontes antes do render, quando o template usa fonte externa, para não ter salto de layout. **Desvio conhecido:** só o `clinica-template` tem os fallbacks com `size-adjust` (seção 17).

## 6. Metadados dos templates

O gerador precisa descobrir quais templates existem sem varrer o monorepo. Proposta: um arquivo único na raiz, `templates.json` (o mesmo nome que `plano-gerador.md` já previa). **Ainda não foi criado**: só o gerador o consumirá, e criá-lo agora exigiria decidir campos que dependem do restaurante.

Formato proposto:

```json
{
  "version": 1,
  "templates": [
    {
      "id": "clinica",
      "name": "Clínica & Bem-estar",
      "category": "saude",
      "path": "clinica-template",
      "description": "Clínicas e profissionais da saúde: hero, cuidados, método, equipe, relatos, galeria, FAQ, contato.",
      "customization": "config-only",
      "status": "ready",
      "requires": []
    }
  ]
}
```

| Campo | Significado |
| --- | --- |
| `id` | Identificador curto, `[a-z0-9-]`, único. É o que o usuário digita (`new-site clinica`). |
| `name` | Nome legível para a lista. |
| `category` | Uma das categorias de `inventario-e-catalogo.md` (`saude`, `beleza`, `alimentacao`, `servicos-profissionais`, `servicos-locais`, `comercio`, `criativo`, `operacao`). |
| `path` | Pasta relativa à raiz do monorepo. |
| `description` | Uma frase. |
| `customization` | Nível de personalização: `config-only` (basta editar `config/`, `data/`, `@theme`), `config-and-sections` (também exige mexer em `App.tsx` para remover/reordenar seções), `rewrite` (a peça central é específica, não serve de template). Só `config-only` e `config-and-sections` entram no gerador. |
| `status` | `ready` (passou nos critérios da seção 10), `draft`, `deprecated`. O gerador só oferece `ready`. |
| `requires` | Lista de campos que o gerador deve pedir além do nome (por exemplo `["whatsapp"]`). |

Restrições: o arquivo é dado, não código; nada de caminhos absolutos; o gerador recusa um `path` que não exista ou não contenha os arquivos obrigatórios da seção 2.

A entrada do restaurante **não** está definida: `PENDENTE: validar após conclusão do restaurante-template.` (id, categoria, nível de personalização, campos exigidos).

## 7. Regras para assets

- Imagens de demonstração podem ser URLs de banco de imagens, referenciadas **só em `images.ts`**. Um site de cliente usa arquivos em `public/`.
- Nenhum componente referencia um caminho de imagem diretamente: todos leem de `images`.
- O único arquivo de marca estático em `public/` é o `apple-touch-icon.png`. O gerador escreve um PNG novo com as cores do favicon (ver seção 16); é provisório.
- `og:image`: só declarar se o arquivo existir em `public/`. Hoje o `clinica-template` não declara.
- O gerador não baixa nem copia imagens de fora do template.

## 8. Regras para SEO

- `<title>`, `description`, `canonical`, `og:*`, `twitter:*` e `theme-color` saem de `site.seo` por token no `index.html`. Ninguém escreve o domínio à mão no HTML.
- `seo.url` é a **única** fonte do domínio; `robots.txt` e `sitemap.xml` são gerados com ele.
- Dados fictícios devem ficar claramente demonstrativos (`(00) 00000-0000`, `Rua do Exemplo`), sem inventar endereço, horário ou preço reais.
- Se o template tiver JSON-LD, ele só pode usar dados que a página mostra e precisa sair de `site.ts` também. Nenhum dos quatro templates atuais tem JSON-LD (decisão na seção 17).
- Uma só página por template hoje (`sitemap.xml` com uma URL). Template multi-página exigiria estender o plugin: fora do contrato atual.

## 9. Regras para o Worker

- `wrangler.jsonc` → `name` é o nome do Worker e define o endereço (`https://<name>.<subdominio>.workers.dev`). É o dado que **mais dói** copiar errado: se o novo projeto herdar `name: "clinica-template"`, um `npm run deploy` **sobrescreve o template publicado**.
- `package.json` → `name` acompanha o mesmo slug.
- Configuração de assets em modo SPA (`not_found_handling: single-page-application`).
- O deploy é sempre manual, por projeto, com `npx wrangler whoami` conferido antes. O gerador não faz deploy.
- Subdomínio atual: `sneakpeek.workers.dev`. Não usar `fenoninho-max.workers.dev`.
- Nome do Worker novo: `[a-z0-9-]`, sem colidir com pasta ou Worker existentes.

## 10. Critérios para um template ficar "pronto para o gerador"

Um template só recebe `status: "ready"` quando **todos** passam. Cada item deve ser verificável por comando, para o futuro `check-template` (não implementado):

| # | Critério | Como verificar |
| --- | --- | --- |
| 1 | Arquivos obrigatórios presentes (seção 2) | existência dos arquivos |
| 2 | Build limpo | `npm install && npm run build` com código 0 |
| 3 | Nenhum dado de identidade fora de `config/`, `data/`, `README.md` | busca por `site.name`, telefone, e-mail, domínio e nomes de exemplo nos demais arquivos |
| 4 | Domínio em um lugar só | o domínio do template aparece só em `site.ts` (e nos arquivos gerados no `dist/`) |
| 5 | `index.html` sem texto de cliente, com tokens | busca por tokens e ausência do nome |
| 6 | `dist/robots.txt`, `dist/sitemap.xml`, `dist/favicon.svg` e `dist/index.html` refletem `site.seo` | ler o `dist/` |
| 7 | Pontos trocáveis marcados (`// @gen:*`) em `site.ts` e `wrangler.jsonc`/`package.json` | ver seção 11 |
| 8 | Teste visual 320 a 1280 sem overflow, console ou imagem quebrada | Playwright |
| 9 | `README.md` com "o que trocar e onde" e checklist | leitura |
| 10 | Uma **cópia de teste** com marca, cores, textos e fotos diferentes compila e renderiza sem editar componente | simulação (foi feita com "Clínica Aurora") |
| 11 | O template tem **um par**: outro template independente com a mesma convenção | ver seção 13 |

O `clinica-template` cumpre 1 a 6, 8, 9 e 10. Falta o 7 (marcadores `@gen`) e o 11 (ainda não há segundo template).

## 11. Riscos conhecidos do futuro gerador

| Risco | O que acontece | Como tratar no gerador |
| --- | --- | --- |
| **Sobrescrita** | Destino já existe e o gerador apaga trabalho | Recusar se a pasta existir; nunca oferecer `--force` na primeira versão; validar o slug antes de tocar no disco |
| **Substituição excessiva** | Regex troca texto estrutural (por exemplo, "Serena" dentro de um comentário ou de uma função) | Trocar **só** valores em linhas marcadas (`// @gen:name`); falhar alto se o marcador faltar; nada de regex livre sobre o código |
| **Strings espalhadas** | O nome antigo aparece em componentes e a troca deixa restos | O critério 3 da seção 10 garante que só `config/` e `data/` têm o nome; o gerador roda a mesma busca no resultado e avisa |
| **Assets** | Imagens e o `apple-touch-icon.png` continuam do template original | Listar como pendência manual; opcionalmente gerar o ícone a partir do favicon; manter fotos de demonstração só em `images.ts` |
| **SEO** | Title, description e canonical ficam com dados antigos | Já são gerados a partir de `site.seo`; o gerador só precisa trocar `seo.url`/`title`/`description` e conferir o `dist/` |
| **Worker** | `wrangler.jsonc` mantém o `name` do template e o deploy sobrescreve o original | Trocar `name` (e `package.json`) **antes de qualquer outra coisa** e recusar terminar se ainda for igual ao do template |
| **Git** | Gerador cria commit, altera histórico ou inclui arquivos de outra sessão | Não usar git; só criar arquivos novos; o usuário faz o commit |
| **Dependências** | Cópia sem lockfile ou com `node_modules` do original quebra o build | Excluir `node_modules`, `dist`, `.wrangler` e o lockfile antigo; mandar rodar `npm install`; sugerir `npm run build` |
| **Conta de deploy errada** | `npm run deploy` publica na conta errada | O gerador não faz deploy; o README gerado lembra `npx wrangler whoami` |
| **Cor/tema** | Trocar só uma cor deixa o contraste abaixo de 4,5:1 | Avisar quando `themeColor` e a cor de destaque forem alteradas; recomendar rodar o teste de contraste. `PENDENTE`: definir se o gerador troca cores (ver seção 13) |
| **Segundo template diferente** | O gerador nasce amarrado ao formato do `clinica-template` | Só implementar depois de comparar com o restaurante (seção 13) |
| **Fonte em três lugares** | Trocar a fonte exige editar `index.html`, `--font-*` e as fontes de reserva | Documentar como manual até as fontes irem para uma configuração única (pendência já registrada em `arquitetura-de-templates.md`) |

## 12. O que NÃO deve ser padronizado

O contrato padroniza **configuração**. Não deve padronizar:

- **Layout e composição.** Um hero em arco com selo e cartão é assinatura do template de clínica; um restaurante pode ter tipografia gigante, foto de prato em tela cheia ou cardápio como primeira dobra.
- **Lista e ordem das seções.** Cada template tem as suas (`Metodo`, `Relatos`, `Cardapio`, `Reservas`...). O padrão é *uma seção = um componente que lê um bloco de `conteudo.ts`*, não os nomes.
- **Animações e microinterações.** Cada template escolhe (CSS puro, `gsap`, `motion`). Um projeto, uma abordagem; não misturar.
- **Identidade visual.** Paleta, tipografia, formas, texturas. Os nomes das cores no `@theme` são livres.
- **Componentes.** Nada de biblioteca compartilhada nem pasta `_base`. Evidência atual: só `Reveal` se repete idêntico, e ele já é copiado.
- **Funcionalidades do nicho.** Calculadora, mapa, cardápio, agendamento, carrinho, reserva. São o que diferencia o template.
- **Campos obrigatórios iguais.** Um restaurante não terá `equipe` nem `metodo`; uma clínica não terá `cardapio`. A convenção é *onde* as coisas ficam.
- **Dependências.** Base = React + Tailwind. O que mais o nicho pedir entra **no template**, justificado no README.
- **A "peça assinatura"** (objeto do nicho como metáfora visual): é design, feito à mão.

## 13. O que depende do `restaurante-template`

O gerador só deve ser implementado depois de comparar dois templates independentes. Decisões que ficam **em aberto** até lá:

```text
PENDENTE: validar após conclusão do restaurante-template.
```

1. **Os quatro pontos de configuração se repetem?** Se o restaurante também usa `config/site.ts`, `data/conteudo.ts`, `config/images.ts` e `@theme`, o contrato da seção 2 vale como está. Se usou outra forma (por exemplo, `data/cardapio.ts` à parte), o contrato precisa aceitar arquivos de dados adicionais.
2. **O plugin que gera o `<head>` foi copiado igual ou divergiu?** Decide se ele vira um arquivo comum copiado (e não um pacote) ou se precisa de um contrato próprio.
3. **O `site.ts` do restaurante tem os mesmos campos?** Quais são realmente comuns (nome, WhatsApp, endereço, horários, SEO) e quais são de nicho (por exemplo, "faixa de preço", "aceita reserva"). Decide o esquema mínimo do `site.ts` que o gerador pode assumir.
4. **Marcadores `@gen`:** onde ficam em cada template e se um formato único (`// @gen:name`) serve para os dois.
5. **Cores:** existe um nome comum (`--color-brand`) ou cada template tem os seus? Hoje `plano-gerador.md` lista isso como pré-requisito; sem resposta, o gerador **não deve trocar cores**, só nome, contatos, SEO e Worker.
6. **`templates.json`:** `category`, `customization` e `requires` do restaurante.
7. **JSON-LD e `og:image`:** se o restaurante tem, o contrato precisa dizer como são gerados a partir de `site.ts`.
8. **Fontes e ícone:** se ele resolveu fonte única e `apple-touch-icon` gerado, isso vira requisito; se não, continuam pendências manuais.
9. **Nível de personalização real:** se `config-only` é honesto para os dois ou se um deles exige mexer em `App.tsx`.
10. **Critério 11 da seção 10** (o "par") só é cumprido quando os dois estiverem `ready`.

Decisões que **já** podem ser tomadas sem o restaurante: a restrição de `site.ts` ser TypeScript puro (seção 3), as regras de Worker e SEO (seções 8 e 9) e a lista de riscos (seção 11).

## 14. O que este documento não faz

- Não cria `templates.json`, `scripts/new-site.mjs` nem `check-template`.
- Não marca `@gen:*` nos templates existentes (exigiria editar o `clinica-template`).
- Não migra nem altera nenhum dos 53 projetos antigos.
- Não define o restaurante: ele é tratado como desconhecido até estar pronto.

## 15. Atualização: três templates (2026-09-24)

Os três templates (`clinica-template`, `restaurante-template`, `academia-template`) seguem este contrato e o gerador (`docs/gerador.md`, `scripts/templates.json`) já os consome; os `PENDENTE` acima sobre o restaurante ficaram resolvidos por essa prática. O que o terceiro template acrescentou:

- **Marcadores `// @gen:*` em `site.ts`** são parte do contrato: `name`, `initial`, `seo-url`, `seo-title`, `seo-description` (cada um em uma linha, com um literal de string) e `og-image` (se o template tem).
- **Listas opcionais precisam de tipo explícito** em `conteudo.ts` (`[] as Numero[]`); sem isso, uma lista esvaziada vira `never[]` e quebra o TypeScript do componente. Foi o único defeito que o teste de reutilização da academia achou.
- **Rótulo curto para o CTA do header** (`rotulos.matriculaCurto`): textos longos empurram a marca para fora no celular.
- **Contraste do tema**: conferir o `accent` sobre `background` **e** sobre `surface`, nos dois conjuntos (normal e `inverse-*`). Uma paleta de teste falhou só em `surface`.
- Cada template mantém as próprias cores: não há paleta comum, e o gerador não mexe nelas.

## 16. Contrato x V1 real (auditoria de 2026-09-24)

Auditoria prática com os três templates (geração, `npm install`, `npm run build`, conferência do `dist/`). O que o V1 faz **diferente do que as seções 6 e 7 descrevem**:

- **`scripts/templates.json` (seção 6):** o arquivo real é um objeto indexado pelo id, não uma lista, e não tem `customization`, `status` nem `requires`. Tem `brand` (nome de demonstração, usado para avisar sobre vestígios), `ogImage` e `omit`. As categorias reais são `saude`, `gastronomia` e `fitness`, não as da seção 6. Como só há templates prontos, o gerador oferece todos; `status` só passa a valer quando existir um `draft`.
- **`apple-touch-icon.png` (seção 7):** já **não** aponta para o template. O gerador escreve um PNG novo (anel nas cores do favicon, sem letra). Continua provisório.
- **`og:image`:** o restaurante e a academia declaram `seo.ogImage`; o gerador limpa o campo (`@gen:og-image`) e não copia `public/demo/og.jpg`, então nenhum projeto gerado aponta para arquivo que não existe.
- **Trava de identidade:** depois de copiar, o gerador confere Worker, `package.json` e as duas ocorrências do `package-lock.json`. Se algum continuar com o valor do template (ou diferente do esperado), sai com código 3 e manda não fazer deploy.
- **Worker:** além do formato e de não ser o nome de um template, não pode ser o de nenhum Worker já existente no monorepo (qualquer `*/wrangler.jsonc`).

### Diferenças entre os três templates

| Tipo | O que |
| --- | --- |
| Necessária por nicho | `conteudo.ts` (serviços/equipe/relatos; cardápio; modalidades/planos), nomes de seção e componentes, `mapEmbedUrl` e `fonts` em `site.ts` (restaurante e academia), `og:image` (só restaurante e academia). |
| Estrutural inconsistente | Nenhuma encontrada: os três têm os mesmos arquivos de configuração, `package.json`, `wrangler.jsonc`, `index.html` com tokens e plugin `marcaDoCliente`. A clínica não usa `fonts` em `site.ts` (fontes fixas no `index.html`) e não tem `og:image`; o gerador trata os dois casos, então não impede um quarto template. |
| Limitação conhecida do V1 | Cores e fontes não são trocadas; `conteudo.ts` inteiro é demonstração e cita a marca de exemplo (restaurante e academia); comentários de cabeçalho de `site.ts` citam a marca de exemplo; o ícone é provisório; `--instalar` é opcional (sem ele o projeto nasce sem `node_modules`). |

## 17. Quatro templates: sebo, JSON-LD e fontes (2026-09-24)

O `sebo-template` (derivado do conceito `sebo`, que não foi alterado) é o quarto template e está registrado no gerador (`id: sebo`). Duas decisões e um registro:

### JSON-LD: opcional, e nenhum template tem

Regra da seção 8: **"se o template tiver JSON-LD"**, os dados vêm de `site.ts`. Não é obrigatório. Na prática, `clinica-template`, `restaurante-template`, `academia-template` e `sebo-template` **não têm** JSON-LD, e o plugin `marcaDoCliente` não gera nenhum. O `sebo` original tinha um `BookStore` escrito à mão no `index.html` (nome, descrição e URL copiados), que não veio para o template: um gerador que troca só os campos `@gen` o deixaria com a marca antiga. **Decisão:** o `sebo-template` fica igual aos outros três (sem JSON-LD), sem exceção silenciosa. Se um dia for desejado, o caminho consistente é estender o plugin com um token `{{JSON_LD}}` montado a partir de `site.ts` (um campo `seo.schemaType`), para todos os templates de uma vez; não foi feito.

### Fontes de reserva (`size-adjust`): desvio registrado

O requisito 10 da seção 5 pede fontes de reserva com `size-adjust` e carregamento antes do render. **Só o `clinica-template` cumpre os dois.** `restaurante-template`, `academia-template` e `sebo-template` cumprem só o carregamento antecipado (`document.fonts.load`, no máximo 1 s, em `main.tsx`) e **não têm** os `@font-face` de reserva. Corrigir exige medir as métricas de cada fonte (ajuste de tamanho, ascendente e descendente por família), o que não é uma mudança pequena nem segura por template; fica como pendência de contrato comum aos três, não como exceção do sebo.

### O que o sebo acrescentou ao contrato

- **Tema em duas superfícies** (pano e papel), com `accent` (preenchimento, texto sobre o papel) separado de `accent-text` (texto sobre o pano). Um vermelho que passa sobre papel claro pode falhar sobre pano escuro (no original: 4,15:1 e 3,96:1, corrigidos no template).
- **Navegação como links**, não botões com `scrollIntoView`: funciona sem JS, com `aria-current="location"`; o rótulo invisível não pode ampliar a área clicável (`pointer-events-none` e posição absoluta).
- **`images.ts` pode ser um objeto vazio** quando o visual não usa imagens (`sebo-template`); `og.jpg` continua vindo de `public/demo/`.
- **Listas opcionais tipadas** (`[] as Detalhe[]`), como na seção 15.
- **Mensagem do gerador:** o texto final ("fotos do template (Pexels, demonstração)") é genérico e não vale para o `sebo-template`, que não tem fotos. Não foi alterado (fora de escopo desta etapa).
