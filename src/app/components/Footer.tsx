import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function MinimalFooter() {
  return (
    <footer className="bg-black">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Nombre */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-white mb-2">
            Alexis Reyna
          </h2>
          <div className="w-16 h-px bg-gray-600 mx-auto"></div>
        </div>

        {/* Contacto */}
        <div className="flex justify-center items-center gap-8 mb-8 text-sm">
          <a 
            href="mailto:alexis@ejemplo.com" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={16} />
            <span>alexis@ejemplo.com</span>
          </a>
          
          <a 
            href="tel:+525512345678" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Phone size={16} />
            <span>+52 55 1234 5678</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            © 2025 Alexis Reyna
          </p>
        </div>
        
      </div>
    </footer>
  );
}