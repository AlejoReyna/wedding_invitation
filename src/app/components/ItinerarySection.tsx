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
  const { isNightMode, setIsNightMode } = useTheme();
  
  // Enhanced scroll-based animation state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePointPosition, setActivePointPosition] = useState(0);
  
  // Extended itinerary with more items
  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      title: "Ceremonia Religiosa",
      description: "Celebración de la unión sagrada en la iglesia con familiares y amigos más cercanos"
    },
    {
      time: "5:30 PM - 6:30 PM",
      title: "Sesión de Fotos",
      location: "Museo",
      description: "Capturando los momentos más especiales del día en locaciones icónicas"
    },
    {
      time: "6:30 PM - 7:00 PM",
      title: "Ceremonia Civil",
      description: "Oficialización legal del matrimonio ante el registro civil"
    },
    {
      time: "7:00 PM - 8:00 PM",
      title: "Cocktail de Bienvenida",
      location: "Terraza del Salón",
      description: "Aperitivos y bebidas de bienvenida mientras llegan todos los invitados"
    },
    {
      time: "8:00 PM - 9:30 PM", 
      title: "Cena de Gala",
      description: "Deliciosa cena de tres tiempos preparada por nuestro chef especializado"
    },
    {
      time: "9:30 PM - 10:00 PM",
      title: "Brindis y Discursos",
      description: "Palabras emotivas de familiares y amigos más queridos"
    },
    {
      time: "10:00 PM - 12:00 AM",
      title: "Baile y Celebración",
      description: "¡Hora de celebrar! Música en vivo, baile y diversión hasta altas horas"
    },
    {
      time: "12:00 AM - 2:00 AM",
      title: "After Party",
      description: "Continuamos la fiesta con DJ y barra libre para los más resistentes"
    }
  ];

  // Calculate scroll progress and active point position
  const updateScrollProgress = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    
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
    
    // Calculate active point position (starts at top of timeline, no offset)
    const timelineStartOffset = 0; // Start from very beginning
    const totalTimelineHeight = itineraryItems.length * windowHeight;
    const pointPosition = timelineStartOffset + (clampedProgress * totalTimelineHeight);
    setActivePointPosition(pointPosition);
    
  }, [itineraryItems.length]);

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

  // Get the exact progress within current item (for smooth transitions)
  const getCurrentItemProgress = () => {
    const step = 1 / itineraryItems.length;
    const currentIndex = getCurrentItemIndex();
    const itemStartProgress = currentIndex * step;
    const itemEndProgress = (currentIndex + 1) * step;
    const itemProgress = (scrollProgress - itemStartProgress) / (itemEndProgress - itemStartProgress);
    return Math.max(0, Math.min(1, itemProgress));
  };

  const currentItemIndex = getCurrentItemIndex();
  const currentItemProgress = getCurrentItemProgress();

  // Update night mode based on progress
  useEffect(() => {
    const shouldBeNight = scrollProgress > 0.75;
    setIsNightMode(shouldBeNight);
  }, [scrollProgress, setIsNightMode]);

  // Listen to normal page scroll
  useEffect(() => {
    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  // Calculate distance to next point for mixing effect
  const getPointMixingOpacity = (index: number) => {
    const itemHeight = window.innerHeight;
    const pointY = index * itemHeight; // Points start from top
    const distanceToActive = Math.abs(activePointPosition - pointY);
    const mixingDistance = itemHeight * 0.3; // Distance at which mixing starts
    
    if (distanceToActive < mixingDistance) {
      return 1 - (distanceToActive / mixingDistance);
    }
    return 0;
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sun-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes celestial-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-3px);
          }
          75% {
            transform: translateY(-15px) translateX(2px);
          }
        }

        @keyframes fade-celestial {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(139, 115, 85, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(139, 115, 85, 0.6);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-sun-rotate {
          animation: sun-rotate 20s linear infinite;
        }

        .animate-celestial-float {
          animation: celestial-float 8s ease-in-out infinite;
        }

        .animate-fade-celestial {
          animation: fade-celestial 2s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .theme-transition {
          transition: background-color 1s ease-in-out, color 1s ease-in-out;
        }

        .celestial-transition {
          transition: opacity 2s ease-in-out, transform 2s ease-in-out;
        }

        .smooth-transform {
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className={`w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden theme-transition ${
          isNightMode ? 'bg-[#1a1a1a]' : 'bg-[#f8f7f5]'
        }`}
        style={{ minHeight: `${itineraryItems.length * 100 + 100}vh` }}
      >
        {/* Celestial Elements */}
        <div className={`fixed top-20 right-20 celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`} style={{ zIndex: 1 }}>
          <div className="relative animate-fade-celestial">
            <div className="w-16 h-16 bg-[#d4c4b0] rounded-full opacity-80 relative">
              <div className="absolute inset-0 animate-sun-rotate">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 rotate-180">
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 -rotate-90">
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 rotate-90">
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`fixed top-20 left-20 celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} style={{ zIndex: 1, animationDelay: '2s' }}>
          <div className="relative animate-fade-celestial">
            <div className="w-16 h-16 bg-white opacity-70 rounded-full relative overflow-hidden">
              <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-40"></div>
              <div className="absolute top-4 right-2 w-1 h-1 bg-gray-300 rounded-full opacity-30"></div>
              <div className="absolute bottom-3 left-2 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-35"></div>
              <div className="absolute bottom-2 right-3 w-2 h-2 bg-gray-300 rounded-full opacity-25"></div>
            </div>
            <div className="absolute -top-1 -left-1 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-1 right-5 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
            <div className="absolute top-5 -right-2 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <div className={`absolute top-20 right-10 w-24 h-24 border rounded-full ${
            isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
          }`}></div>
          <div className={`absolute bottom-32 left-8 w-16 h-16 border rounded-full ${
            isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
          }`}></div>
        </div>

        {/* Header - Reduced margin */}
        <div className="text-center mb-8 relative" style={{ zIndex: 10 }}>
          <h2 className={`text-sm md:text-base font-light tracking-[0.4em] uppercase mb-6 ${
            isNightMode ? 'text-white/80' : 'text-[#8b7355]'
          }`}>
            ITINERARIO DEL DÍA
          </h2>
          <div className={`w-24 h-px mx-auto mb-6 ${
            isNightMode ? 'bg-white/60' : 'bg-[#d4c4b0]'
          }`}></div>
          <h3 className={`garamond-regular text-3xl md:text-4xl lg:text-5xl font-light tracking-wider ${
            isNightMode ? 'text-white' : 'text-[#5c5c5c]'
          }`}>
            Primer Logística
          </h3>
          <p className={`text-sm md:text-base font-light tracking-[0.4em] uppercase mb-6 mt-4 ${
            isNightMode ? 'text-white/80' : 'text-[#8b7355]'
          }`}>
            Nos la vamos a pasar poca madre jaja equisde
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
          <div className="flex">
            {/* Timeline Vertical Line and Points */}
            <div className="w-20 flex flex-col items-center relative">
              {/* Static background line */}
              <div 
                className={`w-1 absolute left-1/2 transform -translate-x-1/2 transition-colors duration-500 rounded-full ${
                  isNightMode ? 'bg-white/20' : 'bg-[#d4c4b0]/40'
                }`}
                style={{ 
                  top: '0px', // Start from very top
                  height: `${itineraryItems.length * window.innerHeight}px`
                }}
              ></div>
              
              {/* Active/Moving point that follows scroll */}
              <div 
                className={`w-6 h-6 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out animate-pulse-glow ${
                  isNightMode ? 'bg-white border-4 border-white/30' : 'bg-[#8b7355] border-4 border-[#8b7355]/30'
                }`}
                style={{ 
                  top: `${activePointPosition}px`,
                  zIndex: 20
                }}
              ></div>
              
              {/* Static timeline points for each item (mixing effect) */}
              {itineraryItems.map((item, index) => {
                const mixingOpacity = getPointMixingOpacity(index);
                return (
                  <div 
                    key={`static-${item.time}`} 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      top: `${index * window.innerHeight}px`, // No offset, start from top
                      zIndex: 15
                    }}
                  >
                    {mixingOpacity > 0 && (
                      <div 
                        className={`w-8 h-8 rounded-full transition-all duration-200 ${
                          isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                        }`}
                        style={{ 
                          opacity: mixingOpacity,
                          transform: `scale(${0.8 + (mixingOpacity * 0.4)})`
                        }}
                      />
                    )}
                  </div>
                );
              })}
              
              {/* Endpoint indicators */}
              <div 
                className={`w-4 h-4 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                }`}
                style={{ 
                  top: '0px', // Start point at very top
                  zIndex: 10
                }}
              ></div>
              <div 
                className={`w-4 h-4 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                }`}
                style={{ 
                  top: `${itineraryItems.length * window.innerHeight}px`, // End point
                  zIndex: 10
                }}
              ></div>
            </div>

            {/* Content Area - Single card that moves with the active point */}
            <div className="flex-1 px-8 lg:px-16 relative">
              {/* Moving content container that follows the active point */}
              <div 
                className="absolute w-full smooth-transform"
                style={{ 
                  top: `${activePointPosition}px`, // Align directly with point position
                  height: `${window.innerHeight}px`,
                  zIndex: 15
                }}
              >
                <div className="flex items-start h-full pt-0"> {/* Changed to items-start and pt-0 */}
                  <div className="max-w-2xl w-full">
                    <div className="transform transition-all duration-300 ease-out opacity-100 translate-y-0 scale-100">
                      {/* Time */}
                      <p className={`text-sm font-medium tracking-wide mb-4 transition-colors duration-500 ${
                        isNightMode ? 'text-white/70' : 'text-gray-600'
                      }`}>
                        {itineraryItems[currentItemIndex]?.time}
                      </p>

                      {/* Title */}
                      <h2 className={`text-4xl lg:text-5xl font-light mb-8 leading-tight transition-colors duration-500 ${
                        isNightMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {itineraryItems[currentItemIndex]?.title}
                      </h2>

                      {/* Description */}
                      <p className={`text-lg lg:text-xl leading-relaxed mb-8 transition-colors duration-500 ${
                        isNightMode ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {itineraryItems[currentItemIndex]?.description}
                      </p>

                      {/* Location */}
                      {itineraryItems[currentItemIndex]?.location && (
                        <div className={`flex items-center text-base mb-8 transition-colors duration-500 ${
                          isNightMode ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {itineraryItems[currentItemIndex]?.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right spacing */}
            <div className="w-20"></div>
          </div>
        </div>
      </section>
    </>
  );
}