export default function MinimalistFooter() {
    return (
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              Te esperamos :)
            </div>
            
            <div className="text-gray-300 text-sm font-medium tracking-wide">
              Sitio creado por: <span className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer">Alexis Reyna</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }