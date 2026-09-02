import React, { useState, useEffect } from 'react';
import { TREATMENTS, DOCTORS } from '../data/dentalData';
import { Treatment, Doctor, Appointment, ToothInfo } from '../types';
import { X, Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle2, QrCode, ArrowRight, ArrowLeft, ShieldCheck, Download } from 'lucide-react';

interface BookingWizardModalProps {
  isOpen: boolean;
  initialTreatment?: Treatment | null;
  initialTooth?: ToothInfo | null;
  initialNote?: string;
  onClose: () => void;
  onAppointmentCreated: (appointment: Appointment) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  isOpen,
  initialTreatment,
  initialTooth,
  initialNote,
  onClose,
  onAppointmentCreated
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(
    initialTreatment?.id || TREATMENTS[0].id
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [patientNotes, setPatientNotes] = useState('');

  // Created appointment result
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Generate next 7 available dates (excluding Sundays)
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; dates.length < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) { // Exclude Sunday
        const dayName = d.toLocaleDateString('es-AR', { weekday: 'short' });
        const dayNum = d.getDate();
        const monthName = d.toLocaleDateString('es-AR', { month: 'short' });
        const iso = d.toISOString().split('T')[0];
        dates.push({ iso, label: `${dayName} ${dayNum} ${monthName}`, dayNum, dayName });
      }
    }
    return dates;
  }, []);

  const availableTimeSlots = [
    '08:30 hs', '09:15 hs', '10:00 hs', '11:30 hs', 
    '14:00 hs', '15:15 hs', '16:30 hs', '17:45 hs', '19:00 hs'
  ];

  useEffect(() => {
    if (initialTreatment) {
      setSelectedTreatmentId(initialTreatment.id);
    }
    if (initialNote) {
      setPatientNotes(initialNote);
    }
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].iso);
      setSelectedTime(availableTimeSlots[2]);
    }
  }, [initialTreatment, initialNote, availableDates]);

  if (!isOpen) return null;

  const currentTreatment = TREATMENTS.find(t => t.id === selectedTreatmentId) || TREATMENTS[0];
  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    const appointmentCode = `OD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAppointment: Appointment = {
      id: appointmentCode,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      treatmentId: currentTreatment.id,
      treatmentTitle: currentTreatment.title,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      date: selectedDate,
      time: selectedTime,
      notes: patientNotes.trim() + (initialTooth ? ` (Pieza dental #${initialTooth.number})` : ''),
      toothNumber: initialTooth?.number,
      isFirstVisit,
      status: 'confirmada',
      createdAt: new Date().toISOString(),
      qrCodeValue: `ODONTOSALUD-${appointmentCode}-${patientName.trim()}`
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('odontosalud_appointments') || '[]');
      localStorage.setItem('odontosalud_appointments', JSON.stringify([newAppointment, ...existing]));
    } catch (e) {
      console.error('Error saving appointment:', e);
    }

    setCreatedAppointment(newAppointment);
    onAppointmentCreated(newAppointment);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-sky-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">Reserva de Cita Online</h3>
              <p className="text-xs text-teal-100 font-medium">Paso {step} de 3 - Confirmación Inmediata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200/80 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-teal-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>1</span>
            <span>Tratamiento</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-teal-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>2</span>
            <span>Fecha & Especialista</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-teal-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>3</span>
            <span>Datos</span>
          </div>
        </div>

        {/* Wizard Step Forms */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* Step 1: Select Treatment */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Selecciona la especialidad o motivo de consulta:
              </h4>

              {initialTooth && (
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 font-medium">
                  🦷 Consulta pre-seleccionada para la <span className="font-bold">Pieza Dental #{initialTooth.number}</span> ({initialTooth.name}).
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TREATMENTS.map((t) => {
                  const isSelected = t.id === selectedTreatmentId;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTreatmentId(t.id)}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-500 shadow-sm ring-1 ring-teal-500'
                          : 'bg-slate-50 border-slate-200/80 hover:border-teal-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{t.title}</span>
                        <span className="text-[11px] font-semibold text-teal-700">
                          ${t.estimatedPrice.toLocaleString('es-AR')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{t.shortDesc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2"
                >
                  <span>Siguiente: Fecha y Doctor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date, Time Slot & Doctor */}
          {step === 2 && (
            <div className="space-y-5">
              
              {/* Doctor picker */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Selecciona tu odontólogo tratante:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DOCTORS.map((doc) => {
                    const isSelected = doc.id === selectedDoctorId;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`cursor-pointer p-3 rounded-2xl border flex items-center space-x-3 transition-all ${
                          isSelected
                            ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500'
                            : 'bg-slate-50 border-slate-200 hover:bg-white'
                        }`}
                      >
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-slate-300 shrink-0"
                        />
                        <div className="text-left overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 truncate">{doc.name}</p>
                          <p className="text-[10px] text-teal-700 truncate">{doc.specialty}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date selection grid */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Selecciona la fecha disponible:
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((d) => {
                    const isSelected = d.iso === selectedDate;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setSelectedDate(d.iso)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-[10px] uppercase block opacity-80">{d.dayName}</span>
                        <span className="text-base font-extrabold block">{d.dayNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Selecciona el horario:
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {availableTimeSlots.map((time) => {
                    const isSelected = time === selectedTime;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2"
                >
                  <span>Siguiente: Tus Datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* Step 3: Patient Info Form */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Resumen: {currentTreatment.title}</span>
                  <span className="font-bold text-teal-700">${currentTreatment.estimatedPrice.toLocaleString('es-AR')}</span>
                </div>
                <p>Especialista: {currentDoctor.name} ({currentDoctor.specialty})</p>
                <p>Fecha y hora: {selectedDate} a las {selectedTime}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nombre Completo del Paciente *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Ej. María Laura Rodríguez"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="Ej. +54 11 5544-3322"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Correo Electrónico (Opcional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="paciente@email.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="firstVisit"
                    checked={isFirstVisit}
                    onChange={(e) => setIsFirstVisit(e.target.checked)}
                    className="w-4 h-4 accent-teal-600 rounded"
                  />
                  <label htmlFor="firstVisit" className="text-xs font-medium text-slate-700 cursor-pointer">
                    Es mi primera visita en OdontoSalud (incluye diagnóstico inicial 3D)
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Comentarios o Síntomas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="Siento sensibilidad al frío, deseo consulta estética..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all active:scale-95 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmar Mi Cita Dental</span>
                </button>
              </div>

            </form>
          )}

          {/* Step 4: Digital Confirmation Ticket */}
          {step === 4 && createdAppointment && (
            <div className="text-center space-y-5">
              
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-teal-600" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">
                  ¡Cita Confirmada Exitosamente!
                </span>
                <h4 className="text-xl font-bold font-serif text-slate-900 mt-2">
                  Te esperamos en OdontoSalud
                </h4>
                <p className="text-xs text-slate-500">
                  Código de Reserva: <span className="font-extrabold text-teal-700">{createdAppointment.id}</span>
                </p>
              </div>

              {/* Digital Ticket Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-3xl text-left border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-teal-400 font-extrabold uppercase tracking-widest">
                      Ticket de Turno Digital
                    </span>
                    <p className="text-base font-bold text-white font-serif">
                      {createdAppointment.treatmentTitle}
                    </p>
                  </div>

                  {/* Simulated QR code box */}
                  <div className="w-14 h-14 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
                    <QrCode className="w-full h-full text-slate-900" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Paciente:</span>
                    <span className="font-bold text-white">{createdAppointment.patientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Especialista:</span>
                    <span className="font-bold text-white">{createdAppointment.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Fecha & Hora:</span>
                    <span className="font-bold text-teal-300">{createdAppointment.date} - {createdAppointment.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sede:</span>
                    <span className="font-bold text-white">Av. Corrientes 1450, Piso 3</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>📱 Confirmación enviada por SMS/WhatsApp</span>
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/5491155008822?text=Hola,%20confirm%C3%A9%20mi%20cita%20c%C3%B3digo%20${createdAppointment.id}%20para%20el%20${createdAppointment.date}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Enviar por WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Finalizar y Cerrar
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
