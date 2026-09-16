// A chave da API fica só no localStorage do próprio aparelho — este é um
// app de uso pessoal (sem backend), então não há onde guardar segredo do
// lado servidor. Nunca é enviada a nada além da própria Google.
const CHAVE_STORAGE = 'leads:google-api-key'

export function lerChave(): string {
  try {
    return localStorage.getItem(CHAVE_STORAGE) ?? ''
  } catch {
    return ''
  }
}

export function salvarChave(chave: string) {
  try {
    localStorage.setItem(CHAVE_STORAGE, chave.trim())
  } catch {
    // localStorage indisponível (aba privada etc.) — a chave só não persiste
  }
}

export function limparChave() {
  try {
    localStorage.removeItem(CHAVE_STORAGE)
  } catch {
    // ignora
  }
}
