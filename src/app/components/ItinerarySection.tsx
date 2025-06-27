"use client"
import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
  }, []);

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
      <style jsx>{`
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

        .timeline-dot {
          box-shadow: 0 0 0 4px #f8f7f5, 0 0 0 6px #d4c4b0;
        }

        .timeline-item:hover .timeline-dot {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px #f8f7f5, 0 0 0 8px #8b7355;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="min-h-screen w-full bg-[#f8f7f5] py-16 md:py-24 px-4 md:px-8 opacity-0 relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-24 h-24 border border-[#d4c4b0]/20 rounded-full"></div>
          <div className="absolute bottom-32 left-8 w-16 h-16 border border-[#d4c4b0]/20 rounded-full"></div>
          <div className="absolute top-1/2 right-4 w-8 h-8 border border-[#d4c4b0]/30 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase text-[#8b7355] mb-6">
              ITINERARIO DEL DÍA
            </h2>
            <div className="w-24 h-px bg-[#d4c4b0] mx-auto mb-6"></div>
            <h3 className="garamond-regular text-3xl md:text-4xl lg:text-5xl font-light text-[#5c5c5c] tracking-wider">
              Primer Logística
            </h3>
            <p className="text-[#8b7355] text-lg mt-4 font-light">
              Un día especial lleno de momentos únicos
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 timeline-line"></div>

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              {itineraryItems.map((item, index) => (
                <div
                  key={index}
                  ref={addItemRef(index)}
                  className="timeline-item relative flex items-start pl-20 md:pl-28 opacity-0 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot absolute left-6 md:left-10 w-4 h-4 bg-[#8b7355] rounded-full transition-all duration-300 ease-in-out z-10"></div>

                  {/* Icon Circle */}
                  <div className="absolute left-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl border-2 border-[#d4c4b0]/30 group-hover:border-[#8b7355]/50 transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Content Card */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 w-full group-hover:transform group-hover:-translate-y-1 border border-[#d4c4b0]/20">
                    {/* Time */}
                    <div className="text-[#8b7355] text-sm md:text-base font-medium tracking-wide mb-2">
                      {item.time}
                    </div>

                    {/* Title */}
                    <h4 className="garamond-regular text-xl md:text-2xl text-[#5c5c5c] mb-3 font-medium">
                      {item.title}
                    </h4>

                    {/* Description */}
                    {item.description && (
                      <p className="text-[#7a7a7a] text-sm md:text-base mb-2">
                        {item.description}
                      </p>
                    )}

                    {/* Location */}
                    {item.location && (
                      <div className="flex items-center text-[#8b7355] text-sm md:text-base">
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
            <div className="w-32 h-px bg-[#d4c4b0] mx-auto mb-6"></div>
            <p className="garamond-regular text-lg md:text-xl text-[#8b7355] italic">
              &ldquo;Los mejores momentos son aquellos que compartimos juntos&rdquo;
            </p>
          </div>
        </div>
      </section>
    </>
  );
} 