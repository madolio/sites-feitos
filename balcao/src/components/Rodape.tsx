import Reveal from './Reveal'

export default function Rodape() {
  return (
    <Reveal as="footer" className="mx-auto max-w-4xl px-5 pb-10 text-center text-sm text-ink/70 sm:px-8">
      <p>
        O Balcão é uma lanchonete fictícia: um conceito feito com{' '}
        <span aria-hidden="true" className="text-leaf">♥</span>
        <span className="sr-only">amor</span> pela{' '}
        <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold text-ink underline underline-offset-4">
          Madolio
        </a>
        .
      </p>
    </Reveal>
  )
}
