"use client"
import React from 'react';

interface ItineraryItem {
  time: string;
  displayTime: string;
  title: string;
  description: string;
  location?: string;
}

export default function ItinerarySection() {
  const itineraryItems: ItineraryItem[] = [
    {
      time: "4:00 PM - 5:00 PM",
      displayTime: "04:00",
      title: "Ceremony",
      description: "Welcome to the heartfelt ceremony where we will exchange vows of love and commitment. This special moment will be accompanied by gentle music and an atmosphere full of emotion, marking the beginning of our journey together.",
      location: "Iglesia San José"
    },
    {
      time: "6:30 PM - 7:00 PM",
      displayTime: "06:30",
      title: "Civil Ceremony",
      description: "Official legal ceremony where we will formalize our union before family and friends. A meaningful moment that makes our commitment legally binding while celebrating with our loved ones.",
      location: "Registro Civil"
    },
    {
      time: "8:00 PM - 9:30 PM",
      displayTime: "08:00",
      title: "Reception",
      description: "Join us for an elegant reception featuring a delicious three-course dinner prepared by our specialized chef. An evening of celebration, dancing, and creating beautiful memories together.",
      location: "Salón de Eventos"
    }
  ];

  return (
    <section 
      className="w-full min-h-screen px-4 md:px-8 py-16"
      style={{ backgroundColor: '#dfb9b0' }}
    >
      {/* Header */}
      <div className="text-center mb-24">
        <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase mb-4 text-[#8b7355] italic">
          ITINERARIO DEL DÍA
        </h2>
        <div className="w-24 h-px mx-auto mb-4 bg-[#d4c4b0]"></div>
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-[#5c5c5c] italic">
          Schedule
        </h3>
      </div>

      {/* Timeline Container */}
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4c4b0] via-[#8b7355] to-[#d4c4b0]"></div>

                 {/* Events */}
         <div className="space-y-45 md:space-y-56">
          {itineraryItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-[#8b7355] rounded-full border-4 border-[#f8f7f5] shadow-lg z-10">
                <div className="absolute inset-2 bg-[#d4c4b0] rounded-full animate-pulse"></div>
              </div>

              {/* Event Card */}
              <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'} md:w-1/2`}>
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#d4c4b0]/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Time Display */}
                  <div className="mb-6">
                    <div className="font-serif text-4xl md:text-6xl font-thin tracking-wider text-[#8b7355] leading-none italic garamond-regular mb-2">
                      {item.displayTime}
                    </div>
                    <div className="text-sm text-gray-500 font-light tracking-wide">
                      {item.time}
                    </div>
                  </div>

                  {/* Event Title */}
                  <h4 className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-[#5c5c5c] mb-4 tracking-wide italic">
                    {item.title}
                  </h4>

                  {/* Location */}
                  {item.location && (
                    <div className="mb-4 flex items-center gap-2 text-[#8b7355]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-sm font-light italic">{item.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="font-serif text-sm md:text-base text-gray-600 leading-relaxed italic">
                    {item.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4c4b0]"></div>
                    <div className="w-2 h-2 bg-[#8b7355] rounded-full"></div>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4c4b0]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End Decoration */}
        <div className="mt-32 flex justify-center">
          <div className="w-12 h-12 bg-[#8b7355] rounded-full border-4 border-[#f8f7f5] shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-[#d4c4b0] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-24"></div>
    </section>
  );
}