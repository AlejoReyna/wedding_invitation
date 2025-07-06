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
import { ThemeProvider } from './context/ThemeContext';

export default function Home() {

  return (
    <ThemeProvider>
      <Navbar />
      <div 
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
        <div className="flex-1 flex flex-col justify-start items-center relative z-10 px-6 pt-24 md:pt-32">
          
          {/* Los nombres centrados en la misma fila */}
          <div className="text-center  md:mb-20 animate-fade-in-center">
            {/* Nombres en la misma línea con separador vertical */}
            <div className="flex items-center justify-center space-x-6 md:space-x-16 mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl garamond-regular tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                ANDREA
              </h1>

              <h2 className="text-2xl mt-8 md:text-6xl lg:text-7xl garamond-regular  text-white drop-shadow-2xl leading-none">
                &
              </h2>
              

              <h1 className="text-4xl md:text-6xl lg:text-7xl garamond-regular tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                ALDO
              </h1>
            </div>

            {/* Save the Date */}
           

            {/* Fecha debajo de Save the Date */}
            <div className="text-center">
              <span className="text-white/80 text-lg md:text-xl garamond-300 tracking-[0.3em] block">
                18 DE OCTUBRE
              </span>
              <span className="text-white/60 text-xs garamond-300 tracking-[0.2em] mt-1 block">
                2025
              </span>
            </div>
          </div>
        </div>

        {/* Footer con countdown - Posición fija en la parte inferior */}
        <div className="relative z-10 pb-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
           
            <CountdownTimer 
              targetDate="2025-10-18T00:00:00" 
              className="animate-fade-in-up animate-delay-800"
            />
            
            {/* Botón de confirmar asistencia */}
            <div className="mt-8">
              <a
                href="#rsvp"
                className="group inline-flex items-center px-6 py-3 bg-black/40 backdrop-blur-sm border border-white/30 text-white/90 hover:bg-black/60 hover:border-white/50 transition-all duration-500 text-xs"
              >
                <span className="garamond-300 tracking-[0.15em]">CONFIRMAR ASISTENCIA</span>
               
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
      </div>
      
      <div id="nosotros">
        <CoupleSection />
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