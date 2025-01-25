'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaShoppingBag, FaSearch, FaUser } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaShoppingBag className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PhoneCase
            </span>
          </Link>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1">
                <span>Collections</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full -left-4 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-2">
                  <Link href="/iphone" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md">iPhone</Link>
                  <Link href="/samsung" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md">Samsung</Link>
                  <Link href="/accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md">Accessoires</Link>
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
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <div className={`md:hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link href="/collections" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
            Collections
          </Link>
          <Link href="/nouveautes" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
            Nouveautés
          </Link>
          <Link href="/promos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
            Promos
          </Link>
        </div>
      </div>
    </nav>
  );
} 