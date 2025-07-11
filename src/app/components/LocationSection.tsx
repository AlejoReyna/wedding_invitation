"use client"
import { useEffect, useRef, useState } from 'react';
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
        <div className="grid md:grid-cols-2 gap-8 max-w-[870px] mx-auto">
          
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
                <h3 className="text-3xl md:text-4xl font-light italic text-stone-800 mb-4" style={{fontFamily: 'Georgia, serif'}}>
                  La Ceremonia
                </h3>
                
                {/* Time */}
                <div className="mb-6">
                  <p className="text-stone-600 text-lg tracking-wide">
                    4:00 PM — 5:00 PM
                  </p>
                </div>
                
                {/* Divider */}
                <div className="w-20 h-px bg-stone-400 mx-auto mb-8"></div>
                
                {/* Location */}
                <div className="space-y-1 mb-6">
                  <p className="text-stone-700 text-lg font-medium">
                    Iglesia del Sagrado Corazón
                  </p>
                  <p className="text-stone-600">
                    Calle Ignacio Zaragoza 700, Centro de Montemorelos
                  </p>
                  <p className="text-stone-600">
                    67500 Montemorelos, N.L.
                  </p>
                </div>
                
                {/* Action Button */}
                <div className="mt-8">
                  <a 
                    href="https://www.google.com/maps?client=firefox-b-d&sca_esv=289557ae53a63d3d&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiOWdvb2dsZSBtYXBzIGlnbGVzaWEgc2FncmFkbyBjb3Jhem9uIGRlIGplc3VzIG1vbnRlbW9yZWxvc0gAUABYAHAAeAGQAQCYAQCgAQCqAQC4AQPIAQD4AQGYAgCgAgCYAwCSBwCgBwCyBwC4BwDCBwDIBwA&um=1&ie=UTF-8&fb=1&gl=mx&sa=X&geocode=KafWv5En13yGMVJTeLebkJ03&daddr=Calle+Ignacio+Zaragoza+700,+Centro+de+Montemorelos,+67500+Montemorelos,+N.L."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors duration-300"
                  >
                    <MdDirections className="text-lg" />
                    <span className="font-light tracking-wide">Ver en Maps</span>
                  </a>
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
                <h3 className="text-3xl md:text-4xl font-light italic text-stone-800 mb-4" style={{fontFamily: 'Georgia, serif'}}>
                  La Recepción
                </h3>
                
                {/* Time */}
                <div className="mb-6">
                  <p className="text-stone-600 text-lg tracking-wide">
                    6:00 PM — 11:00 PM
                  </p>
                </div>
                
                {/* Divider */}
                <div className="w-20 h-px bg-stone-400 mx-auto mb-8"></div>
                
                {/* Location */}
                <div className="space-y-1 mb-6">
                  <p className="text-stone-700 text-lg font-medium">
                    Museo de Montemorelos
                  </p>
                  <p className="text-stone-600">
                    Prolongación Frontera, s/n, Barrio Parar
                  </p>
                  <p className="text-stone-600">
                    67500 Montemorelos, N.L.
                  </p>
                </div>
                
                {/* Action Button */}
                <div className="mt-8">
                  <a 
                    href="https://www.google.com/maps/dir//Prolongaci%C3%B3n+Frontera,+s%2Fn,+Barrio+Parar,+67500+Montemorelos,+N.L./@25.1930478,-99.9006511,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x867cd727ceb145f5:0x1500ee5283da0c71!2m2!1d-99.8182496!2d25.1930706?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors duration-300"
                  >
                    <MdDirections className="text-lg" />
                    <span className="font-light tracking-wide">Ver en Maps</span>
                  </a>
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
