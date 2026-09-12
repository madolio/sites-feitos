# Focinho (conceito)

Site-conceito da Madolio pro nicho de pet shop/veterinária. **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Um dos 6 conceitos com estilo E estrutura próprios — ver também Pulso, Corte, Chave, Revelar, Passaporte.

## Deploy (Cloudflare Workers)

Worker `focinho`, em `https://focinho.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Prontuário"

- **Lugar/objeto:** a carteirinha de vacinação de um pet — a fichinha que registra peso, vacina, próxima consulta.
- **Colisão:** pet shop × prontuário/formulário médico.
- **Nunca parecer:** pet shop pastel com pata-de-cachorro genérica.
- **Wildcard:** `FichaCard.tsx` — a "ficha de atendimento" de um pet de exemplo (Nino), com um carimbo de "vacina em dia" (`.stamp`, borda tracejada imitando carimbo de borracha), ocupando o centro do Hero em vez de foto (não temos fotos reais).

Paleta: `--color-ink` #2b3a3a (verde-petróleo escuro), `--color-paper` #faf7f0 (creme). Fontes: **Fredoka** (display, arredondada) + **Nunito Sans** (corpo).

## Arquitetura — abas de fichário em vez de nav

`FolderTabs.tsx` substitui a barra de navegação por uma fileira de **abas de pasta suspensas** (como as divisórias de um fichário físico) — cada seção é uma aba, não um link de menu comum. O CTA "Agendar" fica à direita, fora das abas.

## Gotcha de contraste — cor de marca precisa de duas tonalidades (lição do Pulso)

Mesma lição aprendida no Pulso: cores "de pôster" nem sempre têm contraste suficiente pra texto. Aqui, `--color-sage` começou como `#7fa06a` (verde claro) e falhava tanto o texto quanto o uso decorativo (~2.94:1 contra `--paper`/branco, abaixo até do mínimo de 3:1 pra elementos não-textuais). Escurecido pra `#4f6a3f` (~6:1) **antes** de testar visualmente — sempre calcular o contraste de uma cor nova contra o fundo real onde ela vai aparecer, não só "parece que dá".

`--color-accent` (`#b8432e`) já foi escolhido com essa lição em mente desde o início (validado a ~5:1 contra `--paper`) — não precisou de uma segunda tonalidade "-ink" como o `--color-lane` do Pulso, porque aqui não há seção com fundo escuro usando a cor de marca como texto (o rodapé escuro usa texto branco/paper, não a cor de marca). Se algum dia adicionar uma seção escura com texto na cor de marca, testar o contraste daquela combinação especificamente — não presumir que a mesma cor funciona nos dois fundos.
