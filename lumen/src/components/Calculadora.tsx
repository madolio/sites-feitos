import { useMemo, useState } from 'react'
import { ambientes, FATOR_MANUTENCAO, FATOR_UTILIZACAO } from '../data/ambientes'
import { luminarias } from '../data/luminarias'
import { sendToWhatsApp } from '../demo'
import { CampoNumero } from './CampoNumero'
import Reveal from './Reveal'

// Fórmula real de projeto luminotécnico: N = (E × A) / (F × UF × MF)
// E = iluminância desejada (lux), A = área (m²), F = fluxo da luminária
// (lumens), UF = fator de utilização, MF = fator de manutenção. O mesmo
// cálculo que um projetista faria à mão antes de especificar quantas
// luminárias comprar.
export function Calculadora() {
  const [largura, setLargura] = useState(4)
  const [comprimento, setComprimento] = useState(5)
  const [ambienteId, setAmbienteId] = useState(ambientes[0].id)
  const [luminariaId, setLuminariaId] = useState(luminarias[1].id)

  const ambiente = ambientes.find((a) => a.id === ambienteId)!
  const luminaria = luminarias.find((l) => l.id === luminariaId)!

  const { area, quantidade, potenciaTotal } = useMemo(() => {
    const area = largura * comprimento
    const quantidade = Math.max(1, Math.ceil((ambiente.lux * area) / (luminaria.lumens * FATOR_UTILIZACAO * FATOR_MANUTENCAO)))
    const potenciaTotal = quantidade * luminaria.watts
    return { area, quantidade, potenciaTotal }
  }, [largura, comprimento, ambiente, luminaria])

  function pedirOrcamento() {
    sendToWhatsApp(
      `Olá, Lúmen! Fiz uma simulação no site:\n• Ambiente: ${largura}×${comprimento}m (${area.toFixed(1)}m²), ${ambiente.nome}\n• Luminária: ${luminaria.nome}\n• Estimativa: ${quantidade} unidades, ~${potenciaTotal}W total\nQuero um projeto de verdade.`,
    )
  }

  return (
    <section id="calculadora" className="border-t border-fio bg-carvao px-6 py-20">
      <Reveal className="mx-auto max-w-3xl">
        <p className="font-mono text-sm tracking-widest text-acento uppercase">Calculadora</p>
        <h2 className="mt-3 text-3xl">Quantas luminárias o seu ambiente precisa</h2>
        <p className="mt-3 text-fumo">
          Fórmula real de projeto: N = (lux desejado × área) ÷ (lumens da luminária × fator de utilização × fator de
          manutenção). Nada aqui é estimativa solta.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <CampoNumero label="Largura do ambiente (m)" value={largura} onChange={setLargura} min={1} max={20} step={0.5} />
          <CampoNumero label="Comprimento do ambiente (m)" value={comprimento} onChange={setComprimento} min={1} max={20} step={0.5} />
        </div>

        <div className="mt-6">
          <p className="text-sm text-fumo">Tipo de ambiente</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ambientes.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={a.id === ambienteId}
                onClick={() => setAmbienteId(a.id)}
                className={`rounded-none border px-4 py-2 text-sm transition ${
                  a.id === ambienteId ? 'border-acento bg-acento text-noite' : 'border-fio text-marfim hover:border-acento'
                }`}
              >
                {a.nome} <span className="tabular opacity-70">({a.lux}lx)</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-fumo">Luminária</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {luminarias.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={l.id === luminariaId}
                onClick={() => setLuminariaId(l.id)}
                className={`rounded-none border px-4 py-2 text-sm transition ${
                  l.id === luminariaId ? 'border-acento bg-acento text-noite' : 'border-fio text-marfim hover:border-acento'
                }`}
              >
                {l.nome} <span className="tabular opacity-70">({l.lumens}lm)</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 border border-fio bg-noite p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs tracking-widest text-fumo uppercase">Área</p>
              <p className="tabular mt-1 text-2xl">{area.toFixed(1)}m²</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-fumo uppercase">Luminárias</p>
              <p className="tabular mt-1 text-2xl text-acento">{quantidade}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-fumo uppercase">Potência total</p>
              <p className="tabular mt-1 text-2xl">{potenciaTotal}W</p>
            </div>
          </div>
          <button type="button" onClick={pedirOrcamento} className="btn-acento mt-6">
            Pedir um projeto de verdade
          </button>
        </div>
      </Reveal>
    </section>
  )
}
