# Auditoria visual do portfólio — 22/09/2026

Diagnóstico dos 45 projetos a partir de **screenshot renderizado das páginas no ar**
(Playwright), não de leitura de código. Nenhum projeto foi alterado nesta auditoria.

Como reproduzir: ver [Scripts](#scripts) no fim do documento.

## Método e limitações

- 135 capturas: hero desktop (1280×800), página inteira desktop e página inteira
  mobile (375px) de cada projeto.
- Métricas objetivas coletadas junto: overflow horizontal, erros de página, altura
  da página e tempo de load.

**Falhas técnicas registradas:**

- `marcha` e `doce-atelie` — screenshot de página inteira estourou o timeout de 30s;
  recapturados por fatias de viewport empilhadas. O estouro em si já indica peso.
- `tinta` e `torno` — só o primeiro quadro foi capturado: a experiência é
  horizontal/tela-cheia, não vertical.

**Armadilha metodológica importante (vale para as próximas auditorias):** rolar a
página rápido demais (90 ms por passo) não dá tempo dos reveals por scroll
dispararem, e a captura de página inteira sai com buracos enormes. Isso produziu
falsos diagnósticos de "página quebrada" em adriano, arcada, prisma, realce, trilha,
rota e estufa. Todos foram reverificados com rolagem em velocidade humana (320 ms por
passo) + medição da opacidade computada: **todos renderizam completos**.

Caso especial: `estudio-alma` parecia ter 2.000px de vazio mesmo com rolagem lenta.
É uma **seção pinada por scroll** — o boneco executa as 6 poses enquanto a tela fica
fixa; a "altura extra" é a pista de rolagem da animação, que numa captura de página
inteira aparece como vazio. Funciona corretamente.

## Classificação

### A — não mexer (7)

| Projeto | Por quê |
|---|---|
| bruma | Único verde-esmeralda escuro; hero em shader; catálogo vende informação real |
| doce-atelie | Cartela Pantone de recheios + construtor de bolo em 4 passos |
| lumen | Catálogo desenha o cone de luz real por ângulo e Kelvin |
| luthier | Corda vibrando ao vivo, figura de Chladni, fórmula de Mersenne |
| pulso | Metáfora de pista aplicada em todas as seções |
| torno | Cena 3D com stepper moldar → esmaltar → queimar |
| estudio-alma | Seção pinada com o boneco Bauhaus executando as 6 poses |

### B — refinamento leve (26)

adriano, arcada, calibre, cerne, chave, confete, corte, derme, encaixe, esmalte,
ferro, focinho, fornada, ninho, passaporte, prisma, razao, realce, revelar,
sabor-da-vila, site-template, taca, tinta, torre, trama, trinco

Padrão dominante: **o topo é bom, o rodapé é genérico**. Quase todos terminam com
"3 depoimentos + FAQ accordion + formulário escuro".

### C — evolução recomendada (11)

| Projeto | Motivo objetivo |
|---|---|
| ancora | Exemplar mais puro do esqueleto genérico de hero |
| cardume | 8000px com vãos de 600–900px vazios; página oca |
| escuta | Nenhum dispositivo visual próprio; paleta lavada; avatar placeholder |
| estufa | 22,4s de load — 7+ fotos grandes sem otimização |
| marcha | Fotos de banco de imagem incoerentes entre si |
| pelagem | Molde puro em verde-menta lavado; guia de pelagem mal apresentado |
| rota | 2042px — não diz preço, integração, segurança nem para quem é |
| torque | Tem mecanismo próprio, mas o resto é a pilha padrão |
| traco | 6 projetos = 6 retângulos idênticos; arquitetura sem uma foto de obra |
| trilha | Hero é o molde na forma mais literal do portfólio |
| vazao | Praticamente o mesmo site que trinco com outra paleta |

### D — intervenção importante (1)

| Projeto | Motivo |
|---|---|
| balcao | **Não tem hero.** Abre em abas + 3 cards. 1551px no total, ícones no lugar de foto de comida, botão "+" sem carrinho visível |

## Problemas objetivos

### Responsividade

**Único overflow do portfólio** (os outros 44 medem 0):

- `sabor-da-vila` — 109px de overflow horizontal (scrollWidth 484 vs. 375).
  Culpado isolado: `span.riso-type.text-6xl` com 461px de largura.

Composição no mobile:

- `torno` — painel cobre ~45% da cena; "3 Queimar" cortado
- `torre` — tabela de planos vaza; só "Solo" cabe
- `rota` — tabela de entregas corta colunas Bairro e ETA
- `site-template` — hero não colapsa; título afunila em 6 linhas
- `doce-atelie` — header sticky cobre conteúdo
- `cerne` — botão flutuante de WhatsApp cobre o título "Cozinha"
- `balcao` — fila de abas transborda, "Combos" cortado
- `torque`, `trinco`, `vazao` — cabeçalho quebra em 2 linhas colado ao CTA

### Performance

| Projeto | Load | Causa provável |
|---|---|---|
| estufa | 22.411ms | 7+ fotos grandes sem otimização/lazy-load |
| luthier | 6.737ms | Custo das simulações de acústica |
| sabor-da-vila | 6.594ms | — |
| marcha | 5.442ms | Fotos pesadas; estourou screenshot de página inteira |
| doce-atelie | 3.807ms | Estourou screenshot de página inteira |

Nenhum projeto apresentou erro de JavaScript ou console em produção.

## Previews do portfólio

Mecanismo: JPG estático em `madolio/public/previews/<slug>.jpg`, servido por
`HeroPreview.tsx`. A home usa iframe ao vivo; a página `/projetos` usa foto estática.

**Confirmados defasados** (comparação visual lado a lado): ancora (preview sem a
barra lateral), revelar, pelagem, fornada (previews sem as fotos do hero), trama,
ninho (paletas mudaram), vazao (sem o widget de escala).

**Confirmados atuais:** prisma, bruma, trinco, sabor-da-vila.

**Suspeitos, não confirmados visualmente:** doce-atelie, escuta, adriano, ferro,
realce, estufa, chave, esmalte, pulso, marcha, torre, confete.

**Limitação estrutural:** o preview só mostra o hero. Mudanças no miolo — a cena do
cilindro do trinco, a seção de ambiente da escuta, a cena de perfumaria da bruma —
nunca aparecem no card, mesmo com o preview regerado.

## Padrões repetidos

1. **O rodapé duplo, o mais repetido do portfólio.** "3 depoimentos em cards + FAQ
   accordion de linhas finas + formulário escuro com select e WhatsApp" — em mais de
   20 projetos. Mais repetido que o próprio hero.
2. **O esqueleto de hero.** Rótulo em versalete + título + parágrafo + botão
   preenchido + botão vazado + cartão com borda à direita: ancora, razao, torque,
   trilha, vazao, traco, pelagem, ferro, derme, adriano, revelar, marcha.
3. **Fundo creme com texto escuro** em ~20 projetos. As paletas foram diferenciadas
   numa rodada anterior, mas só nos acentos, que ocupam poucos pixels.
4. **Pares quase idênticos:** trinco ↔ vazao (o mais grave — mesmo hero, mesmo bloco
   de 4 serviços, mesmo título literal de depoimentos, só muda a paleta),
   razao ↔ site-template, derme ↔ escuta, traco ↔ trilha, pelagem ↔ focinho.
5. **Copy copiada literalmente:** "Relatos ilustrativos, não copiados de lugar
   nenhum" aparece igual em ninho, pelagem, trinco e vazao.

## Oportunidades de experiência de processo

Já resolvido (não duplicar): adriano, prisma, bruma, trinco, torno, estudio-alma,
doce-atelie, encaixe, esmalte, lumen, luthier, pulso, derme, cerne, trama, arcada,
site-template.

| Projeto | Ideia própria do negócio |
|---|---|
| balcao | Montar o lanche: pão → carne na chapa → queijo, preço e tempo subindo |
| ancora | Aporte mensal se dividindo ao vivo em renda fixa/fundos/ações |
| cardume | A luz perdendo o vermelho aos 15m, depois o laranja |
| traco | Planta se construindo: terreno → paredes → axonometria levantando |
| trilha | Percurso traçado sobre as curvas de nível, amplitude abrindo em graus |
| vazao | Corte de sifão entupindo até a água parar, depois a vazão voltando |
| torque | Escoamento do óleo: cárter esvaziando, filtro trocado, óleo limpo |
| razao | Documento → apuração → guia emitida → carimbo pago |
| fornada | Linha do tempo de fermentação 24h, pão escurecendo até a crosta |
| estufa | Régua de florescimento jan→dez cruzando com sol/meia-sombra |
| revelar | Quadro em negativo de câmara escura revelando até a foto final |
| realce | Espelho antes/depois com as lâmpadas acendendo em sequência |
| taca | Altitude 980m → 1260m como eixo: uva, prensa, inox, carvalho |
| marcha | Curva de aceleração 0–100 comparando unidades, usando os cv das fichas |
| rota | Rota manual vs. otimizada, ETA caindo de 19 para 8 min |
| ferro | Barra olímpica ganhando anilhas conforme o peso muda |
| focinho | Carteirinha de vacinação carimbando conforme a idade é arrastada |
| ninho | Régua de marcos: sustentar a cabeça → engatinhar → primeiros passos |
| passaporte | Selo do nível batendo na página ao fazer o teste |
| pelagem | Corte transversal do pelo, subpelo saindo no de-shedding |
| confete | Mesa da festa se montando por camadas com o preço subindo |
| corte | Senha avançando: Nº 38 chamado → você é o 39 |
| escuta | Ficha de registro de pensamento preenchendo progressivamente |
| chave | Classificado se desdobrando em ficha + carimbo VENDIDO |
| sabor-da-vila | Smash prensada na chapa em halftone, camadas empilhando |
| tinta | Traço fine line sendo desenhado conforme o arrasto horizontal |
| torre | Pedidos entrando no radar e se encaixando na grade de horários |
| calibre | Relógio explodido em vista isométrica remontando peça a peça |

## Sugestão de próximo lote

`balcao` (único D), `sabor-da-vila` (único bug objetivo de layout), `estufa` (22s de
load) e o par `trinco`/`vazao` (a duplicação mais evidente). Os demais C são
melhorias de direção de arte, não correções.

## Scripts

Em `madolio/scripts/` (rodar de dentro de `madolio/`, que é onde o Playwright está
instalado):

```bash
# captura em lote: hero, pagina inteira e mobile + metricas objetivas
node scripts/auditoria-lote.cjs ./auditoria adriano ancora arcada ...

# folhas de contato 3x3 pra comparar heros lado a lado
node scripts/folha-contato.cjs ./auditoria hero

# diff de pixels entre preview commitado e pagina no ar
node scripts/comparar-previews.cjs ./auditoria

# comparacao visual preview x atual, empilhada
node scripts/comparar-lado-a-lado.cjs ./auditoria ancora revelar pelagem
```

Pré-requisito numa máquina nova: `npm install` em `madolio/` e
`npx playwright install chromium`.
