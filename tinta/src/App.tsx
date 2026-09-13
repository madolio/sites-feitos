import Chrome from './components/Chrome'
import DemoDialog from './components/DemoDialog'
import PainelAbertura from './components/PainelAbertura'
import PainelArtistas from './components/PainelArtistas'
import PainelContato from './components/PainelContato'
import PainelFlashes from './components/PainelFlashes'
import Trilho from './components/Trilho'

export default function App() {
  return (
    <>
      <Chrome />
      <Trilho>
        <PainelAbertura />
        <PainelFlashes />
        <PainelArtistas />
        <PainelContato />
      </Trilho>
      <DemoDialog />
    </>
  )
}
