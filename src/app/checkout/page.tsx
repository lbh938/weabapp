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
import { GlassCard } from '@/components/GlassCard';

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

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
}

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'card',
    name: 'Carte bancaire',
    description: 'Paiement sécurisé par carte',
    icon: <span>💳</span>,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Paiement via PayPal',
    icon: <span>🅿️</span>,
  },
];

function CheckoutForm({ amount, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (submitError) {
        setError(submitError.message || 'Une erreur est survenue');
      } else {
        onSuccess();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`
          w-full py-3 px-6 rounded-xl text-white
          ${processing || !stripe
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
          }
          transition-all duration-200
          shadow-lg
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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
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

  useEffect(() => {
    // Récupérer le client secret depuis votre API
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 2999 }), // 29.99€
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Paiement sécurisé
          </h1>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {paymentOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment(option.id)}
                  className={`
                    p-4 rounded-xl text-left
                    ${selectedPayment === option.id
                      ? 'bg-blue-50 dark:bg-gray-800 border-2 border-blue-500'
                      : 'bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700'
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-medium">{option.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {option.description}
                  </div>
                </motion.button>
              ))}
            </div>

            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm amount={2999} onSuccess={handlePaymentSuccess} />
              </Elements>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
} 