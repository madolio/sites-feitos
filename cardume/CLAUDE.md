# Cardume (conceito)

Site-conceito da Madolio pro nicho de escola de mergulho. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + three.js (React Three Fiber, shaders próprios). Página única.

Feito a partir do pedido "fuja de tudo que já fez, coloque efeitos visuais, 3D, se exalte" — ver também Torno, feito junto.

## Deploy (Cloudflare Workers)

Worker `cardume`, em `https://cardume.fenoninho-max.workers.dev`. `npm run deploy`.

`.npmrc` com `legacy-peer-deps=true` (mesmo motivo do Torno: sem ele o npm tenta resolver os peers opcionais de Expo do React Three Fiber e quebra).

## O esqueleto — rolar é descer

A página tem 10 telas de altura (`TELAS` em Pranchetas.tsx) e **nenhuma seção**: o scroll inteiro vira profundidade, de 0 a 40 m, num oceano 3D fixo atrás de tudo (`cena/Oceano.tsx`). No lugar de nav, uma **régua de profundidade** (`Profundimetro.tsx`) com os cursos como marcas clicáveis; no lugar de hero, a superfície vista de baixo. Cada curso é uma prancheta de mergulho pendurada **na profundidade máxima que ele libera** (Batismo 12 m, Open Water 18 m, Advanced 30 m, Deep Diver 40 m, que mora no bloco do fundo junto do formulário).

- `naProfundidade(d)`: posiciona um bloco pra que ele fique centralizado na tela exatamente quando o scroll pede `d` metros.
- **Motor** (`useMotor` em App.tsx): rAF que converte scroll em profundidade com inércia (`atual` persegue `alvo` com decaimento exponencial — a água "freia"), mede a velocidade vertical e acompanha o ponteiro. Tudo em `estado.ts`, mutável e fora do React.
- **Computador de mergulho** (`Visor.tsx`): profundidade, temperatura (termoclina 10–20 m), NDL interpolado de tabela recreativa, e situação — incluindo **"suba devagar"** piscando se a pessoa rolar pra cima rápido demais. Escreve direto no DOM por rAF.
- **"Voltar à superfície"** (`Fundo.tsx`): sobe rolando a página com GSAP, **para 3 s aos 5 m** (parada de segurança, o visor conta "3 min" 60× mais rápido) e só então termina. Qualquer wheel/touch/tecla devolve o controle. Durante a subida automática o alerta de velocidade fica desligado (`mergulho.automatico`).

## A cena (`cena/Oceano.tsx` + `cena/shaders.ts`)

Câmera sempre em x≈0, z=6 olhando pro −z; só a altura muda (1 unidade = 1 m, superfície em y=0). A câmera sobe e desce levemente no ritmo da respiração (ciclo de 4,2 s) e as bolhas saem na expiração.

- **Cor da água + névoa** por profundidade (`cores.ts` / `cena/agua.ts`): o vermelho some primeiro, depois só sobra azul, depois nem ele. `FogExp2` com densidade crescente.
- **Superfície vista de baixo**: shader com cáusticas + "janela de Snell" (bem mais clara logo acima de você).
- **Cáusticas**: bordas de células de Voronoi animadas (F2 − F1 perto de zero), em duas escalas girando em sentidos opostos. Escritas do zero — os shaders de cáustica populares do Shadertoy têm licença padrão não comercial.
- **Raios de sol**: planos aditivos em billboard (só no eixo Y), somem até ~24 m.
- **Neve marinha**: volume infinito — as partículas dão a volta em torno da altura da câmera.
- **Bolhas**: pool de 160 na CPU; o raio cresce na subida pela **lei de Boyle** (∝ raiz cúbica da razão de pressões).
- **Cardume**: boids simplificado em `InstancedMesh` (140 no desktop, 80 no celular) — cada peixe persegue um ponto de uma "ciranda" em volta do centro do cardume, se afasta dos vizinhos muito próximos e **foge do cursor** (raio do ponteiro contra o plano do cardume).
- **Platô de areia a 14 m** com cáusticas finas, **paredão** até o fundo, **fundo a 43 m** com pedras e um **naufrágio** (caixa deformada: proa afinando, fundo arredondado, adernado).
- **Lanterna**: abaixo de ~24 m a luz do sol some e o cursor vira um `SpotLight` saindo da "mão" + um cone aditivo pro facho. **Garoupas** grandes circulam entre 28 e 37 m — escuro demais pra vê-las sem a lanterna, de propósito.

## Gotchas

- **`flat` no Canvas (sem tone mapping)**: com ACES, a névoa dos objetos saía mais clara que a cor de fundo (que não passa pelo tone mapping) e marcava uma linha dura no horizonte.
- **Facho da lanterna**: quem segura a lanterna olha de dentro do cone, quase na ponta — dali a parede do cone é toda vista de raspão. O brilho do shader vem do ângulo **rasante** (1 − |n·v|); com o ângulo de frente (o intuitivo) o facho ficava invisível.
- **Neve marinha**: sem teto no `gl_PointSize`, um floco passando colado na câmera virava um borrão do tamanho da tela.
- **Peixes metálicos sem mapa de ambiente refletem escuridão** — viravam silhuetas pretas. Pouco metal + um emissivo azul-petróleo fraco.
- **Fundo CSS `--agua`**: só aparece antes do 3D carregar (ou sem WebGL). Mexer numa variável do `:root` recalcula o estilo da página inteira, então o motor só atualiza a cada 0,25 m.
- **Nada de `backdrop-filter`** nas pranchetas (placa sólida semiopaca) — desfoque sobre um canvas que muda todo quadro custa caro no celular.
- `cores.ts` não importa three.js de propósito: entra no bundle principal. A cena (chunk separado, ~245 kB gzip) usa `cena/agua.ts`.
- Syne no peso 800 é larguíssima: no celular o título precisa ser bem menor pra caber (era o overflow horizontal).
- Teste headless: WebGL por SwiftShader roda a poucos fps — pra capturar uma profundidade, rolar e **esperar o visor** chegar perto do alvo (a profundidade é suavizada).

## Referência visual

Paleta: rampa da água de `#8fdde3` (superfície) a `#04121f` (40 m); `--color-casco` #06283d (texto da superfície, só onde a água é clara); `--color-placa` #051a2a (pranchetas, visor, régua — sempre escuro, legível em qualquer profundidade); `--color-espuma` #eaf6f7 (texto); `--color-lanterna` #ffe2a1 (números do visor e ações — a cor da luz da lanterna). Fontes: **Syne** (títulos e texto — larga, com cara de pôster náutico) + **Martian Mono** (visor e rótulos de profundidade — é um computador de mergulho, é mono de verdade) — nenhuma das duas usada em outro projeto do repositório.
