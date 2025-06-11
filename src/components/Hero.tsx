import Link from "next/link";

export default function Hero() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Noelia & Daniel</h1>
        <p className="text-xl">¡Nos casamos!</p>
        <p className="mt-4">15 de Agosto, 2025</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        <Link href="/detalles" className="p-4 border rounded-lg hover:bg-gray-100 transition">
          <h2 className="text-xl font-semibold mb-2">Detalles</h2>
          <p>Toda la información sobre nuestra boda</p>
        </Link>
        
        <Link href="/rsvp" className="p-4 border rounded-lg hover:bg-gray-100 transition">
          <h2 className="text-xl font-semibold mb-2">RSVP</h2>
          <p>Confirma tu asistencia</p>
        </Link>
        
        <Link href="/ubicacion" className="p-4 border rounded-lg hover:bg-gray-100 transition">
          <h2 className="text-xl font-semibold mb-2">Ubicación</h2>
          <p>Cómo llegar a la ceremonia y recepción</p>
        </Link>
        
        <Link href="/galeria" className="p-4 border rounded-lg hover:bg-gray-100 transition">
          <h2 className="text-xl font-semibold mb-2">Galería</h2>
          <p>Nuestra historia en imágenes</p>
        </Link>
        
        <Link href="/regalos" className="p-4 border rounded-lg hover:bg-gray-100 transition">
          <h2 className="text-xl font-semibold mb-2">Lista de Regalos</h2>
          <p>Si deseas hacernos un regalo</p>
        </Link>
      </div>
    </main>
  );
} 