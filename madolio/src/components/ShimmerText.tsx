import type { ReactNode } from 'react'

type ShimmerTextProps = {
  children: ReactNode
  className?: string
}

export default function ShimmerText({ children, className = '' }: ShimmerTextProps) {
  return <span className={`shimmer-text ${className}`}>{children}</span>
}
