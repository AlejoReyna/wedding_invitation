"use client"
import CountdownTimer from '../../components/CountdownTimer';
import { useStatusBarSection } from '../../hooks/useStatusBarManager';
import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  // Obtener el estado del tema
  const { isNightMode } = useTheme();
  
  // Hook para cambiar el color del status bar cuando Hero está visible
  const heroSectionRef = useStatusBarSection({
    sectionId: 'hero',
    color: '#878074', // Color específico para la sección Hero
    defaultColor: isNightMode ? '#000000' : '#ffffff', // Color basado en el tema
    isNightMode // Pasar el estado del tema
  });

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
      {/* Overlay con gradiente más sofisticado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>
      
      {/* Overlay adicional para efecto de opacidad en la parte superior */}
      <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
      
      {/* Contenido principal posicionado más arriba */}
      <div className="flex-1 flex flex-col justify-start items-center relative z-10 px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24">
        
        {/* Fecha principal arriba */}
        <div className="text-center mb-4  animate-fade-in-center animate-delay-300 mt-6 md:mt-0">
          <span className="text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl garamond-300 tracking-[0.25em] sm:tracking-[0.35em] block">
            SÁBADO 18 DE OCTUBRE
          </span>
        </div>

        {/* Los nombres centrados - tamaño más moderado */}
        <div className="text-center animate-fade-in-center animate-delay-600">
          {/* Nombres con tamaños más apropiados */}
          <div className="flex flex-row items-center justify-center max-w-5xl mx-auto mb-4  px-2">
            {/* Nombre ANDREA */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                ANDREA
              </h1>
            </div>

            {/* Símbolo & */}
            <div className="text-center mx-4 md:mx-6 lg:mx-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl garamond-regular text-white/90 drop-shadow-2xl leading-none">
                &
              </h2>
            </div>

            {/* Nombre ALDO */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                ALDO
              </h1>
            </div>
          </div>
        </div>

        {/* Texto descriptivo debajo de los nombres */}
        <div className="text-center animate-fade-in-center animate-delay-900 mb-6 sm:mb-4 ">
          <p className="text-xs mx-auto max-w-5xl px-2 md:text-lg font-light tracking-[0.2em] uppercase text-white/80 italic garamond-300">
            ACOMPÁÑANOS A CELEBRAR 
          </p>
        </div>

        {/* Botón de confirmar asistencia */}
        <div className="text-center animate-fade-in-center animate-delay-1200">
          <a
            href="#rsvp"
            className="group inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-black/50 backdrop-blur-sm border border-white/40 text-white/95 hover:bg-black/70 hover:border-white/60 transition-all duration-500 text-sm sm:text-base"
          >
            <span className="garamond-300 tracking-[0.15em] sm:tracking-[0.2em]">CONFIRMAR ASISTENCIA</span>
          </a>
        </div>
      </div>

      {/* Countdown timer posicionado más abajo sobre la pareja */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <CountdownTimer 
            targetDate="2025-10-18T00:00:00" 
            className="animate-fade-in-up animate-delay-1500"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-center {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-center {
          animation: fade-in-center 1.2s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
          opacity: 0;
        }

        .animate-delay-300 {
          animation-delay: 0.3s;
        }

        .animate-delay-600 {
          animation-delay: 0.6s;
        }

        .animate-delay-900 {
          animation-delay: 0.9s;
        }

        .animate-delay-1200 {
          animation-delay: 1.2s;
        }

        .animate-delay-1500 {
          animation-delay: 1.5s;
        }

        /* Clases de fuente originales mantenidas */
        .garamond-300 {
          font-family: 'EB Garamond', serif;
          font-weight: 300;
        }

        .garamond-regular {
          font-family: 'EB Garamond', serif;
          font-weight: 400;
        }

        /* Mejoras para responsive en textos muy grandes */
        @media (max-width: 640px) {
          h1 {
            line-height: 0.85;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;