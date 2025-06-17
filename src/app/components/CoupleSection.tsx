"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CoupleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="min-h-screen w-full bg-[#FDFBF5] py-20 px-4 md:px-8 opacity-0"
    >
      <div className="max-w-7xl mx-auto text-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif tracking-wider uppercase text-[#4A553A] mb-4">
            Y henos aquí...
          </h2>
          <div className="w-24 h-1 bg-[#D4B996] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo Collage */}
          <div className="relative h-[30rem] md:h-[40rem] group animate-fade-in">
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-[-3deg] transition-transform duration-500 ease-in-out mx-6">
              <Image 
                src="/couple-1.jpeg" 
                alt="Andrea y Aldo foto 1" 
                layout="fill" 
                objectFit="cover"
                className="filter sepia-[.30] brightness-105 contrast-105"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-[4deg] transition-transform duration-500 ease-in-out z-10">
              <Image 
                src="/couple-2.jpeg" 
                alt="Andrea y Aldo foto 2" 
                layout="fill" 
                objectFit="cover"
                className="filter sepia-[.20] brightness-110"
              />
            </div>
          </div>
          
          {/* Story Text */}
          <div className="space-y-8 text-left animate-fade-in-up  mx-6">
            <h3 className="text-3xl md:text-4xl font-serif text-[#4A553A]">
              Un viaje inesperado
            </h3>
            <div className="flex flex-col gap-4">
            <p className="text-xl font-light text-gray-700 text-justify leading-relaxed tracking-wide">
              Nuestra historia comenzó con una casualidad, un encuentro que ninguno de los dos esperaba pero que el destino ya había escrito. Entre risas y conversaciones que duraban horas, descubrimos que compartíamos sueños, pasiones y un amor por las pequeñas cosas de la vida.
            </p>
            <p className="text-xl font-light text-gray-700 leading-relaxed tracking-wide">
              Cada día juntos ha sido una aventura, construyendo un amor basado en la confianza, el respeto y la alegría. Ahora, estamos listos para empezar nuestro &quot;para siempre&quot; y nos emociona celebrarlo con las personas que más queremos.
            </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
          animation: fade-in-up 1.2s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
} 