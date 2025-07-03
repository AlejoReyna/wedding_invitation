"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function WeddingInvitation() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);
  const [scrollScale, setScrollScale] = useState(0.6);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Improved scroll-based zoom effect with smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate the center point of the element
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      
      // Calculate distance from element center to window center
      const distance = Math.abs(elementCenter - windowCenter);
      const maxDistance = windowHeight;
      
      // Create a smooth easing function (ease-out cubic)
      let progress = 1 - (distance / maxDistance);
      progress = Math.max(0, Math.min(1, progress));
      
      // Apply easing function for more natural movement
      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };
      
      const easedProgress = easeOutCubic(progress);
      
      // Scale from deeper zoom (0.6) to slightly enlarged (1.05)
      const minScale = 0.6;  // Start with more depth
      const maxScale = 1.05; // Less aggressive max scale
      const scale = minScale + (easedProgress * (maxScale - minScale));
      
      setScrollScale(scale);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  const photos = [
    { src: '/p1.JPG', alt: 'Andrea & Aldo - Foto 1' },
    { src: '/p2.JPG', alt: 'Andrea & Aldo - Foto 2' },
  ];

  // Hand-drawn floral SVG pattern
  const FloralPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="floralPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Delicate vine with leaves */}
          <path 
            d="M20,20 Q40,30 60,20 Q80,10 100,25 Q120,40 140,30 Q160,20 180,35" 
            stroke="#8B7355" 
            strokeWidth="0.8" 
            fill="none" 
            opacity="0.6"
          />
          
          {/* Small leaves along the vine */}
          <path d="M45,25 Q50,20 55,25 Q50,30 45,25" fill="#9B8366" opacity="0.4"/>
          <path d="M85,15 Q90,10 95,15 Q90,20 85,15" fill="#A68B5B" opacity="0.5"/>
          <path d="M125,35 Q130,30 135,35 Q130,40 125,35" fill="#8B7355" opacity="0.4"/>
          
          {/* Tiny flowers */}
          <circle cx="70" cy="25" r="2" fill="#C4985B" opacity="0.3"/>
          <circle cx="110" cy="30" r="1.5" fill="#D4A971" opacity="0.4"/>
          
          {/* Another vine going the opposite direction */}
          <path 
            d="M180,180 Q160,170 140,180 Q120,190 100,175 Q80,160 60,170 Q40,180 20,165" 
            stroke="#9B8366" 
            strokeWidth="0.7" 
            fill="none" 
            opacity="0.5"
          />
          
          {/* More small leaves */}
          <path d="M155,175 Q150,170 145,175 Q150,180 155,175" fill="#8B7355" opacity="0.3"/>
          <path d="M115,185 Q110,180 105,185 Q110,190 115,185" fill="#A68B5B" opacity="0.4"/>
          
          {/* Delicate berry clusters */}
          <circle cx="130" cy="175" r="1" fill="#B8956A" opacity="0.4"/>
          <circle cx="132" cy="177" r="0.8" fill="#B8956A" opacity="0.3"/>
          <circle cx="128" cy="177" r="0.8" fill="#B8956A" opacity="0.3"/>
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#floralPattern)"/>
      
      {/* Additional scattered floral elements */}
      <g opacity="0.2">
        {/* Corner flourish top left */}
        <path 
          d="M50,50 Q80,30 110,50 Q140,70 170,50" 
          stroke="#8B7355" 
          strokeWidth="1" 
          fill="none"
        />
        <path d="M60,45 Q70,35 80,45 Q70,55 60,45" fill="#9B8366" opacity="0.6"/>
        <path d="M100,55 Q110,45 120,55 Q110,65 100,55" fill="#A68B5B" opacity="0.5"/>
        
        {/* Corner flourish bottom right */}
        <path 
          d="M650,1150 Q620,1130 590,1150 Q560,1170 530,1150" 
          stroke="#8B7355" 
          strokeWidth="1" 
          fill="none"
        />
        <path d="M640,1145 Q630,1135 620,1145 Q630,1155 640,1145" fill="#9B8366" opacity="0.6"/>
        <path d="M600,1155 Q590,1145 580,1155 Q590,1165 600,1155" fill="#A68B5B" opacity="0.5"/>
        
        {/* Side decorative elements */}
        <path 
          d="M30,400 Q50,380 70,400 Q90,420 110,400 Q130,380 150,400" 
          stroke="#A68B5B" 
          strokeWidth="0.8" 
          fill="none" 
          opacity="0.4"
        />
        
        <path 
          d="M650,800 Q670,780 690,800 Q710,820 730,800 Q750,780 770,800" 
          stroke="#8B7355" 
          strokeWidth="0.8" 
          fill="none" 
          opacity="0.4"
        />
        
        {/* Delicate botanical sprigs */}
        <g transform="translate(100,600) rotate(15)">
          <path d="M0,0 L20,10 L15,25 L5,20 Z" fill="#9B8366" opacity="0.3"/>
          <path d="M20,10 L40,5 L45,20 L25,25 Z" fill="#8B7355" opacity="0.3"/>
          <circle cx="30" cy="15" r="1.5" fill="#C4985B" opacity="0.4"/>
        </g>
        
        <g transform="translate(600,300) rotate(-20)">
          <path d="M0,0 L25,5 L20,20 L-5,15 Z" fill="#A68B5B" opacity="0.3"/>
          <path d="M25,5 L45,0 L50,15 L30,20 Z" fill="#9B8366" opacity="0.3"/>
          <circle cx="35" cy="10" r="1.2" fill="#D4A971" opacity="0.4"/>
        </g>
      </g>
    </svg>
  );

  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-[#F8F6F3] text-center overflow-hidden">
        {/* Floral background pattern */}
        <FloralPattern />
        
        <div className="relative z-10 max-w-sm mx-auto space-y-8">
          
          {/* Date */}
          <div className="space-y-2 mt-18">
            <h2 className="text-2xl font-light text-gray-700 leading-tight garamond-regular">
              Sábado, 18 de Octubre 2025
            </h2>
            <p className="text-[#C4985B] text-xs font-light tracking-[0.2em] uppercase garamond-300">
              TE INVITAMOS A NUESTRA BODA
            </p>
          </div>

          {/* Photo arrangement with improved zoom effect */}
          <div 
            ref={sectionRef}
            className="relative my-4" 
            style={{ height: '450px', width: '100%' }}
          >
            {/* Enhanced decorative floral corner */}
            <div className="absolute -top-8 -left-28 w-20 h-20 opacity-40">
              <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                <path 
                  d="M10,40 Q25,20 40,40 Q55,60 70,40 Q55,20 40,40 Q25,60 10,40" 
                  stroke="#8B7355" 
                  strokeWidth="1.2"
                />
                <path d="M25,35 Q30,25 35,35 Q30,45 25,35" fill="#9B8366" opacity="0.6"/>
                <path d="M45,45 Q50,35 55,45 Q50,55 45,45" fill="#A68B5B" opacity="0.5"/>
                <circle cx="40" cy="40" r="2.5" fill="#C4985B" opacity="0.4"/>
                <circle cx="32" cy="38" r="1" fill="#D4A971" opacity="0.5"/>
                <circle cx="48" cy="42" r="1" fill="#D4A971" opacity="0.5"/>
              </svg>
            </div>

            {/* First photo - rotated left with smooth zoom */}
            <div 
              className="absolute top-0 -left-24 w-84 h-108 cursor-pointer shadow-lg"
              style={{ 
                width: '320px', 
                height: '410px',
                transform: `scale(${scrollScale}) rotate(-12deg)`,
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease'
              }}
              onClick={() => setSelectedImage(photos[0])}
            >
              <div className="w-full h-full bg-white p-4 pt-4 pb-12 rounded-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-84 bg-gray-200 overflow-hidden" style={{ height: '320px' }}>
                  <Image 
                    src={photos[0].src} 
                    alt={photos[0].alt} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Second photo - rotated right with smooth zoom */}
            <div 
              className="absolute top-8 -right-32 w-84 h-108 cursor-pointer shadow-lg z-10"
              style={{ 
                width: '320px', 
                height: '410px',
                transform: `scale(${scrollScale}) rotate(12deg)`,
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease'
              }}
              onClick={() => setSelectedImage(photos[1])}
            >
              <div className="w-full h-full bg-white p-4 pt-4 pb-12 rounded-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-84 bg-gray-200 overflow-hidden" style={{ height: '320px' }}>
                  <Image 
                    src={photos[1].src} 
                    alt={photos[1].alt} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced decorative floral corner bottom right */}
            <div className="absolute -bottom-8 -right-36 w-20 h-20 opacity-40">
              <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                <path 
                  d="M70,40 Q55,20 40,40 Q25,60 10,40 Q25,20 40,40 Q55,60 70,40" 
                  stroke="#8B7355" 
                  strokeWidth="1.2"
                />
                <path d="M55,35 Q50,25 45,35 Q50,45 55,35" fill="#A68B5B" opacity="0.6"/>
                <path d="M35,45 Q30,35 25,45 Q30,55 35,45" fill="#9B8366" opacity="0.5"/>
                <circle cx="40" cy="40" r="2.5" fill="#C4985B" opacity="0.4"/>
                
                {/* Additional small botanical elements */}
                <path d="M15,25 Q20,15 25,25 L20,30 Z" fill="#8B7355" opacity="0.3"/>
                <path d="M55,55 Q60,45 65,55 L60,60 Z" fill="#9B8366" opacity="0.3"/>
              </svg>
            </div>
          </div>

          {/* Romantic text below photos */}
          <div className="pb-4">
            <p className="text-lg font-light text-gray-600 italic garamond-regular leading-relaxed">
              "Dos corazones, una historia,<br />
              un destino que nos une para siempre"
            </p>
            <div className="flex justify-center items-center mt-4">
              <div className="w-12 h-px bg-[#C4985B] opacity-50"></div>
              <div className="mx-3 text-[#C4985B] text-xl">♡</div>
              <div className="w-12 h-px bg-[#C4985B] opacity-50"></div>
            </div>
          </div>

          {/* Event type */}
          <div>
            <p className="text-gray-500 text-base tracking-wide garamond-300">Ceremonia</p>
          </div>

          {/* Time */}
          <div className="space-y-1">
            <p className="text-4xl font-light text-gray-700 garamond-regular">4:00</p>
            <p className="text-lg text-gray-600 garamond-300">PM</p>
          </div>

          {/* Location - Enhanced styling with subtle floral accent */}
          <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-[#C4985B]/20 shadow-sm">
            {/* Subtle floral accent for the location box */}
            <div className="absolute -top-2 -right-2 w-8 h-8 opacity-20">
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                <path d="M8,16 Q16,8 24,16 Q16,24 8,16" stroke="#8B7355" strokeWidth="1"/>
                <circle cx="16" cy="16" r="1.5" fill="#C4985B"/>
              </svg>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#C4985B] mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-[#C4985B] text-sm font-medium tracking-[0.1em] uppercase garamond-300">Ubicación</h3>
              </div>
              <div className="text-gray-600 text-base leading-relaxed garamond-regular space-y-1">
                <p className="font-medium">Simon Bolívar 659</p>
                <p>Del Maestro, 67500</p>
                <p>Montemorelos, N.L.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <div className="relative z-10 max-w-4xl w-full max-h-[90vh]">
            <button 
              className="absolute -top-4 -right-4 z-20 bg-white rounded-full p-3 hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <div className="relative w-full h-[80vh]">
                <Image 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}