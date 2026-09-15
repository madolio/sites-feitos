import { useState } from 'react'

// O talão de senha deixou de ser só decorativo: agora tem um botão "Puxar
// senha" que dispensa uma nova, com animação de papel saindo da máquina
// (slide + leve rotação, como destacar na perfuração) — o mesmo espírito de
// "vira ferramenta de verdade" aplicado na Realce, adaptado pro objeto que
// já existia aqui.
export default function TicketStub({ numeroInicial }: { numeroInicial: number }) {
  const [numero, setNumero] = useState(numeroInicial)
  const [tique, setTique] = useState(0)

  function puxar() {
    setNumero((n) => n + 1)
    setTique((t) => t + 1)
  }

  return (
    <div className="mx-auto max-w-xs text-center">
      <div className="relative">
        <div key={tique} className="ticket-dispensar relative border-2 border-ink bg-white p-7 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-ink/55 uppercase">Sua senha</p>
          <p className="ticket mt-2 text-6xl text-ink">{numero}</p>
          <p className="mt-3 border-t border-dashed border-ink/25 pt-3 text-sm text-ink/60">
            Aguarde ser chamado(a)
          </p>
        </div>
        <span
          className="absolute top-1/2 -left-3.5 h-7 w-7 -translate-y-1/2 rounded-full border-2 border-ink bg-paper"
          aria-hidden="true"
        />
        <span
          className="absolute top-1/2 -right-3.5 h-7 w-7 -translate-y-1/2 rounded-full border-2 border-ink bg-paper"
          aria-hidden="true"
        />
      </div>

      <button type="button" onClick={puxar} className="btn-line mt-6">
        Puxar senha
      </button>
    </div>
  )
}
