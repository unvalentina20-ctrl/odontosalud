import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

interface Props {
  onOpenBooking: () => void;
}

const BADGES = [
  { label: 'Implantología 3D', pos: 'left-[5%] top-[8%] lg:left-[5%] lg:top-[30%]' },
  { label: 'Ortodoncia Invisible', pos: 'left-[5%] top-[18%] lg:left-[20%] lg:top-[15%]' },
  { label: 'Estética Dental', pos: 'right-[5%] top-[8%] lg:right-[5%] lg:top-[25%]' },
  { label: 'Odontopediatría', pos: 'right-[5%] top-[18%] lg:right-[5%] lg:top-[82%]' },
  { label: 'Endodoncia Láser', pos: 'left-[5%] top-[28%] lg:bottom-[15%] lg:left-[5%] lg:right-auto lg:top-auto' },
  { label: 'Periodoncia', pos: 'right-[5%] top-[28%] lg:right-[20%] lg:top-[60%]' },
  { label: 'Cirugía Maxilofacial', pos: 'left-[5%] top-[38%] lg:left-[15%] lg:top-[65%]' },
];

export const FloatingPillsCoverageSection: React.FC<Props> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      pillsRef.current.filter(Boolean).forEach((pill, i) => {
        gsap.to(pill, {
          y: i % 2 === 0 ? '-=12' : '+=12',
          duration: 3 + (i % 2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.easeInOut',
          delay: i * 0.3,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="cobertura" className="relative w-full overflow-hidden px-4 py-16 sm:px-10 font-sans">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="relative flex min-h-[580px] items-center justify-center rounded-t-[40px] bg-gradient-to-b from-[#4C6DA6] to-white pb-40 pt-[300px] text-center lg:py-20">
          
          <div className="pointer-events-none absolute inset-0 rounded-t-[40px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
          
          {/* Floating Badges */}
          <div className="pointer-events-none absolute inset-0 mx-auto max-w-[380px] lg:max-w-[1400px]">
            {BADGES.map((item, i) => (
              <div
                key={i}
                ref={(el) => (pillsRef.current[i] = el)}
                className={`absolute transition-transform duration-1000 ease-linear ${item.pos}`}
              >
                <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white lg:px-6 lg:py-4 lg:text-[22px] backdrop-blur-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Center Text */}
          <div className="container relative z-10 mb-0 mt-auto lg:mb-auto">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-[30px] text-5xl font-normal not-italic leading-[110%] text-white">
                Un solo centro, todas tus especialidades
              </h2>
              <p className="m-0 text-lg font-normal leading-[130%] text-white">
                Tu sonrisa es única. En OdontoSalud nos encargamos de todo tu plan odontológico con diagnóstico 3D integral y seguimiento continuo.
              </p>
              <div className="mt-11 flex flex-col justify-center gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-normal leading-none text-[#000B33] transition-all hover:bg-gray-100 shadow-md cursor-pointer"
                >
                  <span className="text-nowrap font-medium">Agendar Turno</span>
                  <ArrowRight className="size-5 text-[#000B33]" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
