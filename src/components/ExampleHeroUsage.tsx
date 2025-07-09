/**
 * Ejemplo de cómo usar el hook useNotchColor en otros componentes
 * Este archivo es solo de referencia - no se usa en la aplicación principal
 */

"use client";
import { useNotchColor } from '../hooks/useNotchColor';

export default function ExampleHeroComponent() {
  // Ejemplo básico con colores por defecto
  const heroRef1 = useNotchColor();

  // Ejemplo con colores personalizados
  const heroRef2 = useNotchColor({
    heroColor: '#878074',
    defaultColor: '#000000'
  });

  // Ejemplo con otro color temático
  const heroRef3 = useNotchColor({
    heroColor: '#2D5A27', // Verde oscuro
    defaultColor: '#F5F5DC'  // Beige claro
  });

  return (
    <div>
      {/* Ejemplo 1: Sección con colores por defecto */}
      <section 
        ref={heroRef1}
        className="min-h-screen bg-blue-500 flex items-center justify-center"
      >
        <h1 className="text-white text-4xl">Hero con colores por defecto</h1>
      </section>

      {/* Ejemplo 2: Sección con colores personalizados */}
      <section 
        ref={heroRef2}
        className="min-h-screen bg-gray-800 flex items-center justify-center"
      >
        <h1 className="text-white text-4xl">Hero con colores personalizados</h1>
      </section>

      {/* Ejemplo 3: Sección con tema diferente */}
      <section 
        ref={heroRef3}
        className="min-h-screen bg-green-600 flex items-center justify-center"
      >
        <h1 className="text-white text-4xl">Hero con tema verde</h1>
      </section>

      {/* Contenido adicional para testing de scroll */}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-800 text-xl">Contenido adicional para scroll</p>
      </div>
    </div>
  );
}

/*
INSTRUCCIONES DE USO:

1. Importa el hook:
   import { useNotchColor } from '../hooks/useNotchColor';

2. Úsalo en tu componente:
   const heroSectionRef = useNotchColor({
     heroColor: '#TU_COLOR_AQUI',
     defaultColor: '#COLOR_POR_DEFECTO'
   });

3. Asigna la referencia a tu sección:
   <section ref={heroSectionRef}>
     Tu contenido aquí
   </section>

TIPS:
- Solo una sección por página debe usar el hook para evitar conflictos
- Los colores deben ser hexadecimales válidos
- El hook funciona mejor con secciones de altura completa (min-h-screen)
- La detección se activa cuando 30% de la sección está visible
*/
