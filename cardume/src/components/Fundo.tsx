import { useEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { cursos } from '../data'
import { sendToWhatsApp } from '../demo'
import { mergulho, PROF_MAX, scrollDaProfundidade } from '../estado'

// Os 40 m: o último curso (o que libera o fundo), o formulário e o botão de
// subir — que sobe com parada de segurança aos 5 m, como tem que ser.
export default function Fundo() {
  const deep = cursos.find((c) => c.profundidade === PROF_MAX)!
  const [curso, setCurso] = useState(cursos[0].id)
  const [nome, setNome] = useState('')
  const subida = useRef<gsap.core.Timeline | null>(null)
  const pronto = nome.trim().length > 1

  useEffect(() => () => void subida.current?.kill(), [])

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    if (!pronto) return
    const c = cursos.find((x) => x.id === curso)!
    sendToWhatsApp(`Olá, Cardume! Meu nome é ${nome.trim()} e quero fazer o ${c.nome} (até ${c.profundidade} m).`)
  }

  const subir = () => {
    subida.current?.kill()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0 })
      return
    }
    const vaga = { y: window.scrollY }
    const rolar = () => window.scrollTo(0, vaga.y)
    mergulho.automatico = true
    const tl = gsap.timeline({ onComplete: () => void soltar() })
    tl.to(vaga, { y: scrollDaProfundidade(5), duration: 3.2, ease: 'power1.inOut', onUpdate: rolar })
      .add(() => {
        mergulho.parada = 3
      })
      .to(mergulho, { parada: 0, duration: 3, ease: 'none' })
      .add(() => {
        mergulho.parada = null
      })
      .to(vaga, { y: 0, duration: 1.6, ease: 'power2.inOut', onUpdate: rolar })
    subida.current = tl

    // mexer na rolagem no meio da subida devolve o controle pra pessoa
    const cancelar = () => {
      tl.kill()
      mergulho.parada = null
      soltar()
    }
    const soltar = () => {
      mergulho.automatico = false
      window.removeEventListener('wheel', cancelar)
      window.removeEventListener('touchstart', cancelar)
      window.removeEventListener('keydown', cancelar)
    }
    window.addEventListener('wheel', cancelar, { passive: true })
    window.addEventListener('touchstart', cancelar, { passive: true })
    window.addEventListener('keydown', cancelar)
  }

  return (
    <section
      aria-labelledby="fundo-titulo"
      className="absolute inset-x-0 bottom-0 flex min-h-screen items-end pr-16 pb-10 pl-4 sm:items-center sm:px-[8%] sm:pb-0"
    >
      <div className="prancheta w-full max-w-[34rem] sm:mr-16">
        <p className="font-visor text-xs text-lanterna">até {deep.profundidade} m</p>
        <h2 id="fundo-titulo" className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Chegou no fundo.
        </h2>
        <p className="mt-3 text-espuma/80">
          <strong className="font-bold text-espuma">{deep.nome}</strong> — {deep.descricao.charAt(0).toLowerCase() + deep.descricao.slice(1)}{' '}
          <span className="font-visor text-sm text-espuma">{deep.preco}</span>
        </p>

        <form onSubmit={enviar} className="mt-6 border-t border-espuma/15 pt-5">
          <fieldset>
            <legend className="text-sm font-bold">Qual curso?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {cursos.map((c) => (
                <label
                  key={c.id}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lanterna ${
                    curso === c.id ? 'border-lanterna bg-lanterna text-abismo' : 'border-espuma/30 text-espuma/85 hover:border-espuma'
                  }`}
                >
                  <input type="radio" name="curso" className="sr-only" checked={curso === c.id} onChange={() => setCurso(c.id)} />
                  {c.nome}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-4 flex flex-wrap gap-3">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Seu nome</span>
              <input
                type="text"
                autoComplete="given-name"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-full border border-espuma/30 bg-abismo/50 px-4 py-3 text-espuma placeholder:text-espuma/45 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lanterna"
              />
            </label>
            <button type="submit" disabled={!pronto} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
              Marcar
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-espuma/15 pt-4">
          <button type="button" onClick={subir} className="btn-outline">
            Voltar à superfície
          </button>
          <p className="text-xs text-espuma/55">
            Escola fictícia — conceito da{' '}
            <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">
              Madolio
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
