"use client"
import ItineraryItemCard from './ItineraryItemCard';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ItineraryItem {
  time: string;
  displayTime: string;
  title: string;
  description: string;
  location?: string;
}

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isNightMode, setIsNightMode } = useTheme();
  
  // Enhanced scroll-based animation state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Define itinerary items first so we can use them in other functions
  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      displayTime: "04:00",
      title: "Ceremonia",
      description: "",
      location: "Iglesia del Sagrado Corazón"
    },
    {
      time: "6:00 PM - 7:00 PM",
      displayTime: "06:00",
      title: "Ceremonia Civil",
      description: "",
      location: "Museo de Montemorelos"
    },
    {
      time: "7:00 PM - 1:00 AM",
      displayTime: "07:00",
      title: "Recepción",
      description: "",
      location: "Salón Terraza, Museo de Montemorelos"
    }
  ];

  // Set up client-side state and window dimensions
  useEffect(() => {
    setIsClient(true);
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);
    
    // Ensure we start in day mode and wait a bit before allowing theme changes
    setIsNightMode(false);
    
    // Allow theme changes after a short delay to prevent immediate activation
    const timer = setTimeout(() => {
      setHasInitialized(true);
    }, 1000);
    
    return () => {
      window.removeEventListener('resize', updateWindowHeight);
      clearTimeout(timer);
    };
  }, [setIsNightMode]);

  // Calculate which specific card we're currently viewing
  const getCurrentCardIndex = useCallback(() => {
    if (!sectionRef.current || !isClient || windowHeight === 0) return -1;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top;
    
    // Calculate based on viewport center position
    const viewportCenter = windowHeight / 2;
    const relativeCenter = viewportCenter - sectionTop;
    
    // Estimate card height and spacing (each card takes roughly 1/3 of section)
    const cardHeight = rect.height / itineraryItems.length;
    const currentIndex = Math.floor(relativeCenter / cardHeight);
    
    return Math.max(0, Math.min(currentIndex, itineraryItems.length - 1));
  }, [isClient, windowHeight, itineraryItems.length]);

  const currentCardIndex = getCurrentCardIndex();

  // Calculate scroll progress for content transitions only
  const updateScrollProgress = useCallback(() => {
    if (!sectionRef.current || !isClient || windowHeight === 0) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate how much of the section has been scrolled through
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    
    let progress = 0;
    
    if (sectionTop <= 0 && sectionBottom >= windowHeight) {
      // Section is larger than viewport and we're scrolling through it
      const scrolledDistance = Math.abs(sectionTop);
      const totalScrollableDistance = sectionHeight - windowHeight;
      progress = Math.min(scrolledDistance / totalScrollableDistance, 1);
    } else if (sectionTop <= windowHeight && sectionBottom >= 0) {
      // Section is partially visible
      const visibleHeight = Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0);
      progress = visibleHeight / windowHeight;
    }
    
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Check if section is significantly visible AND user is actively scrolling within it
    const isVisible = (
      sectionTop <= windowHeight * 0.3 && // Section header is well into viewport
      sectionBottom >= windowHeight * 0.7 && // Section extends well below viewport
      clampedProgress > 0.2 // User has scrolled significantly into the section content
    );
    
    // DEBUGGING LOGS
    console.log('=== ITINERARY SCROLL DEBUG ===');
    console.log('windowHeight:', windowHeight);
    console.log('sectionHeight:', sectionHeight);
    console.log('sectionTop:', sectionTop);
    console.log('sectionBottom:', sectionBottom);
    console.log('clampedProgress:', clampedProgress);
    console.log('currentCardIndex:', currentCardIndex);
    console.log('current card:', itineraryItems[currentCardIndex]?.title || 'none');
    console.log('isVisible conditions:');
    console.log('  - sectionTop <= windowHeight * 0.3:', sectionTop <= windowHeight * 0.3, '(', sectionTop, '<=', windowHeight * 0.3, ')');
    console.log('  - sectionBottom >= windowHeight * 0.7:', sectionBottom >= windowHeight * 0.7, '(', sectionBottom, '>=', windowHeight * 0.7, ')');
    console.log('  - clampedProgress > 0.2:', clampedProgress > 0.2);
    console.log('isVisible result:', isVisible);
    console.log('==============================');
    
    setIsSectionVisible(isVisible);
    setScrollProgress(clampedProgress);
    
  }, [isClient, windowHeight, currentCardIndex, itineraryItems]);

  // Update night mode based on current card - activate when reaching "Recepción" card
  useEffect(() => {
    // DEBUGGING LOGS FOR NIGHT MODE
    console.log('=== NIGHT MODE DEBUG ===');
    console.log('hasInitialized:', hasInitialized);
    console.log('isSectionVisible:', isSectionVisible);
    console.log('currentCardIndex:', currentCardIndex);
    console.log('current card title:', itineraryItems[currentCardIndex]?.title || 'none');
    console.log('scrollProgress:', scrollProgress);
    console.log('current isNightMode:', isNightMode);
    
    if (!hasInitialized) {
      console.log('NIGHT MODE: Not initialized yet, skipping');
      return;
    }
    
    if (!isSectionVisible) {
      console.log('NIGHT MODE: Section not visible, setting to day mode');
      setIsNightMode(false);
      return;
    }
    
    // Check if we're currently viewing the "Recepción" card (index 2)
    const currentCard = itineraryItems[currentCardIndex];
    const isReceptionCard = currentCard?.title === 'Recepción';
    
    console.log('NIGHT MODE: isReceptionCard:', isReceptionCard, 'for card:', currentCard?.title);
    
    if (isReceptionCard !== isNightMode) {
      console.log('NIGHT MODE: Changing mode from', isNightMode, 'to', isReceptionCard);
      setIsNightMode(isReceptionCard);
    } else {
      console.log('NIGHT MODE: No change needed, staying', isNightMode);
    }
    console.log('========================');
  }, [currentCardIndex, setIsNightMode, isSectionVisible, hasInitialized, isNightMode, itineraryItems, scrollProgress]);

  // Listen to normal page scroll
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress, isClient]);

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

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen w-full py-24 px-4 md:px-8 relative overflow-hidden transition-all duration-1000 ease-in-out ${
        isNightMode ? 'bg-[#1a1a1a]' : ''
      }`}
      style={{ 
        background: isNightMode ? '#1a1a1a' : 'linear-gradient(135deg, #fbf9f6 0%, #f8f6f3 35%, #f5f2ee 70%, #f9f7f4 100%)'
      }}
    >
      {/* Celestial Elements */}
      {/* Sol que aparece durante el día */}
      <div 
        className={`absolute celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`} 
        style={{ 
          zIndex: 1,
          top: '20%',
          right: '10%'
        }}
      >
        <div className="relative animate-fade-celestial">
          <div className="w-32 h-32 bg-[#d4c4b0] rounded-full opacity-80 relative">
            <div className="absolute inset-0 animate-sun-rotate">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 rotate-180">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 -rotate-90">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 rotate-90">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-60"></div>
              </div>
              <div className="absolute top-2 right-2 transform rotate-45">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute top-2 left-2 transform -rotate-45">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute bottom-2 right-2 transform rotate-135">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
              <div className="absolute bottom-2 left-2 transform -rotate-135">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-[#d4c4b0] opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luna que aparece cuando es modo nocturno */}
      <div 
        className={`absolute celestial-transition animate-celestial-float ${
          isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} 
        style={{ 
          zIndex: 1, 
          animationDelay: '2s',
          top: '30%',
          left: '10%'
        }}
      >
        <div className="relative animate-fade-celestial">
          <div className="w-24 h-24 bg-white opacity-70 rounded-full relative overflow-hidden">
            <div className="absolute top-3 left-5 w-2 h-2 bg-gray-300 rounded-full opacity-40"></div>
            <div className="absolute top-6 right-3 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-30"></div>
            <div className="absolute bottom-4 left-3 w-1 h-1 bg-gray-300 rounded-full opacity-35"></div>
            <div className="absolute bottom-3 right-4 w-3 h-3 bg-gray-300 rounded-full opacity-25"></div>
            <div className="absolute top-4 left-2 w-1 h-1 bg-gray-300 rounded-full opacity-30"></div>
          </div>
          <div className="absolute -top-1 -left-1 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1 right-6 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
          <div className="absolute top-6 -right-2 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
          <div className="absolute bottom-2 left-8 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className={`absolute top-20 right-10 w-24 h-24 border rounded-full ${
          isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
        }`}></div>
        <div className={`absolute bottom-32 left-8 w-16 h-16 border rounded-full ${
          isNightMode ? 'border-white/20' : 'border-[#d4c4b0]/20'
        }`}></div>
      </div>

      {/* Subtle organic texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ zIndex: 3 }}>
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
      <div className="absolute inset-0 opacity-20" style={{ zIndex: 3 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="itineraryPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#itineraryPattern)"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Header with elegant styling */}
        <div className="text-center mb-20 transition-all duration-2000 ease-out opacity-100 translate-y-0" style={{ transitionDelay: '200ms' }}>
          
          {/* Decorative top element */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 opacity-40">
              <FloralDecoration />
            </div>
          </div>

        
          
          {/* Main title replaced with 'Itinerario del Día', color from subtitle, font size from Cronograma */}
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.1em] uppercase mb-8 garamond-300 relative transition-colors duration-500 ${
            isNightMode ? 'text-white' : 'text-[#8B7355]'
          }`}>
            Itinerario 
          </h2>
          {/* Decorative line below the main title */}
          <div className={`w-24 h-px mx-auto mb-6 transition-colors duration-500 ${
            isNightMode ? 'bg-white/60' : 'bg-[#C4985B]'
          } opacity-60`}></div>
        </div>

        {/* Side decorative elements */}
        <div className="absolute left-8 top-1/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration />
        </div>
        
        <div className="absolute right-8 top-2/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration className="transform rotate-180" />
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px transition-all duration-500 opacity-60 ${
            isNightMode ? 'bg-gradient-to-b from-white/60 via-white/40 to-white/60' : 'bg-gradient-to-b from-[#C4985B] via-[#8B7355] to-[#C4985B]'
          }`}></div>

          {/* Events */}
          <div className="space-y-24 md:space-y-32">
            {itineraryItems.map((item, index) => (
              <ItineraryItemCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className={`flex justify-center mt-16 transition-all duration-2000 ease-out opacity-100 translate-y-0`} style={{ transitionDelay: '1200ms' }}>
          <div className="w-20 h-20 opacity-30">
            <FloralDecoration />
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

        .celestial-transition {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes celestial-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          50% { transform: translateY(-12px) rotate(0deg); }
          75% { transform: translateY(-6px) rotate(-1deg); }
        }

        @keyframes fade-celestial {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes sun-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-celestial-float {
          animation: celestial-float 6s ease-in-out infinite;
        }

        .animate-fade-celestial {
          animation: fade-celestial 4s ease-in-out infinite;
        }

        .animate-sun-rotate {
          animation: sun-rotate 20s linear infinite;
        }
      `}</style>
    </section>
  );
}