export default function Instrutora() {
  return (
    <section id="helena" className="scroll-mt-16 py-20 md:py-28 lg:scroll-mt-0">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <blockquote>
          <p className="text-[2rem] leading-[1.15] font-medium tracking-tight md:text-5xl">
            “Se eu não consigo ver a sua coluna durante o exercício, não é aula
            de Pilates. É ginástica em grupo.”
          </p>
        </blockquote>

        <div className="md:pt-3">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-4 w-4 rounded-full bg-vermelha" />
            <span className="h-4 w-4 bg-azul" />
            <span className="h-0 w-0 border-x-8 border-b-[14px] border-x-transparent border-b-amarela" />
          </div>
          <h2 className="mt-5 text-3xl font-medium tracking-tight">Helena Duarte</h2>
          <p className="mt-1 text-ink/70">Fisioterapeuta e fundadora do Alma</p>
          <p className="mt-5 max-w-md text-ink/85">
            Dá aula de Pilates há doze anos. Montou o estúdio pra ter turmas
            pequenas o bastante pra corrigir cada movimento, e dá pessoalmente
            a primeira aula de todo aluno novo.
          </p>
        </div>
      </div>
    </section>
  )
}
