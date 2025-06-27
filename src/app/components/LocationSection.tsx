"use client"
import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChurch } from 'react-icons/fa';
import Image from 'next/image';
import mariauxImage from '../../../assets/mariaaux.JPG';

export default function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-push-up');
          }
        });
      },
      {
        threshold: 0.4,
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
      className="min-h-screen w-full bg-[#fafafa] py-20 px-4 md:px-8 opacity-0 relative"
    >
      <div className="max-w-6xl mx-auto text-gray-800 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase text-gray-900 mb-6 garamond-300">
            UBICACIÓN
          </h2>
          <div className="w-16 h-px bg-gray-400 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Venue Image */}
          <div className="space-y-12">
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <FaChurch className="text-xl text-gray-600" />
                <h3 className="text-xl font-light tracking-[0.2em] text-gray-900 uppercase garamond-300">Ceremonia</h3>
              </div>
              
              <div className="relative w-full h-80 mb-6 overflow-hidden">
                <Image
                  src={mariauxImage}
                  alt="Venue de la ceremonia"
                  fill
                  className="object-cover filter grayscale-[20%] contrast-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <p className="text-sm font-light tracking-wide text-gray-600 text-center uppercase garamond-300">
                Un lugar especial para nuestra celebración
              </p>
            </div>

            {/* Map */}
            <div className="aspect-video w-full overflow-hidden shadow-sm border border-gray-200 bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.1234567890123!2d-99.12345678901234!3d25.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662e3c3c3c3c3c3%3A0x3c3c3c3c3c3c3c3c!2sSimon%20Bol%C3%ADvar%20659%2C%20Del%20Maestro%2C%2067500%20Montemorelos%2C%20N.L.!5e0!3m2!1ses-419!2smx!4v1709761234567!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <FaMapMarkerAlt className="text-xl text-gray-600" />
                <h3 className="text-xl font-light tracking-[0.2em] text-gray-900 uppercase garamond-300">Dirección</h3>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-light text-gray-900 garamond-regular">
                  Simon Bolívar 659
                </p>
                <p className="text-base font-light text-gray-700 garamond-300">
                  Del Maestro, 67500
                </p>
                <p className="text-base font-light text-gray-700 garamond-300">
                  Montemorelos, N.L.
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <FaCalendarAlt className="text-xl text-gray-600" />
                <h3 className="text-xl font-light tracking-[0.2em] text-gray-900 uppercase garamond-300">Fecha</h3>
              </div>
              <p className="text-lg font-light text-gray-900 garamond-regular">
                18 de Octubre, 2025
              </p>
            </div>

            {/* Time */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <FaClock className="text-xl text-gray-600" />
                <h3 className="text-xl font-light tracking-[0.2em] text-gray-900 uppercase garamond-300">Hora</h3>
              </div>
              <p className="text-lg font-light text-gray-900 garamond-regular">
                4:00 PM
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="text-center">
                <p className="text-sm font-light text-gray-600 tracking-wide mb-4 garamond-300 uppercase">
                  Te esperamos para celebrar junto a nosotros
                </p>
                <div className="w-12 h-px bg-gray-300 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes push-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-push-up {
          animation: push-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}