import { useSyncExternalStore } from 'react'

// Painel ao lado da peça (em vez de folha embaixo) quando sobra largura:
// desktop, ou tablet deitado. A cena 3D usa a mesma regra pra deslocar a
// peça pra esquerda do centro (ver Enquadramento em Atelie.tsx).
export const CONSULTA_LATERAL = '(min-width: 1024px), (min-width: 768px) and (orientation: landscape)'

export function ehLateral(largura: number, altura: number) {
  return largura >= 1024 || (largura >= 768 && largura > altura)
}

export function useLateral() {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(CONSULTA_LATERAL)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    () => window.matchMedia(CONSULTA_LATERAL).matches,
  )
}
