// A Renata Bastos Nail Studio não existe: em vez de abrir o WhatsApp de um
// número qualquer (que pode ser de alguém de verdade), os botões mostram a
// mensagem que seria enviada e oferecem o contato da Madolio. Mesmo padrão
// de Estufa/Bruma/Fornada/Pulso/Vereda etc. — ver DemoDialog.tsx.

export const DEMO_EVENT = 'demo-whatsapp'

export const MADOLIO_WHATSAPP =
  'https://wa.me/5511982322989?text=' +
  encodeURIComponent('Olá! Vi o conceito da Renata Bastos Nail Studio e quero um site assim pro meu negócio.')

export function sendToWhatsApp(message: string) {
  window.dispatchEvent(new CustomEvent<string>(DEMO_EVENT, { detail: message }))
}
