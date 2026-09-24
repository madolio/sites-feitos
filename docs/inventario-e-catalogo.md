# Catálogo de projetos

Inventário do monorepo `sites-feitos`, organizado por nicho. Levantamento de 2026-09-24, feito a partir do código (`package.json`, `index.html`, `src/`) e dos `CLAUDE.md` de cada pasta. **É documentação**: nenhum projeto foi alterado, movido ou renomeado para produzi-lo.

Onde não foi possível determinar algo com segurança, o documento diz "desconhecido" ou "a confirmar" em vez de assumir (ver [Pontos incertos](#pontos-incertos)).

## Resumo

**56 projetos** (pastas com `package.json`), mais `docs/` e `scripts/` (sem projeto).

| Tipo | Qtd | O que é |
| --- | --- | --- |
| **Template** | 4 | Feito para reutilização: configuração central (`site.ts`, `conteudo.ts`, `images.ts`, `@theme`), marcadores `@gen` e uso pelo gerador |
| Demo / conceito | 47 | Site fictício que demonstra um nicho ou uma técnica. Inclui `site-template` (config parcial, ver abaixo) e `nascente` (histórico) |
| Cliente | 1 a 2 | `adriano` (site real). `realce` é um redesenho de negócio real: **a confirmar** se é cliente |
| Institucional | 1 | `madolio` (site da própria Madolio, em produção) |
| Ferramenta interna | 2 | `madolio-admin`, `leads` |

Atualizado com o `sebo-template` (4º template). Contagem por nicho: 14 grupos abaixo, cada projeto aparece **uma única vez**.

## Templates atuais

Só estes quatro cumprem o [contrato de template](contrato-de-template.md) e podem ser usados pelo gerador (`npm run new-site`, ver [gerador.md](gerador.md)).

| Template | Id no gerador | Nicho | Cores | Dependências de runtime |
| --- | --- | --- | --- | --- |
| [`clinica-template`](../clinica-template/) | `clinica` | Saúde: clínicas e profissionais (estética, odonto, psicologia, fisio, nutrição) | `forest` / `clay` (nomes de cor) | React |
| [`restaurante-template`](../restaurante-template/) | `restaurante` | Restaurantes, bistrôs, pizzarias | funções (`background`, `accent`...), cardápio em `.tema-claro` | React |
| [`academia-template`](../academia-template/) | `academia` | Academias, boxes, estúdios de treino | funções (`background`, `accent`...), planos em `.tema-claro` | React |
| [`sebo-template`](../sebo-template/) | `sebo` | Sebos e livrarias de usados | funções em duas superfícies (pano e papel), com `accent` e `accent-text` separados | React |

Pontos configuráveis, iguais nos quatro: `src/config/site.ts` (nome, contatos, endereço, horários, redes, SEO, fontes, menu; linhas marcadas `// @gen:*` que o gerador troca), `src/data/conteudo.ts` (todos os textos e listas), `src/config/images.ts` (fotos e `alt`) e o bloco `@theme` de `src/index.css` (cores e fontes). O que muda por nicho fica dentro do template:

| Template | Conteúdo específico em `conteudo.ts` |
| --- | --- |
| clinica | serviços/cuidados, método, equipe, relatos, FAQ |
| restaurante | destaques, cardápio por categorias (preço e marcas opcionais), história, equipe, ambiente, reserva, FAQ |
| academia | modalidades, planos (destaque e preço opcionais), estrutura, etapas do método, professores (registro opcional), aula experimental, FAQ |
| sebo | acervo de livros (preço opcional, condição concreta em cada ficha), ficha em destaque, etapas de avaliação de acervo, FAQ, contato com extras; navegação em "orelhas" definida em `nav` |

Os quatro usam só React em runtime (sem GSAP, Motion ou 3D). Cada um mantém a própria identidade visual: **não existe paleta comum**, e o gerador não altera cores.

### `site-template` **não** é um template do contrato

`site-template` (advocacia, "Bastos Advocacia", conceito fictício) tem `src/config/site.ts` e `src/data/`, mas **não** tem `conteudo.ts` nem `images.ts`, não tem marcadores `@gen` e usa GSAP. É a primeira tentativa de template, e por isso está classificado como **demo com configuração parcial**. Não está registrado no gerador. Para virar template seria preciso migrá-lo ao contrato (fora do escopo desta documentação).

## Cliente, institucional e ferramentas

| Projeto | Classificação | Observação |
| --- | --- | --- |
| `adriano` | **Cliente**: site real de Adriano Souza Passos (tratamento de água e elétrica, SP) | O `CLAUDE.md` diz que não é conceito, e os botões usam o WhatsApp real. Não usar como modelo e não alterar sem pedido. |
| `realce` | **Cliente? a confirmar**: redesenho de um salão e escola que **existe de verdade** (São Roque, SP) | O `CLAUDE.md` diz "não é conceito fictício", mas não confirma contrato com o dono. Tratar como dado real: não usar como modelo genérico. |
| `madolio` | **Institucional**: site da própria Madolio em produção (vitrine comercial) | Muito complexo (router, three, gsap, number-flow). Não é template. |
| `madolio-admin` | **Ferramenta interna** | Painel de métricas dos sites-conceito. Separado de `madolio` por decisão do dono. |
| `leads` | **Ferramenta interna** | Busca de negócios sem site (Google Places). |

## Catálogo por nicho

Colunas: **Tipo** (Template, Demo, Cliente...), **Dados** (onde o conteúdo fica: `site.ts + conteudo.ts + images.ts` é o contrato completo; `data.ts` / `data/` é dado separado, geralmente pequeno; `nos componentes` = sem arquivo de dados) e **Potencial** (reutilização técnica, definida na seção seguinte).

### Saúde e clínicas (5)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| clinica-template | Saúde / clínicas (estética, odonto, psico, fisio, nutrição) | Template | site.ts + conteudo.ts + images.ts | Alto (já é template) | Cores forest/clay no @theme; plugin do Vite gera head, robots, sitemap e favicon |
| arcada | Odontologia | Demo | data/ | Médio | Mapa interativo da arcada dentária (SVG) · Peça central é específica de odonto. |
| derme | Dermatologia / estética médica | Demo | data/ | Médio | Diagrama de camadas da pele, timeline de procedimento · Estrutura Header/Layout parecida com clínicas. |
| escuta | Psicologia clínica | Demo | data/ | Médio | Registro de pensamento (interativo), tabela online × presencial · 22 arquivos. |
| trilha | Fisioterapia | Demo | data/ | Médio | Mapa de fases em trilha, curva por especialidade |

### Beleza e bem-estar (3)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| corte | Salão / barbearia | Demo | data.ts | Médio | Ticket de horário, poste de barbeiro |
| esmalte | Manicure / esmalteria | Demo | data/ | Médio | Timer de "tempo de cura" |
| realce | Salão + escola de cabeleireiros (cliente real em São Roque, redesenho) | Cliente? (redesign de negócio real) | data/ | n/a | Conceito sobre negócio existente; **não** usar como modelo genérico. |

### Fitness e academia (4)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| academia-template | Academia / boxes / estúdios de treino | Template | site.ts + conteudo.ts + images.ts | Alto (já é template) | @theme por funções de cor; planos em seção tema-claro |
| ferro | Academia (musculação + funcional) | Demo | nos componentes | Baixo | Calculadora de 1RM |
| pulso | Personal training | Demo | data.ts | Médio | Linha de pulso, contador de repetições |
| estudio-alma | Pilates | Demo | data.ts | Médio | Horários, aula experimental |

### Alimentação e restaurantes (6)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| restaurante-template | Restaurante / gastronomia | Template | site.ts + conteudo.ts + images.ts | Alto (já é template) | @theme por funções de cor; cardápio em seção tema-claro |
| fornada | Padaria artesanal | Demo | nos componentes | Baixo | Contador de pães |
| sabor-da-vila | Hamburgueria | Demo | data.ts | Médio | `motion`, `@number-flow/react`, stickers · Bundle 514 kB (aceito, ver `auditoria-visual`). |
| doce-atelie | Confeitaria sob encomenda | Demo | data.ts | Médio | `motion`, gsap Draggable/Inertia, cartela · Bundle 458 kB. |
| balcao | Delivery / pedido direto | Demo | data/ | Médio | Carrinho |
| taca | Vinícola | Demo | data/ | Baixo | Roda de aromas (SVG) |

### Pet (2)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| pelagem | Banho e tosa | Demo | data/ | Médio | Guia por tipo de pelagem |
| focinho | Pet shop / veterinária | Demo | data.ts | Médio | Fichas e abas |

### Educação (2)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| ninho | Creche / educação infantil | Demo | data/ | Médio | Marcos do desenvolvimento, rotina do dia |
| passaporte | Curso de idiomas | Demo | data.ts | Médio | Cartão de embarque, níveis como carimbos |

### Automotivo (2)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| torque | Oficina mecânica | Demo | data/ | Médio | Painel de revisão por km |
| marcha | Concessionária de esportivos | Demo | data/ | Médio | Financiamento (calculadora), estoque |

### Serviços técnicos e locais (4)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| adriano | Tratamento de água e elétrica (**site real** de Adriano Souza Passos) | Cliente (site real) | nos componentes | n/a | Diagramas SVG, gauges · Cliente real: não usar como template; não alterar sem pedido. |
| nascente | Tratamento de água | Demo (histórico) | data/ | Baixo | `react-router-dom`, multi-página · Identidade técnica migrou para `adriano`. |
| vazao | Encanador autônomo | Demo | data/ | Médio | Diagnóstico |
| trinco | Chaveiro / serralheria 24h | Demo | data/ | Médio | Triagem de emergência |

### Serviços profissionais (3)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| site-template | Advocacia (Bastos Advocacia) | Demo (config parcial) | site.ts + data/ | Médio | `config/site.ts`, `pages/` · Primeira tentativa de template; convenção mais fraca que a do `clinica-template`. |
| ancora | Planejamento financeiro / patrimônio | Demo | data.ts | Médio | `@number-flow/react` (números animados) |
| razao | Contabilidade (MEI/Simples) | Demo | data/ | Médio | Calendário fiscal por regime |

### Arquitetura, design e construção (4)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| traco | Arquitetura | Demo | data.ts | Médio | Plantas em SVG |
| cerne | Design de interiores | Demo | data/ | Médio | Explorador de materiais, planta |
| lumen | Projeto luminotécnico | Demo | data/ | Baixo | Calculadora |
| encaixe | Marcenaria sob medida (nome no README) / alfaiataria (título) | Demo | data/ | Baixo | Configurador, desenho técnico · Título e README divergem; conferir antes de catalogar. |

### Comércio de bairro e artesanal (9)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| trama | Loja de roupa de bairro | Demo | data/ | Médio | Etiqueta de cuidado |
| sebo-template | Sebos e livrarias de usados | Template | site.ts + conteudo.ts + images.ts | Alto (já é template) | Derivado do conceito `sebo`; sem fotos (fichas, carimbos e orelhas em CSS/SVG); `@theme` por funções em duas superfícies |
| sebo | Livraria / sebo | Demo | data/ | Médio | Conceito original do `sebo-template`; permanece como estava |
| banca | Floricultura de bairro | Demo | data.ts | Médio | |
| estufa | Floricultura / paisagismo | Demo | data/ | Médio | Régua de florescimento, imagens webp |
| bruma | Perfumaria artesanal | Demo | data/ | Baixo | `framer-motion`, shader de fundo |
| prisma | Joalheria sob medida | Demo | data/ | Baixo | Construção da joia (SVG), medida |
| calibre | Relojoaria artesanal | Demo | data/ | Baixo | Mostrador interativo · README descreve 3D; o código atual só tem `gsap` (sem three). |
| luthier | Luteria | Demo | data/ | Baixo | Figuras de Chladni, onda de corda |

### Criativo, eventos e experiências (6)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| revelar | Fotografia (casamento/ensaio) | Demo | data.ts | Médio | Folha de contatos |
| tinta | Estúdio de tatuagem | Demo | data/ | Baixo | Layout horizontal por painéis (sem scroll vertical) · Navegação incomum. |
| torno | Cerâmica (ateliê) | Demo | data.ts | Baixo | `three`, r3f, drei, postprocessing (chunk lazy 1 MB) |
| cardume | Escola de mergulho | Demo | data.ts | Baixo | `three`, r3f (chunk lazy 920 kB) |
| zenite | Observação astronômica | Demo | data/ | Baixo | `framer-motion` |
| confete | Festa infantil | Demo | data.ts | Médio | Bolo, stickers |

### Imobiliário e ferramentas SaaS (demos) (3)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| chave | Classificados de imóveis | Demo | data.ts | Médio | Estilo "jornal" · Nicho imobiliário do catálogo. |
| rota | Roteirização de entregas | Demo | data/ | Baixo | Mapa de rotas, painel · SaaS/ferramenta (demonstração). |
| torre | Agenda que se administra sozinha | Demo | data.ts | Baixo | Radar, sistema de checagem · SaaS/ferramenta (demonstração). |

### Madolio: institucional e ferramentas internas (3)

| Projeto | Nicho | Tipo | Dados | Potencial | Tecnologias especiais / observação |
| --- | --- | --- | --- | --- | --- |
| madolio | Site institucional da própria Madolio | Institucional (produção) | data/ | n/a | router, three, r3f, gsap, number-flow · Vitrine comercial. Não é template. |
| madolio-admin | Painel interno | Ferramenta interna | data/ | n/a | |
| leads | Ferramenta de busca de leads | Ferramenta interna | nos componentes | n/a | |


## Potencial de reutilização (análise técnica)

É só reutilização técnica, **não** avaliação comercial. Critérios usados, todos verificáveis no código:

1. **Separação entre conteúdo e componentes**: existe arquivo de dados? Quanto do texto está nele?
2. **Dependências e recursos pesados**: `three`/r3f, shader, `react-router-dom`. Uma dependência leve isolada (`gsap`, `motion`, `@number-flow/react`) não rebaixa por si só.
3. **Peça central específica do nicho**: simulador, mapa, calculadora ou diagrama que precisaria ser reescrito.
4. **Trocar a identidade sem reescrever a interface**: só os templates atendem hoje.
5. **Complexidade** (arquivos e linhas).

| Nível | Definição | Quantos |
| --- | --- | --- |
| **Alto** | Já é template do contrato, ou cumpriria o contrato só com o trabalho de configuração | 4 (apenas os templates) |
| **Médio** | Dado em arquivo próprio, sem recurso pesado e com peça central que pode ser trocada ou removida; ainda exige extrair texto dos componentes e adotar o contrato | 31 |
| **Baixo** | A peça central *é* o site (3D, shader, diagrama, simulador), ou há recurso pesado, ou o conteúdo está nos componentes | 16 |
| n/a | Cliente, institucional ou ferramenta | 5 |

**Nenhuma demo atinge "Alto"** (o `sebo` já virou o `sebo-template`, que é o único caso migrado): mesmo as melhores têm arquivo de dados pequeno (22 a 113 linhas nas verificadas) e o texto principal dentro dos componentes. Isso é o oposto do que os templates fazem.

**Demos mais próximas de virar template** (nível Médio, complexidade baixa no inventário, dado em arquivo, no máximo `gsap`): `banca`, `focinho`, `pulso`, `revelar` (o `sebo` saiu desta lista: virou `sebo-template`). Em seguida, com complexidade média: `estudio-alma`, `corte`. Para cada uma, o caminho seria o mesmo do restaurante e da academia: criar `conteudo.ts`, `images.ts` e `site.ts`, e mover o texto dos componentes para lá.

**Demos de potencial baixo mais evidentes**: `torno` e `cardume` (three/r3f), `bruma` (shader, framer-motion), `nascente` (router) e as de peça central própria: `prisma`, `luthier`, `calibre`, `lumen`, `encaixe`, `tinta`, `taca`. `zenite` também está em baixo no inventário original, sem motivo detalhado lá (usa `framer-motion`). `ferro` e `fornada` ficam em baixo por terem o conteúdo dentro dos componentes, embora sejam simples.

**Nichos sem template** hoje, onde há demo de potencial médio: pet (`focinho`, `pelagem`), beleza (`corte`, `esmalte`), educação (`ninho`, `passaporte`), serviços profissionais (`ancora`, `razao`), automotivo/local (`torque`, `marcha`, `trinco`, `vazao`). Não há evidência de mercado neste documento sobre qual priorizar.

## Pontos incertos

- **`realce`**: existe de verdade, mas não está claro se é cliente contratado ou redesenho de portfólio.
- **`encaixe`**: título "Alfaiataria sob Medida", README/`CLAUDE.md` falam em marcenaria em partes. Nicho a confirmar.
- **`calibre`, `ferro`**: os `CLAUDE.md` citam 3D (mostrador com física; anilhas 3D), mas o `package.json` não tem `three`. Pode ser CSS/SVG/canvas; não verificado.
- **`escuta`**: o `CLAUDE.md` diz que o pedido apontou para um site real como referência de estrutura; o projeto está catalogado como demo, sem confirmação de vínculo com o dono desse site.
- **`nascente`**: começou como projeto de um cliente real (NBJ Systems), que não seguiu adiante, e virou conceito em set/2026. Catalogado como demo (histórico).
- **Nomes de domínio**: o README da raiz pode ainda citar o subdomínio antigo `*.fenoninho-max.workers.dev` (o atual é `sneakpeek.workers.dev`). Não foi verificado nem alterado, pois o arquivo está em edição por outra sessão.
- **Potencial "Médio" das demos** parte da leitura de código feita no inventário original (2026-09-24) mais a checagem de arquivos de dados desta revisão; não foi construído nem testado cada projeto.

## Documentos relacionados

- [contrato-de-template.md](contrato-de-template.md): o que um template precisa ter.
- [arquitetura-de-templates.md](arquitetura-de-templates.md): convenções e padrões repetidos entre os projetos.
- [gerador.md](gerador.md) e [plano-gerador.md](plano-gerador.md): o `npm run new-site`.
- [guia-de-uso.md](guia-de-uso.md): passo a passo para criar um site de cliente.
