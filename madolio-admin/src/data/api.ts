export type Metrica = {
  site: string
  visitas: number
  deploys: number
  ultimoDeploy: string | null
  ultimaVisita: string | null
}

export class ErroApi extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

export async function buscarMetricas(chave: string): Promise<Metrica[]> {
  const res = await fetch('/api/metricas', {
    headers: { 'x-admin-key': chave },
  })
  if (!res.ok) throw new ErroApi(res.status === 401 ? 'Senha incorreta' : 'Falha ao buscar métricas', res.status)
  const data = (await res.json()) as { metricas: Metrica[] }
  return data.metricas
}
