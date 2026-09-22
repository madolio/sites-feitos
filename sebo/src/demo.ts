// O Sebo Marginália não existe: em vez de abrir o WhatsApp de um número que
// não recebe nada, o botão mostra o número fictício e oferece o contato real
// da Madolio. Ver DemoDialog.tsx.

export const DEMO_EVENT = 'demo-whatsapp'

export const SEBO_WHATSAPP_FICTICIO = '+55 11 4321-0000'

export const MADOLIO_WHATSAPP =
  'https://wa.me/5511982322989?text=' +
  encodeURIComponent('Olá! Vi o conceito do Sebo Marginália e quero um site assim pro meu negócio.')

export function abrirDemoWhatsApp(motivo: string) {
  window.dispatchEvent(new CustomEvent<string>(DEMO_EVENT, { detail: motivo }))
}
