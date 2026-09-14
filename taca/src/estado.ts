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
