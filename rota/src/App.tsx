import DemoDialog from './components/DemoDialog'
import Painel from './components/Painel'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <>
      <Sidebar />
      <main className="pt-14 lg:pt-0 lg:pl-60">
        <Painel />
      </main>
      <DemoDialog />
    </>
  )
}
