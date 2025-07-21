"use client"
import { useEffect, useRef, useState } from 'react';
import { FaGift, FaCreditCard, FaHeart, FaMapMarkerAlt, FaPenFancy, FaQuoteLeft, FaFeatherAlt } from 'react-icons/fa';
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
      className={`min-h-screen w-full bg-[#dfb9b0] py-16 md:py-24 px-4 md:px-8 relative overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 animate-elegant-fade-in' : 'opacity-0'
      }`}
    >
      {/* Elegant background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-radial from-[#cc9b8c]/30 via-[#cc9b8c]/10 to-transparent rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-radial from-[#c37658]/25 via-[#c37658]/8 to-transparent rounded-full blur-3xl animate-gentle-float-delay"></div>
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-gradient-radial from-[#8d5641]/15 via-[#8d5641]/5 to-transparent rounded-full blur-2xl animate-gentle-float-slow"></div>
      </div>

      {/* Decorative border elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cc9b8c] to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cc9b8c] to-transparent opacity-60"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-16 text-[#cc9b8c]/40 animate-elegant-float">
        <FaFeatherAlt className="text-3xl transform rotate-12" />
      </div>
      <div className="absolute bottom-32 left-20 text-[#c37658]/35 animate-elegant-float-reverse">
        <FaHeart className="text-2xl transform -rotate-12" />
      </div>
      <div className="absolute top-1/2 right-1/4 text-[#cc9b8c]/30 animate-elegant-float-delay">
        <FaQuoteLeft className="text-xl transform rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto text-[#8d5641] relative z-10">
        {/* Elegant header section */}
        <div className="text-center mb-16 relative">
         
          
          {/* Elegant divider */}
          {/* 
          <div className="flex items-center justify-center mt-8 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#cc9b8c] to-transparent"></div>
            <div className="mx-6 w-3 h-3 border-2 border-[#cc9b8c] transform rotate-45 bg-[#dfb9b0]"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#cc9b8c] to-transparent"></div>
          </div>
          */}
         
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start max-w-6xl mx-auto">
          
          {/* Left Column - Elegant Message Invitation */}
          <div className="order-1 relative">
            <div className="text-center">
              
              {/* Elegant title */}
              <h3 className="text-4xl md:text-5xl font-light text-[#8d5641] mb-8 tracking-wider">
                <span className="font-serif italic">Déjanos</span>
                <span className="block font-sans font-extralight text-3xl md:text-4xl mt-2 text-[#c37658]">
                  UN MENSAJE
                </span>
              </h3>
              
              {/* Ornamental divider */}
              <div className="flex items-center justify-center mt-8 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#cc9b8c] to-transparent"></div>
            <div className="mx-6 w-3 h-3 border-2 border-[#cc9b8c] transform rotate-45 bg-[#dfb9b0]"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#cc9b8c] to-transparent"></div>
          </div>
              
              {/* Content sections */}
              <div className="space-y-8 mb-12">
                <div className="space-y-6">
                  <p className="text-[#8d5641] text-2xl font-medium tracking-wide leading-relaxed">
                    Escribe desde el corazón
                  </p>
                  <div className="w-12 h-px bg-[#c37658] mx-auto"></div>
                  <p className="text-[#8d5641]/90 text-xl leading-relaxed max-w-lg mx-auto">
                    Tus palabras de amor y buenos deseos serán un tesoro que guardaremos para siempre
                  </p>
                </div>
                
                
              </div>
              
             
            </div>
          </div>

          {/* Right Column - Message Form */}
          <div className="order-2 relative">
            {/* Subtle glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#cc9b8c]/30 via-transparent to-[#c37658]/20 rounded-3xl blur-2xl opacity-60"></div>
            <div className="relative transform hover:scale-[1.02] transition-all duration-500">
              <MessageCard className="shadow-elegant-strong border border-[#cc9b8c]/30" />
            </div>
          </div>
        </div>

        
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 10px 25px -5px rgba(141, 86, 65, 0.15),
            0 20px 50px -5px rgba(141, 86, 65, 0.1),
            0 0 0 1px rgba(204, 155, 140, 0.1);
        }
        
        .shadow-elegant-strong {
          box-shadow: 
            0 15px 35px -5px rgba(141, 86, 65, 0.2),
            0 25px 60px -10px rgba(141, 86, 65, 0.15),
            0 0 0 1px rgba(204, 155, 140, 0.15);
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