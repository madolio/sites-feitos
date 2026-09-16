// Substitui as setinhas nativas de <input type="number"> (inconsistentes
// entre navegadores e feias em qualquer tema escuro) por um stepper
// desenhado no tema do site — o número continua editável por teclado, e os
// dois botões dão o mesmo incremento/decremento que a seta nativa dava.
export function CampoNumero({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v))

  return (
    <label className="flex flex-col gap-2 text-sm text-fumo">
      {label}
      <div className="flex items-stretch rounded-full border border-fio bg-carvao focus-within:border-acento">
        <button
          type="button"
          aria-label={`Diminuir ${label}`}
          onClick={() => onChange(clamp(value - step))}
          className="w-11 shrink-0 rounded-l-full text-lg text-marfim transition hover:bg-fio/40"
        >
          −
        </button>
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
          className="campo-numero w-full min-w-0 flex-1 bg-transparent px-3 py-3 text-center text-marfim outline-none"
        />
        <button
          type="button"
          aria-label={`Aumentar ${label}`}
          onClick={() => onChange(clamp(value + step))}
          className="w-11 shrink-0 rounded-r-full text-lg text-marfim transition hover:bg-fio/40"
        >
          +
        </button>
      </div>
    </label>
  )
}
