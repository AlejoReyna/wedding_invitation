"use client"
import { useState } from 'react';
import { FaHeart, FaEnvelope } from 'react-icons/fa';

// Web3Forms configuration
const WEB3FORMS_ACCESS_KEY = 'fcf764d7-a6dc-4846-843e-a591e89d60a8';

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
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          subject: 'Nuevo mensaje de invitación de boda',
          from_name: formData.get('name'),
          replyto: formData.get('email')
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setFormStatus('success');
        form.reset();
        // Reset form status after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        console.error('Web3Forms error:', result);
        // Reset error status after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Form submission error:', error);
      // Reset error status after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className={`group ${className}`}>
      <div className="bg-white overflow-hidden border-l-4 border-[#d5b7af] shadow-elegant hover:shadow-elegant-hover hover:border-[#b97a5d] transition-all duration-700 transform hover:-translate-y-2">
        
        {/* Content Section */}
        <div className="p-10 md:p-12 relative">
          
          {/* Decorative Element */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-[#c59c8e]"></div>
          
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-light text-[#707556] mb-6 tracking-wide" style={{fontFamily: 'Georgia, serif'}}>
              Mensaje
            </h3>
            
            {/* Subtitle */}
            <div className="mb-8">
              <p className="text-[#845845]/80 text-2xl tracking-[0.15em] font-light garamond-300">
                Comparte tus buenos deseos
              </p>
            </div>
            

          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Hidden access key field for Web3Forms */}
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="Nuevo mensaje de invitación de boda" />
            <input type="hidden" name="from_name" value="Formulario de Invitación de Boda" />
            
            <div className="space-y-6">
              <div className="group/input">
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
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d5b7af]/5 to-[#c59c8e]/5 pointer-events-none opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className="group/input">
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
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d5b7af]/5 to-[#c59c8e]/5 pointer-events-none opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className="group/input">
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
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d5b7af]/5 to-[#c59c8e]/5 pointer-events-none opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="group/btn w-full inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#c59c8e] hover:border-[#b97a5d] text-[#707556] hover:text-[#845845] transition-all duration-400 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-[#d5b7af]/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400"></div>
                <FaEnvelope className="text-lg relative z-10 transform group-hover/btn:rotate-12 transition-transform duration-300" />
                <span className="font-light tracking-[0.1em] uppercase text-sm relative z-10 garamond-300">
                  {formStatus === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                </span>
              </button>
            </div>

            {/* Status messages */}
            <div className="min-h-[24px] flex items-center justify-center pt-4">
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
      </div>

      <style jsx>{`
        .shadow-elegant {
          box-shadow: 
            0 4px 6px -1px rgba(133, 88, 69, 0.1),
            0 20px 25px -5px rgba(133, 88, 69, 0.1),
            0 0 0 1px rgba(133, 88, 69, 0.05);
        }
        
        .shadow-elegant-hover {
          box-shadow: 
            0 10px 15px -3px rgba(133, 88, 69, 0.1),
            0 25px 50px -12px rgba(133, 88, 69, 0.15),
            0 0 0 1px rgba(133, 88, 69, 0.05);
        }
      `}</style>
    </div>
  );
}