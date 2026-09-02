import React, { useState } from 'react';
import { REVIEWS, GENERAL_FAQS } from '../data/dentalData';
import { Star, MessageSquareQuote, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Opiniones Reales de Pacientes
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
              Lo que dicen quienes confían su sonrisa en nosotros
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Más de 18,500 pacientes atendidos con un promedio de satisfacción de 4.9 de 5 estrellas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic font-normal">
                    "{review.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-3">
                  {review.avatar && (
                    <img
                      src={review.avatar}
                      alt={review.author}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold text-slate-900">{review.author}</p>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" title="Paciente Verificado" />
                      )}
                    </div>
                    <p className="text-[10px] text-teal-700 font-medium">{review.treatmentName}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* General FAQs Accordion */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Preguntas Frecuentes de la Clínica
            </h3>
            <p className="text-xs text-slate-500">
              Resolvemos tus inquietudes antes de tu primera consulta.
            </p>
          </div>

          <div className="space-y-3">
            {GENERAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-teal-700 flex items-center justify-between gap-2 bg-slate-50/50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
