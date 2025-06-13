"use client"
import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

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
      className="min-h-screen w-full bg-[#FFF5E6] py-20 px-4 md:px-8 opacity-0 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[url('/floral-pattern.png')] opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-[url('/floral-pattern.png')] opacity-10 rotate-180"></div>

      <div className="max-w-6xl mx-auto text-gray-800 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.3em] uppercase text-gray-900 mb-4">
            Ubicación
          </h2>
          <div className="w-24 h-1 bg-[#D4B996] mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-video w-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-[#D4B996] transform hover:scale-[1.02] transition-transform duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.1234567890123!2d-99.12345678901234!3d25.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662e3c3c3c3c3c3%3A0x3c3c3c3c3c3c3c3c!2sSimon%20Bol%C3%ADvar%20659%2C%20Del%20Maestro%2C%2067500%20Montemorelos%2C%20N.L.!5e0!3m2!1ses-419!2smx!4v1709761234567!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] shadow-lg border border-[#D4B996]/30 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#D4B996]/10 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-2xl text-[#D4B996]" />
                </div>
                <h3 className="text-2xl font-light tracking-wider text-gray-900">Dirección</h3>
              </div>
              <div className="pl-16">
                <p className="text-xl font-light tracking-wide text-gray-900">
                  Simon Bolívar 659
                </p>
                <p className="text-lg font-light tracking-wide text-gray-700 mt-2">
                  Del Maestro, 67500
                </p>
                <p className="text-lg font-light tracking-wide text-gray-700">
                  Montemorelos, N.L.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] shadow-lg border border-[#D4B996]/30 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#D4B996]/10 p-3 rounded-full">
                  <FaCalendarAlt className="text-2xl text-[#D4B996]" />
                </div>
                <h3 className="text-2xl font-light tracking-wider text-gray-900">Fecha</h3>
              </div>
              <div className="pl-16">
                <p className="text-xl font-light tracking-wide text-gray-900">
                  15 de Junio, 2024
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] shadow-lg border border-[#D4B996]/30 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#D4B996]/10 p-3 rounded-full">
                  <FaClock className="text-2xl text-[#D4B996]" />
                </div>
                <h3 className="text-2xl font-light tracking-wider text-gray-900">Hora</h3>
              </div>
              <div className="pl-16">
                <p className="text-xl font-light tracking-wide text-gray-900">
                  4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes push-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-push-up {
          animation: push-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
} 