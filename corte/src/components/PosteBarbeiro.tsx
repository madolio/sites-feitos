// O poste de barbearia de verdade — listras vermelho/branco/azul girando
// sem parar, o símbolo mais clássico do ofício. Fica ao lado do talão de
// senha no Hero: duas ideias da marca (fila numerada + barbearia clássica)
// juntas no mesmo golpe de vista.
export default function PosteBarbeiro() {
  return (
    <div className="mx-auto flex w-10 flex-col items-center" aria-hidden="true">
      <span className="h-3 w-6 rounded-t-full bg-ink" />
      <span className="poste h-24 w-6 overflow-hidden border-x-2 border-ink" />
      <span className="h-3 w-6 rounded-b-full bg-ink" />
    </div>
  )
}
