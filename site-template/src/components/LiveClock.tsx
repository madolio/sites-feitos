import { useEffect, useState } from 'react'

function formatTime(d: Date) {
  return d.toLocaleTimeString('pt-BR', { hour12: false })
}

// Relógio de verdade, atualizado a cada segundo — a prova mais direta de
// "sistema ao vivo" que existe: nenhum outro componente da página animou de
// verdade em loop indefinido antes deste. Usado no console de contato.
export default function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={`readout ${className ?? ''}`} suppressHydrationWarning>
      {formatTime(now)}
    </span>
  )
}
