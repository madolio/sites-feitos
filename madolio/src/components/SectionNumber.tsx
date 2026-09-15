// Numeração rítmica subindo a página — o traço mais direto tirado da
// referência mandada (agenciasmk.com.br numera cada seção 01–07 como um
// dispositivo de orientação, não decoração). Aqui marca só as seções de
// conteúdo (não o Hero nem o CtaFinal, que funcionam como abertura/fechamento
// sem numeral, igual na referência).
//
// `dark` troca pra --color-accent-hero: --color-accent não tem contraste
// suficiente sobre --color-void (~2.9:1, ver index.css) — mesma regra já
// aplicada no resto do site pra qualquer seção de fundo escuro.
export default function SectionNumber({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 ${dark ? 'text-accent-hero' : 'text-accent'}`} aria-hidden="true">
      <span className="font-poster text-sm tracking-[0.25em]">{n}</span>
      <span className={`h-px w-10 ${dark ? 'bg-accent-hero/40' : 'bg-accent/40'}`} />
      <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${dark ? 'text-fog' : 'text-ink/40'}`}>
        {label}
      </span>
    </div>
  )
}
