// O Realce & Cia é um salão de VERDADE, em São Roque — este site é um
// conceito de redesenho feito pela Madolio, não o site oficial deles. Por
// isso nenhum botão abre o WhatsApp do salão: mandar mensagem de estranho
// pro número de um negócio que não encomendou isso seria invadir o
// atendimento deles. Os botões mostram a mensagem que seria enviada e
// oferecem o contato da Madolio. Ver DemoDialog.tsx.

export const DEMO_EVENT = 'demo-whatsapp'

export const MADOLIO_WHATSAPP =
  'https://wa.me/5511982322989?text=' +
  encodeURIComponent('Olá! Vi o conceito do Realce & Cia e quero um site assim pro meu negócio.')

export function sendToWhatsApp(message: string) {
  window.dispatchEvent(new CustomEvent<string>(DEMO_EVENT, { detail: message }))
}
