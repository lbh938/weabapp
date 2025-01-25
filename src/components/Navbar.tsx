import { useState } from 'react';
import Link from 'next/link';
import { FaPhone } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <FaPhone className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl">PhoneCase</span>
            </Link>
          </div>

          {/* Menu pour desktop */}
          <div className="hidden sm:flex sm:items-center">
            <div className="ml-10 flex items-center space-x-4">
              <div className="relative group">
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
                  Produits
                  <span className="ml-1">▼</span>
                </button>
                <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 rounded-md">
                  <Link href="/cases" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Coques
                  </Link>
                  <Link href="/accessories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Accessoires
                  </Link>
                </div>
              </div>
              <Link href="/about" className="px-3 py-2 text-gray-600 hover:text-gray-900">
                À propos
              </Link>
              <Link href="/contact" className="px-3 py-2 text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <svg
                className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <div className="relative">
            <button className="block px-3 py-2 w-full text-left text-gray-600 hover:text-gray-900">
              Produits ▼
            </button>
            <div className="pl-4">
              <Link href="/cases" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Coques
              </Link>
              <Link href="/accessories" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Accessoires
              </Link>
            </div>
          </div>
          <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
            À propos
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
} 