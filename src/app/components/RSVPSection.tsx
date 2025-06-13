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
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-stone-100 py-24 px-4 md:px-8 opacity-0 relative overflow-hidden"
    >
      {/* Subtle wedding & celebration elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Hearts - visible but subtle */}
        <div className="absolute top-24 left-16 text-slate-400/60 text-3xl transform rotate-12">♡</div>
        <div className="absolute top-60 right-20 text-stone-500/50 text-2xl transform -rotate-6">♡</div>
        <div className="absolute bottom-40 left-24 text-slate-500/55 text-2xl transform rotate-45">♡</div>
        
        {/* Rings - more visible circles */}
        <div className="absolute top-32 right-12 w-12 h-12 border-2 border-slate-300/50 rounded-full"></div>
        <div className="absolute top-36 right-16 w-8 h-8 border border-stone-400/45 rounded-full"></div>
        
        {/* Musical notes - celebration */}
        <div className="absolute top-80 left-8 text-slate-400/55 text-2xl transform rotate-12">♪</div>
        <div className="absolute bottom-60 right-8 text-stone-500/50 text-xl transform -rotate-12">♫</div>
        
        {/* Champagne bubbles - bigger and more visible */}
        <div className="absolute top-44 left-32 w-4 h-4 bg-slate-400/40 rounded-full"></div>
        <div className="absolute top-52 left-28 w-5 h-5 bg-stone-500/35 rounded-full"></div>
        <div className="absolute top-36 left-36 w-3 h-3 bg-slate-300/45 rounded-full"></div>
        <div className="absolute bottom-72 right-40 w-3 h-3 bg-stone-400/40 rounded-full"></div>
        <div className="absolute bottom-80 right-44 w-2 h-2 bg-slate-400/50 rounded-full"></div>
        
        {/* Confetti dots - more visible */}
        <div className="absolute bottom-32 right-32 w-2 h-2 bg-slate-500/60 rounded-full"></div>
        <div className="absolute bottom-36 right-28 w-3 h-3 bg-stone-400/55 rounded-full"></div>
        <div className="absolute bottom-28 right-36 w-2 h-2 bg-slate-400/50 rounded-full"></div>
        
        {/* Delicate flourishes - bigger and more visible */}
        <div className="absolute top-16 right-40 text-slate-400/60 text-lg transform rotate-45">✦</div>
        <div className="absolute bottom-16 left-40 text-stone-500/55 text-lg transform -rotate-30">✦</div>
        <div className="absolute top-72 right-60 text-slate-300/50 text-sm transform rotate-30">✦</div>
        
        {/* Additional wedding elements */}
        <div className="absolute top-48 left-8 text-stone-400/45 text-lg transform rotate-15">🕊</div>
        <div className="absolute bottom-48 right-16 text-slate-400/50 text-xl transform -rotate-20">🌿</div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.15em] text-slate-800 mb-6 leading-tight">
            Confirmación de Asistencia
          </h2>
          <div className="w-16 h-px bg-slate-400 mx-auto mb-4"></div>
          <p className="text-slate-600 font-light text-lg max-w-md mx-auto leading-relaxed">
            Tu presencia haría este momento aún más especial para nosotros
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
          
          {/* Content */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-light text-slate-700 leading-relaxed">
                Te esperamos para celebrar juntos
              </h3>
              <p className="text-slate-500 font-light leading-relaxed max-w-lg mx-auto">
                Por favor, confirma tu asistencia para poder preparar todo con el cuidado que mereces
              </p>
            </div>

            {/* RSVP Button */}
            <div className="pt-4">
              <button 
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-slate-700 text-white rounded-xl text-lg font-light tracking-wide hover:bg-slate-800 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(51,65,85,0.25)] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white overflow-hidden"
                onClick={() => {
                  // TODO: Implement WhatsApp integration
                  console.log('WhatsApp button clicked');
                }}
              >
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <FaWhatsapp className="text-xl relative z-10" />
                <span className="relative z-10">Confirmar Asistencia</span>
              </button>
            </div>

            {/* Additional info */}
            <div className="pt-6 border-t border-slate-200/50">
              <p className="text-sm text-slate-400 font-light">
                Responderemos a la brevedad para coordinar los detalles
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-px bg-slate-300"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <div className="w-8 h-px bg-slate-300"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}