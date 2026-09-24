// Imagens do template em um lugar só.
//
// O visual deste template não usa fotografias: as fichas de papel, os carimbos
// e as orelhas são desenhados em CSS/SVG. Por isso `images` começa vazio.
// Se o cliente quiser fotos (capas de livros, a fachada), coloque os arquivos em
// /public/fotos, declare aqui como { src, alt } e leia `images.<chave>` no
// componente que for usá-las. `alt` descreve a foto para leitores de tela.
export const images: Record<string, { src: string; alt: string }> = {}
