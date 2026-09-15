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

Paleta: `--color-ink` #2c1029 (ameixa quase-preta), `--color-paper` #f7eee8 (creme), `--color-teal` #146b62 (única cor de marca). Fontes: **Unbounded** (display, geométrica arredondada) + **Manrope** (corpo).

## Arquitetura — painel de senha em vez de nav

`TicketBar.tsx` substitui a barra de navegação por um **painel "atendendo agora"**: o número sobe sozinho a cada 9s (decorativo, dá vida à página), sem nenhum link de menu — CTA "Marcar horário" é o único elemento interativo da barra. `Menu.tsx` (a lista de preços) é um quadro pendurado na parede, não uma grade de cards.

## Gotcha de contraste — teal só funciona no fundo claro

Mesma lição do Pulso e do Focinho: `--color-teal` (#146b62) foi validado a ~5.5:1 contra `--paper`, mas contra o fundo escuro `--ink` (ameixa quase-preta) dá só ~2.7:1 — insuficiente até pro mínimo de 3:1 de elementos decorativos, e bem abaixo do 4.5:1 de texto. `Menu.tsx` (seção de fundo escuro) por isso usa `text-paper` pros preços, não `text-teal` — a cor de marca fica reservada só pras seções de fundo claro (`TicketBar`, botões, `Agendar`). Regra geral adotada nos 6 conceitos desta leva: **validar cada cor de marca contra CADA fundo onde ela aparece, nunca presumir que funciona nos dois.**
