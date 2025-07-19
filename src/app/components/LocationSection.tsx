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
        threshold: 0.1,
        rootMargin: '-30px'
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
        <div className={`text-center mb-20 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.4em] uppercase text-stone-800 mb-6 garamond-300 relative">
            Evento principal
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
          </h2>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-12 max-w-[920px] mx-auto">
          
          {/* Ceremonia Card */}
          <div className={`group transition-all duration-2000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="bg-white overflow-hidden border-l-4 border-stone-200 shadow-elegant hover:shadow-elegant-hover hover:border-stone-400 transition-all duration-700 transform hover:-translate-y-2">
              
              {/* Image Section */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <Image
                  src={sagradoCorazon}
                  alt="Ceremonia Religiosa"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40 transition-all duration-700"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-px bg-white mb-3"></div>
                  <p className="text-sm tracking-[0.2em] uppercase font-light">Ceremonia Religiosa</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-10 md:p-12 text-center relative">
                
                {/* Decorative Element */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-stone-300"></div>
                
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-light text-stone-800 mb-6 tracking-wide" style={{fontFamily: 'Georgia, serif'}}>
                  Ceremonia
                </h3>
                
                {/* Time */}
                <div className="mb-8">
                  <p className="text-stone-600 text-lg tracking-[0.15em] font-light">
                    4:00 PM — 5:00 PM
                  </p>
                </div>
                
                {/* Divider */}
                <div className="flex justify-center items-center mb-8">
                  <div className="w-8 h-px bg-stone-300"></div>
                  <div className="w-2 h-2 border border-stone-300 transform rotate-45 mx-4"></div>
                  <div className="w-8 h-px bg-stone-300"></div>
                </div>
                
                {/* Location */}
                <div className="space-y-2 mb-10">
                  <p className="text-stone-800 text-lg font-medium tracking-wide">
                    Iglesia del Sagrado Corazón
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Calle Ignacio Zaragoza 700, Centro de Montemorelos
                  </p>
                  <p className="text-stone-600 text-sm">
                    67500 Montemorelos, N.L.
                  </p>
                </div>
                
                {/* Action Button */}
                <div className="mt-10">
                  <a 
                    href="https://www.google.com/maps?client=firefox-b-d&sca_esv=289557ae53a63d3d&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiOWdvb2dsZSBtYXBzIGlnbGVzaWEgc2FncmFkbyBjb3Jhem9uIGRlIGplc3VzIG1vbnRlbW9yZWxvc0gAUABYAHAAeAGQAQCYAQCgAQCqAQC4AQPIAQD4AQGYAgCgAgCYAwCSBwCgBwCyBwC4BwDCBwDIBwA&um=1&ie=UTF-8&fb=1&gl=mx&sa=X&geocode=KafWv5En13yGMVJTeLebkJ03&daddr=Calle+Ignacio+Zaragoza+700,+Centro+de+Montemorelos,+67500+Montemorelos,+N.L."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 px-8 py-4 border border-stone-300 hover:border-stone-500 text-stone-700 hover:text-stone-900 transition-all duration-400 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-stone-100 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400"></div>
                    <MdDirections className="text-lg relative z-10 transform group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span className="font-light tracking-[0.1em] uppercase text-sm relative z-10">Ver en Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Recepción Card */}
          <div className={`group transition-all duration-2000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`} style={{ transitionDelay: '700ms' }}>
            <div className="bg-white overflow-hidden border-l-4 border-stone-200 shadow-elegant hover:shadow-elegant-hover hover:border-stone-400 transition-all duration-700 transform hover:-translate-y-2">
              
              {/* Image Section */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <Image
                  src={museum}
                  alt="Lugar de Recepción"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40 transition-all duration-700"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-px bg-white mb-3"></div>
                  <p className="text-sm tracking-[0.2em] uppercase font-light">Celebración</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-10 md:p-12 text-center relative">
                
                {/* Decorative Element */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-stone-300"></div>
                
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-light text-stone-800 mb-6 tracking-wide" style={{fontFamily: 'Georgia, serif'}}>
                  Recepción
                </h3>
                
                {/* Time */}
                <div className="mb-8">
                  <p className="text-stone-600 text-lg tracking-[0.15em] font-light">
                    6:00 PM — 11:00 PM
                  </p>
                </div>
                
                {/* Divider */}
                <div className="flex justify-center items-center mb-8">
                  <div className="w-8 h-px bg-stone-300"></div>
                  <div className="w-2 h-2 border border-stone-300 transform rotate-45 mx-4"></div>
                  <div className="w-8 h-px bg-stone-300"></div>
                </div>
                
                {/* Location */}
                <div className="space-y-2 mb-10">
                  <p className="text-stone-800 text-lg font-medium tracking-wide">
                    Museo de Montemorelos
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Prolongación Frontera, s/n, Barrio Parar
                  </p>
                  <p className="text-stone-600 text-sm">
                    67500 Montemorelos, N.L.
                  </p>
                </div>
                
                {/* Action Button */}
                <div className="mt-10">
                  <a 
                    href="https://www.google.com/maps/dir//Prolongaci%C3%B3n+Frontera,+s%2Fn,+Barrio+Parar,+67500+Montemorelos,+N.L./@25.1930478,-99.9006511,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x867cd727ceb145f5:0x1500ee5283da0c71!2m2!1d-99.8182496!2d25.1930706?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 px-8 py-4 border border-stone-300 hover:border-stone-500 text-stone-700 hover:text-stone-900 transition-all duration-400 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-stone-100 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400"></div>
                    <MdDirections className="text-lg relative z-10 transform group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span className="font-light tracking-[0.1em] uppercase text-sm relative z-10">Ver en Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        
        .shadow-elegant-hover {
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 25px 50px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}