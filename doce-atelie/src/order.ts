import { massas, recheios, tamanhos } from './data'

export type Order = {
  size: string | null
  massa: string | null
  recheios: string[]
  date: string
  name: string
  escrita: string
}

export const emptyOrder: Order = { size: null, massa: null, recheios: [], date: '', name: '', escrita: '' }

export const MAX_RECHEIOS = 2
export const LEAD_DAYS = 3

function toInputDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Primeira data aceita pra encomenda (hoje + antecedência mínima), no fuso local. */
export function minDate() {
  const d = new Date()
  d.setDate(d.getDate() + LEAD_DAYS)
  return toInputDate(d)
}

export function formatDate(value: string) {
  const [y, m, d] = value.split('-')
  return y && m && d ? `${d}/${m}/${y}` : ''
}

export function orderMessage(o: Order) {
  const size = tamanhos.find((t) => t.id === o.size)
  const massa = massas.find((m) => m.id === o.massa)
  const chosen = o.recheios.map((id) => recheios.find((r) => r.id === id)?.name).filter(Boolean)

  const lines = [
    'Olá, Doce Ateliê! Quero encomendar um bolo:',
    size && `• Tamanho: ${size.name} (${size.diameter} cm, serve ${size.serves})`,
    massa && `• Massa: ${massa.name}`,
    chosen.length > 0 && `• Recheio: ${chosen.join(' e ')}`,
    o.date && `• Data da festa: ${formatDate(o.date)}`,
    o.escrita.trim() && `• Escrita no bolo: "${o.escrita.trim()}"`,
    '',
    o.name.trim() && `Meu nome é ${o.name.trim()}.`,
  ]

  return lines.filter((line) => line !== false && line !== null && line !== undefined).join('\n').trim()
}
