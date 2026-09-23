import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
const Projetos = lazy(() => import('./pages/Projetos'))
const CaseStudyCardume = lazy(() => import('./pages/CaseStudyCardume'))
const CaseStudyTorno = lazy(() => import('./pages/CaseStudyTorno'))
const CaseStudyEncaixe = lazy(() => import('./pages/CaseStudyEncaixe'))
const CaseStudyCalibre = lazy(() => import('./pages/CaseStudyCalibre'))
const CaseStudyTaca = lazy(() => import('./pages/CaseStudyTaca'))
const CaseStudyRealce = lazy(() => import('./pages/CaseStudyRealce'))
const CaseStudyLumen = lazy(() => import('./pages/CaseStudyLumen'))
const CaseStudyPrisma = lazy(() => import('./pages/CaseStudyPrisma'))
const CaseStudyMarcha = lazy(() => import('./pages/CaseStudyMarcha'))
const CaseStudyBruma = lazy(() => import('./pages/CaseStudyBruma'))
const CaseStudyEstufa = lazy(() => import('./pages/CaseStudyEstufa'))

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
        <Route path="/projetos/estufa" element={<CaseStudyEstufa />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
