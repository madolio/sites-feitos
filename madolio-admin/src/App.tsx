import { useCallback, useEffect, useState } from 'react'
import Acesso from './components/Acesso'
import Painel from './components/Painel'
import { buscarMetricas, ErroApi, type Metrica } from './data/api'
import { lerChave, limparChave, salvarChave } from './data/chave'

export default function App() {
  const [chave, setChave] = useState<string | null>(() => lerChave())
  const [metricas, setMetricas] = useState<Metrica[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const carregar = useCallback(async (chaveAtual: string) => {
    setCarregando(true)
    setErro(null)
    try {
      const dados = await buscarMetricas(chaveAtual)
      setMetricas(dados)
    } catch (e) {
      if (e instanceof ErroApi && e.status === 401) {
        limparChave()
        setChave(null)
      }
      setErro(e instanceof Error ? e.message : 'Erro desconhecido')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    if (chave) carregar(chave)
  }, [chave, carregar])

  if (!chave) {
    return (
      <Acesso
        erro={erro}
        onEntrar={(novaChave) => {
          salvarChave(novaChave)
          setChave(novaChave)
        }}
      />
    )
  }

  if (!metricas) {
    return (
      <div className="flex min-h-svh items-center justify-center text-fumo">
        {carregando ? 'Carregando…' : erro || 'Sem dados'}
      </div>
    )
  }

  return (
    <Painel
      metricas={metricas}
      atualizando={carregando}
      onAtualizar={() => carregar(chave)}
      onSair={() => {
        limparChave()
        setChave(null)
        setMetricas(null)
      }}
    />
  )
}
