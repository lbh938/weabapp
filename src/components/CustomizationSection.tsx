'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaShoppingBag } from 'react-icons/fa';

const customizationOptions = [
  {
    id: 1,
    title: "Couleur",
    options: ["Noir", "Transparent", "Rouge", "Bleu"],
    icon: "🎨"
  },
  {
    id: 2,
    title: "Matériau",
    options: ["Silicone", "TPU", "Plastique Dur", "Hybride"],
    icon: "🛡️"
  },
  {
    id: 3,
    title: "Protection",
    options: ["Standard", "Renforcée", "Ultra Résistant", "Antichoc"],
    icon: "💪"
  },
  {
    id: 4,
    title: "Finition",
    options: ["Mat", "Brillant", "Soft Touch", "Texturé"],
    icon: "✨"
  }
];

export default function CustomizationSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne de gauche - Prévisualisation */}
        <div className="relative h-[500px] bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src="/iphone-preview.jpg"
            alt="Prévisualisation de la coque"
            fill
            className="object-contain"
          />
          {/* Badges de caractéristiques */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              Ultra Protection
            </span>
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              Anti-choc
            </span>
          </div>
        </div>

        {/* Colonne de droite - Options de personnalisation */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Personnalisez votre protection
          </h2>
          
          {customizationOptions.map((option) => (
            <div key={option.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{option.icon}</span>
                <h3 className="text-lg font-medium text-gray-900">{option.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {option.options.map((choice, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Prix et bouton d'action */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">29.99 €</span>
            </div>
            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <FaShoppingBag className="h-5 w-5" />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 