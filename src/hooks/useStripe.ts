'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function useStripe() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (customizations: any) => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customizations,
          items: [{ id: 'custom-case', quantity: 1 }]
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) throw new Error(error);

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePayment,
    loading
  };
} 