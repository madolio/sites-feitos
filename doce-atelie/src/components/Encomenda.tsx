import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { massas, recheios, tamanhos, type Flavor } from '../data'
import { sendToWhatsApp } from '../demo'
import { MAX_RECHEIOS, minDate, orderMessage, type Order } from '../order'
import CakeSlice from './CakeSlice'
import Stepper from './Stepper'

type EncomendaProps = {
  order: Order
  setOrder: Dispatch<SetStateAction<Order>>
}

export default function Encomenda({ order, setOrder }: EncomendaProps) {
  const earliest = minDate()

  const canAdvance = (step: number) => {
    if (step === 1) return order.size !== null
    if (step === 2) return order.massa !== null
    if (step === 3) return order.recheios.length > 0
    return order.date >= earliest && order.name.trim().length > 1
  }

  const toggleRecheio = (id: string) =>
    setOrder((o) => {
      if (o.recheios.includes(id)) return { ...o, recheios: o.recheios.filter((r) => r !== id) }
      if (o.recheios.length >= MAX_RECHEIOS) return o
      return { ...o, recheios: [...o.recheios, id] }
    })

  return (
    <section id="encomenda" className="scroll-mt-16 bg-ink py-20 text-card md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="display text-5xl md:text-7xl">Monte a encomenda</h2>
        <p className="mt-5 max-w-lg text-lg text-card/75">
          Quatro escolhas e o pedido sai escrito pro WhatsApp. O corte do bolo
          muda conforme você escolhe.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <Stepper
            labels={['Tamanho', 'Massa', 'Recheio', 'Data']}
            canAdvance={canAdvance}
            completeLabel="Enviar pedido"
            onComplete={() => sendToWhatsApp(orderMessage(order))}
          >
            <Fieldset legend="Pra quantas pessoas?">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {tamanhos.map((t) => (
                  <Option
                    key={t.id}
                    name="tamanho"
                    checked={order.size === t.id}
                    onChange={() => setOrder((o) => ({ ...o, size: t.id }))}
                  >
                    <span className="flex h-16 items-center">
                      <span
                        className="block rounded-full border-2 border-ink/70 bg-[#fbf1e3]"
                        style={{ width: t.diameter * 2.4, height: t.diameter * 2.4 }}
                      />
                    </span>
                    <span className="mt-3 block font-semibold">{t.name}</span>
                    <span className="block text-sm text-ink/65">
                      {t.diameter} cm, serve {t.serves}
                    </span>
                  </Option>
                ))}
              </div>
            </Fieldset>

            <Fieldset legend="Escolha a massa">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {massas.map((m) => (
                  <FlavorOption
                    key={m.id}
                    type="radio"
                    name="massa"
                    flavor={m}
                    checked={order.massa === m.id}
                    onChange={() => setOrder((o) => ({ ...o, massa: m.id }))}
                  />
                ))}
              </div>
            </Fieldset>

            <Fieldset
              legend="Escolha até dois recheios"
              hint={`${order.recheios.length} de ${MAX_RECHEIOS} escolhidos`}
            >
              <div className="grid gap-2.5 sm:grid-cols-2">
                {recheios.map((r) => {
                  const checked = order.recheios.includes(r.id)
                  return (
                    <FlavorOption
                      key={r.id}
                      type="checkbox"
                      name="recheio"
                      flavor={r}
                      checked={checked}
                      disabled={!checked && order.recheios.length >= MAX_RECHEIOS}
                      onChange={() => toggleRecheio(r.id)}
                    />
                  )
                })}
              </div>
            </Fieldset>

            <Fieldset legend="Quando é a festa?">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Data da festa</span>
                  <input
                    type="date"
                    min={earliest}
                    value={order.date}
                    onChange={(e) => setOrder((o) => ({ ...o, date: e.target.value }))}
                    className="field mt-1.5"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Seu nome</span>
                  <input
                    type="text"
                    autoComplete="given-name"
                    value={order.name}
                    onChange={(e) => setOrder((o) => ({ ...o, name: e.target.value }))}
                    className="field mt-1.5"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-semibold">
                    Escrita no bolo <span className="font-normal text-ink/65">(opcional)</span>
                  </span>
                  <input
                    type="text"
                    maxLength={40}
                    placeholder="Feliz 7 anos, Lia"
                    value={order.escrita}
                    onChange={(e) => setOrder((o) => ({ ...o, escrita: e.target.value }))}
                    className="field mt-1.5"
                  />
                </label>
              </div>
              <p className="mt-4 text-sm text-ink/65">
                Encomendas com pelo menos 3 dias de antecedência. A data só fica
                garantida depois do sinal.
              </p>
            </Fieldset>
          </Stepper>

          <div className="lg:sticky lg:top-24">
            <p className="mb-2 text-sm font-semibold text-card/70">Corte do seu bolo</p>
            <CakeSlice order={order} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Fieldset({ legend, hint, children }: { legend: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="display text-3xl">{legend}</legend>
      {hint && <p className="mt-1 text-sm tabular-nums text-ink/65">{hint}</p>}
      <div className="mt-5">{children}</div>
    </fieldset>
  )
}

function Option({
  name,
  checked,
  onChange,
  children,
}: {
  name: string
  checked: boolean
  onChange: () => void
  children: ReactNode
}) {
  return (
    <label
      className={`block cursor-pointer rounded-xl border p-3 transition-colors sm:p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cherry ${
        checked ? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]' : 'border-line hover:border-ink/40'
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  )
}

function FlavorOption({
  type,
  name,
  flavor,
  checked,
  disabled = false,
  onChange,
}: {
  type: 'radio' | 'checkbox'
  name: string
  flavor: Flavor
  checked: boolean
  disabled?: boolean
  onChange: () => void
}) {
  return (
    <label
      className={`flex items-stretch overflow-hidden rounded-xl border transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cherry ${
        checked
          ? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
          : disabled
            ? 'cursor-not-allowed border-line opacity-45'
            : 'cursor-pointer border-line hover:border-ink/40'
      }`}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
      <span className="w-12 shrink-0" style={{ background: flavor.color }} />
      <span className="min-w-0 px-3.5 py-3">
        <span className="block text-xs font-semibold tabular-nums text-ink/65">{flavor.code}</span>
        <span className="block font-semibold leading-tight">{flavor.name}</span>
        <span className="mt-0.5 block text-sm leading-snug text-ink/65">{flavor.description}</span>
      </span>
    </label>
  )
}
