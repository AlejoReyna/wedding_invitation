"use client"
import { useEffect } from 'react';
import CountdownTimer from '../../components/CountdownTimer';
import { useStatusBarSection } from '../../hooks/useStatusBarManager';
import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  const { isNightMode } = useTheme();

  const heroSectionRef = useStatusBarSection({
    sectionId: 'hero',
    color: '#4c4c48',
    defaultColor: isNightMode ? '#000000' : '#ffffff',
    isNightMode
  });

  // iOS repaint meta theme-color
  useEffect(() => {
    if (typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setTimeout(() => {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          const currentColor = metaThemeColor.getAttribute('content');
          metaThemeColor.setAttribute('content', '#000000');
          setTimeout(() => {
            metaThemeColor.setAttribute('content', currentColor || '#4c4c48');
          }, 50);
        }
      }, 300);
    }
  }, [isNightMode]);

  return (
    <section
      id="hero-section"
      ref={heroSectionRef}
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url('/hero.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>
      <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col justify-start items-center relative z-10 px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24">

        {/* Fecha */}
        <div className="text-center mb-4 animate-fade-in-center animate-delay-300 mt-6 md:mt-0">
          <span className="mt-12 text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl garamond-300 tracking-[0.25em] sm:tracking-[0.35em] block">
            SÁBADO 18 DE OCTUBRE
          </span>
        </div>

        {/* Nombres */}
        <div className="text-center animate-fade-in-center animate-delay-600">
          <div className="flex flex-row items-center justify-center max-w-5xl mx-auto mb-3 px-2">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                ANDREA
              </h1>
            </div>
            <div className="text-center mx-4 md:mx-6 lg:mx-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl garamond-regular text-white/90 drop-shadow-2xl leading-none">
                &
              </h2>
            </div>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                ALDO
              </h1>
            </div>
          </div>
        </div>

        {/* Subcopy */}
        <div className="text-center animate-fade-in-center animate-delay-900 mb-6 sm:mb-4">
          <p className="text-md mx-auto max-w-5xl px-2 md:text-lg font-light tracking-[0.2em] uppercase text-white/80 italic garamond-300">
            ACOMPÁÑANOS A CELEBRAR
          </p>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-center animate-delay-1200">
          <a
            href="#rsvp"
            className="group inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-black/50 backdrop-blur-sm border border-white/40 text-white/95 hover:bg-black/70 hover:border-white/60 transition-all duration-500 text-sm sm:text-base"
          >
            <span className="garamond-300 rounded-lg tracking-[0.15em] sm:tracking-[0.2em]">
              CONFIRMA TU ASISTENCIA
            </span>
          </a>
        </div>
      </div>

      {/* TIMER – Opción 3: flotante en esquina inferior derecha */}
      <div
        className={`
          absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20
          inline-flex items-center justify-center
          rounded-xl border border-white/20 bg-black/30
          backdrop-blur-[3px] px-3 sm:px-4 py-2
          shadow-lg
        `}
        aria-label="Countdown"
      >
        <CountdownTimer
          targetDate="2025-10-18T00:00:00"
          className="text-white/95 [--ct-number-size:theme(fontSize.base)] sm:[--ct-number-size:theme(fontSize.lg)] md:[--ct-number-size:theme(fontSize.xl)] [--ct-label-size:theme(fontSize.xs)] sm:[--ct-label-size:theme(fontSize.sm)] tracking-[0.08em]"
        />
      </div>

      <style jsx>{`
        @keyframes fade-in-center {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-center { animation: fade-in-center 1.2s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 1.0s ease-out forwards; opacity: 0; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-600 { animation-delay: 0.6s; }
        .animate-delay-900 { animation-delay: 0.9s; }
        .animate-delay-1200 { animation-delay: 1.2s; }

        .garamond-300 { font-family: 'EB Garamond', serif; font-weight: 300; }
        .garamond-regular { font-family: 'EB Garamond', serif; font-weight: 400; }

        @media (max-width: 640px) { h1 { line-height: 0.85; } }
      `}</style>
    </section>
  );
};

export default HeroSection;