"use client"
import React from 'react';

interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
  location?: string;
}

export default function ItinerarySection() {
  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      title: "Ceremonia Religiosa",
      description: "Celebración de la unión sagrada en la iglesia con familiares y amigos más cercanos"
    },
    {
      time: "6:30 PM - 7:00 PM",
      title: "Ceremonia Civil",
      description: "Oficialización legal del matrimonio ante el registro civil"
    },
    {
      time: "8:00 PM - 9:30 PM", 
      title: "Recepción",
      description: "Deliciosa cena de tres tiempos preparada por nuestro chef especializado"
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-[#f8f7f5] min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase mb-6 text-[#8b7355]">
          ITINERARIO DEL DÍA
        </h2>
        <div className="w-24 h-px mx-auto mb-6 bg-[#d4c4b0]"></div>
        <h3 className="garamond-regular text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-[#5c5c5c] mb-12">
          Itinerario del día
        </h3>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {itineraryItems.map((item, index) => (
          <div key={index} className="text-center">
            <h4 className="text-xl font-medium text-[#8b7355] mb-2">{item.time}</h4>
            <h3 className="text-2xl font-light text-[#5c5c5c] mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
            {item.location && <p className="text-gray-500 mt-2">{item.location}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}