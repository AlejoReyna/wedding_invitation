"use client"
import { useEffect, useRef, useState } from 'react';
import { FaCreditCard, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

// Componente GiftCard premium
interface GiftCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  content: string;
  details?: Array<{ label: string; value: string }>;
  className?: string;
}

function GiftCard({ icon: Icon, title, subtitle, content, details, className = "" }: GiftCardProps) {
  return (
    <div className={`overflow-hidden rounded-lg transition-all duration-700 transform hover:-translate-y-2 hover:scale-[1.01] group relative border border-[#d4c4b0]/40 h-full ${className}`}
         style={{ 
           // Fondo base con color de cartón
           backgroundColor: '#f0ebe5',
           // Textura de cartón de huevo con múltiples gradientes radiales
           backgroundImage: `
             radial-gradient(circle at 8% 15%, rgba(180,147,113,0.3) 1px, transparent 3px),
             radial-gradient(circle at 23% 8%, rgba(139,115,85,0.25) 1px, transparent 4px),
             radial-gradient(circle at 41% 22%, rgba(196,152,91,0.2) 1px, transparent 3px),
             radial-gradient(circle at 67% 12%, rgba(155,131,102,0.28) 1px, transparent 4px),
             radial-gradient(circle at 84% 25%, rgba(180,147,113,0.22) 1px, transparent 3px),
             radial-gradient(circle at 15% 45%, rgba(139,115,85,0.26) 1px, transparent 4px),
             radial-gradient(circle at 38% 58%, rgba(196,152,91,0.24) 1px, transparent 3px),
             radial-gradient(circle at 62% 41%, rgba(155,131,102,0.27) 1px, transparent 4px),
             radial-gradient(circle at 78% 63%, rgba(180,147,113,0.21) 1px, transparent 3px),
             radial-gradient(circle at 92% 48%, rgba(139,115,85,0.25) 1px, transparent 4px),
             radial-gradient(circle at 12% 78%, rgba(196,152,91,0.23) 1px, transparent 3px),
             radial-gradient(circle at 34% 85%, rgba(155,131,102,0.29) 1px, transparent 4px),
             radial-gradient(circle at 56% 72%, rgba(180,147,113,0.24) 1px, transparent 3px),
             radial-gradient(circle at 74% 89%, rgba(139,115,85,0.26) 1px, transparent 4px),
             radial-gradient(circle at 89% 76%, rgba(196,152,91,0.22) 1px, transparent 3px),
             linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(139,115,85,0.05) 100%)
           `,
           // Box shadow para profundidad de cartón de huevo
           boxShadow: `
             inset 2px 2px 4px rgba(139,115,85,0.15),
             inset -1px -1px 3px rgba(255,255,255,0.4),
             0 4px 8px rgba(139,115,85,0.12),
             0 1px 2px rgba(139,115,85,0.08)
           `
         }}>
      
      {/* Overlay sutil para mejorar legibilidad del texto sobre cartón */}
      <div className="absolute inset-0 rounded-lg bg-white/30" style={{
        // Textura adicional de fibra de cartón
        backgroundImage: `
          linear-gradient(45deg, transparent 48%, rgba(139,115,85,0.03) 49%, rgba(139,115,85,0.03) 51%, transparent 52%),
          linear-gradient(-45deg, transparent 48%, rgba(196,152,91,0.02) 49%, rgba(196,152,91,0.02) 51%, transparent 52%)
        `,
        backgroundSize: '3px 3px, 4px 4px'
      }}></div>

      {/* Content Section */}
      <div className="p-8 md:p-10 text-center relative h-full flex flex-col justify-between z-10">
        
        {/* Top section with icon and title */}
        <div className="flex-grow">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-md shadow-lg inline-flex items-center justify-center" style={{
            backgroundColor: '#e8ddd1',
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(180,147,113,0.4) 1px, transparent 3px),
              radial-gradient(circle at 70% 20%, rgba(139,115,85,0.3) 1px, transparent 3px),
              radial-gradient(circle at 20% 70%, rgba(196,152,91,0.25) 1px, transparent 3px),
              radial-gradient(circle at 80% 80%, rgba(155,131,102,0.35) 1px, transparent 3px)
            `,
            boxShadow: `
              inset 1px 1px 3px rgba(139,115,85,0.2),
              inset -1px -1px 2px rgba(255,255,255,0.5),
              0 2px 4px rgba(139,115,85,0.15)
            `
          }}>
            <Icon className="text-[#5a4a3a] text-xl" />
          </div>
          
          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-light text-[#2c2826] mb-3 tracking-[0.15em] uppercase" 
              style={{
                fontFamily: 'Playfair Display, serif',
                textShadow: '0 1px 3px rgba(255,255,255,0.8)'
              }}>
            {title}
          </h3>
          
          {/* Subtitle */}
          <p className="text-[#5a4a3a]/80 text-sm font-light tracking-[0.15em] uppercase mb-6"
             style={{
               textShadow: '0 1px 2px rgba(255,255,255,0.8)'
             }}>
            {subtitle}
          </p>
          
          {/* Content */}
          <p className="text-[#5a4f45] text-base leading-relaxed mb-6"
             style={{
               fontFamily: 'Inter, sans-serif',
               textShadow: '0 1px 2px rgba(255,255,255,0.6)'
             }}>
            {content}
          </p>
        </div>
        
        {/* Bottom section with details */}
        {details && (
          <div className="rounded-lg p-6 shadow-inner" style={{
            backgroundColor: '#f5f0e8',
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(180,147,113,0.2) 1px, transparent 3px),
              radial-gradient(circle at 75% 75%, rgba(139,115,85,0.15) 1px, transparent 3px)
            `,
            boxShadow: `
              inset 1px 1px 3px rgba(139,115,85,0.2),
              inset -1px -1px 2px rgba(255,255,255,0.6)
            `,
            border: '1px solid rgba(212, 196, 176, 0.3)'
          }}>
            <div className="space-y-3">
              {details.map((detail: { label: string; value: string }, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-[#5a4a3a]/80 font-medium tracking-[0.1em] uppercase text-xs"
                        style={{
                          textShadow: '0 1px 1px rgba(255,255,255,0.7)'
                        }}>
                    {detail.label}:
                  </span>
                  <span className="font-semibold font-mono text-[#2c2826] text-sm"
                        style={{
                          textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                        }}>
                    {detail.value}
                  </span>
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

  const bankDetails = [
    { label: "Banco", value: "BBVA" },
    { label: "CLABE", value: "012 180 01571801772 5" },
    { label: "Tarjeta", value: "4152 3143 6348 6377" },
    { label: "Titular", value: "Aldo Berlanga Mendoza" }
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
            <pattern id="giftPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#giftPattern)"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with elegant styling */}
        <div className={`text-center mb-20 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} style={{ transitionDelay: '200ms' }}>
          
          {/* Gift asset */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 opacity-50">
              <Image
                src="/assets/gift_asset.png"
                alt="Gift icon"
                width={160}
                height={160}
                className="object-contain w-full h-full"
                style={{
                  filter: 'sepia(40%) saturate(80%) hue-rotate(5deg) brightness(1.1)'
                }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs md:text-sm font-light tracking-[0.4em] uppercase mb-6 text-[#8B7355] italic garamond-300">
            SI DESEAS OBSEQUIARNOS
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-px mx-auto mb-6 bg-[#C4985B] opacity-60"></div>
          
          {/* Main title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.3em] uppercase text-[#5c5c5c] mb-8 garamond-300 relative">
            Regalos
          </h2>
          
          {/* Message */}
          <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-8 font-light mb-8">
            Tu presencia es nuestro regalo más preciado. Si deseas honrarnos con un obsequio, te ofrecemos estas opciones con profunda gratitud.
          </p>
          
        </div>

        {/* Side decorative elements */}
        <div className="absolute left-8 top-1/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration />
        </div>
        
        <div className="absolute right-8 top-2/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration className="transform rotate-180" />
        </div>

        {/* Gift Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-20 max-w-[1200px] mx-auto items-stretch">
          
          {/* Envelope Card */}
          <div className={`group transition-all duration-2500 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0 md:translate-x-4' 
              : 'opacity-0 translate-y-8 translate-x-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <GiftCard
              icon={FaEnvelope}
              title="Sobre"
              subtitle="Tradicional"
              content="Un sobre con tu contribución será recibido con profundo agradecimiento el día de nuestra celebración. Es la forma más tradicional y querida de acompañarnos."
            />
          </div>

          {/* Bank Transfer Card */}
          <div className={`group transition-all duration-2500 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0 md:-translate-x-4' 
              : 'opacity-0 translate-y-8 translate-x-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <GiftCard
              icon={FaCreditCard}
              title="Transferencia"
              subtitle="Bancaria"
              content="Puedes realizar una transferencia bancaria directa a nuestra cuenta."
              details={bankDetails}
            />
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