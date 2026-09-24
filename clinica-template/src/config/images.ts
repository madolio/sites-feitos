// Todas as imagens do template em um lugar só. Para trocar por fotos do
// cliente, basta apontar para arquivos em /public (ex.: '/fotos/hero.jpg') ou
// outra URL. `alt` descreve a foto para leitores de tela.
const px = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const images = {
  hero: { src: px(3714743, 1000), alt: 'Profissional de saúde de jaleco branco, de perfil, sorrindo' },
  ambiente: { src: px(16571732, 1000), alt: 'Sala de atendimento clara e moderna da clínica' },
  cuidado1: { src: px(19242406), alt: 'Aplicação de sérum na pele durante um cuidado facial' },
  cuidado2: { src: px(3738349), alt: 'Cuidado facial com massagem suave' },
  cuidado3: { src: px(5069612), alt: 'Paciente relaxada durante um procedimento com equipamento moderno' },
  equipe1: { src: px(6749773, 800), alt: 'Médica de jaleco branco com estetoscópio' },
  equipe2: { src: px(7904416, 800), alt: 'Profissional sorridente em sua mesa de atendimento' },
} as const
