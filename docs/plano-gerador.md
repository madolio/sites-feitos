# Plano do gerador `npm run new-site`

**Status: planejamento. Nada foi implementado.** O gerador só faz sentido depois que existir mais de um template config-driven; hoje só o `clinica-template` tem essa forma.

## O que já está pronto para o gerador

O `clinica-template` concentra tudo que varia por cliente em `site.ts`, `conteudo.ts`, `images.ts` e no `@theme` do `index.css`, e o plugin do Vite gera o resto. Portanto, gerar um site é **copiar a pasta + substituir alguns valores**. Não precisa de motor de templates.

## Arquitetura sugerida (a mais simples que serve)

```text
sites-feitos/
├── scripts/
│   └── new-site.mjs         # ~100 linhas, Node puro, sem dependências
└── templates.json           # catálogo: { "clinica": { "pasta": "clinica-template", "campos": [...] } }
```

- `templates.json` liga um nome curto ao template de origem. É o embrião do catálogo comercial (nome, nicho, pasta, campos obrigatórios).
- `new-site.mjs` faz, nesta ordem:
  1. lê os argumentos (`npm run new-site clinica -- --nome "Clínica Aurora" --whatsapp 5511... --cor "#7a5c46"`) e, se faltar algo, pergunta no terminal (`readline`, nativo do Node);
  2. **recusa** se a pasta de destino já existir (nunca sobrescreve);
  3. copia o template excluindo `node_modules`, `dist`, `.wrangler` e o lockfile antigo;
  4. reescreve **só valores conhecidos**: `name` em `wrangler.jsonc`/`package.json`, `site.name`, `site.initial`, contatos, `seo.url`, `seo.themeColor`, cores do favicon;
  5. imprime o que ainda é manual (fotos, textos, apple-touch-icon, depoimentos) e os comandos `npm install` e `npm run build`.

Ele **não** faz deploy, não roda `npm install` sozinho, não faz `git commit`, não toca em outro projeto.

## Entradas do fluxo futuro

| Entrada | Vai para |
| --- | --- |
| Nome da empresa | `site.name`, `wrangler.jsonc` `name` (slug), `package.json` |
| Nicho / template | escolhe a pasta de origem |
| Cor principal | `@theme` (cor de destaque), `seo.themeColor`, `faviconBg` |
| WhatsApp / telefone / e-mail | `site.ts` |
| Domínio | `seo.url` (senão `https://<slug>.sneakpeek.workers.dev`) |
| Profissional | `conteudo.ts` → `equipe` (só o nome; o resto fica marcado como a preencher) |

## Decisões de design

- **Substituição por marcadores, não por regex livre.** Nos templates, os valores que o gerador troca ficam em linhas marcadas (`// @gen:name`). Assim, editar o template não quebra o gerador em silêncio, e o gerador falha alto se não encontrar o marcador.
- **Um template, um comando.** `new-site clinica`, `new-site restaurante`: o nome curto vem de `templates.json`; não há flags por nicho.
- **Sem dependências.** Node 20+ (`fs.cpSync`, `readline`); o monorepo já exige Node para o Vite.
- **Segurança**: destino dentro do monorepo, nome só `[a-z0-9-]`, nada de rede, nada de comandos externos.

## Pré-requisitos (fazer antes de implementar)

1. Marcar os pontos trocáveis no `clinica-template` (`// @gen:*`). Exige editar o template (hoje com outra sessão trabalhando nele).
2. Ter **pelo menos um segundo template** config-driven, para o gerador não nascer amarrado a um só.
3. Decidir a convenção de cor: um único `--color-brand` no `@theme` que o gerador possa trocar (hoje cada template tem nomes próprios).
4. Gerar o `apple-touch-icon.png` a partir do favicon (opcional no plugin do Vite), para reduzir o passo manual.

## Fora de escopo (de propósito)

Interface web, geração de conteúdo com IA, deploy automático, criação de repositório, DNS/domínio. Cada um é um projeto próprio e pode vir depois sem mudar a base acima.

## Ordem sugerida

1. Criar o segundo template config-driven (restaurante ou serviços profissionais).
2. Extrair o que os dois repetirem (helper de WhatsApp, plugin de marca) em cópia, não em pacote.
3. Escrever `templates.json` e `new-site.mjs`.
4. Testar gerando um site descartável em pasta temporária e rodando `npm run build`.
