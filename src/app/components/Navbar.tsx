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
  const [isInRSVPSection, setIsInRSVPSection] = useState(false);
  const [isInGiftSection, setIsInGiftSection] = useState(false);
  const [isInMessageSection, setIsInMessageSection] = useState(false);
  const [isInGallerySection, setIsInGallerySection] = useState(false);
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
      const heroSection = document.getElementById('hero-section');
      const footerSection = document.getElementById('footer');
      const rsvpSection = document.getElementById('rsvp');
      const giftSection = document.getElementById('regalos');
      const messageSection = document.getElementById('mensaje');
      const gallerySection = document.getElementById('galeria');

      if (heroSection && footerSection && rsvpSection && giftSection && messageSection && gallerySection) {
        const heroRect = heroSection.getBoundingClientRect();
        const footerRect = footerSection.getBoundingClientRect();
        const rsvpRect = rsvpSection.getBoundingClientRect();
        const giftRect = giftSection.getBoundingClientRect();
        const messageRect = messageSection.getBoundingClientRect();
        const galleryRect = gallerySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Se considera que se ha hecho scroll cuando la parte inferior de la sección hero está por encima de la navbar (100px)
        setIsScrolled(heroRect.bottom < 100);

        // Es transparente si el inicio del footer está a menos del 80% de la altura de la ventana
        const isFooterVisible = footerRect.top < windowHeight * 0.8;
        setIsInFooterSection(isFooterVisible);

        // Activar cuando el 60% de la altura de RSVP sea visible
        const rsvpVisibleHeight = windowHeight - Math.max(0, rsvpRect.top);
        const rsvpSixtyPercent = rsvpRect.height * 0.6;
        const isRSVPVisible = rsvpVisibleHeight >= rsvpSixtyPercent && rsvpRect.top < windowHeight;
        setIsInRSVPSection(isRSVPVisible);

        // Activar cuando el 60% de la altura de Gift Section sea visible
        let isGiftVisible = false;
        if (giftRect.bottom > 0 && giftRect.top < windowHeight) {
          // La sección está al menos parcialmente visible
          const visibleTop = Math.max(0, giftRect.top);
          const visibleBottom = Math.min(windowHeight, giftRect.bottom);
          const actualVisibleHeight = visibleBottom - visibleTop;
          const giftSixtyPercent = giftRect.height * 0.6;
          
          // Si la sección es más alta que el viewport, usar el mínimo entre el 60% y el viewport
          const requiredHeight = Math.min(giftSixtyPercent, windowHeight);
          isGiftVisible = actualVisibleHeight >= requiredHeight;
        }
        setIsInGiftSection(isGiftVisible);
        
        // Activar cuando el 60% de la altura de Message Section sea visible
        let isMessageVisible = false;
        if (messageRect.bottom > 0 && messageRect.top < windowHeight) {
          // La sección está al menos parcialmente visible
          const visibleTop = Math.max(0, messageRect.top);
          const visibleBottom = Math.min(windowHeight, messageRect.bottom);
          const actualVisibleHeight = visibleBottom - visibleTop;
          const messageSixtyPercent = messageRect.height * 0.6;
          
          // Si la sección es más alta que el viewport, usar el mínimo entre el 60% y el viewport
          const requiredHeight = Math.min(messageSixtyPercent, windowHeight);
          isMessageVisible = actualVisibleHeight >= requiredHeight;
        }
        setIsInMessageSection(isMessageVisible);
        
        // Activar cuando el 60% de la altura de Gallery Section sea visible
        let isGalleryVisible = false;
        if (galleryRect.bottom > 0 && galleryRect.top < windowHeight) {
          // La sección está al menos parcialmente visible
          const visibleTop = Math.max(0, galleryRect.top);
          const visibleBottom = Math.min(windowHeight, galleryRect.bottom);
          const actualVisibleHeight = visibleBottom - visibleTop;
          const gallerySixtyPercent = galleryRect.height * 0.6;
          
          // Si la sección es más alta que el viewport, usar el mínimo entre el 60% y el viewport
          const requiredHeight = Math.min(gallerySixtyPercent, windowHeight);
          isGalleryVisible = actualVisibleHeight >= requiredHeight;
        }
        setIsInGallerySection(isGalleryVisible);
        
        // Debug logs para Gift Section
        console.log('Gift Debug:', {
          giftExists: !!giftSection,
          giftTop: giftRect.top,
          giftBottom: giftRect.bottom,
          giftHeight: giftRect.height,
          visibleTop: Math.max(0, giftRect.top),
          visibleBottom: Math.min(windowHeight, giftRect.bottom),
          actualVisibleHeight: giftRect.bottom > 0 && giftRect.top < windowHeight ? 
            Math.min(windowHeight, giftRect.bottom) - Math.max(0, giftRect.top) : 0,
          giftSixtyPercent: giftRect.height * 0.6,
          requiredHeight: Math.min(giftRect.height * 0.6, windowHeight),
          isGiftVisible,
          windowHeight
        });
        
        // Debug logs para RSVP Section
        console.log('RSVP Debug:', {
          rsvpExists: !!rsvpSection,
          rsvpTop: rsvpRect.top,
          rsvpHeight: rsvpRect.height,
          rsvpVisibleHeight,
          rsvpSixtyPercent,
          isRSVPVisible,
          windowHeight
        });
        
        // Debug logs para Message Section
        console.log('Message Debug:', {
          messageExists: !!messageSection,
          messageTop: messageRect.top,
          messageBottom: messageRect.bottom,
          messageHeight: messageRect.height,
          visibleTop: Math.max(0, messageRect.top),
          visibleBottom: Math.min(windowHeight, messageRect.bottom),
          actualVisibleHeight: messageRect.bottom > 0 && messageRect.top < windowHeight ? 
            Math.min(windowHeight, messageRect.bottom) - Math.max(0, messageRect.top) : 0,
          messageSixtyPercent: messageRect.height * 0.6,
          requiredHeight: Math.min(messageRect.height * 0.6, windowHeight),
          isMessageVisible,
          windowHeight
        });
        
        // Debug logs para Gallery Section
        console.log('Gallery Debug:', {
          galleryExists: !!gallerySection,
          galleryTop: galleryRect.top,
          galleryBottom: galleryRect.bottom,
          galleryHeight: galleryRect.height,
          visibleTop: Math.max(0, galleryRect.top),
          visibleBottom: Math.min(windowHeight, galleryRect.bottom),
          actualVisibleHeight: galleryRect.bottom > 0 && galleryRect.top < windowHeight ? 
            Math.min(windowHeight, galleryRect.bottom) - Math.max(0, galleryRect.top) : 0,
          gallerySixtyPercent: galleryRect.height * 0.6,
          requiredHeight: Math.min(galleryRect.height * 0.6, windowHeight),
          isGalleryVisible,
          windowHeight
        });
        
        // Estados finales de debug
        console.log('Estados finales:', {
          isInRSVPSection: isRSVPVisible,
          isInGiftSection: isGiftVisible,
          isInMessageSection: isMessageVisible,
          isInGallerySection: isGalleryVisible,
          isInFooterSection: isFooterVisible,
          isScrolled: heroRect.bottom < 100
        });
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

    // Si está en la sección RSVP, usar el color específico (prioridad mayor)
    if (isInRSVPSection) {
      console.log('🟢 RSVP Section Active - Using green');
      return 'bg-[#818368]/95 shadow-lg hover:bg-[#818368]';
    }

    // Si está en la sección Message, usar el color específico
    if (isInMessageSection) {
      console.log('💬 Message Section Active - Using message color');
      return 'bg-[#d0aca4]/95 shadow-lg hover:bg-[#d0aca4]';
    }

    // Si está en la sección Gift, usar el color específico
    if (isInGiftSection) {
      console.log('🎁 Gift Section Active - Using pink');
      return 'bg-[#e8c4bc]/95 shadow-lg hover:bg-[#e8c4bc]';
    }

    // Si está en la sección del footer, es transparente
    if (isInFooterSection) {
      return 'bg-white/10 hover:bg-white/15';
    }

    // Si no ha hecho scroll (está en hero), es transparente
    if (!isScrolled) {
      return 'bg-white/10 hover:bg-white/15';
    }
    
    // En todas las demás secciones, es blanco
    return 'bg-white/95 shadow-lg hover:bg-white';
  };

  const getTextStyle = () => {
    if (isNightMode) {
      return 'text-white/70 hover:text-white';
    }
    
    // En la sección RSVP, usar texto blanco
    if (isInRSVPSection) {
      return 'text-white/70 hover:text-white';
    }
    
    // En la sección Message, usar texto blanco
    if (isInMessageSection) {
      return 'text-white/70 hover:text-white';
    }
    
    // En la sección Gift, usar texto blanco
    if (isInGiftSection) {
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
    
    // En la sección RSVP, usar línea blanca
    if (isInRSVPSection) {
      return 'bg-white';
    }
    
    // En la sección Message, usar línea blanca
    if (isInMessageSection) {
      return 'bg-white';
    }
    
    // En la sección Gift, usar línea blanca
    if (isInGiftSection) {
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
    
    // En la sección RSVP, usar línea decorativa blanca
    if (isInRSVPSection) {
      return 'bg-white/30';
    }
    
    // En la sección Message, usar línea decorativa blanca
    if (isInMessageSection) {
      return 'bg-white/30';
    }
    
    // En la sección Gift, usar línea decorativa blanca
    if (isInGiftSection) {
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

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between">
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
                    isNightMode ? 'text-white/30' : 
                    isInRSVPSection ? 'text-white/30' : 
                    isInMessageSection ? 'text-white/30' : 
                    isInGiftSection ? 'text-white/30' : 
                    (!isScrolled || isInFooterSection ? 'text-white/30' : 'text-[#543c24]/30')
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
        <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 overflow-hidden ${
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