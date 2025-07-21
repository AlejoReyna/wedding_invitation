"use client"
import { useEffect, useRef, useState } from 'react';
import { FaGift, FaCreditCard, FaHeart, FaMapMarkerAlt, FaGem, FaHandHoldingHeart } from 'react-icons/fa';

// Componente GiftCard premium
function GiftCard({ icon: Icon, title, subtitle, content, details, accentColor = "#8a6a5a", className = "" }) {
  return (
    <div className={`bg-white/95 backdrop-blur-lg border-[#8a6a5a]/30 p-10 ${className}`}>
      {/* Header premium con líneas decorativas */}
      <div className="text-center mb-8 relative">
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-[#8a6a5a]"></div>
        
        <div className="pt-6">
          <div className="w-16 h-16 mx-auto mb-4" style={{ backgroundColor: accentColor }}>
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-3xl font-light text-[#4a2a1a] mb-3 tracking-wider">{title}</h3>
          <p className="text-[#6a4a3a] text-base font-medium">{subtitle}</p>
        </div>
        
        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-[#8a6a5a]"></div>
      </div>
      
      <div className="space-y-6">
        <p className="text-[#4a2a1a] text-lg leading-relaxed font-medium text-center">
          {content}
        </p>
        
        {details && (
          <div className="bg-gradient-to-r from-[#f5f1ef] to-[#f0ebe8] border border-[#8a6a5a]/30 p-6">
            <div className="space-y-4 text-[#4a2a1a]">
              {details.map((detail, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-[#4a2a1a]/70 font-light tracking-wide uppercase text-sm">{detail.label}:</span>
                  <span className="font-medium font-mono">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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

  const bankDetails = [
    { label: "Banco", value: "BBVA" },
    { label: "Cuenta", value: "1234 5678 9012 3456" },
    { label: "CLABE", value: "012345678901234567" },
    { label: "Titular", value: "Andrea & Aldo" }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen w-full relative overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 animate-elegant-fade-in' : 'opacity-0'
      }`}
      style={{
        backgroundColor: '#e4c2b9' // Color sólido mezclado sin degradados
      }}
    >
      {/* Elegant background patterns */}
      <div className="absolute inset-0 opacity-12">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#d0a598]/20 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-[#c69684]/15 rounded-full blur-3xl animate-gentle-float-delay"></div>
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-[#9a6b59]/10 rounded-full blur-2xl animate-gentle-float-slow"></div>
        <div className="absolute top-1/6 right-1/3 w-72 h-72 bg-[#dfb9b0]/18 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-1/6 left-1/3 w-88 h-88 bg-[#d9b0a6]/12 rounded-full blur-3xl animate-gentle-float-delay"></div>
      </div>

      {/* Decorative border elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d0a598] to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d0a598] to-transparent opacity-70"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-16 text-[#c69684]/50 animate-elegant-float">
        <FaGem className="text-4xl transform rotate-12" />
      </div>
      <div className="absolute bottom-32 left-20 text-[#9a6b59]/45 animate-elegant-float-reverse">
        <FaHandHoldingHeart className="text-3xl transform -rotate-12" />
      </div>
      <div className="absolute top-1/2 right-1/4 text-[#d0a598]/40 animate-elegant-float-delay">
        <FaHeart className="text-2xl transform rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto text-[#8d5641] relative z-10 py-16 md:py-24 px-4 md:px-8">
        {/* Main content grid - Invertida: Cards izquierda, Texto derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto min-h-[70vh]">
          
          {/* Left Column - Gift Cards */}
          <div className="order-2 lg:order-1 space-y-8">
            
            {/* Traditional envelope - Tarjeta premium */}
            <div className="relative transform hover:scale-[1.01] transition-all duration-700 ease-out">
              {/* Subtle glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#d0a598]/30 via-[#c69684]/20 to-[#8d5641]/25 blur-2xl opacity-60"></div>
              <div className="relative">
                <GiftCard
                  icon={FaHeart}
                  title="Sobre"
                  subtitle="Tradicional"
                  content="Un sobre con tu contribución será recibido con profundo agradecimiento el día de nuestra celebración. Es la forma más tradicional y querida de acompañarnos."
                  accentColor="#d0a598"
                  className="shadow-premium border-[#d0a598]/40 backdrop-blur-xl"
                />
              </div>
            </div>

            {/* Bank transfer - Tarjeta premium */}
            <div className="relative transform hover:scale-[1.01] transition-all duration-700 ease-out">
              {/* Subtle glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#c69684]/30 via-[#b8856f]/20 to-[#8d5641]/25 blur-2xl opacity-60"></div>
              <div className="relative">
                <GiftCard
                  icon={FaCreditCard}
                  title="Transferencia"
                  subtitle="Bancaria"
                  content="Para tu comodidad, puedes realizar una transferencia bancaria directa a nuestra cuenta."
                  details={bankDetails}
                  accentColor="#c69684"
                  className="shadow-premium border-[#c69684]/40 backdrop-blur-xl"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Elegant Gift Message - Centrado Verticalmente */}
          <div className="order-1 lg:order-2 relative flex flex-col justify-center h-full">
            <div className="text-center">
              
              {/* Elegant title con tipografía mejorada */}
              <h2 className="text-5xl md:text-7xl font-light text-[#8d5641] mb-8 tracking-wider leading-tight">
                <span className="font-serif italic font-medium">Tu presencia</span>
                <span className="block font-sans font-light text-4xl md:text-6xl mt-4 text-[#b8856f]">
                  ES NUESTRO TESORO
                </span>
              </h2>
              
              {/* Ornamental divider */}
              <div className="flex items-center justify-center mt-10 mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c69684] to-transparent"></div>
                <div className="mx-8 w-4 h-4 border-2 border-[#c69684] transform rotate-45 bg-gradient-to-br from-[#e4c2b9] to-[#d0a598]"></div>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c69684] to-transparent"></div>
              </div>
              
              {/* Content sections con mejor contraste */}
              <div className="space-y-10 mb-12">
                <div className="space-y-6">
                  <p className="text-[#8d5641] text-3xl md:text-4xl font-semibold tracking-wide leading-relaxed">
                    Más preciado
                  </p>
                  <div className="w-16 h-px bg-[#b8856f] mx-auto"></div>
                  <p className="text-[#8d5641]/90 text-xl md:text-2xl leading-relaxed max-w-lg mx-auto font-medium">
                    Si deseas honrarnos con un obsequio, te ofrecemos estas opciones con profunda gratitud
                  </p>
                </div>
              </div>

              {/* Elegant closing message */}
              <div className="mt-16">
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
        </div>
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 15px 35px -5px rgba(141, 86, 65, 0.25),
            0 25px 60px -5px rgba(141, 86, 65, 0.15),
            0 0 0 1px rgba(208, 165, 152, 0.2);
        }
        
        .shadow-elegant-strong {
          box-shadow: 
            0 20px 45px -5px rgba(141, 86, 65, 0.3),
            0 35px 80px -10px rgba(141, 86, 65, 0.2),
            0 0 0 1px rgba(208, 165, 152, 0.25);
        }

        .shadow-premium {
          box-shadow: 
            0 25px 50px -12px rgba(141, 86, 65, 0.4),
            0 40px 100px -15px rgba(141, 86, 65, 0.3),
            0 0 0 1px rgba(208, 165, 152, 0.3),
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