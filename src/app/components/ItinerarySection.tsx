"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
  location?: string;
}

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isNightMode } = useTheme();
  
  // Scroll-based animation state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set up client-side state and window dimensions
  useEffect(() => {
    setIsClient(true);
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);
  
  // Extended itinerary with more items
  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      title: "Ceremonia Religiosa",
      description: "Celebración de la unión sagrada en la iglesia con familiares y amigos más cercanos"
    },
   
    {
      time: "6:30 PM - 7:00 PM",
      title: "Ceremonia Civil",
      description: "Oficialización legal del matrimonio ante el registro civil"
    },
    {
      time: "8:00 PM - 9:30 PM", 
      title: "Recepción",
      description: "Deliciosa cena de tres tiempos preparada por nuestro chef especializado"
    }
  ];

  // Calculate scroll progress for content animations
  const updateScrollProgress = useCallback(() => {
    if (!sectionRef.current || !isClient || windowHeight === 0) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate how much of the section has been scrolled through
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    
    let progress = 0;
    
    if (sectionTop <= 0 && sectionBottom >= windowHeight) {
      // Section is larger than viewport and we're scrolling through it
      const scrolledDistance = Math.abs(sectionTop);
      const totalScrollableDistance = sectionHeight - windowHeight;
      progress = Math.min(scrolledDistance / totalScrollableDistance, 1);
    } else if (sectionTop <= windowHeight && sectionBottom >= 0) {
      // Section is partially visible
      const visibleHeight = Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0);
      progress = visibleHeight / windowHeight;
    }
    
    const clampedProgress = Math.max(0, Math.min(1, progress));
    setScrollProgress(clampedProgress);
    
  }, [isClient, windowHeight]);

  // Determine current active item based on scroll progress
  const getCurrentItemIndex = () => {
    const step = 1 / itineraryItems.length;
    for (let i = 0; i < itineraryItems.length; i++) {
      if (scrollProgress <= (i + 1) * step) {
        return i;
      }
    }
    return itineraryItems.length - 1;
  };

  const currentItemIndex = getCurrentItemIndex();

  // Listen to normal page scroll
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress, isClient]);

  // Calculate item visibility for animations
  const getItemOpacity = (index: number) => {
    const step = 1 / itineraryItems.length;
    const itemStart = index * step;
    const itemEnd = (index + 1) * step;
    
    if (scrollProgress >= itemStart && scrollProgress <= itemEnd) {
      return 1;
    } else if (scrollProgress > itemEnd) {
      return 0.7;
    } else {
      return 0.3;
    }
  };

  // Calculate timeline constants - responsivos
  const isMobile = windowWidth < 768;
  const CARD_HEIGHT = isMobile ? 280 : 300;
  const CARD_SPACING = isMobile ? 80 : 100;
  const TOTAL_SECTION_HEIGHT = itineraryItems.length * (CARD_HEIGHT + CARD_SPACING);
  
  // Calculate the overall dot position along the continuous timeline
  const getDotPosition = () => {
    const totalProgress = scrollProgress * TOTAL_SECTION_HEIGHT;
    return Math.min(totalProgress, TOTAL_SECTION_HEIGHT);
  };

  // Calculate each card's position based on the dot position
  const getCardPosition = (index: number) => {
    const basePosition = index * (CARD_HEIGHT + CARD_SPACING);
    const dotPosition = getDotPosition();
    
    if (dotPosition < basePosition) {
      return basePosition;
    }
    
    const movementBeyondBase = dotPosition - basePosition;
    
    if (index < itineraryItems.length - 1) {
      const nextCardBasePosition = (index + 1) * (CARD_HEIGHT + CARD_SPACING);
      const maxMovement = nextCardBasePosition - basePosition - CARD_HEIGHT;
      return basePosition + Math.min(movementBeyondBase, maxMovement);
    }
    
    return basePosition + Math.min(movementBeyondBase, CARD_HEIGHT);
  };

  // Don't render until we have window dimensions
  if (!isClient || windowHeight === 0) {
    return (
      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-[#f8f7f5] min-h-screen">
        <div className="text-center">
          <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase mb-6 text-[#8b7355]">
            ITINERARIO DEL DÍA
          </h2>
          <div className="w-24 h-px mx-auto mb-6 bg-[#d4c4b0]"></div>
          <h3 className="garamond-regular text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-[#5c5c5c]">
            Itinerario del día
          </h3>
        </div>
      </section>
    );
  }

  const dotPosition = getDotPosition();

  return (
    <section 
      ref={sectionRef}
      className={`w-full py-16 md:py-24 px-4 md:px-8 relative transition-all duration-1000 ease-in-out ${
        isNightMode ? 'bg-[#1a1a1a]' : 'bg-[#f8f7f5]'
      }`}
      style={{ 
        minHeight: '100vh',
        overflowX: 'hidden' // Prevenir scroll horizontal
      }}
    >
      {/* Celestial Elements - Mejor posicionamiento */}
      <div 
        className={`absolute celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`} 
        style={{ 
          zIndex: 1,
          top: '10%',
          right: '5%',
          maxWidth: '120px' // Limitar tamaño en móviles
        }}
      >
        <div className="relative animate-fade-celestial">
          <div className="w-20 h-20 md:w-32 md:h-32 bg-[#d4c4b0] rounded-full opacity-80 relative">
            <div className="absolute inset-0 animate-sun-rotate">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 md:-translate-y-6">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 md:border-l-4 md:border-r-4 md:border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 md:translate-y-6 rotate-180">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 md:border-l-4 md:border-r-4 md:border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 md:-translate-x-6 -rotate-90">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 md:border-l-4 md:border-r-4 md:border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 md:translate-x-6 rotate-90">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 md:border-l-4 md:border-r-4 md:border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute top-1 right-1 md:top-2 md:right-2 transform rotate-45">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 md:border-l-3 md:border-r-3 md:border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute top-1 left-1 md:top-2 md:left-2 transform -rotate-45">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 md:border-l-3 md:border-r-3 md:border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 transform rotate-135">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 md:border-l-3 md:border-r-3 md:border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 transform -rotate-135">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 md:border-l-3 md:border-r-3 md:border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={`absolute celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} 
        style={{ 
          zIndex: 1, 
          animationDelay: '2s',
          top: '15%',
          left: '5%',
          maxWidth: '96px' // Limitar tamaño
        }}
      >
        <div className="relative animate-fade-celestial">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-white opacity-70 rounded-full relative overflow-hidden">
            <div className="absolute top-2 left-3 md:top-3 md:left-5 w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-full opacity-40"></div>
            <div className="absolute top-3 right-2 md:top-6 md:right-3 w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-300 rounded-full opacity-30"></div>
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-3 w-0.5 h-0.5 md:w-1 md:h-1 bg-gray-300 rounded-full opacity-35"></div>
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-4 w-2 h-2 md:w-3 md:h-3 bg-gray-300 rounded-full opacity-25"></div>
            <div className="absolute top-2 left-1 md:top-4 md:left-2 w-0.5 h-0.5 md:w-1 md:h-1 bg-gray-300 rounded-full opacity-30"></div>
          </div>
          <div className="absolute -top-0.5 -left-0.5 md:-top-1 md:-left-1 w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-0.5 right-3 md:top-1 md:right-6 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
          <div className="absolute top-3 -right-1 md:top-6 md:-right-2 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
          <div className="absolute bottom-1 left-4 md:bottom-2 md:left-8 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Decorative Background Elements - Mejor posicionamiento */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className={`absolute top-20 right-4 md:right-10 w-16 h-16 md:w-24 md:h-24 border rounded-full ${
          isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
        }`}></div>
        <div className={`absolute bottom-32 left-4 md:left-8 w-12 h-12 md:w-16 md:h-16 border rounded-full ${
          isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
        }`}></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative" style={{ zIndex: 10 }}>
        <div className={`w-24 h-px mx-auto mb-6 ${
          isNightMode ? 'bg-white/60' : 'bg-[#d4c4b0]'
        }`}></div>
        <h3 className={`garamond-regular text-3xl md:text-4xl lg:text-5xl font-light tracking-wider ${
          isNightMode ? 'text-white' : 'text-[#5c5c5c]'
        }`}>
          Itinerario del día
        </h3>
      </div>

      {/* Timeline Container - Corregido para evitar overflow */}
      <div className="max-w-6xl mx-auto relative px-2" style={{ zIndex: 10 }}>
        <div className="relative" style={{ height: `${TOTAL_SECTION_HEIGHT + 200}px` }}>
          {/* Timeline Column */}
          <div className="absolute left-4 md:left-8 top-0 w-8 flex justify-center" style={{ height: `${TOTAL_SECTION_HEIGHT}px` }}>
            <div 
              className={`w-1 transition-colors duration-500 rounded-full ${
                isNightMode ? 'bg-white/20' : 'bg-[#d4c4b0]/40'
              }`}
              style={{ height: '100%' }}
            ></div>
            
            {/* Moving dot */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-out"
              style={{
                top: `${Math.min(dotPosition, TOTAL_SECTION_HEIGHT)}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div 
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  isNightMode ? 'bg-white border-2 border-white/50 scale-125' : 'bg-[#8b7355] border-2 border-[#8b7355]/50 scale-125'
                }`}
              />
            </div>

            {/* Static dots */}
            {itineraryItems.map((_, index) => {
              const dotPositionStatic = index * (CARD_HEIGHT + CARD_SPACING);
              return (
                <div 
                  key={index}
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: `${dotPositionStatic}px`
                  }}
                >
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === currentItemIndex
                        ? (isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60')
                        : (isNightMode ? 'bg-white/20' : 'bg-[#8b7355]/20')
                    }`}
                    style={{ 
                      opacity: getItemOpacity(index)
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Content Cards - Posicionamiento corregido */}
          {itineraryItems.map((item, index) => {
            const cardY = getCardPosition(index);
            const timelineOffset = isMobile ? 56 : 80; // Espacio para la timeline
            const contentWidth = `calc(100% - ${timelineOffset + 16}px)`; // 16px margen derecho
            
            return (
              <div 
                key={`item-${item.time}`} 
                className="absolute transition-all duration-300 ease-out"
                style={{
                  top: `${cardY}px`,
                  left: `${timelineOffset}px`,
                  width: contentWidth,
                  maxWidth: contentWidth
                }}
              >
                <div className="w-full h-full flex items-center">
                  <div 
                    className={`
                      relative transform transition-all duration-500 ease-out
                      rounded-lg p-4 md:p-6 lg:p-8 border-2 w-full
                      ${
                        index === currentItemIndex
                          ? (isNightMode 
                              ? 'bg-slate-900/40 border-white/30 shadow-xl scale-105' 
                              : 'bg-white/90 border-[#8b7355]/40 shadow-xl scale-105')
                          : (isNightMode 
                              ? 'bg-slate-900/20 border-white/10 shadow-md' 
                              : 'bg-white/60 border-[#d4c4b0]/30 shadow-md')
                      }
                    `}
                    style={{ 
                      opacity: getItemOpacity(index),
                      height: `${CARD_HEIGHT}px`,
                      maxWidth: '100%' // Asegurar que no se desborde
                    }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-3 md:mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                        isNightMode ? 'bg-white/10' : 'bg-[#8b7355]/10'
                      }`}>
                        {item.title.includes('Ceremonia Religiosa') && (
                          <svg className={`w-5 h-5 md:w-6 md:h-6 ${
                            isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18m-6-9h12" />
                          </svg>
                        )}
                        
                        {item.title.includes('Ceremonia Civil') && (
                          <svg className={`w-5 h-5 md:w-6 md:h-6 ${
                            isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        
                        {item.title.includes('Recepción') && (
                          <svg className={`w-5 h-5 md:w-6 md:h-6 ${
                            isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                          </svg>
                        )}
                        
                        {item.title.includes('After Party') && (
                          <svg className={`w-5 h-5 md:w-6 md:h-6 ${
                            isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Time Badge */}
                    <div className="text-center mb-3 md:mb-4">
                      <span className={`
                        inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-medium tracking-[0.1em] uppercase
                        transition-colors duration-500
                        ${
                          isNightMode 
                            ? 'bg-white/5 text-white/70 border border-white/10' 
                            : 'bg-[#8b7355]/5 text-[#8b7355]/80 border border-[#8b7355]/15'
                        }
                      `}>
                        {item.time}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-2 md:mb-3">
                      <h2 className={`
                        text-lg md:text-xl lg:text-2xl font-medium mb-2 leading-tight 
                        transition-colors duration-500
                        ${
                          isNightMode ? 'text-white' : 'text-[#5c5c5c]'
                        }
                      `}>
                        {item.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <div className="text-center px-2">
                      <p className={`
                        text-sm md:text-base leading-relaxed font-light
                        transition-colors duration-500
                        ${
                          isNightMode ? 'text-white/75' : 'text-[#6b6b6b]'
                        }
                      `}>
                        {item.description}
                      </p>
                    </div>

                    {/* Location */}
                    {item.location && (
                      <div className="text-center mt-3 md:mt-4">
                        <div className={`
                          inline-flex items-center justify-center space-x-2 px-3 py-1.5
                          rounded-md transition-colors duration-500 text-xs
                          ${
                            isNightMode 
                              ? 'bg-white/5 text-white/60' 
                              : 'bg-[#8b7355]/5 text-[#8b7355]/70'
                          }
                        `}>
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium truncate">
                            {item.location}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}