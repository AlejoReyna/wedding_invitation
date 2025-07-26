"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, index: number, shape?: string } | null>(null);
  const [centerIndex, setCenterIndex] = useState(() => {
    // Set initial index based on screen size
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 2 : 0;
    }
    return 0;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Secuencia de animación
            // Paso 1: Fade in del texto principal desde la izquierda (inmediato)
            setAnimationStep(1);
            
            // Paso 2: Extensión de la barra (después de 800ms)
            setTimeout(() => setAnimationStep(2), 800);
            
            // Paso 3: Aparición del texto desde la línea hacia arriba (después de 1400ms)
            setTimeout(() => setAnimationStep(3), 1400);
            
            // Paso 4: Resto de elementos (después de 2000ms)
            setTimeout(() => setAnimationStep(4), 2000);
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
  }, [isVisible]);

  const photos = [
    { src: '/carousel/c-1.jpeg', alt: 'Andrea & Aldo - Recuerdo 1' },
    { src: '/carousel/c-2.jpeg', alt: 'Andrea & Aldo - Recuerdo 2' },
    { src: '/carousel/c-3.jpeg', alt: 'Andrea & Aldo - Recuerdo 3' },
    { src: '/carousel/c-4.jpeg', alt: 'Andrea & Aldo - Recuerdo 4' },
    { src: '/carousel/c-5.jpeg', alt: 'Andrea & Aldo - Recuerdo 5' },
    { src: '/carousel/c-6.jpeg', alt: 'Andrea & Aldo - Recuerdo 6' },
    { src: '/carousel/c-7.jpeg', alt: 'Andrea & Aldo - Recuerdo 7' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const container = galleryRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        
        const centerX = scrollLeft + (containerWidth / 2);
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        for (let i = 0; i < photos.length; i++) {
          const cardElement = container.children[i] as HTMLElement;
          if (cardElement) {
            const cardLeft = cardElement.offsetLeft;
            const cardWidth = cardElement.offsetWidth;
            const cardCenter = cardLeft + (cardWidth / 2);
            
            const distance = Math.abs(centerX - cardCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          }
        }
        
        setCenterIndex(closestIndex);
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener('scroll', handleScroll);
      
      const initialCheck = () => {
        setTimeout(handleScroll, 100);
        setTimeout(handleScroll, 500);
        setTimeout(handleScroll, 1000);
      };
      
      initialCheck();
      
      return () => galleryElement.removeEventListener('scroll', handleScroll);
    }
  }, [photos.length]);

  useEffect(() => {
    const centerImageWithPeek = () => {
      if (galleryRef.current) {
        const container = galleryRef.current;
        
        // Check if screen is medium or larger
        const isMediumOrLarger = window.innerWidth >= 768;
        const targetIndex = isMediumOrLarger ? 2 : 0; // Third photo (index 2) for md+, first photo for mobile
        
        // Update center index immediately
        setCenterIndex(targetIndex);
        
        setTimeout(() => {
          // Calculate responsive card dimensions
          const cardWidth = isMediumOrLarger ? 384 : 256; // md:w-96 = 384px, w-64 = 256px
          const gap = isMediumOrLarger ? 32 : 16; // md:gap-8 = 32px, gap-4 = 16px
          const containerWidth = container.clientWidth;
          
          // Calculate scroll position to center the target image
          const scrollPosition = (targetIndex * (cardWidth + gap)) - (containerWidth / 2) + (cardWidth / 2);
          
          // Set scroll position
          container.scrollLeft = Math.max(0, scrollPosition);
          
          // Force a scroll event to ensure everything is in sync
          setTimeout(() => {
            const event = new Event('scroll');
            container.dispatchEvent(event);
          }, 50);
        }, 100);
      }
    };

    // Multiple attempts to ensure proper initialization
    const timer1 = setTimeout(centerImageWithPeek, 100);
    const timer2 = setTimeout(centerImageWithPeek, 500);
    const timer3 = setTimeout(centerImageWithPeek, 1000);
    
    // Handle window resize
    const handleResize = () => {
      centerImageWithPeek();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openModal = (photo: { src: string, alt: string, shape: string }, index: number) => {
    setSelectedImage({ ...photo, index });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const getCardStyle = (index: number, isCenterCard: boolean) => {
    const distance = Math.abs(index - centerIndex);
    
    if (isCenterCard) {
      return {
        transform: 'perspective(1000px) translateZ(80px) scale(1.1)',
        zIndex: 50,
        opacity: 1,
        filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
      };
    }
    
    if (distance === 1) {
      return {
        transform: 'perspective(1000px) translateZ(20px) scale(0.9)',
        zIndex: 40,
        opacity: 0.85,
        filter: 'brightness(0.95) contrast(1)',
      };
    }
    
    if (distance === 2) {
      return {
        transform: 'perspective(1000px) translateZ(-20px) scale(0.8)',
        zIndex: 30,
        opacity: 0.7,
        filter: 'brightness(0.9) contrast(0.95)',
      };
    }
    
    return {
      transform: 'perspective(1000px) translateZ(-60px) scale(0.7)',
      zIndex: 20,
      opacity: 0.5,
      filter: 'brightness(0.8) contrast(0.9)',
    };
  };

  // Enhanced decorative floral elements with rose petal shapes
  const FloralDecoration = ({ className = "", variant = "default" }) => {
    if (variant === "large") {
      return (
        <svg className={`w-full h-full ${className}`} viewBox="0 0 120 120" fill="none">
          {/* Large rose petal shapes */}
          <path 
            d="M60,30 Q45,45 50,65 Q60,70 70,65 Q75,45 60,30 Z" 
            stroke="#8B7355" 
            strokeWidth="1.2"
            fill="none"
            opacity="0.4"
          />
          <path 
            d="M35,50 Q25,65 35,80 Q45,85 55,75 Q60,60 45,50 Q35,50 35,50 Z" 
            stroke="#C4985B" 
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path 
            d="M75,55 Q85,40 95,50 Q100,65 90,75 Q75,80 65,70 Q60,55 75,55 Z" 
            stroke="#9B8366" 
            strokeWidth="1"
            fill="none"
            opacity="0.35"
          />
          <path 
            d="M60,75 Q50,85 60,95 Q70,100 80,90 Q85,75 75,65 Q60,60 60,75 Z" 
            stroke="#D4A971" 
            strokeWidth="0.8"
            fill="none"
            opacity="0.25"
          />
          {/* Center detail */}
          <circle cx="60" cy="60" r="2" stroke="#8B7355" strokeWidth="0.5" fill="none" opacity="0.4"/>
        </svg>
      );
    }
    
    if (variant === "small") {
      return (
        <svg className={`w-full h-full ${className}`} viewBox="0 0 60 60" fill="none">
          {/* Small rose petal */}
          <path 
            d="M30,15 Q20,25 25,35 Q30,40 35,35 Q40,25 30,15 Z" 
            stroke="#8B7355" 
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <path 
            d="M15,35 Q10,45 20,50 Q30,45 25,35 Q15,30 15,35 Z" 
            stroke="#C4985B" 
            strokeWidth="0.6"
            fill="none"
            opacity="0.4"
          />
          <path 
            d="M35,40 Q45,35 45,45 Q40,55 30,50 Q25,40 35,40 Z" 
            stroke="#9B8366" 
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
          />
        </svg>
      );
    }
    
    if (variant === "vine") {
      return (
        <svg className={`w-full h-full ${className}`} viewBox="0 0 200 60" fill="none">
          {/* Rose petals arranged as vine */}
          <path 
            d="M20,30 Q15,20 25,15 Q35,20 30,30 Q25,35 20,30 Z" 
            stroke="#8B7355" 
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />
          <path 
            d="M60,35 Q55,25 65,20 Q75,25 70,35 Q65,40 60,35 Z" 
            stroke="#C4985B" 
            strokeWidth="0.8"
            fill="none"
            opacity="0.35"
          />
          <path 
            d="M100,25 Q95,15 105,10 Q115,15 110,25 Q105,30 100,25 Z" 
            stroke="#9B8366" 
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <path 
            d="M140,40 Q135,30 145,25 Q155,30 150,40 Q145,45 140,40 Z" 
            stroke="#D4A971" 
            strokeWidth="0.8"
            fill="none"
            opacity="0.25"
          />
          <path 
            d="M180,30 Q175,20 185,15 Q195,20 190,30 Q185,35 180,30 Z" 
            stroke="#8B7355" 
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          {/* Connecting stems */}
          <path d="M30,30 Q45,35 60,35" stroke="#8B7355" strokeWidth="0.4" opacity="0.2" fill="none"/>
          <path d="M70,35 Q85,30 100,25" stroke="#8B7355" strokeWidth="0.4" opacity="0.2" fill="none"/>
          <path d="M110,25 Q125,32 140,40" stroke="#8B7355" strokeWidth="0.4" opacity="0.2" fill="none"/>
          <path d="M150,40 Q165,35 180,30" stroke="#8B7355" strokeWidth="0.4" opacity="0.2" fill="none"/>
        </svg>
      );
    }
    
    // Default variant - single rose petal cluster
    return (
      <svg className={`w-full h-full ${className}`} viewBox="0 0 80 80" fill="none">
        {/* Central rose petal */}
        <path 
          d="M40,20 Q30,30 35,45 Q40,50 45,45 Q50,30 40,20 Z" 
          stroke="#8B7355" 
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        {/* Side petals */}
        <path 
          d="M25,35 Q15,45 20,60 Q25,65 35,60 Q40,45 30,35 Q25,30 25,35 Z" 
          stroke="#9B8366" 
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <path 
          d="M55,35 Q65,25 75,35 Q80,50 70,60 Q60,65 50,55 Q45,40 55,35 Z" 
          stroke="#C4985B" 
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        {/* Bottom petal */}
        <path 
          d="M40,55 Q30,65 40,75 Q50,80 60,70 Q65,55 55,45 Q40,40 40,55 Z" 
          stroke="#D4A971" 
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
        {/* Center */}
        <circle cx="40" cy="40" r="1.5" stroke="#8B7355" strokeWidth="0.5" fill="none" opacity="0.4"/>
      </svg>
    );
  };

  return (
    <section 
      id="galeria"
      ref={sectionRef}
      className="min-h-screen w-full py-24 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #fbf9f6 0%, #f8f6f3 35%, #f5f2ee 70%, #f9f7f4 100%)'
      }}
    >
      {/* PNG Flowers Background */}
      <div className="absolute top-0 left-0 w-full h-48 md:h-56 lg:h-64 overflow-hidden z-[5]">
        {/* Flores desde la izquierda con animación */}
        <div 
          className={`absolute top-0 left-0 h-full transition-all duration-1200 ease-out ${
            animationStep >= 1 ? 'opacity-40 translate-x-0' : 'opacity-0 -translate-x-16'
          }`}
          style={{
            backgroundImage: `url('/png_flowers.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top',
            backgroundSize: 'auto 100%',
            width: '60%',
            transitionDelay: animationStep >= 1 ? '200ms' : '0ms'
          }}
        />
      </div>

      {/* Enhanced organic texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[2]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(196, 152, 91, 0.15) 0%, transparent 60%),
                              radial-gradient(circle at 70% 60%, rgba(139, 115, 85, 0.12) 0%, transparent 60%),
                              radial-gradient(circle at 50% 90%, rgba(180, 147, 113, 0.1) 0%, transparent 60%),
                              radial-gradient(circle at 20% 70%, rgba(155, 131, 102, 0.08) 0%, transparent 50%),
                              radial-gradient(circle at 80% 30%, rgba(212, 169, 113, 0.1) 0%, transparent 55%)`
          }}
        />
      </div>

      {/* Enhanced background pattern with rose petal motifs */}
      <div className="absolute inset-0 opacity-25">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="galleryPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              {/* Rose petal shapes in pattern */}
              <path 
                d="M30,20 Q25,30 30,40 Q35,45 40,40 Q45,30 40,20 Q35,15 30,20 Z" 
                stroke="#8B7355" 
                strokeWidth="0.4" 
                fill="none" 
                opacity="0.3"
              />
              <path 
                d="M70,50 Q65,60 70,70 Q75,75 80,70 Q85,60 80,50 Q75,45 70,50 Z" 
                stroke="#C4985B" 
                strokeWidth="0.3" 
                fill="none" 
                opacity="0.25"
              />
              <path 
                d="M90,25 Q85,35 90,45 Q95,50 100,45 Q105,35 100,25 Q95,20 90,25 Z" 
                stroke="#9B8366" 
                strokeWidth="0.3" 
                fill="none" 
                opacity="0.2"
              />
              {/* Small petal accents */}
              <path 
                d="M15,60 Q10,65 15,70 Q20,72 22,68 Q25,62 20,58 Q15,56 15,60 Z" 
                stroke="#D4A971" 
                strokeWidth="0.25" 
                fill="none" 
                opacity="0.18"
              />
              {/* Connecting stems */}
              <path d="M40,35 Q55,45 70,55" stroke="#8B7355" strokeWidth="0.2" opacity="0.15" fill="none"/>
              <path d="M80,60 Q85,40 90,35" stroke="#8B7355" strokeWidth="0.2" opacity="0.15" fill="none"/>
            </pattern>
            
            <pattern id="galleryPatternSecondary" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Smaller rose petals */}
              <path 
                d="M25,25 Q20,30 25,35 Q30,38 35,35 Q40,30 35,25 Q30,22 25,25 Z" 
                stroke="#9B8366" 
                strokeWidth="0.25" 
                fill="none" 
                opacity="0.2"
              />
              <path 
                d="M50,55 Q45,60 50,65 Q55,68 60,65 Q65,60 60,55 Q55,52 50,55 Z" 
                stroke="#C4985B" 
                strokeWidth="0.2" 
                fill="none" 
                opacity="0.15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#galleryPattern)"/>
          <rect width="100%" height="100%" fill="url(#galleryPatternSecondary)" opacity="0.6"/>
        </svg>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large corner decorations */}
        <div className="absolute top-12 left-12 w-24 h-24 opacity-15">
          <FloralDecoration variant="large" className="text-[#8B7355]" />
        </div>
        <div className="absolute top-20 right-16 w-20 h-20 opacity-12">
          <FloralDecoration variant="default" className="transform rotate-45" />
        </div>
        <div className="absolute bottom-24 left-20 w-16 h-16 opacity-18">
          <FloralDecoration variant="small" className="transform -rotate-30" />
        </div>
        <div className="absolute bottom-16 right-12 w-28 h-28 opacity-10">
          <FloralDecoration variant="large" className="transform rotate-180" />
        </div>
        
        {/* Mid-level decorative vines */}
        <div className="absolute top-1/3 left-0 w-48 h-12 opacity-15">
          <FloralDecoration variant="vine" className="transform rotate-12" />
        </div>
        <div className="absolute top-2/3 right-0 w-56 h-12 opacity-12">
          <FloralDecoration variant="vine" className="transform -rotate-12 scale-x-[-1]" />
        </div>
        <div className="absolute top-1/2 left-1/4 w-40 h-10 opacity-8">
          <FloralDecoration variant="vine" className="transform rotate-45" />
        </div>
        
        {/* Small scattered elements */}
        <div className="absolute top-1/4 left-1/3 w-8 h-8 opacity-20">
          <FloralDecoration variant="small" />
        </div>
        <div className="absolute top-3/4 left-2/3 w-10 h-10 opacity-15">
          <FloralDecoration variant="small" className="transform rotate-90" />
        </div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 opacity-12">
          <FloralDecoration variant="default" className="transform rotate-270" />
        </div>
        <div className="absolute top-1/6 left-3/4 w-6 h-6 opacity-25">
          <FloralDecoration variant="small" className="transform -rotate-45" />
        </div>
        <div className="absolute bottom-1/3 left-1/2 w-14 h-14 opacity-10">
          <FloralDecoration variant="default" className="transform rotate-135" />
        </div>
        
        {/* Additional subtle elements for mobile */}
        <div className="absolute top-16 left-1/2 w-8 h-8 opacity-15 md:hidden">
          <FloralDecoration variant="small" />
        </div>
        <div className="absolute bottom-32 right-1/3 w-10 h-10 opacity-12 md:hidden">
          <FloralDecoration variant="small" className="transform rotate-60" />
        </div>
      </div>

      {/* Header and decorative elements with max-width */}
      <div className="max-w-6xl mx-auto relative z-10 px-4 md:px-8">
        {/* Header with elegant styling */}
        <div className="text-center mb-16">
          
          {/* Enhanced decorative top element */}
          <div className={`flex justify-center mb-8 transition-all duration-1000 ease-out ${
            animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative">
              <div className="w-16 h-16 opacity-40">
                <FloralDecoration />
              </div>
              {/* Additional side elements */}
              <div className="absolute -left-12 top-2 w-8 h-8 opacity-20">
                <FloralDecoration variant="small" className="transform rotate-45" />
              </div>
              <div className="absolute -right-12 top-2 w-8 h-8 opacity-20">
                <FloralDecoration variant="small" className="transform -rotate-45" />
              </div>
            </div>
          </div>

          {/* Main title */}
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.3em] uppercase text-[#5c5c5c] mb-2 garamond-300 relative transition-all duration-1000 ease-out ${
            animationStep >= 1 ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            ¡Nos Casamos!
          </h2>
          
          {/* Decorative line with extension animation */}
          <div className="flex justify-center mb-3">
            <div 
              className={`h-px bg-[#C4985B] opacity-60 transition-all duration-1000 ease-out ${
                animationStep >= 2 ? 'w-60' : 'w-0'
              }`}
            ></div>
          </div>
          
          {/* Description with slide up from line animation */}
          <div className="relative overflow-hidden">
            <p className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase mb-4 text-[#8B7355] italic garamond-300 max-w-2xl mx-auto transition-all duration-800 ease-out ${
              animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
             Hoy, mañana y siempre, <br/> elegimos amarnos.
            </p>
          </div>
        </div>

        {/* Enhanced side decorative elements */}
        <div className={`absolute left-8 top-1/3 w-12 h-12 opacity-20 hidden lg:block transition-all duration-1000 ease-out ${
          animationStep >= 4 ? 'opacity-20 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <FloralDecoration />
        </div>
        
        <div className={`absolute right-8 top-2/3 w-12 h-12 opacity-20 hidden lg:block transition-all duration-1000 ease-out ${
          animationStep >= 4 ? 'opacity-20 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <FloralDecoration className="transform rotate-180" />
        </div>
        
        {/* Additional medium decorative elements */}
        <div className={`absolute left-4 top-1/2 w-8 h-8 opacity-15 hidden md:block transition-all duration-1000 ease-out ${
          animationStep >= 4 ? 'opacity-15 translate-x-0' : 'opacity-0 -translate-x-4'
        }`} style={{ transitionDelay: '200ms' }}>
          <FloralDecoration variant="small" className="transform rotate-90" />
        </div>
        
        <div className={`absolute right-4 top-1/4 w-10 h-10 opacity-12 hidden md:block transition-all duration-1000 ease-out ${
          animationStep >= 4 ? 'opacity-12 translate-x-0' : 'opacity-0 translate-x-4'
        }`} style={{ transitionDelay: '400ms' }}>
          <FloralDecoration variant="default" className="transform rotate-270" />
        </div>
        
        <div className={`absolute left-6 bottom-1/4 w-14 h-14 opacity-10 hidden lg:block transition-all duration-1000 ease-out ${
          animationStep >= 4 ? 'opacity-10 translate-x-0' : 'opacity-0 -translate-x-4'
        }`} style={{ transitionDelay: '600ms' }}>
          <FloralDecoration variant="large" className="transform rotate-45" />
        </div>
      </div>

      {/* FULL WIDTH CAROUSEL - Outside of max-width container */}
      <div className={`relative w-screen transition-all duration-1200 ease-out ${
        animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ 
        perspective: '1500px',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
        
        {/* Left Navigation Arrow */}
        {centerIndex > 0 && (
          <button 
            onClick={() => {
              if (galleryRef.current) {
                galleryRef.current.scrollBy({
                  left: -300,
                  behavior: 'smooth'
                });
              }
            }}
            className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-elegant hover:shadow-elegant-hover hover:scale-110"
            aria-label="Previous photo"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Full Width Carousel */}
        <div 
          ref={galleryRef}
          className="flex gap-4 md:gap-8 lg:gap-12 overflow-x-auto scrollbar-hide py-12"
          style={{
            scrollSnapType: 'x mandatory',
            scrollPadding: '0 1rem',
            transformStyle: 'preserve-3d',
            paddingLeft: 'calc(50vw - 12rem)',
            paddingRight: 'calc(50vw - 12rem)',
          }}
        >
          {photos.map((photo, index) => {
            const isCenterCard = index === centerIndex;
            const cardStyle = getCardStyle(index, isCenterCard);
            
            return (
              <div 
                key={index}
                className="flex-shrink-0 w-64 h-80 md:w-96 md:h-[28rem] overflow-hidden transition-all duration-700 ease-out cursor-pointer relative"
                style={{
                  scrollSnapAlign: 'center',
                  ...cardStyle,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => openModal({ ...photo, shape: 'rectangle' }, index)}
              >
                <div className="relative h-full w-full transition-all duration-700 hover:scale-105">
                  {/* Enhanced depth effect for center card */}
                  {isCenterCard && (
                    <>
                      <div className="absolute -inset-8 bg-gradient-to-br from-[#C4985B]/20 via-[#D4C9B8]/15 to-[#8B7355]/20 blur-3xl"></div>
                      <div className="absolute -inset-6 bg-gradient-to-br from-[#C4985B]/15 via-[#F8F6F3]/10 to-[#8B7355]/15 blur-2xl"></div>
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#C4985B]/15 to-[#8B7355]/15 blur-xl"></div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-[#C4985B]/30 via-transparent to-[#8B7355]/30"></div>
                    </>
                  )}
                  
                  {/* Shadow effects for non-center cards */}
                  {!isCenterCard && (
                    <div 
                      className="absolute inset-0 bg-black/5"
                      style={{
                        boxShadow: '0 8px 32px rgba(139, 115, 85, 0.1), 0 4px 16px rgba(139, 115, 85, 0.05)'
                      }}
                    ></div>
                  )}
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden h-full">
                    {isCenterCard && (
                      <div className="absolute -inset-2 bg-gradient-to-br from-stone-800/5 via-transparent to-stone-800/10 shadow-elegant"></div>
                    )}
                    
                    <div className="relative w-full h-full bg-white overflow-hidden shadow-elegant">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-all duration-700"
                        sizes="(max-width: 768px) 18rem, 24rem"
                        priority={index < 3}
                        style={{
                          filter: isCenterCard ? 'brightness(1.05) contrast(1.1) saturate(1.1)' : 'brightness(0.95) contrast(0.98) saturate(0.95)'
                        }}
                      />
                      
                      <div className={`absolute inset-0 transition-all duration-700 ${
                        isCenterCard 
                          ? 'bg-gradient-to-br from-transparent via-transparent to-[#8B7355]/5'
                          : 'bg-gradient-to-br from-stone-800/5 via-transparent to-stone-800/10'
                      }`}></div>
                      
                      {/* Tap indicator for center card */}
                      {isCenterCard && (
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-elegant">
                          <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      )}
                      
                      {isCenterCard && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Navigation Arrow */}
        {centerIndex < photos.length - 1 && (
          <button 
            onClick={() => {
              if (galleryRef.current) {
                galleryRef.current.scrollBy({
                  left: 300,
                  behavior: 'smooth'
                });
              }
            }}
            className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-elegant hover:shadow-elegant-hover hover:scale-110"
            aria-label="Next photo"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Scroll indicator and bottom content with max-width */}
      <div className="max-w-6xl mx-auto relative z-10 px-4 md:px-8">
        {/* Enhanced scroll indicator */}
        <div className={`flex justify-center mt-8 space-x-3 transition-all duration-1000 ease-out ${
          animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '300ms' }}>
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (galleryRef.current) {
                  const card = galleryRef.current.children[index] as HTMLElement;
                  card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                  });
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                index === centerIndex 
                  ? 'w-8 h-3 bg-gradient-to-r from-[#C4985B] to-[#8B7355] shadow-lg' 
                  : 'w-3 h-3 bg-stone-300 hover:bg-[#C4985B]/60'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom quote */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out ${
          animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '600ms' }}>
          <p className="text-lg text-stone-600 italic max-w-lg mx-auto garamond-300 leading-relaxed">
  “ A love like ours could never die, as long as I have you near me ”
  <br />
  <small>
    - A hard day’s night 
  </small>
</p>
          {/* Enhanced bottom decorative element */}
          <div className="flex justify-center mt-8">
            <div className="relative">
              <div className="w-20 h-20 opacity-30">
                <FloralDecoration />
              </div>
              {/* Surrounding vine elements */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 opacity-15">
                <FloralDecoration variant="vine" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-4 opacity-18">
                <FloralDecoration variant="vine" className="transform rotate-180" />
              </div>
              {/* Corner accents */}
              <div className="absolute -left-8 top-0 w-6 h-6 opacity-20">
                <FloralDecoration variant="small" className="transform rotate-45" />
              </div>
              <div className="absolute -right-8 top-0 w-6 h-6 opacity-20">
                <FloralDecoration variant="small" className="transform -rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          <button 
            className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-300 hover:scale-110 shadow-elegant"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <div className="relative max-w-5xl max-h-full rounded-2xl overflow-hidden shadow-elegant">
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      )}

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

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
