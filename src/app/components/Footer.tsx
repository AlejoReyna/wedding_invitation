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
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentFooterRef = footerRef.current;
    if (currentFooterRef) {
      observer.observe(currentFooterRef);
    }

    return () => {
      if (currentFooterRef) {
        observer.unobserve(currentFooterRef);
      }
    };
  }, [isVisible]);

  return (
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90"></div>
      
      <div className="relative max-w-6xl mx-auto px-8 py-20">
        {/* Main content layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          {/* Left side - Developer info */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="space-y-3">
              <p className="text-white/50 text-sm font-light tracking-wide">
                Diseño y código elaborado por:
              </p>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Alexis Reyna
                </span>
              </h2>
              <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
                Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Right side - CTA and Social */}
          <div className={`flex flex-col items-end space-y-8 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            
            {/* CTA Button */}
            <div className="group">
              <button className="relative inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-xl px-6 py-4 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                <div className="flex flex-col items-start text-left">
                  <span className="text-white font-medium text-base">Let&apos;s talk</span>
                  <span className="text-white/50 text-xs italic font-light">(in a human way)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>

            {/* Social Icons */}
            <div className={`flex gap-4 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <a 
                href="https://github.com/AlejoReyna" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              
              <a 
                href="https://linkedin.com/in/alexisreyna" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              
              <a 
                href="https://wa.me/528140490960" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Minimal bottom separator */}
        <div className={`mt-16 pt-8 border-t border-white/5 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/[0.01] to-transparent rounded-full blur-3xl"></div>
    </footer>
  );
}