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
        // Consideramos que está en RSVP si la sección ocupa más del 50% de la ventana
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
    
    // Si está en la sección RSVP, usar el estilo del hero
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
    
    // Si está en la sección RSVP, usar el estilo del hero
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
    
    // Si está en la sección RSVP, usar el estilo del hero
    if (isInRSVPSection) {
      return 'bg-white';
    }
    
    return isScrolled ? 'bg-black' : 'bg-white';
  };

  const getDecorativeLineStyle = () => {
    if (isNightMode) {
      return 'bg-white/30';
    }
    
    // Si está en la sección RSVP, usar el estilo del hero
    if (isInRSVPSection) {
      return 'bg-white/30';
    }
    
    return isScrolled ? 'bg-black/30' : 'bg-white/30';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 backdrop-blur-sm transition-all duration-500 ${getNavbarStyle()} ${
      isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Grupo izquierdo */}
          <ul className="flex items-center space-x-12">
            {navigationItems.slice(0, 3).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`text-xs garamond-300 tracking-[0.25em] transition-all duration-500 relative group ${getTextStyle()}`}
                >
                  {item.label.toUpperCase()}
                  <span className={`absolute -bottom-2 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-500 ${getLineStyle()}`}></span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Centro - Solo líneas decorativas */}
          <div className="flex items-center space-x-8">
            <div className={`w-12 h-[1px] transition-colors duration-500 ${getDecorativeLineStyle()}`}></div>
            <div className={`w-24 h-[1px] transition-colors duration-500 ${getDecorativeLineStyle()}`}></div>
            <div className={`w-12 h-[1px] transition-colors duration-500 ${getDecorativeLineStyle()}`}></div>
          </div>
          
          {/* Grupo derecho */}
          <ul className="flex items-center space-x-12">
            {navigationItems.slice(3, 7).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`text-xs garamond-300 tracking-[0.25em] transition-all duration-500 relative group ${getTextStyle()}`}
                >
                  {item.label.toUpperCase()}
                  <span className={`absolute -bottom-2 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-500 ${getLineStyle()}`}></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden text-center">
          <ul className="flex justify-center items-center space-x-4 text-xs">
            {navigationItems.slice(0, 4).map((item, index) => (
              <li key={item.id} className="flex items-center">
                <a 
                  href={`#${item.id}`} 
                  className={`garamond-300 tracking-[0.15em] transition-colors duration-500 ${getTextStyle()}`}
                >
                  {item.label.toUpperCase()}
                </a>
                {index < 3 && (
                  <span className={`ml-4 transition-colors duration-500 ${
                    isNightMode ? 'text-white/30' : (isInRSVPSection ? 'text-white/30' : (isScrolled ? 'text-black/30' : 'text-white/30'))
                  }`}>·</span>
                )}
              </li>
            ))}
          </ul>
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