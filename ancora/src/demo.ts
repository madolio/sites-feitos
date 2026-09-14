// A Âncora não existe: em vez de abrir o cliente de e-mail do visitante
// pra um endereço que não recebe nada, o botão mostra o endereço fictício e
// oferece o contato real da Madolio. Ver DemoDialog.tsx.

export const DEMO_EVENT = 'demo-email'

export const MADOLIO_WHATSAPP =
  'https://wa.me/5511982322989?text=' +
  encodeURIComponent('Olá! Vi o conceito da Âncora e quero um site assim pro meu negócio.')

export function sendToEmail(endereco: string) {
  window.dispatchEvent(new CustomEvent<string>(DEMO_EVENT, { detail: endereco }))
}
