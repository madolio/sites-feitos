const STORAGE_KEY = 'madolio-admin:chave'

export function lerChave(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function salvarChave(chave: string) {
  try {
    localStorage.setItem(STORAGE_KEY, chave)
  } catch {
    // localStorage indisponível (aba privada, etc.) — a sessão simplesmente
    // pedirá a senha de novo na próxima visita, sem quebrar nada.
  }
}

export function limparChave() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ver comentário acima
  }
}
