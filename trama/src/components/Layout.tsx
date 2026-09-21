import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import DemoDialog from './DemoDialog'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="topo" className="flex min-h-screen flex-col bg-cru text-carvao">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <DemoDialog />
    </div>
  )
}
