import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Se activa cuando el 30% del footer es visible
        rootMargin: '0px 0px -50px 0px' // Se activa un poco antes
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [isVisible]);

  return (
    <footer ref={footerRef} className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-16 pb-8">
        {/* Contenido principal minimalista */}
        <div className="text-center space-y-8">
          {/* Nombres con tipografía elegante */}
          <div>
            <p className={`text-white/70 text-sm md:text-base leading-relaxed font-light mb-4 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Diseño y código elaborado por:
            </p>
            <h2 className={`garamond-300 text-3xl md:text-4xl text-white mb-3 tracking-wider transition-all duration-800 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Alexis Reyna
            </h2>
            <div className={`h-px bg-white/30 mx-auto transition-all duration-600 delay-1000 ${
              isVisible ? 'w-16' : 'w-0'
            }`}></div>
          </div>

          {/* Iconos sociales */}
          <div className={`flex justify-center gap-6 transition-all duration-800 delay-[1500ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <a 
              href="https://github.com/alexisreyna" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            
            <a 
              href="https://linkedin.com/in/alexisreyna" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            
            <a 
              href="https://wa.me/525512345678" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright minimalista */}
      <div className={`border-t border-white/10 py-4 transition-all duration-800 delay-[3000ms] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}>
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-center text-white/40 text-xs font-light">
            © 2025 MIT License: If you like this code, you can use it freely
          </p>
        </div>
      </div>
    </footer>
  );
}