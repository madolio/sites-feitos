# Calibre (conceito)

Site-conceito da Madolio pro nicho de relojoaria artesanal. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + React Three Fiber. Página única, com rolagem (diferente do Torno, que é uma ferramenta de tela única).

## Reformulação — avaliado e deixado como está (quase todo)

Pedido do usuário: reformular no mesmo nível de ousadia da Realce (efeitos, responsividade, "tudo fluindo"), aplicado aos 7 conceitos de uma leva. Avaliação honesta pro Calibre: **este projeto já excede esse nível** — 3D real com física simulada (corda que descarrega sozinha, balanço oscilando), textura procedural, único gesto de interação (girar a coroa) documentado e testado. Adicionar mais efeitos por cima seria acúmulo, não melhoria.

Único ajuste: `Catalogo.tsx` ganhou hover consistente com o resto da leva (anel de latão + leve elevação no card ao passar o mouse) — puramente cosmético, não competiu com o "único movimento não pedido" da cena 3D nem com o gesto da coroa. Verificado responsivo em mobile (canvas 3D redimensiona corretamente, zero overflow, zero erro de console).

## Deploy (Cloudflare Workers)

Worker `calibre`, em `https://calibre.fenoninho-max.workers.dev`. `npm run deploy`. Tem `.npmrc` com `legacy-peer-deps=true` (senão o `npm install` quebra nos peers opcionais de Expo do React Three Fiber — mesmo problema do Torno/Cardume).

## A cena: um calibre de verdade em 3D

`src/cena/Vitrine.tsx` é a cena inteira: placa-mãe, barril da mola real, três engrenagens (centro/terça/escape) e o volante de balanço — todas geradas por coordenadas em `geometria.ts`, não modeladas em outro programa. `criarEngrenagem()` é a função que faz o trabalho pesado: um disco com dentes alternando raio cheio/raio menor vira, com parâmetros diferentes, tanto as três engrenagens quanto a coroa de corda (`Coroa.tsx` é HTML/CSS, não 3D — só a ideia de "dente fino e curto" é compartilhada conceitualmente).

`texturas.ts` gera o acabamento **Côtes de Genève** (as listras onduladas de relojoaria fina de verdade, não um metal escovado genérico) pra placa-mãe, e as estrias em espiral do barril, ambos via canvas 2D — mesma técnica das texturas do Torno.

## O único movimento não pedido

Ao entrar na página, as peças (que nascem explodidas, flutuando bem separadas) se juntam sozinhas numa animação GSAP de 2,4s (`Hero.tsx`) — o único movimento automático da cena. `prefers-reduced-motion` pula direto pro estado montado.

## O gesto: girar a coroa

Depois de montado, a interação principal é girar a coroa (`Coroa.tsx`) — não arrastar em linha reta, o ângulo do ponteiro em volta do centro do botão vira energia (`estado.ts`, `corda.energia`). Mais corda = volante de balanço oscila mais rápido e as engrenagens giram mais rápido; a energia drena sozinha e devagar, nunca chega a zero (mesma lógica de "nunca deixa a cena parada" do resto do portfólio 3D). `ReservaMarcha.tsx` lê `corda.energia` direto no DOM a cada quadro via `requestAnimationFrame`, sem passar por estado React — mesmo padrão do `Termometro` do Torno.

## Sequência real → numeração

`Processo.tsx` numera as seis etapas de fabricação (escolha do calibre → desenho do mostrador → acabamento → montagem/regulagem → caixa → entrega) porque são, de fato, sempre nessa ordem.

## Catálogo sem foto

`Mostrador.tsx` desenha o mostrador de cada modelo em SVG — ponteiros sempre parados às 10h09 (a pose clássica de fotografia de relojoaria), com sub-mostradores de cronógrafo opcionais. Nenhuma foto de relógio no site inteiro, mesmo espírito do Encaixe (desenho técnico em vez de foto), aplicado a outro ofício.

## Referência visual

Paleta: `--color-void` #120d08 (fundo, quase preto mas com calor — não o preto/verde-ácido genérico), `--color-brass` #caa25e (latão — cor de metal de verdade, não um "accent" arbitrário), `--color-steel` #3a5a72 (aço azulado, reservado só pro volante de balanço — o mesmo "blued steel" que relojoaria fina usa em ponteiros e parafusos). Fontes: **Cormorant Garamond** (títulos, evoca a tipografia gravada num mostrador) + **Sora** (interface) — combinação não usada em nenhum outro projeto do repositório.

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.
