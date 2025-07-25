import React, { useState } from 'react';
import { Mail, X, Send, User, MessageSquare, Linkedin, Phone } from 'lucide-react';

export default function SubtleFooter() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Crear el mailto con los datos del formulario
    const subject = `Contacto desde el sitio web - ${formData.name}`;
    const body = `Hola Alexis,\n\nNombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}\n\nSaludos cordiales,\n${formData.name}`;
    const mailtoLink = `mailto:alexis@ejemplo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    setIsFormOpen(false);
  };

  return (
    <>
      <footer className="bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          
          {/* Nombre centrado */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif font-light text-white mb-3 tracking-wide">
              Alexis Reyna
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm font-serif font-light mt-2">
              Creando experiencias digitales únicas
            </p>
          </div>

          {/* Botón de contacto animado */}
          <div className="text-center mb-12">
            <button
              onClick={() => setIsFormOpen(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 border border-gray-600 rounded-full text-gray-300 hover:text-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-800 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
              <Mail className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10" />
              <span className="font-serif font-medium relative z-10">Enviar mensaje</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </button>
          </div>

          {/* Enlaces de contacto sutiles */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <a 
              href="mailto:alexis@ejemplo.com" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <Mail size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-serif font-light hidden sm:inline">alexis@ejemplo.com</span>
            </a>
            
            <a 
              href="tel:+525512345678" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <Phone size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-serif font-light hidden sm:inline">+52 55 1234 5678</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/alexisreyna" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
            >
              <Linkedin size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-serif font-light hidden sm:inline">LinkedIn</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-xs font-serif font-light">
              © 2025 Alexis Reyna • Construyendo el futuro, un proyecto a la vez
            </p>
          </div>
        </div>
      </footer>

      {/* Modal del formulario */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div 
            className={`bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all duration-500 ${
              isFormOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
            }`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Header del formulario */}
            <div className="relative p-8 pb-6">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-slate-500 group-hover:text-slate-700 group-hover:rotate-90 transition-all duration-200" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-light text-slate-800 mb-2">Envíame un mensaje</h3>
                <p className="text-slate-600 text-sm">Me encantaría saber de ti</p>
              </div>
            </div>

            {/* Formulario */}
            <div className="px-8 pb-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <User className="inline w-4 h-4 mr-2" />
                  Tu nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50 focus:bg-white"
                  placeholder="¿Cómo te llamas?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Tu email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50 focus:bg-white"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Tu mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-slate-50 focus:bg-white"
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-medium ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}