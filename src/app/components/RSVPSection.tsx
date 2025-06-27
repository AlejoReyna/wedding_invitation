"use client"
import { useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function RSVPSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
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

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-[#F2F2F2] flex items-center justify-center px-4 opacity-0 relative overflow-hidden"
    >
      {/* Subtle wedding elements in background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hearts - very subtle */}
        <div className="absolute top-[15%] left-[10%] text-[#EAE4D5] text-2xl opacity-30">♡</div>
        <div className="absolute top-[25%] right-[15%] text-[#B6B09F] text-xl opacity-25">♡</div>
        <div className="absolute bottom-[20%] left-[20%] text-[#EAE4D5] text-lg opacity-20">♡</div>
        <div className="absolute bottom-[30%] right-[12%] text-[#B6B09F] text-2xl opacity-25">♡</div>
        
        {/* Rings */}
        <div className="absolute top-[35%] left-[8%] w-8 h-8 border border-[#EAE4D5] rounded-full opacity-20"></div>
        <div className="absolute top-[40%] left-[12%] w-5 h-5 border border-[#B6B09F] rounded-full opacity-25"></div>
        <div className="absolute bottom-[40%] right-[8%] w-6 h-6 border border-[#EAE4D5] rounded-full opacity-20"></div>
        
        {/* Delicate dots */}
        <div className="absolute top-[60%] left-[25%] w-2 h-2 bg-[#B6B09F] rounded-full opacity-20"></div>
        <div className="absolute top-[70%] right-[30%] w-1.5 h-1.5 bg-[#EAE4D5] rounded-full opacity-25"></div>
        <div className="absolute bottom-[60%] left-[15%] w-1 h-1 bg-[#B6B09F] rounded-full opacity-15"></div>
        <div className="absolute bottom-[50%] right-[20%] w-2 h-2 bg-[#EAE4D5] rounded-full opacity-20"></div>
        
        {/* Stars/flourishes */}
        <div className="absolute top-[45%] right-[25%] text-[#B6B09F] text-sm opacity-20">✦</div>
        <div className="absolute bottom-[45%] left-[30%] text-[#EAE4D5] text-xs opacity-25">✦</div>
        <div className="absolute top-[55%] left-[5%] text-[#B6B09F] text-xs opacity-15">✦</div>
        
        {/* Additional subtle elements */}
        <div className="absolute top-[80%] right-[5%] text-[#EAE4D5] text-lg opacity-20">🕊</div>
        <div className="absolute bottom-[80%] left-[35%] text-[#B6B09F] text-sm opacity-15">🌿</div>
        <div className="absolute top-[20%] left-[40%] text-[#EAE4D5] text-xs opacity-20">♪</div>
        <div className="absolute bottom-[25%] right-[35%] text-[#B6B09F] text-xs opacity-15">♫</div>
      </div>

      {/* Main content - centered */}
      <div className="text-center relative z-10 max-w-lg mx-auto">
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-[#000000] mb-12 garamond-300 leading-relaxed">
          CONFIRMA TU ASISTENCIA
        </h2>
        
        <button 
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#000000] text-white font-light tracking-[0.1em] hover:bg-[#000000]/90 transition-all duration-300 garamond-300 uppercase text-sm group"
          onClick={() => {
            window.open('https://wa.me/528123456789?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20Andrea%20y%20Aldo', '_blank');
          }}
        >
          <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform duration-300" />
          <span>Confirmar por WhatsApp</span>
        </button>
      </div>

      <style jsx>{`
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
        }
      `}</style>
    </section>
  );
}