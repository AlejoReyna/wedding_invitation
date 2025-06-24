"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import p1 from '@assets/p1.jpg';
import p2 from '@assets/p2.jpg';
import p3 from '@assets/p3.jpg';
import p4 from '@assets/p4.jpg';
import p5 from '@assets/p5.jpg';
import p6 from '@assets/p6.jpg';

export default function CoupleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ src: StaticImageData, alt: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    const currentPhotoRefs = [...photoRefs.current];
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    currentPhotoRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      
      currentPhotoRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const addPhotoRef = (index: number) => (el: HTMLDivElement) => {
    photoRefs.current[index] = el;
  };

  const photos = [
    { src: p1, alt: 'Foto 1' },
    { src: p2, alt: 'Foto 2' },
    { src: p3, alt: 'Foto 3' },
    { src: p4, alt: 'Foto 4' },
    { src: p5, alt: 'Foto 5' },
    { src: p6, alt: 'Foto 6' },
  ];

  return (
    <>
      <section 
        ref={sectionRef}
        className="min-h-screen w-full bg-[#f8f7f5] py-24 px-4 md:px-8 opacity-0 relative overflow-hidden"
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-40 left-20 w-20 h-20 border border-[#d4c4b0]/20 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-16 h-16 border border-[#d4c4b0]/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-24">
            <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase text-[#8b7355] mb-8">
              NUESTRA HISTORIA
            </h2>
            <div className="w-24 h-px bg-[#d4c4b0] mx-auto mb-8"></div>
            <h3 className="font-serif text-4xl md:text-5xl font-light text-[#5c5c5c] tracking-wider">
              Andrea & Aldo
            </h3>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
            {/* Photo Collage - First Set */}
            <div 
              ref={addPhotoRef(0)}
              className="relative h-[30rem] md:h-[40rem] group opacity-0 order-2 lg:order-1"
            >
              <div 
                className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-[-3deg] transition-transform duration-500 ease-in-out mx-6 cursor-pointer hover:shadow-2xl"
                onClick={() => setSelectedImage(photos[4])}
              >
                <Image 
                  src={photos[4].src} 
                  alt={photos[4].alt} 
                  fill
                  className="object-cover filter brightness-105"
                />
                {/* Click indicator */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div 
                className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-[4deg] transition-transform duration-500 ease-in-out z-10 cursor-pointer hover:shadow-3xl"
                onClick={() => setSelectedImage(photos[3])}
              >
                <Image 
                  src={photos[3].src} 
                  alt={photos[3].alt} 
                  fill
                  className="object-cover filter brightness-110"
                />
                {/* Click indicator */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story Content */}
            <div className="space-y-8 animate-fade-in-up order-1 lg:order-2">
              <div className="space-y-6">
                <p className="text-lg md:text-xl font-light text-[#6b6b6b] leading-relaxed">
                  Nos conocimos una tarde de primavera en aquel pequeño café cerca del parque. 
                  Lo que comenzó como una conversación casual se convirtió en horas de risas 
                  y confidencias que marcaron el inicio de nuestra historia.
                </p>
                
                <p className="text-lg md:text-xl font-light text-[#6b6b6b] leading-relaxed">
                  Desde entonces, cada día ha sido una nueva aventura juntos. Hemos construido 
                  un amor basado en la confianza, el respeto mutuo y la alegría de compartir 
                  cada momento, grande o pequeño.
                </p>

                <div className="pt-6">
                  <p className="font-serif text-2xl text-[#8b7355] italic">
                    &ldquo;El amor verdadero no es otra cosa que el deseo inevitable de ayudar al otro para que sea quien es&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Photo Collages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32">
            {/* Second Photo Collage */}
            <div 
              ref={addPhotoRef(1)}
              className="relative h-[30rem] group opacity-0"
            >
              <div 
                className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-[3deg] transition-transform duration-500 ease-in-out mx-6 cursor-pointer hover:shadow-2xl"
                onClick={() => setSelectedImage(photos[2])}
              >
                <Image 
                  src={photos[2].src} 
                  alt={photos[2].alt} 
                  fill
                  className="object-cover filter brightness-95 contrast-110"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div 
                className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-[-4deg] transition-transform duration-500 ease-in-out z-10 cursor-pointer hover:shadow-3xl"
                onClick={() => setSelectedImage(photos[1])}
              >
                <Image 
                  src={photos[1].src} 
                  alt={photos[1].alt} 
                  fill
                  className="object-cover filter brightness-105"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Photo Collage */}
            <div 
              ref={addPhotoRef(2)}
              className="relative h-[30rem] group opacity-0"
            >
              <div 
                className="absolute top-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-[-2deg] transition-transform duration-500 ease-in-out cursor-pointer hover:shadow-2xl"
                onClick={() => setSelectedImage(photos[0])}
              >
                <Image 
                  src={photos[0].src} 
                  alt={photos[0].alt} 
                  fill
                  className="object-cover filter brightness-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div 
                className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-[3deg] transition-transform duration-500 ease-in-out z-10 cursor-pointer hover:shadow-3xl"
                onClick={() => setSelectedImage(photos[5])}
              >
                <Image 
                  src={photos[5].src} 
                  alt={photos[5].alt} 
                  fill
                  className="object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          {/* Bottom Quote */}
          <div 
            ref={addPhotoRef(4)}
            className="text-center mt-24 animate-fade-in-up"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl text-[#d4c4b0]/30 font-serif leading-none mb-4">&ldquo;</div>
              <p className="font-serif text-2xl md:text-3xl text-[#8b7355] italic leading-relaxed mb-8">
                Juntos escribiremos el resto de nuestra historia, 
                página por página, día tras día
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-20 h-px bg-[#d4c4b0]"></div>
                <span className="text-[#8b7355] text-2xl">♥</span>
                <div className="w-20 h-px bg-[#d4c4b0]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Polaroid-style 3D Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* 3D Polaroid Container */}
          <div className="relative z-10 transform-gpu perspective-1000">
            <div className="relative transform-gpu transition-all duration-700 ease-out animate-lift-3d">
              {/* Card Shadow */}
              <div className="absolute inset-0 bg-black/50 blur-3xl transform translate-y-12 scale-90" />
              
              {/* Polaroid Card */}
              <div className="relative bg-white p-4 pb-20 rounded-sm shadow-2xl transform hover:rotate-[1deg] transition-transform duration-300">
                {/* Close button */}
                <button 
                  className="absolute -top-4 -right-4 z-20 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-300 shadow-lg border border-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Image Container with Polaroid border */}
                <div className="relative w-[80vw] max-w-2xl h-[60vh] bg-gray-100">
                  <Image 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Polaroid Caption Area */}
                <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center">
                  <p className="text-gray-600 font-serif text-lg italic">{selectedImage.alt}</p>
                </div>
                
                {/* Tape effect */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-white/60 rotate-[-5deg] shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes lift-3d {
          0% {
            opacity: 0;
            transform: translateY(100px) rotateX(-15deg) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(-2deg) scale(1);
          }
        }
        
        .animate-lift-3d {
          animation: lift-3d 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </>
  );
}