import type { ReactNode } from 'react'
import StatusBar from './StatusBar'
import Console from './Console'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <StatusBar />
      <main className="flex-1">{children}</main>
      <Console />
    </div>
  )
}
