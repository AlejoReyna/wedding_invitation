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
        
        {/* Contenido principal - Layout como en la imagen de referencia */}
        <div className="flex-1 flex flex-col justify-start items-center relative z-10 px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28">
          
          {/* Fecha principal arriba - como en la imagen */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8 animate-fade-in-center">
            <span className="text-white/85 text-lg sm:text-xl md:text-2xl lg:text-3xl garamond-300 tracking-[0.2em] sm:tracking-[0.3em] block">
              SÁBADO 18 DE OCTUBRE
            </span>
          </div>

          {/* Los nombres centrados - como en la imagen */}
          <div className="text-center animate-fade-in-center">
            {/* Nombres optimizados para móvil - sin ampersand */}
            <div className="flex flex-col items-center justify-center max-w-6xl mx-auto mb-6 px-2">
              {/* Nombre ANDREA */}
              <div className="text-center mb-4">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                  ANDREA
                </h1>
              </div>

              {/* Nombre ALDO */}
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl garamond-regular tracking-[0.03em] sm:tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                  ALDO
                </h1>
              </div>
            </div>

            {/* Botón de confirmar asistencia debajo de los nombres - más pequeño */}
            <div className="mt-6 sm:mt-8">
              <a
                href="#rsvp"
                className="group inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-black/40 backdrop-blur-sm border border-white/30 text-white/90 hover:bg-black/60 hover:border-white/50 transition-all duration-500 text-xs sm:text-sm"
              >
                <span className="garamond-300 tracking-[0.1em] sm:tracking-[0.12em]">CONFIRMAR ASISTENCIA</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer con countdown - Posición fija en la parte inferior como en la imagen */}
        <div className="relative z-10 pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <CountdownTimer 
              targetDate="2025-10-18T00:00:00" 
              className="animate-fade-in-up animate-delay-800"
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