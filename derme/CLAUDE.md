# Cútis Dermatologia (conceito)

Site-conceito da Madolio pro nicho de **dermatologia e estética médica**. **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + GSAP. Página única.

## Deploy (Cloudflare Workers)

Worker `derme`, em `https://derme.sneakpeek.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Colisão (Q1/Q2):** marketing de clínica de estética × registro clínico de dermatologia real. O resultado de um procedimento é mostrado como dado documentado de recuperação ao longo do tempo (dia 0, dia 3, dia 14...), não como foto de "antes e depois" de banco de imagens, e a estrutura da pele aparece em corte transversal com terminologia real (epiderme, derme papilar, derme reticular, hipoderme) quando isso esclarece o mecanismo do procedimento.
- **Nunca parecer (Q4):** o kit rosa-pastel de clínica de estética genérica (rose gold, "beleza que floresce", foto de banco de mulher tocando o rosto, antes/depois de modelos de estoque sem relação com o negócio). Também não pode se parecer com o `realce/` (irmão deste mesmo repositório): salão de cabelo com mecânica de camarim/espelho, registro estético-capilar, paleta dourado/preto quente — este é registro médico-dermatológico, nicho vizinho mas problema e público diferentes.

## O wildcard: linha do tempo de recuperação, não antes/depois

`ProcedureTimeline.tsx` + `data/procedimentos.ts`: cada um dos 6 procedimentos do catálogo (limpeza de pele profunda, peeling químico superficial, peeling médio ATA, microagulhamento, skinbooster, toxina botulínica) tem uma sequência de **marcos reais de recuperação** — dia, título, descrição clínica e fase (procedimento / reação esperada / recuperação / resultado). Um `<input type="range">` (mais botões de atalho por dia, pra quem prefere clicar a arrastar) percorre esses marcos: arrastar do dia 0 ao dia 60 de um peeling médio mostra o frosting na hora, a formação de crosta no dia 3, a queda da crosta no dia 7, a vermelhidão residual passando no dia 21 e o resultado final no dia 60 — a mesma estrutura de dado real que apareceria numa ficha de acompanhamento clínico.

Os números vêm de faixas típicas descritas em literatura dermatológica geral (consensos de sociedades de dermatologia e cirurgia dermatológica sobre peelings químicos, microagulhamento, skinboosters de ácido hialurônico e toxina botulínica) — não são number aleatórios. Por procedimento:

- **Limpeza de pele:** sem downtime real, vermelhidão passa em horas, efeito dura ~4 semanas (indicação mensal).
- **Peeling superficial (glicólico/mandélico):** descamação começa dia 2, pico dia 5, pele renovada dia 14; protocolo de 4-6 sessões a cada 2-4 semanas.
- **Peeling médio (TCA):** frosting imediato, crosta forma-se em 3 dias e cai no dia 7 (comportamento característico de TCA, diferente do superficial), resultado final em ~60 dias; repetição a cada 6-12 meses.
- **Microagulhamento:** vermelhidão tipo "queimadura de sol" no dia 1, cede em 3 dias, resultado de colágeno em 4-6 semanas, protocolo de 3-6 sessões mensais.
- **Skinbooster:** hematoma/inchaço possível em 48h, resolvido em 7 dias, pico de hidratação em 30 dias, dura 4-6 meses.
- **Toxina botulínica:** sem efeito visível no dia 0 (ação é na junção neuromuscular, não na pele), início em 3 dias, efeito máximo em 14 dias, dura 3-4 meses.

Cada card também tem `duracaoResultado` e `protocolo` como dados tabulares, não texto solto, e o texto do site evita prazo fechado como garantia ("costuma", "em geral") porque cicatrização varia por paciente.

## O diagrama de camadas (`SkinLayerDiagram.tsx`)

Corte transversal em SVG com epiderme, derme papilar, derme reticular e hipoderme/músculo. Cada procedimento destaca a camada que ele de fato atinge — por mecanismo real, não decoração: limpeza de pele e peeling superficial atuam só na epiderme; peeling médio atravessa até a derme papilar (por isso forma crosta, o superficial não forma); microagulhamento e skinbooster agem na derme; toxina botulínica age na junção neuromuscular, abaixo da pele, o que o diagrama marca explicitamente como "a pele em si não é tratada" — distinção clinicamente real entre um procedimento que trata a pele e um que trata o músculo por baixo dela.

O hero (`Hero.tsx`) já embute uma instância compacta da linha do tempo (peeling médio) e do diagrama, pra o mecanismo aparecer no primeiro scroll, não só depois de rolar até o catálogo — resposta direta ao padrão do portfólio contra página "morta, sem vida" e ao pedido de que o wildcard fique visível/sugerido já no hero.

## Modo demonstração

Igual a Estufa Cheia/Bruma/Fornada/Pulso: `demo.ts` + `DemoDialog.tsx`. Nenhum botão abre um WhatsApp real — mostra a mensagem que seria enviada e oferece o contato da Madolio. `Contato.tsx` monta a mensagem a partir do nome, procedimento escolhido num `<select>` e preferência de horário opcional.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card (sem `og:image` — não existe imagem gerada pra este conceito, mesmo padrão da Estufa/Fornada) e JSON-LD `MedicalClinic`. `public/robots.txt` e `public/sitemap.xml` existem.

## Acessibilidade

Um único `<h1>` real (no Hero). `SkinLayerDiagram` usa `role="img"` com `<title>` descrevendo a camada destacada; o slider de dias tem `aria-label`. Foco visível (`:focus-visible`) em todo elemento interativo. Todo o movimento (Reveal em scroll) respeita `prefers-reduced-motion: reduce` — sem exceção, incluindo a regra global no fim de `index.css` que zera durações de animação/transição.

## Paleta e não-colisão

`--color-noturno` #16262c (tinta azul-esverdeada escura, fundo/texto de seções escuras), `--color-papel` #f7f4ee (papel claro, fundo principal), `--color-linha` #ddd2c1 (borda sobre o papel), `--color-clinico` #2c6e6a (verde-azulado clínico, acento primário/CTA) + `--color-clinico-hover` #23524f, `--color-derme` #c17557 (tom quente, camada derme no diagrama e acento secundário) + `--color-derme-hover` #a25f45, `--color-epiderme` #e8c9a8 (camada epiderme no diagrama), `--color-hipoderme` #f4e6ce (camada hipoderme no diagrama), `--color-alerta` #ab4a30 (fase de reação/vermelhidão na linha do tempo).

Conferido com `grep -rh -- '--color-' */src/index.css` contra os ~33 projetos irmãos antes de fechar: nenhum desses 9 hexadecimais exatos aparece em nenhum outro projeto do repositório. Diferenciação explícita do `realce/` (vizinho de nicho mais próximo): a paleta dele é dourado quente sobre preto/branco (`#c59d5f`, `#000000`, `#ffffff`) — mecânica de camarim de teatro para salão de beleza. A Cútis usa verde-azulado clínico sobre papel neutro, sem dourado, sem preto puro, e a camada de acento quente (`#c17557`) existe só porque é literalmente a cor de tecido dérmico no diagrama, não decoração de marca.

## Tipografia e não-colisão

**Newsreader** (display serial, usado em títulos — registro editorial/clínico, não script decorativo) + **Figtree** (corpo, sans neutro e legível) + **Overpass Mono** (`--font-dado`, só pra dado clínico real: dia, camada, protocolo, duração — nunca decorativo). Conferido com `grep -rhoE "family=[A-Za-z0-9+]+" */index.html` contra todos os irmãos: nenhuma das três fontes aparece em nenhum outro projeto do repositório, então o trio como combinação também é inédito.

## FAQ e depoimentos

`Faq.tsx` (`#duvidas`) e `Depoimentos.tsx` (`#depoimentos`), inseridos em `Home.tsx` depois de `Metodo` e antes de `Contato`. Acordeão acessível: `<button aria-expanded aria-controls>` + `<div role="region">`, operável por teclado, sem animação (`Reveal` já respeita `prefers-reduced-motion`). As 6 perguntas do FAQ cobrem as dúvidas reais de pré-compra do nicho (indicação médica, afastamento/downtime, número de sessões, consulta prévia obrigatória, forma de pagamento/convênio, idade mínima), sem prometer resultado específico nem substituir avaliação clínica. Os 3 depoimentos (`Depoimentos.tsx`) são fictícios, nome + inicial do sobrenome, cada um amarrado a um procedimento e marco real da linha do tempo de recuperação já documentada em `data/procedimentos.ts` (casquinha do peeling médio no dia 3, vermelhidão do microagulhamento no dia 1, atraso de efeito da toxina), pra manter o mesmo registro clínico-documentado do resto do site em vez de elogio genérico. Estilizados só com os tokens já existentes (`clinico`, `derme`, `noturno`, `papel`, `linha`, `dado-clinico`), sem mexer em `index.css`.

## Decisões

- Owner fictícia: **Dra. Marina Petrucci**, dermatologista, CRM-PR 34981 · RQE 28104, formada pela UFPR, consultório próprio em Curitiba há 11 anos. Curitiba escolhida por ser polo real relevante de dermatologia clínica no Sul do Brasil, sem repetir a cidade de nenhum projeto irmão já lido.
- 6 procedimentos em vez de um catálogo maior: mesmo princípio de profundidade real por item (dado clínico específico, não genérico) já usado em Estufa Cheia (6 espécies com ficha botânica real) — quantidade menor, cada um com mecanismo de camada e linha do tempo verificáveis, importava mais que uma lista longa e rasa.
- Layout do diagrama de pele: o SVG usa margem esquerda maior (`x=110`+ pros retângulos, rótulo em `x=100`) depois que a primeira versão cortava o texto do rótulo ("Derme papilar" virava "rme papilar") por falta de espaço no viewBox — pego em screenshot durante a verificação, corrigido antes de fechar.
- Passe de humanização: título/meta description/OG e a prosa de `Hero.tsx`, `Procedimentos.tsx`, `Metodo.tsx`, `Footer.tsx` e `data/procedimentos.ts` foram revisados pra remover traves-travessão usadas como conector genérico (trocadas por ponto, vírgula ou dois-pontos conforme a relação real entre as frases) e contrastes do tipo "não é X, é Y" que só adicionavam peso sem informação nova — mantido só onde a distinção clínica é real (ex.: toxina botulínica age no músculo, não na pele; isso é fato, não retórica).
