import React, { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { X, CheckCircle2, MessageCircle, Calendar as CalendarIcon, ArrowRight, User, Clock, MapPin } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinic';

interface BookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingDetails {
  name: string;
  date: string;
  time: string;
  whatsappUrl: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ isOpen, onClose }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const buildWhatsAppUrl = (name: string, date: string, time: string) => {
    const text = `¡Hola! Acabo de reservar un turno a nombre de ${name} para el día ${date} a las ${time}hs. Confirmo mi asistencia.`;
    return `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleBookingSuccess = (name: string, date: string, time: string) => {
    const url = buildWhatsAppUrl(name, date, time);
    const details = { name, date, time, whatsappUrl: url };
    
    setBookingDetails(details);

    try {
      window.open(url, '_blank');
    } catch (err) {
      console.warn('Popup blocked, user can click the confirmation button.', err);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    (async function () {
      try {
        const cal = await getCalApi({ namespace: CLINIC_CONFIG.calComNamespace });
        
        cal('ui', {
          theme: 'light',
          styles: { branding: { brandColor: '#000B33' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });

        cal('on', {
          action: 'bookingSuccessful',
          callback: (e: any) => {
            const data = e.detail?.data || e.detail || {};
            const name = data.name || data.responses?.name || 'Paciente';
            const startTimeStr = data.startTime || data.date || '';

            let dateFormatted = 'Fecha agendada';
            let timeFormatted = 'Hora agendada';

            if (startTimeStr) {
              const d = new Date(startTimeStr);
              dateFormatted = d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
              timeFormatted = d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
            }

            handleBookingSuccess(name, dateFormatted, timeFormatted);
          },
        });
      } catch (err) {
        console.error('Error initializing Cal.com embed:', err);
      }
    })();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 overflow-y-auto font-sans">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#000B33] text-white flex items-center justify-center shadow-sm">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#000B33] text-base leading-tight">
                Agendar Turno - {CLINIC_CONFIG.clinicName}
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Seleccioná el día y horario que mejor te convenga
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 min-h-[500px]">
          
          {/* Hero-Style Success Screen */}
          {bookingDetails ? (
            <div className="relative w-full max-w-lg mx-auto my-4 overflow-hidden rounded-[32px] bg-gradient-to-b from-[#EEF4FF] via-white to-white p-8 sm:p-10 border border-sky-100 shadow-xl text-center space-y-6">
              
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-sky-200/50 blur-3xl rounded-full pointer-events-none" />

              {/* Glowing Icon */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-11 h-11" />
              </div>

              {/* Title & Subtitle */}
              <div className="relative z-10 space-y-2">
                <h4 className="text-3xl font-normal text-[#000B33] tracking-tight">
                  ¡Turno Reservado con Éxito!
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Guardamos tu reserva. Confirmá tu asistencia por WhatsApp para finalizar.
                </p>
              </div>

              {/* Detailed Summary Card Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-3 text-left bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/70 shadow-sm text-xs text-slate-700">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/70">
                  <User className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Paciente</span>
                    <span className="font-semibold text-[#000B33] truncate block">{bookingDetails.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/70">
                  <CalendarIcon className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Fecha</span>
                    <span className="font-semibold text-[#000B33] block">{bookingDetails.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/70">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Hora</span>
                    <span className="font-semibold text-[#000B33] block">{bookingDetails.time}hs</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/70">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Ubicación</span>
                    <span className="font-semibold text-[#000B33] truncate block">La Plata</span>
                  </div>
                </div>
              </div>

              {/* Premium WhatsApp Confirmation Button */}
              <div className="relative z-10 pt-2">
                <a
                  href={bookingDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base py-4 px-8 shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all no-underline cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Confirmar turno por WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={() => { setBookingDetails(null); onClose(); }}
                className="relative z-10 text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
              >
                Cerrar ventana
              </button>

            </div>
          ) : (
            /* Cal.com Embedded Widget */
            <div className="w-full h-full min-h-[480px]">
              <Cal
                namespace={CLINIC_CONFIG.calComNamespace}
                calLink={CLINIC_CONFIG.calComUrl}
                style={{ width: '100%', height: '100%', minHeight: '480px' }}
                config={{ layout: 'month_view', theme: 'light' }}
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
