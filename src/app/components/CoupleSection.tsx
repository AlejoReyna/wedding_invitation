
"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function CoupleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, caption: string } | null>(null);

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
    { src: '/p1.JPG', alt: 'Foto 1', caption: 'Nuestro primer encuentro' },
    { src: '/p2.JPG', alt: 'Foto 2', caption: 'Una tarde perfecta' },
  ];

  // Polaroid component
  const Polaroid = ({ photo, onClick, className = "", style = {} }) => (
    <div 
      className={`polaroid-card cursor-pointer ${className}`}
      style={style}
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
      </div>
    </div>
  );

  return (
    <>
      <section 
        ref={sectionRef}
        className="min-h-screen w-full bg-[#F8F6F3] py-12 px-6 opacity-0 relative overflow-hidden"
      >
        {/* Decorative floral elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-4 w-32 h-24 opacity-20">
            <svg viewBox="0 0 100 60" className="w-full h-full fill-[#D4A574]">
              <path d="M10,40 Q20,20 30,40 Q40,20 50,40 Q60,20 70,40 Q80,20 90,40" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="20" cy="35" r="2"/>
              <circle cx="40" cy="35" r="2"/>
              <circle cx="60" cy="35" r="2"/>
              <circle cx="80" cy="35" r="2"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-4 w-32 h-24 opacity-20 rotate-180">
            <svg viewBox="0 0 100 60" className="w-full h-full fill-[#D4A574]">
              <path d="M10,40 Q20,20 30,40 Q40,20 50,40 Q60,20 70,40 Q80,20 90,40" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="20" cy="35" r="2"/>
              <circle cx="40" cy="35" r="2"/>
              <circle cx="60" cy="35" r="2"/>
              <circle cx="80" cy="35" r="2"/>
            </svg>
          </div>
        </div>

        <div className="max-w-sm mx-auto relative z-10 text-center">
          {/* Header with initials */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-gray-700 mb-2">
              A<span className="text-[#D4A574] mx-1">&</span>R
            </h1>
          </div>

          {/* Date */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-gray-700 leading-tight">
              Saturday, 18 October 2024
            </h2>
            <p className="text-[#D4A574] text-sm font-light tracking-widest uppercase mt-4">
              WE INVITE YOU TO OUR WEDDING
            </p>
          </div>

          {/* Photo Collage */}
          <div className="relative mb-12" style={{ height: '280px' }}>
            <Polaroid 
              photo={photos[0]}
              onClick={setSelectedImage}
              className="absolute top-0 left-4 z-10"
              style={{ 
                transform: 'rotate(-8deg)',
                width: '140px',
                height: '180px'
              }}
            />
            <Polaroid 
              photo={photos[1]}
              onClick={setSelectedImage}
              className="absolute top-12 right-4 z-20"
              style={{ 
                transform: 'rotate(8deg)',
                width: '140px',
                height: '180px'
              }}
            />
          </div>

          {/* Names */}
          <div className="mb-8">
            <h3 className="text-3xl font-serif text-gray-700 tracking-wide">
              AMORINO <span className="text-[#D4A574] mx-2">&</span> REGINA
            </h3>
          </div>

          {/* Event Details */}
          <div className="mb-8">
            <p className="text-gray-500 text-base mb-4">Ceremony</p>
            <p className="text-4xl font-serif text-gray-700 mb-2">09.00 am</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Rose Garden Estate, 123 Main Street<br/>
              Anytown, US
            </p>
          </div>

          {/* Bottom watermark area */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-xs text-gray-400">
              amore.framer.website
            </p>
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <div className="relative z-10 max-w-4xl w-full max-h-[90vh] animate-modal-in">
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

      <style jsx>{`
        .polaroid-card {
          transition: all 0.3s ease;
        }
        
        .polaroid-card:hover {
          transform: scale(1.05) rotate(0deg) !important;
          z-index: 30;
        }
        
        .polaroid-wrapper {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 3px;
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.15),
            inset 0 0 0 6px white,
            inset 0 0 0 8px rgba(0,0,0,0.05);
          padding: 12px 12px 24px 12px;
          transition: box-shadow 0.3s ease;
        }
        
        .polaroid-card:hover .polaroid-wrapper {
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.25),
            inset 0 0 0 6px white,
            inset 0 0 0 8px rgba(0,0,0,0.1);
        }
        
        .polaroid-image {
          position: relative;
          width: 100%;
          height: 100%;
          background: #f5f5f5;
          overflow: hidden;
          box-shadow: 
            0 1px 4px rgba(0,0,0,0.1),
            inset 0 0 0 1px rgba(0,0,0,0.1);
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