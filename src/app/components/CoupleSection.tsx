"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import p1 from '@assets/p1.JPG';
import p2 from '@assets/p2.JPG';
import p3 from '@assets/p3.JPG';
import p4 from '@assets/p4.JPG';
import p5 from '@assets/p5.JPG';
import p6 from '@assets/p6.JPG';

export default function CoupleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ src: StaticImageData, alt: string, caption: string } | null>(null);

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
    { src: p1, alt: 'Foto 1', caption: 'Nuestro primer encuentro' },
    { src: p2, alt: 'Foto 2', caption: 'Una tarde perfecta' },
    { src: p3, alt: 'Foto 3', caption: 'Compartiendo sueños' },
    { src: p4, alt: 'Foto 4', caption: 'Momentos de complicidad' },
    { src: p5, alt: 'Foto 5', caption: 'Construyendo el futuro' },
    { src: p6, alt: 'Foto 6', caption: 'Listos para el sí' },
  ];

  // Type definition for photo
  type PhotoType = {
    src: StaticImageData;
    alt: string;
    caption: string;
  };

  // Type definition for Polaroid props
  interface PolaroidProps {
    photo: PhotoType;
    onClick: (photo: PhotoType) => void;
    className?: string;
    transform?: string;
  }

  // Polaroid component
  const Polaroid = ({ photo, onClick, className = "", transform = "" }: PolaroidProps) => (
    <div 
      className={`polaroid-card cursor-pointer ${className}`}
      style={{ transform }}
      onClick={() => onClick(photo)}
    >
      <div className="polaroid-wrapper">
        <div className="polaroid-image">
          <Image 
            src={photo.src} 
            alt={photo.alt} 
            fill
            className="object-cover"
          />
        </div>
        <div className="polaroid-caption">
          <p className="text-gray-600 text-sm font-light garamond-300">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section 
        ref={sectionRef}
        className="min-h-screen w-full bg-[#F2F2F2] py-24 px-4 md:px-8 opacity-0 relative overflow-hidden"
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-40 left-20 w-20 h-20 border border-[#EAE4D5]/30 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-16 h-16 border border-[#B6B09F]/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-24">
            <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase text-[#B6B09F] mb-8 garamond-300">
              NUESTRA HISTORIA
            </h2>
            <div className="w-24 h-px bg-[#B6B09F] mx-auto mb-8"></div>
            <h3 className="text-4xl md:text-5xl font-light text-[#000000] tracking-wider garamond-300">
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
              <Polaroid 
                photo={photos[4]}
                onClick={setSelectedImage}
                className="absolute top-0 left-0 z-10 group-hover:rotate-[-2deg] transition-transform duration-500"
                transform="rotate(-5deg)"
              />
              <Polaroid 
                photo={photos[3]}
                onClick={setSelectedImage}
                className="absolute bottom-0 right-0 z-20 group-hover:rotate-[3deg] group-hover:scale-105 transition-transform duration-500"
                transform="rotate(4deg)"
              />
            </div>
            
            {/* Story Content */}
            <div className="space-y-8 animate-fade-in-up order-1 lg:order-2">
              <div className="space-y-6">
                <p className="text-lg md:text-xl font-light text-[#B6B09F] leading-relaxed garamond-300">
                  Nos conocimos una tarde de primavera en aquel pequeño café cerca del parque. 
                  Lo que comenzó como una conversación casual se convirtió en horas de risas 
                  y confidencias que marcaron el inicio de nuestra historia.
                </p>
                
                <p className="text-lg md:text-xl font-light text-[#B6B09F] leading-relaxed garamond-300">
                  Desde entonces, cada día ha sido una nueva aventura juntos. Hemos construido 
                  un amor basado en la confianza, el respeto mutuo y la alegría de compartir 
                  cada momento, grande o pequeño.
                </p>

                <div className="pt-6">
                  <p className="text-2xl text-[#000000] italic garamond-300">
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
              <Polaroid 
                photo={photos[2]}
                onClick={setSelectedImage}
                className="absolute top-0 right-0 z-10 group-hover:rotate-[2deg] transition-transform duration-500"
                transform="rotate(3deg)"
              />
              <Polaroid 
                photo={photos[1]}
                onClick={setSelectedImage}
                className="absolute bottom-0 left-0 z-20 group-hover:rotate-[-3deg] group-hover:scale-105 transition-transform duration-500"
                transform="rotate(-4deg)"
              />
            </div>

            {/* Third Photo Collage */}
            <div 
              ref={addPhotoRef(2)}
              className="relative h-[30rem] group opacity-0"
            >
              <Polaroid 
                photo={photos[0]}
                onClick={setSelectedImage}
                className="absolute top-0 left-0 z-10 group-hover:rotate-[-1deg] transition-transform duration-500"
                transform="rotate(-2deg)"
              />
              <Polaroid 
                photo={photos[5]}
                onClick={setSelectedImage}
                className="absolute bottom-0 right-0 z-20 group-hover:rotate-[2deg] group-hover:scale-105 transition-transform duration-500"
                transform="rotate(3deg)"
              />
            </div>
          </div>
         
          {/* Bottom Quote */}
          <div 
            ref={addPhotoRef(4)}
            className="text-center mt-24 animate-fade-in-up"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl text-[#EAE4D5]/50 font-serif leading-none mb-4">&ldquo;</div>
              <p className="text-2xl md:text-3xl text-[#000000] italic leading-relaxed mb-8 garamond-300">
                Juntos escribiremos el resto de nuestra historia, 
                página por página, día tras día
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-20 h-px bg-[#B6B09F]"></div>
                <span className="text-[#B6B09F] text-2xl">♥</span>
                <div className="w-20 h-px bg-[#B6B09F]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Modal Container */}
          <div className="relative z-10 max-w-4xl w-full max-h-[90vh] animate-modal-in">
            {/* Close button */}
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
            
            {/* Image Container */}
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

      <style jsx>{`
        .polaroid-card {
          width: 280px;
          height: 360px;
          transition: all 0.3s ease;
        }
        
        .polaroid-card:hover {
          transform: scale(1.05) !important;
          z-index: 30;
        }
        
        .polaroid-wrapper {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 3px;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.15),
            inset 0 0 0 8px white,
            inset 0 0 0 10px rgba(0,0,0,0.05);
          padding: 20px 20px 80px 20px;
          transition: box-shadow 0.3s ease;
        }
        
        .polaroid-card:hover .polaroid-wrapper {
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.25),
            inset 0 0 0 8px white,
            inset 0 0 0 10px rgba(0,0,0,0.1);
        }
        
        .polaroid-image {
          position: relative;
          width: 100%;
          height: calc(100% - 60px);
          background: #f5f5f5;
          overflow: hidden;
          box-shadow: 
            0 2px 8px rgba(0,0,0,0.1),
            inset 0 0 0 1px rgba(0,0,0,0.1);
        }
        
        .polaroid-caption {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 8px;
        }

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
        
        @keyframes modal-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}