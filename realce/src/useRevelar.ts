import { useEffect } from 'react'

// Liga a classe .revelar (ver index.css) a um IntersectionObserver único
// pra página inteira. Só serve pra conteúdo que já existe no primeiro
// render — o que aparece depois (blocos da agenda montada) não usa .revelar.
export function useRevelar() {
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.setAttribute('data-visivel', 'true')
            observador.unobserve(entrada.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    for (const alvo of document.querySelectorAll('.revelar')) observador.observe(alvo)
    return () => observador.disconnect()
  }, [])
}
