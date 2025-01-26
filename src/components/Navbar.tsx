'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingBag, FaSearch, FaUser } from 'react-icons/fa';
import Image from 'next/image';

// Logo SVG minimaliste de coque de téléphone
const PhoneCaseLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="text-black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12" y2="18.01" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Ajustement des seuils de déclenchement
        if (window.scrollY > lastScrollY && window.scrollY > 50) { // Réduit à 50px
          setIsVisible(false);
        } 
        else if (window.scrollY < lastScrollY || window.scrollY < 10) { // Réduit à 10px
          setIsVisible(true);
        }

        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar, { passive: true }); // Ajout de passive: true

    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-md shadow-sm transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Hokacase Logo"
                width={40}
                height={40}
                className="w-auto h-8"
                priority
              />
              <span className="hidden sm:block ml-2 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Hokacase
              </span>
            </Link>
          </div>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1 touch-manipulation">
                <span>Collections</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full -left-4 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg ring-1 ring-black/5 p-2">
                  <Link href="/iphone" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">iPhone</Link>
                  <Link href="/samsung" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">Samsung</Link>
                  <Link href="/accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">Accessoires</Link>
                </div>
              </div>
            </div>
            <Link href="/nouveautes" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Nouveautés
            </Link>
            <Link href="/promos" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Promos
            </Link>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaSearch className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaUser className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors relative">
              <FaShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Menu mobile amélioré */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg 
                className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant amélioré */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm shadow-lg">
          <Link 
            href="/collections" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Collections
          </Link>
          <Link 
            href="/nouveautes" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Nouveautés
          </Link>
          <Link 
            href="/promos" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Promos
          </Link>
        </div>
      </div>
    </nav>
  );
} 