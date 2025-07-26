"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, index: number, shape?: string } | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    const centerFirstImageWithPeek = () => {
      if (galleryRef.current) {
        const container = galleryRef.current;
        
        setTimeout(() => {
          // Simplemente scroll a la posición 0 para mostrar la primera imagen
          container.scrollLeft = 0;
          
          setTimeout(() => {
            setCenterIndex(0);
            const event = new Event('scroll');
            container.dispatchEvent(event);
          }, 150);
        }, 300);
      }
    };

    const timer = setTimeout(centerFirstImageWithPeek, 400);
    
    const handleResize = () => {
      setTimeout(centerFirstImageWithPeek, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
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
      id="galeria"
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
            <pattern id="galleryPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#galleryPattern)"/>
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

          
          
          
          
          {/* Main title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.3em] uppercase text-[#5c5c5c] mb-4 garamond-300 relative">
            ¡Nos Casamos!
          </h2>
          {/* Decorative line */}
          <div className="w-80 h-px mx-auto mb-6 bg-[#C4985B] opacity-60"></div>
          
          {/* Description */}
          <p className="text-lg md:text-xl font-light tracking-[0.1em] uppercase mb-4 text-[#8B7355] italic garamond-300 max-w-2xl mx-auto">
Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          
        </div>

        {/* Side decorative elements */}
        <div className="absolute left-8 top-1/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration />
        </div>
        
        <div className="absolute right-8 top-2/3 w-12 h-12 opacity-20 hidden lg:block">
          <FloralDecoration className="transform rotate-180" />
        </div>

        {/* Carousel Container */}
        <div className={`relative transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ perspective: '1500px', transitionDelay: '600ms' }}>
          
          {/* Left Navigation Arrow - Solo visible si no estamos en la primera imagen */}
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
              className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-elegant hover:shadow-elegant-hover hover:scale-110"
              aria-label="Previous photo"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Carousel */}
          <div 
            ref={galleryRef}
            className="flex gap-4 md:gap-8 lg:gap-12 overflow-x-auto scrollbar-hide py-12 -mx-4 md:-mx-8"
            style={{
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 1rem',
              transformStyle: 'preserve-3d',
              paddingLeft: 'calc(50vw - 8rem)', // Mobile: 50vw - 8rem (16rem/2), Desktop se ajusta automáticamente
              paddingRight: 'calc(50vw - 8rem)', 
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

          {/* Right Navigation Arrow - Solo visible si no estamos en la última imagen */}
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
              className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-elegant hover:shadow-elegant-hover hover:scale-110"
              aria-label="Next photo"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Enhanced scroll indicator */}
        <div className={`flex justify-center mt-8 space-x-3 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
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
        <div className={`text-center mt-16 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <p className="text-lg text-stone-600 italic max-w-lg mx-auto garamond-300 leading-relaxed">
            &ldquo;En cada mirada encontramos el infinito, en cada sonrisa, la eternidad&rdquo;
          </p>
          
          {/* Bottom decorative element */}
          <div className="flex justify-center mt-8">
            <div className="w-20 h-20 opacity-30">
              <FloralDecoration />
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