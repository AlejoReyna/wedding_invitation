import { Linkedin, Mail, Phone } from 'lucide-react';

export default function MinimalistFooter() {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Marca Personal */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-thin text-white mb-2 tracking-wider">
              Alexis Reyna
            </h2>
            <p className="text-gray-300 text-sm font-serif font-light leading-relaxed">
              Desarrollador Full Stack
            </p>
            <p className="text-gray-400 text-xs font-serif font-light mt-1">
              Creando experiencias digitales únicas
            </p>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-serif font-light text-white mb-3">Contacto</h3>
            <div className="space-y-3">
              <a 
                href="mailto:alexis@ejemplo.com" 
                className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-white transition-colors group"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-serif font-light">alexis@ejemplo.com</span>
              </a>
              
              <a 
                href="tel:+525512345678" 
                className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-white transition-colors group"
              >
                <Phone size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-serif font-light">+52 55 1234 5678</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/alexisreyna" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-serif font-light">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-300 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs font-serif font-light">
              © 2025 Alexis Reyna. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs font-serif font-light">
              Construyendo el futuro, un proyecto a la vez
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}