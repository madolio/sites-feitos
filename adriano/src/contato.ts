// Contato real do Adriano — este site NÃO é um conceito de portfólio, é
// pra ser usado de verdade. Diferente dos outros projetos desta pasta, os
// botões abrem o WhatsApp dele diretamente, sem modo demonstração.

export const WHATSAPP_NUMERO = '5511971817781'

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`
}
