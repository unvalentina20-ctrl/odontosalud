import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/dentalData';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Navigation, Car } from 'lucide-react';

export const LocationAndHours: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setFormSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setFormSent(false);
    }, 4000);
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            Ubicación & Contacto
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
            Visítanos en el corazón de la ciudad
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Fácil acceso en transporte público, estacionamiento exclusivo para pacientes e instalaciones accesibles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Clinic Location & Hours Info */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-6">
            
            <div className="space-y-3">
              <h3 className="text-lg font-bold font-serif text-slate-900">
                {CLINIC_INFO.name}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{CLINIC_INFO.address}</span>
                    <span className="text-[11px] text-slate-500">A 200m de la Estación Tribunales (Subte D) y Av. 9 de Julio</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{CLINIC_INFO.phone} (Central de Turnos)</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-slate-600">{CLINIC_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Horarios de Atención
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-900 block">Lunes a Viernes:</span>
                  <span>{CLINIC_INFO.openingHours.weekdays}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Sábados:</span>
                  <span>{CLINIC_INFO.openingHours.saturday}</span>
                </div>
              </div>

              <p className="text-[11px] text-rose-700 font-bold pt-1 border-t border-slate-100">
                🚑 Urgencias Odontológicas: {CLINIC_INFO.openingHours.sunday}
              </p>
            </div>

            {/* Insurance Logos / Badges */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Trabajamos con Reintegro de Prepagas y Obras Sociales:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CLINIC_INFO.insuranceAccepted.map((ins, idx) => (
                  <span key={idx} className="bg-white border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-700 text-[11px] font-semibold shadow-2xs">
                    {ins}
                  </span>
                ))}
              </div>
            </div>

            {/* Parking notice */}
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-teal-50/60 p-3 rounded-xl border border-teal-100">
              <Car className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Estacionamiento bonificado 1 hora en Garaje Corrientes 1420 presentando tu ticket de turno.</span>
            </div>

          </div>

          {/* Interactive Contact / Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900">
                Déjanos tu mensaje o consulta
              </h3>
              <p className="text-xs text-slate-500">
                Respondemos todas las consultas en un plazo máximo de 2 horas hábiles.
              </p>
            </div>

            {formSent ? (
              <div className="p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-teal-600 mx-auto" />
                <h4 className="text-sm font-bold text-teal-900">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-xs text-teal-700">
                  Nos pondremos en contacto contigo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Tu Nombre *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Carlos Pérez"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Email o Teléfono *</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@ejemplo.com o +54 11..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Tu Consulta *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu duda sobre precios, turnos o tratamiento..."
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta</span>
                </button>
              </form>
            )}

            {/* Map preview box */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Av.+Corrientes+1450+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors text-center text-xs font-bold"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Navigation className="w-4 h-4 text-teal-400" />
                  <span>Abrir ubicación en Google Maps / Waze</span>
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
