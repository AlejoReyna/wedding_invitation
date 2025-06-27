"use client"
import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaGift, FaCreditCard } from 'react-icons/fa';

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
    <section 
      ref={sectionRef}
      className="min-h-screen w-full bg-[#F2F2F2] py-24 px-4 md:px-8 opacity-0 relative"
    >
      <div className="max-w-5xl mx-auto text-gray-800 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase text-[#000000] mb-6 garamond-300">
            MENSAJE & REGALOS
          </h2>
          <div className="w-16 h-px bg-[#B6B09F] mx-auto mb-6"></div>
          <p className="text-base font-light text-[#B6B09F] tracking-wide garamond-300">
            Comparte tus buenos deseos y conoce nuestras sugerencias
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Message Form */}
          <div className="bg-white p-8 shadow-sm border border-[#EAE4D5]/30">
            <div className="flex items-center gap-4 mb-8">
              <FaEnvelope className="text-xl text-[#B6B09F]" />
              <h3 className="text-xl font-light tracking-[0.2em] text-[#000000] uppercase garamond-300">
                Envía un mensaje
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#B6B09F] font-light mb-2 garamond-300">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-[#EAE4D5] focus:outline-none focus:ring-1 focus:ring-[#B6B09F] focus:border-[#B6B09F] transition-all duration-300 bg-white garamond-300"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#B6B09F] font-light mb-2 garamond-300">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[#EAE4D5] focus:outline-none focus:ring-1 focus:ring-[#B6B09F] focus:border-[#B6B09F] transition-all duration-300 bg-white garamond-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#B6B09F] font-light mb-2 garamond-300">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-[#EAE4D5] focus:outline-none focus:ring-1 focus:ring-[#B6B09F] focus:border-[#B6B09F] transition-all duration-300 bg-white resize-none garamond-300"
                  placeholder="Comparte tus buenos deseos..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full py-3 px-6 bg-[#000000] text-white font-light tracking-[0.1em] hover:bg-[#000000]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed garamond-300 uppercase text-sm"
              >
                {formStatus === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
              </button>

              {formStatus === 'success' && (
                <p className="text-green-600 text-center garamond-300">¡Mensaje enviado con éxito!</p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-600 text-center garamond-300">Error al enviar. Intenta de nuevo.</p>
              )}
            </form>
          </div>

          {/* Gift Suggestions */}
          <div className="space-y-8">
            {/* Gift Info Card */}
            <div className="bg-white p-8 shadow-sm border border-[#EAE4D5]/30">
              <div className="flex items-center gap-4 mb-8">
                <FaGift className="text-xl text-[#B6B09F]" />
                <h3 className="text-xl font-light tracking-[0.2em] text-[#000000] uppercase garamond-300">
                  Regalos
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-base font-light text-[#B6B09F] garamond-300 leading-relaxed">
                    Tu presencia es nuestro mejor regalo. Si deseas hacernos un obsequio, 
                    te sugerimos las siguientes opciones:
                  </p>
                </div>

                {/* Option 1: Envelope */}
                <div className="border-l-2 border-[#EAE4D5] pl-6">
                  <h4 className="text-base font-light text-[#000000] mb-2 garamond-300 uppercase tracking-wide">
                    Sobre tradicional
                  </h4>
                  <p className="text-sm text-[#B6B09F] garamond-300">
                    Un sobre con tu contribución será muy apreciado el día de la celebración.
                  </p>
                </div>

                {/* Option 2: Transfer */}
                <div className="border-l-2 border-[#EAE4D5] pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCreditCard className="text-[#B6B09F] text-sm" />
                    <h4 className="text-base font-light text-[#000000] garamond-300 uppercase tracking-wide">
                      Transferencia bancaria
                    </h4>
                  </div>
                  <div className="space-y-1 text-sm text-[#B6B09F] garamond-300">
                    <p><span className="font-medium text-[#000000]">Banco:</span> BBVA</p>
                    <p><span className="font-medium text-[#000000]">Cuenta:</span> 1234 5678 9012 3456</p>
                    <p><span className="font-medium text-[#000000]">CLABE:</span> 012345678901234567</p>
                    <p><span className="font-medium text-[#000000]">Titular:</span> Andrea & Aldo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Note */}
            <div className="bg-[#EAE4D5]/20 p-6 border border-[#EAE4D5]">
              <div className="text-center">
                <p className="text-sm font-light text-[#B6B09F] italic garamond-300 leading-relaxed">
                  &ldquo;El regalo más valioso es compartir este momento especial con nosotros. 
                  Cualquier contribución será destinada a nuestro nuevo hogar.&rdquo;
                </p>
                <div className="w-8 h-px bg-[#B6B09F] mx-auto mt-4"></div>
              </div>
            </div>

            {/* Registry Info */}
            <div className="bg-white p-6 shadow-sm border border-[#EAE4D5]/30">
              <div className="text-center">
                <h4 className="text-base font-light text-[#000000] mb-3 garamond-300 uppercase tracking-wide">
                  Mesa de regalos
                </h4>
                <p className="text-sm text-[#B6B09F] garamond-300 mb-4">
                  También contamos con mesa de regalos en:
                </p>
                <div className="space-y-2 text-sm text-[#B6B09F] garamond-300">
                  <p><span className="font-medium text-[#000000]">Liverpool:</span> Evento #12345</p>
                  <p><span className="font-medium text-[#000000]">Palacio de Hierro:</span> Evento #67890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes push-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-push-up {
          animation: push-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}