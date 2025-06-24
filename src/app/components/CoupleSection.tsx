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
      className="min-h-screen bg-[#ffdcbc] w-full py-32 px-4 md:px-8 opacity-0 relative overflow-hidden"
    >
      {/* Floral Border Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          {/* Define the rose pattern */}
          <pattern id="floralPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <g opacity="0.15">
              {/* Main Rose */}
              <g transform="translate(50,50)">
                {/* Center of rose */}
                <circle cx="0" cy="0" r="4" fill="#d97706" opacity="0.4"/>
                
                {/* Inner petals - spiral pattern */}
                <path d="M 0,-5 Q -5,-8 -5,-3 Q -8,3 -3,5 Q 3,8 5,3 Q 8,-3 3,-5 Q 0,-8 0,-5" 
                      fill="none" stroke="#b45309" strokeWidth="1.5"/>
                
                {/* Middle layer petals */}
                <path d="M 0,-10 Q -8,-15 -10,-5 Q -15,5 -5,10 Q 5,15 10,5 Q 15,-5 5,-10 Q 0,-15 0,-10" 
                      fill="none" stroke="#92400e" strokeWidth="1.2"/>
                
                {/* Outer petals */}
                <path d="M 0,-15 Q -12,-20 -15,-8 Q -20,8 -8,15 Q 8,20 15,8 Q 20,-8 8,-15 Q 0,-20 0,-15" 
                      fill="none" stroke="#92400e" strokeWidth="1" opacity="0.8"/>
                
                {/* Outermost petals for fullness */}
                <path d="M 0,-18 Q -15,-25 -18,-10 Q -25,10 -10,18 Q 10,25 18,10 Q 25,-10 10,-18 Q 0,-25 0,-18" 
                      fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.6"/>
              </g>
              
              {/* Rose leaves */}
              <path d="M 50 70 Q 35 75 30 85 Q 35 82 45 78 Q 50 75 50 70" fill="#92400e" opacity="0.2"/>
              <path d="M 50 70 Q 65 75 70 85 Q 65 82 55 78 Q 50 75 50 70" fill="#92400e" opacity="0.2"/>
              
              {/* Small rose buds */}
              <g transform="translate(150,100)">
                <circle cx="0" cy="0" r="2" fill="#d97706" opacity="0.3"/>
                <path d="M 0,-4 Q -4,-6 -4,-2 Q -6,2 -2,4 Q 2,6 4,2 Q 6,-2 2,-4 Q 0,-6 0,-4" 
                      fill="none" stroke="#b45309" strokeWidth="0.8" opacity="0.5"/>
                <path d="M 0,-6 Q -6,-8 -6,-3 Q -8,3 -3,6 Q 3,8 6,3 Q 8,-3 3,-6 Q 0,-8 0,-6" 
                      fill="none" stroke="#92400e" strokeWidth="0.6" opacity="0.4"/>
              </g>
              
              <g transform="translate(100,150)">
                <circle cx="0" cy="0" r="1.5" fill="#fbbf24" opacity="0.3"/>
                <path d="M 0,-3 Q -3,-4 -3,-1 Q -4,1 -1,3 Q 1,4 3,1 Q 4,-1 1,-3 Q 0,-4 0,-3" 
                      fill="none" stroke="#d97706" strokeWidth="0.6" opacity="0.5"/>
              </g>
            </g>
          </pattern>
          
          {/* Corner rose decoration */}
          <g id="cornerFloral">
            <g transform="scale(1.5)">
              {/* Large corner rose */}
              <g>
                {/* Rose center */}
                <circle cx="0" cy="0" r="5" fill="#d97706" opacity="0.3"/>
                
                {/* Layered rose petals */}
                <path d="M 0,-8 Q -8,-12 -8,-4 Q -12,4 -4,8 Q 4,12 8,4 Q 12,-4 4,-8 Q 0,-12 0,-8" 
                      fill="none" stroke="#b45309" strokeWidth="2" opacity="0.4"/>
                
                <path d="M 0,-15 Q -15,-22 -15,-7 Q -22,7 -7,15 Q 7,22 15,7 Q 22,-7 7,-15 Q 0,-22 0,-15" 
                      fill="none" stroke="#92400e" strokeWidth="1.8" opacity="0.35"/>
                
                <path d="M 0,-22 Q -22,-30 -22,-10 Q -30,10 -10,22 Q 10,30 22,10 Q 30,-10 10,-22 Q 0,-30 0,-22" 
                      fill="none" stroke="#92400e" strokeWidth="1.5" opacity="0.3"/>
                
                <path d="M 0,-28 Q -28,-38 -28,-14 Q -38,14 -14,28 Q 14,38 28,14 Q 38,-14 14,-28 Q 0,-38 0,-28" 
                      fill="none" stroke="#d97706" strokeWidth="1.2" opacity="0.25"/>
              </g>
              
              {/* Decorative vine swirls */}
              <path d="M 30 0 Q 35 -5, 45 -3 Q 55 0, 60 5 Q 65 10, 70 8" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.2"/>
              <path d="M 0 30 Q -5 35, -3 45 Q 0 55, 5 60 Q 10 65, 8 70" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.2"/>
              
              {/* Small accent rose buds */}
              <g transform="translate(35,35)">
                <circle cx="0" cy="0" r="3" fill="#d97706" opacity="0.25"/>
                <path d="M 0,-5 Q -5,-7 -5,-2 Q -7,2 -2,5 Q 2,7 5,2 Q 7,-2 2,-5 Q 0,-7 0,-5" 
                      fill="none" stroke="#b45309" strokeWidth="1" opacity="0.3"/>
              </g>
              
              <g transform="translate(-35,35)">
                <circle cx="0" cy="0" r="2" fill="#fbbf24" opacity="0.25"/>
                <path d="M 0,-3 Q -3,-4 -3,-1 Q -4,1 -1,3 Q 1,4 3,1 Q 4,-1 1,-3 Q 0,-4 0,-3" 
                      fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.3"/>
              </g>
            </g>
          </g>
        </defs>
        
        {/* Apply pattern to borders */}
        <rect x="0" y="0" width="100%" height="80" fill="url(#floralPattern)"/>
        <rect x="0" y="calc(100% - 80px)" width="100%" height="80" fill="url(#floralPattern)"/>
        <rect x="0" y="0" width="80" height="100%" fill="url(#floralPattern)"/>
        <rect x="calc(100% - 80px)" y="0" width="80" height="100%" fill="url(#floralPattern)"/>
        
        {/* Corner decorations */}
        <use href="#cornerFloral" x="50" y="50"/>
        <use href="#cornerFloral" x="calc(100% - 50px)" y="50" transform="scale(-1, 1)" transformOrigin="center"/>
        <use href="#cornerFloral" x="50" y="calc(100% - 50px)" transform="scale(1, -1)" transformOrigin="center"/>
        <use href="#cornerFloral" x="calc(100% - 50px)" y="calc(100% - 50px)" transform="scale(-1, -1)" transformOrigin="center"/>
      </svg>

      {/* Decorative elements - Updated with floral touches */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-amber-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-amber-200 rounded-full opacity-20"></div>
        
        {/* Additional floral accents */}
        <svg className="absolute top-40 right-20 w-16 h-16 opacity-20">
          <g transform="translate(8,8)">
            <circle cx="0" cy="0" r="2" fill="#d97706" opacity="0.4"/>
            <path d="M 0,-3 Q -3,-4 -3,-1 Q -4,1 -1,3 Q 1,4 3,1 Q 4,-1 1,-3 Q 0,-4 0,-3" 
                  fill="none" stroke="#b45309" strokeWidth="0.8"/>
            <path d="M 0,-5 Q -5,-7 -5,-2 Q -7,2 -2,5 Q 2,7 5,2 Q 7,-2 2,-5 Q 0,-7 0,-5" 
                  fill="none" stroke="#92400e" strokeWidth="0.6" opacity="0.7"/>
          </g>
        </svg>
        
        <svg className="absolute bottom-40 left-20 w-20 h-20 opacity-15">
          <g transform="translate(10,10)">
            <circle cx="0" cy="0" r="3" fill="#b45309" opacity="0.3"/>
            <path d="M 0,-4 Q -4,-6 -4,-2 Q -6,2 -2,4 Q 2,6 4,2 Q 6,-2 2,-4 Q 0,-6 0,-4" 
                  fill="none" stroke="#d97706" strokeWidth="1"/>
            <path d="M 0,-7 Q -7,-10 -7,-3 Q -10,3 -3,7 Q 3,10 7,3 Q 10,-3 3,-7 Q 0,-10 0,-7" 
                  fill="none" stroke="#92400e" strokeWidth="0.8" opacity="0.8"/>
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section with floral accent */}
        <div className="text-center mb-100">
          <div className="inline-block relative">
            {/* Floral decoration above title */}
            <svg className="w-32 h-12 mx-auto mb-4 opacity-30">
              <g transform="translate(16,6)">
                <circle cx="0" cy="0" r="1.5" fill="#d97706" opacity="0.4"/>
                <path d="M 0,-2 Q -2,-3 -2,-1 Q -3,1 -1,2 Q 1,3 2,1 Q 3,-1 1,-2 Q 0,-3 0,-2" 
                      fill="none" stroke="#b45309" strokeWidth="0.6"/>
              </g>
              <path d="M 24 6 Q 32 3, 40 6 Q 48 3, 56 6" fill="none" stroke="#92400e" strokeWidth="0.8"/>
              <g transform="translate(48,6)">
                <circle cx="0" cy="0" r="2" fill="#fbbf24" opacity="0.3"/>
                <path d="M 0,-3 Q -3,-4 -3,-1 Q -4,1 -1,3 Q 1,4 3,1 Q 4,-1 1,-3 Q 0,-4 0,-3" 
                      fill="none" stroke="#d97706" strokeWidth="0.7"/>
              </g>
              <path d="M 56 6 Q 64 3, 72 6 Q 80 3, 88 6" fill="none" stroke="#92400e" strokeWidth="0.8"/>
              <g transform="translate(80,6)">
                <circle cx="0" cy="0" r="1.5" fill="#d97706" opacity="0.4"/>
                <path d="M 0,-2 Q -2,-3 -2,-1 Q -3,1 -1,2 Q 1,3 2,1 Q 3,-1 1,-2 Q 0,-3 0,-2" 
                      fill="none" stroke="#b45309" strokeWidth="0.6"/>
              </g>
              <path d="M 88 6 Q 96 3, 104 6" fill="none" stroke="#92400e" strokeWidth="0.8"/>
            </svg>
            
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-amber-800 mb-6">
              Nuestra Historia
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto"></div>
            
            {/* Floral decoration below title */}
            <svg className="w-32 h-12 mx-auto mt-4 opacity-30">
              <g transform="translate(16,6)">
                <circle cx="0" cy="0" r="1.5" fill="#fbbf24" opacity="0.3"/>
                <path d="M 0,-2 Q -2,-3 -2,-1 Q -3,1 -1,2 Q 1,3 2,1 Q 3,-1 1,-2 Q 0,-3 0,-2" 
                      fill="none" stroke="#d97706" strokeWidth="0.6"/>
              </g>
              <path d="M 24 6 Q 32 9, 40 6 Q 48 9, 56 6" fill="none" stroke="#b45309" strokeWidth="0.8"/>
              <g transform="translate(48,6)">
                <circle cx="0" cy="0" r="2.5" fill="#d97706" opacity="0.3"/>
                <path d="M 0,-3 Q -3,-5 -3,-1 Q -5,1 -1,3 Q 1,5 3,1 Q 5,-1 1,-3 Q 0,-5 0,-3" 
                      fill="none" stroke="#92400e" strokeWidth="0.8"/>
                <path d="M 0,-5 Q -5,-7 -5,-2 Q -7,2 -2,5 Q 2,7 5,2 Q 7,-2 2,-5 Q 0,-7 0,-5" 
                      fill="none" stroke="#b45309" strokeWidth="0.6" opacity="0.7"/>
              </g>
              <path d="M 56 6 Q 64 9, 72 6 Q 80 9, 88 6" fill="none" stroke="#b45309" strokeWidth="0.8"/>
              <g transform="translate(80,6)">
                <circle cx="0" cy="0" r="1.5" fill="#fbbf24" opacity="0.3"/>
                <path d="M 0,-2 Q -2,-3 -2,-1 Q -3,1 -1,2 Q 1,3 2,1 Q 3,-1 1,-2 Q 0,-3 0,-2" 
                      fill="none" stroke="#d97706" strokeWidth="0.6"/>
              </g>
              <path d="M 88 6 Q 96 9, 104 6" fill="none" stroke="#b45309" strokeWidth="0.8"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Story Content */}
          <div className="space-y-8 animate-fade-in-up order-1 lg:order-2">
            <div className="space-y-6">
              
              
              <div className="w-12 h-px bg-amber-600"></div>
              
              <div className="space-y-6 mx-6 text-amber-900 leading-relaxed">
                <p className="text-lg font-light">
                  Lo que comenzó como una casualidad se convirtió en la historia más hermosa que podíamos haber imaginado. Entre conversaciones que se extendían hasta el amanecer, descubrimos que compartíamos más que sueños: compartíamos una visión del amor.
                </p>
                
                <p className="text-lg font-light">
                  Cada día juntos ha sido una confirmación de que el destino tiene sus propios planes. Ahora, listos para escribir nuestro próximo capítulo, queremos celebrar este nuevo comienzo con quienes han sido parte de nuestra historia.
                </p>
              </div>
              
              {/* Signature element with floral touch */}
              <div className="pt-8">
                <div className="flex items-center justify-center space-x-4">
                  <svg className="w-8 h-8 opacity-30">
                    <g transform="translate(4,4)">
                      <circle cx="0" cy="0" r="1.5" fill="#d97706" opacity="0.4"/>
                      <path d="M 0,-2 Q -2,-3 -2,-1 Q -3,1 -1,2 Q 1,3 2,1 Q 3,-1 1,-2 Q 0,-3 0,-2" 
                            fill="none" stroke="#b45309" strokeWidth="0.8"/>
                    </g>
                  </svg>
                  <div className="text-2xl font-serif text-amber-700">A</div>
                  <div className="w-8 h-px bg-amber-500"></div>
                  <div className="text-sm tracking-[0.2em] text-amber-700 uppercase">y</div>
                  <div className="w-8 h-px bg-amber-500"></div>
                  <div className="text-2xl font-serif text-amber-700">A</div>
                  <svg className="w-8 h-8 opacity-30">
                    <g transform="translate(4,4)">
                      <circle cx="0" cy="0" r="1.5" fill="#d97706" opacity="0.4"/>
                      <path d="M 0,-2 Q -2,-3 -2,-1 Q -3,1 -1,2 Q 1,3 2,1 Q 3,-1 1,-2 Q 0,-3 0,-2" 
                            fill="none" stroke="#b45309" strokeWidth="0.8"/>
                    </g>
                  </svg>
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

        {/* Bottom Quote with floral frame */}
        <div className="text-center mt-24 animate-fade-in-up">
          <div className="max-w-2xl mx-auto relative">
            {/* Floral frame around quote */}
            <svg className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-full h-24 opacity-20">
              <path d="M 50 0 Q 100 10, 150 0 Q 200 10, 250 0 Q 300 10, 350 0" fill="none" stroke="#92400e" strokeWidth="1"/>
              <g transform="translate(100,5)">
                <circle cx="0" cy="0" r="2" fill="#d97706" opacity="0.4"/>
                <path d="M 0,-3 Q -3,-4 -3,-1 Q -4,1 -1,3 Q 1,4 3,1 Q 4,-1 1,-3 Q 0,-4 0,-3" 
                      fill="none" stroke="#b45309" strokeWidth="0.8"/>
              </g>
              <g transform="translate(200,5)">
                <circle cx="0" cy="0" r="2.5" fill="#fbbf24" opacity="0.3"/>
                <path d="M 0,-4 Q -4,-6 -4,-2 Q -6,2 -2,4 Q 2,6 4,2 Q 6,-2 2,-4 Q 0,-6 0,-4" 
                      fill="none" stroke="#92400e" strokeWidth="1"/>
              </g>
              <g transform="translate(300,5)">
                <circle cx="0" cy="0" r="2" fill="#d97706" opacity="0.4"/>
                <path d="M 0,-3 Q -3,-4 -3,-1 Q -4,1 -1,3 Q 1,4 3,1 Q 4,-1 1,-3 Q 0,-4 0,-3" 
                      fill="none" stroke="#b45309" strokeWidth="0.8"/>
              </g>
            </svg>
            
            <div className="text-6xl text-amber-300 font-serif leading-none mb-4">"</div>

            <div className="w-16 h-px bg-amber-500 mx-auto mt-6"></div>
            
            {/* Bottom floral accent */}
           
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