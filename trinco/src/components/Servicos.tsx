import Reveal from './Reveal'
import { servicos, categoriaInfo } from '../data/servicos'

const corCategoria: Record<string, string> = {
  emergencia: 'text-emergencia',
  agendado: 'text-seguro',
  'sob-medida': 'text-latao',
}

export default function Servicos() {
  return (
    <section id="servicos" className="border-b border-linha bg-limalha py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-placa text-latao">o que fazemos</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Quatro serviços, cada um com seu próprio ritmo</h2>
        </Reveal>

        <Reveal delay={0.03} className="mt-8 overflow-hidden rounded-sm border border-linha">
          <img
            src="https://images.pexels.com/photos/35578808/pexels-photo-35578808.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Chaveiro trabalhando de perto em uma máquina de cópia de chaves, cercado por dezenas de chaves e cadeados pendurados na parede da oficina"
            className="h-56 w-full object-cover sm:h-72"
            loading="lazy"
            width="1200"
            height="800"
          />
        </Reveal>

        <Reveal delay={0.05} className="mt-6 grid gap-6 sm:grid-cols-2" stagger={0.08}>
          {servicos.map((s) => (
            <div
              key={s.id}
              className="cartao-servico rounded-sm border border-linha bg-limalha-forte p-6 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className={`dado-placa ${corCategoria[s.categoria]}`}>{categoriaInfo[s.categoria].rotulo}</p>
              <h3 className="mt-2 text-xl">{s.nome}</h3>
              <p className="mt-2 text-sm text-grafite/75">{s.descricao}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
