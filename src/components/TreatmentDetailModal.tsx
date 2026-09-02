import React, { useState } from 'react';
import { Treatment } from '../types';
import { X, Clock, Calendar, Check, HelpCircle, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onOpenBooking: (treatment: Treatment) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onOpenBooking
}) => {
  const [sliderPos, setSliderPos] = useState(50);

  if (!treatment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-semibold text-teal-200 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Detalle de Especialidad</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white">
            {treatment.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-teal-100">
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
              <Clock className="w-3.5 h-3.5" />
              Duración: {treatment.duration}
            </span>
            {treatment.recommendedFrequency && (
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Frecuencia: {treatment.recommendedFrequency}
              </span>
            )}
            <span className="bg-teal-500/30 text-teal-200 px-3 py-1 rounded-full font-bold">
              ${treatment.estimatedPrice.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Descripción del tratamiento
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {treatment.fullDesc}
            </p>
          </div>

          {/* Interactive Before & After comparison slider if available */}
          {treatment.beforeAfterImage && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Resultado Estético Típico (Antes vs Después)
              </h4>

              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden select-none border border-slate-200 shadow-inner">
                {/* After Image (Background) */}
                <img
                  src={treatment.beforeAfterImage.after}
                  alt="Resultado Después"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-teal-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-xs z-10">
                  DESPUÉS
                </span>

                {/* Before Image (Clipped Overlay) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={treatment.beforeAfterImage.before}
                    alt="Resultado Antes"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-xs z-10">
                    ANTES
                  </span>
                </div>

                {/* Slider bar control */}
                <div
                  className="absolute inset-y-0 z-20 w-1 bg-white cursor-ew-resize shadow-md flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-white text-teal-700 shadow-lg flex items-center justify-center text-xs font-bold border border-teal-200">
                    ↔
                  </div>
                </div>

                {/* Invisible input range overlay */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Deslizar para comparar antes y después"
                />
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-1">
                Desliza la barra para ver la transformación estética antes y después del tratamiento.
              </p>
            </div>
          )}

          {/* Key Benefits */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Beneficios Clave
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {treatment.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-teal-50/50 p-3 rounded-xl border border-teal-100/80">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs if present */}
          {treatment.faqs && treatment.faqs.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                Preguntas Frecuentes
              </h4>
              <div className="space-y-3">
                {treatment.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <p className="text-xs font-bold text-slate-800">{faq.question}</p>
                    <p className="text-xs text-slate-600 mt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Valor Estimativo:</span>
            <span className="text-lg font-extrabold text-slate-900">
              ${treatment.estimatedPrice.toLocaleString('es-AR')}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking(treatment);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-teal-600/20 transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservar Cita Ahora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
