"use client"
import { useEffect, useRef, useState } from 'react';
import { FaGift, FaCreditCard, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import MessageCard from './MessageCard';

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
        threshold: 0.1, // Reducido de 0.4 a 0.1 para mayor sensibilidad
        rootMargin: '50px 0px', // Añadido margen para detectar antes
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
      className={`min-h-screen w-full bg-gradient-to-br from-[#d5b7af]/20 via-[#c59c8e]/10 to-[#b97a5d]/15 py-12 sm:py-16 md:py-24 px-4 md:px-8 relative overflow-hidden transition-opacity duration-800 ease-out ${
        isVisible ? 'opacity-100 animate-push-up' : 'opacity-0'
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#d5b7af]/30 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-br from-[#c59c8e]/25 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-[#b97a5d]/20 to-transparent rounded-full blur-xl"></div>
      
      {/* Floating hearts decoration */}
      <div className="absolute top-16 right-20 text-[#d5b7af]/30 animate-float">
        <FaHeart className="text-2xl" />
      </div>
      <div className="absolute bottom-40 left-16 text-[#c59c8e]/25 animate-float-delayed">
        <FaHeart className="text-xl" />
      </div>

      <div className="max-w-6xl mx-auto text-gray-800 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b97a5d] to-transparent"></div>
            <FaHeart className="text-3xl text-[#b97a5d]" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b97a5d] to-transparent"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-[#707556] mb-6 garamond-300 relative">
            Mensaje & Regalos
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-[#b97a5d] via-[#c59c8e] to-[#d5b7af]"></div>
          </h2>
          
          <p className="text-lg font-light text-[#845845]/80 tracking-wide garamond-300 max-w-2xl mx-auto leading-relaxed">
            Comparte tus buenos deseos y conoce nuestras sugerencias para celebrar juntos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Message Form */}
          <div className="order-1">
            <MessageCard className="transform hover:scale-[1.02] transition-transform duration-300" />
          </div>

          {/* Gift Suggestions */}
          <div className="space-y-8 order-2">
            {/* Quote Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#d5b7af]/20 to-[#c59c8e]/20 rounded-3xl p-8 border border-[#d5b7af]/30 backdrop-blur-sm">
                <div className="text-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                    <FaHeart className="text-[#b97a5d]/60 text-2xl" />
                  </div>
                  <div className="pt-4">
                    <p className="text-base font-light text-[#845845] italic garamond-300 leading-relaxed mb-4">
                      &ldquo;El regalo más valioso es compartir este momento especial con nosotros. 
                      Cualquier contribución será destinada a nuestro nuevo hogar y los sueños que construiremos juntos.&rdquo;
                    </p>
                    <div className="w-12 h-px bg-gradient-to-r from-[#b97a5d] to-[#c59c8e] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gift Info Card */}
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-[#d5b7af]/20 to-[#c59c8e]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#b97a5d]/20 to-[#845845]/20 rounded-full blur-xl"></div>
              
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-[0_20px_50px_rgba(133,88,69,0.15)] border border-[#d5b7af]/30 overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d5b7af]/10 to-transparent rounded-full transform translate-x-6 -translate-y-6"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#b97a5d] to-transparent"></div>
                    <FaGift className="text-2xl text-[#b97a5d]" />
                    <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#b97a5d] to-transparent"></div>
                  </div>
                  
                  <h3 className="text-2xl font-light tracking-[0.15em] text-[#707556] uppercase garamond-300 text-center mb-8 relative">
                    Regalos
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-[#b97a5d] to-[#c59c8e]"></div>
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="text-center">
                      <p className="text-base font-light text-[#845845]/80 garamond-300 leading-relaxed italic">
                        Tu presencia es nuestro mejor regalo. Si deseas hacernos un obsequio, 
                        te sugerimos las siguientes opciones con todo nuestro amor:
                      </p>
                    </div>

                    {/* Option 1: Envelope */}
                    <div className="bg-gradient-to-r from-[#d5b7af]/10 to-[#c59c8e]/10 rounded-2xl p-6 border border-[#d5b7af]/20">
                      <div className="flex items-start gap-4">
                        <div className="bg-white rounded-full p-3 shadow-md">
                          <FaHeart className="text-[#b97a5d] text-lg" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-light text-[#707556] mb-2 garamond-300 uppercase tracking-wide">
                            Sobre tradicional
                          </h4>
                          <p className="text-sm text-[#845845]/70 garamond-300 leading-relaxed">
                            Un sobre con tu contribución será muy apreciado el día de la celebración. 
                            Es la manera más tradicional y especial de acompañarnos.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Transfer */}
                    <div className="bg-gradient-to-r from-[#c59c8e]/10 to-[#b97a5d]/10 rounded-2xl p-6 border border-[#c59c8e]/20">
                      <div className="flex items-start gap-4">
                        <div className="bg-white rounded-full p-3 shadow-md">
                          <FaCreditCard className="text-[#845845] text-lg" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-light text-[#707556] mb-3 garamond-300 uppercase tracking-wide">
                            Transferencia bancaria
                          </h4>
                          <div className="bg-white/60 rounded-xl p-4 space-y-2 text-sm text-[#845845] garamond-300">
                            <div className="flex justify-between">
                              <span className="text-[#707556] font-medium">Banco:</span>
                              <span>BBVA</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#707556] font-medium">Cuenta:</span>
                              <span>1234 5678 9012 3456</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#707556] font-medium">CLABE:</span>
                              <span>012345678901234567</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#707556] font-medium">Titular:</span>
                              <span>Andrea & Aldo</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registry Info */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-[0_15px_40px_rgba(133,88,69,0.1)] border border-[#d5b7af]/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#d5b7af]/10 to-transparent rounded-full transform translate-x-4 -translate-y-4"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <FaMapMarkerAlt className="text-xl text-[#b97a5d]" />
                    <h4 className="text-xl font-light text-[#707556] garamond-300 uppercase tracking-wide">
                      Mesa de regalos
                    </h4>
                  </div>
                  
                  <p className="text-sm text-[#845845]/70 garamond-300 mb-6 text-center">
                    También contamos con mesa de regalos en las siguientes tiendas:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-[#d5b7af]/10 to-transparent rounded-xl p-4 border-l-4 border-[#b97a5d]">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#707556] garamond-300">Liverpool</span>
                        <span className="text-sm text-[#845845] garamond-300">Evento #12345</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#c59c8e]/10 to-transparent rounded-xl p-4 border-l-4 border-[#845845]">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#707556] garamond-300">Palacio de Hierro</span>
                        <span className="text-sm text-[#845845] garamond-300">Evento #67890</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes push-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-push-up {
          animation: push-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
}