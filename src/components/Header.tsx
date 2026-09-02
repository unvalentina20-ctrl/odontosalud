import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar if mouse cursor enters top 90px zone
      if (e.clientY < 90) {
        setVisible(true);
      } else if (window.scrollY > 80 && !mobileMenuOpen) {
        // Hide navbar when mouse leaves top zone and page is scrolled down
        setVisible(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY < 50) {
        setVisible(true);
      } else if (!mobileMenuOpen) {
        setVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Invisible Hover Sensor Bar at Top of Viewport */}
      <div 
        onMouseEnter={() => setVisible(true)}
        className="fixed top-0 inset-x-0 h-16 z-40 pointer-events-auto"
      />

      <header
        onMouseEnter={() => setVisible(true)}
        className={`fixed top-5 z-50 mx-auto flex w-full justify-center font-sans px-4 transition-all duration-500 ease-in-out ${
          visible 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-28 opacity-0 pointer-events-none'
        }`}
      >
        {/* High-Transparency Glassmorphism Pill Container */}
        <div className="relative flex w-full max-w-screen-xl items-center justify-between border border-white/50 bg-white/35 backdrop-blur-md py-2.5 pl-6 pr-2 rounded-full shadow-sm shadow-slate-900/5">
          
          {/* Brand Logo - Subtle Monochrome Greys */}
          <div onClick={() => scrollTo('inicio')} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 shadow-sm group-hover:bg-slate-900 transition-colors">
              <Sparkles className="w-4 h-4 text-slate-300" />
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">
              Odonto<span className="text-slate-500 font-normal">Salud</span>
            </span>
          </div>

          {/* Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Inicio', id: 'inicio' },
              { label: 'Por qué elegirnos', id: 'testimonios' },
              { label: 'Especialidades', id: 'cobertura' },
              { label: 'Proceso', id: 'proceso' },
              { label: 'Preguntas', id: 'faq' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-normal leading-tight text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="hover:bg-slate-800 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 leading-none text-white text-sm font-normal transition-all shadow-sm cursor-pointer"
            >
              <span>Agendar Turno</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 rounded-full"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-4 top-20 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 p-6 shadow-2xl z-50">
            <div className="flex flex-col gap-2">
              {['inicio', 'testimonios', 'cobertura', 'proceso', 'faq'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left px-4 py-3 rounded-2xl text-sm font-normal text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="w-full py-3.5 rounded-full bg-slate-900 text-white text-sm font-normal"
              >
                Agendar Turno
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
