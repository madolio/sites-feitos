// Os instrumentos do painel de navegação. Todos são instrumentos reais de
// painel — manômetro, amperímetro, horímetro e sinaleiro — e é isso que
// mantém a navegação dentro do mesmo vocabulário técnico dos esquemas.
//
// O manômetro marca o ofício da água (é o instrumento do P&ID) e o
// amperímetro marca o ofício elétrico (é o instrumento do unifilar): mesma
// família, instrumentos diferentes, cada um com a cor do seu ofício. O
// horímetro (que conta horas de serviço) e o sinaleiro (a lâmpada de
// sinalização) são neutros — não pertencem a nenhum dos dois ofícios.

type Props = { ativo: boolean }

const base = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function Mostrador({ ativo }: Props) {
  return (
    <circle cx="12" cy="12" r="9.5" {...base} strokeOpacity={ativo ? 1 : 0.4} strokeWidth="1.4" />
  )
}

// Manômetro de Bourdon: escala no arco de baixo, agulha girando do repouso
// (à esquerda) até o fundo de escala (à direita) quando a seção está ativa.
export function Manometro({ ativo }: Props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <Mostrador ativo={ativo} />
      <path d="M8 15 a5.66 5.66 0 0 1 8 0" {...base} strokeOpacity={ativo ? 0.9 : 0.4} strokeWidth="1.2" />
      <line
        x1="12"
        y1="12"
        x2={ativo ? 15.2 : 9.2}
        y2={ativo ? 8.8 : 9.2}
        {...base}
        strokeWidth="1.4"
        className="transition-all duration-300"
      />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Amperímetro de bobina móvel: ao contrário do manômetro, o eixo fica
// embaixo e a escala em cima, e o instrumento tem os dois bornes na base.
export function Amperimetro({ ativo }: Props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <Mostrador ativo={ativo} />
      <path d="M6.9 11.4 a5.66 5.66 0 0 1 10.2 0" {...base} strokeOpacity={ativo ? 0.9 : 0.4} strokeWidth="1.2" />
      <line
        x1="12"
        y1="16.6"
        x2={ativo ? 15.9 : 8.1}
        y2={ativo ? 10.4 : 10.4}
        {...base}
        strokeWidth="1.4"
        className="transition-all duration-300"
      />
      <circle cx="12" cy="16.6" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9 21.3 V22.8 M15 21.3 V22.8" {...base} strokeOpacity={ativo ? 0.9 : 0.4} strokeWidth="1.3" />
    </svg>
  )
}

// Horímetro: o contador de horas de serviço do painel — mostrador com uma
// janela de dígitos, que se preenche quando a seção está ativa.
export function Horimetro({ ativo }: Props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <Mostrador ativo={ativo} />
      <rect
        x="7.2"
        y="9.6"
        width="9.6"
        height="4.8"
        rx="0.9"
        {...base}
        strokeOpacity={ativo ? 0.9 : 0.4}
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity={ativo ? 0.22 : 0}
        className="transition-all duration-300"
      />
      <path
        d="M10.4 9.6 V14.4 M13.6 9.6 V14.4"
        {...base}
        strokeOpacity={ativo ? 0.9 : 0.4}
        strokeWidth="1.1"
      />
    </svg>
  )
}

// Sinaleiro (lâmpada de sinalização, IEC 60617): círculo cortado por uma
// cruz. Acende — os raios aparecem — quando a seção está ativa.
export function Sinaleiro({ ativo }: Props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="6.4"
        {...base}
        strokeOpacity={ativo ? 1 : 0.4}
        strokeWidth="1.4"
        fill="currentColor"
        fillOpacity={ativo ? 0.2 : 0}
        className="transition-all duration-300"
      />
      <path
        d="M7.5 7.5 L16.5 16.5 M16.5 7.5 L7.5 16.5"
        {...base}
        strokeOpacity={ativo ? 0.9 : 0.4}
        strokeWidth="1.3"
      />
      <path
        d="M12 1.6 V4 M12 20 V22.4 M1.6 12 H4 M20 12 H22.4"
        {...base}
        strokeWidth="1.3"
        className="transition-opacity duration-300"
        opacity={ativo ? 0.9 : 0}
      />
    </svg>
  )
}
