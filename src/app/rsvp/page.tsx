export default function RSVP() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">RSVP</h1>
        <p className="text-center mb-6">Por favor confirma tu asistencia</p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="guests" className="block text-sm font-medium mb-2">
              Número de invitados
            </label>
            <select
              id="guests"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 persona</option>
              <option value="2">2 personas</option>
              <option value="3">3 personas</option>
              <option value="4">4 personas</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              ¿Asistirás?
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="attendance" value="yes" className="mr-2"/>
                Sí, ahí estaré
              </label>
              <label className="flex items-center">
                <input type="radio" name="attendance" value="no" className="mr-2"/>
                No podré asistir
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Confirmar Asistencia
          </button>
        </form>
      </div>
    </div>
  );
} 