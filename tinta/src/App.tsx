import Chrome from './components/Chrome'
import DemoDialog from './components/DemoDialog'
import PainelAbertura from './components/PainelAbertura'
import PainelArtistas from './components/PainelArtistas'
import PainelContato from './components/PainelContato'
import PainelProvador from './components/PainelProvador'
import Trilho from './components/Trilho'

export default function App() {
  return (
    <>
      <Chrome />
      <Trilho>
        <PainelAbertura />
        <PainelProvador />
        <PainelArtistas />
        <PainelContato />
      </Trilho>
      <DemoDialog />
    </>
  )
}
