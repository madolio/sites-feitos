// Dado real de astronomia por trás de cada sessão — não nome bonito solto.
// Fontes: efemérides de fase lunar e distância orbital (dado público de
// posição da Lua), catálogo Messier (SEDS/NASA), e calendário de chuvas de
// meteoros da IMO (International Meteor Organization) para o pico anual.

export type Sessao = {
  nome: string
  slug: string
  duracao: string
  dado: string
  detalhe: string
  publico: string
}

export const sessoes: Sessao[] = [
  {
    nome: 'Observação lunar',
    slug: 'lua',
    duracao: '1h30',
    dado: 'Distância média: 384.400 km',
    detalhe:
      'Em quarto crescente ou minguante, a linha do terminadouro (fronteira entre luz e sombra) projeta sombras longas nas crateras — é quando os relevos ficam mais nítidos na ocular, ao contrário da lua cheia, que achata tudo.',
    publico: 'Todas as idades',
  },
  {
    nome: 'Aglomerados e nebulosas',
    slug: 'ceu-profundo',
    duracao: '2h',
    dado: 'M13: magnitude 5,8 · 22.200 anos-luz',
    detalhe:
      'O Grande Aglomerado de Hércules (M13) tem cerca de 300 mil estrelas concentradas num diâmetro real de ~145 anos-luz. A olho nu já aparece como um borrão fraco; no telescópio, resolve em pontos individuais.',
    publico: 'A partir de 10 anos',
  },
  {
    nome: 'Chuva de meteoros — Eta Aquáridas',
    slug: 'eta-aquaridas',
    duracao: '3h (madrugada)',
    dado: 'Pico: 5–6 de maio · taxa ~50/h',
    detalhe:
      'Poeira deixada pelo cometa Halley entrando na atmosfera a ~66 km/s. É a chuva mais forte do ano bem posicionada pro hemisfério sul — o radiante nasce de madrugada, então a sessão começa depois da meia-noite.',
    publico: 'Adultos e famílias dispostas a virar a noite',
  },
  {
    nome: 'Chuva de meteoros — Geminídeas',
    slug: 'geminidas',
    duracao: '3h (madrugada)',
    dado: 'Pico: 13–14 de dezembro · taxa ~120/h',
    detalhe:
      'A mais intensa do calendário, originada não de um cometa mas do asteroide 3200 Phaethon. No hemisfério sul o radiante fica baixo, mas em noite sem lua ainda é a chuva mais generosa do ano vista daqui.',
    publico: 'Adultos e famílias dispostas a virar a noite',
  },
  {
    nome: 'Sessão infantil',
    slug: 'infantil',
    duracao: '1h',
    dado: 'Saturno: anéis com ~282.000 km de diâmetro',
    detalhe:
      'Foco garantido nos anéis de Saturno — o objeto que mais surpreende quem olha pela primeira vez numa ocular — e nas quatro luas galileanas de Júpiter, visíveis como pontinhos alinhados mesmo em telescópio pequeno.',
    publico: '5 a 12 anos, acompanhados',
  },
  {
    nome: 'Aluguel de equipamento',
    slug: 'aluguel',
    duracao: 'Fim de semana (2 noites)',
    dado: 'Refrator 90mm ou dobsoniano 150mm',
    detalhe:
      'Telescópio calibrado, colimado e com carta celeste impressa pro período, pra observar por conta própria em casa ou em outro ponto de observação. Inclui 20 minutos de instrução de foco e enquadramento antes da retirada.',
    publico: 'Quem já fez ao menos uma sessão guiada',
  },
]
