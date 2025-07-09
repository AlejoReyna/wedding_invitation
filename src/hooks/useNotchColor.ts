"use client";
import { useEffect, useRef } from 'react';

interface UseNotchColorProps {
  heroColor?: string;
  defaultColor?: string;
}

export const useNotchColor = ({ 
  heroColor = '#878074', 
  defaultColor = '#ffffff' 
}: UseNotchColorProps = {}) => {
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Función para actualizar el color del notch
    const updateThemeColor = (color: string) => {
      // Buscar meta tag existente o crear uno nuevo
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.getElementsByTagName('head')[0].appendChild(metaThemeColor);
      }
      
      metaThemeColor.setAttribute('content', color);
      
      // También actualizar para dispositivos Apple específicamente
      let metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      
      if (!metaAppleStatusBar) {
        metaAppleStatusBar = document.createElement('meta');
        metaAppleStatusBar.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
        document.getElementsByTagName('head')[0].appendChild(metaAppleStatusBar);
      }
      
      // Determinar el estilo basado en el color
      const isLightColor = isColorLight(color);
      metaAppleStatusBar.setAttribute('content', isLightColor ? 'black-translucent' : 'default');
    };

    // Función auxiliar para determinar si un color es claro u oscuro
    const isColorLight = (color: string): boolean => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return brightness > 128;
    };

    // Configurar Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Hero está visible - aplicar color personalizado
            updateThemeColor(heroColor);
          } else {
            // Hero no está visible - restaurar color por defecto
            updateThemeColor(defaultColor);
          }
        });
      },
      {
        // Configuración del observer
        threshold: 0.3, // Se activa cuando el 30% de la sección está visible
        rootMargin: '-50px 0px -50px 0px' // Margen para activación más precisa
      }
    );

    // Observar la sección Hero si existe
    const currentRef = heroSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
      // Restaurar color por defecto al desmontar
      updateThemeColor(defaultColor);
    };
  }, [heroColor, defaultColor]);

  return heroSectionRef;
};
