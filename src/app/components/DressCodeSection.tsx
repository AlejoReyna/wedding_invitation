"use client"
import { useEffect, useRef, useState } from 'react';

export default function DressCodeSection() {
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

  // Elegant clothing icons using SVG
  const FormalSuit = () => (
    <svg className="w-12 h-16" viewBox="0 0 48 64" fill="none">
      <path d="M12 8 Q24 4 36 8 L34 20 Q24 16 14 20 Z" fill="#8B7355" opacity="0.8"/>
      <path d="M14 20 L14 50 Q24 52 34 50 L34 20" stroke="#8B7355" strokeWidth="2" fill="#9B8366" opacity="0.6"/>
      <path d="M18 22 L18 48" stroke="#C4985B" strokeWidth="1" opacity="0.7"/>
      <path d="M30 22 L30 48" stroke="#C4985B" strokeWidth="1" opacity="0.7"/>
      <circle cx="20" cy="28" r="1.5" fill="#8B7355"/>
      <circle cx="28" cy="28" r="1.5" fill="#8B7355"/>
    </svg>
  );

  const ElegantDress = () => (
    <svg className="w-12 h-16" viewBox="0 0 48 64" fill="none">
      <path d="M18 8 Q24 6 30 8 L28 18 Q24 16 20 18 Z" fill="#8B7355" opacity="0.8"/>
      <path d="M20 18 Q12 25 8 40 Q12 50 24 52 Q36 50 40 40 Q36 25 28 18" fill="#9B8366" opacity="0.6"/>
      <path d="M20 18 L28 18 Q24 22 24 26" stroke="#C4985B" strokeWidth="1.5" opacity="0.7"/>
      <path d="M16 35 Q24 38 32 35" stroke="#8B7355" strokeWidth="1" opacity="0.6"/>
    </svg>
  );

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
            <pattern id="dressCodePattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#dressCodePattern)"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with elegant styling */}
        <div className={`text-center mb-16 transition-all duration-2000 ease-out ${
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
            CÓDIGO DE VESTIMENTA
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-px mx-auto mb-6 bg-[#C4985B] opacity-60"></div>
          
          {/* Main title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.3em] uppercase text-[#5c5c5c] mb-8 garamond-300 relative">
            Dress Code
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

        {/* Main content */}
        <div className={`text-center transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '600ms' }}>
          
          {/* Clothing icons container */}
          <div className="bg-white overflow-hidden border-l-4 border-stone-200 shadow-elegant hover:shadow-elegant-hover hover:border-stone-400 transition-all duration-700 transform hover:-translate-y-2 max-w-2xl mx-auto">
            
            {/* Content Section */}
            <div className="p-10 md:p-12 text-center relative">
              
              {/* Decorative Element */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-stone-300"></div>
              
              {/* Icons */}
              <div className="flex justify-center items-center space-x-12 mb-10">
                <div className="flex flex-col items-center group">
                  <div className="transform group-hover:scale-110 transition-transform duration-300 mb-3">
                    <FormalSuit />
                  </div>
                  <p className="text-stone-600 text-sm tracking-[0.1em] uppercase font-light">Formal</p>
                </div>
                
                <div className="w-px h-16 bg-stone-300"></div>
                
                <div className="flex flex-col items-center group">
                  <div className="transform group-hover:scale-110 transition-transform duration-300 mb-3">
                    <ElegantDress />
                  </div>
                  <p className="text-stone-600 text-sm tracking-[0.1em] uppercase font-light">Elegante</p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="flex justify-center items-center mb-8">
                <div className="w-8 h-px bg-stone-300"></div>
                <div className="w-2 h-2 border border-stone-300 transform rotate-45 mx-4"></div>
                <div className="w-8 h-px bg-stone-300"></div>
              </div>
              
              {/* Message */}
              <div className="space-y-6">
                <p className="text-stone-800 text-2xl md:text-3xl font-light tracking-wide" style={{fontFamily: 'Georgia, serif'}}>
                  Lo importante es que estés cómodo
                </p>
                
                <p className="text-stone-600 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                  Vístete con elegancia y comodidad para celebrar este día especial junto a nosotros
                </p>
              </div>
              
              {/* Bottom decorative element */}
              <div className="mt-10 flex justify-center">
                <div className="w-16 h-16 opacity-30">
                  <FloralDecoration />
                </div>
              </div>
            </div>
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