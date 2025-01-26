'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaTablet, FaLaptop, FaHeadphones } from 'react-icons/fa';

interface MegaMenuItem {
  title: string;
  href: string;
  description?: string;
  image?: string;
}

interface MegaMenuCategory {
  name: string;
  icon: JSX.Element;
  items: MegaMenuItem[];
  featuredItems?: MegaMenuItem[];
}

const megaMenuData: MegaMenuCategory[] = [
  {
    name: 'Smartphones',
    icon: <FaPhone className="w-6 h-6" />,
    items: [
      { 
        title: 'iPhone',
        href: '/products/iphone',
        description: 'Coques premium pour iPhone',
        image: '/images/categories/iphone.jpg'
      },
      { 
        title: 'Samsung',
        href: '/products/samsung',
        description: 'Protection Samsung Galaxy',
        image: '/images/categories/samsung.jpg'
      },
      // ... autres items
    ],
    featuredItems: [
      {
        title: 'Nouveauté iPhone 15',
        href: '/products/iphone-15',
        description: 'Découvrez notre collection exclusive',
        image: '/images/featured/iphone-15.jpg'
      }
    ]
  },
  {
    name: 'Tablettes',
    icon: <FaTablet className="w-6 h-6" />,
    items: [
      {
        title: 'iPad',
        href: '/products/ipad',
        description: 'Protection iPad élégante',
        image: '/images/categories/ipad.jpg'
      },
      // ... autres items
    ]
  },
  // ... autres catégories
];

export function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="relative bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Menu principal */}
          <div className="flex">
            {megaMenuData.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button
                  className={`
                    inline-flex items-center px-4 py-2 text-sm font-medium
                    transition-colors duration-200
                    ${activeCategory === category.name
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeCategory === category.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 w-screen max-w-7xl px-4 sm:px-6 lg:px-8 z-50"
                    >
                      <div className="
                        grid grid-cols-12 gap-6 bg-white dark:bg-gray-800 
                        rounded-xl shadow-xl border border-gray-100 dark:border-gray-700
                        p-6 mt-2
                      ">
                        {/* Liste principale */}
                        <div className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-4">
                          {category.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="group relative"
                            >
                              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                )}
                              </div>
                              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>

                        {/* Section mise en avant */}
                        {category.featuredItems && (
                          <div className="col-span-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                              À la une
                            </h3>
                            {category.featuredItems.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="group block"
                              >
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                  {item.image && (
                                    <Image
                                      src={item.image}
                                      alt={item.title}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  )}
                                </div>
                                <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 