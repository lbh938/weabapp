'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaShoppingBag, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { HiColorSwatch, HiCube, HiShieldCheck, HiSparkles, HiPhotograph, HiPencilAlt, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { stripePromise } from '@/lib/stripe';
import { useCart } from '@/context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { useSupabase } from '@/hooks/useSupabase';
import type { CartItem } from '@/types/cart';

interface CustomizationOption {
  id: string;
  label: string;
  price?: number;
  image?: string;
}

type BrandModels = {
  [key in 'Apple' | 'Samsung' | 'Xiaomi' | 'Google' | 'Huawei' | 'OnePlus']: string[];
};

const brands: BrandModels = {
  Apple: [
    'iPhone 15 Pro Max',
    'iPhone 15 Pro',
    'iPhone 15 Plus',
    'iPhone 15',
    'iPhone 14 Pro Max',
    'iPhone 14 Pro',
    'iPhone 14 Plus',
    'iPhone 14',
    'iPhone 13 Pro Max',
    'iPhone 13 Pro',
    'iPhone 13',
    'iPhone 13 Mini',
  ],
  Samsung: [
    'Galaxy S23 Ultra',
    'Galaxy S23+',
    'Galaxy S23',
    'Galaxy Z Fold 5',
    'Galaxy Z Flip 5',
    'Galaxy S22 Ultra',
    'Galaxy S22+',
    'Galaxy S22',
  ],
  Xiaomi: [
    'Xiaomi 13 Pro',
    'Xiaomi 13',
    'Redmi Note 12 Pro+',
  ],
  Google: [
    'Pixel 8 Pro',
    'Pixel 8',
    'Pixel 7 Pro',
    'Pixel 7',
  ],
  Huawei: [
    'P60 Pro',
    'P60',
    'Mate 50 Pro',
    'Mate 50',
  ],
  OnePlus: [
    'OnePlus 11',
    'OnePlus 10 Pro',
    'OnePlus 10T',
  ],
};

const customizationOptions = [
  {
    id: 0,
    title: "Marque",
    options: Object.keys(brands),
    type: "button",
    icon: <HiPhotograph className="w-6 h-6" />
  },
  {
    id: 1,
    title: "Modèle",
    type: "button",
    icon: <HiPhotograph className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Couleur",
    options: [
      "Noir", "Blanc", "Transparent", "Rouge", "Bleu", "Vert",
      "Rose", "Or", "Argent", "Violet", "Orange", "Jaune",
      "Bleu Marine", "Bordeaux", "Gris", "Marron", "Turquoise",
      "Bronze", "Chrome", "Holographique", "Iridescent", "Mat Noir",
      "Pailleté Or", "Pailleté Argent"
    ],
    type: "button",
    icon: <HiColorSwatch className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Matériau",
    options: [
      "Silicone Premium", "Silicone Standard", 
      "TPU Souple", "TPU Renforcé",
      "Plastique Dur", "Plastique Anti-choc",
      "Hybride Classique", "Hybride Renforcé",
      "Cuir Véritable", "Cuir Synthétique",
      "Aluminium", "Carbon Fiber",
      "Bambou", "Liège",
      "Biodégradable", "Recyclé"
    ],
    type: "button",
    icon: <HiCube className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Protection",
    options: [
      "Standard", "Renforcée", "Ultra Résistant", "Antichoc",
      "Protection Militaire", "Double Protection",
      "Protection 360°", "Protection Écran Intégrée",
      "Anti-Rayures", "Anti-Bactérien",
      "Étanche", "Anti-Poussière",
      "Protection Caméra", "Protection Coins Renforcés"
    ],
    type: "button",
    icon: <HiShieldCheck className="w-6 h-6" />
  },
  {
    id: 5,
    title: "Photo",
    type: "file",
    icon: <HiPhotograph className="w-6 h-6" />
  },
  {
    id: 6,
    title: "Texte",
    type: "text",
    icon: <HiPencilAlt className="w-6 h-6" />
  },
  {
    id: 7,
    title: "Finition",
    options: [
      "Mat", "Brillant", "Soft Touch", "Texturé",
      "Satiné", "Métallisé", "Brossé", "Poli",
      "Grainé", "Lisse", "Rugueux", "Velours",
      "Caoutchouté", "Glossy", "Nacré", "Givré"
    ],
    type: "button",
    icon: <HiSparkles className="w-6 h-6" />
  }
];

// Modifiez la constante baseImages pour utiliser des images de démonstration
const baseImages = {
  mockups: {
    devices: {
      "iPhone 15 Pro": "/images/mockups/iphone-15-pro.png",
      "iPhone 15": "/images/mockups/iphone-15.png",
      "iPhone 14 Pro": "/images/mockups/iphone-14-pro.png",
      "iPhone 14": "/images/mockups/iphone-14.png",
      "iPhone 13": "/images/mockups/iphone-13.png",
      "Samsung S23": "/images/mockups/samsung-s23.png",
      "Samsung S22": "/images/mockups/samsung-s22.png"
    },
    colors: {
      "Noir": "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      "Transparent": "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg",
      "Rouge": "https://images.pexels.com/photos/5741605/pexels-photo-5741605.jpeg",
      "Bleu": "https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg"
    },
    materials: {
      "Silicone": {
        preview: "https://images.pexels.com/photos/4071882/pexels-photo-4071882.jpeg",
        thumbnail: "/images/materials/silicone.png"
      },
      "TPU": {
        preview: "https://images.pexels.com/photos/4071667/pexels-photo-4071667.jpeg",
        thumbnail: "/images/materials/tpu.png"
      },
      "Plastique Dur": {
        preview: "https://images.pexels.com/photos/5741604/pexels-photo-5741604.jpeg",
        thumbnail: "/images/materials/hard-plastic.png"
      },
      "Hybride": {
        preview: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
        thumbnail: "/images/materials/hybrid.png"
      }
    }
  }
};

export default function CustomizationSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [customText, setCustomText] = useState("");
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;
  const { addToCart, cartCount } = useCart();
  const [isVibrating, setIsVibrating] = useState(false);
  const router = useRouter();
  const { createOrder } = useSupabase();

  // Get available models based on selected brand
  const getAvailableModels = () => {
    const selectedBrand = selectedOptions[0];
    return selectedBrand ? brands[selectedBrand as keyof BrandModels] : [];
  };

  // Modified handleOptionSelect to handle model filtering
  const handleOptionSelect = (tabId: number, option: string) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev, [tabId]: option };
      // Reset model selection when brand changes
      if (tabId === 0) {
        delete newOptions[1];
      }
      return newOptions;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomImage(e.target.files[0]);
    }
  };

  const getPaginatedOptions = (options: string[]) => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return options.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getPageCount = (options: string[]) => {
    return Math.ceil(options.length / ITEMS_PER_PAGE);
  };

  // Modifiez le gestionnaire de l'onglet actif
  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    setCurrentPage(0); // Reset pagination when changing tabs
  };

  // Effet de vibration toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVibrating(true);
      setTimeout(() => setIsVibrating(false), 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async (mode: 'direct' | 'cart') => {
    if (Object.keys(selectedOptions).length < customizationOptions.length) {
      return;
    }

    const customItem: CartItem = {
      id: uuidv4(),
      name: 'Coque Personnalisée',
      model: selectedOptions[1] || '',
      color: selectedOptions[2] || '',
      material: selectedOptions[3] || '',
      protection: selectedOptions[4] || '',
      finish: selectedOptions[7] || '',
      customText: customText,
      imageUrl: customImage ? URL.createObjectURL(customImage) : undefined,
      quantity: 1,
      price: 29.99
    };

    try {
      if (mode === 'cart') {
        addToCart(customItem);
        router.push('/panier');
        return;
      }

      // Créer la commande dans Supabase
      const orderData = {
        items: [customItem],
        totalAmount: customItem.price,
        shippingAddress: null // À implémenter avec le formulaire d'adresse
      };

      const order = await createOrder(orderData);

      // Continuer avec le checkout Stripe
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          items: [customItem],
          customizations: {
            model: customItem.model,
            color: customItem.color,
            material: customItem.material,
            protection: customItem.protection,
            finish: customItem.finish,
            customText: customItem.customText,
            imageUrl: customItem.imageUrl,
          },
        }),
      });

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Icône du panier en haut à droite */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <FaShoppingCart className="cart-icon w-6 h-6 text-gray-900 transition-transform hover:scale-110" />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </div>
      </div>

      {/* Titre avec gradient multicolore */}
      <div className="text-center mb-10">
        <div className="mb-3">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
              Vos Créations
            </span>
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 bg-clip-text text-transparent">
              Votre Personnalisation
            </span>
          </h2>
        </div>
        <p className="text-lg text-gray-600 font-medium">
          Espace de personnalisation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne de gauche - Prévisualisation */}
        <div className="relative h-[700px] lg:h-[800px] bg-gradient-to-b from-gray-100 to-white rounded-xl overflow-hidden">
          {/* Image de base de l'appareil */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-[400px] max-h-[800px]">
              {/* Image de l'appareil */}
              <div className="relative w-full h-full">
                <Image
                  src={selectedOptions[1] 
                    ? baseImages.mockups.devices[selectedOptions[1]]
                    : "/images/mockups/default-phone.png"}
                  alt={selectedOptions[1] || "Sélectionnez un modèle"}
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Calque de couleur/matériau sélectionné */}
                {selectedOptions[2] && (
                  <div className="absolute inset-0">
                    <Image
                      src={baseImages.mockups.colors[selectedOptions[2]]}
                      alt={selectedOptions[2]}
                      fill
                      className="object-contain opacity-75"
                    />
                  </div>
                )}

                {/* Affichage du texte personnalisé si présent */}
                {customText && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-2xl font-bold text-black bg-white/50 px-4 py-2 rounded-lg transform rotate-[-15deg] select-none">
                      {customText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Badges des options sélectionnées */}
          <div className="absolute bottom-8 left-8 flex flex-wrap gap-2">
            {Object.entries(selectedOptions).map(([tabId, option]) => (
              <span key={tabId} className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                {option}
              </span>
            ))}
          </div>

          {/* Indicateur de rotation */}
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
            <svg className="w-5 h-5 animate-spin-slow" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 1 1 4 12A8 8 0 0 1 12 4" />
            </svg>
            Rotation 3D disponible
          </div>
        </div>

        {/* Colonne de droite - Options de personnalisation */}
        <div className="flex flex-col h-[700px] lg:h-[800px]">
          {/* En-tête */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Personnalisez votre protection
            </h2>
          </div>
          
          {/* Zone des options */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Onglets de navigation modernisés */}
            <div className="flex flex-wrap gap-3 mb-6">
              {customizationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleTabChange(option.id)}
                  className={`
                    relative px-5 py-2.5 rounded-2xl flex items-center gap-3
                    transition-all duration-300 transform hover:scale-105
                    ${activeTab === option.id 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white scale-105 shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    }
                  `}
                >
                  <span className={`transition-colors duration-300 ${
                    activeTab === option.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {option.icon}
                  </span>
                  <span className="font-medium whitespace-nowrap text-sm">{option.title}</span>
                </button>
              ))}
            </div>

            {/* Options pour l'onglet actif */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6 max-h-[400px] overflow-y-auto">
              {(() => {
                const activeOption = customizationOptions.find(opt => opt.id === activeTab);
                
                if (!activeOption) return null;

                switch (activeOption.type) {
                  case "button":
                    const options = activeOption.id === 1 
                      ? getAvailableModels() 
                      : activeOption.options;
                    
                    const paginatedOptions = getPaginatedOptions(options);
                    const pageCount = getPageCount(options);

                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {paginatedOptions?.map((choice, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionSelect(activeOption.id, choice)}
                              className={`
                                px-4 py-3 rounded-2xl text-sm font-medium
                                transition-all duration-300 transform hover:scale-105
                                ${selectedOptions[activeOption.id] === choice
                                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'
                                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                }
                                ${!selectedOptions[0] && activeOption.id === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                              disabled={activeOption.id === 1 && !selectedOptions[0]}
                            >
                              {choice}
                            </button>
                          ))}
                        </div>

                        {/* Pagination controls */}
                        {pageCount > 1 && (
                          <div className="flex items-center justify-center gap-4 mt-4">
                            <button
                              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                              disabled={currentPage === 0}
                              className={`
                                p-2 rounded-full transition-all
                                ${currentPage === 0 
                                  ? 'text-gray-400 cursor-not-allowed' 
                                  : 'text-gray-700 hover:bg-gray-100'
                                }
                              `}
                            >
                              <HiChevronLeft className="w-5 h-5" />
                            </button>
                            
                            <div className="flex items-center gap-2">
                              {[...Array(pageCount)].map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentPage(idx)}
                                  className={`
                                    w-2 h-2 rounded-full transition-all
                                    ${currentPage === idx 
                                      ? 'bg-gray-800 w-4' 
                                      : 'bg-gray-300 hover:bg-gray-400'
                                    }
                                  `}
                                />
                              ))}
                            </div>

                            <button
                              onClick={() => setCurrentPage(prev => Math.min(pageCount - 1, prev + 1))}
                              disabled={currentPage === pageCount - 1}
                              className={`
                                p-2 rounded-full transition-all
                                ${currentPage === pageCount - 1 
                                  ? 'text-gray-400 cursor-not-allowed' 
                                  : 'text-gray-700 hover:bg-gray-100'
                                }
                              `}
                            >
                              <HiChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );

                  case "file":
                    return (
                      <div className="space-y-4">
                        <label className="block w-full cursor-pointer">
                          <div className="rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors">
                            <HiPhotograph className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <span className="text-gray-600">Cliquez pour ajouter une photo</span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </div>
                        </label>
                        {customImage && (
                          <div className="text-sm text-gray-600">
                            Image sélectionnée : {customImage.name}
                          </div>
                        )}
                      </div>
                    );

                  case "text":
                    return (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          placeholder="Entrez votre texte personnalisé"
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                        />
                        {customText && (
                          <div className="flex gap-2 flex-wrap">
                            <span className="bg-gray-100 px-3 py-1.5 rounded-2xl text-sm text-gray-700">
                              Aperçu : {customText}
                            </span>
                          </div>
                        )}
                      </div>
                    );

                  default:
                    return null;
                }
              })()}
            </div>

            {/* Prix et boutons d'action */}
            <div className="pt-6 border-t space-y-4">
              {/* Prix et badges */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">-15% Promo</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 line-through">35.99 €</span>
                  <span className="text-2xl font-bold text-gray-900 ml-2">29.99 €</span>
                </div>
              </div>

              {/* Boutons d'action empilés */}
              <div className="space-y-3">
                <motion.button 
                  onClick={() => handleCheckout('direct')}
                  className={`w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 ${
                    isVibrating ? 'animate-vibrate' : ''
                  }`}
                  animate={isVibrating ? {
                    x: [-2, 2, -2, 2, 0],
                    transition: { duration: 0.5 }
                  } : {}}
                  disabled={Object.keys(selectedOptions).length < customizationOptions.length}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Acheter maintenant</span>
                </motion.button>

                <button 
                  onClick={() => handleCheckout('cart')}
                  className="w-full bg-white border-2 border-gray-900 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  disabled={Object.keys(selectedOptions).length < customizationOptions.length}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Ajouter au panier</span>
                </button>
              </div>

              {/* Badges de confiance */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Livraison rapide</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>Garantie qualité</span>
                </div>
              </div>

              {/* Info livraison - Version compacte */}
              <div className="text-xs text-gray-600 text-center">
                Livraison estimée: 28-01-2025 - 29-01-2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 