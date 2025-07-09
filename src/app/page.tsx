"use client"
import LocationSection from './components/LocationSection';
import CoupleSection from './components/CoupleSection';
import DressCodeSection from './components/DressCodeSection';
import MessageSection from './components/MessageSection';
import RSVPSection from './components/RSVPSection';
import MinimalistFooter from './components/Footer';
import ItinerarySection from './components/ItinerarySection';
import CountdownTimer from '../components/CountdownTimer';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import ScrollIndicator from './components/ScrollIndicator';
import { ThemeProvider } from './context/ThemeContext';
import { useNotchColor } from '../hooks/useNotchColor';

export default function Home() {
  // Hook para cambiar el color del notch cuando Hero está visible
  const heroSectionRef = useNotchColor({
    heroColor: '#878074', // Color específico para la sección Hero
    defaultColor: '#ffffff' // Color por defecto
  });

  return (
    <ThemeProvider>
      <Navbar />
      <ScrollIndicator />
      <section 
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/35"></div>
        
        {/* Contenido principal - Nombres en la misma fila */}
        <div className="flex-1 flex flex-col justify-start items-center relative z-10 px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
          
          {/* Los nombres centrados en la misma fila */}
          <div className="text-center md:mb-20 animate-fade-in-center">
            {/* Nombres optimizados para móvil */}
            <div className="flex items-center justify-center max-w-6xl mx-auto mb-8 px-2">
              {/* Nombre ANDREA */}
              <div className="flex-1 text-center min-w-0 pr-4 sm:pr-6 md:pr-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none whitespace-nowrap">
                  ANDREA
                </h1>
              </div>

              {/* Símbolo & con espaciado perfecto */}
              <div className="flex items-center justify-center flex-shrink-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl garamond-regular text-white/80 drop-shadow-2xl leading-none">
                  &
                </h2>
              </div>

              {/* Nombre ALDO */}
              <div className="flex-1 text-center min-w-0 pl-4 sm:pl-6 md:pl-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none whitespace-nowrap">
                  ALDO
                </h1>
              </div>
            </div>

            {/* Fecha principal con espaciado mejorado */}
            <div className="text-center mt-6 sm:mt-8 md:mt-12">
              <span className="text-white/85 text-base sm:text-lg md:text-xl lg:text-2xl garamond-300 tracking-[0.2em] sm:tracking-[0.3em] block">
                18 DE OCTUBRE
              </span>
              <span className="text-white/65 text-sm sm:text-base md:text-lg garamond-300 tracking-[0.15em] sm:tracking-[0.2em] mt-2 block">
                2025
              </span>
            </div>
          </div>
        </div>

        {/* Footer con countdown - Posición fija en la parte inferior */}
        <div className="relative z-10 pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
           
            <CountdownTimer 
              targetDate="2025-10-18T00:00:00" 
              className="animate-fade-in-up animate-delay-800"
            />
            
            {/* Botón de confirmar asistencia */}
            <div className="mt-6 sm:mt-8">
              <a
                href="#rsvp"
                className="group inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-black/40 backdrop-blur-sm border border-white/30 text-white/90 hover:bg-black/60 hover:border-white/50 transition-all duration-500 text-xs sm:text-sm"
              >
                <span className="garamond-300 tracking-[0.1em] sm:tracking-[0.15em]">CONFIRMAR ASISTENCIA</span>
              </a>
            </div>
            
            {/* Enlaces de navegación rápida en footer */}
           
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
            animation: fade-in-center 1.5s ease-out forwards;
            opacity: 0;
          }

          .animate-fade-in-up {
            animation: fade-in-up 1.2s ease-out forwards;
            opacity: 0;
          }

          .animate-delay-500 {
            animation-delay: 0.5s;
          }

          .animate-delay-800 {
            animation-delay: 0.8s;
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
        `}</style>
      </section>
      
      <div id="nosotros">
        <CoupleSection />
      </div>
      <div id="galeria">
        <Gallery />
      </div>
      <div id="itinerario">
        <ItinerarySection />
      </div>
      <div id="ubicacion">
        <LocationSection />
      </div>
      <div id="dresscode">
        <DressCodeSection />
      </div>
      <div id="mensaje">
        <MessageSection />
      </div>
      <div id="rsvp">
        <RSVPSection />
      </div>
      <div id="footer">
        <MinimalistFooter />
      </div>
    </ThemeProvider>
  );
}