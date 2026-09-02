import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  onOpenBooking: () => void;
}

const BADGES = [
  { label: 'Implantología 3D', lgPos: 'lg:left-[6%] lg:top-[22%]' },
  { label: 'Ortodoncia Invisible', lgPos: 'lg:left-[18%] lg:top-[12%]' },
  { label: 'Estética Dental', lgPos: 'lg:right-[8%] lg:top-[20%]' },
  { label: 'Odontopediatría', lgPos: 'lg:right-[10%] lg:bottom-[24%]' },
  { label: 'Endodoncia Láser', lgPos: 'lg:left-[8%] lg:bottom-[20%]' },
  { label: 'Periodoncia', lgPos: 'lg:right-[20%] lg:top-[12%]' },
  { label: 'Cirugía Maxilofacial', lgPos: 'lg:left-[22%] lg:bottom-[16%]' },
];

export const FloatingPillsCoverageSection: React.FC<Props> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // GSAP floating animation for desktop absolute pills
      pillsRef.current.filter(Boolean).forEach((pill, i) => {
        gsap.to(pill, {
          y: i % 2 === 0 ? '-=10' : '+=10',
          duration: 3 + (i % 2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.easeInOut',
          delay: i * 0.25,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="cobertura" className="relative w-full overflow-hidden px-4 py-10 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto w-full max-w-screen-xl">
        
        {/* Main Card Container with rich cohesive gradient to ensure 100% text legibility */}
        <div className="relative flex flex-col items-center justify-center rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#3B5998] via-[#486BA6] to-[#344E85] px-5 py-10 sm:px-10 sm:py-16 lg:py-24 text-center shadow-2xl overflow-hidden">
          
          {/* Subtle decorative inner ambient glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-sky-300/20 blur-[100px] rounded-full" />
          <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-white/10 via-transparent to-black/10" />

          {/* DESKTOP ONLY: Absolute floating badges around perimeter */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {BADGES.map((item, i) => (
              <div
                key={i}
                ref={(el) => (pillsRef.current[i] = el)}
                className={`absolute transition-transform duration-700 ease-out ${item.lgPos}`}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-base font-medium text-white shadow-lg backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* MOBILE ONLY: Clean, responsive pill chips grid above title (never collides) */}
          <div className="relative z-10 lg:hidden flex flex-wrap justify-center gap-2 mb-6 max-w-md mx-auto">
            {BADGES.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-sm shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-sky-200" />
                {item.label}
              </span>
            ))}
          </div>

          {/* Center Editorial Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.15] mb-4">
              Un solo centro, todas tus especialidades
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-sky-50 max-w-xl mx-auto mb-8">
              Tu sonrisa es única. En OdontoSalud nos encargamos de todo tu plan odontológico con diagnóstico 3D integral y seguimiento continuo.
            </p>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-[#000B33] transition-all hover:bg-sky-50 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            >
              <span>Agendar Turno</span>
              <ArrowRight className="w-4 h-4 text-[#000B33]" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
