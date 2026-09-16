// Cliente fino da Places API (New) da Google — só o que o app usa: busca
// por texto (com viés de localização opcional) e o campo `websiteUri`, que
// é o próprio sinal de "tem site ou não" sem precisar de scraping.

export type Lugar = {
  id: string
  nome: string
  endereco: string
  telefone?: string
  site?: string
  mapsUri?: string
  lat: number
  lng: number
}

const CAMPOS = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.websiteUri',
  'places.internationalPhoneNumber',
  'places.googleMapsUri',
  'places.location',
].join(',')

export type BuscaOpts = {
  query: string
  apiKey: string
  /** Viés de localização opcional — centro + raio em metros. */
  centro?: { lat: number; lng: number; raioM: number }
}

export class ErroPlaces extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

export async function buscarLugares({ query, apiKey, centro }: BuscaOpts): Promise<Lugar[]> {
  const body: Record<string, unknown> = {
    textQuery: query,
    languageCode: 'pt-BR',
    pageSize: 20,
  }
  if (centro) {
    body.locationBias = {
      circle: {
        center: { latitude: centro.lat, longitude: centro.lng },
        radius: centro.raioM,
      },
    }
  }

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': CAMPOS,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detalhe = await res.json().catch(() => null)
    const msg = (detalhe as { error?: { message?: string } } | null)?.error?.message
    throw new ErroPlaces(msg || `Erro ${res.status} na Places API`, res.status)
  }

  const data = (await res.json()) as {
    places?: Array<{
      id: string
      displayName?: { text?: string }
      formattedAddress?: string
      websiteUri?: string
      internationalPhoneNumber?: string
      googleMapsUri?: string
      location?: { latitude: number; longitude: number }
    }>
  }

  return (data.places ?? []).map((p) => ({
    id: p.id,
    nome: p.displayName?.text ?? '(sem nome)',
    endereco: p.formattedAddress ?? '',
    telefone: p.internationalPhoneNumber,
    site: p.websiteUri,
    mapsUri: p.googleMapsUri,
    lat: p.location?.latitude ?? 0,
    lng: p.location?.longitude ?? 0,
  }))
}

export function telefoneParaWhatsApp(telefone: string): string {
  return telefone.replace(/[^\d]/g, '')
}
