'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

const products = [
  {
    id: 1,
    image: "https://picsum.photos/600/800?random=1",
    title: "iPhone 15 Pro",
    description: "Design Titanium",
    alt: "iPhone 15 Pro case"
  },
  {
    id: 2,
    image: "https://picsum.photos/600/800?random=2",
    title: "iPhone 15",
    description: "Protection maximale",
    alt: "iPhone 15 case"
  },
  {
    id: 3,
    image: "https://picsum.photos/600/800?random=3",
    title: "iPhone 14 Pro",
    description: "Ultra résistant",
    alt: "iPhone 14 Pro case"
  },
  {
    id: 4,
    image: "https://picsum.photos/600/800?random=4",
    title: "iPhone 14",
    description: "Style raffiné",
    alt: "iPhone 14 case"
  },
  {
    id: 5,
    image: "https://picsum.photos/600/800?random=5",
    title: "iPhone 13 Pro",
    description: "Protection élégante",
    alt: "iPhone 13 Pro case"
  },
  {
    id: 6,
    image: "https://picsum.photos/600/800?random=6",
    title: "iPhone 13",
    description: "Design premium",
    alt: "iPhone 13 case"
  },
  {
    id: 7,
    image: "https://picsum.photos/600/800?random=7",
    title: "Samsung S24 Ultra",
    description: "Protection ultime",
    alt: "Samsung S24 Ultra case"
  },
  {
    id: 8,
    image: "https://picsum.photos/600/800?random=8",
    title: "Samsung S24+",
    description: "Design exclusif",
    alt: "Samsung S24+ case"
  },
  {
    id: 9,
    image: "https://picsum.photos/600/800?random=9",
    title: "Samsung S24",
    description: "Protection avancée",
    alt: "Samsung S24 case"
  },
  {
    id: 10,
    image: "https://picsum.photos/600/800?random=10",
    title: "Samsung S23 Ultra",
    description: "Protection maximale",
    alt: "Samsung S23 Ultra case"
  },
  {
    id: 11,
    image: "https://picsum.photos/600/800?random=11",
    title: "Samsung S23+",
    description: "Style moderne",
    alt: "Samsung S23+ case"
  },
  {
    id: 12,
    image: "https://picsum.photos/600/800?random=12",
    title: "Samsung S23",
    description: "Protection fiable",
    alt: "Samsung S23 case"
  }
];

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Créer un tableau infini en répétant les produits
  const infiniteProducts = [...products, ...products, ...products];

  useEffect(() => {
    const checkWidth = () => {
      setShowControls(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleNavigation = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -280 : 280;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    let newScroll = currentScroll + scrollAmount;

    // Effet infini pour tous les écrans
    if (newScroll > maxScroll - 280) {
      container.scrollTo({ left: 280, behavior: 'auto' });
      newScroll = 280 * 2;
    } else if (newScroll < 280) {
      container.scrollTo({ left: maxScroll - 280 * 2, behavior: 'auto' });
      newScroll = maxScroll - 280 * 3;
    }

    container.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };

  const updateCurrentIndex = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const index = Math.round(container.scrollLeft / 280) % products.length;
    setCurrentIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    // Positionnement initial au milieu du carousel pour tous les écrans
    container.scrollTo({ left: products.length * 280, behavior: 'auto' });

    // Ajout des contrôles tactiles pour mobile
    let touchStart: number | null = null;
    let touchEnd: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        handleNavigation('right');
      } else if (isRightSwipe) {
        handleNavigation('left');
      }

      touchStart = null;
      touchEnd = null;
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [products.length]);

  // Fonction pour trouver l'index d'une carte
  const findCardIndex = (search: string): number => {
    const index = products.findIndex(product => 
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    return index;
  };

  // Fonction pour scroller jusqu'à la carte
  const scrollToCard = (index: number) => {
    if (!scrollRef.current || index === -1) return;
    
    const container = scrollRef.current;
    const cardWidth = 120; // Largeur d'une carte
    const gap = 4; // Gap entre les cartes
    const scrollPosition = (cardWidth + gap) * (index + products.length); // +products.length pour aller à la deuxième série

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
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
        
        {/* Barre de recherche modifiée */}
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

      <div className="relative max-w-[1800px] mx-auto group">
        <div className="w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide touch-pan-x"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex gap-4 py-4">
              {infiniteProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="w-[120px] flex-shrink-0 scroll-snap-align-start"
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
            </div>
          </div>
        </div>

        {showControls && (
          <>
            <button
              onClick={() => handleNavigation('left')}
              className="hidden lg:flex absolute -left-28 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10 hover:scale-110"
              aria-label="Précédent"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigation('right')}
              className="hidden lg:flex absolute -right-28 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10 hover:scale-110"
              aria-label="Suivant"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === i ? 'w-6 bg-black' : 'bg-black/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 