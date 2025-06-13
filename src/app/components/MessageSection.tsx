"use client"
import { useEffect, useRef, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

export default function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-push-up');
          }
        });
      },
      {
        threshold: 0.4,
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
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-[#FFF5E6] py-20 px-4 md:px-8 opacity-0 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[url('/floral-pattern.png')] opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-[url('/floral-pattern.png')] opacity-10 rotate-180"></div>

      <div className="max-w-4xl mx-auto text-gray-800 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.3em] uppercase text-gray-900 mb-4">
            Mensaje
          </h2>
          <div className="w-24 h-1 bg-[#D4B996] mx-auto"></div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] shadow-lg border border-[#D4B996]/30">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#D4B996]/10 p-3 rounded-full">
              <FaEnvelope className="text-2xl text-[#D4B996]" />
            </div>
            <h3 className="text-2xl font-light tracking-wider text-gray-900">Envía un mensaje</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-light mb-2">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#D4B996]/30 focus:outline-none focus:ring-2 focus:ring-[#D4B996]/50 transition-all duration-300 bg-white/50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-light mb-2">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#D4B996]/30 focus:outline-none focus:ring-2 focus:ring-[#D4B996]/50 transition-all duration-300 bg-white/50"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-light mb-2">Mensaje</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-[#D4B996]/30 focus:outline-none focus:ring-2 focus:ring-[#D4B996]/50 transition-all duration-300 bg-white/50 resize-none"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="w-full py-4 px-8 bg-[#D4B996] text-white rounded-lg font-light tracking-wider hover:bg-[#D4B996]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </button>

            {formStatus === 'success' && (
              <p className="text-green-600 text-center">¡Mensaje enviado con éxito!</p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-600 text-center">Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes push-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-push-up {
          animation: push-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
} 