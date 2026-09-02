import React from 'react';

interface Props {
  onOpenBooking: () => void;
}

export const ProcessDemoSection: React.FC<Props> = ({ onOpenBooking }) => {
  return (
    <section id="proceso" className="w-full px-4 py-16 sm:px-10 font-sans bg-white">
      <div className="mx-auto max-w-screen-2xl">
        
        {/* Section Header */}
        <div className="mx-auto mb-10 flex w-full max-w-[662px] flex-col items-center justify-center gap-4 px-4 md:mb-14 text-center">
          <h2 className="text-3xl font-normal leading-tight text-[#000B33] md:text-5xl md:leading-[52.80px]">
            La forma rápida y transparente que merecés
          </h2>
          <p className="w-full max-w-[488px] text-base text-[#6F7C86] md:text-lg font-normal">
            Sin papelería eterna, sin esperas en sala de guardia y con garantía de tratamiento por escrito.
          </p>
        </div>

        {/* Clean Process Cards Box - Removed Weird Gradient Color Cut */}
        <div className="relative w-full overflow-hidden rounded-[32px] bg-[#F2F7FF] border border-[#C0D7FF]/50 p-8 sm:p-14 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            <div className="bg-white rounded-2xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between space-y-6">
              <span className="text-4xl font-normal text-[#0B3B91]">01</span>
              <div>
                <h3 className="text-xl font-normal text-[#000B33] mb-2">Escaneo Digital 3D</h3>
                <p className="text-sm text-[#6F7C86] leading-relaxed">
                  Escaneamos tu boca en minutos sin moldes de pasta incómodos.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between space-y-6">
              <span className="text-4xl font-normal text-[#0B3B91]">02</span>
              <div>
                <h3 className="text-xl font-normal text-[#000B33] mb-2">Plan a Medida</h3>
                <p className="text-sm text-[#6F7C86] leading-relaxed">
                  Te mostramos la evolución 3D de tu sonrisa antes de empezar.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between space-y-6">
              <span className="text-4xl font-normal text-[#0B3B91]">03</span>
              <div>
                <h3 className="text-xl font-normal text-[#000B33] mb-2">Tratamiento Sin Dolor</h3>
                <p className="text-sm text-[#6F7C86] leading-relaxed">
                  Técnicas mínimamente invasivas con anestesia computarizada.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
