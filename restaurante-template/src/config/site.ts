// ============================================================================
// IDENTIDADE E CONTATOS DO CLIENTE  (1º arquivo a editar)
// "Cumaru" é só conteúdo demonstrativo: troque tudo abaixo para outro cliente.
// Outros arquivos de personalização:
//   src/data/conteudo.ts  textos, pratos, cardápio, história, FAQ, rótulos
//   src/config/images.ts  fotos
//   src/index.css         cores e fontes (bloco @theme)
// ============================================================================

export const site = {
  // --- Identidade ---------------------------------------------------------
  name: 'Cumaru',
  descriptor: 'Cozinha brasileira autoral',
  /** Letra do logo e do favicon gerado. */
  initial: 'C',
  tagline: 'Ingrediente do Brasil, técnica de cozinha, tempo de mesa.',
  /** Logo em imagem (opcional). Ex.: { src: '/logo.svg', alt: 'Cumaru' }.
   *  Se ficar `null`, o logo é a letra em círculo + nome. */
  logo: null as { src: string; alt: string } | null,

  // --- Contato ------------------------------------------------------------
  /** Formato sem máscara para wa.me: DDI + DDD + número. */
  whatsapp: '5500000000000',
  whatsappLabel: '(00) 00000-0000',
  whatsappMessage: 'Olá! Gostaria de fazer uma reserva.',
  phone: '(00) 0000-0000',
  email: 'reservas@seudominio.com.br',
  address: {
    line1: 'Rua do Exemplo, 123',
    line2: 'Bairro Modelo · Cidade — UF',
    zip: '00000-000',
  },
  /** Mapa incorporado (opcional). Cole a URL do "Incorporar mapa" do Google Maps.
   *  Vazio: o site mostra um cartão com o botão "Abrir no mapa". */
  mapEmbedUrl: '',
  hours: [
    { days: 'Terça a quinta', time: '12h às 15h · 19h às 23h' },
    { days: 'Sexta e sábado', time: '12h às 16h · 19h à 0h' },
    { days: 'Domingo', time: '12h às 17h' },
    { days: 'Segunda', time: 'Fechado' },
  ],

  // --- Redes sociais (some do rodapé quem ficar vazio) --------------------
  social: {
    instagram: { handle: '@seurestaurante', url: 'https://instagram.com/' },
  },

  // --- SEO e publicação (index.html, robots.txt, sitemap.xml e favicon.svg
  //     são gerados a partir daqui no build) --------------------------------
  seo: {
    /** Endereço público do site, sem barra final. */
    url: 'https://restaurante-template.sneakpeek.workers.dev',
    title: 'Cumaru — Cozinha brasileira autoral (template)',
    description:
      'Cumaru, restaurante de cozinha brasileira autoral (site-modelo): menu de estação, ingredientes de pequenos produtores e reserva pelo WhatsApp. Template reutilizável para restaurantes.',
    /** Deve ser igual à cor de fundo (--color-background em src/index.css). */
    themeColor: '#14110e',
    /** Cores do favicon gerado. */
    faviconBg: '#14110e',
    faviconFg: '#d9903f',
    /** Imagem de compartilhamento (1200×630) em /public. Vazio: sem og:image. */
    ogImage: '/demo/og.jpg',
  },

  // --- Fontes (Google Fonts) ---------------------------------------------
  // Trecho da URL do Google Fonts. Ao trocar, ajuste também --font-display e
  // --font-body em src/index.css.
  fonts: 'family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&family=DM+Sans:wght@400;500;600;700',

  // --- Rodapé -------------------------------------------------------------
  /** Aviso de demonstração. Deixe '' para remover na entrega ao cliente. */
  footerNote: 'Site-modelo com conteúdo fictício, feito como template de projeto. Fotos: Pexels.',
} as const

export const whatsappUrl = (mensagem: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`

/** Itens do menu: `href` é sempre a âncora (id) de uma seção. */
export const nav = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'História', href: '#historia' },
  { label: 'Ambiente', href: '#ambiente' },
  { label: 'Perguntas', href: '#perguntas' },
  { label: 'Contato', href: '#contato' },
] as const
