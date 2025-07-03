"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
  location?: string;
  icon: React.ReactElement;
}

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isNightMode, setIsNightMode } = useTheme();
  const [showCatBubble, setShowCatBubble] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.findIndex(ref => ref === entry.target);
          
          if (entry.isIntersecting) {
            // Añadir un pequeño delay para asegurar que la animación se vea
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
              entry.target.classList.remove('opacity-0');
            }, 100);

            // Establecer el elemento activo
            setActiveItem(index);

            // Verificar si es la última card (índice 4 - Recepción 7:00 PM)
            if (index === 4) {
              setIsNightMode(true);
              // Mostrar el globo del gato después de un delay
              setTimeout(() => {
                setShowCatBubble(true);
              }, 1500);
            }
          } else {
            // Si el elemento sale del viewport y era el activo, quitar activo
            if (activeItem === index) {
              setActiveItem(null);
            }
            
            // Si la última card sale del viewport, volver al modo día
            if (index === 4) {
              setIsNightMode(false);
              setShowCatBubble(false);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentRef = sectionRef.current;
    const currentItemRefs = [...itemRefs.current];
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    currentItemRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      
      currentItemRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [setIsNightMode, activeItem]);

  const addItemRef = (index: number) => (el: HTMLDivElement) => {
    itemRefs.current[index] = el;
  };

  const itineraryItems: ItineraryItem[] = [
    {
      time: "10:00 AM - 1:00 PM",
      title: "Arreglo de Novia",
      description: "Novia, mamá, 2 primas, suegra y cuñada",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M12 3v18" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1a9 9 0 0 1 9 9v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a9 9 0 0 1 9-9z" />
          <path d="M8 21l2-4 2 4 2-4" />
        </svg>
      )
    },
    {
      time: "4:00 PM - 5:00 PM",
      title: "Ceremonia Religiosa",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M12 2L8 8h8l-4-6z" />
          <path d="M12 8v14" />
          <path d="M8 12h8" />
          <path d="M10 16h4" />
          <circle cx="12" cy="20" r="2" />
        </svg>
      )
    },
    {
      time: "5:30 PM - 6:30 PM",
      title: "Sesión de Fotos",
      location: "Museo",
      description: "Novios",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
          <path d="M21 15h.01" />
          <path d="M3 15h.01" />
        </svg>
      )
    },
    {
      time: "6:30 PM - 7:00 PM",
      title: "Ceremonia Civil",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="9" cy="12" r="3" />
          <circle cx="15" cy="12" r="3" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
          <path d="M9 9l6 6" />
          <path d="M15 9l-6 6" />
        </svg>
      )
    },
    {
      time: "7:00 PM - 12:00 AM",
      title: "Recepción",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M5 12V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5" />
          <path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
          <path d="M12 6V2" />
          <path d="M8 12h8" />
          <path d="M8 16h8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    }
  ];

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

        @keyframes icon-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 115, 85, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(139, 115, 85, 0.5);
          }
        }

        @keyframes icon-glow-night {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            border-color: rgba(139, 115, 85, 0.3);
          }
          50% {
            border-color: rgba(139, 115, 85, 0.7);
          }
        }

        @keyframes pulse-border-night {
          0%, 100% {
            border-color: rgba(255, 255, 255, 0.3);
          }
          50% {
            border-color: rgba(255, 255, 255, 0.7);
          }
        }

        @keyframes icon-scale-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
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

        .animate-icon-glow {
          animation: icon-glow 3s ease-in-out infinite;
        }

        .animate-icon-glow-night {
          animation: icon-glow-night 3s ease-in-out infinite;
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .animate-pulse-border-night {
          animation: pulse-border-night 2s ease-in-out infinite;
        }

        .animate-icon-scale-in {
          animation: icon-scale-in 0.6s ease-out forwards;
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

        .timeline-line {
          background: linear-gradient(to bottom, #d4c4b0, #8b7355, #d4c4b0);
        }

        .timeline-line-night {
          background: linear-gradient(to bottom, #ffffff, #cccccc, #ffffff);
        }

        .timeline-dot {
          box-shadow: 0 0 0 4px #f8f7f5, 0 0 0 6px #d4c4b0;
        }

        .timeline-dot-night {
          box-shadow: 0 0 0 4px #1a1a1a, 0 0 0 6px #ffffff;
        }

        .timeline-item:hover .timeline-dot {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px #f8f7f5, 0 0 0 8px #8b7355;
        }

        .timeline-item:hover .timeline-dot-night {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px #1a1a1a, 0 0 0 8px #ffffff;
        }

        /* Transición suave para el cambio de tema */
        .theme-transition {
          transition: background-color 1s ease-in-out, color 1s ease-in-out;
        }

        .celestial-transition {
          transition: opacity 2s ease-in-out, transform 2s ease-in-out;
        }

        /* Estilos para el gato */
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

        /* Estilos para los iconos elegantes */
        .icon-container {
          position: relative;
          background: linear-gradient(135deg, #f8f7f5, #ffffff);
          border: 2px solid;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .icon-container-night {
          background: linear-gradient(135deg, #2a2a2a, #3a3a3a);
          border: 2px solid;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .icon-shine {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 30%;
          height: 30%;
          background: linear-gradient(45deg, rgba(255,255,255,0.8), transparent);
          border-radius: 50%;
          pointer-events: none;
        }

        .icon-shine-night {
          background: linear-gradient(45deg, rgba(255,255,255,0.3), transparent);
        }
      `}</style>

      <section 
        ref={sectionRef}
        className={`min-h-screen w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden theme-transition ${
          isNightMode ? 'bg-[#1a1a1a]' : 'bg-[#f8f7f5]'
        }`}
      >
        {/* Sol Minimalista - Solo visible durante el día */}
        <div className={`absolute top-20 right-20 celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`} style={{ zIndex: 1 }}>
          <div className="relative animate-fade-celestial">
            {/* Círculo principal del sol */}
            <div className="w-16 h-16 bg-[#d4c4b0] rounded-full opacity-80 relative">
              {/* Rayos triangulares del sol - más cerca y más cantidad */}
              <div className="absolute inset-0 animate-sun-rotate">
                {/* Rayos principales - 4 direcciones cardinales */}
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
                
                {/* Rayos diagonales principales - 4 esquinas */}
                <div className="absolute top-2 right-2 transform rotate-45 translate-x-2.5 -translate-y-2.5">
                  <div className="w-0 h-0 border-l-1.5 border-r-1.5 border-b-3 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-50"></div>
                </div>
                
                <div className="absolute top-2 left-2 transform -rotate-45 -translate-x-2.5 -translate-y-2.5">
                  <div className="w-0 h-0 border-l-1.5 border-r-1.5 border-b-3 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-50"></div>
                </div>
                
                <div className="absolute bottom-2 right-2 transform -rotate-45 translate-x-2.5 translate-y-2.5">
                  <div className="w-0 h-0 border-l-1.5 border-r-1.5 border-b-3 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-50"></div>
                </div>
                
                <div className="absolute bottom-2 left-2 transform rotate-45 -translate-x-2.5 translate-y-2.5">
                  <div className="w-0 h-0 border-l-1.5 border-r-1.5 border-b-3 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-50"></div>
                </div>
                
                {/* Rayos intermedios - 8 rayos adicionales */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-2.5 rotate-22.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
                
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-2.5 -rotate-22.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
                
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-2.5 rotate-157.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
                
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-2.5 -rotate-157.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
                
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -translate-x-2.5 -rotate-67.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
                
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -translate-x-2.5 -rotate-112.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
                
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 translate-x-2.5 rotate-67.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
                
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 translate-x-2.5 rotate-112.5">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2.5 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Luna Minimalista - Solo visible durante la noche */}
        <div className={`absolute top-20 left-20 celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} style={{ zIndex: 1, animationDelay: '2s' }}>
          <div className="relative animate-fade-celestial">
            {/* Círculo principal de la luna */}
            <div className="w-16 h-16 bg-white opacity-70 rounded-full relative overflow-hidden">
              {/* Cráteres minimalistas */}
              <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-40"></div>
              <div className="absolute top-4 right-2 w-1 h-1 bg-gray-300 rounded-full opacity-30"></div>
              <div className="absolute bottom-3 left-2 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-35"></div>
              <div className="absolute bottom-2 right-3 w-2 h-2 bg-gray-300 rounded-full opacity-25"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-300 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Estrellas minimalistas alrededor */}
            <div className="absolute -top-1 -left-1 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-1 right-5 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
            <div className="absolute top-5 -right-2 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
            <div className="absolute bottom-1 -left-2 w-0.5 h-0.5 bg-white rounded-full opacity-45"></div>
            <div className="absolute -bottom-1 right-1 w-0.5 h-0.5 bg-white rounded-full opacity-55"></div>
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
          <div className={`absolute top-1/2 right-4 w-8 h-8 border rounded-full ${
            isNightMode ? 'border-white/30' : 'border-[#d4c4b0]/30'
          }`}></div>
          {/* Nuevos elementos decorativos */}
          <div className={`absolute top-32 left-20 w-2 h-2 rounded-full ${
            isNightMode ? 'bg-white/40' : 'bg-[#d4c4b0]/40'
          }`}></div>
          <div className={`absolute bottom-20 right-32 w-3 h-3 rounded-full ${
            isNightMode ? 'bg-white/30' : 'bg-[#d4c4b0]/30'
          }`}></div>
        </div>

        <div className="max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
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
            <p className={`text-lg mt-4 font-light ${
              isNightMode ? 'text-white/70' : 'text-[#8b7355]'
            }`}>
              Un día especial lleno de momentos únicos
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-8 md:left-12 top-0 bottom-0 w-0.5 ${
              isNightMode ? 'timeline-line-night' : 'timeline-line'
            }`}></div>

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              {itineraryItems.map((item, index) => (
                <div
                  key={index}
                  ref={addItemRef(index)}
                  className="timeline-item relative flex items-start pl-20 md:pl-28 opacity-0 group transition-all duration-300"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    minHeight: '100px'
                  }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 md:left-10 w-4 h-4 rounded-full transition-all duration-300 ease-in-out z-10 ${
                    isNightMode 
                      ? 'timeline-dot-night bg-white' 
                      : 'timeline-dot bg-[#8b7355]'
                  }`}></div>

                  {/* Icon Circle - Solo visible en elemento activo */}
                  {activeItem === index && (
                    <div className={`absolute left-0 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 animate-icon-scale-in ${
                      isNightMode 
                        ? 'icon-container-night animate-icon-glow-night animate-pulse-border-night' 
                        : 'icon-container animate-icon-glow animate-pulse-border'
                    } ${
                      isNightMode ? 'border-white/30' : 'border-[#d4c4b0]/30'
                    } group-hover:scale-110`}>
                      {/* Brillo interno */}
                      <div className={`icon-shine ${
                        isNightMode ? 'icon-shine-night' : ''
                      }`}></div>
                      
                      {/* Icono SVG */}
                      <div className={`relative z-10 ${
                        isNightMode ? 'text-white' : 'text-[#8b7355]'
                      } group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                    </div>
                  )}

                  {/* Content Card */}
                  <div className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 w-full group-hover:transform group-hover:-translate-y-1 border ${
                    isNightMode 
                      ? 'bg-[#2a2a2a] border-white/20' 
                      : 'bg-white border-[#d4c4b0]/20'
                  } relative overflow-hidden`}>
                    {/* Efecto de brillo en la card */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${
                      isNightMode 
                        ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
                        : 'bg-gradient-to-r from-transparent via-[#d4c4b0]/50 to-transparent'
                    }`}></div>

                    {/* Time */}
                    <div className={`text-sm md:text-base font-medium tracking-wide mb-2 flex items-center ${
                      isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        isNightMode ? 'bg-white/60' : 'bg-[#d4c4b0]'
                      }`}></div>
                      {item.time}
                    </div>

                    {/* Title */}
                    <h4 className={`garamond-regular text-xl md:text-2xl mb-3 font-medium ${
                      isNightMode ? 'text-white' : 'text-[#5c5c5c]'
                    }`}>
                      {item.title}
                    </h4>

                    {/* Description */}
                    {item.description && (
                      <p className={`text-sm md:text-base mb-2 ${
                        isNightMode ? 'text-white/70' : 'text-[#7a7a7a]'
                      }`}>
                        {item.description}
                      </p>
                    )}

                    {/* Location */}
                    {item.location && (
                      <div className={`flex items-center text-sm md:text-base ${
                        isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                      }`}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Gato Blanco con Animación */}
            <div className="flex justify-center mt-16">
              <div className="cat-container animate-cat-appear animate-float">
                {/* Globo de Texto */}
                {showCatBubble && (
                  <div className="speech-bubble animate-bubble-appear">
                    PST... También habrá after
                  </div>
                )}
                
                {/* Cara del Gato */}
                <div className={`relative w-20 h-20 rounded-full border-4 ${
                  isNightMode ? 'bg-white border-gray-200' : 'bg-white border-gray-300'
                } shadow-lg`}>
                  {/* Orejas */}
                  <div className={`absolute -top-3 left-3 w-0 h-0 border-l-4 border-r-4 border-b-6 ${
                    isNightMode ? 'border-l-transparent border-r-transparent border-b-white' : 'border-l-transparent border-r-transparent border-b-white'
                  }`}></div>
                  <div className={`absolute -top-3 right-3 w-0 h-0 border-l-4 border-r-4 border-b-6 ${
                    isNightMode ? 'border-l-transparent border-r-transparent border-b-white' : 'border-l-transparent border-r-transparent border-b-white'
                  }`}></div>
                  
                  {/* Interior de las orejas */}
                  <div className="absolute -top-1 left-4 w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-pink-300"></div>
                  <div className="absolute -top-1 right-4 w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-pink-300"></div>
                  
                  {/* Ojos */}
                  <div className="absolute top-6 left-4 flex space-x-4">
                    <div className="w-3 h-3 bg-black rounded-full animate-wink"></div>
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  
                  {/* Nariz */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-pink-400"></div>
                  
                  {/* Boca */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-2 bg-black"></div>
                    <div className="flex mt-0">
                      <div className="w-3 h-0 border-t-2 border-black rounded-full transform -rotate-45 -ml-1"></div>
                      <div className="w-3 h-0 border-t-2 border-black rounded-full transform rotate-45 -mr-1"></div>
                    </div>
                  </div>
                  
                  {/* Bigotes */}
                  <div className="absolute top-9 left-0 w-6 h-0 border-t border-black transform -rotate-12"></div>
                  <div className="absolute top-11 left-0 w-5 h-0 border-t border-black transform rotate-12"></div>
                  <div className="absolute top-9 right-0 w-6 h-0 border-t border-black transform rotate-12"></div>
                  <div className="absolute top-11 right-0 w-5 h-0 border-t border-black transform -rotate-12"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative element */}
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