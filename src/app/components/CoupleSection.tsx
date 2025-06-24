"use client"
import { useEffect, useRef, useState } from 'react';

export default function CoupleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      if (!sectionRef.current || isScrolling) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Si la sección está parcialmente visible y no completamente centrada
      if (rect.top <= windowHeight * 0.6 && rect.top > -windowHeight * 0.4) {
        if (!isVisible) {
          isScrolling = true;
          setIsVisible(true);
          
          // Animaciones escalonadas
          setTimeout(() => setShowTitle(true), 100);
          setTimeout(() => setShowPhotos(true), 1100);
          setTimeout(() => setShowText(true), 2100);
          
          // Scroll suave hacia la sección
          const targetScroll = window.scrollY + rect.top;
          
          const smoothScroll = () => {
            const currentScroll = window.scrollY;
            const distance = targetScroll - currentScroll;
            const step = distance * 0.1; // Factor de suavidad
            
            if (Math.abs(step) > 1) {
              window.scrollTo(0, currentScroll + step);
              requestAnimationFrame(smoothScroll);
            } else {
              window.scrollTo(0, targetScroll);
              isScrolling = false;
            }
          };
          
          smoothScroll();
        }
      }
    };

    // Intersection Observer como respaldo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            if (!isVisible) {
              setIsVisible(true);
              // Animaciones escalonadas
              setTimeout(() => setShowTitle(true), 100);
              setTimeout(() => setShowPhotos(true), 1100);
              setTimeout(() => setShowText(true), 2100);
            }
          }
        });
      },
      { 
        threshold: [0.3],
        rootMargin: '0px 0px -20% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const currentSection = sectionRef.current;
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full bg-white flex flex-col"
    >
      {/* Primera fila - Título Cursi - 20% vh */}
      <div className="h-[20vh] w-full flex items-center justify-center px-8">
        <div className={`text-center transition-all duration-1000 transform ${
          showTitle 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <h1 className="garamond-regular text-4xl md:text-6xl lg:text-7xl text-rose-400 mb-2">
            Nuestro Amor Eterno
          </h1>
          <div className="flex justify-center items-center space-x-4">
            <div className="w-16 h-[1px] bg-rose-300"></div>
            <span className="garamond-regular text-rose-300 text-xl">❤</span>
            <div className="w-16 h-[1px] bg-rose-300"></div>
          </div>
        </div>
      </div>

      {/* Segunda fila - Galería de Fotos - 50% vh */}
      <div className="h-[50vh] w-full flex items-center justify-center px-8">
        <div className={`w-full max-w-6xl transition-all duration-1000 transform ${
          showPhotos 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          {/* Galería en forma de corazón */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Foto central grande */}
            <div className="absolute z-10 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                <span className="text-rose-600 text-lg font-semibold">Nosotros</span>
              </div>
            </div>
            
            {/* Fotos formando corazón alrededor */}
            <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-white shadow-xl transform -translate-x-20 -translate-y-16 hover:scale-105 transition-all duration-300 hover:z-20">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                <span className="text-rose-500 text-sm">Foto 1</span>
              </div>
            </div>
            
            <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-white shadow-xl transform translate-x-20 -translate-y-16 hover:scale-105 transition-all duration-300 hover:z-20">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                <span className="text-rose-500 text-sm">Foto 2</span>
              </div>
            </div>
            
            <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-white shadow-xl transform -translate-x-32 translate-y-4 hover:scale-105 transition-all duration-300 hover:z-20">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                <span className="text-rose-500 text-xs">Foto 3</span>
              </div>
            </div>
            
            <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-white shadow-xl transform translate-x-32 translate-y-4 hover:scale-105 transition-all duration-300 hover:z-20">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                <span className="text-rose-500 text-xs">Foto 4</span>
              </div>
            </div>
            
            <div className="absolute w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-xl transform -translate-x-12 translate-y-20 hover:scale-105 transition-all duration-300 hover:z-20">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                <span className="text-rose-500 text-xs">Foto 5</span>
              </div>
            </div>
            
            <div className="absolute w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-xl transform translate-x-12 translate-y-20 hover:scale-105 transition-all duration-300 hover:z-20">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                <span className="text-rose-500 text-xs">Foto 6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tercera fila - Texto Cursi - 30% vh */}
      <div className="h-[30vh] w-full flex items-center justify-center px-8">
        <div className={`text-center max-w-4xl transition-all duration-1000 transform ${
          showText 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <p className="garamond-regular text-xl md:text-2xl lg:text-3xl text-rose-400 leading-relaxed mb-6">
            &quot;En cada latido de mi corazón, en cada suspiro del viento, 
            en cada rayo de sol que acaricia mi rostro, 
            encuentro una razón más para amarte infinitamente...&quot;
          </p>
          <div className="flex justify-center items-center space-x-3">
            <span className="text-rose-300 text-2xl">✨</span>
            <p className="garamond-regular text-rose-300 text-lg italic">
              Dos almas, un solo corazón
            </p>
            <span className="text-rose-300 text-2xl">✨</span>
          </div>
        </div>
      </div>
    </section>
  );
}