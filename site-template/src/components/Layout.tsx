import type { ReactNode } from 'react'
import Header from './Header'
import Ledger from './Ledger'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Header />
      <main className="flex-1">{children}</main>
      <Ledger />
    </div>
  )
}
