export default function Footer() {
  return (
    <footer className="border-t border-linha bg-tinta text-papel/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg italic text-papel">Vereda Fisioterapia</p>
            <p className="mt-2 text-sm">Fisioterapia ortopédica, esportiva e neurológica</p>
            <p className="mt-1 text-sm">Gramado, RS</p>
          </div>
          <div className="text-sm">
            <p className="dado-mapa text-papel/50">Contato</p>
            <p className="mt-2">contato@veredafisio.com.br</p>
            <p>(55) 3044-5566</p>
            <p>Avenida das Hortênsias, 1780</p>
          </div>
          <div className="text-sm">
            <p className="dado-mapa text-papel/50">Responsável técnica</p>
            <p className="mt-2">Dra. Helena Bittencourt</p>
            <p className="text-papel/60">Fisioterapeuta, CREFITO-10 88214-F</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-papel/70">
          Vereda Fisioterapia é um negócio fictício — conceito de site feito com{' '}
          <span aria-hidden="true" className="text-trilha">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-trilha/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
