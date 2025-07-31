import React from 'react';
import { Github, Linkedin, MessageCircle, Globe } from 'lucide-react';

export default function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative px-2 md:px-2 py-12">
        
        {/* Nombre centrado con estilo premium */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-2 relative">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Alexis Reyna
            </span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
        </div>

        {/* Línea decorativa moderna */}
        <div className="relative mb-8">
          <hr className="border-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>

        {/* Iconos centrados con efectos premium */}
        <div className="flex justify-center gap-8">
          <a 
            href="https://github.com/alexisreyna" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10"
            aria-label="GitHub"
          >
            <Github size={20} className="relative z-10" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/0 to-gray-400/0 group-hover:from-gray-400/10 group-hover:to-white/10 transition-all duration-300"></div>
          </a>
          
          <a 
            href="https://linkedin.com/in/alexisreyna" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-400/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/20"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="relative z-10" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/0 to-blue-400/0 group-hover:from-blue-400/10 group-hover:to-blue-300/10 transition-all duration-300"></div>
          </a>
          
          <a 
            href="https://wa.me/525512345678" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:border-green-400/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-400/20"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} className="relative z-10" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600/0 to-green-400/0 group-hover:from-green-400/10 group-hover:to-green-300/10 transition-all duration-300"></div>
          </a>
          
          <a 
            href="https://alexisreyna.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:border-purple-400/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-400/20"
            aria-label="Sitio web"
          >
            <Globe size={20} className="relative z-10" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 to-purple-400/0 group-hover:from-purple-400/10 group-hover:to-purple-300/10 transition-all duration-300"></div>
          </a>
        </div>

        {/* Tagline sutil */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-light tracking-wider">
            Conectemos y creemos algo increíble
          </p>
        </div>
        
      </div>
    </footer>
  );
}