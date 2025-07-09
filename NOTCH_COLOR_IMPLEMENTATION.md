# Implementación del Color del Notch para iPhone

## Descripción
Se ha implementado una funcionalidad que cambia dinámicamente el color del notch/barra de estado en dispositivos iPhone **únicamente cuando la sección Hero está visible**.

## Archivos Modificados

### 1. `/src/hooks/useNotchColor.ts` (NUEVO)
Hook personalizado que:
- Detecta cuando la sección Hero está visible usando Intersection Observer
- Cambia dinámicamente el meta tag `theme-color`
- Aplica el color `#908474` solo cuando Hero está visible
- Restaura el color blanco (`#ffffff`) cuando Hero no está visible
- Configura automáticamente el estilo de la barra de estado de Apple

### 2. `/src/app/page.tsx` (MODIFICADO)
- Importa el hook `useNotchColor`
- Añade la referencia a la sección Hero
- Cambia el `div` principal por `section` para mejor semántica

### 3. `/src/app/layout.tsx` (MODIFICADO)
- Actualiza la fecha de la boda (corrige de Junio a Octubre)
- Añade configuración básica de meta tags para dispositivos móviles
- Configura el viewport para iOS con `viewport-fit=cover`

## Funcionamiento

### Color del Notch
- **Color cuando Hero está visible**: `#908474` (tono marrón cálido)
- **Color por defecto**: `#ffffff` (blanco)

### Detección de Visibilidad
- Se activa cuando el 30% de la sección Hero está visible
- Usa un margen de 50px para activación más precisa
- Transición suave entre estados

### Compatibilidad
- **iOS Safari**: ✅ Totalmente compatible
- **Chrome Mobile**: ✅ Compatible
- **Android**: ✅ Compatible (aunque Android no tiene "notch" como iPhone)
- **Desktop**: ✅ Sin efecto pero no causa errores

## Personalización

### Cambiar Colores
```typescript
const heroSectionRef = useNotchColor({
  heroColor: '#908474',    // Color personalizado para Hero
  defaultColor: '#ffffff' // Color por defecto
});
```

### Ajustar Sensibilidad
En `useNotchColor.ts`, modificar el observer:
```typescript
{
  threshold: 0.3,                    // Cambiar a 0.1 - 0.9
  rootMargin: '-50px 0px -50px 0px'  // Ajustar márgenes
}
```

## Testing

### En iPhone/iOS:
1. Abrir la página en Safari
2. Scroll hacia arriba/abajo para ver la sección Hero entrar y salir del viewport
3. Observar cómo cambia el color de la barra de estado superior

### En Simulador:
1. Usar Chrome DevTools en modo iPhone
2. Las herramientas de desarrollo mostrarán el cambio del meta tag

## Notas Técnicas

- El hook se limpia automáticamente al desmontar el componente
- No afecta el rendimiento (usa Intersection Observer nativo)
- Compatible con Server-Side Rendering (SSR) de Next.js
- Solo se ejecuta en el cliente (marcado con "use client")

## Troubleshooting

### El color no cambia en iPhone:
- Verificar que Safari esté actualizado
- Asegurar que la página se carga en modo "pantalla completa" sin la barra de URL
- Revisar en inspector si el meta tag se actualiza correctamente

### Performance:
- El observer se desactiva automáticamente cuando el componente se desmonta
- Solo se ejecuta cuando el usuario hace scroll
