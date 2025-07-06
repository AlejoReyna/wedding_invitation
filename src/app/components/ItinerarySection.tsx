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
  
  // Scroll hijacking state
  const [internalScrollY, setInternalScrollY] = useState(0);
  const [isFullyVisible, setIsFullyVisibleState] = useState(false);
  const [listenersActive, setListenersActive] = useState(false);
  const [showCatBubble, setShowCatBubble] = useState(false);
  
  // Touch handling
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchStartScrollY, setTouchStartScrollY] = useState(0);
  
  // Refs to track latest state values (avoid stale closures)
  const isFullyVisibleRef = useRef(false);
  const listenersActiveRef = useRef(false);
  const internalScrollYRef = useRef(0);
  
  // Update refs when state changes
  useEffect(() => {
    isFullyVisibleRef.current = isFullyVisible;
  }, [isFullyVisible]);
  
  useEffect(() => {
    listenersActiveRef.current = listenersActive;
  }, [listenersActive]);
  
  useEffect(() => {
    internalScrollYRef.current = internalScrollY;
  }, [internalScrollY]);
  
  // Refs for event handlers
  const storedScrollY = useRef<number | undefined>(undefined);
  const visibilityObserverInstance = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const maxInternalScroll = 3000;
  const scrollProgress = Math.max(0, Math.min(1, internalScrollY / maxInternalScroll));
  
  // LOG: Only log when progress changes significantly
  const lastProgressRef = useRef(0);
  if (Math.abs(scrollProgress - lastProgressRef.current) > 0.01) {
    console.log(`🔄 Scroll Progress: ${scrollProgress.toFixed(3)} (${internalScrollY}/${maxInternalScroll})`);
    lastProgressRef.current = scrollProgress;
  }
  
  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      title: "Ceremonia Religiosa",
      description: "Celebración de la unión sagrada en la iglesia"
    },
    {
      time: "5:30 PM - 6:30 PM",
      title: "Sesión de Fotos",
      location: "Museo",
      description: "Capturando los momentos más especiales"
    },
    {
      time: "6:30 PM - 7:00 PM",
      title: "Ceremonia Civil",
      description: "Oficialización legal del matrimonio"
    },
    {
      time: "7:00 PM - 12:00 AM",
      title: "Recepción",
      description: "¡Hora de celebrar! Cena, baile y diversión"
    }
  ];

  // Determine current active item based on scroll progress
  const getCurrentItemIndex = () => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress < 0.5) return 1;
    if (scrollProgress < 0.75) return 2;
    return 3;
  };

  const currentItemIndex = getCurrentItemIndex();
  const currentItem = itineraryItems[currentItemIndex];
  
  // Check if section is fully visible
  const checkIfFullyVisible = useCallback(() => {
    if (!sectionRef.current) return false;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Condición más flexible: si la sección ocupa al menos 60% del viewport
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const percentVisible = Math.max(0, visibleHeight) / windowHeight;

    return percentVisible >= 0.6;
  }, []);

  // Lock/unlock page scroll
  const lockPageScroll = useCallback(() => {
    if (storedScrollY.current === undefined) {
      storedScrollY.current = window.scrollY;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockPageScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    
    if (storedScrollY.current !== undefined) {
      window.scrollTo(0, storedScrollY.current);
      storedScrollY.current = undefined;
    }
  }, []);

  // MEJORADO: Handle wheel scroll sin desactivar listeners agresivamente
  const handleScroll = useCallback((event: WheelEvent) => {
    // Use refs to get the latest values
    const currentlyVisible = isFullyVisibleRef.current;
    const currentScrollY = internalScrollYRef.current;
    
    console.log(`🎯 handleScroll called - isFullyVisible: ${currentlyVisible}, listenersActive: ${listenersActiveRef.current}`);
    
    if (!currentlyVisible) {
      console.log('❌ handleScroll: Section not fully visible, returning early');
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const amplificationFactor = 3.5;
    const scrollAmount = event.deltaY * amplificationFactor;
    const newScrollY = currentScrollY + scrollAmount;

    console.log(`🖱️ Wheel: scrollAmount=${scrollAmount.toFixed(1)}, current=${currentScrollY}, new=${newScrollY.toFixed(1)}, max=${maxInternalScroll}`);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (newScrollY < 0) {
      if (currentScrollY <= 0 && scrollAmount < -100) { // Aumentar threshold más
        console.log('⬆️ DEACTIVATING: Scroll up threshold reached');
        // Solo deactivar si el scroll hacia arriba es muy significativo
        scrollTimeoutRef.current = setTimeout(() => {
          setInternalScrollY(0);
          setIsFullyVisible(false);
          setListenersActive(false);
        }, 300); // Aumentar delay más
        return;
      }
      console.log(`⬆️ Setting scroll to: ${Math.max(0, newScrollY)}`);
      setInternalScrollY(Math.max(0, newScrollY));
    } else if (newScrollY >= maxInternalScroll) {
      // CAMBIO IMPORTANTE: Permitir que se llegue al final sin desactivar
      console.log(`⬇️ At max scroll: current=${currentScrollY}, new=${newScrollY}, setting to=${Math.min(maxInternalScroll, newScrollY)}`);
      setInternalScrollY(Math.min(maxInternalScroll, newScrollY));
      
      // Solo desactivar si ya estamos al máximo Y se sigue scrolleando hacia abajo con fuerza
      if (currentScrollY >= maxInternalScroll && scrollAmount > 100) {
        console.log('⬇️ DEACTIVATING: Already at max and trying to scroll down more');
        scrollTimeoutRef.current = setTimeout(() => {
          setInternalScrollY(maxInternalScroll);
          setIsFullyVisible(false);
          setListenersActive(false);
        }, 500); // Delay más largo
        return;
      }
    } else {
      console.log(`➡️ Normal scroll: setting to ${newScrollY}`);
      setInternalScrollY(newScrollY);
    }
  }, [maxInternalScroll]); // Remove state dependencies

  // MEJORADO: Handle keyboard con thresholds más altos
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const currentlyVisible = isFullyVisibleRef.current;
    const currentScrollY = internalScrollYRef.current;
    
    if (!currentlyVisible) return;
    if (!["ArrowUp", "ArrowDown", "Space"].includes(event.code)) return;

    const direction = event.code === "ArrowDown" || event.code === "Space" ? 1 : -1;
    const keyScrollAmount = 500;
    const newScrollY = currentScrollY + direction * keyScrollAmount;

    if (newScrollY < 0) {
      if (currentScrollY <= 200 && direction < 0) { // Threshold más alto
        setTimeout(() => {
          setInternalScrollY(0);
          setIsFullyVisible(false);
          setListenersActive(false);
        }, 300);
        return;
      }
      setInternalScrollY(Math.max(0, newScrollY));
    } else if (newScrollY >= maxInternalScroll) {
      // CAMBIO: Permitir llegar al final
      setInternalScrollY(Math.min(maxInternalScroll, newScrollY));
      
      // Solo desactivar si ya estamos al máximo Y se intenta continuar
      if (currentScrollY >= maxInternalScroll && direction > 0) {
        setTimeout(() => {
          setInternalScrollY(maxInternalScroll);
          setIsFullyVisible(false);
          setListenersActive(false);
        }, 400);
        return;
      }
    } else {
      setInternalScrollY(newScrollY);
    }

    event.preventDefault();
  }, [maxInternalScroll]);

  // Handle touch
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const currentScrollY = internalScrollYRef.current;
    setTouchStartY(e.touches[0].clientY);
    setTouchStartScrollY(currentScrollY);
  }, []);

  // MEJORADO: Handle touch con mejores thresholds
  const handleTouchMove = useCallback((e: TouchEvent) => {
    const currentlyVisible = isFullyVisibleRef.current;
    
    if (!currentlyVisible || !touchStartY) return;

    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY - currentY;
    const touchAmplificationFactor = 2.0;
    const touchScrollAmount = deltaY * touchAmplificationFactor;
    const newScrollY = touchStartScrollY + touchScrollAmount;

    if (newScrollY < 0) {
      if (touchStartScrollY <= 200 && deltaY < -50) { // Thresholds más altos
        setTimeout(() => {
          setInternalScrollY(0);
          setIsFullyVisible(false);
          setListenersActive(false);
        }, 300);
        return;
      }
      setInternalScrollY(Math.max(0, newScrollY));
    } else if (newScrollY >= maxInternalScroll) {
      // CAMBIO: Permitir llegar al final
      setInternalScrollY(Math.min(maxInternalScroll, newScrollY));
      
      // Solo desactivar si ya estamos al máximo Y se intenta continuar
      if (touchStartScrollY >= maxInternalScroll && deltaY > 50) {
        setTimeout(() => {
          setInternalScrollY(maxInternalScroll);
          setIsFullyVisible(false);
          setListenersActive(false);
        }, 400);
        return;
      }
    } else {
      setInternalScrollY(newScrollY);
    }

    e.preventDefault();
  }, [touchStartY, touchStartScrollY, maxInternalScroll]);

  // MEJORADO: Simplificar event listeners
  const activateListeners = useCallback(() => {
    if (listenersActive) {
      return;
    }

    console.log('🔥 ACTIVATING listeners');
    lockPageScroll();

    // Solo usar wheel en window con capture
    window.addEventListener("wheel", handleScroll, { passive: false, capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });

    setListenersActive(true);
  }, [listenersActive, lockPageScroll, handleScroll, handleKeyDown, handleTouchStart, handleTouchMove]);

  const deactivateListeners = useCallback(() => {
    if (!listenersActive) return;

    console.log('🚫 DEACTIVATING listeners');

    // Clear any pending timeouts
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    window.removeEventListener("wheel", handleScroll, { capture: true });
    window.removeEventListener("keydown", handleKeyDown, { capture: true });
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchmove", handleTouchMove, { capture: true });

    setListenersActive(false);
    unlockPageScroll();
  }, [listenersActive, handleScroll, handleKeyDown, handleTouchStart, handleTouchMove, unlockPageScroll]);

  // MEJORADO: Check visibility con debounce
  const checkVisibilityDebounced = useCallback(() => {
    const wasVisible = isFullyVisible;
    const nowVisible = checkIfFullyVisible();
    
    if (nowVisible !== wasVisible) {
      console.log(`👁️ Visibility changed: ${wasVisible} -> ${nowVisible}`);
      setIsFullyVisible(nowVisible);
      
      if (nowVisible) {
        console.log('✅ Section now visible - activating listeners');
        activateListeners();
      } else {
        console.log('❌ Section not visible - will deactivate listeners');
        // Delay para evitar activaciones/desactivaciones rápidas
        setTimeout(() => {
          if (!checkIfFullyVisible()) {
            console.log('❌ Confirmed not visible - deactivating listeners');
            deactivateListeners();
          }
        }, 100);
      }
    }
  }, [isFullyVisible, checkIfFullyVisible, activateListeners, deactivateListeners, listenersActive]);

  // Update night mode based on progress
  useEffect(() => {
    const shouldBeNight = scrollProgress > 0.75;
    setIsNightMode(shouldBeNight);
    
    if (shouldBeNight && scrollProgress > 0.9) {
      setTimeout(() => setShowCatBubble(true), 1500);
    } else {
      setShowCatBubble(false);
    }
  }, [scrollProgress, setIsNightMode]);

  // Manage listeners based on visibility
  useEffect(() => {
    if (isFullyVisible && !listenersActive) {
      activateListeners();
    } else if (!isFullyVisible && listenersActive) {
      deactivateListeners();
    }
  }, [isFullyVisible, listenersActive, activateListeners, deactivateListeners]);

  // MEJORADO: Initialize con mejores thresholds
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: [0.1, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Agregar 0.6 threshold
    };

    visibilityObserverInstance.current = new IntersectionObserver((entries) => {
      entries.forEach(() => {
        checkVisibilityDebounced();
      });
    }, observerOptions);

    if (sectionRef.current) {
      visibilityObserverInstance.current.observe(sectionRef.current);
    }

    const handlePageScroll = () => {
      // Throttle la verificación de visibilidad
      setTimeout(checkVisibilityDebounced, 50);
    };

    window.addEventListener("scroll", handlePageScroll, { passive: true });
    window.addEventListener("resize", checkVisibilityDebounced);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      deactivateListeners();
      window.removeEventListener("scroll", handlePageScroll);
      window.removeEventListener("resize", checkVisibilityDebounced);
      if (visibilityObserverInstance.current) {
        visibilityObserverInstance.current.disconnect();
      }
    };
  }, [checkVisibilityDebounced, deactivateListeners]);

  // Calculate card transform based on scroll progress
  const getCardTransform = () => {
    const progress = scrollProgress;
    const translateY = Math.sin(progress * Math.PI * 2) * 20;
    const scale = 0.9 + (Math.cos(progress * Math.PI * 4) * 0.1);
    return `translateY(${translateY}px) scale(${scale})`;
  };

  // Custom setter with logging
  const setIsFullyVisible = useCallback((value: boolean) => {
    setIsFullyVisibleState(prevValue => {
      if (prevValue !== value) {
        console.log(`🎯 setIsFullyVisible: ${prevValue} -> ${value}`);
      }
      return value;
    });
      }, []);

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

        @keyframes cat-appear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          50% {
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bubble-appear {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(10px);
          }
          70% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes wink {
          0%, 90%, 100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.1);
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-cat-appear {
          animation: cat-appear 1s ease-out forwards;
        }

        .animate-bubble-appear {
          animation: bubble-appear 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-wink {
          animation: wink 4s ease-in-out infinite;
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

        .theme-transition {
          transition: background-color 1s ease-in-out, color 1s ease-in-out;
        }

        .celestial-transition {
          transition: opacity 2s ease-in-out, transform 2s ease-in-out;
        }

        .cat-container {
          position: relative;
          display: inline-block;
        }

        .speech-bubble {
          position: absolute;
          background: ${isNightMode ? '#ffffff' : '#ffffff'};
          color: #333;
          padding: 12px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 15px;
        }

        .speech-bubble:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-top-color: #ffffff;
        }

        .main-card {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .scroll-indicator {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
        }

        .scroll-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${isNightMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
          margin: 8px 0;
          transition: all 0.3s ease;
        }

        .scroll-indicator-dot.active {
          background: ${isNightMode ? 'white' : '#8b7355'};
          transform: scale(1.5);
        }
      `}</style>

      <section 
        ref={sectionRef}
        className={`min-h-screen w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden theme-transition ${
          isNightMode ? 'bg-[#1a1a1a]' : 'bg-[#f8f7f5]'
        }`}
      >
        {/* Celestial Elements */}
        <div className={`absolute top-20 right-20 celestial-transition animate-celestial-float ${
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

        <div className={`absolute top-20 left-20 celestial-transition animate-celestial-float ${
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

        {/* Scroll Progress Indicator */}
        {isFullyVisible && (
          <div className="scroll-indicator">
            {itineraryItems.map((_, index) => (
              <div
                key={index}
                className={`scroll-indicator-dot ${currentItemIndex === index ? 'active' : ''}`}
              />
            ))}
          </div>
        )}

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <div className={`absolute top-20 right-10 w-24 h-24 border rounded-full ${
            isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
          }`}></div>
          <div className={`absolute bottom-32 left-8 w-16 h-16 border rounded-full ${
            isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
          }`}></div>
        </div>

        <div className="max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
          {/* Header */}
          <div className="text-center mb-16">
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
              {isFullyVisible ? 'Usa scroll para navegar' : 'Nos la vamos a pasar poca madre jaja equisde'}
            </p>
          </div>

          {/* Main Card */}
          <div className="flex justify-center mb-16">
            <div 
              className={`main-card rounded-xl shadow-lg hover:shadow-xl p-8 md:p-12 max-w-2xl w-full border ${
                isNightMode 
                  ? 'bg-[#2a2a2a] border-white/20' 
                  : 'bg-white border-[#d4c4b0]/20'
              } relative overflow-hidden`}
              style={{ transform: getCardTransform() }}
            >
              {/* Card glow effect */}
              <div className={`absolute top-0 left-0 w-full h-1 ${
                isNightMode 
                  ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
                  : 'bg-gradient-to-r from-transparent via-[#d4c4b0]/50 to-transparent'
              }`}></div>

              {/* Time */}
              <div className={`text-sm md:text-base font-medium tracking-wide mb-4 flex items-center ${
                isNightMode ? 'text-white/80' : 'text-[#8b7355]'
              }`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  isNightMode ? 'bg-white/60' : 'bg-[#d4c4b0]'
                }`}></div>
                {currentItem.time}
              </div>

              {/* Title */}
              <h4 className={`garamond-regular text-2xl md:text-3xl mb-4 font-medium ${
                isNightMode ? 'text-white' : 'text-[#5c5c5c]'
              }`}>
                {currentItem.title}
              </h4>

              {/* Description */}
              {currentItem.description && (
                <p className={`text-base md:text-lg mb-4 ${
                  isNightMode ? 'text-white/70' : 'text-[#7a7a7a]'
                }`}>
                  {currentItem.description}
                </p>
              )}

              {/* Location */}
              {currentItem.location && (
                <div className={`flex items-center text-sm md:text-base ${
                  isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                }`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {currentItem.location}
                </div>
              )}

              {/* Progress indicator */}
              <div className="mt-6">
                <div className={`w-full h-1 rounded-full ${
                  isNightMode ? 'bg-white/20' : 'bg-[#d4c4b0]/30'
                }`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isNightMode ? 'bg-white/60' : 'bg-[#d4c4b0]'
                    }`}
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
                <p className={`text-xs mt-2 text-center ${
                  isNightMode ? 'text-white/60' : 'text-[#8b7355]/80'
                }`}>
                  {Math.round(scrollProgress * 100)}% completado
                </p>
              </div>
            </div>
          </div>

          {/* Cat Animation - appears at the end */}
          {scrollProgress > 0.8 && (
            <div className="flex justify-center mt-16">
              <div className="cat-container animate-cat-appear animate-float">
                {showCatBubble && (
                  <div className="speech-bubble animate-bubble-appear">
                    PST... También habrá after
                  </div>
                )}
                
                <div className={`relative w-20 h-20 rounded-full border-4 ${
                  isNightMode ? 'bg-white border-gray-200' : 'bg-white border-gray-300'
                } shadow-lg`}>
                  {/* Cat ears */}
                  <div className={`absolute -top-3 left-3 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-white`}></div>
                  <div className={`absolute -top-3 right-3 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-white`}></div>
                  
                  {/* Inner ears */}
                  <div className="absolute -top-1 left-4 w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-pink-300"></div>
                  <div className="absolute -top-1 right-4 w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-pink-300"></div>
                  
                  {/* Eyes */}
                  <div className="absolute top-6 left-4 flex space-x-4">
                    <div className="w-3 h-3 bg-black rounded-full animate-wink"></div>
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  
                  {/* Nose */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-pink-400"></div>
                  
                  {/* Mouth */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-2 bg-black"></div>
                    <div className="flex mt-0">
                      <div className="w-3 h-0 border-t-2 border-black rounded-full transform -rotate-45 -ml-1"></div>
                      <div className="w-3 h-0 border-t-2 border-black rounded-full transform rotate-45 -mr-1"></div>
                    </div>
                  </div>
                  
                  {/* Whiskers */}
                  <div className="absolute top-9 left-0 w-6 h-0 border-t border-black transform -rotate-12"></div>
                  <div className="absolute top-11 left-0 w-5 h-0 border-t border-black transform rotate-12"></div>
                  <div className="absolute top-9 right-0 w-6 h-0 border-t border-black transform rotate-12"></div>
                  <div className="absolute top-11 right-0 w-5 h-0 border-t border-black transform -rotate-12"></div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom quote */}
          <div className="text-center mt-16 md:mt-20">
            <div className={`w-32 h-px mx-auto mb-6 ${
              isNightMode ? 'bg-white/60' : 'bg-[#d4c4b0]'
            }`}></div>
            <p className={`garamond-regular text-lg md:text-xl italic ${
              isNightMode ? 'text-white/80' : 'text-[#8b7355]'
            }`}>
              &ldquo;Los mejores momentos son aquellos que compartimos juntos&rdquo;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}