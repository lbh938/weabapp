'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "Protection maximale, design minimaliste",
    image: "/iphone15.jpg",
    color: "bg-gray-900"
  },
  {
    id: 2,
    title: "Samsung S24 Ultra",
    description: "Élégance et durabilité",
    image: "/samsung24.jpg",
    color: "bg-indigo-900"
  },
  {
    id: 3,
    title: "Collection Premium",
    description: "Des coques d'exception",
    image: "/premium.jpg",
    color: "bg-purple-900"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-gray-100">
      <div className="absolute inset-0 flex transition-transform duration-500 ease-out"
           style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full h-full relative flex items-center">
            <div className={`absolute inset-0 ${slide.color} opacity-90`}></div>
            <div className="relative z-10 container mx-auto px-4 flex items-center justify-between">
              {/* Texte */}
              <div className="w-1/2 text-white space-y-6">
                <h2 className="text-5xl font-bold tracking-tight">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
                <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                  Découvrir
                </button>
              </div>
              {/* Image */}
              <div className="w-1/2 relative h-[60vh]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-[500px]">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicateurs */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-8 bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 