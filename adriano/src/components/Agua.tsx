import { linkWhatsApp } from '../contato'
import { servicosAgua } from '../dados'
import EsquemaAgua from './EsquemaAgua'
import FichaServicos from './FichaServicos'
import Reveal from './Reveal'

// Seção inteira na cor da água — nenhum elemento daqui usa a cor da elétrica.
export default function Agua() {
  return (
    <section id="agua" className="bg-agua-clara px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <p className="rotulo text-agua">Ofício 01</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Tratamento de água</h2>
          <p className="mt-5 text-lg text-fumo">
            Tratamento de água em geral, residencial e comercial — e
            experiência em água de alta pureza, o padrão que tratamento de
            hemodiálise exige. Também faço manutenção de sistemas já
            instalados.
          </p>
        </Reveal>

        <div className="mt-12">
          <EsquemaAgua />
        </div>

        <Reveal className="mt-16 max-w-3xl">
          <FichaServicos itens={servicosAgua} cor="agua" />
        </Reveal>

        <div className="mt-8">
          <a
            href={linkWhatsApp('Olá! Gostaria de saber mais sobre tratamento de água.')}
            target="_blank"
            rel="noreferrer"
            className="btn-agua"
          >
            Perguntar sobre tratamento de água
          </a>
        </div>
      </div>
    </section>
  )
}
