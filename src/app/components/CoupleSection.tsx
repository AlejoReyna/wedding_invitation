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
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-gray-700 leading-tight">
              Sábado, 18 Octubre 2024
            </h2>
            <p className="text-[#C4985B] text-xs font-light tracking-[0.2em] uppercase">
              TE INVITAMOS A NUESTRA BODA
            </p>
          </div>

          {/* Photo arrangement */}
          <div className="relative my-12" style={{ height: '540px', width: '100%' }}>
            {/* Decorative floral corner */}
            <div className="absolute -top-4 -left-12 w-16 h-16 opacity-30">
              <svg viewBox="0 0 50 50" className="w-full h-full stroke-[#C4985B]" fill="none">
                <path d="M10,25 Q25,10 40,25 Q25,40 10,25" strokeWidth="1"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </svg>
            </div>

            {/* First photo - rotated left */}
            <div 
              className="absolute top-0 -left-12 w-84 h-108 cursor-pointer transform -rotate-12 hover:scale-105 transition-transform duration-300 shadow-lg"
              style={{ width: '336px', height: '432px' }}
              onClick={() => setSelectedImage(photos[0])}
            >
              <div className="w-full h-full bg-white p-4 pt-4 pb-12 rounded-sm">
                <div className="relative w-full h-84 bg-gray-200 overflow-hidden" style={{ height: '336px' }}>
                  <Image 
                    src={photos[0].src} 
                    alt={photos[0].alt} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Second photo - rotated right, more separated */}
            <div 
              className="absolute top-32 -right-16 w-84 h-108 cursor-pointer transform rotate-12 hover:scale-105 transition-transform duration-300 shadow-lg z-10"
              style={{ width: '336px', height: '432px' }}
              onClick={() => setSelectedImage(photos[1])}
            >
              <div className="w-full h-full bg-white p-4 pt-4 pb-12 rounded-sm">
                <div className="relative w-full h-84 bg-gray-200 overflow-hidden" style={{ height: '336px' }}>
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
            <div className="absolute -bottom-4 -right-12 w-16 h-16 opacity-30">
              <svg viewBox="0 0 50 50" className="w-full h-full stroke-[#C4985B]" fill="none">
                <path d="M10,25 Q25,10 40,25 Q25,40 10,25" strokeWidth="1"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Names */}
         

          {/* Event type */}
          <div>
            <p className="text-gray-500 text-base tracking-wide">Ceremonia</p>
          </div>

          {/* Time */}
          <div className="space-y-1">
            <p className="text-4xl font-serif text-gray-700">09.00</p>
            <p className="text-lg text-gray-600">am</p>
          </div>

          {/* Location */}
          <div className="space-y-1 text-gray-500 text-sm leading-relaxed">
            <p>Rose Garden Estate, 123 Main Street</p>
            <p>Anytown, US</p>
          </div>

          {/* Get template button */}
          <div className="pt-6">
            <button className="bg-gray-700 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
              Confirmar Asistencia
            </button>
          </div>

          {/* Footer */}
          <div className="pt-8 space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-gray-400">🖤</span>
              <span className="text-xs text-gray-800 font-medium">Made in Framer</span>
            </div>
            <p className="text-xs text-gray-400">
              andrea-aldo.framer.website
            </p>
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