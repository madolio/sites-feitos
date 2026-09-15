import Configurador from './Configurador'

// Segunda reformulação completa: não é mais marcenaria, é alfaiataria sob
// medida — o usuário pediu pra mudar até o nicho ("na verdade muda até
// essa ideia de moveis"). O nome "Encaixe" foi mantido de propósito: cai
// bem pra roupa também ("a roupa que encaixa em você", o caimento
// perfeito), então não precisou trocar marca/domínio, só a ideia inteira
// de negócio por trás.
export default function Hero() {
  return (
    <section className="border-b border-line px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-heading text-[2.75rem] leading-[1.05] font-medium text-ink sm:text-6xl">
            A roupa encaixa em você, não o contrário
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            Alfaiataria sob medida em Itu (SP). Monte a peça abaixo — tecido,
            corte — e veja preço e prazo estimados na hora.
          </p>
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <Configurador />
        </div>
      </div>
    </section>
  )
}
