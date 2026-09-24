# Avaliação de candidatos ao próximo template

Auditoria técnica de 2026-09-24 de sete demos do catálogo (`banca`, `sebo`, `focinho`, `pulso`, `revelar`, `estudio-alma`, `corte`), para medir **quão perto cada uma está do [contrato de template](contrato-de-template.md)** e quanto trabalho custaria transformá-la. É análise de reutilização técnica, **não avaliação comercial**, e **não transforma nenhum projeto**: nada foi alterado, e nenhum projeto foi construído para produzir este documento.

## Como foi medido

Tudo vem de inspeção dos arquivos (`index.html`, `vite.config.ts`, `package.json`, `wrangler.jsonc`, `public/`, `src/`, `CLAUDE.md`), com contagens por `grep` e por um script de literais de texto. Os três templates atuais entram como **régua**.

- **Texto nos dados** = fração dos literais de texto (frases com 12+ caracteres) que está em `src/data.ts`, `src/data/` ou `src/config/` em vez de nos componentes. É uma **estimativa por heurística**; ela ignora nomes de classe, mas pode perder texto quebrado em várias linhas e contar o que não é texto de página.
- **Linhas de texto JSX solto** = linhas de componente que são só texto, sem tag nem atributo. Também estimativa.
- Régua: `clinica-template` 95% do texto nos dados e 14 linhas de texto solto; `restaurante-template` 98% e 13; `academia-template` 98% e 13.
- **Não verificado** (fora do escopo pedido): build, TypeScript, overflow, contraste, console. Só se apontam características lidas no código.

## Tabela comparativa

| | banca | sebo | focinho | pulso | revelar | estudio-alma | corte |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Nicho | floricultura | livros usados | pet shop e vet | personal training | fotografia | pilates | salão e barbearia |
| Linhas de `ts`/`tsx` | 714 | 527 | 596 | 737 | 573 | 1224 | 692 |
| Componentes | 7 | 7 | 10 | 11 | 10 | 14 | 13 |
| Onde estão os dados | `data.ts` (98 linhas) | `data/livros.ts` (63) | `data.ts` (34) | `data.ts` (42) | `data.ts` (26) | `data.ts` (113) | `data.ts` (22) |
| Texto nos dados (estimativa) | 33% | **40%** | 20% | 21% | 15% | 25% | 2% |
| Linhas de texto JSX solto | 58 | **43** | 62 | 66 | 63 | 104 | 59 |
| Componentes com texto hardcoded (fora `DemoDialog`) | 5 de 7 | 6 de 7 | 5 de 10 | 6 de 11 | 7 de 10 | 10 de 14 | 7 de 13 |
| Dependência de runtime além do React | nenhuma | **nenhuma** | `gsap` | `gsap` | `gsap` | `gsap` (7 arquivos) | `gsap` |
| Imagens raster | nenhuma | nenhuma | nenhuma | nenhuma | **3 (URLs do Pexels dentro de `Hero.tsx`)** | nenhuma | nenhuma |
| Navegação | 4 "baldes" (data) | orelha de página (`Orelha.tsx`) | abas de pasta (`FolderTabs`, rótulos no componente) | trilho lateral (`Rail`) | barra de filme (`FilmBar`) | sem barra própria | barra de senha (`TicketBar`) |
| Seções "de template" que já existem | vitrine, processo, contato | acervo, processo, contato, rodapé | serviços, cuidados, depoimentos, FAQ, agendar | programas, resultados, depoimentos, FAQ, agendar | serviços, depoimentos, FAQ, contato | aulas, horários, instrutora, depoimentos, FAQ, experimental | menu de serviços, profissionais, depoimentos, FAQ, agendar |
| FAQ e depoimentos | não têm | não têm | ambos **nos componentes** | FAQ no componente; depoimentos em `data.ts` | ambos nos componentes | ambos nos componentes | ambos nos componentes |
| Lógica ou peça específica | montagem de buquê no balde (`Bancada`, `Balde`) | dobra da orelha | ficha do pet (`FichaCard`, `petExemplo`) | contador de repetições, linha de pulso | folha de contato, quadros | trilho, figura, respiração, grade | ticket de senha, poste de barbeiro |
| Cores fixas em componentes | 3 | 1 | 3 | 2 | 1 | **11** | 2 |
| Pontuação no contrato (0 a 28) | **12** | **12** | 11 | 11 | 8 | 9 | 10 |

## Critérios do contrato

Base: seções 2, 5, 7, 8, 9 e 10 do [contrato](contrato-de-template.md). **A** = atende (2 pontos), **P** = parcial (1), **N** = não atende (0).

| # | Critério (contrato) | banca | sebo | focinho | pulso | revelar | estudio-alma | corte |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `site.ts`, `conteudo.ts`, `images.ts` (seção 2) | P | P | P | P | P | P | P |
| 2 | Dado de cliente fora dos componentes (req. 2, seção 4). P se há 20% ou mais do texto nos dados | P | P | P | P | N | P | N |
| 3 | `index.html` com tokens `{{SEO_*}}` (req. 3) | N | N | N | N | N | N | N |
| 4 | `robots.txt`, `sitemap.xml`, `favicon.svg` gerados, não versionados (req. 4) | N | N | N | N | N | N | N |
| 5 | Marcadores `// @gen:*` (seção 10, item 7) | N | N | N | N | N | N | N |
| 6 | `wrangler.jsonc` e `package.json` com o slug, assets em modo SPA (seção 9) | A | A | A | A | A | A | A |
| 7 | Bloco `@theme` com cores e fontes (seção 3) | A | A | A | A | A | A | A |
| 8 | Sem cor fixa em componentes (seção 3). P se são até 3 ocorrências | P | P | P | P | P | N | P |
| 9 | Imagens só em `images.ts` (seção 7) | A (sem raster) | A (sem raster) | A (sem raster) | A (sem raster) | N | A (sem raster) | A (sem raster) |
| 10 | Acessibilidade básica (req. 6): P se falta o link "ir para o conteúdo" (0 ocorrências nos sete) mas há `lang` pt-BR, tratamento de `prefers-reduced-motion` e `aria-expanded` onde há acordeão (`sebo` e `banca` não têm FAQ) | P | P | P | P | P | P | P |
| 11 | Fontes de reserva com `size-adjust` e carregamento antes do render (req. 10) | N | N | N | N | N | N | N |
| 12 | `README.md` com "o que trocar e onde" e checklist (req. 9) | N | N | N | N | N | N | N |
| 13 | Contato do cliente em `site.ts`, sem modo demonstração (seção 8 e req. 8) | N | N | N | N | N | N | N |
| 14 | Sem biblioteca desnecessária (só React em runtime, como os 3 templates). P se só `gsap`; N se `gsap` em mais de 3 arquivos | A | A | P | P | P | N | P |
| | **Total** | **12** | **12** | **11** | **11** | **8** | **9** | **10** |

Observações sobre a tabela:

- **Não avaliados** por exigirem build ou navegador: build limpo (req. 1), 320 a 1280 px sem overflow (req. 5), contraste (req. 6), conteúdo visível sem JS (req. 7) e a cópia de teste (item 10). Sobre o item 7: o `Reveal` de `pulso` só esconde o conteúdo se houver JS e movimento permitido; os demais usam `Reveal` do mesmo tipo, não lidos um a um.
- **Item 6:** os sete têm `name` igual à pasta em `wrangler.jsonc` e `package.json`, com `not_found_handling: single-page-application`. A `compatibility_date` é mais antiga (2026-09-11 a 2026-09-16) que a dos templates (2026-09-24).
- **Item 7:** o contrato aceita nomes livres, mas pede o papel de cada cor comentado. Só `sebo` (4 comentários), `pulso` (2) e `estudio-alma` (2) têm algum comentário no `@theme`.
- **Item 13:** todos têm `demo.ts` e `DemoDialog.tsx`; os botões de WhatsApp abrem a mensagem no diálogo e oferecem o WhatsApp da Madolio (`5511982322989`), não o número do negócio. `sebo` ainda guarda telefone, endereço e horário dentro de `Contato.tsx`.
- **Item 4:** `public/` de cada um tem `apple-touch-icon.png`, `favicon.svg`, `og-image.png`, `robots.txt` e `sitemap.xml` versionados, e o `index.html` traz canonical, `og:*` e JSON-LD com o domínio escrito à mão.
- **Cores fixas (item 8):** `estudio-alma` tem 11 ocorrências em 4 arquivos; nos demais são 1 a 3 (por exemplo, o `fill="#b8432e"` do `Mark` em `focinho`).
- A pontuação só ordena. **Nenhum candidato chega perto de "pronto para o gerador"** (seção 10): todos falham nos itens 3, 4, 5, 11, 12 e 13, que são justamente a parte mecânica do contrato.

## Ranking por esforço relativo

| Esforço | Candidato | Motivo técnico resumido |
| --- | --- | --- |
| **Baixo** | `sebo` | Menor de todos (7 componentes, 416 linhas de componente). Só React em runtime. Dados tipados em `data/` (`Livro`) e a maior fração do texto nos dados (40%). Nada de imagem raster, nada de `gsap`. |
| Médio | `focinho` | 34 linhas de dados, 5 componentes com texto. Seções que já se parecem com as dos templates (serviços, depoimentos, FAQ, agendar). `gsap` só para animação. |
| Médio | `pulso` | Estrutura parecida com a da academia, mas com contador de repetições e trilho lateral em `gsap`. Nicho **se sobrepõe** ao `academia-template`. |
| Médio | `banca` | Só React, dados razoáveis, mas a montagem do buquê (`Bancada`, `Balde`) é a peça central e leva cores por flor nos dados. |
| Médio a alto | `corte` | Só 2% do texto nos dados; ticket de senha (`START_TICKET`, `TicketBar`, `TicketStub`) é lógica própria. |
| Médio a alto | `revelar` | Fotos do Pexels escritas dentro do `Hero.tsx` e quadros da folha de contato (que são ilustrações, não fotos); o nome da fotógrafa aparece dentro de componentes (`Nota`, `FilmBar`, `Contato`). |
| **Alto** | `estudio-alma` | Maior (14 componentes, 1224 linhas), `gsap` em 7 arquivos, 45 literais em 10 componentes, 11 cores fixas. |

Esforço é uma **estimativa relativa**, não em horas.

## Por candidato

Trabalho comum a **todos** (ver "O que se repete" abaixo) não é repetido em cada bloco.

### sebo

- **Pontos fortes:** dados tipados (`Livro`) em `data/livros.ts`; zero dependências; sem imagens; 7 componentes; `Footer` e `Contato` existem; `@theme` com comentários.
- **Limitações:** só há 4 seções (hero, acervo, processo, contato) sem FAQ, depoimentos, equipe nem menu; identidade forte no traço da orelha e na tipografia manuscrita (`--font-mao`); `Contato.tsx` guarda telefone, endereço, horário e sarau; `Hero`, `Processo` e `Contato` concentram 24 dos 28 literais; título "Seis exemplares" está escrito à mão e depende do tamanho de `livros`; `SEBO_WHATSAPP_FICTICIO` no `demo.ts`.
- **Reorganizar:** `Hero`, `Processo`, `Contato`, `Footer` (texto para `conteudo.ts`); `Orelha.tsx` (rótulos de navegação para `site.ts`/`conteudo.ts`); `demo.ts` e `DemoDialog.tsx` saem; `Catalogo.tsx` passa a mostrar o total dinamicamente.
- **`site.ts`:** `name`, `descriptor`, `initial`, `tagline`, WhatsApp, telefone, e-mail, endereço, horários (inclui "Sarau de troca" como linha extra), Instagram, `seo` (url, title, description, themeColor, faviconBg/faviconFg, ogImage), `fonts` (Piazzolla, Inter, Caveat), `nav`, `footerNote`. Os marcadores `@gen:name`, `initial`, `seo-url`, `seo-title`, `seo-description`, `og-image`.
- **`conteudo.ts`:** hero, acervo (título, intro, `livros`), processo, contato (títulos, CTA, sarau), rodapé, rótulos. **Também** uma decisão: FAQ e depoimentos não existem; um template comercial provavelmente deveria ganhá-los (trabalho novo, não migração).
- **`images.ts`:** hoje **vazio** (nenhuma foto). Precisaria decidir se o template terá capa dos livros ou permanece sem fotos (nesse caso `images.ts` só teria a imagem de compartilhamento).
- **`@theme`:** `pano`, `pano-2`, `pagina`, `pagina-2`, `tinta`, `creme`, `grafite`, `grafite-escuro`, `carimbo` (9 cores) e 3 fontes; não seguem funções semânticas, o que o contrato permite. Precisam de papéis comentados e de contraste medido (texto claro sobre `pano` escuro e escuro sobre `pagina`).
- **Antes de transformar:** decidir o que é "livro" no template (o tipo `Livro` é específico: `edicao`, `estado`, `nota`); definir se cabe outro tipo de acervo (LP, plantas, brechó); decidir se o traço da orelha e da textura de papel ficam fixos.

### focinho

- **Pontos fortes:** 10 componentes com seções parecidas às dos templates; `servicos` e `cuidados` já em `data.ts`; agendamento por formulário que gera a mensagem de WhatsApp; só `gsap` para animação; sem imagens.
- **Limitações:** FAQ inteiro dentro de `Faq.tsx` (12 literais); rótulos de navegação dentro de `FolderTabs.tsx`; nome da marca escrito em `Agendar.tsx` e `FichaCard.tsx`; `Mark` (logo) com cor fixa; a ficha do pet (`Pet`, `petExemplo`) é lógica de nicho.
- **Reorganizar:** `Faq`, `Depoimentos`, `Agendar`, `Hero`, `FichaCard`, `Cuidados` (texto); `FolderTabs` (rótulos e logo); `Reveal.tsx` (trocar por `IntersectionObserver` ou aceitar `gsap`); `demo.ts` e `DemoDialog.tsx` saem.
- **`site.ts`:** os campos comuns (como no `sebo`), mais horários e endereço; `nav`. **`conteudo.ts`:** hero, serviços (com preço opcional), cuidados, depoimentos, FAQ, agendar (títulos e mensagem), ficha de exemplo, rótulos. **`images.ts`:** apenas a de compartilhamento (hoje não há foto). **`@theme`:** `ink`, `paper`, `line`, `accent`, `accent-hover`, `sage` (já perto de funções) e `Fredoka`/`Nunito Sans`.
- **Antes de transformar:** o `Mark` é SVG com a cor no código; a ficha do pet é o traço do site e só faz sentido para pet; o nicho (pet) ainda não tem template.

### pulso

- **Pontos fortes:** `programas`, `resultados` e `depoimentos` já em `data.ts`; seções próximas às do `academia-template`; nomes de cor perto de funções (`track`, `chalk`, `lane`).
- **Limitações:** FAQ dentro do componente (`Faq.tsx`, 13 literais); `Rail.tsx`, `PulseLine.tsx` e `RepCounter.tsx` (`gsap`) dependem da metáfora da pista (as distâncias "0–25M" estão nos dados); nome "Pulso" dentro de `Rail`, `PulseLine`, `Depoimentos` e `Agendar`; **o nicho se sobrepõe ao `academia-template`**, então o ganho de catálogo é pequeno.
- **Reorganizar:** `Faq`, `Agendar`, `Depoimentos`, `Hero`, `Rail`, `PulseLine`; `demo.ts` e `DemoDialog.tsx` saem.
- **`site.ts`:** campos comuns, `nav`. **`conteudo.ts`:** hero, programas (com "distância" como campo do template), resultados (números marcados como exemplo), depoimentos, FAQ, agendar, rótulos. **`images.ts`:** só compartilhamento. **`@theme`:** `track`, `chalk`, `line`, `lane`, `lane-ink`, `lane-ink-hover`, `Anton`, `Karla`.
- **Antes de transformar:** decidir se a metáfora da pista entra como parte fixa; resolver a sobreposição com a academia (nicho ou variante visual?).

### banca

- **Pontos fortes:** sem dependências; `buques` e `secoes` tipados em `data.ts`; 7 componentes.
- **Limitações:** peça central específica (montar um buquê no balde) em `Bancada` e `Balde`; cores por flor nos dados (`cor: 'var(--color-marigold)'`), ou seja, dado e tema misturados; processo (10 literais) e contato dentro dos componentes; sem FAQ, depoimentos nem rodapé.
- **Reorganizar:** `Hero`, `Bancada`, `Processo`, `Contato`, `Vitrine`; `data.ts` separa catálogo de navegação; `demo.ts` e `DemoDialog.tsx` saem.
- **`site.ts`:** campos comuns. **`conteudo.ts`:** hero, buquês (tipo `Buque` com `ocasiao`, `estacao`, `ingredientes`, `embrulho`, `preco`), ocasiões, processo, contato, rótulos. **`images.ts`:** só compartilhamento. **`@theme`:** 11 cores por flor/papel (`bg`, `ink`, `paper`, `kraft`, `marigold`, `magenta`, `sky`, `violeta`, `folha`) e 2 fontes; sem comentários.
- **Antes de transformar:** a montagem do buquê e a paleta por flor são a identidade; um template de "floricultura" as manteria e limitaria a troca de marca, ou as removeria e viraria só catálogo.

### corte

- **Pontos fortes:** serviços e profissionais já em `data.ts`, com preço e minutos; sem imagens; só `gsap` para animação.
- **Limitações:** só 2% do texto nos dados (o arquivo tem 22 linhas); ticket de senha (`START_TICKET`, `TicketBar`, `TicketStub`) e o poste são lógica e ilustração próprias; FAQ, depoimentos e agendamento nos componentes; nome "Corte" escrito em `Hero`, `Agendar`, `Depoimentos` e `TicketBar`.
- **Reorganizar:** `Hero`, `Agendar`, `Depoimentos`, `Faq`, `TicketBar`, `TicketStub`, `Menu`, `Profissionais`; `demo.ts` e `DemoDialog.tsx` saem.
- **`site.ts`:** campos comuns. **`conteudo.ts`:** hero, serviços (nome, preço, minutos), profissionais, depoimentos, FAQ, agendar, rótulos. **`images.ts`:** só compartilhamento (e futura foto de profissional). **`@theme`:** `ink`, `paper`, `line`, `vermelho`, `vermelho-hover`, `azul`, `Unbounded`, `Manrope`.
- **Antes de transformar:** o ticket depende de um contador inicial; decidir se ele fica como "fila de atendimento" fixa.

### revelar

- **Pontos fortes:** 3 imagens com `alt` descritivo; sessões parecidas com as de serviços (pacotes, quadros).
- **Limitações:** **URLs do Pexels dentro de `Hero.tsx`** (violam "imagens só em `images.ts`"); JSON-LD cita a fotógrafa e a cidade; `Nota`, `FilmBar` e `Contato` guardam nome e cidade; só 15% do texto nos dados.
- **Reorganizar:** `Hero` (imagens para `images.ts`), `ContactSheet` (quadros), `Nota`, `FilmBar`, `Contato`, `Faq`, `Depoimentos`; `demo.ts` e `DemoDialog.tsx` saem.
- **`site.ts`:** campos comuns, com a cidade em `address` ou em campo opcional. **`conteudo.ts`:** hero, quadros, pacotes, nota, depoimentos, FAQ, contato, rótulos. **`images.ts`:** as 3 do hero e a de compartilhamento (os quadros da folha são ilustrações, não fotos). **`@theme`:** `ink`, `paper`, `line`, `amber`, `amber-ink`, `Big Shoulders Display`, `Public Sans`.
- **Antes de transformar:** depende de fotos, que o gerador não cria: o template continuaria com fotos de demonstração de terceiros; tirar do `Hero.tsx` as URLs também mexe na composição das fotos giradas.

### estudio-alma

- **Pontos fortes:** o maior conjunto de seções (aulas, horários, instrutora, depoimentos, FAQ, experimental, rodapé); `movements`, `aulas`, `dias` e `grade` já em `data.ts` (113 linhas).
- **Limitações:** o mais complexo (1224 linhas, 14 componentes, `gsap` em 7 arquivos); 45 literais em 10 componentes; 11 cores fixas em 4 arquivos; nome da marca e da instrutora dentro de 6 componentes; `Trilho`, `Figure`, `Respira` e `Horarios` são peças próprias do site (o que cada uma faz não foi lido em detalhe).
- **Reorganizar:** praticamente todos os componentes com texto; rever as cores fixas; decidir o que fica das peças interativas; `demo.ts` e `DemoDialog.tsx` saem.
- **`site.ts`:** campos comuns. **`conteudo.ts`:** hero, movimentos, aulas, grade de horários, instrutora, depoimentos, FAQ, experimental, rodapé, rótulos. **`images.ts`:** só compartilhamento. **`@theme`:** `gesso`, `ink`, `line`, `amarela`, `verde`, `azul`, `vermelha` (quatro cores de destaque de mesmo peso; o uso de cada uma não foi verificado) e `Jost`, `Space Mono`.
- **Antes de transformar:** a paleta de quatro cores de destaque de mesmo peso não cabe numa única cor `accent`; `Respira`, `Trilho` e `Figure` são peças próprias, não lidas em detalhe.

## O que se repete em todos os candidatos (trabalho comum)

1. Criar `src/config/site.ts` (com `@gen`), `src/data/conteudo.ts` e `src/config/images.ts`; mover o texto dos componentes.
2. `index.html` com tokens e `vite.config.ts` com o plugin `marcaDoCliente`; **apagar** de `public/` `robots.txt`, `sitemap.xml`, `favicon.svg` e `og-image.png` (passam a ser gerados ou opcionais); manter `apple-touch-icon.png`; decidir o JSON-LD (nenhum template atual tem) e tirá-lo do HTML fixo.
3. Remover `demo.ts` e `DemoDialog.tsx`; os botões passam a usar `whatsappUrl()` de `site.ts`.
4. Adicionar link "ir para o conteúdo", `<main id="conteudo">` e fontes de reserva com carregamento antes do render (`main.tsx`).
5. `README.md` do template, ajuste de `package.json` e `wrangler.jsonc`, marcadores `@gen`, registro em `scripts/templates.json`.
6. Substituir `Reveal` de `gsap` por um `IntersectionObserver` próprio, se o template quiser ficar só com React, como os três atuais.
7. Comentar o papel de cada cor no `@theme` e medir o contraste.
8. Cópia de teste com uma segunda marca (seção 10, item 10), e validação em 320 a 1280 px.

Estimativa de arquivos afetados, contando só o essencial: **`sebo` ≈ 14** (3 criados, `index.html`, `vite.config.ts`, `main.tsx`, `App.tsx`, 6 componentes, `demo.ts`/`DemoDialog` removidos), **`focinho` ≈ 17**, **`pulso` ≈ 18**, **`banca` ≈ 15**, **`corte` ≈ 19**, **`revelar` ≈ 19**, **`estudio-alma` ≈ 26**. São contagens aproximadas por soma de arquivos com texto hardcoded e dos arquivos de infraestrutura; não foram validadas por tentativa de migração.

## Problemas a resolver antes da transformação

1. **Decidir o que é "template" versus "demo com identidade forte"**: todos os sete têm uma metáfora visual (orelha, ficha, pista, balde, ticket, folha de contato, trilho) que é a identidade. O contrato ([seção 12](contrato-de-template.md)) diz que layout não se padroniza, mas um template precisa de uma parte trocável e uma parte fixa; é preciso definir qual metáfora fica fixa.
2. **Nicho:** `pulso` se sobrepõe ao `academia-template`. Os outros seis cobrem nichos ainda sem template (livraria, pet, floricultura, fotografia, pilates, salão), mas não há evidência aqui sobre qual convém.
3. **FAQ e depoimentos** estão dentro dos componentes em cinco candidatos (`focinho`, `pulso`, `revelar`, `estudio-alma`, `corte`), e não existem em `banca` e `sebo`.
4. **JSON-LD** com dados do negócio no `index.html` de todos: o contrato exige que saia de `site.ts`.
5. **Cores em nomes de design** e, em `estudio-alma`, quatro cores de destaque de mesmo peso: o contrato aceita, mas o gerador não as altera; a troca de marca vira edição manual do `@theme`.
6. **Cores fixas e SVG ilustrativos** dentro de componentes (`Mark` de `focinho`, ilustrações de `banca`, `corte` e `estudio-alma`).
7. **Assets de marca** em `public/`: `og-image.png` e `apple-touch-icon.png` carregam a marca; o gerador já sabe gerar o ícone neutro e omitir a imagem de compartilhamento.
8. **Fotos:** só `revelar` usa fotos; o resto não tem nenhuma. Um template de nicho visual (pet, floricultura, livros) provavelmente vai querer fotos, e isso é decisão de conteúdo.
9. **Build, contraste e responsividade** dos candidatos **não foram verificados** aqui.

## Achado colateral (fora dos candidatos)

O `academia-template` e o `restaurante-template` não têm fontes de reserva com `size-adjust` (0 ocorrências; o `clinica-template` tem 2), embora o requisito 10 do contrato peça isso. Os dois têm `document.fonts.load` no `main.tsx`, que cobre o carregamento, mas não o salto de layout por fonte de reserva. Não foi alterado nesta etapa.

## O que ainda precisa ser confirmado manualmente

- Se o build (`tsc -b`) passa em cada candidato hoje.
- Contraste, overflow e teclado de cada um (não medidos).
- Se `Reveal` esconde conteúdo sem JS em cada projeto (só `pulso` foi lido).
- Qual dos nichos interessa como próximo template; a decisão é de negócio e este documento não a toma.
- Que fração do texto está fora dos dados por causa de quebra de linha: a estimativa pode subcontar; o valor real deve ser confirmado ao migrar.
