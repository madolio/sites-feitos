# sebo-template

Template comercial reutilizável para **sebos e livrarias de usados** (acervo em fichas, avaliação de acervo, sarau de troca).

**"Folha Solta — Sebo & livros usados" é só conteúdo de demonstração.** Nome, textos, livros (títulos de domínio público; edições, notas e preços inventados), curadora, contatos e endereço são fictícios. Não há fotografias: as fichas de papel, os carimbos e as orelhas de navegação são CSS/SVG. Tudo fica em 4 arquivos de configuração; nenhum componente precisa ser editado para trocar de cliente.

Vite + React 19 + TypeScript + Tailwind v4, publicado como Cloudflare Worker. A única dependência de runtime é o React.

É o quarto template do monorepo, derivado do conceito `sebo` (que **não** foi alterado). Convenções em [`../docs/contrato-de-template.md`](../docs/contrato-de-template.md).

## O que é o visual (e o que é fixo)

A identidade do template é a **orelha de página**: a navegação é uma fileira de dobras de canto de página (lateral no desktop, rodapé no celular), o acervo é feito de **fichas de papel** com carimbo de preço, e o processo usa **carimbos de tinta**. Essas peças são parte do template. O que muda por cliente são cores, fontes, textos, livros e contatos.

## Onde personalizar

| Item | Arquivo |
| --- | --- |
| Identidade (nome, descritor, frase do rodapé, logo) | `src/config/site.ts` |
| Contatos, endereço, horários, redes | `src/config/site.ts` |
| SEO (título, descrição, URL, `og:image`, cor do navegador, favicon) | `src/config/site.ts` → `seo` |
| Fontes (link do Google Fonts) | `src/config/site.ts` → `fonts` + `--font-*` em `src/index.css` |
| Orelhas de navegação | `src/config/site.ts` → `nav` (rótulos de até 9 letras) |
| Textos, **livros do acervo**, etapas do processo, FAQ, contato, rótulos | `src/data/conteudo.ts` |
| Imagens (opcional) | `src/config/images.ts` (começa vazio) |
| Cores | `src/index.css` → bloco `@theme` |

### O que é gerado sozinho a partir de `site.ts`

No build, o plugin de `vite.config.ts` cria o `<head>` do `index.html` (title, description, canonical, Open Graph, Twitter, theme-color, fontes), `robots.txt`, `sitemap.xml` e `favicon.svg` (página com a orelha dobrada e a inicial). **Não edite esses arquivos à mão**: mude `site.ts` e rode o build.

### Como o tema funciona

Duas superfícies, cada uma com suas funções de cor:

- **Pano** (o fundo do site): `background`, `surface`, `foreground`, `muted`, `accent-text`, `border`, `idle`.
- **Papel** (fichas, cartão de contato): `paper`, `paper-2`, `ink`, `ink-muted`.
- **Destaque** (botões, orelha ativa, carimbo sobre o papel): `accent`, `accent-hover`, `accent-foreground`.

Por que `accent` e `accent-text`? Um vermelho que passa em texto sobre papel claro costuma **não** passar sobre o pano escuro. O template separa os dois. O comentário do `@theme` traz os contrastes mínimos (≥ 4,5:1). Um sebo de tema claro pode inverter os dois grupos (pano claro, papel escuro).

## Como criar uma versão para cliente

1. Copie a pasta (sem `node_modules`, `dist`, `.wrangler`) para `nome-do-cliente/`. O gerador (`npm run new-site`) ainda **não** registra este template.
2. Troque `name` em `wrangler.jsonc` e `package.json` (o nome do Worker vira `https://<name>.sneakpeek.workers.dev`).
3. `src/config/site.ts`: nome, descritor, inicial, frase do rodapé, WhatsApp (`5511999999999`), e-mail, endereço, horários, Instagram, `seo.url`, `title`, `description`, `themeColor` (igual ao `--color-background`) e cores do favicon. **Endereço e horário só se o cliente informou.**
4. `src/index.css`: cores do `@theme` e, se trocar de fonte, `fonts` em `site.ts` + `--font-*`.
5. `src/data/conteudo.ts`: os **livros reais** (condição concreta em `nota`; `preco` opcional), textos, etapas do processo, FAQ, extras do contato.
6. Apague `public/demo/` e substitua `public/apple-touch-icon.png` (180×180). Defina `seo.ogImage` (1200×630 em `public/`) ou deixe `''`.
7. `footerNote: ''` para remover o aviso de demonstração.
8. Rode a checklist no fim deste arquivo.

## O que NÃO precisa ser alterado

Os componentes em `src/components/`, `App.tsx` e `vite.config.ts`. Isto foi testado: o template virou uma livraria de usados de identidade totalmente diferente (tema claro azul, outras fontes, acervo de 3 livros sem preço, 2 etapas, 2 dúvidas, sem e-mail nem extras no contato, etiqueta do hero própria, sem `og:image`) mexendo só nos 4 arquivos, sem vestígio da marca original no build (só os comentários de exemplo no topo de `site.ts` a citam).

Casos previstos em `conteudo.ts`:

- **Livro sem preço:** omita `preco` e o carimbo some.
- **Ficha do hero:** mostra `livros[hero.ficha.livro]`; a frase manuscrita é `hero.ficha.citacao` (deixe `''` para usar o estado do livro).
- **Quantidade de livros e de etapas do processo:** livre; o grid se ajusta.
- **Extras do contato** (sarau, feira, avisos): `contato.extras`; `[]` remove.
- **Telefone e e-mail:** vazios em `site.ts` escondem a linha.
- **Nome como etiqueta do hero:** `hero.rotulo: ''` usa `site.name`; `site.logo` troca por imagem.

Para **remover uma seção** (por exemplo, o FAQ): tire-a de `App.tsx` e a orelha correspondente de `nav` em `site.ts`. Para uma seção nova (depoimentos, coleções), crie um componente lendo um bloco novo de `conteudo.ts` e acrescente a orelha.

## Seções (ordem em `src/App.tsx`)

Orelhas de navegação · Hero (com a ficha em destaque) · Acervo (fichas de livros) · Como avaliamos (carimbos) · Dúvidas (FAQ) · Contato (cartão de papel) · Rodapé.

## Build

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # tsc + vite build (gera dist/)
npm run lint      # oxlint
```

Confira em `dist/`: `index.html` (título, canonical, `og:url`), `robots.txt`, `sitemap.xml`, `favicon.svg`. O deploy é por projeto e só quando você decidir (`npx wrangler whoami`, `npm run deploy`).

## Conteúdo fictício (demonstração)

São fictícios: o nome "Folha Solta", a curadora "Iara Bastos", todas as edições, estados, notas e preços dos livros (os títulos e autores são de obras de domínio público), a dedicatória do exemplar em destaque, o sarau, telefone, WhatsApp, e-mail, endereço e horários. **Assets de marca que o gerador não parametriza:** `public/demo/og.jpg` e `public/apple-touch-icon.png` (a letra "F" na página dobrada).

## Acessibilidade incluída

Um `h1`, hierarquia de títulos, link "Ir para o conteúdo", `lang` pt-BR, foco visível (3 px), orelhas como links (`aria-current="location"`, alvo de 44 px) que funcionam por teclado e sem JS, FAQ em botões com `aria-expanded`/`aria-controls`, `prefers-reduced-motion` respeitado, contraste ≥ 4,5:1 medido em cada superfície.

## Limitações conhecidas

- Sem fontes de reserva com `size-adjust` (o carregamento das fontes antes do render existe, mas pode haver um pequeno salto de layout em rede lenta).
- Sem JSON-LD (o `sebo` original tinha um `BookStore` escrito à mão no HTML; o contrato exige que saia de `site.ts`).
- Fotos não fazem parte do visual: um cliente que queira capas de livros precisa criar o componente.

## Checklist de entrega

```text
[ ] Nome, favicon e apple-touch-icon
[ ] Cores e fontes (contraste ≥ 4,5:1 em pano e papel)
[ ] public/demo apagado
[ ] Livros reais com condição concreta (preço só se informado)
[ ] Etapas do processo e FAQ do negócio
[ ] WhatsApp, e-mail, endereço e horários (só se informados)
[ ] Redes sociais
[ ] SEO: seo.url, title, description, ogImage
[ ] dist/robots.txt e dist/sitemap.xml com o domínio certo
[ ] footerNote de demonstração removido
[ ] Sem "Folha Solta", "Iara Bastos" ou "Sarau" de exemplo no site
[ ] Build sem erro
[ ] Teste em 320, 375, 390, 768, 1024 e 1280 px
[ ] Teste de teclado (Tab pelas orelhas, Enter, FAQ)
```
