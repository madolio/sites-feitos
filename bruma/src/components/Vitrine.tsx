import { ContainerScroll } from './ContainerScroll'

export default function Vitrine() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <p className="text-sm font-semibold tracking-wide text-acento uppercase">Como ela é composta</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">
            Topo, coração e fundo — <br className="hidden sm:block" />
            três camadas, três velocidades
          </h2>
        </>
      }
    >
      <Frasco />
    </ContainerScroll>
  )
}

function Frasco() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-carvao to-noite">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute rounded-full bg-acento/20 blur-2xl"
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            left: `${20 + i * 15}%`,
            bottom: '20%',
            animation: `subir ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      <svg viewBox="0 0 200 300" className="relative z-10 h-[70%] w-auto drop-shadow-2xl">
        <rect x="70" y="30" width="60" height="24" rx="6" fill="#3fae82" />
        <rect x="80" y="14" width="40" height="20" rx="4" fill="#1e3d30" />
        <path
          d="M70 54 L70 90 Q60 100 60 130 L60 260 Q60 280 80 280 L120 280 Q140 280 140 260 L140 130 Q140 100 130 90 L130 54 Z"
          fill="#0d1f19"
          stroke="#3fae82"
          strokeWidth="2"
        />
        <rect x="66" y="140" width="68" height="90" rx="4" fill="#3fae82" fillOpacity="0.12" />
      </svg>

      <style>{`
        @keyframes subir {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-140px) scale(1.3); opacity: 0.15; }
          100% { transform: translateY(-260px) scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          span[style*="subir"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
