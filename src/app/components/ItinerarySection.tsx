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
  const [windowHeight, setWindowHeight] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Set up client-side state and window dimensions
  useEffect(() => {
    setIsClient(true);
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);
    
    // Ensure we start in day mode and wait a bit before allowing theme changes
    setIsNightMode(false);
    
    // Allow theme changes after a short delay to prevent immediate activation
    const timer = setTimeout(() => {
      setHasInitialized(true);
    }, 1000);
    
    return () => {
      window.removeEventListener('resize', updateWindowHeight);
      clearTimeout(timer);
    };
  }, [setIsNightMode]);
  
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
    },
    {
      time: "12:00 AM - 2:00 AM",
      title: "After Party, quizás jaja",
      description: "Continuamos la fiesta con DJ y barra libre para los más resistentes"
    }
  ];

  // Calculate scroll progress for content transitions only
  const updateScrollProgress = useCallback(() => {
    if (!sectionRef.current || !isClient || windowHeight === 0) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate how much of the section has been scrolled through
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    
    // Check if section is significantly visible AND user is actively scrolling within it
    const isVisible = (
      sectionTop <= windowHeight * 0.3 && // Section header is well into viewport
      sectionBottom >= windowHeight * 0.7 && // Section extends well below viewport
      scrollProgress > 0.1 // User has scrolled into the section content
    );
    setIsSectionVisible(isVisible);
    
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
    
  }, [isClient, windowHeight, scrollProgress]);

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

  // Update night mode based on progress - transition starts from "Recepción" card
  // Only control night mode when the section is visible and being actively scrolled
  useEffect(() => {
    if (!hasInitialized) {
      // Don't change theme until component has fully initialized
      return;
    }
    
    if (!isSectionVisible) {
      // Reset to day mode when section is not prominently visible
      setIsNightMode(false);
      return;
    }
    
    // Even stricter: only activate night mode when significantly into "Recepción" card
    // "Recepción" is at index 2, so it starts at 2/4 = 0.5 progress
    // But add extra threshold to prevent premature activation
    const shouldBeNight = scrollProgress >= 0.6; // Increased from 0.5 to 0.6
    setIsNightMode(shouldBeNight);
  }, [scrollProgress, setIsNightMode, isSectionVisible, hasInitialized]);

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
            Primer Logística
          </h3>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className={`w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden transition-all duration-1000 ease-in-out ${
        isNightMode ? 'bg-[#1a1a1a]' : 'bg-[#f8f7f5]'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {/* Celestial Elements */}
      {/* Sol que aparece durante el día */}
      <div 
        className={`absolute celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`} 
        style={{ 
          zIndex: 1,
          top: '20%',
          right: '10%'
        }}
      >
        <div className="relative animate-fade-celestial">
          <div className="w-32 h-32 bg-[#d4c4b0] rounded-full opacity-80 relative"> {/* Doble de grande */}
            <div className="absolute inset-0 animate-sun-rotate">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6"> {/* Rayos más grandes */}
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 rotate-180">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 -rotate-90">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 rotate-90">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              {/* Rayos diagonales adicionales para el sol más grande */}
              <div className="absolute top-2 right-2 transform rotate-45">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute top-2 left-2 transform -rotate-45">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute bottom-2 right-2 transform rotate-135">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute bottom-2 left-2 transform -rotate-135">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luna que aparece cuando es modo nocturno */}
      <div 
        className={`absolute celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} 
        style={{ 
          zIndex: 1, 
          animationDelay: '2s',
          top: '30%',
          left: '10%'
        }}
      >
        <div className="relative animate-fade-celestial">
          <div className="w-24 h-24 bg-white opacity-70 rounded-full relative overflow-hidden"> {/* Ligeramente más grande que antes */}
            <div className="absolute top-3 left-5 w-2 h-2 bg-gray-300 rounded-full opacity-40"></div>
            <div className="absolute top-6 right-3 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-30"></div>
            <div className="absolute bottom-4 left-3 w-1 h-1 bg-gray-300 rounded-full opacity-35"></div>
            <div className="absolute bottom-3 right-4 w-3 h-3 bg-gray-300 rounded-full opacity-25"></div>
            <div className="absolute top-4 left-2 w-1 h-1 bg-gray-300 rounded-full opacity-30"></div>
          </div>
          <div className="absolute -top-1 -left-1 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1 right-6 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
          <div className="absolute top-6 -right-2 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
          <div className="absolute bottom-2 left-8 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
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
          {/* Timeline Visual */}
          <div className="w-8 flex flex-col items-center relative ml-4">
            {/* Background line */}
            <div 
              className={`w-1 h-96 left-1/2 transform -translate-x-1/2 transition-colors duration-500 rounded-full ${
                isNightMode ? 'bg-white/20' : 'bg-[#d4c4b0]/40'
              }`}
            ></div>
            
            {/* Static timeline points for each item */}
            {itineraryItems.map((item, index) => (
              <div 
                key={`point-${item.time}`} 
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  top: `${(index + 1) * (96 / (itineraryItems.length + 1))}px`
                }}
              >
                <div 
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    index === currentItemIndex
                      ? (isNightMode ? 'bg-white border-2 border-white/50' : 'bg-[#8b7355] border-2 border-[#8b7355]/50')
                      : (isNightMode ? 'bg-white/40' : 'bg-[#8b7355]/40')
                  }`}
                  style={{ 
                    opacity: getItemOpacity(index)
                  }}
                />
              </div>
            ))}
          </div>

          {/* Content Area - Simple layout showing current item */}
          <div className="flex-1 px-4 lg:px-8 relative">
            <div className="max-w-3xl w-full">
              {/* Current Item Card */}
              <div className={`
                relative transform transition-all duration-500 ease-out
                rounded-2xl p-8 lg:p-12 backdrop-blur-sm border shadow-2xl
                ${
                  isNightMode 
                    ? 'bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border-white/20 shadow-black/50' 
                    : 'bg-gradient-to-br from-white/95 via-cream-50/90 to-white/95 border-[#d4c4b0]/30 shadow-[#8b7355]/20'
                }
              `}>
                {/* Decorative Corner Ornaments */}
                <div className="absolute top-4 left-4 w-8 h-8 opacity-30">
                  <div className={`w-full h-0.5 absolute top-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`h-full w-0.5 absolute left-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`absolute top-1 left-1 w-1 h-1 rounded-full ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                </div>
                
                <div className="absolute top-4 right-4 w-8 h-8 opacity-30">
                  <div className={`w-full h-0.5 absolute top-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`h-full w-0.5 absolute right-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                </div>
                
                <div className="absolute bottom-4 left-4 w-8 h-8 opacity-30">
                  <div className={`w-full h-0.5 absolute bottom-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`h-full w-0.5 absolute left-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`absolute bottom-1 left-1 w-1 h-1 rounded-full ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                </div>
                
                <div className="absolute bottom-4 right-4 w-8 h-8 opacity-30">
                  <div className={`w-full h-0.5 absolute bottom-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`h-full w-0.5 absolute right-0 ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                  <div className={`absolute bottom-1 right-1 w-1 h-1 rounded-full ${
                    isNightMode ? 'bg-white' : 'bg-[#8b7355]'
                  }`}></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Decorative Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-px mx-auto mb-4 ${
                      isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                    }`}></div>
                    <div className={`w-2 h-2 mx-auto rounded-full mb-4 ${
                      isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                    }`}></div>
                  </div>

                  {/* Time Badge */}
                  <div className="text-center mb-6">
                    <span className={`
                      inline-block px-6 py-2 rounded-full text-sm font-medium tracking-[0.2em] uppercase
                      transition-colors duration-500 border
                      ${
                        isNightMode 
                          ? 'bg-white/10 text-white/90 border-white/20' 
                          : 'bg-[#8b7355]/10 text-[#8b7355] border-[#8b7355]/20'
                      }
                    `}>
                      {itineraryItems[currentItemIndex]?.time}
                    </span>
                  </div>

                  {/* Title with Ornamental Design */}
                  <div className="text-center mb-8">
                    <h2 className={`
                      garamond-regular text-3xl lg:text-4xl xl:text-5xl font-light mb-4 leading-tight 
                      transition-colors duration-500 tracking-wide
                      ${
                        isNightMode ? 'text-white' : 'text-[#5c5c5c]'
                      }
                    `}>
                      {itineraryItems[currentItemIndex]?.title}
                    </h2>
                    
                    {/* Decorative flourish under title */}
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-8 h-px ${
                        isNightMode ? 'bg-white/40' : 'bg-[#8b7355]/40'
                      }`}></div>
                      <div className={`w-1 h-1 rounded-full ${
                        isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                      }`}></div>
                      <div className={`w-12 h-px ${
                        isNightMode ? 'bg-white/40' : 'bg-[#8b7355]/40'
                      }`}></div>
                      <div className={`w-1 h-1 rounded-full ${
                        isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                      }`}></div>
                      <div className={`w-8 h-px ${
                        isNightMode ? 'bg-white/40' : 'bg-[#8b7355]/40'
                      }`}></div>
                    </div>
                  </div>

                  {/* Description in elegant typography */}
                  <div className="text-center mb-8">
                    <p className={`
                      text-lg lg:text-xl leading-relaxed font-light italic
                      transition-colors duration-500 max-w-2xl mx-auto
                      ${
                        isNightMode ? 'text-white/85' : 'text-[#6b6b6b]'
                      }
                    `}>
                      &ldquo;{itineraryItems[currentItemIndex]?.description}&rdquo;
                    </p>
                  </div>

                  {/* Location with elegant icon */}
                  {itineraryItems[currentItemIndex]?.location && (
                    <div className="text-center">
                      <div className={`
                        inline-flex items-center justify-center space-x-3 px-6 py-3
                        rounded-lg transition-colors duration-500 border
                        ${
                          isNightMode 
                            ? 'bg-white/5 text-white/80 border-white/10' 
                            : 'bg-[#8b7355]/5 text-[#8b7355] border-[#8b7355]/10'
                        }
                      `}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium tracking-wide">
                          {itineraryItems[currentItemIndex]?.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bottom decorative element */}
                  <div className="text-center mt-8">
                    <div className={`w-2 h-2 mx-auto rounded-full mb-4 ${
                      isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                    }`}></div>
                    <div className={`w-16 h-px mx-auto ${
                      isNightMode ? 'bg-white/60' : 'bg-[#8b7355]/60'
                    }`}></div>
                  </div>
                </div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl">
                  <div className={`absolute inset-0 rounded-2xl opacity-5 ${
                    isNightMode 
                      ? 'bg-gradient-to-br from-white/10 to-transparent' 
                      : 'bg-gradient-to-br from-[#8b7355]/10 to-transparent'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}