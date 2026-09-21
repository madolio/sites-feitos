export default function Footer() {
  return (
    <footer className="border-t border-linha bg-noturno text-papel/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg italic text-papel">Cútis Dermatologia</p>
            <p className="mt-2 text-sm">Dermatologia e estética médica</p>
            <p className="mt-1 text-sm">Curitiba, PR</p>
          </div>
          <div className="text-sm">
            <p className="dado-clinico text-papel/50">Contato</p>
            <p className="mt-2">contato@cutisdermato.com.br</p>
            <p>(41) 3344-5566</p>
            <p>Rua Comendador Araújo, 715</p>
          </div>
          <div className="text-sm">
            <p className="dado-clinico text-papel/50">Responsável técnica</p>
            <p className="mt-2">Dra. Marina Petrucci</p>
            <p className="text-papel/60">Dermatologista, CRM-PR 34981 · RQE 28104</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-papel/70">
          Cútis Dermatologia é um negócio fictício, conceito de site criado pela Madolio. Os
          números de recuperação descritos são faixas típicas de literatura dermatológica geral, não
          garantia de resultado individual.
        </p>
        <p className="mt-2 text-xs text-papel/70">
          feito com <span aria-hidden="true" className="text-derme">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-derme/50 underline-offset-4"
          >
            madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
