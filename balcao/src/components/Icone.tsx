import type { Item } from '../data/cardapio'

// Um glifo por item — nunca foto de comida.
export default function Icone({ tipo, className = '' }: { tipo: Item['glifo']; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {tipo === 'burger' && (
        <>
          <path d="M10 26c0-8 10-14 22-14s22 6 22 14z" />
          <line x1="8" y1="30" x2="56" y2="30" />
          <line x1="10" y1="38" x2="54" y2="38" />
          <path d="M8 46c0 4 4 6 24 6s24-2 24-6" />
        </>
      )}
      {tipo === 'wrap' && (
        <>
          <path d="M20 12c14 2 24 12 26 26-10 4-24 2-30-8-6-10-2-18 4-18z" />
          <path d="M18 40l-6 12 12-4" />
        </>
      )}
      {tipo === 'copo' && (
        <>
          <path d="M18 14h28l-4 38a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z" />
          <path d="M22 24h20" />
        </>
      )}
      {tipo === 'lata' && (
        <>
          <rect x="20" y="10" width="24" height="44" rx="4" />
          <path d="M20 20h24M20 44h24" />
        </>
      )}
      {tipo === 'doce' && (
        <>
          <path d="M14 28h36l-4 22a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z" />
          <path d="M14 28c0-8 8-14 18-14s18 6 18 14" />
        </>
      )}
      {tipo === 'combo' && (
        <>
          <path d="M12 30c0-6 8-11 17-11s17 5 17 11z" />
          <line x1="10" y1="33" x2="46" y2="33" />
          <rect x="40" y="16" width="14" height="34" rx="3" />
        </>
      )}
    </svg>
  )
}
