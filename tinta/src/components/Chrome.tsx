// Marca fixa no canto + atalho pro painel de agendamento — sem barra de
// navegação horizontal (não faria sentido aqui: a página inteira já rola
// de lado). Fica por cima do Trilho em todos os painéis.
export default function Chrome() {
  const irProContato = () => {
    const el = document.getElementById('trilho')
    el?.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
  }

  return (
    <>
      <div className="fixed top-5 left-5 z-50 sm:top-6 sm:left-6">
        <span className="font-display text-xl tracking-widest text-paper uppercase">Tinta</span>
      </div>

      <button
        type="button"
        onClick={irProContato}
        className="fixed top-5 right-5 z-50 text-sm font-semibold tracking-wide text-paper/70 uppercase transition-colors hover:text-ember sm:top-6 sm:right-6"
      >
        Marcar →
      </button>
    </>
  )
}
