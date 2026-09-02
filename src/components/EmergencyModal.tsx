import React from 'react';
import { X, Phone, ShieldAlert, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO, EMERGENCY_GUIDE } from '../data/dentalData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">Guardia & Urgencias Odontológicas</h3>
              <p className="text-xs text-rose-100 font-medium">Atención prioritaria para situaciones de dolor agudo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Direct call box */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              Línea Directa de Guardia
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">Llama ahora mismo para hablar con el odontólogo de turno:</p>
              <a
                href={`tel:${CLINIC_INFO.emergencyPhone.replace(/\s+/g, '')}`}
                className="mt-1 inline-flex items-center gap-2 text-2xl font-extrabold text-rose-700 hover:text-rose-800 tracking-tight"
              >
                <Phone className="w-6 h-6 animate-bounce" />
                <span>{CLINIC_INFO.emergencyPhone}</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Atención inmediata en Av. Corrientes 1450, Piso 3, Buenos Aires.
            </p>
          </div>

          {/* First Aid Emergency Steps */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              ¿Qué hacer mientras vienes a la clínica?
            </h4>

            <div className="space-y-4">
              {EMERGENCY_GUIDE.map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <h5 className="text-sm font-bold text-slate-800 mb-2">{item.title}</h5>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {item.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hola,%20tengo%20una%20urgencia%20dental`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Enviar WhatsApp Urgente
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Agendar Turno Prioritario Hoy
          </button>
        </div>

      </div>
    </div>
  );
};
