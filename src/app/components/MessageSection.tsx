"use client"
import { useEffect, useRef, useState } from 'react';
import { FaGift, FaCreditCard, FaHeart, FaMapMarkerAlt, FaPenFancy, FaQuoteLeft, FaFeatherAlt } from 'react-icons/fa';

// Componente MessageCard simulado para el ejemplo
function MessageCard({ className }) {
  return (
    <div className={`bg-white/95 backdrop-blur-lg border-2 border-[#8a6a5a]/30 p-10 ${className}`}>
      {/* Header premium con líneas decorativas */}
      <div className="text-center mb-8 relative">
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-[#8a6a5a]"></div>
        
        <div className="pt-6">
          <h3 className="text-3xl font-light text-[#4a2a1a] mb-3 tracking-wider">Mensaje</h3>
          <p className="text-[#6a4a3a] text-base font-medium">Comparte tus buenos deseos</p>
        </div>
        
        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-[#8a6a5a]"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#4a2a1a] mb-3 tracking-wide uppercase">Nombre</label>
          <input 
            type="text" 
            placeholder="Tu nombre completo"
            className="w-full p-4 border-2 border-[#c4a494]/50 bg-white/80 focus:outline-none focus:ring-0 focus:border-[#8a6a5a] focus:bg-white transition-all duration-300 font-medium text-[#4a2a1a]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[#4a2a1a] mb-3 tracking-wide uppercase">Correo electrónico</label>
          <input 
            type="email" 
            placeholder="tu@email.com"
            className="w-full p-4 border-2 border-[#c4a494]/50 bg-white/80 focus:outline-none focus:ring-0 focus:border-[#8a6a5a] focus:bg-white transition-all duration-300 font-medium text-[#4a2a1a]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[#4a2a1a] mb-3 tracking-wide uppercase">Mensaje</label>
          <textarea 
            rows={5}
            placeholder="Comparte tus buenos deseos y bendiciones para nuestra nueva vida juntos..."
            className="w-full p-4 border-2 border-[#c4a494]/50 bg-white/80 focus:outline-none focus:ring-0 focus:border-[#8a6a5a] focus:bg-white transition-all duration-300 resize-none font-medium text-[#4a2a1a]"
          />
        </div>
        
        <div className="pt-4">
          <button className="w-full bg-[#6a4a3a] hover:bg-[#5a3a2a] text-white font-semibold py-4 transition-all duration-300 flex items-center justify-center gap-3 tracking-wider uppercase text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <FaPenFancy className="text-base" />
            ENVIAR MENSAJE
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fallback para móviles - mostrar después de un breve delay
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            clearTimeout(fallbackTimer);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen w-full relative overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 animate-elegant-fade-in' : 'opacity-0'
      }`}
      style={{
        backgroundColor: '#d4b5a8' // Color sólido que mezcla los tonos originales
      }}
    >
      {/* Elegant background patterns */}
      <div className="absolute inset-0 opacity-12">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#8a5a4a]/20 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-[#7a4a3a]/15 rounded-full blur-3xl animate-gentle-float-delay"></div>
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-[#5a3a2a]/10 rounded-full blur-2xl animate-gentle-float-slow"></div>
        <div className="absolute top-1/6 right-1/3 w-72 h-72 bg-[#a4746a]/18 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-1/6 left-1/3 w-88 h-88 bg-[#9a6a5a]/12 rounded-full blur-3xl animate-gentle-float-delay"></div>
      </div>

      {/* Decorative border elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8a5a4a] to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8a5a4a] to-transparent opacity-70"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-16 text-[#7a4a3a]/50 animate-elegant-float">
        <FaFeatherAlt className="text-4xl transform rotate-12" />
      </div>
      <div className="absolute bottom-32 left-20 text-[#6a3a2a]/45 animate-elegant-float-reverse">
        <FaHeart className="text-3xl transform -rotate-12" />
      </div>
      <div className="absolute top-1/2 right-1/4 text-[#8a5a4a]/40 animate-elegant-float-delay">
        <FaQuoteLeft className="text-2xl transform rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto text-[#4a2a1a] relative z-10 py-16 md:py-24 px-4 md:px-8">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto min-h-[70vh]">
          
          {/* Left Column - Elegant Message Invitation - Centrado Verticalmente */}
          <div className="order-1 relative flex flex-col justify-center h-full">
            <div className="text-center">
              
              {/* Elegant title con tipografía mejorada */}
              <h3 className="text-5xl md:text-7xl font-light text-[#3a1a0a] mb-8 tracking-wider leading-tight">
                <span className="font-serif italic font-medium">Déjanos</span>
                <span className="block font-sans font-light text-4xl md:text-6xl mt-4 text-[#5a2a1a]">
                  UN MENSAJE
                </span>
              </h3>
              
              {/* Ornamental divider */}
              <div className="flex items-center justify-center mt-10 mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#6a3a2a] to-transparent"></div>
                <div className="mx-8 w-4 h-4 border-2 border-[#6a3a2a] transform rotate-45 bg-gradient-to-br from-[#dfb9b0] to-[#cc9b8c]"></div>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#6a3a2a] to-transparent"></div>
              </div>
              
              {/* Content sections con mejor contraste */}
              <div className="space-y-10 mb-12">
                <div className="space-y-6">
                  <p className="text-[#3a1a0a] text-3xl md:text-4xl font-semibold tracking-wide leading-relaxed">
                    Escribe desde el corazón
                  </p>
                  <div className="w-16 h-px bg-[#5a2a1a] mx-auto"></div>
                  <p className="text-[#4a2a1a] text-xl md:text-2xl leading-relaxed max-w-lg mx-auto font-medium">
                    Tus palabras de amor y buenos deseos serán un tesoro que guardaremos para siempre
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Message Form */}
          <div className="order-2 relative flex flex-col justify-center h-full">
            {/* Subtle glow effect */}
            <div className="absolute -inset-8 bg-gradient-to-br from-[#8a5a4a]/30 via-[#6a4a3a]/20 to-[#4a2a1a]/25 blur-2xl opacity-60"></div>
            <div className="relative transform hover:scale-[1.01] transition-all duration-700 ease-out">
              <MessageCard className="shadow-premium border-[#8a6a5a]/40 backdrop-blur-xl" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 15px 35px -5px rgba(74, 42, 26, 0.25),
            0 25px 60px -5px rgba(74, 42, 26, 0.15),
            0 0 0 1px rgba(138, 90, 74, 0.2);
        }
        
        .shadow-elegant-strong {
          box-shadow: 
            0 20px 45px -5px rgba(74, 42, 26, 0.3),
            0 35px 80px -10px rgba(74, 42, 26, 0.2),
            0 0 0 1px rgba(138, 90, 74, 0.25);
        }

        .shadow-premium {
          box-shadow: 
            0 25px 50px -12px rgba(74, 42, 26, 0.4),
            0 40px 100px -15px rgba(74, 42, 26, 0.3),
            0 0 0 1px rgba(138, 90, 74, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes elegant-fade-in {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes elegant-float {
          0%, 100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-15px) rotate(18deg);
          }
        }

        @keyframes elegant-float-reverse {
          0%, 100% {
            transform: translateY(0px) rotate(-12deg);
          }
          50% {
            transform: translateY(-12px) rotate(-18deg);
          }
        }

        @keyframes elegant-float-delay {
          0%, 100% {
            transform: translateY(0px) rotate(6deg);
          }
          50% {
            transform: translateY(-10px) rotate(12deg);
          }
        }

        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(-20px) translateX(10px) scale(1.05);
          }
          66% {
            transform: translateY(10px) translateX(-10px) scale(0.95);
          }
        }

        @keyframes gentle-float-delay {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(15px) translateX(-15px) scale(1.02);
          }
          66% {
            transform: translateY(-10px) translateX(15px) scale(0.98);
          }
        }

        @keyframes gentle-float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) translateX(8px) scale(1.01);
          }
        }

        .animate-elegant-fade-in {
          animation: elegant-fade-in 1s ease-out forwards;
        }

        .animate-elegant-float {
          animation: elegant-float 4s ease-in-out infinite;
        }

        .animate-elegant-float-reverse {
          animation: elegant-float-reverse 4.5s ease-in-out infinite;
        }

        .animate-elegant-float-delay {
          animation: elegant-float-delay 3.5s ease-in-out infinite 2s;
        }

        .animate-gentle-float {
          animation: gentle-float 8s ease-in-out infinite;
        }

        .animate-gentle-float-delay {
          animation: gentle-float-delay 10s ease-in-out infinite 3s;
        }

        .animate-gentle-float-slow {
          animation: gentle-float-slow 12s ease-in-out infinite 5s;
        }
      `}</style>
    </section>
  );
}