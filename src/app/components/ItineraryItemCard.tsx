"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import church from '../../../assets/church.png';
import legalDocument from '../../../assets/legal-document.png';
import nightClub from '../../../assets/night-club.png';

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

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ease-out ${getAnimationClasses()}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-12 transform -translate-x-1/2 w-8 h-8 z-10 hidden md:block">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#947e63]/40 to-[#947e63]/60 border-4 border-white shadow-lg">
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#947e63]/60 to-[#947e63]/80 shadow-inner"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-60"></div>
        </div>
      </div>

      {/* Event Card - Restored Original Layout */}
      <div className={`relative py-6 ${
        index === 0 ? 'md:w-3/4 md:-left-1/4' : // Ceremonia: 50% más ancho hacia la izquierda
        index === 1 ? 'md:w-3/4 md:left-1/2' : // Ceremonia Civil: 50% más ancho hacia la derecha desde su posición original  
        index === 2 ? 'md:w-3/4 md:-left-1/4' : // Recepción: 50% más ancho hacia la izquierda
        `md:w-1/2 ${isRightSide ? 'md:left-1/2' : ''}`
      }`}>
        <div className={`w-full px-4 md:px-8 ${
          index === 0 ? 'md:w-[33rem] ml-auto' : // Ceremonia: contenido más ancho, alineado a la derecha
          index === 1 ? 'md:w-[33rem]' : // Ceremonia Civil: contenido más ancho, mantiene posición derecha
          index === 2 ? 'md:w-[33rem] ml-auto' : // Recepción: contenido más ancho, alineado a la derecha
          `md:w-[22rem] ${!isRightSide ? 'ml-auto' : ''}`
        }`}>
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl border-2 border-[#D4AF37] transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] group">
            
            {/* Content Section */}
            <div className="p-8 md:p-12 relative">

              {/* Time Display - Always centered */}
              <div className="mb-8">
                <div className="text-5xl md:text-6xl font-extralight tracking-widest text-[#947e63] leading-none mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {isMobile ? item.displayTime.replace('°', '') : item.displayTime}
                </div>
                <div className="flex justify-center">
                  <div className="w-12 h-0.5 bg-[#D4AF37]"></div>
                </div>
              </div>

              {/* Event Icon - Centered */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#947e63]/20 to-[#947e63]/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  {(() => {
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
                  })()}
                </div>
              </div>

              {/* Title - Centered */}
              <h3 className="text-3xl md:text-4xl font-light text-slate-700 mb-6 tracking-wide text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                {item.title}
              </h3>

              {/* Location - Centered */}
              {item.location && (
                <div className="mb-8 flex items-center justify-center gap-3 text-[#947e63]">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#947e63]/30 to-[#947e63]/50 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#947e63]">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-light tracking-wider uppercase opacity-80">
                    {item.location}
                  </span>
                </div>
              )}



              {/* Description - Centered */}
              {item.description && item.description.trim() !== "" && (
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light tracking-wide text-center max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.description}
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
