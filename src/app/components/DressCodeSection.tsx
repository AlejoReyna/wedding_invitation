"use client"
import { useEffect, useRef, useState, useMemo } from 'react';

export default function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [cardInView, setCardInView] = useState<boolean[]>([]);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRefs = useMemo(() => [cardRef1, cardRef2], []);

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

  // Flaticon Components for clothing illustrations
  const FormalSuit = () => (
    <div className="flex items-center justify-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2022/2022794.png" 
        alt="Tuxedo formal" 
        className="w-16 h-20 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );

  const ElegantDress = () => (
    <div className="flex items-center justify-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/88/88762.png" 
        alt="Vestido de cóctel" 
        className="w-16 h-20 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );

  const CowboyOutfit = () => (
    <div className="flex items-center justify-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/492/492039.png" 
        alt="Traje casual" 
        className="w-16 h-20 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );

  const CowgirlOutfit = () => (
    <div className="flex items-center justify-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/1785/1785255.png" 
        alt="Vestido elegante" 
        className="w-16 h-20 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );

  const dressCodeItems = [
    {
      title: "Formal Elegante",
      subtitle: "Opción Clásica",
      men: ["Traje negro o gris oscuro", "Camisa blanca", "Corbata elegante", "Zapatos de vestir"],
      women: ["Vestido midi o largo", "Colores sobrios", "Tacones elegantes", "Accesorios discretos"]
    }
    
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-[#fafafa] py-24 px-4 md:px-8 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase text-gray-900 mb-6 garamond-300">
            DRESS CODE
          </h2>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-6"></div>
          <p className="text-base font-light text-gray-600 tracking-wide garamond-300">
            Elegancia y comodidad para celebrar juntos
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 mb-20">
          {dressCodeItems.map((item, index) => (
            <div
              key={index}
              ref={cardRefs[index]}
              className={`transition-all duration-1000 ease-out ${cardInView[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="bg-white p-8 shadow-sm border border-gray-100 text-center">
                {/* Illustration */}
                <div className="mb-8">
                  <div className="flex justify-center space-x-6">
                    <div className="w-20 h-28 flex items-center justify-center bg-gray-50 rounded">
                      {index === 0 ? <FormalSuit /> : <CowboyOutfit />}
                    </div>
                    <div className="w-20 h-28 flex items-center justify-center bg-gray-50 rounded">
                      {index === 0 ? <ElegantDress /> : <CowgirlOutfit />}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-12 mt-2">
                    <p className="text-xs text-gray-500 garamond-300">Caballeros</p>
                    <p className="text-xs text-gray-500 garamond-300">Damas</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-light tracking-[0.2em] text-gray-900 uppercase mb-2 garamond-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-8 garamond-300 uppercase tracking-wide">
                  {item.subtitle}
                </p>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Men's section */}
                  <div>
                    <h4 className="text-base font-light text-gray-800 mb-4 tracking-wide garamond-300 uppercase">
                      Caballeros
                    </h4>
                    <div className="space-y-2">
                      {item.men.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-gray-600 font-light garamond-300">
                          • {detail}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Women's section */}
                  <div>
                    <h4 className="text-base font-light text-gray-800 mb-4 tracking-wide garamond-300 uppercase">
                      Damas
                    </h4>
                    <div className="space-y-2">
                      {item.women.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-gray-600 font-light garamond-300">
                          • {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       

        {/* Bottom message */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-12 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-base font-light italic text-gray-700 tracking-wide garamond-300">
            &ldquo;Lo más importante es que te sientas cómodo y elegante&rdquo;
          </p>
          <div className="w-12 h-px bg-gray-300 mx-auto mt-4"></div>
        </div>
      </div>
    </section>
  );
}