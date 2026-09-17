import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import CaseStudyCardume from './pages/CaseStudyCardume'
import CaseStudyTorno from './pages/CaseStudyTorno'
import CaseStudyEncaixe from './pages/CaseStudyEncaixe'
import CaseStudyCalibre from './pages/CaseStudyCalibre'
import CaseStudyTaca from './pages/CaseStudyTaca'
import CaseStudyRealce from './pages/CaseStudyRealce'
import CaseStudyLumen from './pages/CaseStudyLumen'
import CaseStudyPrisma from './pages/CaseStudyPrisma'
import CaseStudyMarcha from './pages/CaseStudyMarcha'
import CaseStudyBruma from './pages/CaseStudyBruma'
import Reel from './pages/Reel'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/cardume" element={<CaseStudyCardume />} />
        <Route path="/projetos/torno" element={<CaseStudyTorno />} />
        <Route path="/projetos/encaixe" element={<CaseStudyEncaixe />} />
        <Route path="/projetos/calibre" element={<CaseStudyCalibre />} />
        <Route path="/projetos/taca" element={<CaseStudyTaca />} />
        <Route path="/projetos/realce" element={<CaseStudyRealce />} />
        <Route path="/projetos/lumen" element={<CaseStudyLumen />} />
        <Route path="/projetos/prisma" element={<CaseStudyPrisma />} />
        <Route path="/projetos/marcha" element={<CaseStudyMarcha />} />
        <Route path="/projetos/bruma" element={<CaseStudyBruma />} />
        <Route path="/reel" element={<Reel />} />
      </Route>
    </Routes>
  )
}
