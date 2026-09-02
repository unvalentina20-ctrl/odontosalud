import React from 'react';
import { DOCTORS } from '../data/dentalData';
import { Doctor } from '../types';
import { Star, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SpecialistsSectionProps {
  onOpenBookingForDoctor: (doctor: Doctor) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({
  onOpenBookingForDoctor
}) => {
  return (
    <section id="especialistas" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            Equipo Médico Odontológico
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
            Especialistas de máxima experiencia a tu cuidado
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Todos nuestros odontólogos poseen matrícula nacional oficial, maestrías internacionales y capacitación continua.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-slate-50/70 rounded-3xl p-5 border border-slate-200/80 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-500/5 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Doctor Image */}
                <div className="relative mb-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-48 rounded-2xl object-cover object-top border border-slate-200"
                  />
                  
                  {/* Rating badge */}
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-slate-100 flex items-center gap-1 text-xs font-bold text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({doctor.reviewCount})</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700">
                    {doctor.role}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Matrícula: {doctor.copLicense} • {doctor.experienceYears} años de exp.
                  </p>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">
                  {doctor.bio}
                </p>

                {/* Available days */}
                <div className="mt-3 pt-3 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Días de atención:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {doctor.availableDays.map((day, dIdx) => (
                      <span key={dIdx} className="bg-white text-slate-700 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5">
                <button
                  onClick={() => onOpenBookingForDoctor(doctor)}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar Cita</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
