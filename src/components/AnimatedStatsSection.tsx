import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { target: 19, suffix: '%', label: 'Descuento promedio en tratamiento' },
  { target: 15, suffix: '+', label: 'Años de experiencia clínica' },
  { target: 10, suffix: 'k+', label: 'Sonrisas transformadas' },
  { target: 99, suffix: '%', label: 'Satisfacción garantizada' },
];

function SubtleCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1800; // 1.8 seconds duration
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutCubic curve for subtle, elegant count-up without harsh jittering
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <div className="inline-flex items-baseline font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[85px] leading-[120%] tracking-[-2px] text-[#6F7C86] font-normal select-none">
      <span className="tabular-nums font-normal">{val}</span>
      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] text-[#6F7C86]/80 font-normal">{suffix}</span>
    </div>
  );
}

export const AnimatedStatsSection: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="estadisticas" className="w-full bg-white py-24 lg:py-36 font-sans border-b border-slate-100">
      <div className="container mx-auto max-w-7xl overflow-hidden px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-center">
                <SubtleCounter target={stat.target} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-center font-sans text-base md:text-lg font-normal leading-normal text-gray-500 max-w-[200px] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
