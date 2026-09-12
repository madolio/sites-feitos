// O talão de senha — o wildcard visual da página, com os furos de picote
// nas laterais e a próxima senha disponível.
export default function TicketStub({ numero }: { numero: number }) {
  return (
    <div className="relative mx-auto max-w-xs">
      <div className="border-2 border-ink bg-white p-7 text-center">
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
  )
}
