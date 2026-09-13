// Estado mutável compartilhado entre a cena 3D (lida a 60fps) e a interface
// (só escreve em resposta a gesto do visitante) — fora do React de propósito,
// mesmo padrão do Torno: se a energia da corda fosse useState, cada tique do
// volante re-renderizaria a árvore inteira.

export const montagem = {
  /** 0 = peças explodidas, 1 = calibre montado. Anima uma vez só, ao entrar. */
  progresso: 0,
}

export const corda = {
  /** 0–1: reserva de marcha. Sobe ao arrastar a coroa, cai devagar sozinha. */
  energia: 0.08,
  arrastando: false,
}

export function darCorda(delta: number) {
  corda.energia = Math.min(1, corda.energia + delta)
}
