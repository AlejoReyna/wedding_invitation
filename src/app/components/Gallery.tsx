"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, index: number, shape: string } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [centerIndex, setCenterIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const photos = [
    { src: '/p1.JPG', alt: 'Andrea & Aldo - Momento especial 1', shape: 'circle' },
    { src: '/p2.JPG', alt: 'Andrea & Aldo - Momento especial 2', shape: 'diamond' },
    { src: '/p3.JPG', alt: 'Andrea & Aldo - Momento especial 3', shape: 'heart' },
    { src: '/p4.JPG', alt: 'Andrea & Aldo - Momento especial 4', shape: 'hexagon' },
    { src: '/p5.JPG', alt: 'Andrea & Aldo - Momento especial 5', shape: 'star' },
    { src: '/p6.JPG', alt: 'Andrea & Aldo - Momento especial 6', shape: 'circle' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const scrollLeft = galleryRef.current.scrollLeft;
        const cardWidth = 280; // Approximate card width including gap
        const newCenterIndex = Math.round(scrollLeft / cardWidth);
        setCenterIndex(Math.max(0, Math.min(newCenterIndex, photos.length - 1)));
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener('scroll', handleScroll);
      return () => galleryElement.removeEventListener('scroll', handleScroll);
    }
  }, [photos.length]);

  const openModal = (photo: { src: string, alt: string, shape: string }, index: number) => {
    setSelectedImage({ ...photo, index });
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedImage({ ...photos[nextIndex], index: nextIndex });
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedImage({ ...photos[prevIndex], index: prevIndex });
  };

  const getShapeClipPath = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'circle(50% at 50% 50%)';
      case 'diamond':
        return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      case 'heart':
        return 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")';
      case 'hexagon':
        return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
      case 'star':
        return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      default:
        return 'none';
    }
  };

  const FloralDivider = () => (
    <div className="flex items-center justify-center my-8">
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C4985B] to-transparent"></div>
      <div className="mx-4 text-[#C4985B] text-2xl animate-pulse">❀</div>
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C4985B] to-transparent"></div>
    </div>
  );

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-br from-[#F8F6F3] via-[#F5F3F0] to-[#F0EDE8] py-16 px-4 overflow-hidden"
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#C4985B] rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header with floating animation */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl garamond-regular text-[#8B7355] mb-6 tracking-wide animate-float">
              Nuestros Momentos Mágicos
            </h2>
            <p className="text-lg md:text-xl text-gray-600 garamond-300 max-w-2xl mx-auto leading-relaxed">
              Cada fotografía cuenta una historia única de amor eterno
            </p>
            <FloralDivider />
          </div>

          {/* Desktop: Masonry Grid with Geometric Shapes */}
          <div className="hidden md:block">
            <div className={`columns-3 gap-8 space-y-8 transition-all duration-1200 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="break-inside-avoid mb-8 group cursor-pointer"
                  onClick={() => openModal(photo, index)}
                  onMouseEnter={() => setActiveHover(index)}
                  onMouseLeave={() => setActiveHover(null)}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className="relative transform transition-all duration-700 hover:scale-105 hover:rotate-2">
                    {/* Dynamic shadow that follows mouse */}
                    <div 
                      className="absolute -inset-4 bg-gradient-to-br from-[#C4985B]/20 to-[#8B7355]/20 rounded-3xl blur-xl transition-all duration-500"
                      style={{
                        transform: activeHover === index 
                          ? `translate(${(mousePosition.x % 20) - 10}px, ${(mousePosition.y % 20) - 10}px)`
                          : 'translate(0, 0)'
                      }}
                    />
                    
                    {/* Main container with geometric shape */}
                    <div className="relative bg-white p-6 rounded-3xl shadow-xl overflow-hidden transform group-hover:-rotate-1 transition-all duration-500">
                      <div 
                        className="relative overflow-hidden transition-all duration-700"
                        style={{
                          aspectRatio: index % 2 === 0 ? '3/4' : '4/3',
                          clipPath: activeHover === index ? getShapeClipPath(photo.shape) : 'none',
                          borderRadius: activeHover === index ? '0' : '1rem',
                        }}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                        
                        {/* Gradient overlay with shape */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Geometric indicator */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <span className="text-[#8B7355] text-xs font-bold">{photo.shape === 'circle' ? '○' : photo.shape === 'diamond' ? '◆' : photo.shape === 'heart' ? '♥' : photo.shape === 'hexagon' ? '⬢' : '★'}</span>
                        </div>
                      </div>
                      
                      {/* Decorative frame effect */}
                      <div className="absolute bottom-6 left-6 right-6 h-4 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Full Width Horizontal Scroll */}
          <div className="md:hidden -mx-4">
            <div 
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide py-8 px-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {photos.map((photo, index) => {
                const isCenterCard = index === centerIndex;
                const cardSize = isCenterCard ? '320px' : '240px';
                
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 relative cursor-pointer transition-all duration-500"
                    onClick={() => openModal(photo, index)}
                    style={{ 
                      scrollSnapAlign: 'center',
                      width: cardSize,
                      transform: `translateY(${index % 2 === 0 ? '-10px' : '10px'}) scale(${isCenterCard ? 1.1 : 1})`,
                    }}
                  >
                    {/* Floating card with depth */}
                    <div className="relative transform transition-all duration-500 hover:scale-105 active:scale-95">
                      {isCenterCard && (
                        <>
                          <div className="absolute -inset-3 bg-gradient-to-br from-[#C4985B]/40 to-[#8B7355]/40 rounded-3xl blur-lg"></div>
                          <div className="absolute -inset-2 bg-gradient-to-br from-[#C4985B]/30 to-[#8B7355]/30 rounded-2xl blur-md"></div>
                        </>
                      )}
                      
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover transition-transform duration-700"
                            sizes="320px"
                          />
                          
                          {/* Dynamic overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                          {/* Tap indicator - only show on center card */}
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
          </div>

          {/* Bottom quote with animation */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-lg text-gray-600 garamond-300 italic max-w-lg mx-auto">
              "En cada mirada encontramos el infinito, en cada sonrisa, la eternidad"
            </p>
            <FloralDivider />
          </div>
        </div>
      </section>

      {/* Enhanced Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          />
          
          <div className="relative z-10 max-w-5xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Close button with animation */}
            <button 
              className="absolute -top-12 right-0 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
              onClick={closeModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation with enhanced styling */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-300 hover:scale-110"
              onClick={prevImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-300 hover:scale-110"
              onClick={nextImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image with enhanced presentation */}
            <div className="relative flex-1 rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Enhanced counter and info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white flex items-center gap-4">
              <span className="text-sm garamond-300">{currentIndex + 1} / {photos.length}</span>
              <div className="w-px h-4 bg-white/40"></div>
              <span className="text-xs garamond-300 opacity-80">Momento Especial</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .garamond-300 {
          font-family: "Cormorant Garamond", serif;
          font-weight: 300;
        }
        
        .garamond-regular {
          font-family: "Cormorant Garamond", serif;
          font-weight: 400;
        }
        
        @media (max-width: 768px) {
          .columns-3 {
            column-count: 1;
          }
        }
      `}</style>
    </>
  );
}