"use client"
import Image from 'next/image';
import Link from 'next/link';
import LocationSection from './components/LocationSection';
import CoupleSection from './components/CoupleSection';

export default function Home() {
  return (
    <>
      <div 
        className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] animate-background-zoom overflow-hidden"
        style={{
          backgroundImage: `url('/hero.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay para mejor contraste */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 md:px-16 py-4 bg-transparent">
          <div className="flex-1"></div>
          <ul className="flex space-x-6 md:space-x-12 text-white text-base md:text-lg uppercase tracking-wider">
            <li className="hover:text-white/80 text-sm md:text-2xl transition-colors cursor-pointer tracking-[0.5em] font-light">
              <a href="#nosotros">NOSOTROS</a>
            </li>
            <li className="hover:text-white/80 text-sm md:text-2xl transition-colors cursor-pointer tracking-[0.5em] font-light">
              <a href="#ubicacion">UBICACIÓN</a>
            </li>
            <li className="hover:text-white/80 text-sm md:text-2xl transition-colors cursor-pointer tracking-[0.5em] font-light">REGALOS</li>
          </ul>
          <div className="flex-1"></div>
        </nav>

        <main className="relative z-10 flex flex-col items-center justify-center text-center text-white animate-zoom-in">
          {/* Save the Date */}
          <div className="mb-6 md:mb-8 mt-64">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-light tracking-[0.5em] uppercase mb-3 text-white/90">
              Save the Date
            </h1>
            <div className="w-24 md:w-32 h-px bg-white/70 mx-auto"></div>
          </div>

          {/* Nombres de los novios - ahora en una sola línea */}
          <div className="mb-8 md:mb-12 flex flex-row items-center justify-center space-x-6 md:space-x-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide text-white drop-shadow-lg">
              ANDREA
            </h2>
            <span className="text-2xl md:text-4xl lg:text-5xl font-light">&</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide text-white drop-shadow-lg">
              ALDO
            </h2>
          </div>

          {/* Fecha */}
          <div className="text-center">
            <h3 className="text-base md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase text-white/95">
              10 de Junio de 2025
            </h3>
          </div>
        </main>

        {/* Invitación - Parte inferior */}
        <div className="absolute bottom-8 left-0 right-0 z-10 text-center animate-fade-in-up">
          <div className="w-16 md:w-24 h-px bg-white/60 mx-auto mb-4"></div>
          <p className="text-lg md:text-2xl font-serif font-light lg:text-3xl tracking-wide text-white/90 px-4 animate-slide-in-left">
            Acompañanos a nuestro día tan especial
          </p>
        </div>

        <style jsx>{`
          @keyframes zoom-in {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes background-zoom {
            0% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

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

          .animate-zoom-in {
            animation: zoom-in 1.2s ease-out forwards;
          }

          .animate-background-zoom {
            animation: background-zoom 2s ease-out forwards;
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
    </>
  );
}
