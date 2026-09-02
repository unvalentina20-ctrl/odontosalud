import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatButton: React.FC = () => {
  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/5492215551234?text=${encodeURIComponent('Hola OdontoSalud! Quisiera consultar por un turno.')}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleOpenWhatsApp}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-[#000B33] hover:bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-full shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      title="Contactar por WhatsApp"
    >
      <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
      <span>Consultar por WhatsApp</span>
    </button>
  );
};
