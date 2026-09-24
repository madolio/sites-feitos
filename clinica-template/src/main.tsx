import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Habilita as animações de entrada só quando há JS (ver .js .reveal no CSS).
document.documentElement.classList.add('js')

// As fontes só começam a baixar quando algum texto as usa. Carregamos as usadas
// antes de renderizar (no máximo 1s) para o texto não refluir e a página não
// "pular" quando a fonte real chega. Se a rede falhar, renderiza do mesmo jeito.
const carregarFontes = Promise.all([
  document.fonts.load('400 1em Fraunces'),
  document.fonts.load('italic 300 1em Fraunces'),
  document.fonts.load('400 1em Manrope'),
  document.fonts.load('600 1em Manrope'),
]).catch(() => undefined)

Promise.race([carregarFontes, new Promise((r) => setTimeout(r, 1000))]).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
