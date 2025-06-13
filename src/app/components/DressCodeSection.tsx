"use client"
import { useEffect, useRef, useState } from 'react';
import { FaTshirt, FaPalette, FaShoePrints } from 'react-icons/fa';

export default function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [cardInView, setCardInView] = useState<boolean[]>([]);
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

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

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = cardRefs.findIndex(ref => ref.current === entry.target);
          if (cardIndex !== -1 && entry.isIntersecting) {
            setCardInView(prev => {
              const newState = [...prev];
              newState[cardIndex] = true;
              return newState;
            });
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    cardRefs.forEach(ref => {
      if (ref.current) {
        cardObserver.observe(ref.current);
      }
    });

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      cardRefs.forEach(ref => {
        if (ref.current) {
          cardObserver.unobserve(ref.current);
        }
      });
    };
  }, [cardRefs]);

  const dressCodeItems = [
    {
      icon: FaTshirt,
      title: "Formal Elegante",
      details: ["Traje oscuro para caballeros", "Vestido largo o cocktail para damas"],
      delay: "delay-200"
    },
    {
      icon: FaPalette,
      title: "Paleta de Colores",
      details: ["Tonos tierra y pastel", "Evitar negro y blanco"],
      delay: "delay-400"
    },
    {
      icon: FaShoePrints,
      title: "Calzado",
      details: ["Zapatos formales para caballeros", "Tacón bajo o medio para damas"],
      delay: "delay-600"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-b from-stone-50 to-neutral-100 py-24 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-1/4 w-px h-32 bg-stone-400 transform rotate-12"></div>
        <div className="absolute top-40 right-1/3 w-px h-24 bg-stone-400 transform -rotate-12"></div>
        <div className="absolute bottom-32 left-1/3 w-px h-28 bg-stone-400 transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/4 w-px h-20 bg-stone-400 transform -rotate-45"></div>
      </div>

      {/* Floating subtle elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-stone-300/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + i * 12}%`,
              animation: `gentleFloat ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Refined header */}
        <div className={`text-center mb-20 transition-all duration-1200 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl font-extralight tracking-[0.8em] uppercase text-stone-800 mb-8 relative">
            Dress Code
          </h2>
          
          {/* Elegant divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-stone-400"></div>
            <div className="w-2 h-2 bg-stone-400 rounded-full mx-4"></div>
            <div className="w-16 h-px bg-stone-400"></div>
          </div>
          
          <p className="text-lg font-light text-stone-600 tracking-wide">
            Elegancia en cada detalle
          </p>
        </div>

        {/* Enhanced cards with individual animations */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {dressCodeItems.map((item, index) => (
            <div
              key={index}
              ref={cardRefs[index]}
              className={`group transition-all duration-1200 ease-out ${cardInView[index] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}`}
            >
              <div className="relative bg-gradient-to-br from-amber-50/90 to-yellow-50/80 backdrop-blur-sm p-10 rounded-lg border-l-4 border-stone-400 hover:border-amber-600 transition-all duration-700 hover:from-amber-50 hover:to-yellow-50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transform-gpu">
                
                {/* Enhanced icon with better visibility */}
                <div className="mb-8 relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-200 rounded-full flex items-center justify-center group-hover:border-amber-400 group-hover:from-amber-200 group-hover:to-yellow-200 transition-all duration-500 mx-auto shadow-lg">
                    <item.icon className="text-xl text-amber-700 group-hover:text-amber-800 transition-colors duration-500" />
                  </div>
                  
                  {/* Enhanced animation line */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-px bg-amber-300 group-hover:w-16 group-hover:bg-amber-500 transition-all duration-700"></div>
                </div>

                <h3 className="text-xl font-light tracking-[0.2em] uppercase text-stone-800 mb-8 text-center group-hover:text-stone-900 transition-colors duration-500">
                  {item.title}
                </h3>

                <div className="space-y-4">
                  {item.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className={`text-center transition-all duration-800 ${cardInView[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                      style={{transitionDelay: `${400 + detailIndex * 200}ms`}}
                    >
                      <p className="text-stone-700 font-light leading-relaxed tracking-wide group-hover:text-stone-800 transition-colors duration-500">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Enhanced hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Refined quote section */}
        <div className={`mt-24 text-center transition-all duration-1200 delay-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-stone-400"></div>
            <div className="w-1 h-1 bg-stone-400 rounded-full mx-6"></div>
            <div className="w-12 h-px bg-stone-400"></div>
          </div>
          
          <blockquote className="text-xl md:text-2xl font-light italic text-stone-700 tracking-wide leading-relaxed">
            &quot;La elegancia está en los detalles&quot;
          </blockquote>
          
          <div className="flex items-center justify-center mt-6">
            <div className="w-12 h-px bg-stone-400"></div>
            <div className="w-1 h-1 bg-stone-400 rounded-full mx-6"></div>
            <div className="w-12 h-px bg-stone-400"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          33% { 
            transform: translateY(-8px) translateX(4px);
            opacity: 0.6;
          }
          66% { 
            transform: translateY(4px) translateX(-4px);
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}