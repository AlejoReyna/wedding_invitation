"use client"
import { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChurch, FaPhone } from 'react-icons/fa';
import { MdDirections } from 'react-icons/md';
import Image from 'next/image';
import sagradoCorazon from '../../../assets/robada.jpg';
import museum from '../../../assets/museum.jpg';

export default function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        threshold: 0.2,
        rootMargin: '-50px'
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

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-neutral-50 to-stone-50 py-24 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] uppercase text-stone-700 mb-4 garamond-300">
            CELEBRACIÓN
          </h2>
          <div className="w-24 h-px bg-stone-400 mx-auto"></div>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Ceremonia Card */}
          <div className={`transition-all duration-1500 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 hover:shadow-3xl transition-all duration-700">
              
              {/* Image Section */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <Image
                  src={sagradoCorazon}
                  alt="Ceremonia Religiosa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 text-center">
                
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-light italic text-stone-800 mb-6" style={{fontFamily: 'Georgia, serif'}}>
                  La Ceremonia
                </h3>
                
                {/* Divider */}
                <div className="w-20 h-px bg-stone-400 mx-auto mb-8"></div>
                
                {/* Date & Time */}
                <div className="space-y-2 mb-6">
                  <p className="text-stone-600 text-lg tracking-wide">
                    Sábado, 18 de Octubre, 2025
                  </p>
                  <p className="text-stone-600 text-lg tracking-wide">
                    4:00 PM — 5:00 PM
                  </p>
                </div>
                
                {/* Location */}
                <div className="space-y-1 mb-6">
                  <p className="text-stone-700 text-lg font-medium">
                    Parroquia María Auxiliadora
                  </p>
                  <p className="text-stone-600">
                    Simon Bolívar 659, Del Maestro
                  </p>
                  <p className="text-stone-600">
                    67500 Montemorelos, N.L.
                  </p>
                </div>
                
                {/* Contact */}
                <p className="text-stone-600 text-lg tracking-wide">
                  +52 826-263-1234
                </p>
                
                {/* Action Button */}
                <div className="mt-8">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors duration-300">
                    <MdDirections className="text-lg" />
                    <span className="font-light tracking-wide">Cómo llegar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recepción Card */}
          <div className={`transition-all duration-1500 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 hover:shadow-3xl transition-all duration-700">
              
              {/* Image Section */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <Image
                  src={museum}
                  alt="Lugar de Recepción"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 text-center">
                
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-light italic text-stone-800 mb-6" style={{fontFamily: 'Georgia, serif'}}>
                  La Recepción
                </h3>
                
                {/* Divider */}
                <div className="w-20 h-px bg-stone-400 mx-auto mb-8"></div>
                
                {/* Date & Time */}
                <div className="space-y-2 mb-6">
                  <p className="text-stone-600 text-lg tracking-wide">
                    Sábado, 18 de Octubre, 2025
                  </p>
                  <p className="text-stone-600 text-lg tracking-wide">
                    6:00 PM — 11:00 PM
                  </p>
                </div>
                
                {/* Location */}
                <div className="space-y-1 mb-6">
                  <p className="text-stone-700 text-lg font-medium">
                    Salón de Eventos Los Jardines
                  </p>
                  <p className="text-stone-600">
                    Av. Universidad 123, Centro
                  </p>
                  <p className="text-stone-600">
                    67500 Montemorelos, N.L.
                  </p>
                </div>
                
                {/* Contact */}
                <p className="text-stone-600 text-lg tracking-wide">
                  +52 826-123-4567
                </p>
                
                {/* Action Button */}
                <div className="mt-8">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors duration-300">
                    <MdDirections className="text-lg" />
                    <span className="font-light tracking-wide">Cómo llegar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
