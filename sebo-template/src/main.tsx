import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// As fontes só começam a baixar quando algum texto as usa. Carregamos as do tema
// (--font-display, --font-body e --font-mao em index.css) antes de renderizar, no
// máximo 1s, para o texto não refluir quando a fonte real chega. Os nomes vêm do
// CSS, então trocar de fonte não exige mexer aqui. Se a rede falhar, renderiza
// do mesmo jeito.
const primeiraFamilia = (variavel: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variavel).split(',')[0].trim()
const display = primeiraFamilia('--font-display')
const corpo = primeiraFamilia('--font-body')
const mao = primeiraFamilia('--font-mao')
const carregarFontes = Promise.all([
  document.fonts.load(`600 1em ${display}`),
  document.fonts.load(`400 1em ${corpo}`),
  document.fonts.load(`600 1em ${corpo}`),
  document.fonts.load(`600 1em ${mao}`),
]).catch(() => undefined)

Promise.race([carregarFontes, new Promise((r) => setTimeout(r, 1000))]).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
