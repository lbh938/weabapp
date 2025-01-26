'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  model: string;
  color: string;
  material: string;
  protection: string;
  finish: string;
  customText?: string;
  customImage?: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Coque Personnalisée',
      model: 'iPhone 15 Pro',
      color: 'Noir',
      material: 'Silicone Premium',
      protection: 'Protection Militaire',
      finish: 'Mat',
      customText: 'John Doe',
      price: 29.99,
      quantity: 1,
      image: '/images/mockups/iphone-15-pro.png'
    }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des articles */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex gap-6">
                {/* Image du produit */}
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Détails du produit */}
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)} €</p>
                  </div>

                  {/* Caractéristiques */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <p>Modèle: {item.model}</p>
                    <p>Couleur: {item.color}</p>
                    <p>Matériau: {item.material}</p>
                    <p>Protection: {item.protection}</p>
                    <p>Finition: {item.finish}</p>
                    {item.customText && <p>Texte: {item.customText}</p>}
                  </div>

                  {/* Contrôles de quantité */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <FaMinus className="w-4 h-4" />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <FaPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-2"
                    >
                      <FaTrash className="w-4 h-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Votre panier est vide</p>
              <Link
                href="/"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continuer vos achats
              </Link>
            </div>
          )}
        </div>

        {/* Résumé de la commande */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
            <h2 className="text-xl font-bold mb-6">Résumé de la commande</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="font-medium">{shipping.toFixed(2)} €</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">{total.toFixed(2)} €</span>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Commander maintenant</span>
            </button>

            <Link
              href="/"
              className="block text-center text-gray-600 hover:text-gray-900"
            >
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 