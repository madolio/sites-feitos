// Extraído de Nav.tsx (removido na reestruturação do trilho) porque o Footer
// também usa a marca — não faz sentido a marca "morar" dentro do componente
// de navegação.
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" fill="#f2b300" />
      <rect x="19" y="3" width="15" height="15" fill="#2c4fa3" />
      <path d="M3 34 L18 19 L18 34 Z" fill="#d63c3c" />
      <rect x="21" y="21" width="13" height="13" fill="#1d1b26" />
    </svg>
  )
}
