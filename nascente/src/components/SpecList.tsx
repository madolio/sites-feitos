import type { Product } from '../data/products'
import ProductGlyph from './ProductGlyph'

export default function SpecList({ items }: { items: Product[] }) {
  return (
    <ul className="space-y-8 border-t border-ink/15">
      {items.map((product) => (
        <li
          key={product.name}
          className="grid gap-6 border-b border-ink/15 py-8 md:grid-cols-[12rem_minmax(0,1fr)_12rem] md:gap-10 lg:grid-cols-[14rem_minmax(0,1.5fr)_14rem]"
        >
          <div className="flex items-center justify-center rounded-xl border border-ink/10 bg-surface-alt md:row-span-3">
            <ProductGlyph kind={product.glyph} className="h-24 w-24" />
          </div>

          <div className="md:col-start-2">
            <h3 className="text-2xl font-bold leading-tight text-ink">
              {product.name}
            </h3>
            <p className="mt-3 max-w-prose text-ink/70 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.spec && (
            <p className="md:col-start-3 md:text-right">
              <span className="block text-3xl font-bold text-ink tabular-nums">
                {product.spec.value}
              </span>
              <span className="text-sm text-ink/75">{product.spec.label}</span>
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
