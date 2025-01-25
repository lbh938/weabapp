'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';

interface ContentBlock {
  id: number;
  title: string;
  description: string;
  image: string;
  highlight?: string; // Optionnel
  imageLeft?: boolean;
  isFullWidth?: boolean;
  overlayContent?: {
    mainText: string;
    subText: string;
    buttonText: string;
    buttonLink: string;
  };
}

const contentBlocks: ContentBlock[] = [
  {
    id: 1,
    title: "Protection Maximale",
    description: "Nos coques offrent une protection de grade militaire avec une absorption des chocs jusqu'à 3 mètres de hauteur. La technologie avancée de nos matériaux garantit une protection optimale de votre appareil contre les chutes, les rayures et les impacts quotidiens.",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
    highlight: "grade militaire",
    imageLeft: true,
    buttonText: "Voir les protections",
    buttonLink: "/protections"
  },
  {
    id: 2,
    title: "Design Premium",
    description: "Chaque coque est conçue avec précision pour s'adapter parfaitement à votre appareil. Nos finitions haut de gamme en aluminium brossé et en fibre de carbone ajoutent une touche d'élégance tout en maintenant une protection supérieure.",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179",
    highlight: "finitions haut de gamme",
    imageLeft: false,
    buttonText: "Découvrir les designs",
    buttonLink: "/designs"
  },
  {
    id: 3,
    title: "Technologie MagSafe",
    description: "Profitez de la recharge sans fil rapide et des accessoires magnétiques grâce à notre compatibilité MagSafe intégrée. La puissance des aimants optimisés assure un alignement parfait et une connexion sécurisée.",
    image: "https://images.unsplash.com/photo-1587855049254-351f4a0c8f8b",
    highlight: "recharge sans fil rapide",
    imageLeft: true,
    buttonText: "En savoir plus",
    buttonLink: "/magsafe"
  },
  {
    id: 4,
    title: "Collection Exclusive",
    description: "Découvrez notre nouvelle collection",
    image: "https://images.unsplash.com/photo-1605457212477-6cf1d9657391",
    isFullWidth: true,
    animation: { y: [100, 0], opacity: [0, 1] },
    overlayContent: {
      mainText: "Collection 2024",
      subText: "Protection & Style",
      buttonText: "Découvrir",
      buttonLink: "/collection"
    }
  }
];

// Hook personnalisé pour détecter le mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export default function ContentSection() {
  const [titleRef, titleInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const isMobile = useIsMobile();

  const getVariants = (block: ContentBlock) => {
    if (isMobile) {
      // Animation mobile plus rapide
      if (block.isFullWidth) {
        return {
          hidden: { opacity: 0, x: -50 }, // Distance réduite
          visible: { opacity: 1, x: 0 }
        };
      }
      return {
        hidden: { opacity: 0, y: 50 }, // Distance réduite
        visible: { opacity: 1, y: 0 }
      };
    }
    // Animation desktop plus rapide
    return {
      hidden: {
        opacity: 0,
        ...(block.id === 4 
          ? { y: 30 } // Distance réduite
          : { x: block.imageLeft ? -30 : 30 }) // Distance réduite
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0
      }
    };
  };

  return (
    <section className="py-8 md:py-16 bg-gray-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16"
        >
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pourquoi Choisir
          </span>{' '}
          Nos Coques
        </motion.h2>

        <div className="flex flex-col gap-12 md:gap-24 w-full max-w-6xl mx-auto">
          {contentBlocks.map((block) => {
            const [ref, inView] = useInView({
              triggerOnce: false,
              threshold: 0.1, // Seuil réduit
              rootMargin: "-10px" // Marge réduite
            });

            const variants = getVariants(block);

            if (block.isFullWidth) {
              return (
                <motion.div
                  key={block.id}
                  ref={ref}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={variants}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.1
                  }}
                  className={`w-full max-w-6xl mx-auto ${
                    'translate-x-12 sm:translate-x-20 md:translate-x-24'
                  } lg:translate-x-0 transition-transform duration-300`}
                >
                  <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden group rounded-xl">
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="100vw"
                      priority
                    />
                    {/* Overlay gradient et contenu */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="max-w-xl mx-auto text-center"
                        >
                          <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            {block.overlayContent?.mainText}
                          </h3>
                          <p className="text-xl md:text-2xl mb-6 text-gray-200">
                            {block.overlayContent?.subText}
                          </p>
                          <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                            {block.overlayContent?.buttonText}
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div 
                key={block.id}
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.1
                }}
                className="w-full px-4"
              >
                <div className={`flex flex-col lg:flex-row gap-6 md:gap-12 items-center ${
                  block.imageLeft ? '' : 'lg:flex-row-reverse'
                }`}>
                  {/* Image avec décalage alterné sur mobile */}
                  <div className={`w-full lg:w-1/2 ${
                    block.id === 1 ? 'translate-x-12 sm:translate-x-20 md:translate-x-24' :
                    block.id === 2 ? '-translate-x-12 sm:-translate-x-20 md:-translate-x-24' :
                    block.id === 3 ? 'translate-x-12 sm:translate-x-20 md:translate-x-24' : ''
                  } lg:translate-x-0 transition-transform duration-300`}>
                    <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-xl group">
                      <Image
                        src={block.image}
                        alt={block.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      />
                      {/* Overlay avec gradient et bouton */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <div className="max-w-xl mx-auto text-center">
                            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors transform group-hover:scale-105">
                              {block.buttonText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Texte avec le même décalage que les images */}
                  <div className={`w-full lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left ${
                    block.id === 1 ? 'translate-x-12 sm:translate-x-20 md:translate-x-24' :
                    block.id === 2 ? '-translate-x-12 sm:-translate-x-20 md:-translate-x-24' :
                    block.id === 3 ? 'translate-x-12 sm:translate-x-20 md:translate-x-24' : ''
                  } lg:translate-x-0 transition-transform duration-300`}>
                    <h3 className={`font-bold ${
                      block.id === 2 
                        ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' // Tailles plus adaptatives pour la deuxième section
                        : 'text-2xl md:text-3xl' // Tailles standard pour les autres sections
                    }`}>
                      <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        {block.title}
                      </span>
                    </h3>
                    <p className={`leading-relaxed ${
                      block.id === 2
                        ? 'text-sm sm:text-base md:text-lg lg:text-xl'
                        : 'text-base md:text-lg'
                    } text-gray-600`}>
                      {block.highlight && block.description 
                        ? block.description.split(block.highlight).map((part, i, arr) => (
                            <React.Fragment key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className="text-black font-medium">{block.highlight}</span>
                              )}
                            </React.Fragment>
                          ))
                        : block.description
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 