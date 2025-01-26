'use client';

import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/GlassCard';
import { FaLock } from 'react-icons/fa';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-8 text-center">
          <FaLock className="w-16 h-16 mx-auto text-red-500 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retour à l'accueil
          </button>
        </GlassCard>
      </div>
    </div>
  );
} 