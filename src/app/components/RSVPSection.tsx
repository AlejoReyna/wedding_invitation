"use client"
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaCalendarPlus } from 'react-icons/fa';

export default function RSVPSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [showLine, setShowLine] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  
  const fullText = 'Nos encantaría celebrar este momento especial contigo';
  const typingSpeed = 50; // milisegundos por letra - más natural

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            // Iniciar animación de texto después de que la sección aparezca
            setTimeout(() => {
              setStartAnimation(true);
            }, 600);
          }
        });
      },
      {
        threshold: 0.3,
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

  // Animación secuencial de texto
  useEffect(() => {
    if (!startAnimation) return;

    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        // Mostrar línea después de completar el texto
        setTimeout(() => {
          setShowLine(true);
          // Mostrar texto de bienvenida
          setTimeout(() => {
            setShowWelcomeText(true);
            // Mostrar botones
            setTimeout(() => {
              setShowButtons(true);
            }, 500);
          }, 400);
        }, 300);
      }
    }, typingSpeed);

    return () => clearInterval(typewriterInterval);
  }, [startAnimation, fullText, typingSpeed]);

  const addToCalendar = () => {
    // Crear evento de calendario en formato ICS
    const startDate = '20241018T170000'; // 18 de octubre 2024, 5:00 PM
    const endDate = '20241019T020000';   // 19 de octubre 2024, 2:00 AM
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//Event//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'SUMMARY:Boda de Andrea y Aldo',
      'DESCRIPTION:Celebración de la boda de Andrea y Aldo',
      'LOCATION:Venue de la boda', // Puedes cambiar esto por la ubicación real
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H', // Recordatorio 24 horas antes
      'DESCRIPTION:Recordatorio: Boda de Andrea y Aldo mañana',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Crear blob y descargar
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
      className="min-h-screen w-full flex items-center justify-center px-4 opacity-0 relative overflow-hidden"
      style={{
        backgroundImage: `url('/hero.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay con opacidad reducida */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>

      {/* Main content - centered */}
      <div className="text-center relative z-10 max-w-2xl mx-auto">
       
        
        {/* Texto animado */}
        <div className="mb-6">
          <p className="text-xl md:text-2xl font-light text-white garamond-300 leading-relaxed tracking-[0.1em] min-h-[3rem] flex items-center justify-center">
            <span className="typewriter-text">
              {displayedText}
              {startAnimation && displayedText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </span>
          </p>
        </div>

        {/* Línea decorativa */}
        {showLine && (
          <div className="animate-line-appear mb-6">
            <div className="w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"></div>
          </div>
        )}

        {/* Texto de bienvenida */}
        {showWelcomeText && (
          <div className="animate-fade-in-up mb-10">
            <p className="text-lg md:text-xl font-light text-white/90 garamond-300 tracking-wide">
              ¡Te esperamos!
            </p>
          </div>
        )}
        
        {/* Botones */}
        {showButtons && (
          <div className="flex flex-col gap-4 items-center animate-fade-in-up animation-delay-300">
            <button 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-light tracking-[0.1em] hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 garamond-300 uppercase text-sm group rounded-sm"
              onClick={() => {
                window.open('https://wa.me/528123456789?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20Andrea%20y%20Aldo', '_blank');
              }}
            >
              <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span>Confirmar por WhatsApp</span>
            </button>
            
            <button 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-light tracking-[0.1em] hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 garamond-300 uppercase text-sm group rounded-sm"
              onClick={addToCalendar}
            >
              <FaCalendarPlus className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span>Agendar en Calendario</span>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes line-appear {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          100% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-line-appear {
          animation: line-appear 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .typewriter-text {
          font-family: inherit;
        }
      `}</style>
    </section>
  );
}