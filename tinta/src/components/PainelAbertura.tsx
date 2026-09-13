export default function PainelAbertura() {
  return (
    <section className="panel flex h-svh w-screen shrink-0 flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-[5rem] leading-none tracking-widest text-paper uppercase sm:text-[8rem]">
        Tinta
      </h1>
      <p className="mt-4 max-w-xs text-paper/70 sm:max-w-sm">
        Flash, fine line e blackwork. Agulha limpa, traço que não sai de moda.
      </p>

      <div className="mt-14 flex items-center gap-2 text-sm text-paper/50">
        <span>arraste pro lado</span>
        <span className="animate-pulse text-ember">→</span>
      </div>
    </section>
  )
}
