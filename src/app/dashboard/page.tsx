'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useNotifications } from '@/hooks/useNotifications';
import { GlassCard } from '@/components/GlassCard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaChartLine, FaShoppingBag, FaEuroSign, FaStar } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardStats {
  totalSales: number;
  revenue: number;
  averageOrderValue: number;
  topProducts: any[];
}

export default function Dashboard() {
  const { getProductStats, searchProducts } = useProducts();
  const { notifications, unreadCount } = useNotifications();
  const [period, setPeriod] = useState('week');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const loadDashboardData = async () => {
    try {
      // Charger les statistiques
      const statsData = await getProductStats(period);
      setStats(statsData);

      // Charger les avis récents
      if (searchQuery) {
        const results = await searchProducts(searchQuery);
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [period, searchQuery]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Tableau de bord
      </h1>

      {/* Période */}
      <div className="flex space-x-4">
        {['week', 'month', 'year'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`
              px-4 py-2 rounded-lg
              ${period === p
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
          </button>
        ))}
      </div>

      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center space-x-4">
              <FaShoppingBag className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Ventes totales</p>
                <p className="text-2xl font-bold">{stats.totalSales}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center space-x-4">
              <FaEuroSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Chiffre d'affaires</p>
                <p className="text-2xl font-bold">{stats.revenue.toFixed(2)}€</p>
              </div>
            </div>
          </GlassCard>

          {/* ... autres statistiques ... */}
        </div>
      )}

      {/* Graphique et autres éléments du dashboard */}
    </div>
  );
} 