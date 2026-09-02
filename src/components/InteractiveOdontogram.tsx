import React, { useState } from 'react';
import { TEETH_DATA } from '../data/dentalData';
import { ToothInfo } from '../types';
import { Sparkles, Info, Calendar, ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react';

interface InteractiveOdontogramProps {
  onSelectToothForBooking: (tooth: ToothInfo, issueName?: string) => void;
}

export const InteractiveOdontogram: React.FC<InteractiveOdontogramProps> = ({
  onSelectToothForBooking
}) => {
  const [selectedToothNumber, setSelectedToothNumber] = useState<number>(11);
  const [activeArch, setActiveArch] = useState<'all' | 'superior' | 'inferior'>('all');

  const selectedTooth = TEETH_DATA.find(t => t.number === selectedToothNumber) || TEETH_DATA[0];

  // Group teeth into upper and lower arches
  const upperTeeth = TEETH_DATA.filter(t => t.arch === 'superior');
  const lowerTeeth = TEETH_DATA.filter(t => t.arch === 'inferior');

  return (
    <section id="odontograma" className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Odontograma Visual 3D
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-white tracking-tight">
            Toca o haz clic en cualquier pieza dental
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            Explora las molestias o necesidades frecuentes según cada diente para conocer soluciones recomendadas y estimar tu tratamiento.
          </p>
        </div>

        {/* Arch Filter Tabs */}
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => setActiveArch('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeArch === 'all'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Ambas Arcadas (Completo)
          </button>
          <button
            onClick={() => setActiveArch('superior')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeArch === 'superior'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Arcada Superior
          </button>
          <button
            onClick={() => setActiveArch('inferior')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeArch === 'inferior'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Arcada Inferior
          </button>
        </div>

        {/* Grid Container */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Tooth Map Visualizer */}
          <div className="lg:col-span-7 bg-slate-950/80 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            
            {/* Upper Arch Diagram */}
            {(activeArch === 'all' || activeArch === 'superior') && (
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Arcada Superior (Maxilar)
                  </span>
                  <span className="text-[11px] text-slate-500">Notación FDI</span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-3">
                  {upperTeeth.map((tooth) => {
                    const isSelected = tooth.number === selectedToothNumber;
                    return (
                      <button
                        key={tooth.number}
                        onClick={() => setSelectedToothNumber(tooth.number)}
                        className={`group relative p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                          isSelected
                            ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-lg shadow-teal-500/20 scale-105'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-teal-500/50 hover:bg-slate-800'
                        }`}
                      >
                        {/* Tooth SVG icon */}
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 2C8.5 2 6 4.5 6 8.5C6 12 7.5 15.5 9 18C10.2 20 11 21.5 12 21.5C13 21.5 13.8 20 15 18C16.5 15.5 18 12 18 8.5C18 4.5 15.5 2 12 2Z" 
                                fill={isSelected ? '#14b8a6' : '#1e293b'} fillOpacity={isSelected ? '0.4' : '0.2'} />
                        </svg>
                        <span className="text-[11px] font-extrabold tracking-tight">
                          #{tooth.number}
                        </span>
                        <span className="text-[9px] text-slate-400 truncate max-w-[50px] hidden sm:block">
                          {tooth.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Lower Arch Diagram */}
            {(activeArch === 'all' || activeArch === 'inferior') && (
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Arcada Inferior (Mandibular)
                  </span>
                  <span className="text-[11px] text-slate-500">Notación FDI</span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-3">
                  {lowerTeeth.map((tooth) => {
                    const isSelected = tooth.number === selectedToothNumber;
                    return (
                      <button
                        key={tooth.number}
                        onClick={() => setSelectedToothNumber(tooth.number)}
                        className={`group relative p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 scale-105'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800'
                        }`}
                      >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 mb-1 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 2C8.5 2 6 4.5 6 8.5C6 12 7.5 15.5 9 18C10.2 20 11 21.5 12 21.5C13 21.5 13.8 20 15 18C16.5 15.5 18 12 18 8.5C18 4.5 15.5 2 12 2Z" 
                                fill={isSelected ? '#06b6d4' : '#1e293b'} fillOpacity={isSelected ? '0.4' : '0.2'} />
                        </svg>
                        <span className="text-[11px] font-extrabold tracking-tight">
                          #{tooth.number}
                        </span>
                        <span className="text-[9px] text-slate-400 truncate max-w-[50px] hidden sm:block">
                          {tooth.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-400 text-center font-medium">
              💡 Tip: Toca cualquier pieza número FDI para ver detalles de patologías habituales y tratamientos recomendados.
            </p>
          </div>

          {/* Selected Tooth Detail Panel */}
          <div className="lg:col-span-5 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">
                  Pieza Seleccionada #{selectedTooth.number}
                </span>
                <h3 className="text-lg font-bold text-white font-serif mt-0.5">
                  {selectedTooth.name}
                </h3>
              </div>
              <div className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold rounded-xl">
                {selectedTooth.type}
              </div>
            </div>

            {/* Tooth Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Ubicación</span>
                <span className="font-semibold text-slate-200 capitalize">
                  Arcada {selectedTooth.arch} ({selectedTooth.side})
                </span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Cuadrante</span>
                <span className="font-semibold text-slate-200">
                  FDI {Math.floor(selectedTooth.number / 10)}
                </span>
              </div>
            </div>

            {/* Common Issues & Treatments */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-teal-400" />
                Afecciones Comunes y Solución Recomendada:
              </h4>

              <div className="space-y-3">
                {selectedTooth.commonIssues.map((issue, iIdx) => (
                  <div key={iIdx} className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">
                        ⚠️ {issue.issue}
                      </span>
                      <span className="text-xs font-bold text-teal-300">
                        ${issue.estimatedCost.toLocaleString('es-AR')}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-normal">
                      {issue.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-teal-200 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                        <span>{issue.recommendedTreatment}</span>
                      </div>

                      <button
                        onClick={() => onSelectToothForBooking(selectedTooth, issue.recommendedTreatment)}
                        className="px-2.5 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1 shrink-0"
                      >
                        <span>Consultar</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General appointment button for this tooth */}
            <button
              onClick={() => onSelectToothForBooking(selectedTooth)}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Revisión de Pieza #{selectedTooth.number}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
