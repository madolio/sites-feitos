import type { CSSProperties, ReactNode } from 'react'
import { curiosidades, cursos, type Curso } from '../data'
import { sendToWhatsApp } from '../demo'
import { PROF_MAX } from '../estado'

// Cada coisa fica pendurada na profundidade dela: com a página inteira
// medindo 10 telas, a profundidade d fica centralizada na tela exatamente
// quando o scroll pede d metros (ver estado.ts).
export const TELAS = 10

export function naProfundidade(d: number): CSSProperties {
  return { top: `calc(${d / PROF_MAX} * ${TELAS - 1} * 100vh + 50vh)` }
}

function Pendurada({ d, lado, children }: { d: number; lado: 'esq' | 'dir' | 'meio'; children: ReactNode }) {
  const posicao =
    lado === 'esq'
      ? 'sm:left-[8%] sm:right-auto'
      : lado === 'dir'
        ? 'sm:right-[12%] sm:left-auto'
        : 'sm:left-1/2 sm:right-auto sm:-translate-x-1/2'
  return (
    <div className={`absolute right-16 left-4 -translate-y-1/2 sm:w-[26rem] ${posicao}`} style={naProfundidade(d)}>
      {children}
    </div>
  )
}

export function PlacaCurso({ curso, lado }: { curso: Curso; lado: 'esq' | 'dir' }) {
  return (
    <Pendurada d={curso.profundidade} lado={lado}>
      <article className="prancheta" aria-labelledby={`curso-${curso.id}`}>
        <p className="font-visor text-xs text-lanterna">até {curso.profundidade} m</p>
        <h2 id={`curso-${curso.id}`} className="mt-2 text-3xl font-extrabold sm:text-4xl">
          {curso.nome}
        </h2>
        <p className="mt-3 text-espuma/80">{curso.descricao}</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-espuma/15 pt-4">
          <div>
            <p className="text-sm text-espuma/65">{curso.detalhe}</p>
            <p className="font-visor text-lg text-espuma">{curso.preco}</p>
          </div>
          <button
            type="button"
            onClick={() =>
              sendToWhatsApp(`Olá, Cardume! Quero fazer o ${curso.nome} (até ${curso.profundidade} m, ${curso.preco}).`)
            }
            className="btn-primary"
          >
            Quero esse
          </button>
        </div>
      </article>
    </Pendurada>
  )
}

export function Curiosidades() {
  const toque = window.matchMedia('(pointer: coarse)').matches
  return (
    <>
      {curiosidades.map((c, i) => (
        <Pendurada key={c.profundidade} d={c.profundidade} lado={i % 2 ? 'dir' : 'esq'}>
          <p className="max-w-xs rounded-2xl bg-placa/75 px-4 py-3 text-sm text-espuma/85">
            <span className="mb-1 block font-visor text-[0.65rem] text-lanterna">{c.profundidade} m</span>
            {toque ? c.texto.replace('seu cursor', 'seu dedo') : c.texto}
          </p>
        </Pendurada>
      ))}
    </>
  )
}

export function Superficie() {
  return (
    <div className="absolute inset-x-0 top-0 flex h-screen flex-col justify-center pr-10 pl-5 sm:px-[12%]">
      {/* Syne no peso 800 é larguíssima — no celular precisa ser bem menor pra caber */}
      <h1 className="text-[2.15rem] leading-[0.9] font-extrabold tracking-tight text-casco sm:text-[5rem] lg:text-[7rem]">
        Cardume
      </h1>
      <p className="mt-3 text-xl font-semibold text-casco">Escola de mergulho</p>
      <p className="mt-6 max-w-sm text-lg text-casco/85">
        Role pra baixo pra descer. Cada curso aparece na profundidade que ele
        libera.
      </p>
      <p aria-hidden="true" className="mt-10 font-visor text-sm text-casco/70">
        ↓ 0 m
      </p>
    </div>
  )
}

export function ListaCursos() {
  // o Deep Diver (40 m) mora no bloco do fundo, junto do formulário
  return (
    <>
      {cursos
        .filter((c) => c.profundidade < PROF_MAX)
        .map((c, i) => (
          <PlacaCurso key={c.id} curso={c} lado={i % 2 ? 'esq' : 'dir'} />
        ))}
    </>
  )
}
