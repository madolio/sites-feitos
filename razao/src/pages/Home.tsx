import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import CalendarioFiscal from '../components/CalendarioFiscal'
import Servicos from '../components/Servicos'
import Contato from '../components/Contato'

export default function Home() {
  return (
    <>
      <Hero />

      <section id="calendario" className="border-b border-linha py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <Reveal>
            <p className="dado-fiscal text-selo">o calendário</p>
            <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
              Cada regime tem seu próprio ritmo de vencimento — escolha o seu
            </h2>
            <p className="mt-4 max-w-xl text-tinta/75">
              MEI, Simples Nacional e profissional liberal seguem calendários fiscais diferentes.
              Troque de aba abaixo pra ver os meses de vencimento de cada um e o próximo prazo
              real, calculado a partir de hoje.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <CalendarioFiscal />
          </Reveal>
        </div>
      </section>

      <Servicos />
      <Contato />
    </>
  )
}
