// ============================================================================
// IDENTIDADE E CONTATOS DO CLIENTE  (1º arquivo a editar)
// "Vértice" é só conteúdo demonstrativo: troque tudo abaixo para outro cliente.
// Outros arquivos de personalização:
//   src/data/conteudo.ts  textos, modalidades, planos, equipe, FAQ, rótulos
//   src/config/images.ts  fotos
//   src/index.css         cores e fontes (bloco @theme)
// ============================================================================

export const site = {
  // --- Identidade ---------------------------------------------------------
  name: 'Vértice', // @gen:name
  descriptor: 'Academia & Treino funcional',
  /** Letra do logo e do favicon gerado. */
  initial: 'V', // @gen:initial
  tagline: 'Treino com método. Progresso que você consegue medir.',
  /** Logo em imagem (opcional). Ex.: { src: '/logo.svg', alt: 'Vértice' }.
   *  Se ficar `null`, o logo é a letra em quadrado + nome. */
  logo: null as { src: string; alt: string } | null,

  // --- Contato ------------------------------------------------------------
  /** Formato sem máscara para wa.me: DDI + DDD + número. */
  whatsapp: '5500000000000',
  whatsappLabel: '(00) 00000-0000',
  whatsappMessage: 'Olá! Quero agendar uma aula experimental.',
  phone: '(00) 0000-0000',
  email: 'contato@seudominio.com.br',
  address: {
    line1: 'Rua do Exemplo, 123',
    line2: 'Bairro Modelo · Cidade — UF',
    zip: '00000-000',
  },
  /** Mapa incorporado (opcional). Cole a URL do "Incorporar mapa" do Google Maps.
   *  Vazio: o site mostra um cartão com o botão "Abrir no mapa". */
  mapEmbedUrl: '',
  hours: [
    { days: 'Segunda a sexta', time: '05h30 às 23h' },
    { days: 'Sábado', time: '08h às 18h' },
    { days: 'Domingo e feriados', time: '09h às 14h' },
  ],

  // --- Redes sociais (some do rodapé quem ficar vazio) --------------------
  social: {
    instagram: { handle: '@suaacademia', url: 'https://instagram.com/' },
  },

  // --- SEO e publicação (index.html, robots.txt, sitemap.xml e favicon.svg
  //     são gerados a partir daqui no build) --------------------------------
  seo: {
    /** Endereço público do site, sem barra final. */
    url: 'https://academia-template.sneakpeek.workers.dev', // @gen:seo-url
    title: 'Vértice — Academia & Treino funcional (template)', // @gen:seo-title
    description: 'Vértice, academia e treino funcional (site-modelo): musculação, funcional, boxe e mobilidade com professores formados e planos sem fidelidade. Template reutilizável para academias.', // @gen:seo-description
    /** Deve ser igual à cor de fundo (--color-background em src/index.css). */
    themeColor: '#0d0e0f',
    /** Cores do favicon gerado. */
    faviconBg: '#0d0e0f',
    faviconFg: '#c8f03c',
    /** Imagem de compartilhamento (1200×630) em /public. Vazio: sem og:image. */
    ogImage: '/demo/og.jpg', // @gen:og-image
  },

  // --- Fontes (Google Fonts) ---------------------------------------------
  // Trecho da URL do Google Fonts. Ao trocar, ajuste também --font-display e
  // --font-body em src/index.css.
  fonts: 'family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700',

  // --- Rodapé -------------------------------------------------------------
  /** Aviso de demonstração. Deixe '' para remover na entrega ao cliente. */
  footerNote: 'Site-modelo com conteúdo fictício, feito como template de projeto. Fotos: Pexels.',
} as const

export const whatsappUrl = (mensagem: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`

/** Itens do menu: `href` é sempre a âncora (id) de uma seção. */
export const nav = [
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Planos', href: '#planos' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Professores', href: '#professores' },
  { label: 'Contato', href: '#contato' },
] as const
