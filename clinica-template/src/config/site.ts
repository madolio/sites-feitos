// ============================================================================
// IDENTIDADE E CONTATOS DO CLIENTE  (1º arquivo a editar)
// "Serena" é só conteúdo demonstrativo: troque tudo abaixo para outro cliente.
// Outros arquivos de personalização:
//   src/data/conteudo.ts  textos, serviços, equipe, relatos, FAQ, rótulos
//   src/config/images.ts  fotos
//   src/index.css         cores (bloco @theme)
// ============================================================================

export const site = {
  // --- Identidade ---------------------------------------------------------
  name: 'Serena',
  descriptor: 'Clínica & Bem-estar',
  /** Letra do logo e da marca d'água do CTA. Também gera o favicon. */
  initial: 'S',
  tagline: 'Cuidado que começa por ouvir.',
  /** Logo em imagem (opcional). Ex.: { src: '/logo.svg', alt: 'Serena' }.
   *  Se ficar `null`, o logo é a letra em círculo + nome. */
  logo: null as { src: string; alt: string } | null,

  // --- Contato ------------------------------------------------------------
  /** Formato sem máscara para wa.me: DDI + DDD + número. */
  whatsapp: '5500000000000',
  whatsappLabel: '(00) 00000-0000',
  whatsappMessage: 'Olá! Gostaria de agendar uma avaliação.',
  phone: '(00) 0000-0000',
  email: 'contato@seudominio.com.br',
  address: {
    line1: 'Rua do Exemplo, 123 · sala 45',
    line2: 'Bairro Modelo · Cidade — UF',
    zip: '00000-000',
  },
  hours: [
    { days: 'Segunda a sexta', time: '08h às 19h' },
    { days: 'Sábado', time: '08h às 13h' },
  ],

  // --- Redes sociais (some do rodapé quem ficar vazio) --------------------
  social: {
    instagram: { handle: '@suaclinica', url: 'https://instagram.com/' },
  },

  // --- SEO e publicação (index.html, robots.txt, sitemap.xml e favicon.svg
  //     são gerados a partir daqui no build) --------------------------------
  seo: {
    /** Endereço público do site, sem barra final. */
    url: 'https://clinica-template.sneakpeek.workers.dev',
    title: 'Serena — Clínica & Bem-estar (template)',
    description:
      'Serena, clínica e bem-estar (site-modelo): consulta com escuta, plano por escrito e acompanhamento. Template reutilizável para clínicas e profissionais da saúde.',
    /** Deve ser igual à cor de fundo (--color-bone em src/index.css). */
    themeColor: '#f6f3ec',
    /** Cores do favicon gerado. */
    faviconBg: '#1d3a32',
    faviconFg: '#e3ad8a',
  },

  // --- Rodapé -------------------------------------------------------------
  /** Aviso de demonstração. Deixe '' para remover na entrega ao cliente. */
  footerNote: 'Site-modelo com conteúdo fictício, feito como template de projeto.',
} as const

export const whatsappUrl = (mensagem: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`

/** Itens do menu: `href` é sempre a âncora (id) de uma seção. */
export const nav = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Cuidados', href: '#cuidados' },
  { label: 'Método', href: '#metodo' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Perguntas', href: '#perguntas' },
] as const
