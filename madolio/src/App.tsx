import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import Reels from './pages/Reels'
import CaseStudyCardume from './pages/CaseStudyCardume'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/cardume" element={<CaseStudyCardume />} />
      </Route>
      {/* Fora do Layout de propósito: Reels é tela cheia, sem o Chrome fixo
          (logo+WhatsApp) nem o Footer do resto do site — como abrir um app
          separado, não uma página institucional a mais. */}
      <Route path="/reels" element={<Reels />} />
    </Routes>
  )
}
