# Passaporte (conceito)

Site-conceito da Madolio pro nicho de escola de idiomas. **Escola fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4 + GSAP. Página única.

Último dos 6 conceitos com estilo E estrutura próprios — ver também Pulso, Focinho, Corte, Chave, Revelar.

## Deploy (Cloudflare Workers)

Worker `passaporte`, em `https://passaporte.sneakpeek.workers.dev`. `npm run deploy`.

## Vibe — "Visto"

- **Lugar/objeto:** um passaporte de verdade, com carimbos de visto por país/estágio da viagem.
- **Colisão:** escola de idiomas × passaporte com carimbos de visto — cada nível do curso (CEFR A1–C2) é um carimbo, não uma barra de progresso de app gamificado.
- **Nunca parecer:** Duolingo/app gamificado com mascote e sequência de dias.
- **Wildcard:** `NivelStamp.tsx` — cada nível "carimba" na página com um golpe rápido de escala+rotação (GSAP, `ease: power4.out`, ~0.35s) quando entra na tela, como um carimbo de borracha batendo no papel, não um fade-in genérico.

Paleta: `--color-ink` #5c1f2e (bordô de capa de passaporte — dark o bastante pra servir de cor de texto direto, sem precisar de uma segunda tonalidade "-ink" como nos outros 5 conceitos desta leva), `--color-paper` #f2ead9 (página de visto), `--color-teal` #2f6f6b (carimbo). Fontes: **Big Shoulders Display** (display, condensada de documento oficial) + **Courier Prime** (números/siglas, como texto datilografado de visto) + **Mulish** (corpo).

## Arquitetura — sem nav nenhuma

Este é o único dos 6 conceitos **sem cabeçalho fixo, sem barra flutuante, sem CTA persistente** — a página abre direto na "capa" (`Capa.tsx`, fundo bordô cheio) e você desce lendo, como um passaporte de verdade: você abre e folheia, não "navega" por ele. O único jeito de agir é os CTAs dentro do próprio conteúdo (`#niveis`, `#matricula`).

## Depoimentos.tsx e Faq.tsx — adições

Duas seções entram depois de `Metodologia` e antes do rodapé `Contato`, na mesma ordem de `App.tsx`: `Depoimentos` (3 depoimentos fictícios com carimbo circular de nível CEFR no canto, borda tracejada como página de visto) e `Faq` (acordeão acessível, `aria-expanded`/`aria-controls`/`role="region"`, respeita `prefers-reduced-motion`, "+" que gira 45° usando `stamp-number`). Ambas reusam classes já existentes (`stamp-number`, `border-line`, `text-teal`) sem mexer em `index.css`, `Capa.tsx` ou `NivelStamp.tsx`. O array `depoimentos` de `Metodologia.tsx`/`data.ts` não foi tocado; os depoimentos novos vivem só dentro de `Depoimentos.tsx`.

## Nota de contraste — esta paleta não precisou de tonalidade dupla

Diferente de Pulso, Focinho, Corte, Chave e Revelar (todos precisaram de uma variante "-ink" mais escura da cor de marca pra funcionar como texto), aqui `--color-ink` (bordô) já nasceu escuro o bastante (~10:1 contra `--paper`) pra servir de cor de texto direto, e `--color-teal` passa em ambos os fundos (~4.87:1 contra `--paper`, ~10:1 como `--paper` sobre `--ink`). Mesmo assim, **sempre validar antes de usar** — não presumir que uma paleta nova está "seguro por padrão" só porque outra deu certo.
