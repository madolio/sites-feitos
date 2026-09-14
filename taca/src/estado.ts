// Estado mutável lido pela cena 3D a 60fps e escrito pelo gesto de arrastar —
// fora do React de propósito, mesmo padrão do Torno/Calibre: girar a taça
// muda o ângulo a cada quadro, e isso não deveria re-renderizar a página.

export const taca = {
  /** Ângulo atual da taça (rad). */
  angulo: 0,
  /** Velocidade angular — cai sozinha por atrito quando ninguém arrasta. */
  velocidade: 0,
  arrastando: false,
  /** 0–1: quanto as "lágrimas do vinho" aparecem na parede da taça depois de um giro forte. */
  pernas: 0,
}

export type FaseVinho = 'parado' | 'drenando' | 'enchendo'

// O vinho da cena não é fixo — é "servido" de novo a cada rótulo escolhido
// na lista (Prova.tsx chama `servir()`). A cena nunca troca a cor/altura
// direto: sempre drena primeiro (fase 'drenando'), só troca a cor quando a
// taça já está quase vazia, e então enche de novo (fase 'enchendo') — ver
// o porquê e a física de mentirinha em cena/Vitrine.tsx.
export const vinho = {
  corAlvo: '#5a0e24',
  nivelAlvo: 1.5,
  corProxima: '#5a0e24',
  nivelProximo: 1.5,
  fase: 'enchendo' as FaseVinho,
  selecionado: 0,
}

export function servir(indice: number, cor: string, nivel: number) {
  if (vinho.selecionado === indice && vinho.fase === 'parado') return
  vinho.selecionado = indice
  vinho.corProxima = cor
  vinho.nivelProximo = nivel
  vinho.fase = 'drenando'
}
