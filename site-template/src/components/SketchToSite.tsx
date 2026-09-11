import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP)

// Uma janela de navegador que começa como rascunho a mão (linhas soltas,
// ligeiramente tortas) e se resolve num site pronto, na cor do Madolio.
// O rascunho não desaparece — fica como guia por baixo, reforçando a ideia
// de "do esboço ao site no ar".
export default function SketchToSite() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
          defaults: { ease: 'power2.out' },
        })

        tl.from('[data-sketch]', {
          drawSVG: '0%',
          duration: 0.5,
          stagger: 0.12,
          ease: 'none',
        })
          .to('[data-sketch]', { opacity: 0.16, duration: 0.6 }, '+=0.3')
          .from(
            '[data-block]',
            { opacity: 0, scale: 0.94, transformOrigin: '50% 50%', duration: 0.5, stagger: 0.08 },
            '<',
          )
          .fromTo(
            '[data-cursor]',
            { opacity: 0, x: -60, y: -30 },
            { opacity: 1, x: 0, y: 0, duration: 0.5 },
            '-=0.2',
          )
          .to('[data-cursor]', { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1 })
          .to('[data-publish-ring]', { scale: 2.2, opacity: 0, duration: 0.6, ease: 'power1.out' }, '<')
          .to('[data-cursor]', { opacity: 0, duration: 0.3 }, '+=0.4')
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 400 320" className="h-auto w-full overflow-visible">
        <rect x="1" y="1" width="398" height="318" rx="14" fill="#fff" stroke="#0f1c33" strokeWidth="2" />
        <line x1="1" y1="34" x2="399" y2="34" stroke="#0f1c33" strokeWidth="2" />
        <circle cx="20" cy="17" r="4" fill="none" stroke="#0f1c33" strokeWidth="1.5" />
        <circle cx="34" cy="17" r="4" fill="none" stroke="#0f1c33" strokeWidth="1.5" />
        <circle cx="48" cy="17" r="4" fill="none" stroke="#0f1c33" strokeWidth="1.5" />

        {/* Rascunho: traços soltos, levemente tortos, como se fossem desenhados à mão */}
        <g fill="none" stroke="#0f1c33" strokeWidth="1.75" strokeLinecap="round">
          <path data-sketch d="M24,58 L118,55 L121,63 L26,66 Z" />
          <path data-sketch d="M24,84 Q210,78 372,88" />
          <path data-sketch d="M24,102 Q180,97 300,104" />
          <path data-sketch d="M24,120 Q140,115 220,121" />
          <rect data-sketch x="24" y="146" width="352" height="86" rx="4" transform="rotate(-0.6 200 189)" />
          <path data-sketch d="M24,254 Q120,249 210,255 Q260,258 320,253" />
          <rect data-sketch x="24" y="278" width="108" height="30" rx="15" transform="rotate(0.8 78 293)" />
        </g>

        {/* Site pronto: mesmos blocos, agora nas cores do Madolio */}
        <g data-block>
          <rect x="24" y="52" width="104" height="16" rx="3" fill="#0f1c33" opacity="0.85" />
          <rect x="24" y="80" width="348" height="8" rx="4" fill="#0f1c33" opacity="0.3" />
          <rect x="24" y="98" width="276" height="8" rx="4" fill="#0f1c33" opacity="0.3" />
          <rect x="24" y="116" width="196" height="8" rx="4" fill="#0f1c33" opacity="0.3" />
          <rect x="24" y="146" width="352" height="86" rx="10" fill="#1D4FD1" opacity="0.9" />
          <rect x="24" y="278" width="108" height="30" rx="15" fill="#1D4FD1" />
        </g>

        <g data-cursor>
          <circle data-publish-ring cx="78" cy="293" r="15" fill="none" stroke="#1D4FD1" strokeWidth="2" />
          <path
            d="M78,293 L78,314 L85,309 L89,317 L93,315 L89,307 L97,307 Z"
            fill="#0f1c33"
            stroke="#f7f9fc"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  )
}
