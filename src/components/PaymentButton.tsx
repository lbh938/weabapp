'use client';

import { useStripe } from '@/hooks/useStripe';
import { motion } from 'framer-motion';

interface PaymentButtonProps {
  customizations: any;
  className?: string;
}

export function PaymentButton({ customizations, className = '' }: PaymentButtonProps) {
  const { handlePayment, loading } = useStripe();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handlePayment(customizations)}
      disabled={loading}
      className={`
        w-full py-3 px-6 rounded-xl text-white
        bg-gradient-to-r from-blue-600 to-blue-700
        hover:from-blue-700 hover:to-blue-800
        disabled:from-gray-400 disabled:to-gray-500
        disabled:cursor-not-allowed
        transition-all duration-200
        shadow-lg
        ${className}
      `}
    >
      {loading ? 'Chargement...' : 'Acheter maintenant'}
    </motion.button>
  );
} 