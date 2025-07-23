"use client";

import { useEffect, useRef, useState } from 'react';

interface ItineraryItem {
  time: string;
  displayTime: string;
  title: string;
  description: string;
  location?: string;
}

interface ItineraryItemCardProps {
  item: ItineraryItem;
  index: number;
}

export default function ItineraryItemCard({ item, index }: ItineraryItemCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const isRightSide = index % 2 !== 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCardVisible(true);
            if (cardRef.current) {
              observer.unobserve(cardRef.current);
            }
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ease-out ${
        isCardVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 bg-[#8B7355] rounded-full border-4 border-white shadow-elegant z-10">
        <div className="absolute inset-2 bg-[#C4985B] rounded-full"></div>
      </div>

      {/* Event Card */}
      <div className={`relative md:w-1/2 py-4 ${isRightSide ? 'md:left-1/2' : ''}`}>
        <div className={`w-full md:w-[22rem] px-4 md:px-8 ${!isRightSide ? 'ml-auto' : ''}`}>
          <div className="bg-white overflow-hidden border-l-4 border-stone-200 shadow-elegant hover:shadow-elegant-hover hover:border-stone-400 transition-all duration-700 transform hover:-translate-y-2 flex flex-col h-full">
            {/* Content Section */}
            <div className="p-8 md:p-10 relative flex-grow flex flex-col text-center md:text-left">
              {/* Decorative Element */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-stone-300"></div>
              {/* Time Display */}
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-light tracking-wider text-[#8B7355] leading-none mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {item.displayTime}
                </div>
                <div className="text-sm text-stone-600 font-light tracking-[0.1em] uppercase">
                  {item.time}
                </div>
              </div>
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-light text-stone-800 mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                {item.title}
              </h3>
              {/* Location */}
              {item.location && (
                <div className={`mb-6 flex items-center gap-2 text-[#8B7355] ${isRightSide ? 'justify-start' : 'justify-center md:justify-start'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-sm font-light tracking-[0.1em]">{item.location}</span>
                </div>
              )}
              {/* Divider */}
              <div className="flex justify-center items-center mb-6">
                <div className="w-8 h-px bg-stone-300"></div>
                <div className="w-2 h-2 border border-stone-300 transform rotate-45 mx-4"></div>
                <div className="w-8 h-px bg-stone-300"></div>
              </div>
              {/* Description */}
              {item.description && item.description.trim() !== "" && (
                <p className="text-stone-600 text-sm md:text-base leading-relaxed flex-grow">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 