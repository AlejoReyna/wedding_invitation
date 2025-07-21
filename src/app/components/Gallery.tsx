"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, index: number, shape?: string } | null>(null);
  const [centerIndex, setCenterIndex] = useState(1);
  const galleryRef = useRef<HTMLDivElement>(null);

  const photos = [
    { src: '/p1.JPG', alt: 'Andrea & Aldo - Momento especial 1' },
    { src: '/p2.JPG', alt: 'Andrea & Aldo - Momento especial 2' },
    { src: '/p3.JPG', alt: 'Andrea & Aldo - Momento especial 3' },
    { src: '/p4.JPG', alt: 'Andrea & Aldo - Momento especial 4' },
    { src: '/p5.JPG', alt: 'Andrea & Aldo - Momento especial 5' },
    { src: '/p6.JPG', alt: 'Andrea & Aldo - Momento especial 6' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const container = galleryRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        
        // Mejorada detección del centro con ajuste para móvil
        const centerX = scrollLeft + (containerWidth / 2);
        
        let closestIndex = 1; // Default to second photo
        let closestDistance = Infinity;
        
        // Calcular posición de cada carta y encontrar la más cercana al centro
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
      
      // Ejecutar una vez al montar y luego periódicamente para asegurar el centrado
      const initialCheck = () => {
        setTimeout(handleScroll, 100);
        setTimeout(handleScroll, 500);
        setTimeout(handleScroll, 1000);
      };
      
      initialCheck();
      
      return () => galleryElement.removeEventListener('scroll', handleScroll);
    }
  }, [photos.length]);

  // Center the SECOND image (index 1) with proper positioning
  useEffect(() => {
    const centerSecondImageWithPeek = () => {
      if (galleryRef.current) {
        const container = galleryRef.current;
        const containerWidth = container.clientWidth;
        
        // Esperar a que las cartas se rendericen
        setTimeout(() => {
          const secondCard = container.children[1] as HTMLElement;
          if (secondCard) {
            const cardLeft = secondCard.offsetLeft;
            const cardWidth = secondCard.offsetWidth;
            const cardCenter = cardLeft + (cardWidth / 2);
            
            // Ajuste específico para móvil
            const isMobile = window.innerWidth < 768;
            const offsetAdjustment = isMobile ? 0 : 0; // Sin ajuste adicional
            
            const scrollPosition = cardCenter - (containerWidth / 2) + offsetAdjustment;
            
            container.scrollLeft = Math.max(0, scrollPosition);
            
            // Update centerIndex after positioning
            setTimeout(() => {
              setCenterIndex(1);
              const event = new Event('scroll');
              container.dispatchEvent(event);
            }, 150);
          }
        }, 300);
      }
    };

    // Add a delay to ensure the component is fully rendered
    const timer = setTimeout(centerSecondImageWithPeek, 400);
    
    // También ejecutar en resize para mantener el centrado
    const handleResize = () => {
      setTimeout(centerSecondImageWithPeek, 200);
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
      // Cartas adyacentes: menor escala y profundidad media
      return {
        transform: 'perspective(1000px) translateZ(20px) scale(0.9)',
        zIndex: 40,
        opacity: 0.85,
        filter: 'brightness(0.95) contrast(1)',
      };
    }
    
    if (distance === 2) {
      // Cartas más lejanas: menor escala y menos profundidad
      return {
        transform: 'perspective(1000px) translateZ(-20px) scale(0.8)',
        zIndex: 30,
        opacity: 0.7,
        filter: 'brightness(0.9) contrast(0.95)',
      };
    }
    
    // Cartas muy lejanas: máximo alejamiento
    return {
      transform: 'perspective(1000px) translateZ(-60px) scale(0.7)',
      zIndex: 20,
      opacity: 0.5,
      filter: 'brightness(0.8) contrast(0.9)',
    };
  };

  const FloralDivider = () => (
    <div className="flex items-center justify-center my-8">
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C4985B] to-transparent"></div>
      <div className="mx-4 text-[#C4985B] text-2xl animate-pulse">❀</div>
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C4985B] to-transparent"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F7F3E9] via-[#F4F1E8] to-[#F0EBDD] py-16 px-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center overflow-hidden">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] mb-6 relative inline-block">
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block animate-reveal-from-left">¡ Nos casamos !</span>
              <span className="absolute left-0 top-0 w-full h-full bg-[#F7F3E9] animate-slide-right origin-left"></span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Algunos momentos especiales juntos
          </p>
          <FloralDivider />
        </div>

        {/* Carousel Container */}
        <div className="relative" style={{ perspective: '1500px' }}>
          {/* Left Navigation Arrow */}
          <button 
            onClick={() => {
              if (galleryRef.current) {
                galleryRef.current.scrollBy({
                  left: -300,
                  behavior: 'smooth'
                });
              }
            }}
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110"
            aria-label="Previous photo"
            style={{
              backdropFilter: 'blur(12px)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel */}
          <div 
            ref={galleryRef}
            className="flex gap-4 md:gap-8 lg:gap-12 overflow-x-auto scrollbar-hide py-12 px-4 md:px-8 -mx-4 md:-mx-8"
            style={{
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 1rem',
              transformStyle: 'preserve-3d',
            }}
          >
            {photos.map((photo, index) => {
              const isCenterCard = index === centerIndex;
              const cardStyle = getCardStyle(index, isCenterCard);
              
              return (
                <div 
                  key={index}
                  className="flex-shrink-0 w-64 h-80 md:w-96 md:h-[28rem] rounded-3xl overflow-hidden transition-all duration-700 ease-out cursor-pointer relative"
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
                        {/* Outer glow layers */}
                        <div className="absolute -inset-8 bg-gradient-to-br from-[#C4985B]/30 via-[#D4C9B8]/20 to-[#8B7355]/30 rounded-[2.5rem] blur-3xl"></div>
                        <div className="absolute -inset-6 bg-gradient-to-br from-[#C4985B]/25 via-[#F8F6F3]/15 to-[#8B7355]/25 rounded-[2rem] blur-2xl"></div>
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#C4985B]/20 to-[#8B7355]/20 rounded-3xl blur-xl"></div>
                        
                        {/* Highlight border */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#C4985B]/40 via-transparent to-[#8B7355]/40 rounded-3xl"></div>
                      </>
                    )}
                    
                    {/* Shadow effects for non-center cards */}
                    {!isCenterCard && (
                      <div 
                        className="absolute inset-0 bg-black/10 rounded-3xl"
                        style={{
                          boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)'
                        }}
                      ></div>
                    )}
                    
                    {/* Image container */}
                    <div className="relative rounded-3xl overflow-hidden h-full">
                      {/* Enhanced shadow for center card */}
                      {isCenterCard && (
                        <div className="absolute -inset-2 bg-gradient-to-br from-black/10 via-transparent to-black/20 rounded-3xl shadow-2xl"></div>
                      )}
                      
                      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-all duration-700"
                          sizes="(max-width: 768px) 18rem, 24rem"
                          priority={index < 3}
                          style={{
                            filter: isCenterCard ? 'brightness(1.05) contrast(1.1) saturate(1.1)' : 'brightness(0.9) contrast(0.95) saturate(0.9)'
                          }}
                        />
                        
                        {/* Enhanced overlay for depth */}
                        <div className={`absolute inset-0 transition-all duration-700 ${
                          isCenterCard 
                            ? 'bg-gradient-to-br from-transparent via-transparent to-[#8B7355]/5'
                            : 'bg-gradient-to-br from-black/10 via-black/5 to-black/20'
                        }`}></div>
                        
                        {/* Tap indicator for center card */}
                        {isCenterCard && (
                          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg animate-bounce">
                            <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Reflection effect for center card */}
                        {isCenterCard && (
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Navigation Arrow */}
          <button 
            onClick={() => {
              if (galleryRef.current) {
                galleryRef.current.scrollBy({
                  left: 300,
                  behavior: 'smooth'
                });
              }
            }}
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110"
            aria-label="Next photo"
            style={{
              backdropFilter: 'blur(12px)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="flex justify-center mt-8 space-x-3">
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
                  : 'w-3 h-3 bg-[#D4C9B8] hover:bg-[#C4985B]/60'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom quote */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 italic max-w-lg mx-auto">
            &ldquo;En cada mirada encontramos el infinito, en cada sonrisa, la eternidad&rdquo;
          </p>
          <FloralDivider />
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          <button 
            className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-300 hover:scale-110 shadow-2xl"
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
            <div className="relative max-w-5xl max-h-full rounded-2xl overflow-hidden shadow-2xl">
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
    </div>
  );
}