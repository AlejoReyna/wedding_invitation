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
  const [isInFooterSection, setIsInFooterSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isNightMode } = useTheme();
  
  const navigationItems: NavigationItem[] = [
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

      // Lógica para ocultar/mostrar la navbar al hacer scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      // Lógica para el fondo de la navbar
      const heroSection = document.querySelector('section'); // Asumiendo que la primera sección es hero
      const footerSection = document.getElementById('footer');

      if (heroSection && footerSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const footerRect = footerSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Es transparente si el final de la sección hero aún está visible
        const isHeroVisible = heroRect.bottom > 100;
        setIsScrolled(!isHeroVisible);

        // Es transparente si el inicio del footer está a menos del 50% de la altura de la ventana
        const isFooterVisible = footerRect.top < windowHeight * 0.5;
        setIsInFooterSection(isFooterVisible);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Llamar una vez al inicio para establecer el estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Función para determinar el estilo basado en el estado de scroll y modo nocturno
  const getNavbarStyle = () => {
    if (isNightMode) {
      return 'bg-black/95 shadow-lg hover:bg-black';
    }
    
    // En la sección hero (cuando no está scrolled), usar fondo transparente
    if (!isScrolled || isInFooterSection) {
      return 'bg-white/10 hover:bg-white/15';
    }
    
    // En todas las demás secciones, usar fondo blanco
    return 'bg-white/95 shadow-lg hover:bg-white';
  };

  const getTextStyle = () => {
    if (isNightMode) {
      return 'text-white/70 hover:text-white';
    }
    
    // En la sección hero (cuando no está scrolled), usar texto blanco
    if (!isScrolled || isInFooterSection) {
      return 'text-white/60 hover:text-white';
    }
    
    // En todas las demás secciones, usar texto #543c24
    return 'text-[#543c24]/70 hover:text-[#543c24]';
  };

  const getLineStyle = () => {
    if (isNightMode) {
      return 'bg-white';
    }
    
    // En la sección hero (cuando no está scrolled), usar línea blanca
    if (!isScrolled || isInFooterSection) {
      return 'bg-white';
    }
    
    // En todas las demás secciones, usar línea #543c24
    return 'bg-[#543c24]';
  };

  const getDecorativeLineStyle = () => {
    if (isNightMode) {
      return 'bg-white/30';
    }
    
    // En la sección hero (cuando no está scrolled), usar línea decorativa blanca
    if (!isScrolled || isInFooterSection) {
      return 'bg-white/30';
    }
    
    // En todas las demás secciones, usar línea decorativa #543c24
    return 'bg-[#543c24]/30';
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
                    isNightMode ? 'text-white/30' : (!isScrolled || isInFooterSection ? 'text-white/30' : 'text-[#543c24]/30')
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