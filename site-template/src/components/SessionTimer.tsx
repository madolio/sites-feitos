import { useEffect, useState } from 'react'

function formatElapsed(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const s = String(Math.floor(seconds % 60)).padStart(2, '0')
  return `${h}:${m}:${s}`
}

// Cronômetro que sobe a cada segundo desde que a página carregou — encena
// "audiência em curso, contando agora" (Q1/Q2: sala de audiência em sessão,
// precisão afiada). É o contraponto direto ao complaint de que a versão
// anterior era "muito morta, sem vida": este número muda sozinho o tempo
// inteiro, não só na primeira vez que rola pra tela.
export default function SessionTimer({ className }: { className?: string }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={`readout ${className ?? ''}`} suppressHydrationWarning>
      {formatElapsed(seconds)}
    </span>
  )
}
