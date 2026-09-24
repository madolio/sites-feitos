// ============================================================================
// PONTO ÚNICO DE PERSONALIZAÇÃO
// Troque os valores abaixo para reaproveitar o template com outro cliente.
// Cores: edite o bloco @theme em src/index.css. Textos por seção: src/data/.
// Imagens: src/config/images.ts. Tudo aqui é FICTÍCIO (site-modelo).
// ============================================================================

export const site = {
  /** Nome exibido no logo e no rodapé. */
  name: 'Serena',
  /** Linha pequena abaixo do nome no logo. */
  descriptor: 'Clínica & Bem-estar',
  /** Letra grande decorativa (CTA final e logo). */
  initial: 'S',
  /** Título e descrição usados no <head> (index.html deve refletir os mesmos). */
  tagline: 'Cuidado que começa por ouvir.',
  /** Profissional/responsável principal (aparece no hero). */
  lead: { name: 'Dra. Helena Duarte', role: 'Diretora clínica' },
  /** Formato "sem máscara" para wa.me: DDI + DDD + número. */
  whatsapp: '5500000000000',
  whatsappLabel: '(00) 00000-0000',
  whatsappMessage: 'Olá! Gostaria de agendar uma avaliação.',
  phone: '(00) 0000-0000',
  email: 'contato@seudominio.com.br',
  instagram: { handle: '@suaclinica', url: 'https://instagram.com/' },
  address: {
    line1: 'Rua do Exemplo, 123 · sala 45',
    line2: 'Bairro Modelo · Cidade — UF',
    zip: '00000-000',
  },
  hours: [
    { days: 'Segunda a sexta', time: '08h às 19h' },
    { days: 'Sábado', time: '08h às 13h' },
  ],
} as const

export const whatsappUrl = (mensagem: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`

/** Itens do menu: `href` é sempre uma âncora de seção. */
export const nav = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Cuidados', href: '#cuidados' },
  { label: 'Método', href: '#metodo' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Perguntas', href: '#perguntas' },
] as const
