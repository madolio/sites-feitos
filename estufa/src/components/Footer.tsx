export default function Footer() {
  return (
    <footer className="border-t border-linha bg-mata text-vidro/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg italic text-vidro">Estufa Cheia</p>
            <p className="mt-2 text-sm">Floricultura e paisagismo</p>
            <p className="mt-1 text-sm">Nova Friburgo, RJ</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-vidro/50">Contato</p>
            <p className="mt-2">contato@estufacheia.com.br</p>
            <p>(22) 5556-6677</p>
            <p>Estrada da Saudade, 340</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-vidro/50">Responsável técnica</p>
            <p className="mt-2">Iara Bicalho</p>
            <p className="text-vidro/60">Paisagista e florista, CREA-RJ 2024117534</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-vidro/70">
          Estufa Cheia é um negócio fictício — conceito de site criado pela Madolio.
        </p>
        <p className="mt-2 text-xs text-vidro/70">
          Fotos de espécimes: Tanvi.sharmaaa, Dick Culbert, 小石川人暉, Priskamarsila29 e Krzysztof
          Ziarnek — Wikimedia Commons, CC BY / CC BY-SA.
        </p>
        <p className="mt-2 text-xs text-vidro/70">
          feito com <span aria-hidden="true" className="text-terracota">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-terracota/50 underline-offset-4">
            madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
