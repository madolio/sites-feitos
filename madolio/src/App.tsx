import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import CaseStudyCardume from './pages/CaseStudyCardume'
import Reel from './pages/Reel'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/cardume" element={<CaseStudyCardume />} />
        <Route path="/reel" element={<Reel />} />
      </Route>
    </Routes>
  )
}
