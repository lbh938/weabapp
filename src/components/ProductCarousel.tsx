'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

const products = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/5741605/pexels-photo-5741605.jpeg",
    title: "iPhone 15 Pro",
    description: "Design Titanium",
    alt: "iPhone 15 Pro case"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg",
    title: "iPhone 15",
    description: "Protection maximale",
    alt: "iPhone 15 case"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/5741604/pexels-photo-5741604.jpeg",
    title: "iPhone 14 Pro",
    description: "Ultra résistant",
    alt: "iPhone 14 Pro case"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg",
    title: "iPhone 14",
    description: "Style raffiné",
    alt: "iPhone 14 case"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/4071882/pexels-photo-4071882.jpeg",
    title: "iPhone 13 Pro",
    description: "Protection élégante",
    alt: "iPhone 13 Pro case"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/4071667/pexels-photo-4071667.jpeg",
    title: "iPhone 13",
    description: "Design premium",
    alt: "iPhone 13 case"
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
    title: "Samsung S24 Ultra",
    description: "Protection ultime",
    alt: "Samsung S24 Ultra case"
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/5741603/pexels-photo-5741603.jpeg",
    title: "Samsung S24+",
    description: "Design exclusif",
    alt: "Samsung S24+ case"
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
    title: "Samsung S24",
    description: "Protection avancée",
    alt: "Samsung S24 case"
  },
  {
    id: 10,
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
    title: "Samsung S23 Ultra",
    description: "Protection maximale",
    alt: "Samsung S23 Ultra case"
  },
  {
    id: 11,
    image: "https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg",
    title: "Samsung S23+",
    description: "Style moderne",
    alt: "Samsung S23+ case"
  },
  {
    id: 12,
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
    title: "Samsung S23",
    description: "Protection fiable",
    alt: "Samsung S23 case"
  },
  {
    id: 13,
    image: "https://images.pexels.com/photos/5741599/pexels-photo-5741599.jpeg",
    title: "Google Pixel 8 Pro",
    description: "Protection Premium",
    alt: "Google Pixel 8 Pro case"
  },
  {
    id: 14,
    image: "https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg",
    title: "Google Pixel 8",
    description: "Design Élégant",
    alt: "Google Pixel 8 case"
  },
  {
    id: 15,
    image: "https://images.pexels.com/photos/4071289/pexels-photo-4071289.jpeg",
    title: "OnePlus 12",
    description: "Protection Avancée",
    alt: "OnePlus 12 case"
  },
  {
    id: 16,
    image: "https://images.pexels.com/photos/4071665/pexels-photo-4071665.jpeg",
    title: "OnePlus 12R",
    description: "Style Moderne",
    alt: "OnePlus 12R case"
  },
  {
    id: 17,
    image: "https://images.pexels.com/photos/4071879/pexels-photo-4071879.jpeg",
    title: "Xiaomi 14 Pro",
    description: "Protection Ultime",
    alt: "Xiaomi 14 Pro case"
  },
  {
    id: 18,
    image: "https://images.pexels.com/photos/4071888/pexels-photo-4071888.jpeg",
    title: "Xiaomi 14",
    description: "Design Premium",
    alt: "Xiaomi 14 case"
  },
  {
    id: 19,
    image: "https://images.pexels.com/photos/4071883/pexels-photo-4071883.jpeg",
    title: "Nothing Phone 2",
    description: "Protection Innovante",
    alt: "Nothing Phone 2 case"
  },
  {
    id: 20,
    image: "https://images.pexels.com/photos/4071881/pexels-photo-4071881.jpeg",
    title: "Nothing Phone 2a",
    description: "Style Unique",
    alt: "Nothing Phone 2a case"
  },
  {
    id: 21,
    image: "https://images.pexels.com/photos/5741601/pexels-photo-5741601.jpeg",
    title: "Pixel Fold",
    description: "Protection Pliable",
    alt: "Pixel Fold case"
  },
  {
    id: 22,
    image: "https://images.pexels.com/photos/5741600/pexels-photo-5741600.jpeg",
    title: "Galaxy Z Fold5",
    description: "Protection Adaptative",
    alt: "Galaxy Z Fold5 case"
  },
  {
    id: 23,
    image: "https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg",
    title: "Galaxy Z Flip5",
    description: "Style Compact",
    alt: "Galaxy Z Flip5 case"
  },
  {
    id: 24,
    image: "https://images.pexels.com/photos/4071886/pexels-photo-4071886.jpeg",
    title: "OPPO Find N3",
    description: "Protection Flexible",
    alt: "OPPO Find N3 case"
  }
];

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const checkWidth = () => {
      setShowControls(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Simplification de la navigation pour les boutons
  const handleNavigation = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -240 : 240; // Défilement plus large
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // Fonction pour mettre à jour l'index actuel lors du défilement
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = 120;
    const gap = 4;
    const scrollPosition = container.scrollLeft;
    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    
    setCurrentIndex(Math.min(newIndex, products.length - 1));
  };

  // Ajout de l'écouteur de défilement
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Mise à jour de scrollToCard pour mettre à jour l'index
  const scrollToCard = (index: number) => {
    if (!scrollRef.current || index === -1) return;
    
    const container = scrollRef.current;
    const cardWidth = 120;
    const gap = 4;
    const scrollPosition = (cardWidth + gap) * index;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
  };

  // Fonction pour trouver l'index d'une carte
  const findCardIndex = (search: string): number => {
    const index = products.findIndex(product => 
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    return index;
  };

  // Gestionnaire de recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const index = findCardIndex(searchTerm);
    scrollToCard(index);
  };

  // Ajout d'une fonction pour calculer le nombre de groupes
  const totalGroups = Math.ceil(products.length / 4);

  return (
    <div className="py-12 bg-gray-300">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Modèles Disponibles
          </span>
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Protection sur mesure pour chaque appareil
        </p>
        
        <form onSubmit={handleSearch} className="max-w-xs mx-auto relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Votre appareil se trouve ici"
            className="w-full px-6 py-3.5 rounded-full bg-white shadow-md text-gray-800 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
          <button 
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      <div className="relative max-w-[4000px] mx-auto px-0 pb-8">
        <div className="w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="overflow-x-scroll scrollbar-hide touch-pan-x overscroll-x-contain"
            style={{ 
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-4 py-2">
              <div className="w-[0.5vw] flex-shrink-0" />
              
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="w-[150px] flex-shrink-0"
                >
                  <div className="bg-white rounded-md overflow-hidden shadow-sm relative">
                    <div className="relative h-[175px]">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-300"
                        sizes="150px"
                        priority={index <= 2}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-white text-xs font-bold mb-1">
                          {product.title}
                        </h3>
                        <p className="text-white/90 text-[9px]">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-[0.5vw] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Indicateurs de groupe repositionnés */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3 px-3 py-1.5 bg-white/80 rounded-full shadow-sm backdrop-blur-sm">
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i * 4)}
              className={`w-1.5 h-1.5 rounded-full transition-all touch-manipulation ${
                Math.floor(currentIndex / 4) === i 
                  ? 'bg-black scale-125' 
                  : 'bg-black/20 hover:bg-black/40'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 