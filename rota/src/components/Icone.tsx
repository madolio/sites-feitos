type Tipo = 'painel' | 'rotas' | 'frota' | 'entregas' | 'config'

export default function Icone({ tipo, className = '' }: { tipo: Tipo; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {tipo === 'painel' && (
        <>
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="5" rx="1.5" />
          <rect x="13" y="10" width="8" height="11" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </>
      )}
      {tipo === 'rotas' && (
        <>
          <circle cx="6" cy="18" r="2.2" />
          <circle cx="18" cy="6" r="2.2" />
          <path d="M6 15.8V13a5 5 0 0 1 5-5h2a5 5 0 0 0 5-5" />
        </>
      )}
      {tipo === 'frota' && (
        <>
          <path d="M3 16V9a1 1 0 0 1 1-1h9v8" />
          <path d="M13 11h4l3 3v2" />
          <circle cx="7" cy="17.5" r="1.8" />
          <circle cx="17" cy="17.5" r="1.8" />
        </>
      )}
      {tipo === 'entregas' && (
        <>
          <path d="M4 8l8-4 8 4-8 4-8-4z" />
          <path d="M4 8v8l8 4 8-4V8" />
          <path d="M12 12v8" />
        </>
      )}
      {tipo === 'config' && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.4-2-3.4-2.3.8a7 7 0 0 0-2-1.2L14.2 3H9.8l-.4 2.6a7 7 0 0 0-2 1.2l-2.3-.8-2 3.4 2 1.4A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.4 2 3.4 2.3-.8a7 7 0 0 0 2 1.2l.4 2.6h4.4l.4-2.6a7 7 0 0 0 2-1.2l2.3.8 2-3.4-2-1.4c.1-.4.1-.8.1-1.2z" />
        </>
      )}
    </svg>
  )
}
