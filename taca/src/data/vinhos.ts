export type Vinho = {
  nome: string
  uva: string
  safra: string
  notas: string
  aPartirDe: string
}

export const vinhos: Vinho[] = [
  {
    nome: 'Talhão Sul',
    uva: 'Merlot e Cabernet Franc',
    safra: 'safra 2022',
    notas: 'Fruta escura madura e uma ponta de pimenta — o mais encorpado da casa, pensado pra respirar bem antes de servir.',
    aPartirDe: 'a partir de R$ 145',
  },
  {
    nome: 'Névoa',
    uva: 'Sauvignon Blanc',
    safra: 'safra 2023',
    notas: 'Cítrico e mineral, colhido de madrugada — o frio da altitude segura a acidez que dá o nome ao rótulo.',
    aPartirDe: 'a partir de R$ 118',
  },
  {
    nome: 'Encosta Brut',
    uva: 'Chardonnay e Pinot Noir',
    safra: 'safra 2023',
    notas: 'Espumante método tradicional, 18 meses sobre borras — perlage fina, final seco.',
    aPartirDe: 'a partir de R$ 168',
  },
  {
    nome: 'Reserva do Talhador',
    uva: 'Cabernet Franc',
    safra: 'safra 2020',
    notas: '14 meses em carvalho francês — o único rótulo da casa que sai só em anos de safra boa o bastante pra guardar.',
    aPartirDe: 'a partir de R$ 210',
  },
]
