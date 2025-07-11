"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      {
        threshold: 0.3,
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

  // Flaticon Components for clothing illustrations
  const FormalSuit = () => (
    <div className="flex items-center justify-center">
      <Image 
        src="https://cdn-icons-png.flaticon.com/512/2022/2022794.png" 
        alt="Tuxedo formal" 
        width={48}
        height={60}
        className="w-12 h-15 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );

  const ElegantDress = () => (
    <div className="flex items-center justify-center">
      <Image 
        src="https://cdn-icons-png.flaticon.com/512/88/88762.png" 
        alt="Vestido de cóctel" 
        width={48}
        height={60}
        className="w-12 h-15 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-[#fafafa] py-24 px-4 md:px-8 relative flex items-center justify-center"
    >
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Icons */}
          <div className="flex justify-center space-x-8 mb-8">
            <FormalSuit />
            <ElegantDress />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.4em] uppercase text-gray-900 mb-12 garamond-300">
            DRESS CODE
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed tracking-wide garamond-300 max-w-lg mx-auto">
            Vístanse para brillar en esta noche mágica. Elegancia y sofisticación son la clave. 
            Caballeros en traje, damas en vestido de gala o elegante.
          </p>

        </div>
      </div>
    </section>
  );
}