# Madolio

Landing page do Madolio — serviço de criação de sites para pequenos negócios.

Vite + React + TypeScript + Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deploy manual no Cloudflare Workers:

```bash
npx wrangler deploy
```

`wrangler.jsonc` aponta pro Worker `madolio`, com `madolio.com.br`/`www.madolio.com.br` vinculados como Custom Domain — não há deploy automático por push.
