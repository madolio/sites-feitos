export type Vinho = {
  nome: string
  uva: string
  safra: string
  notas: string
  aPartirDe: string
  /** Cor do vinho — usada só como um selo pequeno ao lado do nome. */
  cor: string
  /** Altitude do talhão onde esse rótulo é colhido, em metros. */
  altitude: number
  /** Categorias da roda de aromas (RodaAromas.tsx) — extraídas do texto de
   * `notas`, não um dado novo inventado: cada tag corresponde a algo que já
   * está escrito na descrição do próprio rótulo. */
  aromas: string[]
}

export const vinhos: Vinho[] = [
  {
    nome: 'Talhão Sul',
    uva: 'Merlot e Cabernet Franc',
    safra: 'safra 2022',
    notas: 'Fruta escura madura e uma ponta de pimenta — o mais encorpado da casa, pensado pra respirar bem antes de servir.',
    aPartirDe: 'a partir de R$ 145',
    cor: '#5a0e24',
    altitude: 980,
    aromas: ['Fruta escura', 'Especiado'],
  },
  {
    nome: 'Encosta Brut',
    uva: 'Chardonnay e Pinot Noir',
    safra: 'safra 2023',
    notas: 'Espumante método tradicional, 18 meses sobre borras — perlage fina, final seco.',
    aPartirDe: 'a partir de R$ 168',
    cor: '#d9c87e',
    altitude: 1090,
    aromas: ['Torrado', 'Cítrico'],
  },
  {
    nome: 'Névoa',
    uva: 'Sauvignon Blanc',
    safra: 'safra 2023',
    notas: 'Cítrico e mineral, colhido de madrugada — o frio da altitude segura a acidez que dá o nome ao rótulo.',
    aPartirDe: 'a partir de R$ 118',
    cor: '#cbb355',
    altitude: 1180,
    aromas: ['Cítrico', 'Mineral'],
  },
  {
    nome: 'Reserva do Talhador',
    uva: 'Cabernet Franc',
    safra: 'safra 2020',
    notas: '14 meses em carvalho francês — o único rótulo da casa que sai só em anos de safra boa o bastante pra guardar.',
    aPartirDe: 'a partir de R$ 210',
    cor: '#3a0713',
    altitude: 1240,
    aromas: ['Amadeirado', 'Especiado'],
  },
]
