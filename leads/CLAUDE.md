# Leads (app interno)

App de uso pessoal do Adriano/Madolio pra buscar negócios locais que **não têm site**, usando a Google Places API. Não é um site-conceito de portfólio como o resto do monorepo — é ferramenta de prospecção real. Vite + React 19 + TypeScript + Tailwind v4, PWA instalável (sem build nativo).

## Por que PWA, não app nativo

Uso pessoal, de um usuário só, sem necessidade de loja/distribuição — um app instalável direto do navegador (manifest + service worker mínimo) resolve sem o custo de build nativo (Expo/Swift/Kotlin). `sw.js` não cacheia nada: a busca depende de rede de qualquer forma, cache offline não ajudaria.

## Chave da API — só no aparelho, nunca em código

Não há backend. A chave da Google fica em `localStorage` (`chave.ts`) e é enviada só direto pra `places.googleapis.com` a partir do próprio navegador. `ConfigChave.tsx` é a tela de onboarding que pede a chave na primeira vez e explica em 4 passos como criar uma no Google Cloud Console.

## Places API (New), não a antiga

Usa `POST https://places.googleapis.com/v1/places:searchText` (a versão "New" da API, não a legada `maps.googleapis.com/maps/api/place`). O campo que resolve o problema inteiro é `websiteUri`: se vier vazio, o lugar não tem site — sem scraping, sem heurística. `X-Goog-FieldMask` limita a resposta só aos campos usados, importante porque a Places API (New) cobra por campo retornado.

## Busca por texto + viés de localização, não Nearby Search

Preferido `searchText` com `locationBias` (círculo opcional) em vez de `searchNearby`, porque permite ao usuário digitar tanto a categoria quanto a cidade num campo só ("encanador em Curitiba") sem precisar de uma chamada de geocoding separada. A opção "usar minha localização" (checkbox) só troca a fonte do centro do círculo pra `navigator.geolocation`, com raio ajustável.

## Filtro "só sem site" é client-side

A API já devolve todo mundo (com e sem site) — filtrar no cliente (`soSemSite` em `App.tsx`) em vez de tentar filtrar na própria query evita perder resultados por causa de um filtro que a Places API não suporta nativamente.
