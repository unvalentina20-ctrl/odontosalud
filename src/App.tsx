import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LogoMarqueeSection } from './components/LogoMarqueeSection';
import { TestimonialsStackSection } from './components/TestimonialsStackSection';
import { AnimatedStatsSection } from './components/AnimatedStatsSection';
import { FloatingPillsCoverageSection } from './components/FloatingPillsCoverageSection';
import { ProcessDemoSection } from './components/ProcessDemoSection';
import { EmbeddedBookingSection } from './components/EmbeddedBookingSection';
import { FaqAccordionSection } from './components/FaqAccordionSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatButton } from './components/WhatsAppFloatButton';
import { BookingCalendar } from './components/BookingCalendar';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#000B33] font-sans antialiased selection:bg-sky-500 selection:text-white">
      
      <Header onOpenBooking={handleOpenBooking} />

      <main className="w-full max-w-full overflow-x-hidden">
        <HeroSection onOpenBooking={handleOpenBooking} />
        <LogoMarqueeSection />
        <TestimonialsStackSection />
        <AnimatedStatsSection />
        <FloatingPillsCoverageSection onOpenBooking={handleOpenBooking} />
        <ProcessDemoSection onOpenBooking={handleOpenBooking} />
        
        {/* Direct Embedded Cal.com Calendar Section */}
        <EmbeddedBookingSection />

        <FaqAccordionSection />
      </main>

      <Footer onOpenBooking={handleOpenBooking} onOpenEmergency={handleOpenBooking} />
      <WhatsAppFloatButton />

      {/* Cal.com Integrated Booking Modal */}
      <BookingCalendar
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
