import { casos } from '../data/casos'
import Reveal from './Reveal'

// Textura CSS por família de material — o objetivo é dar profundidade real
// ao trabalho de especificação, não um card de "nossos diferenciais". Cada
// amostra usa a MESMA lista de materiais que já aparece nas salas da planta
// (Explorador.tsx) — não é um catálogo genérico à parte, é a materioteca
// de verdade por trás das quatro casas mostradas.
const texturas: Record<string, string> = {
  'Freijó maciço':
    'repeating-linear-gradient(100deg, #8a6a45 0px, #96754f 3px, #7c5d3a 6px, #8a6a45 9px)',
  'Piso em taco recuperado':
    'repeating-linear-gradient(95deg, #7a5836 0 18px, #6b4c2e 18px 20px)',
  'Esquadria em alumínio preto': 'linear-gradient(160deg, #2b2b2b, #050505)',
  'Deck em ipê': 'repeating-linear-gradient(90deg, #5c3a1e 0 22px, #4a2e17 22px 24px)',
  'Concreto aparente':
    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 60%), linear-gradient(#8c8781, #8c8781)',
  'Guarda-corpo em cabo de aço':
    'repeating-linear-gradient(45deg, #9aa0a6 0 2px, transparent 2px 14px), linear-gradient(#d8dadc, #d8dadc)',
  'Marcenaria multifuncional':
    'repeating-linear-gradient(100deg, #b89b6e 0px, #c4a878 3px, #ad9264 6px, #b89b6e 9px)',
  'Tampo em compensado naval':
    'repeating-linear-gradient(0deg, #d9c9a3 0 3px, #c9b78f 3px 6px)',
  'Portas em laca fosca': 'linear-gradient(150deg, #dcd6c8, #cfc8b8)',
  'Cimento queimado':
    'radial-gradient(circle at 60% 40%, rgba(0,0,0,0.06), transparent 55%), linear-gradient(#a8a29a, #a8a29a)',
  'Madeira de demolição':
    'repeating-linear-gradient(95deg, #6b4226 0 10px, #7d5230 10px 20px, #5a3820 20px 30px)',
  'Linho cru': 'repeating-linear-gradient(90deg, #ece3d2 0 2px, #e2d7c1 2px 4px)',
}

// Lista deduplicada de materiais + em qual casa/cômodo aparece cada um —
// isso que dá o argumento "a gente especifica material, não só desenha".
const materiais = casos.flatMap((caso) =>
  caso.salas.map((sala) => ({ material: sala.material, caso: caso.titulo, sala: sala.nome })),
)
const materiaisUnicos = Array.from(new Map(materiais.map((m) => [m.material, m])).values())

export default function Materiais() {
  return (
    <section id="materiais" className="border-t border-line bg-paper px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="text-sm font-medium text-pine">Materioteca</span>
          <h2 className="mt-2 text-3xl text-ink sm:text-4xl">Cada projeto começa pelo material, não pelo desenho</h2>
          <p className="mt-4 max-w-md text-ink/75">
            Antes de qualquer planta, a gente decide o que vai revestir, forrar
            e estruturar cada cômodo — a amostra abaixo é a materioteca real
            por trás das quatro casas ao lado.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3" stagger={0.08}>
          {materiaisUnicos.map((m) => (
            <div key={m.material}>
              <div
                className="aspect-[4/3] rounded-lg border border-ink/10"
                style={{ backgroundImage: texturas[m.material] }}
                aria-hidden="true"
              />
              <p className="mt-2 text-sm font-medium text-ink">{m.material}</p>
              <p className="text-xs text-ink/55">
                {m.sala} · {m.caso}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
