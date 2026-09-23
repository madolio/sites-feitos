import Reveal from './Reveal'

export default function Ambiente() {
  return (
    <section className="border-b border-linha bg-papel">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-20 sm:grid-cols-[1fr_1fr] sm:px-8">
        <Reveal>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-tinta">
            <img
              src="https://images.pexels.com/photos/16269015/pexels-photo-16269015.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Poltrona confortável num canto tranquilo, com plantas e luz natural entrando pela janela — o tipo de ambiente pensado para uma sessão presencial"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="dado-ficha text-quieto">o espaço da sessão presencial</p>
          <h2 className="mt-2 max-w-md text-3xl sm:text-4xl">
            Um lugar pensado pra sentar e não ter pressa
          </h2>
          <p className="mt-4 max-w-md text-tinta/75">
            Luz natural, silêncio e uma cadeira confortável. Nada além disso é necessário pra uma
            conversa séria — o consultório em Juiz de Fora foi pensado pra ficar fora do caminho e
            deixar espaço pro que você traz.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
