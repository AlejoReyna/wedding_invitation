"use client"
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
  location?: string;
  icon: string;
}

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isNightMode, setIsNightMode } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añadir un pequeño delay para asegurar que la animación se vea
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
              entry.target.classList.remove('opacity-0');
            }, 100);

            // Verificar si es la última card (índice 4 - Recepción 7:00 PM)
            const index = itemRefs.current.findIndex(ref => ref === entry.target);
            if (index === 4) {
              setIsNightMode(true);
            }
          } else {
            // Si la última card sale del viewport, volver al modo día
            const index = itemRefs.current.findIndex(ref => ref === entry.target);
            if (index === 4) {
              setIsNightMode(false);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px'
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
  }, [setIsNightMode]);

  const addItemRef = (index: number) => (el: HTMLDivElement) => {
    itemRefs.current[index] = el;
  };

  const itineraryItems: ItineraryItem[] = [
    {
      time: "10:00 AM - 1:00 PM",
      title: "Arreglo de Novia",
      description: "Novia, mamá, 2 primas, suegra y cuñada",
      icon: "💄"
    },
    {
      time: "4:00 PM - 5:00 PM",
      title: "Ceremonia Religiosa",
      icon: "⛪"
    },
    {
      time: "5:30 PM - 6:30 PM",
      title: "Sesión de Fotos",
      location: "Museo",
      description: "Novios",
      icon: "🎥"
    },
    {
      time: "6:30 PM - 7:00 PM",
      title: "Ceremonia Civil",
      icon: "💍"
    },
    {
      time: "7:00 PM - 12:00 AM",
      title: "Recepción",
      icon: "🎉"
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
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

        /* Añadimos estilos para debug */
        .debug-visible {
          border: 2px solid red !important;
        }

        /* Transición suave para el cambio de tema */
        .theme-transition {
          transition: background-color 1s ease-in-out, color 1s ease-in-out;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className={`min-h-screen w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden theme-transition ${
          isNightMode ? 'bg-[#1a1a1a]' : 'bg-[#f8f7f5]'
        }`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-20 right-10 w-24 h-24 border rounded-full ${
            isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
          }`}></div>
          <div className={`absolute bottom-32 left-8 w-16 h-16 border rounded-full ${
            isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
          }`}></div>
          <div className={`absolute top-1/2 right-4 w-8 h-8 border rounded-full ${
            isNightMode ? 'border-white/30' : 'border-[#d4c4b0]/30'
          }`}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
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

                  {/* Icon Circle */}
                  <div className={`absolute left-0 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl border-2 transition-all duration-300 ${
                    isNightMode 
                      ? 'bg-[#2a2a2a] border-white/30 group-hover:border-white/50' 
                      : 'bg-white border-[#d4c4b0]/30 group-hover:border-[#8b7355]/50'
                  }`}>
                    {item.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 w-full group-hover:transform group-hover:-translate-y-1 border ${
                    isNightMode 
                      ? 'bg-[#2a2a2a] border-white/20' 
                      : 'bg-white border-[#d4c4b0]/20'
                  }`}>
                    {/* Time */}
                    <div className={`text-sm md:text-base font-medium tracking-wide mb-2 ${
                      isNightMode ? 'text-white/80' : 'text-[#8b7355]'
                    }`}>
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