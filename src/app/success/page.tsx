'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBox, FaEnvelope } from 'react-icons/fa';
import { GlassCard } from '@/components/GlassCard';

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <div className="relative w-full h-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute inset-0 bg-green-500 rounded-full opacity-20"
              />
              <FaCheckCircle className="w-full h-full text-green-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6"
          >
            Commande confirmée !
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <FaEnvelope className="w-5 h-5" />
              <p>Un email de confirmation a été envoyé</p>
            </div>

            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <FaBox className="w-5 h-5" />
              <p>Votre coque sera expédiée sous 24-48h</p>
            </div>

            <div className="pt-6 space-y-4">
              <button
                onClick={() => router.push('/account/orders')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Suivre ma commande
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                Retour à l'accueil
              </button>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Redirection automatique dans {countdown} secondes...
              </p>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
} 