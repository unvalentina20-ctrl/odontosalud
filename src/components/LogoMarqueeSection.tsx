import React from 'react';

const LOGOS = [
  { name: 'OSDE', text: 'OSDE' },
  { name: 'Swiss Medical', text: 'SWISS MEDICAL' },
  { name: 'Galeno', text: 'GALENO' },
  { name: 'Medifé', text: 'MEDIFÉ' },
  { name: 'IOMA', text: 'IOMA' },
  { name: 'Invisalign', text: 'INVISALIGN®' },
  { name: 'Straumann', text: 'STRAUMANN 3D' },
  { name: 'iTero', text: 'iTERO ELEMENT' },
];

export const LogoMarqueeSection: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-10 border-b border-gray-100 font-sans">
      <div className="relative mx-auto max-w-screen-2xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-widest text-[#6E88B5] font-semibold mb-6">
            Trabajamos con las principales prepagas
          </span>

          {/* Fade gradients on edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-l from-white to-transparent" />

          {/* Infinite Marquee Track */}
          <div className="w-full overflow-hidden flex">
            <div className="flex shrink-0 items-center justify-around gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
              {LOGOS.concat(LOGOS).map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center font-bold text-slate-400 text-sm sm:text-base tracking-wider hover:text-[#000B33] transition-colors cursor-default select-none"
                >
                  {logo.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
