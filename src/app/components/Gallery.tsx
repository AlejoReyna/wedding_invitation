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
        
        // Mejorada detección del centro
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
      // Run once on mount to set initial state
      setTimeout(handleScroll, 100);
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
            const scrollPosition = cardCenter - (containerWidth / 2);
            
            container.scrollLeft = Math.max(0, scrollPosition);
            
            // Update centerIndex after positioning
            setTimeout(() => {
              setCenterIndex(1);
              const event = new Event('scroll');
              container.dispatchEvent(event);
            }, 100);
          }
        }, 200);
      }
    };

    // Add a delay to ensure the component is fully rendered
    const timer = setTimeout(centerSecondImageWithPeek, 300);
    return () => clearTimeout(timer);
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
    if (isCenterCard) return 'scale-105 opacity-100';
    const distance = Math.abs(index - centerIndex);
    if (distance === 1) return 'scale-90 opacity-70';
    return 'scale-80 opacity-50';
  };

  const FloralDivider = () => (
    <div className="flex items-center justify-center my-8">
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C4985B] to-transparent"></div>
      <div className="mx-4 text-[#C4985B] text-2xl animate-pulse">❀</div>
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C4985B] to-transparent"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F8F6F3] via-[#F5F3F0] to-[#F0EDE8] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center overflow-hidden">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] mb-6 relative inline-block">
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block animate-reveal-from-left">¡Nos casamos!</span>
              <span className="absolute left-0 top-0 w-full h-full bg-[#F8F6F3] animate-slide-right origin-left"></span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Algunos momentos especiales juntos
          </p>
          <FloralDivider />
        </div>

        {/* Carousel Container */}
        <div className="relative">
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
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Previous photo"
            style={{
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel */}
          <div 
            ref={galleryRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide py-8 px-4 -mx-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 1rem'
            }}
          >
            {photos.map((photo, index) => {
              const isCenterCard = index === centerIndex;
              const cardStyle = getCardStyle(index, isCenterCard);
              
              return (
                <div 
                  key={index}
                  className={`flex-shrink-0 w-72 h-96 md:w-96 md:h-[28rem] rounded-2xl overflow-hidden transform transition-all duration-500 ${cardStyle}`}
                  style={{
                    scrollSnapAlign: 'center',
                  }}
                  onClick={() => openModal({ ...photo, shape: 'rectangle' }, index)}
                >
                  <div className="relative h-full w-full transform transition-all duration-700 hover:scale-105">
                    {/* Depth effect for center card */}
                    {isCenterCard && (
                      <>
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#C4985B]/40 to-[#8B7355]/40 rounded-3xl blur-2xl"></div>
                        <div className="absolute -inset-3 bg-gradient-to-br from-[#C4985B]/30 to-[#8B7355]/30 rounded-3xl blur-lg"></div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-[#C4985B]/20 to-[#8B7355]/20 rounded-2xl blur-md"></div>
                      </>
                    )}
                    
                    {/* Image container */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full">
                      <div className="relative w-full h-full">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 18rem, 24rem"
                          priority={index < 3}
                        />
                        
                        {/* Tap indicator for center card */}
                        {isCenterCard && (
                          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg animate-pulse">
                            <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
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
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#8B7355] hover:text-[#C4985B] transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Next photo"
            style={{
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6 space-x-2">
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
              className={`w-2 h-2 rounded-full transition-all ${
                index === centerIndex ? 'bg-[#C4985B] w-6' : 'bg-[#D4C9B8]'
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

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeModal}
        >
          <button 
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}