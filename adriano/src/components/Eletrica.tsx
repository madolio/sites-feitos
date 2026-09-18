import { linkWhatsApp } from '../contato'
import { servicosEletrica } from '../dados'
import EsquemaEletrica from './EsquemaEletrica'
import FichaServicos from './FichaServicos'
import Reveal from './Reveal'

// Seção inteira na cor da elétrica — nenhum elemento daqui usa a cor da água,
// nem o contorno de foco (por isso a classe `foco-eletrica` no link).
export default function Eletrica() {
  return (
    <section id="eletrica" className="bg-eletrica-clara px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <p className="rotulo text-eletrica">Ofício 02</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Serviços elétricos</h2>
          <p className="mt-5 text-lg text-fumo">
            Instalação e manutenção elétrica, residencial e comercial.
          </p>
        </Reveal>

        <div className="mt-12">
          <EsquemaEletrica />
        </div>

        <Reveal className="mt-16 max-w-3xl">
          <FichaServicos itens={servicosEletrica} cor="eletrica" />
        </Reveal>

        <div className="mt-8">
          <a
            href={linkWhatsApp('Olá! Gostaria de saber mais sobre serviços elétricos.')}
            target="_blank"
            rel="noreferrer"
            className="btn-eletrica"
          >
            Perguntar sobre serviços elétricos
          </a>
        </div>
      </div>
    </section>
  )
}
