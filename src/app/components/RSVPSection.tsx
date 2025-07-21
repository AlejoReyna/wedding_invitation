"use client"
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaCalendarPlus } from 'react-icons/fa';

export default function RSVPSection() {
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
        stroke="rgba(255,255,255,0.6)" 
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />
      <path d="M25,35 Q30,25 35,35 Q30,45 25,35" fill="rgba(255,255,255,0.5)" opacity="0.5"/>
      <path d="M45,45 Q50,35 55,45 Q50,55 45,45" fill="rgba(255,255,255,0.4)" opacity="0.4"/>
      <circle cx="40" cy="40" r="2.5" fill="rgba(255,255,255,0.6)" opacity="0.6"/>
      <circle cx="32" cy="38" r="1" fill="rgba(255,255,255,0.4)" opacity="0.4"/>
      <circle cx="48" cy="42" r="1" fill="rgba(255,255,255,0.4)" opacity="0.4"/>
    </svg>
  );

  const addToCalendar = () => {
    const startDate = '20241018T170000';
    const endDate = '20241019T020000';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//Event//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'SUMMARY:Boda de Andrea y Aldo',
      'DESCRIPTION:Celebración de la boda de Andrea y Aldo',
      'LOCATION:Montemorelos, N.L.',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'DESCRIPTION:Recordatorio: Boda de Andrea y Aldo mañana',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'boda-andrea-aldo.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url('/hero.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/10 to-black/20"></div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 70%),
                              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Side decorative elements */}
      <div className="absolute left-8 top-1/4 w-16 h-16 opacity-20 hidden lg:block">
        <FloralDecoration />
      </div>
      
      <div className="absolute right-8 bottom-1/4 w-16 h-16 opacity-20 hidden lg:block">
        <FloralDecoration className="transform rotate-180" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        
        {/* Header with elegant styling */}
        <div className={`mb-12 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} style={{ transitionDelay: '200ms' }}>
          
          {/* Decorative top element */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 opacity-40">
              <FloralDecoration />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs md:text-sm font-light tracking-[0.4em] uppercase mb-6 text-white/80 italic garamond-300">
            CONFIRMA TU ASISTENCIA
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-px mx-auto mb-6 bg-white/60"></div>
          
          {/* Main title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.3em] uppercase text-white mb-8 garamond-300 relative">
            RSVP
          </h2>
          
          {/* Bottom decorative element */}
          <div className="flex justify-center items-center mt-6">
            <div className="w-8 h-px bg-white/40"></div>
            <div className="mx-3 text-white/60 text-lg">♡</div>
            <div className="w-8 h-px bg-white/40"></div>
          </div>
        </div>
        
        {/* Main message with fade in */}
        <div className={`mb-12 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '600ms' }}>
          <p className="text-xl md:text-2xl font-light text-white leading-relaxed tracking-[0.1em] garamond-300">
            Nos encantaría celebrar este momento especial contigo
          </p>
        </div>

        {/* Content card */}
        <div className={`transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-elegant max-w-2xl mx-auto">
            
            {/* Content Section */}
            <div className="p-10 md:p-12 text-center relative">
              
              {/* Decorative Element */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-white/30"></div>
              
              {/* Welcome message */}
              <p className="text-lg md:text-xl font-light text-white/90 tracking-wide mb-10 garamond-300">
                ¡Te esperamos!
              </p>
              
              {/* Divider */}
              <div className="flex justify-center items-center mb-10">
                <div className="w-8 h-px bg-white/30"></div>
                <div className="w-2 h-2 border border-white/30 transform rotate-45 mx-4"></div>
                <div className="w-8 h-px bg-white/30"></div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col gap-6 items-center">
                <button 
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white/15 backdrop-blur-md border border-white/30 text-white font-light tracking-[0.1em] hover:bg-white/25 hover:border-white/50 transition-all duration-400 relative overflow-hidden garamond-300 uppercase text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() => {
                    window.open('https://wa.me/528123456789?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20Andrea%20y%20Aldo', '_blank');
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <FaWhatsapp className="text-lg relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Confirmar por WhatsApp</span>
                </button>
                
                <button 
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white/15 backdrop-blur-md border border-white/30 text-white font-light tracking-[0.1em] hover:bg-white/25 hover:border-white/50 transition-all duration-400 relative overflow-hidden garamond-300 uppercase text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={addToCalendar}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <FaCalendarPlus className="text-lg relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Agendar en Calendario</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className={`flex justify-center mt-12 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="w-20 h-20 opacity-30">
            <FloralDecoration />
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.3),
            0 20px 25px -5px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
}