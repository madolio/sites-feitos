import { Mark } from './Fundeio'

// A seção Equipe era só a citação solta — sem nenhum elemento visual, a mais
// fraca da página perto do Extrato/Fundeio. Em vez de foto (fabricaria uma
// "prova social" de um sócio que não existe), o elemento visual reforça o
// vocabulário já estabelecido: extrato/ficha/carimbo. Um "cartão de
// credencial" no mesmo registro de documento oficial — cantos marcados como
// se fosse carimbado, campos em .ledger-row/.dots iguais ao Extrato.tsx.
export default function Credencial() {
  return (
    <div className="credencial border border-brass/40 bg-indigo p-7 text-paper sm:p-8">
      <div className="flex items-center gap-3">
        <Mark className="h-8 w-8 text-brass" />
        <span className="mono text-[0.6875rem] tracking-[0.2em] text-paper/55">CREDENCIAL ÂNCORA</span>
      </div>

      <p className="mt-7 font-serif text-2xl">Renato Vilas Boas</p>
      <p className="mt-1 text-paper/70">Sócio-fundador</p>

      <dl className="mono mt-6 space-y-2.5 border-t border-paper/15 pt-5 text-sm">
        <div className="ledger-row">
          <dt className="shrink-0 text-paper/55">Certificação</dt>
          <span className="dots" aria-hidden="true" />
          <dd className="shrink-0 text-paper">CFP®</dd>
        </div>
        <div className="ledger-row">
          <dt className="shrink-0 text-paper/55">Ativo desde</dt>
          <span className="dots" aria-hidden="true" />
          <dd className="shrink-0 text-paper">2011</dd>
        </div>
        <div className="ledger-row">
          <dt className="shrink-0 text-paper/55">Registro</dt>
          <span className="dots" aria-hidden="true" />
          <dd className="shrink-0 text-brass">Nº 001</dd>
        </div>
      </dl>
    </div>
  )
}
