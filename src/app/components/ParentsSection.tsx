"use client"
import Image from 'next/image';

export default function ParentsSection() {
  return (
    <section 
      className="min-h-[50vh] w-full py-24 px-4 md:px-8 relative overflow-hidden flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #fbf9f6 0%, #f8f6f3 35%, #f5f2ee 70%, #f9f7f4 100%)'
      }}
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(196, 152, 91, 0.15) 0%, transparent 60%),
                              radial-gradient(circle at 70% 60%, rgba(139, 115, 85, 0.12) 0%, transparent 60%),
                              radial-gradient(circle at 50% 90%, rgba(180, 147, 113, 0.1) 0%, transparent 60%)`
          }}
        />
      </div>
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="galleryPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path 
                d="M20,20 Q40,30 60,20 Q80,10 100,25" 
                stroke="#8B7355" 
                strokeWidth="0.5" 
                fill="none" 
                opacity="0.3"
              />
              <circle cx="30" cy="25" r="1" fill="#C4985B" opacity="0.2"/>
              <circle cx="70" cy="22" r="0.8" fill="#9B8366" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#galleryPattern)"/>
        </svg>
      </div>

      <div className="text-center z-10">
        <div className="mb-8">
          <Image src="/aa-logo.png" alt="Logo" width={100} height={100} className="mx-auto" />
        </div>
        <p className="text-lg md:text-xl font-light tracking-[0.1em] uppercase mb-8 text-[#8B7355] italic garamond-300 max-w-2xl mx-auto">
          Con el amor y la bendición de Dios & de nuestros padres
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-semibold tracking-widest uppercase text-[#5c5c5c] mb-4 garamond-300">Papás de la Novia</h3>
            <p className="text-lg text-stone-600 garamond-300">Guillero Alejandro Reyna Muñoz</p>
            <p className="text-lg text-stone-600 garamond-300">Norma Irene Sánchez Ibarra</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold tracking-widest uppercase text-[#5c5c5c] mb-4 garamond-300">Papás del Novio</h3>
            <p className="text-lg text-stone-600 garamond-300">Aldo Rene Berlanga Soto</p>
            <p className="text-lg text-stone-600 garamond-300">Silvia Mendoza Arizpe</p>
          </div>
        </div>
      </div>
    </section>
  );
} 