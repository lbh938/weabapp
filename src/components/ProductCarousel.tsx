'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1706001154573-5e7cc8ea814b",
    title: "iPhone 15 Pro",
    description: "Design Titanium",
    alt: "iPhone 15 Pro case"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d8a3c",
    title: "iPhone 15",
    description: "Protection maximale",
    alt: "iPhone 15 case"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1695048132278-85c8c6d69438",
    title: "iPhone 14 Pro",
    description: "Ultra résistant",
    alt: "iPhone 14 Pro case"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb",
    title: "iPhone 14",
    description: "Style raffiné",
    alt: "iPhone 14 case"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    title: "iPhone 13 Pro",
    description: "Protection élégante",
    alt: "iPhone 13 Pro case"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1586920740280-e7da670f7cb7",
    title: "iPhone 13",
    description: "Design premium",
    alt: "iPhone 13 case"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1706456826042-4ea29ce90cc4",
    title: "Samsung S24 Ultra",
    description: "Protection ultime",
    alt: "Samsung S24 Ultra case"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1706456825898-1a8220496a78",
    title: "Samsung S24+",
    description: "Design exclusif",
    alt: "Samsung S24+ case"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    title: "Samsung S24",
    description: "Protection avancée",
    alt: "Samsung S24 case"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    title: "Samsung S23 Ultra",
    description: "Protection maximale",
    alt: "Samsung S23 Ultra case"
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1586920740280-e7da670f7cb7",
    title: "Samsung S23+",
    description: "Style moderne",
    alt: "Samsung S23+ case"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    title: "Samsung S23",
    description: "Protection fiable",
    alt: "Samsung S23 case"
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1698675951502-82e08f5d5f52",
    title: "Google Pixel 8 Pro",
    description: "Protection Premium",
    alt: "Google Pixel 8 Pro case"
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1698675951419-5b4876a75984",
    title: "Google Pixel 8",
    description: "Design Élégant",
    alt: "Google Pixel 8 case"
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f",
    title: "OnePlus 12",
    description: "Protection Avancée",
    alt: "OnePlus 12 case"
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1613588718956-c2e80305bf61",
    title: "OnePlus 12R",
    description: "Style Moderne",
    alt: "OnePlus 12R case"
  },
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888",
    title: "Xiaomi 14 Pro",
    description: "Protection Ultime",
    alt: "Xiaomi 14 Pro case"
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179",
    title: "Xiaomi 14",
    description: "Design Premium",
    alt: "Xiaomi 14 case"
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6",
    title: "Nothing Phone 2",
    description: "Protection Innovante",
    alt: "Nothing Phone 2 case"
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1586920740280-e7da670f7cb7",
    title: "Nothing Phone 2a",
    description: "Style Unique",
    alt: "Nothing Phone 2a case"
  },
  {
    id: 21,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    title: "Pixel Fold",
    description: "Protection Pliable",
    alt: "Pixel Fold case"
  },
  {
    id: 22,
    image: "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f",
    title: "Galaxy Z Fold5",
    description: "Protection Adaptative",
    alt: "Galaxy Z Fold5 case"
  },
  {
    id: 23,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    title: "Galaxy Z Flip5",
    description: "Style Compact",
    alt: "Galaxy Z Flip5 case"
  },
  {
    id: 24,
    image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f",
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

  return (
    <div className="py-12 bg-gray-300">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">
          <span className="text-gray-800">Modèles</span>{' '}
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Disponibles
          </span>
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Protection sur mesure pour chaque appareil
        </p>
        
        <form onSubmit={handleSearch} className="max-w-sm mx-auto relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Votre appareil se trouve ici"
            className="w-full px-4 py-2 rounded-full bg-white shadow-md text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      <div className="relative max-w-[5000px] mx-auto px-0">
        <div className="w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="overflow-x-scroll scrollbar-hide touch-pan-x overscroll-x-contain"
            style={{ 
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-4 py-4">
              <div className="w-[0.5vw] flex-shrink-0" />
              
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="w-[120px] flex-shrink-0"
                >
                  <div className="bg-white rounded-md overflow-hidden shadow-sm relative">
                    <div className="relative h-[140px]">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-300"
                        sizes="120px"
                        priority={index <= 2}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-white text-[10px] font-bold mb-0.5">
                          {product.title}
                        </h3>
                        <p className="text-white/90 text-[7px]">
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
      </div>
    </div>
  );
} 