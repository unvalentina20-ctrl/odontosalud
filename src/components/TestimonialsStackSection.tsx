import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  initials: string;
  bgColor: string;
  quote: string;
  avatarUrl?: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Carolina Mendonça',
    role: 'Ortodoncia Invisible',
    initials: 'CM',
    bgColor: '#F5F5F5',
    quote: 'OdontoSalud alineó mis dientes en 8 meses sin molestias. El escaneo 3D inicial fue brillante.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't2',
    name: 'Martín Rodríguez',
    role: 'Implante Inmediato',
    initials: 'MR',
    bgColor: '#F2F7FF',
    quote: 'El procedimiento con guiado digital 3D fue 100% indoloro. Salí el mismo día comiendo normal.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't3',
    name: 'Sofía & Lucía Peralta',
    role: 'Odontopediatría',
    initials: 'SL',
    bgColor: '#F5F5F5',
    quote: 'La atención pediátrica tiene una calidez humana increíble. Mis hijas salen felices del consultorio.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't4',
    name: 'Gonzalo Farías',
    role: 'Diseño de Sonrisa',
    initials: 'GF',
    bgColor: '#FFEDE0',
    quote: 'Las carillas cerámicas de alta durabilidad superaron cualquier expectativa. Quedaron impecables.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't5',
    name: 'DFW Ortodoncia',
    role: 'Implantes & Prótesis',
    initials: 'DO',
    bgColor: '#F5F5F5',
    quote: 'Resolvieron un caso complejo en tiempo récord. El mejor equipo odontológico que me atendió.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

export const TestimonialsStackSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${cards.length * 90}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        tl.fromTo(
          card,
          {
            x: 450,
            rotation: 20,
            scale: 0.85,
            opacity: 0,
          },
          {
            x: 0,
            rotation: i % 2 === 0 ? -3 : 3,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          `step-${i}`
        );

        if (i > 0) {
          const prevCard = cards[i - 1];
          tl.to(
            prevCard,
            {
              scale: 0.9,
              x: -30,
              opacity: 0.15,
              duration: 1,
            },
            `step-${i}`
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      id="testimonios" 
      className="mx-auto flex w-full flex-col items-center justify-start py-20 relative bg-white min-h-screen border-b border-slate-100"
    >
      {/* Title Header - Cleanly Positioned at Top */}
      <div className="w-full text-center px-4 pt-8 pb-4 z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#000B33] tracking-tight font-sans">
          ¿Por qué nos eligen?
        </h2>
      </div>

      {/* Cards Display Box - Positioned BELOW the Title Header */}
      <div className="relative z-20 flex justify-center items-center h-[460px] w-full max-w-lg mt-8">
        {TESTIMONIALS.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute h-[430px] w-[320px] sm:w-[350px] overflow-hidden rounded-3xl p-7 flex flex-col justify-between shadow-2xl transition-all border border-slate-200/50"
            style={{
              backgroundColor: item.bgColor,
              zIndex: index + 1,
            }}
          >
            <p className="text-xl sm:text-2xl font-normal text-[#000B33] leading-snug">
              "{item.quote}"
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-black/5">
              {item.avatarUrl ? (
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover shadow"
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-full bg-slate-900 text-white font-medium">
                  {item.initials}
                </div>
              )}
              <div className="flex flex-col text-[#000B33] text-left">
                <p className="font-bold text-[#000B33] text-base leading-tight">{item.name}</p>
                <p className="text-sm text-slate-500 font-normal">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
