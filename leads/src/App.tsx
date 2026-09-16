import { useState } from 'react'
import { ConfigChave } from './components/ConfigChave'
import { FormBusca, type ParametrosBusca } from './components/FormBusca'
import { CartaoLugar } from './components/CartaoLugar'
import { lerChave, salvarChave, limparChave } from './chave'
import { buscarLugares, ErroPlaces, type Lugar } from './places'

function obterLocalizacao(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não disponível neste navegador.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => reject(new Error('Não foi possível obter sua localização. Verifique a permissão do navegador.')),
      { timeout: 10000 },
    )
  })
}

export default function App() {
  const [chave, setChave] = useState(lerChave())
  const [lugares, setLugares] = useState<Lugar[] | null>(null)
  const [buscando, setBuscando] = useState(false)
  const [erro, setErro] = useState('')
  const [soSemSite, setSoSemSite] = useState(true)

  if (!chave) {
    return (
      <ConfigChave
        chaveAtual=""
        onSalvar={(v) => {
          salvarChave(v)
          setChave(v)
        }}
      />
    )
  }

  async function buscar(p: ParametrosBusca) {
    setBuscando(true)
    setErro('')
    try {
      let centro: { lat: number; lng: number; raioM: number } | undefined
      if (p.usarLocalizacao) {
        const pos = await obterLocalizacao()
        centro = { ...pos, raioM: p.raioM }
      }
      const resultado = await buscarLugares({ query: p.query, apiKey: chave, centro })
      setLugares(resultado)
    } catch (e) {
      if (e instanceof ErroPlaces) {
        setErro(
          e.status === 403 || e.status === 401
            ? 'Chave rejeitada pela Google — confira se a "Places API (New)" está ativada e a chave está correta.'
            : e.message,
        )
      } else {
        setErro(e instanceof Error ? e.message : 'Erro desconhecido na busca.')
      }
      setLugares(null)
    } finally {
      setBuscando(false)
    }
  }

  const filtrados = lugares ? (soSemSite ? lugares.filter((l) => !l.site) : lugares) : null

  return (
    <div className="mx-auto max-w-md px-5 py-8">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-xl font-semibold text-tinta">Leads Madolio</h1>
        <button
          className="text-xs text-cinza underline"
          onClick={() => {
            limparChave()
            setChave('')
          }}
        >
          trocar chave
        </button>
      </div>
      <p className="mt-1 text-sm text-cinza">Busque negócios locais e veja quem ainda não tem site.</p>

      <div className="mt-5">
        <FormBusca buscando={buscando} onBuscar={buscar} />
      </div>

      {erro && <p className="mt-4 rounded-lg bg-acento/10 px-4 py-3 text-sm text-acento">{erro}</p>}

      {filtrados && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-cinza">
              {filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}
            </p>
            <label className="flex items-center gap-2 text-sm text-cinza">
              <input type="checkbox" checked={soSemSite} onChange={(e) => setSoSemSite(e.target.checked)} />
              só sem site
            </label>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            {filtrados.map((l) => (
              <CartaoLugar key={l.id} lugar={l} />
            ))}
            {filtrados.length === 0 && <p className="text-sm text-cinza">Nenhum resultado com esse filtro.</p>}
          </div>
        </>
      )}
    </div>
  )
}
