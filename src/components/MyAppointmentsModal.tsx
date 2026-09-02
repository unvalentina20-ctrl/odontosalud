import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { X, Calendar, Clock, User, QrCode, Trash2, CheckCircle2, BookmarkCheck, FileText } from 'lucide-react';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = JSON.parse(localStorage.getItem('odontosalud_appointments') || '[]');
        setAppointments(saved);
      } catch (e) {
        console.error('Error loading appointments:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancelAppointment = (id: string) => {
    if (confirm('¿Deseas cancelar esta reserva de turno?')) {
      const updated = appointments.filter(a => a.id !== id);
      setAppointments(updated);
      localStorage.setItem('odontosalud_appointments', JSON.stringify(updated));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <BookmarkCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">Mis Citas & Portal del Paciente</h3>
              <p className="text-xs text-teal-100 font-medium">Turnos reservados en este dispositivo</p>
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
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {appointments.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No tienes citas registradas actualmente.</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Puedes agendar una cita online para limpieza, ortodoncia, implantes o consulta general en menos de 1 minuto.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="mt-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Reservar Mi Primera Cita
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between border-b border-slate-200/80 pb-2">
                    <div>
                      <span className="text-[10px] font-extrabold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full uppercase">
                        Código: {apt.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 font-serif mt-1">
                        {apt.treatmentTitle}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Cancelar Cita"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Paciente:</span>
                      <span className="font-semibold text-slate-800">{apt.patientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Especialista:</span>
                      <span className="font-semibold text-slate-800">{apt.doctorName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Fecha y Hora:</span>
                      <span className="font-bold text-teal-700">{apt.date} a las {apt.time}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Estado:</span>
                      <span className="font-bold text-emerald-600 capitalize">✓ {apt.status}</span>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200">
                      Notas: {apt.notes}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">📍 Av. Corrientes 1450, Piso 3</span>
                    <a
                      href={`https://wa.me/5491155008822?text=Hola,%20consulta%20por%20mi%20cita%20${apt.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 font-bold hover:underline"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Total citas: {appointments.length}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
