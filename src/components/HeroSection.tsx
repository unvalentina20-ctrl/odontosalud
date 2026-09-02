import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="inicio" className="relative w-full pt-32 pb-0 md:pt-40 md:pb-0 overflow-hidden bg-gradient-to-b from-[#EEF4FF] via-white to-white font-sans">
      
      {/* Soft background light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-200/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-screen-xl px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#000B33] max-w-5xl leading-[1.1] mb-6">
          La forma más rápida de renovar tu sonrisa en 3D
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-lg sm:text-xl font-normal max-w-2xl leading-relaxed mb-10">
          Escaneo intraoral digital sin moldes molestos, diagnósticos 3D en el día y atención indolora con los mejores especialistas.
        </p>

        {/* Single Primary CTA */}
        <div className="flex items-center justify-center mb-12 z-10">
          <button
            onClick={onOpenBooking}
            className="hover:bg-slate-800 inline-flex items-center gap-3 rounded-full bg-[#000B33] px-9 py-4 text-base font-medium text-white transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-sky-400" />
            <span>Agendar Turno Online</span>
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Seamless Dentist Portrait with mix-blend-multiply and bottom gradient mask */}
        <div className="relative w-full max-w-2xl mx-auto flex justify-center mt-2">
          <img
            src="/dentist-hero.png"
            alt="OdontoSalud Especialista"
            className="w-auto h-[380px] sm:h-[480px] object-contain mix-blend-multiply [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] contrast-[1.03]"
          />
        </div>

      </div>
    </section>
  );
};
