import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: '¿Por qué agendar una consulta inicial con OdontoSalud?',
    answer: 'Nuestra primera consulta incluye diagnóstico 3D completo y radiografía digital sin cargo. Te mostramos exactamente el estado actual de tu dentadura y te explicamos las opciones sin compromiso.'
  },
  {
    question: '¿Cómo funcionan los planes de financiamiento?',
    answer: 'Contamos con convenios con las principales prepagas y obras sociales. Para tratamientos estéticos o implantes, ofrecemos financiación en hasta 12 cuotas sin interés y bonificaciones especiales por pago de contado.'
  },
  {
    question: '¿Los tratamientos con escáner 3D reemplazan la pasta tradicional?',
    answer: 'Sí. El escáner iTero Element 5D toma miles de capturas digitales por segundo en HD, eliminando por completo la necesidad de cubetas con pasta molesta y logrando un ajuste perfecto.'
  },
  {
    question: '¿Atienden emergencias durante el día o fin de semana?',
    answer: 'Sí. Disponemos de atención prioritaria para casos de dolor agudo, traumatismos o problemas con prótesis/brackets. Podés coordinar inmediatamente vía WhatsApp.'
  }
];

export const FaqAccordionSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="container mx-auto mt-5 flex max-w-3xl flex-col items-center justify-center gap-10 py-12 md:mt-10 md:gap-14 md:py-20 px-4 font-sans">
      <h2 className="text-3xl md:text-5xl font-normal text-[#000B33] text-center">
        Preguntas frecuentes
      </h2>

      <div className="w-full border-b border-gray-200">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-t border-gray-200">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-4 py-5 text-left transition-colors sm:py-6 cursor-pointer"
              >
                <span className={`font-normal transition-colors md:text-lg ${isOpen ? 'text-[#0B3B91]' : 'text-[#3B5E9B]'}`}>
                  {faq.question}
                </span>
                <div className={`relative flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${isOpen ? 'border-[#0B3B91]' : 'border-[#3B5E9B]'}`}>
                  <span className={`absolute h-[2px] w-[8px] transition-all duration-200 ${isOpen ? 'rotate-0 bg-[#0B3B91]' : 'rotate-90 bg-[#3B5E9B]'}`} />
                  <span className={`absolute h-[2px] w-[8px] transition-all duration-200 ${isOpen ? 'bg-[#0B3B91]' : 'bg-[#3B5E9B]'}`} />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="max-w-[620px] pb-8 font-normal text-[#6F7C86] sm:pb-12 text-base md:text-lg leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
