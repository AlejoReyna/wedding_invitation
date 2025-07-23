"use client"
import { FaPenFancy } from 'react-icons/fa';

// Componente MessageCard adaptado al estilo RSVP
export default function MessageSection({ className }: { className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-elegant hover:shadow-elegant-hover hover:border-white/40 transition-all duration-700 transform hover:-translate-y-2 ${className}`}>
      
      {/* Content Section */}
      <div className="p-8 md:p-10 relative">
        
        {/* Decorative Element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-white/30"></div>
        
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-wide text-center garamond-300">
          Mensaje
        </h3>
        
        {/* Subtitle */}
        <p className="text-white/80 text-sm font-light tracking-[0.15em] uppercase mb-6 text-center">
          Comparte tus buenos deseos
        </p>
        
        {/* Divider */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-8 h-px bg-white/30"></div>
          <div className="w-2 h-2 border border-white/30 transform rotate-45 mx-4"></div>
          <div className="w-8 h-px bg-white/30"></div>
        </div>
        
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-light text-white/80 mb-2 tracking-[0.1em] uppercase">
              Nombre
            </label>
            <input 
              type="text" 
              placeholder="Tu nombre completo"
              className="w-full p-3 border border-white/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:border-white/50 transition-all duration-300 text-white placeholder-white/50"
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-white/80 mb-2 tracking-[0.1em] uppercase">
              Correo electrónico
            </label>
            <input 
              type="email" 
              placeholder="tu@email.com"
              className="w-full p-3 border border-white/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:border-white/50 transition-all duration-300 text-white placeholder-white/50"
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-white/80 mb-2 tracking-[0.1em] uppercase">
              Mensaje
            </label>
            <textarea 
              rows={4}
              placeholder="Comparte tus buenos deseos y bendiciones para nuestra nueva vida juntos..."
              className="w-full p-3 border border-white/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:border-white/50 transition-all duration-300 resize-none text-white placeholder-white/50"
            />
          </div>
          
          <div className="pt-2">
            <button className="group/btn inline-flex items-center gap-3 px-6 py-3 border border-white/30 hover:border-white/50 text-white hover:text-white transition-all duration-400 relative overflow-hidden w-full justify-center">
              <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400"></div>
              <FaPenFancy className="text-sm relative z-10 transform group-hover/btn:rotate-12 transition-transform duration-300" />
              <span className="font-light tracking-[0.1em] uppercase text-xs relative z-10">Enviar Mensaje</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.3),
            0 20px 25px -5px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        .shadow-elegant-hover {
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.4),
            0 25px 50px -12px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}