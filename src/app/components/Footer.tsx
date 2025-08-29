import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, MessageCircle, ArrowRight } from 'lucide-react';

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
        {/* Grid layout: Logo left, CTA right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Brand/Logo */}
          <div className={`transition-all duration-800 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-4">
              Diseño y código elaborado por:
            </p>
            <h2 className="text-3xl md:text-4xl mb-3 tracking-tight font-mono font-light">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                Alexis Reyna
              </span>
            </h2>
            <div className="text-sm text-gray-400 uppercase tracking-tight font-mono font-light">
              Full-Stack Developer
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className={`flex justify-end transition-all duration-800 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <button className="relative inline-flex items-center gap-2 text-xs bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white px-4 py-3 rounded-lg border border-gray-600/30 transition-all duration-500 font-mono group">
              <div className="flex flex-col items-start leading-tight">
                <span>Let's talk</span>
                <span className="text-[0.65rem] text-gray-400 italic">(in a human way)</span>
              </div>
              <ArrowRight className="h-4 w-4 mt-0.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Social icons centered below */}
        <div className={`flex justify-center gap-6 mt-12 transition-all duration-800 delay-[1500ms] ${
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

      {/* Copyright minimalista */}
      <div className={`border-t border-white/10 py-4 transition-all duration-800 delay-[3000ms] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}>
       
      </div>
    </footer>
  );
}