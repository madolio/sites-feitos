import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Habilita as animações de entrada só quando há JS (ver .js .reveal no CSS).
document.documentElement.classList.add('js')

// As fontes só começam a baixar quando algum texto as usa. Carregamos as do tema
// (--font-display e --font-body em index.css) antes de renderizar, no máximo 1s,
// para o texto não refluir quando a fonte real chega. Os nomes vêm do CSS, então
// trocar de fonte não exige mexer aqui. Se a rede falhar, renderiza do mesmo jeito.
const primeiraFamilia = (variavel: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variavel).split(',')[0].trim()
const display = primeiraFamilia('--font-display')
const corpo = primeiraFamilia('--font-body')
const carregarFontes = Promise.all([
  document.fonts.load(`700 1em ${display}`),
  document.fonts.load(`400 1em ${corpo}`),
  document.fonts.load(`600 1em ${corpo}`),
]).catch(() => undefined)

Promise.race([carregarFontes, new Promise((r) => setTimeout(r, 1000))]).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
