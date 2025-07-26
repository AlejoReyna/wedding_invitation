"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import church from '../../../assets/church.png';
import legalDocument from '../../../assets/legal-document.png';
import nightClub from '../../../assets/night-club.png';
import { useTheme } from '../context/ThemeContext';

interface ItineraryItem {
  time: string;
  displayTime: string;
  title: string;
  description: string;
  location?: string;
}

interface ItineraryItemCardProps {
  item: ItineraryItem;
  index: number;
}

export default function ItineraryItemCard({ item, index }: ItineraryItemCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isNightMode } = useTheme();
  const isRightSide = index % 2 !== 0;

  // Hook para detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint en Tailwind
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCardVisible(true);
            if (cardRef.current) {
              observer.unobserve(cardRef.current);
            }
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getAnimationClasses = () => {
    if (!isCardVisible) {
      // Initial state (hidden) - animations start from the central timeline bar
      if (index === 1) {
        // Ceremonia Civil - starts from center, moves to right
        return 'opacity-0 -translate-x-8 translate-y-12 scale-95';
      } else if (index === 2) {
        // Recepción - starts from center, moves to left  
        return 'opacity-0 translate-x-8 translate-y-12 scale-95';
      } else {
        // Default animation for first card (Ceremonia)
        return 'opacity-0 translate-y-12 scale-95';
      }
    } else {
      // Visible state (all cards appear in their final positions)
      return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    }
  };

  // Función para obtener el icono original según el evento
  const getEventIcon = () => {
    switch (item.title) {
      case 'Ceremonia':
        return (
          <Image 
            src={church} 
            alt="Ceremonia" 
            width={40} 
            height={40} 
            className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
          />
        );
      case 'Ceremonia Civil':
        return (
          <Image 
            src={legalDocument} 
            alt="Ceremonia Civil" 
            width={40} 
            height={40} 
            className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
          />
        );
      case 'Recepción':
        return (
          <Image 
            src={nightClub} 
            alt="Recepción" 
            width={40} 
            height={40} 
            className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ease-out ${getAnimationClasses()}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline Dot */}
      <div className={`absolute left-1/2 top-12 transform -translate-x-1/2 w-8 h-8 z-10 hidden md:block transition-colors duration-500`}>
        <div className={`w-full h-full rounded-full border-4 shadow-lg transition-colors duration-500 ${
          isNightMode ? 'bg-gray-800 border-white/60' : 'bg-white border-[#947e63]/60'
        }`}>
          <div className={`absolute inset-2 rounded-full transition-colors duration-500 ${
            isNightMode ? 'bg-white/20' : 'bg-[#947e63]/40'
          }`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-60 transition-colors duration-500 ${
            isNightMode ? 'bg-white' : 'bg-white'
          }`}></div>
        </div>
      </div>

      {/* Event Card - Estilo Paul Allen */}
      <div className={`relative py-6 ${
        index === 0 ? 'md:w-3/4 md:-left-1/4' : 
        index === 1 ? 'md:w-3/4 md:left-1/2' : 
        index === 2 ? 'md:w-3/4 md:-left-1/4' : 
        `md:w-1/2 ${isRightSide ? 'md:left-1/2' : ''}`
      }`}>
        <div className={`w-full px-4 md:px-8 ${
          index === 0 ? 'md:w-[33rem] ml-auto' : 
          index === 1 ? 'md:w-[33rem]' : 
          index === 2 ? 'md:w-[33rem] ml-auto' : 
          `md:w-[22rem] ${!isRightSide ? 'ml-auto' : ''}`
        }`}>
          {/* Card inspirada en Paul Allen con fondo crema y tipografía elegante */}
          <div className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-[1.01] group ${
            isNightMode 
              ? 'bg-gray-900 border border-white/20' 
              : 'bg-[#f8f6f3] border border-[#e6ddd4]'
          }`} style={{
            // Textura sutil similar a papel de carta elegante
            backgroundImage: isNightMode ? 'none' : `
              radial-gradient(circle at 25% 25%, rgba(196, 152, 91, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 115, 85, 0.02) 0%, transparent 50%)
            `
          }}>
            
            {/* Content Section - Estilo Paul Allen */}
            <div className="p-12 md:p-16 relative text-center">

              {/* Número de evento pequeño en la parte superior */}
              <div className="mb-6">
                <span className={`text-xs tracking-[0.2em] uppercase font-light ${
                  isNightMode ? 'text-white/60' : 'text-[#8B7355]/60'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Icono original con fondo circular */}
              <div className="mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full shadow-lg group-hover:scale-110 transition-all duration-500 ${
                  isNightMode ? 'bg-gray-800/50' : 'bg-gradient-to-br from-[#947e63]/20 to-[#947e63]/30'
                }`}>
                  {getEventIcon()}
                </div>
              </div>

              {/* Título del evento - Estilo Paul Allen (mayúsculas, espaciado) */}
              <h3 className={`text-2xl md:text-3xl font-light tracking-[0.15em] uppercase mb-8 leading-tight transition-colors duration-500 ${
                isNightMode ? 'text-white' : 'text-[#2c2826]'
              }`} style={{ 
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '0.15em'
              }}>
                {item.title}
              </h3>

              {/* Línea divisoria elegante */}
              <div className="flex justify-center mb-8">
                <div className={`w-16 h-px transition-colors duration-500 ${
                  isNightMode ? 'bg-white/30' : 'bg-[#C4985B]/50'
                }`}></div>
              </div>

              {/* Hora - Estilo Paul Allen */}
              <div className="mb-8">
                <div className={`text-xl md:text-2xl font-light tracking-[0.1em] transition-colors duration-500 ${
                  isNightMode ? 'text-white/90' : 'text-[#4a453f]'
                }`} style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.time}
                </div>
              </div>

              {/* Ubicación - Estilo Paul Allen */}
              {item.location && (
                <div className="mb-8">
                  <div className={`text-sm md:text-base font-light tracking-[0.05em] leading-relaxed transition-colors duration-500 ${
                    isNightMode ? 'text-white/80' : 'text-[#6b6258]'
                  }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.location}
                  </div>
                </div>
              )}

              {/* Descripción si existe */}
              {item.description && item.description.trim() !== "" && (
                <div className="mt-6">
                  <p className={`text-sm font-light tracking-wide leading-relaxed max-w-sm mx-auto transition-colors duration-500 ${
                    isNightMode ? 'text-white/70' : 'text-[#7a6f63]'
                  }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.description}
                  </p>
                </div>
              )}

              {/* Decoración inferior sutil */}
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-1">
                  <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                    isNightMode ? 'bg-white/20' : 'bg-[#C4985B]/30'
                  }`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                    isNightMode ? 'bg-white/40' : 'bg-[#C4985B]/50'
                  }`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                    isNightMode ? 'bg-white/20' : 'bg-[#C4985B]/30'
                  }`}></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}