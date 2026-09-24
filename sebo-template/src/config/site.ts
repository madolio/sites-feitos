// ============================================================================
// IDENTIDADE E CONTATOS DO CLIENTE  (1º arquivo a editar)
// "Folha Solta" é só conteúdo demonstrativo: troque tudo abaixo para outro cliente.
// Outros arquivos de personalização:
//   src/data/conteudo.ts  textos, acervo (livros), etapas, FAQ, rótulos
//   src/config/images.ts  imagens (este template não usa fotos por padrão)
//   src/index.css         cores e fontes (bloco @theme)
// ============================================================================

export const site = {
  // --- Identidade ---------------------------------------------------------
  name: 'Folha Solta', // @gen:name
  descriptor: 'Sebo & livros usados',
  /** Letra do favicon gerado. */
  initial: 'F', // @gen:initial
  /** Frase curta em letra manuscrita, no rodapé. */
  tagline: 'todo livro já teve um leitor antes de você',
  /** Logo em imagem (opcional). Ex.: { src: '/logo.svg', alt: 'Folha Solta' }.
   *  Se ficar `null`, o nome aparece em letra manuscrita. */
  logo: null as { src: string; alt: string } | null,

  // --- Contato ------------------------------------------------------------
  /** Formato sem máscara para wa.me: DDI + DDD + número. */
  whatsapp: '5500000000000',
  whatsappLabel: '(00) 00000-0000',
  whatsappMessage: 'Olá! Vi o acervo e queria separar alguns livros.',
  phone: '',
  email: 'contato@seudominio.com.br',
  address: {
    line1: 'Rua do Exemplo, 123',
    line2: 'Bairro Modelo · Cidade — UF',
    zip: '00000-000',
  },
  hours: [
    { days: 'Terça a sábado', time: '10h às 19h' },
    { days: 'Domingo', time: '10h às 14h' },
  ],

  // --- Redes sociais (some do rodapé quem ficar vazio) --------------------
  social: {
    instagram: { handle: '@seusebo', url: 'https://instagram.com/' },
  },

  // --- SEO e publicação (index.html, robots.txt, sitemap.xml e favicon.svg
  //     são gerados a partir daqui no build) --------------------------------
  seo: {
    /** Endereço público do site, sem barra final. */
    url: 'https://sebo-template.sneakpeek.workers.dev', // @gen:seo-url
    title: 'Folha Solta — Sebo & livros usados (template)', // @gen:seo-title
    description: 'Folha Solta, sebo de bairro (site-modelo): livros usados com a história de cada exemplar anotada na ficha. Template reutilizável para sebos e livrarias de usados.', // @gen:seo-description
    /** Deve ser igual à cor de fundo (--color-background em src/index.css). */
    themeColor: '#17241b',
    /** Cores do favicon gerado: fundo e página. */
    faviconBg: '#17241b',
    faviconFg: '#f1e7ce',
    /** Imagem de compartilhamento (1200×630) em /public. Vazio: sem og:image. */
    ogImage: '/demo/og.jpg', // @gen:og-image
  },

  // --- Fontes (Google Fonts) ---------------------------------------------
  // Trecho da URL do Google Fonts. Ao trocar, ajuste também --font-display,
  // --font-body e --font-mao em src/index.css.
  fonts: 'family=Piazzolla:wght@500;600;700&family=Caveat:wght@500;600;700&family=Inter:wght@400;500;600;700',

  // --- Rodapé -------------------------------------------------------------
  /** Aviso de demonstração. Deixe '' para remover na entrega ao cliente. */
  footerNote: 'Site-modelo com conteúdo fictício, feito como template de projeto.',
} as const

export const whatsappUrl = (mensagem: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`

/** As "orelhas" de navegação: `href` é sempre a âncora (id) de uma seção.
 *  Rótulos curtos (até 9 letras) para caber na fileira do celular. */
export const nav = [
  { label: 'capa', href: '#inicio' },
  { label: 'acervo', href: '#acervo' },
  { label: 'avaliação', href: '#processo' },
  { label: 'dúvidas', href: '#duvidas' },
  { label: 'contato', href: '#contato' },
] as const
