'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
import { SiKlarna } from 'react-icons/si';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Charger Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Carte bancaire',
    icon: <FaCreditCard className="w-6 h-6" />,
    description: 'Paiement sécurisé par carte'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <FaPaypal className="w-6 h-6" />,
    description: 'Paiement rapide via PayPal'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: <FaApplePay className="w-6 h-6" />,
    description: 'Paiement avec Apple Pay'
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: <FaGooglePay className="w-6 h-6" />,
    description: 'Paiement avec Google Pay'
  },
  {
    id: 'klarna',
    name: 'Klarna',
    icon: <SiKlarna className="w-6 h-6" />,
    description: 'Paiement en 3x sans frais'
  }
];

function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message);
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, paymentMethod: 'card' }),
      });

      const { clientSecret } = await response.json();

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (confirmError) {
        setError(confirmError.message);
      } else {
        onSuccess();
      }
    } catch (e) {
      setError('Une erreur est survenue lors du paiement.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`
          w-full py-2 px-4 rounded-lg text-white
          ${processing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }
        `}
      >
        {processing ? 'Traitement...' : 'Payer maintenant'}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [clientSecret, setClientSecret] = useState('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentMethodSelect = async (methodId: string) => {
    setSelectedPayment(methodId);
    
    if (methodId === 'card') {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 29.99,
            paymentMethod: methodId,
          }),
        });
        
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handlePaymentSuccess = () => {
    router.push('/success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finaliser votre commande</h1>
          <div className="mt-4 flex justify-center space-x-4">
            <div className={`flex items-center ${step === 'shipping' ? 'text-blue-600' : 'text-gray-500'}`}>
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">1</span>
              Livraison
            </div>
            <div className="border-t-2 w-16 mt-4"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-500'}`}>
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">2</span>
              Paiement
            </div>
          </div>
        </div>

        {/* Formulaire de livraison */}
        {step === 'shipping' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleShippingSubmit}
            className="bg-white rounded-lg shadow-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shippingInfo.firstName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shippingInfo.lastName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ville</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Code postal</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shippingInfo.postalCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pays</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shippingInfo.country}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                >
                  <option value="">Sélectionnez</option>
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="LU">Luxembourg</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continuer vers le paiement
              </button>
            </div>
          </motion.form>
        )}

        {/* Sélection du mode de paiement */}
        {step === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`
                      relative flex items-center p-4 cursor-pointer rounded-lg border-2
                      ${selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                    `}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      className="sr-only"
                      checked={selectedPayment === method.id}
                      onChange={(e) => handlePaymentMethodSelect(e.target.value)}
                    />
                    <div className="flex items-center">
                      <div className="mr-4 text-gray-600">{method.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Formulaire de carte Stripe */}
              {selectedPayment === 'card' && clientSecret && (
                <div className="mt-6">
                  <Elements stripe={stripePromise} options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#2563eb',
                      },
                    },
                  }}>
                    <CheckoutForm
                      amount={29.99}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                </div>
              )}

              <div className="flex justify-between space-x-4 mt-8">
                <button
                  onClick={() => setStep('shipping')}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Retour
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Résumé de la commande */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Résumé de la commande</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>29.99 €</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-medium">
              <span>Total</span>
              <span>29.99 €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 