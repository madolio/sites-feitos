# Torque Auto Mecânica (conceito)

Site-conceito da Madolio pro nicho de **oficina mecânica** (mecânica geral de
carro de passeio, o oposto do luxo/colecionador). **Negócio fictício** — não
existe. Vite + React 19 + TypeScript + Tailwind v4 + `Reveal.tsx` (GSAP via
IntersectionObserver, copiado do `arcada`, sem ScrollTrigger). Página única.

Nicho pedido explicitamente pelo dono da agência por ser "fácil de vender":
todo mundo sabe o que é uma oficina mecânica, ao contrário de nichos mais
avant-garde/de luxo do resto do repositório.

## Deploy (Cloudflare Workers)

Worker `torque`, em `https://torque.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe Discovery

- **Colisão:** oficina mecânica × painel de revisão por quilometragem. Em
  vez de um formulário de orçamento genérico, o site mostra um odômetro
  interativo: o visitante arrasta a quilometragem do próprio carro e vê, item
  por item, o que já está em dia, perto do prazo ou vencido, usando o
  intervalo de manutenção real daquele item (óleo a cada 10.000 km, correia
  dentada a cada 60.000 km etc.). É a mesma lógica que uma oficina de verdade
  usa pra montar uma revisão, só que o cliente mexe nela antes de aparecer.
- **Nunca parecer:** o `marcha` (concessionária de esportivos/muscle cars),
  vizinho mais próximo por nicho. O `marcha` usa foto real de carro,
  paleta preto + vermelho vívido, registro de luxo/colecionador e público de
  quem compra carro de exposição. O `torque` não usa foto nenhuma (mesma
  convenção "nunca foto" do resto do repositório, com a exceção do `marcha` e
  do `estufa`), paleta de aço + amarelo de sinalização de oficina sobre papel
  cru, registro de bairro/dia a dia e público de quem só quer o carro andando
  direito. Mecânica diferente também: lá é uma calculadora de financiamento
  (fórmula de amortização Price); aqui é um painel de status por item de
  manutenção, e o dado real que ele usa é intervalo de km, não juros.

## O wildcard: painel de revisão por quilometragem, não formulário de orçamento

`PainelRevisao.tsx` + `data/servicos.ts`: um `<input type="range">` de 0 a
100.000 km (passo de 1.000) representa o odômetro do carro do visitante.
Movê-lo recalcula o status de 8 itens reais de manutenção automotiva
(óleo e filtro, filtro de ar, filtro de cabine, velas de ignição, pastilhas
de freio, fluido de freio, correia dentada, fluido de arrefecimento), cada um
com sua própria faixa de intervalo (`kmMin`–`kmMax`) baseada nos intervalos
típicos citados em manual de proprietário e tabela de revisão de oficina no
Brasil:

- Óleo e filtro: 10.000 km (ou 12 meses).
- Filtro de ar / filtro de cabine: 10.000–15.000 km.
- Velas de ignição comuns: 20.000–40.000 km.
- Pastilhas de freio: 20.000–40.000 km (varia com o uso).
- Fluido de freio: 20.000 km ou 2 anos (absorve umidade com o tempo).
- Correia dentada: 60.000 km (item crítico: rompeu, motor pode fundir).
- Fluido de arrefecimento: 40.000–60.000 km.

O cálculo (`statusItem` em `data/servicos.ts`) usa `km % kmMin` pra achar
quanto foi rodado desde a última troca esperada naquele ciclo, e classifica
em `em-dia` (< 70% do intervalo), `proximo` (70–90%) ou `vencido` (≥ 90%).
É uma simplificação assumida e documentada como tal, tanto no código quanto
na nota de rodapé do painel: pressupõe que cada item foi trocado em dia no
ciclo anterior, então é referência de planejamento, não diagnóstico real (a
checagem de verdade é feita na oficina).

## Modo demonstração

Igual a Trilha/Estufa/Bruma/Fornada: `demo.ts` + `DemoDialog.tsx`. Nenhum
botão abre um WhatsApp real, mostra a mensagem que seria enviada e oferece o
contato da Madolio. `Contato.tsx` monta a mensagem a partir do serviço
escolhido num `<select>` e nome opcional.

## SEO

`index.html` tem meta description, canonical, Open Graph e Twitter card (sem
`og:image`, mesmo padrão de Estufa/Fornada/Trilha) e JSON-LD `AutoRepair`.
`public/robots.txt` e `public/sitemap.xml` existem.

## Acessibilidade

Um único `<h1>` real (no Hero). O slider do painel tem `aria-label`
explicando que é uma simulação, e o `<label>` visível descreve o campo. Foco
visível (`:focus-visible`) em todo elemento interativo, com contorno na cor
`--color-sinal`. Todo o movimento (`Reveal` em scroll) respeita
`prefers-reduced-motion: reduce`, com a regra global no fim de `index.css`
que zera durações de animação/transição, sem exceção; nenhum conteúdo
depende de animação pra aparecer.

## Paleta e não-colisão

`--color-chumbo` #2c3236 (aço escurecido, fundo escuro e texto principal),
`--color-oficina` #f4f0e4 (parede clara de galpão, fundo principal),
`--color-oficina-forte` #e7ddc7 (cartão sobre o fundo claro),
`--color-linha` #d9cfb3 (borda), `--color-aco` #46606d (azul-aço, acento
primário/dado técnico) + `--color-aco-hover` #384e59, `--color-sinal`
#e8961f (amarelo de sinalização de oficina, CTA) + `--color-sinal-hover`
#c67d15, `--color-alerta` #c1432a (item vencido no painel), `--color-ok`
#4f7a3d (item em dia no painel).

Conferido com `grep -rh -- '--color-' */src/index.css` contra os ~36
projetos irmãos antes de fechar a paleta: nenhum desses 10 hexadecimais
exatos aparece em nenhum outro projeto do repositório.

Diferenciação explícita:
- **vs. `marcha`** (`--color-preto` #0b0b0c, `--color-acento` #ff3b30): o
  marcha é preto puro + vermelho vívido de esportivo. O torque nunca usa
  preto puro nem vermelho como cor de marca (o `--color-alerta` #c1432a
  existe só como status "vencido" dentro do painel, nunca como acento
  geral), e a base é papel cru + azul-aço, não carvão + garagem de luxo.
- **vs. `ferro`** (`--color-preto` #0a0a0a, `--color-branco` #f5f5f3,
  `--color-lima` #c6ff3d): ferro é preto + branco + verde-limão industrial
  de academia. O torque não usa preto puro nem lima; o amarelo de
  sinalização (`--color-sinal`) é mais próximo de faixa de zebra de piso de
  oficina do que de academia old-school.

Fontes: **Oswald** (display, condensada e industrial, o tipo de fonte usada
em placa e fachada de oficina) + **Rubik** (corpo, geométrica e legível) +
**DM Mono** (`--font-dado`, só pra dado técnico real: km, intervalo, status,
nunca decorativo). Conferido com `grep -rhoE "family=[^&\"]+" */index.html`
contra todos os irmãos: nenhuma das três aparece em nenhum outro projeto do
repositório (nem em `marcha`: Space Grotesk + Inter + IBM Plex Mono; nem em
`ferro`: Space Grotesk + Archivo), então o trio como combinação também é
inédito.

## FAQ e depoimentos (adição, não redesign)

O dono da agência apontou o site de uma psicóloga (referência externa, real,
com conversão comprovada) como exemplo de padrões estruturais que faltavam
nas construções recentes: CTA de WhatsApp repetido, FAQ respondendo a
ansiedade real de pré-compra, e prova social. O `torque` não tinha nem FAQ
nem depoimentos, então os dois foram adicionados sem tocar em Hero,
PainelRevisao, Especialidades ou paleta.

`Faq.tsx` + `data/faq.ts`: acordeão acessível de verdade, `<button
aria-expanded aria-controls>` por pergunta controlando um `<div role="region"
hidden>`, navegável por teclado, sem `<details>`. Perguntas são as dúvidas
reais de quem nunca foi na oficina: agendamento, orçamento por escrito antes
de qualquer serviço, se guardam a peça trocada, garantia de peça/mão de
obra, quais marcas atendem, formas de pagamento. Respostas inventam
política concreta e consistente com o resto do site (ex.: 90 dias de
garantia na mão de obra), já que é negócio fictício.

`Depoimentos.tsx` + `data/depoimentos.ts`: 3 depoimentos curtos, nome +
inicial do sobrenome (Marina T., Roberto S., Camila A.) pra deixar claro que
é conceito de portfólio, não review raspada de verdade. Em vez do padrão
card-com-estrelas da referência, o layout usa o vocabulário de ficha/ticket
já estabelecido pelo painel: rótulo de serviço em `dado-oficina`, citação,
nome como se fosse assinatura de baixo de uma ficha de saída.

Ambos entram em `Home.tsx` depois de Especialidades e antes de Contato,
posição padrão de prova social + objeções logo antes do CTA final.

## Header quebrando em 2 linhas no mobile (set/2026)

A auditoria apontou `torque · trinco · vazao` com o mesmo defeito: o nome completo da marca (`Torque Auto Mecânica`) ao lado do link "Painel de revisão" e do botão "Agendar horário", tudo numa única linha flex sem quebra controlada, forçava o nome a virar 2 linhas coladas no CTA. Corrigido em `Header.tsx`: "Auto Mecânica" (`<span className="hidden sm:inline">`) só aparece a partir de `sm`, e o link "Painel de revisão" — que já escondia "Serviços" no mobile mas não a si mesmo — ganhou o mesmo tratamento. Mobile agora mostra só "TORQUE" + o botão "Agendar horário", numa linha só; nada mudou a partir de `sm`. Vazão tinha o mesmo problema (resolvido do mesmo jeito, ver seu `CLAUDE.md`); Trinco já estava correto.

## Decisões

- Owner fictício: **Cláudio Teixeira**, mecânico formado pelo SENAI-SP, 22
  anos de oficina, em Sorocaba, SP, polo industrial real do interior
  paulista, coerente com o registro "oficina de bairro" pedido pelo Vibe
  Discovery.
- 8 itens de manutenção no painel (não mais) porque é o conjunto real e
  reconhecível de itens que qualquer manual de proprietário brasileiro lista
  como revisão programada: inventar um nono item genérico só pra parecer
  mais completo quebraria a precisão que o painel se propõe a ter.
  Assumidamente não inclui todo item possível de uma revisão completa
  (correia auxiliar, amortecedor, bateria etc.), porque o objetivo é mostrar
  o mecanismo com dado real, não esgotar o catálogo.
- A classificação em-dia/próximo/vencido usa o menor valor de cada faixa
  (`kmMin`) como referência, documentado como decisão conservadora tanto no
  código (`data/servicos.ts`) quanto na nota de rodapé do painel.
- Passe de humanização: `Hero.tsx`, `PainelRevisao.tsx`, `Home.tsx` e
  `data/servicos.ts` foram revisados pra trocar travessão usado como
  conector genérico por vírgula, dois-pontos ou ponto, conforme a relação
  real entre as frases.
