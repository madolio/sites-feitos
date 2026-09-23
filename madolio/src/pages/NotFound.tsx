import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

// O Worker responde 200 com o index.html pra qualquer URL (fallback de SPA).
// Sem esta rota, um endereço inexistente virava uma página vazia indexável
// (soft 404) — aqui ela diz que não existe e pede pra não ser indexada.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-32 text-center">
      <Seo title="Página não encontrada — Madolio" description="Esta página não existe." path="/" noindex />
      <p className="font-poster text-7xl text-accent">404</p>
      <h1 className="mt-4 font-poster text-4xl tracking-tight text-ink uppercase">Página não encontrada</h1>
      <p className="mt-4 text-ink/70">O endereço que você abriu não existe ou mudou de lugar.</p>
      <Link to="/" className="btn-primary mt-8">
        Voltar para o início
      </Link>
    </div>
  )
}
