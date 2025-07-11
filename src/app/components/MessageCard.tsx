"use client"
import { useState } from 'react';
import { FaHeart, FaEnvelope } from 'react-icons/fa';

interface MessageCardProps {
  className?: string;
}

export default function MessageCard({ className = '' }: MessageCardProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'fcf764d7-a6dc-4846-843e-a591e89d60a8',
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    }
    catch(error){
      console.error('Error al enviar el mensaje:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Decorative background elements */}
      <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#d5b7af]/20 to-[#c59c8e]/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#b97a5d]/20 to-[#845845]/20 rounded-full blur-xl"></div>
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-[0_20px_50px_rgba(133,88,69,0.15)] border border-[#d5b7af]/30 overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d5b7af]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#c59c8e]/10 to-transparent rounded-full transform -translate-x-6 translate-y-6"></div>
        
        {/* Decorative header elements */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#b97a5d] to-transparent"></div>
            <div className="relative">
              <FaHeart className="text-2xl text-[#b97a5d] drop-shadow-sm" />
              <div className="absolute inset-0 animate-pulse">
                <FaHeart className="text-2xl text-[#d5b7af]/50" />
              </div>
            </div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#b97a5d] to-transparent"></div>
          </div>
          
          <p className="text-center text-sm text-[#845845]/70 garamond-300 font-light italic">
            Comparte tus buenos deseos con nosotros
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block text-[#707556] font-light mb-3 garamond-300 text-sm tracking-wide">
                Nombre
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-[#d5b7af]/30 focus:outline-none focus:border-[#b97a5d] focus:ring-4 focus:ring-[#d5b7af]/20 transition-all duration-300 bg-white/80 garamond-300 text-[#707556] placeholder-[#c59c8e]/60"
                  placeholder="Tu nombre completo"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d5b7af]/5 to-[#c59c8e]/5 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-[#707556] font-light mb-3 garamond-300 text-sm tracking-wide">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-[#d5b7af]/30 focus:outline-none focus:border-[#b97a5d] focus:ring-4 focus:ring-[#d5b7af]/20 transition-all duration-300 bg-white/80 garamond-300 text-[#707556] placeholder-[#c59c8e]/60"
                  placeholder="tu@email.com"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d5b7af]/5 to-[#c59c8e]/5 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-[#707556] font-light mb-3 garamond-300 text-sm tracking-wide">
                Mensaje
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-[#d5b7af]/30 focus:outline-none focus:border-[#b97a5d] focus:ring-4 focus:ring-[#d5b7af]/20 transition-all duration-300 bg-white/80 resize-none garamond-300 text-[#707556] placeholder-[#c59c8e]/60"
                  placeholder="Comparte tus buenos deseos y bendiciones para nuestra nueva vida juntos..."
                ></textarea>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d5b7af]/5 to-[#c59c8e]/5 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="group relative w-full py-4 px-8 bg-gradient-to-r from-[#845845] to-[#b97a5d] text-white font-light tracking-[0.1em] rounded-2xl hover:from-[#707556] hover:to-[#845845] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed garamond-300 uppercase text-sm shadow-[0_10px_30px_rgba(133,88,69,0.3)] hover:shadow-[0_15px_40px_rgba(112,117,86,0.4)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                <FaEnvelope className="text-sm" />
                <span>{formStatus === 'loading' ? 'Enviando...' : 'Enviar mensaje'}</span>
              </div>
            </button>
          </div>

          {/* Status messages */}
          <div className="min-h-[24px] flex items-center justify-center">
            {formStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full garamond-300 text-sm">
                <FaHeart className="text-xs" />
                <span>¡Mensaje enviado con éxito!</span>
              </div>
            )}
            {formStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full garamond-300 text-sm">
                <span>Error al enviar. Intenta de nuevo.</span>
              </div>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}