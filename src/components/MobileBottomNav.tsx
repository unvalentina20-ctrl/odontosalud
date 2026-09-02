import React from 'react';
import { Calendar, Phone, MessageSquare, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface MobileBottomNavProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenBooking,
  onOpenChat
}) => {
  const scrollToLocation = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-around">
      <button
        onClick={onOpenBooking}
        className="flex flex-col items-center gap-1 text-teal-600 active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30">
          <Calendar className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-bold text-teal-800">Reservar</span>
      </button>

      <a
        href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
        className="flex flex-col items-center gap-1 text-slate-600 active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
          <Phone className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-medium">Llamar</span>
      </a>

      <button
        onClick={onOpenChat}
        className="flex flex-col items-center gap-1 text-slate-600 active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-medium">Chat IA</span>
      </button>

      <button
        onClick={scrollToLocation}
        className="flex flex-col items-center gap-1 text-slate-600 active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
          <MapPin className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-medium">Mapa</span>
      </button>
    </div>
  );
};
