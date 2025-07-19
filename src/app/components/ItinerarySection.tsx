"use client"
import React, { useState, useRef, useEffect } from 'react';

interface ItineraryItem {
  time: string;
  displayTime: string;
  title: string;
  description: string;
  location?: string;
}

export default function ItinerarySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [hasCompletedNavigation, setHasCompletedNavigation] = useState(false);
  const [viewedItems, setViewedItems] = useState<Set<number>>(new Set([0]));
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const savedScrollPosition = useRef<number>(0);

  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      displayTime: "04:00",
      title: "Ceremony",
      description: "Welcome to the heartfelt ceremony where we will exchange vows of love and commitment. This special moment will be accompanied by gentle music and an atmosphere full of emotion, marking the beginning of our journey together.",
      location: "Iglesia San José"
    },
    {
      time: "6:30 PM - 7:00 PM",
      displayTime: "06:30",
      title: "Civil Ceremony",
      description: "Official legal ceremony where we will formalize our union before family and friends. A meaningful moment that makes our commitment legally binding while celebrating with our loved ones.",
      location: "Registro Civil"
    },
    {
      time: "8:00 PM - 9:30 PM",
      displayTime: "08:00",
      title: "Reception",
      description: "Join us for an elegant reception featuring a delicious three-course dinner prepared by our specialized chef. An evening of celebration, dancing, and creating beautiful memories together.",
      location: "Salón de Eventos"
    }
  ];

  // Función para bloquear scroll
  const lockScroll = () => {
    if (isLocked) return;
    
    savedScrollPosition.current = window.pageYOffset;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollPosition.current}px`;
    document.body.style.width = '100%';
    document.body.style.left = '0';
    
    setIsLocked(true);
  };

  // Función para desbloquear scroll
  const unlockScroll = (shouldRestorePosition = true) => {
    if (!isLocked) return;

    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.left = '';

    if (shouldRestorePosition && !hasCompletedNavigation) {
      window.scrollTo(0, savedScrollPosition.current);
    }

    setIsLocked(false);
  };

  // Detector de posición mejorado
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasCompletedNavigation) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // La sección está completamente visible
      const isFullyVisible = rect.top <= 10 && rect.bottom >= windowHeight - 10;

      if (isFullyVisible && !isLocked) {
        lockScroll();
      } else if (!isFullyVisible && isLocked && !hasCompletedNavigation) {
        // Solo unlock si nos movemos significativamente fuera
        if (rect.top > 100 || rect.bottom < windowHeight - 100) {
          unlockScroll();
        }
      }
    };

    const throttledScroll = throttle(handleScroll, 50);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Check inicial
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [isLocked, hasCompletedNavigation]);

  // Throttle helper
  function throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (isLocked) {
        unlockScroll(false);
      }
    };
  }, []);

  // Verificar completion
  useEffect(() => {
    if (viewedItems.size === itineraryItems.length && !hasCompletedNavigation) {
      setTimeout(() => {
        setHasCompletedNavigation(true);
        setTimeout(() => {
          unlockScroll(false); // No restaurar posición al completar
        }, 500);
      }, 2000);
    }
  }, [viewedItems, hasCompletedNavigation, itineraryItems.length]);

  // Navigation functions
  const nextItem = () => {
    if (activeIndex < itineraryItems.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      setViewedItems(prev => new Set([...prev, newIndex]));
    }
  };

  const prevItem = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      setViewedItems(prev => new Set([...prev, newIndex]));
    }
  };

  const goToItem = (index: number) => {
    if (hasCompletedNavigation) return;
    setActiveIndex(index);
    setViewedItems(prev => new Set([...prev, index]));
  };

  // Wheel handler
  const handleWheel = (e: React.WheelEvent) => {
    if (!isLocked || hasCompletedNavigation) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (Math.abs(e.deltaY) > 10) {
      if (e.deltaY > 0) {
        nextItem();
      } else {
        prevItem();
      }
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isLocked || hasCompletedNavigation) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isLocked || hasCompletedNavigation) return;
    e.preventDefault();
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isLocked || hasCompletedNavigation) return;
    
    const distance = touchStartY.current - touchEndY.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextItem();
      } else {
        prevItem();
      }
    }
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLocked || hasCompletedNavigation) return;
      
      switch(e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          prevItem();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          nextItem();
          break;
        case 'Escape':
          e.preventDefault();
          completeNavigation();
          break;
      }
    };

    if (isLocked && !hasCompletedNavigation) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isLocked, hasCompletedNavigation, activeIndex]);

  const completeNavigation = () => {
    setHasCompletedNavigation(true);
    unlockScroll(false);
  };

  const currentItem = itineraryItems[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="w-full h-screen px-4 md:px-8 bg-[#f8f7f5] relative overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: isLocked ? 'none' : 'auto' }}
    >
      {/* Header */}
      <div className="text-center py-8">
        <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase mb-4 text-[#8b7355]">
          ITINERARIO DEL DÍA
        </h2>
        <div className="w-24 h-px mx-auto mb-4 bg-[#d4c4b0]"></div>
        <h3 className="garamond-regular text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-[#5c5c5c]">
          Schedule
        </h3>
      </div>

      {/* Progress Indicator */}
      <div className="text-center mb-6">
        <div className="text-xs text-[#8b7355] mb-2">
          {activeIndex + 1} de {itineraryItems.length}
          {hasCompletedNavigation && <span className="ml-2 text-green-600">✓ Completado</span>}
        </div>
        <div className="max-w-48 mx-auto h-1 bg-[#d4c4b0] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#8b7355] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((activeIndex + 1) / itineraryItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto h-[calc(100vh-300px)] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 h-full items-center">
          
          {/* Time Display - Left Side */}
          <div className="flex flex-col items-center lg:items-end justify-center order-1 lg:order-1">
            <div className="transition-all duration-700 ease-out transform" key={activeIndex}>
              <div className="text-6xl md:text-8xl lg:text-[10rem] font-thin tracking-wider text-[#5c5c5c] leading-none time-display">
                {currentItem.displayTime}
              </div>
              <div className="text-base md:text-lg text-[#8b7355] font-light tracking-widest mt-2 text-center lg:text-right transition-all duration-500">
                {currentItem.time}
              </div>
            </div>
          </div>

          {/* Vertical Divider - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-px h-64 bg-gradient-to-b from-transparent via-[#d4c4b0] to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-[#8b7355] rounded-full border-2 border-[#f8f7f5] divider-dot animate-pulse"></div>
            </div>
          </div>

          {/* Horizontal Divider - Mobile */}
          <div className="lg:hidden flex justify-center items-center order-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4c4b0] to-transparent"></div>
            <div className="mx-4">
              <div className="w-3 h-3 bg-[#8b7355] rounded-full border-2 border-[#f8f7f5] animate-pulse"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d4c4b0] to-transparent"></div>
          </div>

          {/* Content Display - Right Side */}
          <div className="flex flex-col justify-center order-3 lg:order-2">
            <div className="transition-all duration-700 ease-out transform" key={`content-${activeIndex}`}>
              <h4 className="text-xl md:text-2xl lg:text-3xl font-light text-[#5c5c5c] mb-4 tracking-wide">
                {currentItem.title}
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3 max-w-lg">
                {currentItem.description}
              </p>
              {currentItem.location && (
                <p className="text-xs md:text-sm text-[#8b7355] font-light tracking-wide">
                  📍 {currentItem.location}
                </p>
              )}
              
              {/* Indicador de item activo */}
              <div className="mt-4">
                <div className="w-8 h-0.5 bg-[#8b7355] rounded-full active-indicator transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {itineraryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToItem(index)}
              disabled={hasCompletedNavigation}
              className={`w-3 h-3 rounded-full transition-all duration-300 nav-dot ${
                index === activeIndex 
                  ? 'bg-[#8b7355] scale-125' 
                  : viewedItems.has(index)
                  ? 'bg-[#8b7355] opacity-50'
                  : 'bg-[#d4c4b0] hover:bg-[#8b7355]'
              } ${hasCompletedNavigation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`Go to ${itineraryItems[index].title}`}
            >
              {viewedItems.has(index) && index !== activeIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <div className={`p-2 text-[#d4c4b0] transition-all duration-300 ${
            activeIndex > 0 && !hasCompletedNavigation ? 'opacity-70 hover:opacity-100' : 'opacity-20'
          }`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className={`p-2 text-[#d4c4b0] transition-all duration-300 ${
            activeIndex < itineraryItems.length - 1 && !hasCompletedNavigation ? 'opacity-70 hover:opacity-100' : 'opacity-20'
          }`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-[#8b7355] font-light">
          {!hasCompletedNavigation ? (
            isLocked ? 'Navigate: Scroll, swipe, arrows • ESC to skip' : 'Scroll down to start timeline'
          ) : (
            'Timeline completed - continue scrolling'
          )}
        </p>
      </div>

      {/* Scroll Lock Indicator */}
      {isLocked && !hasCompletedNavigation && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          <div className="bg-[#8b7355] text-white px-3 py-2 rounded-full text-xs shadow-lg animate-pulse">
            🔒 Timeline Navigation Mode
          </div>
          <button
            onClick={completeNavigation}
            className="bg-white/90 text-[#8b7355] px-3 py-1 rounded-full text-xs shadow-lg hover:bg-white transition-all duration-200 border border-[#8b7355]/20"
          >
            Exit Timeline
          </button>
        </div>
      )}
    </section>
  );
}