"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function WeddingInvitation() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  const photos = [
    { src: '/p1.JPG', alt: 'Andrea & Aldo - Foto 1' },
    { src: '/p2.JPG', alt: 'Andrea & Aldo - Foto 2' },
  ];

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#F8F6F3] text-center">
        <div className="max-w-sm mx-auto space-y-8">
          
          {/* Date */}
          <div className="space-y-2 mt-18">
            <h2 className="text-2xl font-light text-gray-700 leading-tight garamond-regular">
              Sábado, 18 de Octubre 2025
            </h2>
            <p className="text-[#C4985B] text-xs font-light tracking-[0.2em] uppercase garamond-300">
              TE INVITAMOS A NUESTRA BODA
            </p>
          </div>

          {/* Photo arrangement - photos on same row with wide separation */}
          <div className="relative my-4" style={{ height: '450px', width: '100%' }}>
            {/* Decorative floral corner */}
            <div className="absolute -top-4 -left-24 w-16 h-16 opacity-30">
              <svg viewBox="0 0 50 50" className="w-full h-full stroke-[#C4985B]" fill="none">
                <path d="M10,25 Q25,10 40,25 Q25,40 10,25" strokeWidth="1"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </svg>
            </div>

            {/* First photo - rotated left with doubled separation */}
            <div 
              className="absolute top-0 -left-24 w-84 h-108 cursor-pointer transform -rotate-12 hover:scale-105 transition-transform duration-300 shadow-lg"
              style={{ width: '320px', height: '410px' }}
              onClick={() => setSelectedImage(photos[0])}
            >
              <div className="w-full h-full bg-white p-4 pt-4 pb-12 rounded-sm">
                <div className="relative w-full h-84 bg-gray-200 overflow-hidden" style={{ height: '320px' }}>
                  <Image 
                    src={photos[0].src} 
                    alt={photos[0].alt} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Second photo - rotated right, slightly lower than first photo */}
            <div 
              className="absolute top-8 -right-32 w-84 h-108 cursor-pointer transform rotate-12 hover:scale-105 transition-transform duration-300 shadow-lg z-10"
              style={{ width: '320px', height: '410px' }}
              onClick={() => setSelectedImage(photos[1])}
            >
              <div className="w-full h-full bg-white p-4 pt-4 pb-12 rounded-sm">
                <div className="relative w-full h-84 bg-gray-200 overflow-hidden" style={{ height: '320px' }}>
                  <Image 
                    src={photos[1].src} 
                    alt={photos[1].alt} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative floral corner bottom right */}
            <div className="absolute -bottom-4 -right-32 w-16 h-16 opacity-30">
              <svg viewBox="0 0 50 50" className="w-full h-full stroke-[#C4985B]" fill="none">
                <path d="M10,25 Q25,10 40,25 Q25,40 10,25" strokeWidth="1"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Romantic text below photos */}
          <div className="pb-4">
            <p className="text-lg font-light text-gray-600 italic garamond-regular leading-relaxed">
              "Dos corazones, una historia,<br />
              un destino que nos une para siempre"
            </p>
            <div className="flex justify-center items-center mt-4">
              <div className="w-12 h-px bg-[#C4985B] opacity-50"></div>
              <div className="mx-3 text-[#C4985B] text-xl">♡</div>
              <div className="w-12 h-px bg-[#C4985B] opacity-50"></div>
            </div>
          </div>

          {/* Event type */}
          <div>
            <p className="text-gray-500 text-base tracking-wide garamond-300">Ceremonia</p>
          </div>

          {/* Time */}
          <div className="space-y-1">
            <p className="text-4xl font-light text-gray-700 garamond-regular">4:00</p>
            <p className="text-lg text-gray-600 garamond-300">PM</p>
          </div>

          {/* Location - Enhanced styling */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#C4985B]/20 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#C4985B] mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-[#C4985B] text-sm font-medium tracking-[0.1em] uppercase garamond-300">Ubicación</h3>
              </div>
              <div className="text-gray-600 text-base leading-relaxed garamond-regular space-y-1">
                <p className="font-medium">Simon Bolívar 659</p>
                <p>Del Maestro, 67500</p>
                <p>Montemorelos, N.L.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <div className="relative z-10 max-w-4xl w-full max-h-[90vh]">
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
    </>
  );
}