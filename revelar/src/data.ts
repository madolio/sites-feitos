// Revelar é um estúdio fictício — conceito de site da Madolio pro nicho de
// fotografia (casamento/ensaio). Sem fotos de verdade (não existe cliente
// real) — cada quadro do contact sheet é ilustrado, não fotografado.

export type Frame = {
  numero: string
  tipo: 'casamento' | 'ensaio' | 'evento' | 'corporativo' | 'produto' | 'still'
  titulo: string
  texto: string
}

export const frames: Frame[] = [
  { numero: '01A', tipo: 'casamento', titulo: 'Casamento', texto: 'Cerimônia e festa, cobertura completa do "sim" ao último brinde.' },
  { numero: '02A', tipo: 'ensaio', titulo: 'Ensaio de casal', texto: 'Pré-wedding ou aniversário — externa, golden hour, sem pose forçada.' },
  { numero: '03A', tipo: 'evento', titulo: 'Eventos', texto: 'Aniversário, formatura, confraternização — registro discreto, sem posar.' },
  { numero: '04A', tipo: 'corporativo', titulo: 'Retrato corporativo', texto: 'Fotos de equipe e liderança pro site e pro LinkedIn, num dia só.' },
  { numero: '05A', tipo: 'produto', titulo: 'Still de produto', texto: 'Catálogo e e-commerce, com luz consistente entre as fotos.' },
  { numero: '06A', tipo: 'still', titulo: 'Ensaio still', texto: 'Composições de still-life pra marca, capa de álbum ou editorial.' },
]

export const pacotes = [
  { nome: 'Essencial', horas: '4h', entregas: '150 fotos tratadas', preco: 'R$ 1.800' },
  { nome: 'Completo', horas: '8h', entregas: '400 fotos tratadas + álbum', preco: 'R$ 3.200' },
  { nome: 'Sob medida', horas: 'a combinar', entregas: 'escopo definido com você', preco: 'sob consulta' },
]
