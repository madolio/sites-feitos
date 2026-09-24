# Inventário e catálogo comercial

Levantamento feito em 2026-09-24 a partir do código (`package.json`, `index.html`, `src/`) e do README raiz. Nenhum projeto foi alterado para produzi-lo.

**Como ler:** "conceito" = site de demonstração de um nicho, com dados fictícios (a maioria). "Reutilizável" descreve o esforço real de virar um cliente hoje, olhando o código:

- **Alto**: conteúdo isolado em arquivo de configuração e sem dependências pesadas (`clinica-template` e `restaurante-template`).
- **Médio**: conteúdo em `src/data.ts` ou `src/data/`, mas a marca, o visual e as seções estão amarrados aos componentes.
- **Baixo**: o visual *é* a ideia (3D, diagrama, simulador); trocar o cliente é reescrever a peça central.

Tecnologias: quase todos usam GSAP só para `Reveal` (animação de entrada). Só as exceções estão na coluna "Tecnologias especiais".

## Inventário (53 pastas com código)

| Projeto | Nicho | Tipo | Reutilizável | Complexidade | Tecnologias especiais | Observação |
| --- | --- | --- | --- | --- | --- | --- |
| clinica-template | Saúde / clínicas (estética, odonto, psico, fisio, nutrição) | **template** | **Alto** | Média (1,2 mil linhas, só React) | Plugin Vite gera head/robots/sitemap/favicon a partir de `site.ts` | Base de referência (config central). Ver `arquitetura-de-templates.md`. |
| restaurante-template | Restaurante / gastronomia | **template** | **Alto** | Média (só React, sem gsap/3D) | Plugin Vite (SEO/favicon/fontes), tema por funções de cor (`.tema-claro`) | 2º template config-driven; validado com uma 2ª marca (pizzaria) sem editar componentes. Ver README do template. |
| site-template | Advocacia (Bastos Advocacia) | template (legado) | Médio | Média | `config/site.ts`, `pages/` | Primeira tentativa de template; convenção mais fraca que a do `clinica-template`. |
| arcada | Odontologia | demo | Médio | Média | Mapa interativo da arcada dentária (SVG) | Peça central é específica de odonto. |
| derme | Dermatologia / estética médica | demo | Médio | Média | Diagrama de camadas da pele, timeline de procedimento | Estrutura Header/Layout parecida com clínicas. |
| escuta | Psicologia clínica | demo | Médio | Média | Registro de pensamento (interativo), tabela online × presencial | 22 arquivos. |
| trilha | Fisioterapia | demo | Médio | Média | Mapa de fases em trilha, curva por especialidade | |
| esmalte | Manicure / esmalteria | demo | Médio | Média | Timer de "tempo de cura" | |
| realce | Salão + escola de cabeleireiros (cliente real em São Roque, redesenho) | portfólio | Baixo | Média | — | Conceito sobre negócio existente; **não** usar como modelo genérico. |
| corte | Salão / barbearia | demo | Médio | Média | Ticket de horário, poste de barbeiro | |
| pelagem | Banho e tosa | demo | Médio | Média | Guia por tipo de pelagem | |
| focinho | Pet shop / veterinária | demo | Médio | Baixa | Fichas e abas | |
| ninho | Creche / educação infantil | demo | Médio | Média | Marcos do desenvolvimento, rotina do dia | |
| passaporte | Curso de idiomas | demo | Médio | Média | Cartão de embarque, níveis como carimbos | |
| ferro | Academia (musculação + funcional) | demo | Médio | Média | Calculadora de 1RM | |
| pulso | Personal training | demo | Médio | Baixa | Linha de pulso, contador de repetições | |
| estudio-alma | Pilates | demo | Médio | Média | Horários, aula experimental | |
| razao | Contabilidade (MEI/Simples) | demo | Médio | Média | Calendário fiscal por regime | |
| ancora | Planejamento financeiro / patrimônio | demo | Médio | Média | `@number-flow/react` (números animados) | |
| traco | Arquitetura | demo | Médio | Média | Plantas em SVG | |
| cerne | Design de interiores | demo | Médio | Média | Explorador de materiais, planta | |
| lumen | Projeto luminotécnico | demo | Baixo | Média | Calculadora | |
| encaixe | Marcenaria sob medida (nome no README) / alfaiataria (título) | demo | Baixo | Média | Configurador, desenho técnico | Título e README divergem; conferir antes de catalogar. |
| trama | Loja de roupa de bairro | demo | Médio | Média | Etiqueta de cuidado | |
| bruma | Perfumaria artesanal | demo | Baixo | Alta | `framer-motion`, shader de fundo | |
| prisma | Joalheria sob medida | demo | Baixo | Alta | Construção da joia (SVG), medida | |
| calibre | Relojoaria artesanal | demo | Baixo | Média | Mostrador interativo | README descreve 3D; o código atual só tem `gsap` (sem three). |
| luthier (Ressoa) | Luteria | demo | Baixo | Média | Figuras de Chladni, onda de corda | |
| marcha | Concessionária de esportivos | demo | Médio | Média | Financiamento (calculadora), estoque | |
| torque | Oficina mecânica | demo | Médio | Média | Painel de revisão por km | |
| trinco | Chaveiro / serralheria 24h | demo | Médio | Média | Triagem de emergência | |
| vazao | Encanador autônomo | demo | Médio | Média | Diagnóstico | |
| adriano | Tratamento de água e elétrica (**site real** de Adriano Souza Passos) | **projeto especial** | Baixo | Média | Diagramas SVG, gauges | Cliente real: não usar como template; não alterar sem pedido. |
| nascente | Tratamento de água | demo (histórico) | Baixo | Alta | `react-router-dom`, multi-página | Identidade técnica migrou para `adriano`. |
| fornada | Padaria artesanal | demo | Médio | Baixa | Contador de pães | |
| banca | Floricultura de bairro | demo | Médio | Baixa | — | |
| estufa | Floricultura / paisagismo | demo | Médio | Média | Régua de florescimento, imagens webp | |
| sebo | Livraria / sebo | demo | Médio | Baixa | — | |
| sabor-da-vila | Hamburgueria | demo | Médio | Alta | `motion`, `@number-flow/react`, stickers | Bundle 514 kB (aceito, ver `auditoria-visual`). |
| doce-atelie | Confeitaria sob encomenda | demo | Médio | Alta | `motion`, gsap Draggable/Inertia, cartela | Bundle 458 kB. |
| balcao | Delivery / pedido direto | demo | Médio | Média | Carrinho | |
| confete | Festa infantil | demo | Médio | Média | Bolo, stickers | |
| revelar | Fotografia (casamento/ensaio) | demo | Médio | Baixa | Folha de contatos | |
| tinta | Estúdio de tatuagem | demo | Baixo | Média | Layout horizontal por painéis (sem scroll vertical) | Navegação incomum. |
| torno | Cerâmica (ateliê) | demo | Baixo | Alta | `three`, r3f, drei, postprocessing (chunk lazy 1 MB) | |
| cardume | Escola de mergulho | demo | Baixo | Alta | `three`, r3f (chunk lazy 920 kB) | |
| zenite | Observação astronômica | demo | Baixo | Média | `framer-motion` | |
| taca | Vinícola | demo | Baixo | Média | Roda de aromas (SVG) | |
| chave | Classificados de imóveis | demo | Médio | Média | Estilo "jornal" | Nicho imobiliário do catálogo. |
| rota | Roteirização de entregas | demo | Baixo | Média | Mapa de rotas, painel | SaaS/ferramenta (demonstração). |
| torre | Agenda que se administra sozinha | demo | Baixo | Média | Radar, sistema de checagem | SaaS/ferramenta (demonstração). |
| madolio | Site institucional da própria Madolio | **projeto especial** | Baixo | Muito alta (56 arquivos, 6,3 mil linhas) | router, three, r3f, gsap, number-flow | Vitrine comercial. Não é template. |
| madolio-admin | Painel interno | administrativo | Não se aplica | Baixa | — | |
| leads | Ferramenta de busca de leads | ferramenta | Não se aplica | Baixa | — | |
| docs | — (sem código) | documentação | — | — | — | Esta pasta. |

Pontos de atenção do inventário:

- **`encaixe`** tem título "Alfaiataria" e README "marcenaria": o nicho não é claro. Confirmar antes de usar.
- **`calibre`**: o README fala em 3D, mas `package.json` não tem `three`.
- **Nomes de domínio**: o README raiz ainda cita `*.fenoninho-max.workers.dev`; o subdomínio atual é `sneakpeek.workers.dev`. Não corrigi (o README está modificado por outra sessão).

## Estrutura de catálogo proposta

Os projetos existentes já formam grupos naturais. Proponho as categorias abaixo (menos forçadas que a lista genérica):

| Categoria | Projetos candidatos |
| --- | --- |
| **Saúde e clínicas** | clinica-template (base), arcada, derme, escuta, trilha, esmalte, ninho |
| **Beleza e bem-estar** | corte, realce, estudio-alma, pulso, ferro, pelagem, focinho |
| **Alimentação** | fornada, sabor-da-vila, doce-atelie, balcao, banca, estufa |
| **Serviços profissionais** | site-template (advocacia), ancora, razao, traco, cerne, lumen |
| **Serviços locais e oficinas** | torque, trinco, vazao, marcha |
| **Comércio de bairro** | trama, sebo, bruma, prisma, calibre, luthier |
| **Criativo e experiências** | revelar, tinta, torno, cardume, zenite, taca, confete, passaporte |
| **Imobiliário / operação (SaaS demo)** | chave, rota, torre |

Não há projetos para "Restaurante de mesa" e "Eventos" além de `confete` e das demos de comida; **lacuna real**: nenhum template genérico de restaurante e nenhum de academia é config-driven.

## Candidatos a catálogo

Nenhum ranking definitivo (falta evidência de mercado). A lista mostra o que serviria **agora** com pouco esforço.

| Projeto | Nicho | Por que pode ser reutilizado | O que trocar para virar cliente | Esforço |
| --- | --- | --- | --- | --- |
| clinica-template | Saúde | Já é config-driven; só depende de React; SEO e favicon gerados | `site.ts`, `conteudo.ts`, `images.ts`, cores, apple-touch-icon | **Baixo** (horas) |
| site-template | Advocacia | Tem `config/site.ts` e `pages/` | Marca, textos, registro OAB | Baixo–médio |
| escuta / trilha / arcada / derme | Psicologia, fisio, odonto, derma | Estrutura Header/Hero/Faq/Contato; peça central específica do nicho | Todo o `data/`, marca, cores, fotos; manter a peça central (mapa, registro) ou remover | Médio |
| corte / pulso / ferro / estudio-alma | Beleza e fitness | Agendamento e planos em `data.ts` | `data.ts`, marca, WhatsApp, horários | Médio |
| torque / trinco / vazao / marcha | Serviços locais | Seções de serviço + triagem/diagnóstico simples | `data`, telefone/WhatsApp, área de atendimento | Médio |
| fornada / balcao / sabor-da-vila / doce-atelie | Alimentação | Cardápio e pedido via WhatsApp | Cardápio, preços reais, fotos | Médio (doce/sabor: alto, por `motion`) |
| ancora / razao / traco / cerne | Serviços profissionais | Layout sóbrio, pouca dependência | `data`, marca, credenciais reais | Médio |
| torno / cardume / prisma / bruma / tinta | Experiências | Servem como **vitrine/portfólio**, não como base | Reescrever a peça central por cliente | Alto |

Regras que valem para qualquer candidato: substituir depoimentos fictícios por relatos autorizados (ou remover a seção), remover o `DemoDialog` e o aviso de demonstração, e nunca inventar endereço, horário ou preço.
