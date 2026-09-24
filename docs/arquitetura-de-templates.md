# Arquitetura de templates

Referência: `clinica-template/` (commit `8047376`). Este documento diz o que dele vira **padrão** para novos templates, o que **não** vira, o que os 53 projetos mostram sobre componentes repetidos e como montar um site novo combinando padrões.

## 1. Convenção (flexível)

```text
<template>/
├── index.html            # head com tokens {{SEO_*}}; sem texto de cliente
├── wrangler.jsonc        # name = nome do Worker; SPA fallback
├── vite.config.ts        # react + tailwind + cloudflare + plugin "marca-do-cliente"
├── public/               # apple-touch-icon.png, fotos do cliente (favicon/robots/sitemap são gerados)
└── src/
    ├── config/
    │   ├── site.ts       # QUEM é o cliente: nome, contatos, redes, SEO, nav
    │   └── images.ts     # fotos + alt, num lugar só
    ├── data/
    │   └── conteudo.ts   # O QUE o site diz: hero, serviços, equipe, FAQ, CTAs, rótulos
    ├── index.css         # @theme: cores/fontes (o "tema")
    ├── components/       # uma seção = um arquivo; ui.tsx com Reveal, Logo, ícones
    └── App.tsx           # ordem das seções
```

### Regras (o que realmente importa)

1. **Identidade e conteúdo saem dos componentes.** Componente não contém texto de cliente, telefone nem URL. Trocar de cliente = editar `config/` e `data/`.
2. **Três camadas separadas**: `site.ts` (fatos do negócio), `conteudo.ts` (copy das seções), `index.css` (tema). Cada uma muda por motivo diferente.
3. **SEO gerado, não escrito.** `index.html`, `robots.txt`, `sitemap.xml` e `favicon.svg` saem de `site.ts` no build. Ninguém edita à mão; some a classe de erro "canonical apontando para o site errado" (visto na auditoria).
4. **Sem `if (cliente)`.** Se uma seção não existe para o cliente, ela sai de `App.tsx` e de `nav`. Não há flag.
5. **Dependência mínima.** Base = React + Tailwind. Animação (`gsap`, `motion`) e 3D (`three`) entram **por template**, nunca na base.
6. **Acessibilidade básica no esqueleto**: link "ir para o conteúdo", `aria-expanded`/`aria-controls` no menu móvel, `<main>`, rótulos em `rotulos` (no `conteudo.ts`, inclusive os `aria-label`).
7. **Campos não são obrigatórios iguais.** Um template de restaurante terá `cardapio` em vez de `servicos`. A convenção é *onde* as coisas ficam (`config/`, `data/`), não a lista de campos.

### O que do `clinica-template` **não** vira padrão

- **Nomes de seção de saúde** (`Metodo`, `Relatos`, "Cuidados"): são de nicho. O padrão é a estrutura (seção = componente que lê um bloco de `conteudo.ts`).
- **Tema "forest/clay/bone"**: os nomes das cores são rótulos livres; cada template define os seus e documenta o papel de cada uma no comentário do `@theme`.
- **Fotos de banco (Pexels) em `images.ts`**: servem para demonstração; em um site de cliente, arquivos em `public/`.
- **`Reveal`**: cada template escolhe o seu (ver seção 5).

### O que deve virar padrão (e existe hoje)

| Item | Onde está | Por quê |
| --- | --- | --- |
| Plugin `marcaDoCliente` no `vite.config.ts` | `clinica-template/vite.config.ts` | Elimina 4 arquivos manuais por cliente |
| `whatsappUrl(mensagem)` | `config/site.ts` | 52 projetos usam `wa.me`, cada um montando a URL do seu jeito; um helper único evita número/mensagem inconsistentes |
| `Rich` (`*palavra*` = destaque) | `components/ui.tsx` | Copy editável sem JSX |
| Fontes de reserva com `size-adjust` | `index.css` | Evita salto de layout |
| Comentário de papéis das cores | `index.css` | Rebrand sem adivinhar |
| Checklist de entrega | `README.md` | Vira o processo (ver `guia-de-uso.md`) |

## 2. Levantamento de padrões repetidos

Similaridade medida comparando o hash dos arquivos em `src/components/` dos 53 projetos (não só pelo nome).

| Padrão | Projetos onde aparece | Similaridade | Vale centralizar? | Risco |
| --- | --- | --- | --- | --- |
| **Reveal** (animação de entrada) | 43 | **Alta**: 25 projetos têm o arquivo idêntico (gsap) e 14 têm outro idêntico; o restante (5) é único | **Sim**, mas só dentro de cada "família" | Baixo se ficar como arquivo copiado no template; médio se virar pacote compartilhado (versionar 53 projetos) |
| **DemoDialog** (aviso de e-mail de demonstração) | 47 | Todos diferentes no hash (varia o texto/estilo) | **Não** | É código de *demo*: some na entrega ao cliente |
| **Faq** | 43 | Nenhum idêntico; estrutura igual (acordeão), estilo próprio | Parcial: o *comportamento* (acordeão acessível) sim, o visual não | Médio: abstrair estilo dá componente cheio de props |
| **Depoimentos** | 40 | Idêntico só na ideia | **Não**: o layout é a marca visual do projeto; e é conteúdo que muitas vezes deve ser removido | Baixo |
| **Contato** | 30 | Ideia igual (WhatsApp, e-mail, endereço); implementação distinta | **Sim, como dado**: `site.ts` (`whatsapp`, `address`, `hours`) | Baixo |
| **Footer** | 25 | Distintos | Só o **dado** (nav, contatos, redes) | Baixo |
| **Header / menu móvel** | 14 (+ os que embutem no Layout) | Distintos, mas o comportamento é o mesmo (aberto/fechado, foco, `aria`) | Só o padrão de a11y, documentado | Médio (foco e teclado são fáceis de quebrar) |
| **Hero** | 53 | Cada um é a "assinatura" do projeto | **Não** | Alto: padronizar mataria a diferenciação |
| **WhatsApp CTA** | 52 | Cada projeto monta a URL `wa.me` por conta própria | **Sim**: helper `whatsappUrl` | Muito baixo |
| **Calculadoras / simuladores** (`CampoNumero`, `Calculadora`) | ferro, lumen, marcha, prisma, taca | `CampoNumero` repete em 5 projetos | Só `CampoNumero` (input numérico acessível) | Baixo, ganho pequeno |
| **Cards de serviço / catálogo** | ~35 (`Servicos`, `Catalogo`, `Procedimentos`) | Varia muito | **Não** | Alto |
| **Formulário** | poucos (`FormBusca`, `Encomenda`, `Configurador`) | Todos específicos | **Não** | — |
| **Galeria / timeline / marquee** | isolados (`Galeria`, `ProcedureTimeline`, `Marquise`) | Únicos | **Não** | — |

### Conclusão sobre componentes

Uma biblioteca compartilhada de componentes **não** se justifica agora. As evidências:

- O que se repete de forma idêntica é `Reveal` (39 projetos), e ele já está resolvido copiando um arquivo de 60 linhas.
- Header, Footer, Faq, Depoimentos e Hero repetem o *nome*, mas cada projeto os desenhou para ter identidade própria. Unificar tira exatamente o que diferencia os sites.
- Criar um pacote compartilhado (`packages/ui`) exigiria mudar a resolução de dependências e o build dos 53 projetos: risco alto, ganho baixo.

**Recomendação:** centralizar **dados e helpers**, não componentes. Concretamente: `config/site.ts` (contatos, SEO, nav), `whatsappUrl`, o plugin de marca e um `Reveal` por família. Se um dia um segundo template config-driven (restaurante, por exemplo) repetir o `Faq` ou o `Header` do `clinica-template` quase igual, aí extrair.

## 3. Template base (proposta)

Não criei uma pasta `_base`: seria uma cópia de ~1.200 linhas do `clinica-template` com o conteúdo de saúde removido, sem nenhum cliente que a use. **O `clinica-template` é a base.** Para um novo nicho, o caminho é copiá-lo e trocar o conteúdo (ver `guia-de-uso.md`); só quando houver um segundo template o núcleo comum deve ser extraído.

Composição da base (já existente no `clinica-template`):

| Necessidade | Situação |
| --- | --- |
| React 19, TypeScript, Vite 8, Tailwind v4 | ✔ |
| Configuração centralizada | ✔ `config/site.ts`, `data/conteudo.ts`, `config/images.ts` |
| SEO, favicon, robots, sitemap | ✔ gerados no build |
| Acessibilidade básica | ✔ skip link, `aria` no menu, `lang` no HTML |
| Worker | ✔ `wrangler.jsonc` com fallback SPA |
| README de personalização e checklist | ✔ |
| Só React em runtime | ✔ (sem gsap/motion/three) |
| `apple-touch-icon.png` gerado | ✘ manual (PNG estático) |
| Fontes trocáveis por config | ✘ manual (link no `index.html` + `--font-*`) |
| Lint | ✔ `oxlint` |

Pendências que valem antes de gerar um segundo template: gerar o `apple-touch-icon` a partir do favicon e mover o nome das fontes para `theme` (hoje espalhado em 3 lugares). Não foram feitas porque exigem alterar o `clinica-template`, que tem outra sessão trabalhando.

## 4. Biblioteca de padrões visuais

Padrões observados no código; a reutilização é da **receita**, não do arquivo. Para montar um site novo: escolha 1 hero + 1 padrão de conteúdo + 1 fechamento, e mantenha a paleta e tipografia próprias.

| Padrão | Exemplo de referência | Quando usar |
| --- | --- | --- |
| Hero com imagem e cartão flutuante | clinica-template `Hero`, revelar `ContactSheet` | Negócios de pessoas (saúde, beleza, foto) |
| Hero tipográfico | ancora, tinta ("TINTA" gigante), chave (`Masthead`) | Marcas sem foto boa; tom autoral |
| Hero com peça interativa | prisma `ConstrucaoJoia`, calibre `Mostrador`, escuta `RegistroPensamento` | Vitrine/portfólio; **evitar** em cliente que só quer WhatsApp |
| Seção de números | ancora `Extrato`, ferro `Recordes`, estudio-alma | Prova social real (só com número verdadeiro) |
| Serviços em lista numerada | trilha, torque `Especialidades` | Muitos serviços com texto curto |
| Cards assimétricos / bento | madolio `BentoCard` | Poucos diferenciais |
| Processo em passos | `Processo` em ~20 projetos | Todo serviço que precisa explicar "como funciona" |
| Faixa escura / CTA grande | clinica-template `Cta`, ferro `CtaFinal` | Fechamento da página |
| Seção escura alternada | bruma, prisma | Marcas de luxo/artesanais |
| FAQ em acordeão | 43 projetos | Sempre; ótimo para SEO e objeção |
| Cardápio / catálogo | fornada `Cardapio`, sebo `Catalogo` | Comércio com itens e preço |
| Depoimentos | 40 projetos | **Só relatos reais e autorizados** |
| Horizontal por painéis | tinta `Trilho` | Experimento; usa a rolagem lateral como identidade |
| Layout de "documento" (ficha, carimbo, ticket) | corte `TicketStub`, passaporte `CartaoEmbarque`, traco `Carimbo` | Criar identidade a partir do objeto do nicho |

Diretriz prática: o padrão que mais diferencia um site de outro nos projetos existentes é **um objeto do nicho como metáfora visual** (ticket, passaporte, planta, folha de contato). É um recurso de design, não de código: cada um é escrito à mão.

## 5. Sobre `Reveal`

Existem duas versões repetidas e várias variantes (`razao`, `nascente`, `adriano`, `madolio`). Ao criar um template novo:

- **Leve, sem dependência (preferido):** `IntersectionObserver` que adiciona a classe `is-in` + transição em CSS, sem biblioteca. É o que o `clinica-template` usa (`ui.tsx`); o CSS só esconde o elemento antes quando há JS e movimento permitido.
- **Com GSAP:** copie o `Reveal` de qualquer um dos 25 projetos idênticos (por exemplo `ancora`) e adicione `gsap`.
- Não misturar: um projeto, um `Reveal`.

Um cuidado aprendido no `clinica-template`/`clinica-tayara`: se o conteúdo nasce invisível e depende de JS para aparecer, ele some quando a animação falha. Garanta o estado final visível quando `prefers-reduced-motion` ou o JS não rodam.
