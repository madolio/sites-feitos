export default function Footer() {
  return (
    <footer className="border-t border-latao/20 bg-noite py-10 text-luz">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-display text-xl">Realce &amp; Cia</span>
          <span className="text-sm text-fumo">
            Av. Anhanguera, 388 — São Roque, SP · Ter a Sáb, 9h às 19h
          </span>
        </div>

        <div className="filete my-6" />

        <p className="max-w-3xl text-sm text-fumo">
          Este site é um <strong className="text-luz">conceito de redesenho</strong> criado
          pela Madolio para o Realce &amp; Cia, salão e escola de cabeleireiros
          que existe de verdade em São Roque. Não é o site oficial do salão, não
          é encomendado por eles e os textos descritivos são ilustrativos.
          Endereço, horário e lista de serviços vieram do material público do
          próprio salão.
        </p>
      </div>
    </footer>
  )
}
