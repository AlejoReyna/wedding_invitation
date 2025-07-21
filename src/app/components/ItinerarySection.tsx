"use client"
import { useEffect, useRef, useState } from 'react';

interface ItineraryItem {
  time: string;
  displayTime: string;
  title: string;
  description: string;
  location?: string;
}

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-20px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Decorative floral elements matching the project style
  const FloralDecoration = ({ className = "" }) => (
    <svg className={`w-full h-full ${className}`} viewBox="0 0 80 80" fill="none">
      <path 
        d="M10,40 Q25,20 40,40 Q55,60 70,40 Q55,20 40,40 Q25,60 10,40" 
        stroke="#8B7355" 
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />
      <path d="M25,35 Q30,25 35,35 Q30,45 25,35" fill="#9B8366" opacity="0.5"/>
      <path d="M45,45 Q50,35 55,45 Q50,55 45,45" fill="#C4985B" opacity="0.4"/>
      <circle cx="40" cy="40" r="2.5" fill="#D4A971" opacity="0.6"/>
      <circle cx="32" cy="38" r="1" fill="#8B7355" opacity="0.4"/>
      <circle cx="48" cy="42" r="1" fill="#8B7355" opacity="0.4"/>
    </svg>
  );

  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      displayTime: "04:00",
      title: "Ceremonia",
      description: "Te invitamos a acompañarnos en este momento tan especial donde intercambiaremos votos de amor y compromiso, rodeados de nuestros seres queridos.",
      location: "Iglesia del Sagrado Corazón"
    },
    {
      time: "6:00 PM - 11:00 PM",
      displayTime: "06:00",
      title: "Recepción",
      description: "Únete a nosotros para una elegante celebración llena de música, baile y momentos inolvidables que crearemos juntos.",
      location: "Museo de Montemorelos"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full py-24 px-4 md:px-8 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #fbf9f6 0%, #f8f6f3 35%, #f5f2ee 70%, #f9f7f4 100%)'
      }}
    >
      {/* Subtle organic texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(196, 152, 91, 0.15) 0%, transparent 60%),
                              radial-gradient(circle at 70% 60%, rgba(139, 115, 85, 0.12) 0%, transparent 60%),
                              radial-gradient(circle at 50% 90%, rgba(180, 147, 113, 0.1) 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="itineraryPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path 
                d="M20,20 Q40,30 60,20 Q80,10 100,25" 
                stroke="#8B7355" 
                strokeWidth="0.5" 
                fill="none" 
                opacity="0.3"
              />
              <circle cx="30" cy="25" r="1" fill="#C4985B" opacity="0.2"/>
              <circle cx="70" cy="22" r="0.8" fill="#9B8366" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#itineraryPattern)"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with elegant styling */}
        <div className={`text-center mb-20 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} style={{ transitionDelay: '200ms' }}>
          
          {/* Decorative top element */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 opacity-40">
              <FloralDecoration />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs md:text-sm font-light tracking-[0.4em] uppercase mb-6 text-[#8B7355] italic garamond-300">
            ITINERARIO DEL DÍA
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-px mx-auto mb-6 bg-[#C4985B] opacity-60"></div>
          
          {/* Main title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.3em] uppercase text-[#5c5c5c] mb-8 garamond-300 relative">
            Cronograma
          </h2>
          
          {/* Bottom decorative element */}
          <div className="flex justify-center items-center mt-6">
            <div className="w-8 h-px bg-[#C4985B] opacity-40"></div>
            <div className="mx-3 text-[#C4985B] text-lg opacity-60">♡</div>
            <div className="w-8 h-px bg-[#C4985B] opacity-40"></div>
          </div>
        </div>

        {/* Side decorative elements */}
        <div className="absolute left-8 top-1/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration />
        </div>
        
        <div className="absolute right-8 top-2/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration className="transform rotate-180" />
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#C4985B] via-[#8B7355] to-[#C4985B] opacity-60"></div>

          {/* Events */}
          <div className="space-y-24 md:space-y-32">
            {itineraryItems.map((item, index) => (
              <div key={index} className={`relative transition-all duration-2500 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${800 + index * 200}ms` }}>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#8B7355] rounded-full border-4 border-white shadow-elegant z-10">
                  <div className="absolute inset-2 bg-[#C4985B] rounded-full"></div>
                </div>

                {/* Event Card */}
                <div className={`${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 ml-auto'} w-5/12 hidden md:block`}>
                  <div className="bg-white overflow-hidden border-l-4 border-stone-200 shadow-elegant hover:shadow-elegant-hover hover:border-stone-400 transition-all duration-700 transform hover:-translate-y-2">
                    
                    {/* Content Section */}
                    <div className="p-8 md:p-10 relative">
                      
                      {/* Decorative Element */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-stone-300"></div>
                      
                      {/* Time Display */}
                      <div className="mb-6">
                        <div className="text-4xl md:text-5xl font-light tracking-wider text-[#8B7355] leading-none mb-2" style={{fontFamily: 'Georgia, serif'}}>
                          {item.displayTime}
                        </div>
                        <div className="text-sm text-stone-600 font-light tracking-[0.1em] uppercase">
                          {item.time}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-light text-stone-800 mb-4 tracking-wide" style={{fontFamily: 'Georgia, serif'}}>
                        {item.title}
                      </h3>

                      {/* Location */}
                      {item.location && (
                        <div className="mb-6 flex items-center gap-2 text-[#8B7355] justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span className="text-sm font-light tracking-[0.1em]">{item.location}</span>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="flex justify-center items-center mb-6">
                        <div className="w-8 h-px bg-stone-300"></div>
                        <div className="w-2 h-2 border border-stone-300 transform rotate-45 mx-4"></div>
                        <div className="w-8 h-px bg-stone-300"></div>
                      </div>

                      {/* Description */}
                      <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden ml-16">
                  <div className="bg-white overflow-hidden border-l-4 border-stone-200 shadow-elegant">
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-stone-300"></div>
                      
                      <div className="mb-4">
                        <div className="text-3xl font-light tracking-wider text-[#8B7355] leading-none mb-1" style={{fontFamily: 'Georgia, serif'}}>
                          {item.displayTime}
                        </div>
                        <div className="text-xs text-stone-600 font-light tracking-[0.1em] uppercase">
                          {item.time}
                        </div>
                      </div>

                      <h3 className="text-xl font-light text-stone-800 mb-3 tracking-wide" style={{fontFamily: 'Georgia, serif'}}>
                        {item.title}
                      </h3>

                      {item.location && (
                        <div className="mb-4 flex items-center gap-2 text-[#8B7355]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span className="text-xs font-light tracking-[0.1em]">{item.location}</span>
                        </div>
                      )}

                      <div className="flex justify-center items-center mb-4">
                        <div className="w-6 h-px bg-stone-300"></div>
                        <div className="w-1.5 h-1.5 border border-stone-300 transform rotate-45 mx-3"></div>
                        <div className="w-6 h-px bg-stone-300"></div>
                      </div>

                      <p className="text-stone-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className={`flex justify-center mt-16 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="w-20 h-20 opacity-30">
            <FloralDecoration />
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        
        .shadow-elegant-hover {
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 25px 50px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </section>
  );
}