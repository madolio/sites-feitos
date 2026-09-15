# Corte (conceito)

Site-conceito da Madolio pro nicho de salão de beleza/barbearia. **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Um dos 6 conceitos com estilo E estrutura próprios — ver também Pulso, Focinho, Chave, Revelar, Passaporte.

## Deploy (Cloudflare Workers)

Worker `corte`, em `https://corte.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Senha"

- **Lugar/objeto:** o painel de senha de atendimento de padaria/farmácia ("agora atendendo Nº 042").
- **Colisão:** salão/barbearia × painel de senha de atendimento.
- **Nunca parecer:** salão elegante com espelho dourado e serifada fina.
- **Wildcard:** `TicketStub.tsx` no Hero — um talão de senha com furos de picote nas laterais, mostrando a próxima senha disponível.

## Reformulação — nível de ousadia da Realce

Pedido do usuário: reformular no mesmo nível de inovação da Realce & Cia (efeitos, responsividade, "tudo fluindo"), mantendo nicho e nome.

- **`TicketStub.tsx` deixou de ser só decorativo** — ganhou o botão "Puxar senha": cada clique incrementa o número e a nota reaparece com uma animação de "papel saindo da máquina" (`.ticket-dispensar` em index.css, troca de `key` remonta o elemento e replay a animação).
- **`Agendar.tsx` calcula espera estimada de verdade** — ao escolher um serviço, aparece "Sua senha seria a Nº X, ~Y min de espera", calculado a partir da duração real do serviço (`servicos[].minutos`) × pessoas fictícias na frente. A mensagem de WhatsApp já sai com esse número escrito.

## Reformulação 2 — paleta de barbearia clássica

Feedback direto: "quero algo mais como barbeiro normal mesmo, curti a ideia da senha, mas vai nas cores de barbeiro, aqueles detalhes azuis branco e vermelho". O esqueleto (painel de senha) ficou — só a paleta trocou, de ameixa/creme/verde-petróleo pra **azul/branco/vermelho** do poste giratório clássico de barbearia.

- `--color-ink` (ameixa) → **navy** #16233b. `--color-paper` (creme) → **branco** #fafaf7. `--color-teal` → **`--color-vermelho`** #c8202f (cor de marca principal, mesmo papel que o teal tinha: botões, destaque de número) + **`--color-azul`** #1d4e89 (secundária, só decorativa).
- `Mark` (o ícone da marca, antes um envelope genérico) virou um mini-poste de barbeiro com listras diagonais vermelho/branco/azul.
- `PosteBarbeiro.tsx` (novo): um poste giratório de verdade ao lado do talão de senha no Hero — listras girando em loop via CSS (`.poste`, `background-position` animado), o símbolo mais clássico do ofício, juntando as duas ideias da marca (fila numerada + barbearia tradicional) no mesmo golpe de vista. Respeita `prefers-reduced-motion`.

## Reformulação 3 — mais elementos visuais de barbearia

Feedback: "coloca mais elementos visuais remententes a barbearia" — o poste era o único elemento literal do ofício; o resto (senha, cores) era abstrato.

- **`Icones.tsx`** (novo): tesoura, navalha e pente, traço simples. `Profissionais.tsx` trocou a silhueta genérica de "pessoa" por um desses ícones por profissional, escolhido pela especialidade real já escrita em `data.ts` (Duda Ferraz/cortes → tesoura, Igor Salgado/barba → navalha, Bia Torres/escova → pente) — não é decoração aleatória, cada ícone corresponde ao dado que já existia.
- **`Selo.tsx`** (novo): carimbo circular vintage com texto correndo na borda (`<textPath>`) e uma tesoura no centro — ao lado do poste no Hero, reforçando a estética de barbearia tradicional sem depender só da paleta de cor.
- **`.piso-xadrez`** (index.css): faixa fina de piso xadrez preto/branco — o chão clássico de barbearia antiga — usada como divisor entre `Hero`/`Menu` e `Menu`/`Profissionais`, nunca como fundo de bloco de texto (evita brigar com legibilidade).

## Arquitetura — painel de senha em vez de nav

`TicketBar.tsx` substitui a barra de navegação por um **painel "atendendo agora"**: o número sobe sozinho a cada 9s (decorativo, dá vida à página), sem nenhum link de menu — CTA "Marcar horário" é o único elemento interativo da barra. `Menu.tsx` (a lista de preços) é um quadro pendurado na parede, não uma grade de cards.

## Gotcha de contraste — vermelho só funciona no fundo claro

Mesma lição de sempre: `--color-vermelho` (#c8202f) funciona bem como texto/fundo sobre `--paper` (branco), mas sobre `--ink` (navy escuro) o contraste cai bastante — `Menu.tsx` (seção de fundo escuro) por isso usa `text-paper` pros preços, nunca `text-vermelho`. Regra geral adotada nos conceitos desta leva: **validar cada cor de marca contra CADA fundo onde ela aparece, nunca presumir que funciona nos dois.**
