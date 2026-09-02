import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Ultra-smooth scroll-to-top with power4 ease-out deceleration curve for soft landing at top
  const scrollToTopSmooth = () => {
    const triggers = ScrollTrigger.getAll();
    triggers.forEach((t) => t.disable(false));

    const start = window.scrollY;
    if (start === 0) {
      triggers.forEach((t) => t.enable());
      return;
    }

    const duration = 1400; // 1.4 seconds for a silky smooth touchdown glide
    const startTime = performance.now();

    const animateScroll = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Power4 (Quartic) easeOut curve: fast initial departure, ultra-soft gradual deceleration at the end
      const eased = 1 - Math.pow(1 - progress, 4);

      window.scrollTo(0, start * (1 - eased));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setTimeout(() => {
          triggers.forEach((t) => t.enable());
          ScrollTrigger.refresh();
        }, 50);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <footer className="w-full font-sans bg-[#F8FAFC] border-t border-slate-200/80">
      
      {/* Pre-footer Call to Action */}
      <div className="w-full py-20 md:py-24 border-b border-slate-200/60 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-normal text-[#000B33] leading-tight tracking-tight">
            Diseñá la sonrisa que siempre quisiste
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-normal">
            Consultá sin cargo y recibí tu diagnóstico digital 3D en la primera cita.
          </p>
          <div>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-full bg-[#000B33] hover:bg-slate-800 px-9 py-4 text-base font-medium text-white transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Agendar Turno Online</span>
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Light Footer */}
      <div className="w-full py-16 text-slate-700">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Brand + Description */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-slate-200" />
                </div>
                <span className="font-bold text-[#000B33] text-xl tracking-tight">
                  Odonto<span className="text-slate-500 font-normal">Salud</span>
                </span>
              </div>
              
              <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-md">
                Centro odontológico especializado en tecnología 3D, implantología inmediata y ortodoncia invisible en La Plata y la región.
              </p>

              <div className="text-xs text-slate-500 space-y-1">
                <p className="font-medium text-slate-700">Calle 50 N° 1234, La Plata, Buenos Aires</p>
                <p>Teléfono: +54 (221) 555-1234 | WhatsApp: +54 9 221 555-1234</p>
              </div>
            </div>

            {/* Navigation Column 1 */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-wider text-slate-900 uppercase mb-2">Especialidades</span>
              {['Ortodoncia Invisible 3D', 'Implantes Inmediatos', 'Estética & Carillas', 'Odontopediatría', 'Endodoncia'].map((item) => (
                <span key={item} className="text-sm text-slate-600 font-normal hover:text-[#000B33] transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>

            {/* Navigation Column 2 */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-wider text-slate-900 uppercase mb-2">Navegación</span>
              {[
                { label: 'Inicio', id: 'inicio' },
                { label: 'Por qué elegirnos', id: 'testimonios' },
                { label: 'Especialidades', id: 'cobertura' },
                { label: 'Proceso', id: 'proceso' },
                { label: 'Preguntas frecuentes', id: 'faq' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-sm text-slate-600 font-normal hover:text-[#000B33] transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

          </div>

          {/* Bottom Line */}
          <div className="border-t border-slate-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-normal">
              © 2026 OdontoSalud · Centro Odontológico 3D · Todos los derechos reservados.
            </span>
            <button
              onClick={scrollToTopSmooth}
              className="text-xs font-semibold text-slate-700 hover:text-[#000B33] transition-colors cursor-pointer flex items-center gap-1 group"
            >
              <span>Volver arriba</span>
              <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
