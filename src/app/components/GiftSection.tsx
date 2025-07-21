"use client"
import { useEffect, useRef, useState } from 'react';
import { FaGift, FaCreditCard, FaHeart, FaMapMarkerAlt, FaGem, FaHandHoldingHeart } from 'react-icons/fa';

export default function GiftSection() {
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
      className={`min-h-screen w-full bg-gradient-to-b from-[#e4c2b9] via-[#dfb9b0] to-[#d9b0a6] py-16 md:py-24 px-4 md:px-8 relative overflow-hidden transition-all duration-1200 ease-out ${
        isVisible ? 'opacity-100 animate-sophisticated-enter' : 'opacity-0'
      }`}
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/5 right-1/4 w-72 h-72 bg-gradient-radial from-[#d0a598]/40 via-[#d0a598]/15 to-transparent blur-3xl animate-drift"></div>
        <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-gradient-radial from-[#c69684]/35 via-[#c69684]/12 to-transparent blur-3xl animate-drift-reverse"></div>
        <div className="absolute top-2/3 right-1/6 w-80 h-80 bg-gradient-radial from-[#9a6b59]/25 via-[#9a6b59]/8 to-transparent blur-2xl animate-drift-slow"></div>
      </div>

      {/* Elegant border accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d0a598]/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d0a598]/60 to-transparent"></div>
      
      {/* Floating refined elements */}
      <div className="absolute top-24 left-16 text-[#d0a598]/30 animate-sophisticated-float">
        <FaGem className="text-2xl transform rotate-12" />
      </div>
      <div className="absolute bottom-28 right-20 text-[#c69684]/35 animate-sophisticated-float-delay">
        <FaHandHoldingHeart className="text-3xl transform -rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto text-[#8d5641] relative z-10">
        {/* Sophisticated header */}
        <div className="text-center mb-20 relative">
          
          
          {/* Minimalist divider */}
          <div className="flex items-center justify-center mt-10 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#d0a598] to-transparent"></div>
            <div className="mx-8 w-1 h-1 bg-[#c69684]"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#d0a598] to-transparent"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Elegant introduction */}
          <div className="text-center space-y-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-[#8d5641]/90 leading-relaxed tracking-wide">
                <span className="font-serif font-light text-5xl md:text-7xl">Tu presencia</span>
                <span className="font-sans font-thin text-3xl md:text-7xl text-[#b8856f] tracking-[0.2em]"> es nuestro tesoro más preciado</span>
              </p>
              <div className="w-16 h-px bg-[#c69684] mx-auto my-6"></div>
              <p className="text-lg text-[#8d5641]/75 leading-relaxed font-light">
                Si deseas honrarnos con un obsequio, te ofrecemos estas opciones con profunda gratitud
              </p>
            </div>
          </div>

          {/* Gift options cards */}
          <div className="space-y-8">
            
            {/* Traditional envelope - Rectangular card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d0a598]/20 via-[#c69684]/15 to-[#d0a598]/20 blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/90 backdrop-blur border border-[#d0a598]/40 shadow-sophisticated p-10 md:p-12 overflow-hidden">
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d0a598]/10 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#d0a598] to-[#c69684] flex items-center justify-center shadow-lg">
                      <FaHeart className="text-white text-xl" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-light text-[#8d5641] tracking-wide">
                      <span className="font-serif italic">Sobre</span>
                      <span className="font-sans font-extralight text-lg text-[#b8856f] ml-3 tracking-[0.15em] uppercase">
                        Tradicional
                      </span>
                    </h3>
                    
                    <div className="w-12 h-px bg-[#c69684]"></div>
                    
                    <p className="text-[#8d5641]/80 text-lg leading-relaxed font-light">
                      Un sobre con tu contribución será recibido con profundo agradecimiento el día de nuestra celebración. 
                      Es la forma más tradicional y querida de acompañarnos en este momento especial.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank transfer - Rectangular card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c69684]/20 via-[#b8856f]/15 to-[#c69684]/20 blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/90 backdrop-blur border border-[#c69684]/40 shadow-sophisticated p-10 md:p-12 overflow-hidden">
                {/* Subtle corner accent */}
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#c69684]/10 to-transparent"></div>
                
                <div className="relative z-10 space-y-8">
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#c69684] to-[#b8856f] flex items-center justify-center shadow-lg">
                        <FaCreditCard className="text-white text-xl" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-light text-[#8d5641] tracking-wide">
                        <span className="font-serif italic">Transferencia</span>
                        <span className="font-sans font-extralight text-lg text-[#b8856f] ml-3 tracking-[0.15em] uppercase">
                          Bancaria
                        </span>
                      </h3>
                      
                      <div className="w-12 h-px bg-[#b8856f]"></div>
                      
                      <p className="text-[#8d5641]/80 text-lg leading-relaxed font-light">
                        Para tu comodidad, puedes realizar una transferencia bancaria directa a nuestra cuenta.
                      </p>
                    </div>
                  </div>

                  {/* Bank details */}
                  <div className="bg-gradient-to-r from-[#f5f1ef] to-[#f0ebe8] border border-[#d0a598]/30 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#8d5641]">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[#8d5641]/70 font-light tracking-wide uppercase text-sm">Banco:</span>
                          <span className="font-medium">BBVA</span>
                        </div>
                        <div className="w-full h-px bg-[#d0a598]/30"></div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[#8d5641]/70 font-light tracking-wide uppercase text-sm">Cuenta:</span>
                          <span className="font-medium font-mono">1234 5678 9012 3456</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[#8d5641]/70 font-light tracking-wide uppercase text-sm">CLABE:</span>
                          <span className="font-medium font-mono">012345678901234567</span>
                        </div>
                        <div className="w-full h-px bg-[#d0a598]/30"></div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[#8d5641]/70 font-light tracking-wide uppercase text-sm">Titular:</span>
                          <span className="font-medium">Andrea & Aldo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant closing message */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-6 px-10 py-6 bg-white/40 backdrop-blur border border-[#d0a598]/30">
              <FaGem className="text-[#c69684] text-lg" />
              <span className="text-[#8d5641]/80 text-sm font-light tracking-[0.2em] uppercase">
                Con infinito amor y gratitud
              </span>
              <FaGem className="text-[#c69684] text-lg" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-sophisticated {
          box-shadow: 
            0 8px 25px -5px rgba(141, 86, 65, 0.12),
            0 20px 40px -10px rgba(141, 86, 65, 0.08),
            0 0 0 1px rgba(208, 165, 152, 0.15);
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes sophisticated-enter {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.92);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes sophisticated-float {
          0%, 100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(18deg);
          }
        }

        @keyframes sophisticated-float-delay {
          0%, 100% {
            transform: translateY(0px) rotate(-6deg);
          }
          50% {
            transform: translateY(-15px) rotate(-12deg);
          }
        }

        @keyframes drift {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(-30px) translateX(15px) scale(1.08);
          }
          66% {
            transform: translateY(15px) translateX(-20px) scale(0.92);
          }
        }

        @keyframes drift-reverse {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(20px) translateX(-25px) scale(1.05);
          }
          66% {
            transform: translateY(-15px) translateX(20px) scale(0.95);
          }
        }

        @keyframes drift-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) translateX(12px) scale(1.02);
          }
        }

        .animate-sophisticated-enter {
          animation: sophisticated-enter 1.2s ease-out forwards;
        }

        .animate-sophisticated-float {
          animation: sophisticated-float 5s ease-in-out infinite;
        }

        .animate-sophisticated-float-delay {
          animation: sophisticated-float-delay 5.5s ease-in-out infinite 2s;
        }

        .animate-drift {
          animation: drift 12s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 15s ease-in-out infinite 4s;
        }

        .animate-drift-slow {
          animation: drift-slow 18s ease-in-out infinite 8s;
        }
      `}</style>
    </section>
  );
}