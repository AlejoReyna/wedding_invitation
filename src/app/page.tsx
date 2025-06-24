"use client"
import { useState } from 'react';
import LocationSection from './components/LocationSection';
import CoupleSection from './components/CoupleSection';
import DressCodeSection from './components/DressCodeSection';
import MessageSection from './components/MessageSection';
import RSVPSection from './components/RSVPSection';
import MinimalistFooter from './components/Footer';
// ↓ NUEVO: Importamos nuestro countdown timer
import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  const navigationItems = [
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'dresscode', label: 'Dress Code' },
    { id: 'mensaje', label: 'Mensaje' },
    { id: 'rsvp', label: 'Confirmar' },
    { id: 'regalos', label: 'Regalos' }
  ];

  return (
    <>
      <div 
        className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden"
        style={{
          backgroundImage: `url('/hero.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay para mejor contraste */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Navegación minimalista horizontal */}
        <nav className="absolute top-0 left-0 w-full z-30 px-4 md:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
              {navigationItems.map((item, index) => (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    className="text-white/80 hover:text-white text-sm tracking-[0.2em] font-light transition-all duration-300 group"
                  >
                    <span className="relative">
                      {item.label.toUpperCase()}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Navigation - Full width */}
            <div className="md:hidden">
              <ul className="flex items-center justify-center space-x-3 text-[10px] garamond-300 sm:text-xs">
                <li>
                  <a href="#nosotros" className="text-white/80 tracking-[0.12em]  hover:text-white transition-colors">NOSOTROS</a>
                </li>
                <li className="text-white/40">·</li>
                <li>
                  <a href="#ubicacion" className="text-white/80 tracking-[0.12em] font-light hover:text-white transition-colors">UBICACIÓN</a>
                </li>
                <li className="text-white/40">·</li>
                <li>
                  <a href="#dresscode" className="text-white/80 tracking-[0.12em] font-light hover:text-white transition-colors">DRESS CODE</a>
                </li>
                <li className="text-white/40">·</li>
                <li>
                  <a href="#rsvp" className="text-white/80 tracking-[0.12em] font-light hover:text-white transition-colors">RSVP</a>
                </li>
                <li className="text-white/40">·</li>
                <li>
                  <a href="#regalos" className="text-white/80 tracking-[0.12em] font-light hover:text-white transition-colors">AFTER</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="relative z-10 flex flex-col items-center justify-center text-center text-white">
          {/* Fecha del evento - Ahora va primero */}
          <div className="mb-2 md:mb-8 mt-64">
            <h1 className="text-2xl garamond-300 md:text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase mb-1 text-white/90">
            19 de JUNIO
            </h1>
          </div>

          {/* Nombres de los novios */}
          <div className="mb-2 text-4xl md:mb-12 flex flex-row items-center garamond-regular justify-center space-x-6 md:space-x-10">
            <h2 className="md:text-5xl lg:text-6xl  tracking-wide text-white drop-shadow-lg">
              ANDREA
            </h2>
            <span className="text-white/90">&</span>
            <h2 className="text-white/90 drop-shadow-lg">
              ALDO
            </h2>
          </div>

          {/* Save the Date - Ahora va después de los nombres */}
            <div className="w-84 md:w-24 h-px bg-white/60 mx-auto mb-2"></div>
            <p className="text-xl garamond-300 md:text-2xl  lg:text-3xl tracking-wide text-white/90 px-4 animate-slide-in-left">
              SAVE THE DATE
            </p>
        </main>

        {/* Countdown Timer - Ahora va en la parte inferior */}
        <div className="absolute bottom-2 left-0 right-0 z-10 px-4">
          <div className="w-full max-w-4xl mx-auto">
            <CountdownTimer 
              targetDate="2025-06-19T00:00:00" 
              className="animate-fade-in-up"
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-in-left {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 1.5s ease-out 0.3s forwards;
            opacity: 0;
          }

          .animate-slide-in-left {
            animation: slide-in-left 1.2s cubic-bezier(0.77,0,0.175,1) 1.8s both;
          }
        `}</style>
      </div>
      <div id="nosotros">
        <CoupleSection />
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