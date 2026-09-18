import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../../constants'
import Reveal from '../Reveal'
import SectionNumber from '../SectionNumber'

// Kit dos making-of. Existe pra que as páginas de estudo de caso sejam feitas
// de evidência (captura de tela real, número medido, fórmula, histórico do
// git) e não de prosa corrida — um making-of de um site visual que só tem
// texto está contando a história sem mostrar o objeto.

type CapaProps = {
  nome: string
  nicho: string
  resumo: ReactNode
  /** Quatro fatos curtos e verificáveis do projeto (nicho, stack, data, regra quebrada…). */
  fatos: { rotulo: string; valor: string }[]
  children?: ReactNode
}

export function Capa({ nome, nicho, resumo, fatos, children }: CapaProps) {
  return (
    <header className="pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <Link to="/projetos" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← todos os projetos
        </Link>

        <Reveal className="mt-8">
          <div className="flex items-center gap-3 text-accent" aria-hidden="true">
            <span className="font-poster text-sm tracking-[0.25em] whitespace-nowrap">MAKING OF</span>
            <span className="h-px w-10 bg-accent/40" />
            <span className="text-xs font-semibold tracking-[0.2em] text-ink/60 uppercase">{nicho}</span>
          </div>
          <h1 className="mt-4 font-poster text-7xl leading-[0.9] tracking-tight text-ink uppercase md:text-9xl">
            {nome}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/75 md:text-xl">{resumo}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t-2 border-ink pt-5 md:grid-cols-4">
            {fatos.map((f) => (
              <div key={f.rotulo}>
                <dt className="text-xs font-semibold tracking-[0.2em] text-ink/60 uppercase">{f.rotulo}</dt>
                <dd className="mt-1 font-heading text-base font-semibold text-ink">{f.valor}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {children && <div className="mt-12">{children}</div>}
      </div>
    </header>
  )
}

type SecaoProps = {
  n: string
  rotulo: string
  titulo: string
  children: ReactNode
}

export function Secao({ n, rotulo, titulo, children }: SecaoProps) {
  return (
    <section className="mt-24 md:mt-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionNumber n={n} label={rotulo} />
          <h2 className="max-w-3xl font-poster text-4xl leading-none tracking-tight text-ink uppercase md:text-6xl">
            {titulo}
          </h2>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export function Prosa({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink/75">{children}</div>
}

type CitacaoProps = { children: ReactNode; quem: string; quando: string }

export function Citacao({ children, quem, quando }: CitacaoProps) {
  return (
    <blockquote className="relative my-2 overflow-hidden rounded-2xl bg-void p-8 text-paper md:p-12">
      <span aria-hidden="true" className="absolute top-3 right-6 font-accent text-[9rem] leading-[0.7] text-accent-hero/25 select-none">
        ”
      </span>
      <p className="relative font-accent text-3xl leading-snug italic md:text-5xl">{children}</p>
      <footer className="relative mt-6 text-sm text-fog">
        <cite className="not-italic">{quem}</cite> · {quando}
      </footer>
    </blockquote>
  )
}

type FiguraProps = {
  src: string
  alt: string
  width: number
  height: number
  n: number
  legenda: ReactNode
  /** Texto da "barra de endereço" da moldura. */
  url?: string
  className?: string
}

export function Figura({ src, alt, width, height, n, legenda, url = 'seudominio.com', className = '' }: FiguraProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-lg border-2 border-ink bg-white shadow-[6px_6px_0_0_rgba(15,28,51,0.12)]">
        <div className="flex items-center gap-1.5 border-b-2 border-ink bg-white px-3 py-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
          <span className="ml-2 truncate rounded-full bg-surface-alt px-3 py-1 text-xs text-ink/60">{url}</span>
        </div>
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
      <figcaption className="mt-3 flex gap-3 text-sm text-ink/70">
        <span className="shrink-0 font-poster tracking-[0.2em] whitespace-nowrap text-accent">FIG. {n}</span>
        <span>{legenda}</span>
      </figcaption>
    </figure>
  )
}

type ProvaProps = { itens: { rotulo: string; valor: string; nota: string }[] }

/** Números medidos, em destaque — cada um tem que ser verificável no projeto. */
export function Prova({ itens }: ProvaProps) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border-2 border-ink bg-ink sm:grid-cols-3">
      {itens.map((i) => (
        <div key={i.rotulo} className="bg-white p-6">
          <dt className="text-xs font-semibold tracking-[0.2em] text-ink/60 uppercase">{i.rotulo}</dt>
          <dd className="mt-2 font-poster text-6xl leading-none text-accent">{i.valor}</dd>
          <p className="mt-3 text-sm text-ink/75">{i.nota}</p>
        </div>
      ))}
    </dl>
  )
}

type FichaProps = { titulo: string; sintoma: ReactNode; causa: ReactNode; correcao: ReactNode; children?: ReactNode }

/** Um problema real: o que se viu, por que acontecia, o que resolveu. */
export function Ficha({ titulo, sintoma, causa, correcao, children }: FichaProps) {
  const colunas = [
    { rotulo: 'Sintoma', texto: sintoma },
    { rotulo: 'Causa', texto: causa },
    { rotulo: 'Correção', texto: correcao },
  ]
  return (
    <article className="overflow-hidden rounded-2xl border-2 border-ink bg-white">
      <h3 className="border-b-2 border-ink p-5 font-heading text-xl font-semibold text-ink md:text-2xl">{titulo}</h3>
      <dl className="grid divide-y-2 divide-ink md:grid-cols-3 md:divide-x-2 md:divide-y-0">
        {colunas.map((c) => (
          <div key={c.rotulo} className="p-5">
            <dt className="font-poster text-sm tracking-[0.25em] text-accent uppercase">{c.rotulo}</dt>
            <dd className="mt-2 text-ink/75">{c.texto}</dd>
          </div>
        ))}
      </dl>
      {children && <div className="border-t-2 border-ink bg-surface-alt p-5">{children}</div>}
    </article>
  )
}

type MarcosProps = { itens: { data: string; hash: string; texto: string }[] }

/** Linha do tempo com commits reais do repositório (data e hash conferíveis com `git log`). */
export function Marcos({ itens }: MarcosProps) {
  return (
    <ol className="relative max-w-3xl border-l-2 border-ink/20 pl-6">
      {itens.map((m) => (
        <li key={m.hash} className="relative pb-7 last:pb-0">
          <span aria-hidden="true" className="absolute top-1.5 -left-[1.9rem] h-3 w-3 rounded-full border-2 border-accent bg-paper" />
          <p className="font-mono text-sm text-ink/60">
            {m.data} · <span className="text-ink/75">{m.hash}</span>
          </p>
          <p className="mt-1 text-ink/80">{m.texto}</p>
        </li>
      ))}
    </ol>
  )
}

type FormulaProps = { formula: string; legenda: { simbolo: string; significado: string }[]; children?: ReactNode }

export function FormulaBloco({ formula, legenda, children }: FormulaProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-void text-paper">
      <pre className="overflow-x-auto p-6 font-mono text-lg leading-relaxed text-accent-hero md:p-8 md:text-2xl">{formula}</pre>
      <dl className="grid gap-x-8 gap-y-2 border-t border-paper/15 p-6 text-sm text-fog sm:grid-cols-2 md:px-8">
        {legenda.map((l) => (
          <div key={l.simbolo} className="flex gap-3">
            <dt className="w-8 shrink-0 font-mono text-paper">{l.simbolo}</dt>
            <dd>{l.significado}</dd>
          </div>
        ))}
      </dl>
      {children && <div className="border-t border-paper/15 p-6 md:p-8">{children}</div>}
    </div>
  )
}

type CtaProps = { nome: string; url: string; texto: ReactNode }

export function CtaMakingOf({ nome, url, texto }: CtaProps) {
  return (
    <section className="mt-24 bg-void md:mt-32">
      <Reveal className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between md:py-24">
        <div className="max-w-xl">
          <p className="font-poster text-sm tracking-[0.25em] text-accent-hero">VEJA FUNCIONANDO</p>
          <h2 className="mt-3 font-poster text-5xl leading-none tracking-tight text-white uppercase md:text-7xl">
            Abra o {nome}
          </h2>
          <p className="mt-4 text-fog">{texto}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={url} target="_blank" rel="noreferrer" className="btn-ghost">
            Abrir o site ↗
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-ghost">
            Quero um site assim
          </a>
        </div>
      </Reveal>
    </section>
  )
}
