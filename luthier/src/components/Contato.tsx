import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'

export default function Contato() {
  const [instrumento, setInstrumento] = useState('Violão clássico')
  const [detalhe, setDetalhe] = useState('')

  function enviar() {
    const mensagem =
      `Olá! Quero encomendar um instrumento na Ressoa.\n` +
      `Instrumento: ${instrumento}\n` +
      (detalhe.trim() ? `Detalhes: ${detalhe.trim()}` : 'Sem detalhes adicionais ainda — quero conversar primeiro.')
    sendToWhatsApp(mensagem)
  }

  return (
    <section id="contato" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="rotulo-mono">encomendar</p>
        <h2 className="mt-2 font-display text-3xl sm:text-5xl">Fale com a oficina.</h2>
        <p className="mt-4 text-osso/75">
          Conte o instrumento que você quer e a Ressoa responde pelo WhatsApp com os
          próximos passos.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 rounded-2xl border border-neblina/25 bg-painel p-6 sm:p-8">
        <label className="block">
          <span className="rotulo-mono">Instrumento</span>
          <select
            value={instrumento}
            onChange={(e) => setInstrumento(e.target.value)}
            className="mt-2 w-full rounded-lg border border-neblina/30 bg-grafite px-3 py-2 text-osso"
          >
            <option>Violão clássico</option>
            <option>Violão de aço</option>
            <option>Viola caipira</option>
            <option>Ukulele tenor</option>
            <option>Ukulele concerto</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="rotulo-mono">Detalhes (opcional)</span>
          <textarea
            value={detalhe}
            onChange={(e) => setDetalhe(e.target.value)}
            rows={3}
            placeholder="Ex.: madeira preferida, orçamento, prazo..."
            className="mt-2 w-full rounded-lg border border-neblina/30 bg-grafite px-3 py-2 text-osso placeholder:text-neblina/60"
          />
        </label>

        <button type="button" onClick={enviar} className="btn-fosforo mt-6">
          Enviar pelo WhatsApp
        </button>
        <p className="mt-3 text-xs text-neblina">
          A Ressoa é uma oficina fictícia — este botão abre uma prévia da mensagem,
          não um WhatsApp real.
        </p>
      </Reveal>
    </section>
  )
}
