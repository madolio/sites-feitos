# Revelar (conceito)

Site-conceito da Madolio pro nicho de fotografia (casamento/ensaio). **Estúdio fictício** — não existe (a fotógrafa "Marina Kessler" também é inventada). Vite + React 19 + TypeScript + Tailwind v4. Página única.

Um dos 6 conceitos com estilo E estrutura próprios — ver também Pulso, Focinho, Corte, Chave, Passaporte.

## Deploy (Cloudflare Workers)

Worker `revelar`, em `https://revelar.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Contact Sheet"

- **Lugar/objeto:** a folha de contato de laboratório fotográfico — quadros numerados de negativo, com anotações de lápis de cera nas margens.
- **Colisão:** fotografia × folha de contato de laboratório.
- **Nunca parecer:** hero em tela cheia com foto de casamento e script elegante — que também resolveria o problema real de não ter fotos de um cliente que não existe.
- **Wildcard:** `ContactSheet.tsx` — cada serviço é um "quadro" numerado (01A, 02A...) com ilustração de traço (`FrameIcon.tsx`, não foto) e a descrição estilizada como anotação de lápis de cera (`.grease`, leve rotação).

Paleta: `--color-ink` #141110 (preto quente), `--color-paper` #efe6d8 (papel de laboratório). Fontes: **Big Shoulders Display** (display condensado, como texto carimbado num pote de filme) + **Public Sans** (corpo).

## Arquitetura — tira de filme em vez de nav

`FilmBar.tsx` substitui a barra de navegação por uma **tira de filme de verdade**: perfurações (`.sprockets`, `radial-gradient` repetido) em cima e embaixo da barra fixa, só com marca + CTA — sem menu de seções.

## Gotcha de contraste — mesma lição, duas tonalidades por cor

`--color-amber` (`#d98c2b`, vívido) só é seguro como texto sobre o fundo escuro `--ink` (~7:1) — sobre o `--paper` claro dá só ~2.2:1. Pra texto/CTA sobre fundo claro, usar `--color-amber-ink` (`#8a5a1a`, ~4.77:1 contra `--paper`). Regra já repetida em Pulso, Focinho e Corte: **validar a cor de marca contra cada fundo onde ela aparece antes de usar como texto.**
