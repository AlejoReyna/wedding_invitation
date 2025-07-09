"use client"
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface NavigationItem {
  id: string;
  label: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInRSVPSection, setIsInRSVPSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isNightMode } = useTheme();
  
  const navigationItems: NavigationItem[] = [
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'galeria', label: 'Galería' },
    { id: 'itinerario', label: 'Itinerario' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'dresscode', label: 'Dress Code' },
    { id: 'mensaje', label: 'Mensaje' },
    { id: 'rsvp', label: 'Confirmar' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detectar dirección del scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolleando hacia abajo y ya pasó los primeros 100px
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Cerrar menú móvil al hacer scroll
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        // Scrolleando hacia arriba o está en el top
        setIsVisible(true);
      }
      
      // Determinar si está scrolleado para cambiar el estilo
      const nosotrosSection = document.getElementById('nosotros');
      if (nosotrosSection) {
        const rect = nosotrosSection.getBoundingClientRect();
        setIsScrolled(rect.top <= 100);
      }
      
      // Detectar si está en la sección RSVP
      const rsvpSection = document.getElementById('rsvp');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsInRSVPSection(rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Función para determinar el estilo basado en el estado de scroll y modo nocturno
  const getNavbarStyle = () => {
    if (isNightMode) {
      return 'bg-black/95 shadow-lg hover:bg-black';
    }
    
    if (isInRSVPSection) {
      return 'bg-white/10 hover:bg-white/15';
    }
    
    return isScrolled 
      ? 'bg-white/95 shadow-lg hover:bg-white' 
      : 'bg-white/10 hover:bg-white/15';
  };

  const getTextStyle = () => {
    if (isNightMode) {
      return 'text-white/70 hover:text-white';
    }
    
    if (isInRSVPSection) {
      return 'text-white/60 hover:text-white';
    }
    
    return isScrolled 
      ? 'text-black/70 hover:text-black' 
      : 'text-white/60 hover:text-white';
  };

  const getLineStyle = () => {
    if (isNightMode) {
      return 'bg-white';
    }
    
    if (isInRSVPSection) {
      return 'bg-white';
    }
    
    return isScrolled ? 'bg-black' : 'bg-white';
  };

  const getDecorativeLineStyle = () => {
    if (isNightMode) {
      return 'bg-white/30';
    }
    
    if (isInRSVPSection) {
      return 'bg-white/30';
    }
    
    return isScrolled ? 'bg-black/30' : 'bg-white/30';
  };

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    // Pequeño delay para permitir que la animación del menú termine
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-3 sm:py-4 backdrop-blur-sm transition-all duration-500 ${getNavbarStyle()} ${
      isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation - Pantallas grandes */}
        <div className="hidden lg:flex items-center justify-center">
          <ul className="flex items-center justify-center space-x-8 xl:space-x-12">
            {navigationItems.map((item, index) => (
              <li key={item.id} className="flex items-center">
                <a
                  href={`#${item.id}`}
                  className={`text-xs garamond-300 tracking-[0.25em] transition-all duration-500 relative group px-2 py-1 ${getTextStyle()}`}
                >
                  {item.label.toUpperCase()}
                  <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[1px] group-hover:w-3/4 transition-all duration-500 ${getLineStyle()}`}></span>
                </a>
                {/* Separador decorativo entre elementos (excepto el último) */}
                {index < navigationItems.length - 1 && (
                  <div className={`ml-6 xl:ml-8 w-1 h-1 rounded-full transition-colors duration-500 ${getDecorativeLineStyle()}`}></div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Tablet Navigation - Pantallas medianas */}
        <div className="hidden md:flex lg:hidden items-center justify-between">
          {/* Primera fila de elementos principales */}
          <ul className="flex items-center space-x-6">
            {navigationItems.slice(0, 4).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`text-xs garamond-300 tracking-[0.2em] transition-all duration-500 relative group ${getTextStyle()}`}
                >
                  {item.label.toUpperCase()}
                  <span className={`absolute -bottom-2 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-500 ${getLineStyle()}`}></span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Elementos secundarios con menú desplegable o iconos */}
          <div className="flex items-center space-x-6">
            {navigationItems.slice(4).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-xs garamond-300 tracking-[0.2em] transition-all duration-500 relative group ${getTextStyle()}`}
              >
                {item.label.toUpperCase()}
                <span className={`absolute -bottom-2 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-500 ${getLineStyle()}`}></span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          {/* Solo elementos principales en móvil */}
          <ul className="flex items-center space-x-3 sm:space-x-4 text-xs flex-1 justify-center">
            {navigationItems.slice(0, 4).map((item, index) => (
              <li key={item.id} className="flex items-center">
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`garamond-300 tracking-[0.1em] sm:tracking-[0.15em] transition-colors duration-500 px-1 ${getTextStyle()}`}
                >
                  {item.label.toUpperCase()}
                </a>
                {index < 3 && (
                  <span className={`ml-2 sm:ml-3 transition-colors duration-500 ${
                    isNightMode ? 'text-white/30' : (isInRSVPSection ? 'text-white/30' : (isScrolled ? 'text-black/30' : 'text-white/30'))
                  }`}>·</span>
                )}
              </li>
            ))}
          </ul>
          
          {/* Botón de menú hamburguesa para elementos secundarios */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`ml-4 p-2 transition-colors duration-500 ${getTextStyle()}`}
            aria-label="Menú adicional"
          >
            <div className="flex flex-col space-y-1">
              <div className={`w-4 h-0.5 transition-all duration-300 ${getLineStyle()} ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-4 h-0.5 transition-all duration-300 ${getLineStyle()} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-4 h-0.5 transition-all duration-300 ${getLineStyle()} ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Menú móvil desplegable para elementos secundarios */}
        <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        } ${getNavbarStyle()}`}>
          <div className="px-4 py-4 border-t border-white/10">
            <ul className="flex flex-col space-y-3">
              {navigationItems.slice(4).map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`text-xs garamond-300 tracking-[0.15em] transition-colors duration-500 block py-2 ${getTextStyle()}`}
                  >
                    {item.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .garamond-300 {
          font-family: 'EB Garamond', serif;
          font-weight: 300;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;