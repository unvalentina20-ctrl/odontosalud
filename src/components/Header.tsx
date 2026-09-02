import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Por qué elegirnos', id: 'testimonios' },
  { label: 'Especialidades', id: 'cobertura' },
  { label: 'Proceso', id: 'proceso' },
  { label: 'Preguntas frecuentes', id: 'faq' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Handle scroll direction for mobile & desktop (show on scroll up, hide on scroll down)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileMenuOpen) {
        setVisible(true);
        return;
      }

      if (currentScrollY < 40) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Desktop mousemove near top of screen
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 90) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top hover zone for desktop */}
      <div 
        onMouseEnter={() => setVisible(true)}
        className="fixed top-0 inset-x-0 h-12 z-40 hidden lg:block pointer-events-auto"
      />

      <header
        className={`fixed top-3 sm:top-5 left-0 right-0 z-50 mx-auto flex w-full max-w-full justify-center font-sans px-3 sm:px-6 transition-all duration-300 ease-in-out ${
          visible || mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        {/* Navbar Pill Container with high-contrast glassmorphism */}
        <div className="relative flex w-full max-w-screen-xl items-center justify-between border border-white/70 bg-white/80 backdrop-blur-xl py-2 pl-4 pr-2 sm:py-2.5 sm:pl-6 sm:pr-3 rounded-full shadow-lg shadow-slate-900/5 transition-all">
          
          {/* Brand Logo */}
          <div onClick={() => scrollTo('inicio')} className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none">
            <div className="w-7 h-7 sm:w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-600 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            </div>
            <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
              Odonto<span className="text-sky-600 font-semibold">Salud</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="hover:bg-slate-800 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 leading-none text-white text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Agendar Turno</span>
              <ArrowRight className="w-4 h-4 text-sky-300" />
            </button>
          </div>

          {/* Mobile Right Controls: Quick Book + Menu Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm"
            >
              <span>Turno</span>
              <ArrowRight className="w-3 h-3 text-sky-300" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs -z-10 animate-fade-in"
            />

            {/* Menu Panel */}
            <div className="fixed inset-x-4 top-16 sm:top-20 bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/80 p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left px-4 py-3 rounded-2xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-slate-900 text-white text-sm font-medium shadow-md hover:bg-slate-800 transition-colors"
                >
                  <span>Agendar Turno Online</span>
                  <ArrowRight className="w-4 h-4 text-sky-300" />
                </button>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
