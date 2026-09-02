import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  initials: string;
  bgColor: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
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
    rating: 5,
  },
  {
    id: 't2',
    name: 'Martín Rodríguez',
    role: 'Implante Inmediato',
    initials: 'MR',
    bgColor: '#F2F7FF',
    quote: 'El procedimiento con guiado digital 3D fue 100% indoloro. Salí el mismo día comiendo normal.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sofía & Lucía Peralta',
    role: 'Odontopediatría',
    initials: 'SL',
    bgColor: '#F5F5F5',
    quote: 'La atención pediátrica tiene una calidez humana increíble. Mis hijas salen felices del consultorio.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Gonzalo Farías',
    role: 'Diseño de Sonrisa',
    initials: 'GF',
    bgColor: '#FFEDE0',
    quote: 'Las carillas cerámicas de alta durabilidad superaron cualquier expectativa. Quedaron impecables.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 't5',
    name: 'DFW Ortodoncia',
    role: 'Implantes & Prótesis',
    initials: 'DO',
    bgColor: '#F5F5F5',
    quote: 'Resolvieron un caso complejo en tiempo récord. El mejor equipo odontológico que me atendió.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export const TestimonialsStackSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Desktop GSAP scroll animation (only active on large screens to avoid mobile address bar jumps)
  useGSAP(
    () => {
      // Disable pinned scroll hijacking on mobile/tablet
      if (window.innerWidth < 1024) return;

      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 10%',
          end: `+=${cards.length * 80}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        tl.fromTo(
          card,
          {
            x: 400,
            rotation: 16,
            scale: 0.88,
            opacity: 0,
          },
          {
            x: 0,
            rotation: i % 2 === 0 ? -2.5 : 2.5,
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
              scale: 0.92,
              x: -25,
              opacity: 0.2,
              duration: 1,
            },
            `step-${i}`
          );
        }
      });
    },
    { scope: containerRef }
  );

  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.82));
    setActiveMobileIndex(Math.min(Math.max(newIndex, 0), TESTIMONIALS.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.clientWidth * 0.84;
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(index);
  };

  return (
    <section 
      ref={containerRef}
      id="testimonios" 
      className="mx-auto flex w-full max-w-full overflow-hidden flex-col items-center justify-start py-16 sm:py-24 relative bg-white border-b border-slate-100"
    >
      {/* Title Header */}
      <div className="w-full text-center px-4 mb-8 z-10">
        <span className="text-xs uppercase tracking-widest text-[#0B3B91] font-bold mb-2 inline-block">
          Testimonios Reales
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#000B33] tracking-tight font-sans">
          ¿Por qué nos eligen?
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE NATIVE SWIPE CAROUSEL (< lg): Smooth touch, zero jump, zero lag */}
      {/* ========================================================================= */}
      <div className="w-full lg:hidden flex flex-col items-center">
        
        {/* Horizontal scroll track with snap */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleMobileScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 py-4 gap-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[84vw] max-w-[340px] snap-center rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-slate-200/60 transition-all"
              style={{ backgroundColor: item.bgColor }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl font-normal text-[#000B33] leading-relaxed mb-6">
                "{item.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex size-11 items-center justify-center rounded-full bg-slate-900 text-white font-medium text-sm">
                    {item.initials}
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <p className="font-bold text-[#000B33] text-sm sm:text-base leading-tight">{item.name}</p>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2 mt-5">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeMobileIndex === index ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP STACKED PINNED GSAP DISPLAY (lg:): Retains fluid stack on wheel */}
      {/* ========================================================================= */}
      <div className="relative z-20 hidden lg:flex justify-center items-center h-[460px] w-full max-w-full overflow-hidden mt-8">
        {TESTIMONIALS.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute h-[430px] w-[350px] overflow-hidden rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all border border-slate-200/50"
            style={{
              backgroundColor: item.bgColor,
              zIndex: index + 1,
            }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-2">
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-2xl font-normal text-[#000B33] leading-snug">
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
