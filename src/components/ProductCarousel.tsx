'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import { Database } from '@/types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
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

  // Mise à jour de la fonction findCardIndex
  const findCardIndex = (search: string): number => {
    const index = products.findIndex(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.description?.toLowerCase() || '').includes(search.toLowerCase())
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
                        src={product.image_url || '/images/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-300"
                        sizes="150px"
                        priority={index <= 2}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-white text-xs font-bold mb-1">
                          {product.name}
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