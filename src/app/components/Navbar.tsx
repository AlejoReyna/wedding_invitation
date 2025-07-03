"use client"

interface NavigationItem {
  id: string;
  label: string;
}

const Navbar = () => {
  const navigationItems: NavigationItem[] = [
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'itinerario', label: 'Itinerario' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'dresscode', label: 'Dress Code' },
    { id: 'mensaje', label: 'Mensaje' },
    { id: 'rsvp', label: 'Confirmar' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Grupo izquierdo */}
          <ul className="flex items-center space-x-12">
            {navigationItems.slice(0, 2).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-white/60 hover:text-white text-xs garamond-300 tracking-[0.25em] transition-all duration-500 relative group"
                >
                  {item.label.toUpperCase()}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500"></span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Centro - Solo líneas decorativas */}
          <div className="flex items-center space-x-8">
            <div className="w-12 h-[1px] bg-white/30"></div>
            <div className="w-24 h-[1px] bg-white/30"></div>
            <div className="w-12 h-[1px] bg-white/30"></div>
          </div>
          
          {/* Grupo derecho */}
          <ul className="flex items-center space-x-12">
            {navigationItems.slice(2, 4).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-white/60 hover:text-white text-xs garamond-300 tracking-[0.25em] transition-all duration-500 relative group"
                >
                  {item.label.toUpperCase()}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden text-center">
          <ul className="flex justify-center items-center space-x-6 text-xs">
            {navigationItems.slice(0, 3).map((item, index) => (
              <li key={item.id} className="flex items-center">
                <a href={`#${item.id}`} className="text-white/70 garamond-300 tracking-[0.15em] hover:text-white transition-colors">
                  {item.label.toUpperCase()}
                </a>
                {index < 2 && <span className="text-white/30 ml-6">·</span>}
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