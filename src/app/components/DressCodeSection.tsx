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

  // SVG Components for clothing illustrations
  const FormalSuit = () => (
    <svg width="80" height="120" viewBox="0 0 80 120" className="mx-auto">
      {/* Suit jacket */}
      <path d="M20 30 L20 45 Q20 50 25 50 L35 50 L35 30 Z" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
      <path d="M45 30 L45 50 L55 50 Q60 50 60 45 L60 30 Z" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
      {/* Lapels */}
      <path d="M25 30 L30 35 L35 30" fill="none" stroke="#374151" strokeWidth="1"/>
      <path d="M45 30 L50 35 L55 30" fill="none" stroke="#374151" strokeWidth="1"/>
      {/* Tie */}
      <rect x="37" y="30" width="6" height="20" fill="#6b7280"/>
      {/* Shirt */}
      <rect x="30" y="25" width="20" height="30" fill="#f9fafb" stroke="#e5e7eb"/>
      {/* Pants */}
      <rect x="25" y="50" width="30" height="40" fill="#1f2937" stroke="#374151"/>
      {/* Shoes */}
      <ellipse cx="32" cy="95" rx="8" ry="4" fill="#000"/>
      <ellipse cx="48" cy="95" rx="8" ry="4" fill="#000"/>
    </svg>
  );

  const ElegantDress = () => (
    <svg width="80" height="120" viewBox="0 0 80 120" className="mx-auto">
      {/* Dress top */}
      <path d="M25 25 Q25 20 30 20 L50 20 Q55 20 55 25 L55 40 Q55 45 50 45 L30 45 Q25 45 25 40 Z" fill="#374151" stroke="#4b5563"/>
      {/* Dress skirt */}
      <path d="M25 40 Q25 45 30 45 L50 45 Q55 45 55 40 L60 70 Q60 75 55 75 L25 75 Q20 75 20 70 Z" fill="#374151" stroke="#4b5563"/>
      {/* Belt */}
      <rect x="25" y="42" width="30" height="3" fill="#6b7280"/>
      {/* Heels */}
      <rect x="28" y="75" width="6" height="12" fill="#000"/>
      <rect x="46" y="75" width="6" height="12" fill="#000"/>
      <rect x="26" y="87" width="10" height="3" fill="#000"/>
      <rect x="44" y="87" width="10" height="3" fill="#000"/>
    </svg>
  );

  const CowboyOutfit = () => (
    <svg width="80" height="120" viewBox="0 0 80 120" className="mx-auto">
      {/* Cowboy shirt */}
      <rect x="25" y="25" width="30" height="35" fill="#4a90e2" stroke="#357abd"/>
      {/* Shirt collar */}
      <path d="M25 25 L30 30 L35 25 L45 25 L50 30 L55 25" fill="none" stroke="#357abd" strokeWidth="1"/>
      {/* Shirt buttons */}
      <circle cx="40" cy="30" r="1" fill="#357abd"/>
      <circle cx="40" cy="35" r="1" fill="#357abd"/>
      <circle cx="40" cy="40" r="1" fill="#357abd"/>
      {/* Jeans */}
      <rect x="25" y="60" width="30" height="40" fill="#2c3e50" stroke="#1a252f"/>
      {/* Belt */}
      <rect x="25" y="58" width="30" height="4" fill="#8b4513"/>
      <rect x="38" y="58" width="4" height="4" fill="#c0c0c0"/>
      {/* Cowboy boots */}
      <path d="M25 100 L25 110 Q25 115 30 115 L35 115 Q40 115 40 110 L40 105 L35 100 Z" fill="#8b4513" stroke="#654321"/>
      <path d="M40 100 L40 110 Q40 115 45 115 L50 115 Q55 115 55 110 L55 105 L50 100 Z" fill="#8b4513" stroke="#654321"/>
      {/* Boot heels */}
      <rect x="27" y="113" width="6" height="3" fill="#654321"/>
      <rect x="42" y="113" width="6" height="3" fill="#654321"/>
    </svg>
  );

  const CowgirlOutfit = () => (
    <svg width="80" height="120" viewBox="0 0 80 120" className="mx-auto">
      {/* Western dress/skirt */}
      <path d="M25 25 Q25 20 30 20 L50 20 Q55 20 55 25 L55 35 Q55 40 50 40 L30 40 Q25 40 25 35 Z" fill="#d4a574" stroke="#b8926a"/>
      {/* Dress skirt */}
      <path d="M25 35 Q25 40 30 40 L50 40 Q55 40 55 35 L58 65 Q58 70 53 70 L27 70 Q22 70 22 65 Z" fill="#d4a574" stroke="#b8926a"/>
      {/* Western details */}
      <path d="M30 25 L50 25" stroke="#b8926a" strokeWidth="0.5"/>
      <circle cx="32" cy="28" r="0.5" fill="#b8926a"/>
      <circle cx="48" cy="28" r="0.5" fill="#b8926a"/>
      {/* Belt */}
      <rect x="25" y="37" width="30" height="3" fill="#8b4513"/>
      <rect x="38" y="37" width="4" height="3" fill="#c0c0c0"/>
      {/* Cowboy boots */}
      <path d="M28 70 L28 85 Q28 90 33 90 L38 90 Q43 90 43 85 L43 80 L38 70 Z" fill="#8b4513" stroke="#654321"/>
      <path d="M43 70 L43 85 Q43 90 48 90 L53 90 Q58 90 58 85 L58 80 L53 70 Z" fill="#8b4513" stroke="#654321"/>
      {/* Boot details */}
      <line x1="33" y1="75" x2="33" y2="85" stroke="#654321" strokeWidth="0.5"/>
      <line x1="48" y1="75" x2="48" y2="85" stroke="#654321" strokeWidth="0.5"/>
      {/* Boot heels */}
      <rect x="30" y="88" width="8" height="3" fill="#654321"/>
      <rect x="45" y="88" width="8" height="3" fill="#654321"/>
    </svg>
  );

  const dressCodeItems = [
    {
      title: "Formal Elegante",
      subtitle: "Opción Clásica",
      men: ["Traje negro o gris oscuro", "Camisa blanca", "Corbata elegante", "Zapatos de vestir"],
      women: ["Vestido midi o largo", "Colores sobrios", "Tacones elegantes", "Accesorios discretos"]
    },
    {
      title: "Estilo Vaquero Chic",
      subtitle: "Opción Alternativa",
      men: ["Camisa elegante", "Jeans oscuros", "Cinturón texano", "Botas vaqueras"],
      women: ["Vestido midi", "Botas texanas", "Accesorios country", "Colores tierra"]
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

        {/* Color palette section */}
        <div className={`transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white p-8 shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-light tracking-[0.2em] text-gray-900 uppercase mb-6 garamond-300">
              Paleta de Colores Sugerida
            </h3>
            
            <div className="flex justify-center items-center space-x-6 mb-6">
              {/* Color swatches */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-900 rounded-full shadow-md mb-2"></div>
                <p className="text-xs text-gray-600 garamond-300">Negro</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full shadow-md mb-2"></div>
                <p className="text-xs text-gray-600 garamond-300">Gris</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full shadow-md mb-2"></div>
                <p className="text-xs text-gray-600 garamond-300">Azul Marino</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-800 rounded-full shadow-md mb-2"></div>
                <p className="text-xs text-gray-600 garamond-300">Verde</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-900 rounded-full shadow-md mb-2"></div>
                <p className="text-xs text-gray-600 garamond-300">Tierra</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 font-light garamond-300 max-w-2xl mx-auto">
              Evita el blanco y colores muy llamativos. Opta por tonos elegantes que complementen la celebración.
            </p>
          </div>
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