"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CoupleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Observe each photo container
    photoRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      
      photoRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  // Function to add refs to our photoRefs array
  const addPhotoRef = (index: number) => (el: HTMLDivElement) => {
    photoRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 py-32 px-4 md:px-8 opacity-0 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-gray-200 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-gray-600 mb-6">
              Nuestra Historia
            </h2>
            <div className="w-20 h-px bg-gray-400 mx-auto"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Story Content */}
          <div className="space-y-8 animate-fade-in-up order-1 lg:order-2">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-serif font-light text-gray-800 leading-tight">
                Un encuentro
                <span className="block text-gray-500 text-2xl md:text-3xl mt-2">
                  que cambió todo
                </span>
              </h3>
              
              <div className="w-12 h-px bg-gray-400"></div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg font-light">
                  Lo que comenzó como una casualidad se convirtió en la historia más hermosa que podíamos haber imaginado. Entre conversaciones que se extendían hasta el amanecer, descubrimos que compartíamos más que sueños: compartíamos una visión del amor.
                </p>
                
                <p className="text-lg font-light">
                  Cada día juntos ha sido una confirmación de que el destino tiene sus propios planes. Ahora, listos para escribir nuestro próximo capítulo, queremos celebrar este nuevo comienzo con quienes han sido parte de nuestra historia.
                </p>
              </div>
              
              {/* Signature element */}
              <div className="pt-8">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-serif text-gray-400">A</div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="text-sm tracking-[0.2em] text-gray-500 uppercase">y</div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="text-2xl font-serif text-gray-400">A</div>
                </div>
              </div>

              {/* Photo Collage */}
              <div 
                ref={addPhotoRef(0)}
                className="relative h-[30rem] md:h-[40rem] group opacity-0"
              >
                <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-[-3deg] transition-transform duration-500 ease-in-out mx-6">
                  <Image 
                    src="/couple-1.jpeg" 
                    alt="Andrea y Aldo foto 1" 
                    fill
                    className="object-cover filter sepia-[.30] brightness-105 contrast-105"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-[4deg] transition-transform duration-500 ease-in-out z-10">
                  <Image 
                    src="/couple-2.jpeg" 
                    alt="Andrea y Aldo foto 2" 
                    fill
                    className="object-cover filter sepia-[.20] brightness-110"
                  />
                </div>
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
            <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-[3deg] transition-transform duration-500 ease-in-out mx-6">
              <Image 
                src="/couple-2.jpeg" 
                alt="Andrea y Aldo foto 3" 
                fill
                className="object-cover filter brightness-95 contrast-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-[-4deg] transition-transform duration-500 ease-in-out z-10">
              <Image 
                src="/couple-1.jpeg" 
                alt="Andrea y Aldo foto 4" 
                fill
                className="object-cover filter sepia-[.15] brightness-105"
              />
            </div>
          </div>

          {/* Third Photo Collage */}
          <div 
            ref={addPhotoRef(2)}
            className="relative h-[30rem] group opacity-0"
          >
            <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-[-2deg] transition-transform duration-500 ease-in-out">
              <Image 
                src="/couple-1.jpeg" 
                alt="Andrea y Aldo foto 5" 
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-[3deg] transition-transform duration-500 ease-in-out z-10">
              <Image 
                src="/couple-2.jpeg" 
                alt="Andrea y Aldo foto 6" 
                fill
                className="object-cover filter contrast-110"
              />
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-24 animate-fade-in-up">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl text-gray-200 font-serif leading-none mb-4">"</div>
            <p className="text-xl font-light text-gray-500 italic leading-relaxed">
              El amor verdadero no es perfecto, es auténtico
            </p>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        @keyframes fade-in {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}