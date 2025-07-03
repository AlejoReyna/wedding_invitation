"use client"
import LocationSection from './components/LocationSection';
import CoupleSection from './components/CoupleSection';
import DressCodeSection from './components/DressCodeSection';
import MessageSection from './components/MessageSection';
import RSVPSection from './components/RSVPSection';
import MinimalistFooter from './components/Footer';
import ItinerarySection from './components/ItinerarySection';
import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  const navigationItems = [
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'itinerario', label: 'Itinerario' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'dresscode', label: 'Dress Code' },
    { id: 'mensaje', label: 'Mensaje' },
    { id: 'rsvp', label: 'Confirmar' }
  ];

  return (
    <>
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
        
        {/* Navegación superior minimalista */}
        <nav className="relative z-30 px-6 md:px-12 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between">
              {/* Grupo izquierdo */}
              <ul className="flex items-center space-x-12">
                {navigationItems.slice(0, 2).map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-white/60 hover:text-white text-xs garamond-300 tracking-[0.25em] transition-all duration-500 relative group"
                    >
                      {item.label.toUpperCase()}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500"></span>
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Centro - Solo líneas decorativas */}
              <div className="flex items-center space-x-8">
                <div className="w-12 h-[1px] bg-white/30"></div>
                <div className="w-24 h-[1px] bg-white/30"></div>
                <div className="w-12 h-[1px] bg-white/30"></div>
              </div>
              
              {/* Grupo derecho */}
              <ul className="flex items-center space-x-12">
                {navigationItems.slice(2, 4).map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-white/60 hover:text-white text-xs garamond-300 tracking-[0.25em] transition-all duration-500 relative group"
                    >
                      {item.label.toUpperCase()}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden text-center">
              <ul className="flex justify-center items-center space-x-6 text-xs">
                {navigationItems.slice(0, 3).map((item, index) => (
                  <li key={item.id} className="flex items-center">
                    <a href={`#${item.id}`} className="text-white/70 garamond-300 tracking-[0.15em] hover:text-white transition-colors">
                      {item.label.toUpperCase()}
                    </a>
                    {index < 2 && <span className="text-white/30 ml-6">·</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenido principal - Nombres en la misma fila */}
        <div className="flex-1 flex flex-col justify-start items-center relative z-10 px-6 pt-16 md:pt-24">
          
          {/* Los nombres centrados en la misma fila */}
          <div className="text-center  md:mb-20 animate-fade-in-center">
            {/* Nombres en la misma línea con separador vertical */}
            <div className="flex items-center justify-center space-x-8 md:space-x-16 mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl garamond-regular tracking-[0.05em] text-white drop-shadow-2xl leading-none">
                ANDREA
              </h1>
              
              {/* Separador vertical simple */}
              <div className="w-[1px] h-16 md:h-20 bg-white/50"></div>
              
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
            {/* Línea decorativa superior */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="w-20 h-[1px] bg-white/30"></div>
              <span className="text-white/50 text-xs garamond-300 tracking-[0.25em]">CUENTA REGRESIVA</span>
              <div className="w-20 h-[1px] bg-white/30"></div>
            </div>
            
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
                <svg className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            {/* Enlaces de navegación rápida en footer */}
            <div className="hidden md:flex justify-center items-center space-x-8 mt-8 pt-6 border-t border-white/20">
              {navigationItems.slice(4).map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-white/50 hover:text-white/80 text-xs garamond-300 tracking-[0.2em] transition-colors duration-300"
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </div>
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
    </>
  );
}