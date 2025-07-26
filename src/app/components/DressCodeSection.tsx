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

  // Dress code icon using the provided image
  const DressCodeIcon = () => (
    <img 
      src="/dresscode_icon.png" 
      alt="Dress Code Icon" 
      className="w-32 h-44 object-contain"
    />
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
          <div className="bg-white overflow-hidden border-l-4 border-stone-200 shadow-elegant hover:shadow-elegant-hover hover:border-stone-400 transition-all duration-700 transform hover:-translate-y-2 max-w-2xl mx-auto min-h-[600px] flex items-center">
            
            {/* Content Section */}
            <div className="p-10 md:p-12 text-center relative w-full">
              
              {/* Dress Code Icon */}
              <div className="flex justify-center items-center mb-8 mt-14">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <DressCodeIcon />
                </div>
              </div>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl font-light tracking-wide text-[#5c5c5c] mb-8" style={{fontFamily: 'Georgia, serif'}}>
                Vestimenta formal
              </p>
              
              {/* Message */}
              <div className="space-y-6 text-center">
                <p className="text-stone-800 text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{fontFamily: 'Georgia, serif'}}>
                  Querida familia y amigos, el blanco está reservado para la novia. Les agradecemos elegir otros colores para que ella brille con todo su esplendor.
                </p>
                
                <p className="text-stone-800 text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{fontFamily: 'Georgia, serif'}}>
                  Con mucho amor hemos planeado una celebración íntima. Les pedimos amablemente que este evento sea solo para adultos.
                </p>
                
                <p className="text-stone-800 text-lg md:text-xl font-bold tracking-wide mt-8" style={{fontFamily: 'Georgia, serif'}}>
                  No niños
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