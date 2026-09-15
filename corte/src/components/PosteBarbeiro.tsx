// O poste de barbearia de verdade — listras vermelho/branco/azul girando
// sem parar, o símbolo mais clássico do ofício. Sozinho no Hero (o selo
// vintage que ficava ao lado saiu — os dois flutuando lado a lado, com vão
// vazio no meio, ficou desalinhado; o selo agora mora no rodapé de
// Agendar.tsx, como uma assinatura). Um pouco maior pra ocupar a posição
// central com presença própria.
export default function PosteBarbeiro() {
  return (
    <div className="mx-auto flex w-12 flex-col items-center" aria-hidden="true">
      <span className="h-3.5 w-7 rounded-t-full bg-ink" />
      <span className="poste h-28 w-7 overflow-hidden border-x-2 border-ink" />
      <span className="h-3.5 w-7 rounded-b-full bg-ink" />
    </div>
  )
}
