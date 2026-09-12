# Confete (conceito)

Site-conceito da Madolio pro nicho de festa infantil (buffet + organização). **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Feito a partir de duas referências visuais que o usuário mandou (styles.refero.design) — não pra copiar o layout, mas pra aplicar a lógica de cor/forma num nicho novo. Ver também a home do madolio, que usou a outra referência.

## Deploy (Cloudflare Workers)

Worker `confete`, em `https://confete.fenoninho-max.workers.dev`. `npm run deploy`.

## Referência — sistema "Slush" (colagem de adesivos)

Da URL `styles.refero.design/style/8b6b547f-...`: contorno preto de 1px em tudo ("recorte à mão"), radius de pílula em botões/nav, várias cores saturadas por tela (nunca um único acento), adesivos 2D ilustrados com contorno preto, fitas 3D texturizadas atrás do texto, zero foto/gradiente/sombra. A regra mais importante da referência, que evita todo problema de contraste: **texto sempre em "Carbon" (preto), cor saturada só na forma — nunca no preenchimento do texto.**

## Vibe — "Colagem de Festa"

- **Colisão:** festa infantil × colagem de adesivos de caderno.
- **Nunca parecer:** buffet infantil com foto de bolo e balão 3D renderizado.
- **Wildcard:** `Ribbon.tsx` — uma fita ondulada (SVG, onda só nas bordas de cima/baixo, sólida no meio) atrás do bloco de depoimentos, versão achatada da "fita 3D" da referência.

Paleta: `--color-carbon` #141414 (texto/contorno, nunca trocado), `--color-cream` #fffaf0, e cinco cores saturadas só pra forma (`sky`, `mint`, `lavender`, `ember`, `sun` — ver `Sticker.tsx`). Fontes: **Baloo 2** (display arredondado, bem diferente do `Fredoka` do Focinho apesar do parentesco visual) + **Quicksand** (corpo).

## Arquitetura — nav em pílula flutuante

`Nav.tsx` não é uma barra full-width — é uma pílula flutuante centralizada no topo (`rounded-full`, contorno preto), no espírito do radius de 1600px da referência em nav/botões.

## Gotcha de contraste — a regra da própria referência já resolve o problema

Ao contrário de Pulso/Focinho/Corte/Chave/Revelar (que precisaram de uma segunda tonalidade "-ink" da cor de marca), aqui não foi preciso: seguindo a regra da própria referência (cor saturada nunca vira texto), nenhuma das 5 cores (`sky`, `ember`, etc.) é usada como `text-*` — só como `fill`/`bg` de forma, com `--color-carbon` por cima ou do lado. A palavra de destaque "chega" no Hero por exemplo não é texto colorido (`text-ember` falha a ~2.7:1) — é um "grifo" com fundo `bg-ember` e texto `carbon` normal por cima (~6.7:1). **Se outro projeto usar essa mesma lógica de referência, replicar essa regra em vez de tentar validar cor saturada como texto.**
