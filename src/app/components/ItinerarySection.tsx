"use client"
import React, { useState, useRef, useEffect } from 'react';

interface ItineraryItem {
  time: string;
  displayTime: string; // Tiempo para mostrar grande (ej: "04:30")
  title: string;
  description: string;
  location?: string;
}

export default function ItinerarySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasViewedAll, setHasViewedAll] = useState(false);
  const [viewedItems, setViewedItems] = useState<Set<number>>(new Set([0]));
  const [isInViewport, setIsInViewport] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer para detectar cuando la sección está en viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solo activar si la sección está completamente visible (90% o más)
        const isFullyVisible = entry.intersectionRatio >= 0.9;
        setIsInViewport(isFullyVisible);
      },
      {
        threshold: [0.8, 0.9, 1.0], // Múltiples thresholds para mejor control
        rootMargin: '0px' // Sin margen para ser más preciso
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Control del scroll del body
  useEffect(() => {
    let scrollPosition = 0;
    
    if (isInViewport && !hasViewedAll) {
      // Guardar posición actual antes de bloquear
      scrollPosition = window.pageYOffset;
      
      // Bloquear scroll con un pequeño delay para evitar conflictos
      const timer = setTimeout(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.left = '0';
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (!isInViewport || hasViewedAll) {
      // Liberar scroll
      const savedPosition = parseInt(document.body.style.top || '0') * -1;
      
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      
      // Restaurar posición solo si hay una guardada
      if (savedPosition > 0) {
        window.scrollTo(0, savedPosition);
      }
    }

    return () => {
      // Cleanup al desmontar el componente
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
    };
  }, [isInViewport, hasViewedAll]);

  // Verificar si se han visto todos los elementos
  useEffect(() => {
    if (viewedItems.size === itineraryItems.length && !hasViewedAll) {
      setHasViewedAll(true);
      // Delay más corto para liberar el scroll
      setTimeout(() => {
        setIsInViewport(false);
      }, 500);
    }
  }, [viewedItems, hasViewedAll, itineraryItems.length]);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < itineraryItems.length - 1) {
      nextItem();
    }

    if (isRightSwipe && currentIndex > 0) {
      prevItem();
    }
  };

  // Navigation functions
  const nextItem = () => {
    if (currentIndex < itineraryItems.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setViewedItems(prev => new Set([...prev, newIndex]));
    }
  };

  const prevItem = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setViewedItems(prev => new Set([...prev, newIndex]));
    }
  };

  const goToItem = (index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setViewedItems(prev => new Set([...prev, index]));
    }
  };

  // Reset transition state after animation
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Solo activar navegación si estamos en la sección Y el scroll está bloqueado
      if (!isInViewport || hasViewedAll) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevItem();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextItem();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setHasViewedAll(true);
        setIsInViewport(false);
      }
    };

    // Solo agregar listener si el scroll está bloqueado
    if (isInViewport && !hasViewedAll) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentIndex, isInViewport, hasViewedAll]);

  const currentItem = itineraryItems[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-4 md:px-8 bg-[#f8f7f5] min-h-screen relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase mb-6 text-[#8b7355]">
          ITINERARIO DEL DÍA
        </h2>
        <div className="w-24 h-px mx-auto mb-6 bg-[#d4c4b0]"></div>
        <h3 className="garamond-regular text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-[#5c5c5c] mb-12">
          Schedule
        </h3>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex justify-between items-center text-xs text-[#8b7355] mb-2">
          <span>{currentIndex + 1} de {itineraryItems.length}</span>
          <span className={`transition-all duration-500 ${hasViewedAll ? 'text-green-600' : ''}`}>
            {hasViewedAll ? '✓ Completado' : 'Navegando...'}
          </span>
        </div>
        <div className="h-1 bg-[#d4c4b0] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#8b7355] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / itineraryItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div 
        ref={containerRef}
        className="max-w-6xl mx-auto relative swipe-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Content Area with Divider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[400px] relative">
          {/* Time Display - Left Side */}
          <div className="flex flex-col items-center lg:items-end justify-center order-1 lg:order-1 relative">
            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <div className="text-8xl md:text-9xl lg:text-[12rem] font-thin tracking-wider text-[#5c5c5c] leading-none time-display">
                {currentItem.displayTime}
              </div>
              <div className="text-lg md:text-xl text-[#8b7355] font-light tracking-widest mt-4 text-center lg:text-right">
                {currentItem.time}
              </div>
            </div>
          </div>

          {/* Vertical Divider - Visible solo en desktop */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-px h-64 bg-gradient-to-b from-transparent via-[#d4c4b0] to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-[#8b7355] rounded-full border-2 border-[#f8f7f5]"></div>
            </div>
          </div>

          {/* Horizontal Divider - Visible solo en móvil */}
          <div className="lg:hidden flex justify-center items-center my-8 order-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4c4b0] to-transparent"></div>
            <div className="mx-4">
              <div className="w-3 h-3 bg-[#8b7355] rounded-full border-2 border-[#f8f7f5]"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d4c4b0] to-transparent"></div>
          </div>

          {/* Event Details - Right Side */}
          <div className="flex flex-col justify-center order-3 lg:order-2">
            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                isTransitioning ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
              }`}
            >
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#5c5c5c] mb-6 tracking-wide">
                {currentItem.title}
              </h4>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4 max-w-lg">
                {currentItem.description}
              </p>
              {currentItem.location && (
                <p className="text-sm md:text-base text-[#8b7355] font-light tracking-wide">
                  📍 {currentItem.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {itineraryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToItem(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 nav-dot relative ${
                index === currentIndex 
                  ? 'bg-[#8b7355] scale-125' 
                  : viewedItems.has(index)
                  ? 'bg-[#8b7355] opacity-50'
                  : 'bg-[#d4c4b0] hover:bg-[#8b7355]'
              }`}
              aria-label={`Go to event ${index + 1}`}
            >
              {viewedItems.has(index) && index !== currentIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Swipe Indicators */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-center w-16 pointer-events-none">
          <div className={`text-[#d4c4b0] transition-opacity duration-300 swipe-indicator ${
            currentIndex > 0 ? 'opacity-50' : 'opacity-20'
          }`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center justify-center w-16 pointer-events-none">
          <div className={`text-[#d4c4b0] transition-opacity duration-300 swipe-indicator ${
            currentIndex < itineraryItems.length - 1 ? 'opacity-50' : 'opacity-20'
          }`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="text-center mt-8">
        <p className="text-sm text-[#8b7355] font-light">
          {!hasViewedAll ? (
            <>
              Swipe left/right or use arrow keys to navigate • Press ESC to continue
            </>
          ) : (
            'Navigation completed - scroll unlocked'
          )}
        </p>
      </div>

      {/* Scroll Lock Indicator */}
      {isInViewport && !hasViewedAll && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#8b7355] text-white px-3 py-2 rounded-full text-xs shadow-lg animate-pulse">
          Scroll locked - Complete navigation
        </div>
      )}
    </section>
  );
}