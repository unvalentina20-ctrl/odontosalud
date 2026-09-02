import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Treatment } from '../types';

interface TreatmentsSectionProps {
  onSelectTreatment: (treatment: Treatment) => void;
  onOpenBookingForTreatment: (treatment: Treatment) => void;
}

const OPTIONS = [
  {
    title: 'Ortodoncia Invisible',
    value: '$120.000',
    sub: 'Alineadores Invisalign® 3D',
    barLabelLeft: 'Tradicional',
    barLabelRight: 'Avanzado',
    barVal: 95,
  },
  {
    title: 'Implante Carga Inmediata',
    value: '$180.000',
    sub: 'Guiado por tomografía 3D',
    barLabelLeft: 'Económico',
    barLabelRight: 'Premium',
    barVal: 88,
  },
  {
    title: 'Diseño & Blanqueamiento',
    value: '$45.000',
    sub: 'Láser LED en 1 sesión',
    barLabelLeft: 'Básico',
    barLabelRight: 'Estética Alta',
    barVal: 92,
  },
];

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onOpenBookingForTreatment }) => {
  const [selectedCity] = useState('La Plata');

  return (
    <section id="servicios" className="w-full scroll-mt-20 bg-white py-16 md:py-24 font-sans">
      <div className="container mx-auto flex max-w-[1700px] flex-col items-center justify-start gap-14 px-4">
        
        {/* Section Header */}
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-6 text-center">
          <div className="inline-flex flex-col items-center justify-start self-stretch">
            <h2 className="text-3xl font-normal leading-tight text-[#000B33] md:text-5xl md:leading-[52.80px]">
              Opciones de tratamiento en
            </h2>
            <div className="relative inline-block mt-2">
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center gap-2 border-b-2 border-slate-400 pb-1 text-3xl font-normal text-slate-600 transition-colors hover:text-[#000B33] md:text-5xl"
              >
                <span>{selectedCity}</span>
                <ChevronDown className="size-6 text-slate-500" />
              </button>
            </div>
          </div>
          <p className="text-base text-[#6F7C86] md:text-lg max-w-xl font-normal">
            Diagnósticos instantáneos 3D y planes de pago personalizados.
          </p>
        </div>

        {/* 3 Clean DocShield Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {OPTIONS.map((opt, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-between rounded-3xl bg-[#F2F7FF] p-8 border border-[#C0D7FF]/40 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4 text-left">
                <span className="text-base font-medium text-[#6E88B5]">{opt.title}</span>
                <div className="text-4xl md:text-5xl font-normal leading-none text-[#0B3B91]">
                  {opt.value}
                </div>
                <span className="text-sm font-normal text-[#6E88B5]">{opt.sub}</span>
              </div>

              {/* Clean Progress Bar */}
              <div className="mt-8 pt-4 border-t border-[#C0D7FF]/30 space-y-2">
                <div className="flex justify-between items-center text-xs text-[#6E88B5] font-medium">
                  <span>{opt.barLabelLeft}</span>
                  <span>{opt.barLabelRight}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#C0D7FF]/30 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#0B3B91] transition-all duration-1000"
                    style={{ width: `${opt.barVal}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dual Bottom CTAs */}
        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenBookingForTreatment(OPTIONS[0] as any)}
            className="hover:bg-[#000B33]/90 inline-flex items-center gap-2 rounded-full bg-[#000B33] px-8 py-4 text-base font-normal leading-none text-white transition-all cursor-pointer shadow-md"
          >
            <span className="text-nowrap font-medium">Agendar Consulta</span>
            <ArrowRight className="size-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
