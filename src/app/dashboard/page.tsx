'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useNotifications } from '@/hooks/useNotifications';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { getProductStats, searchProducts } = useProducts();
  const { notifications, unreadCount } = useNotifications();
  const [period, setPeriod] = useState('week');
  const [stats, setStats] = useState(null);
  const [recentReviews, setRecentReviews] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [period]);

  const loadDashboardData = async () => {
    // Charger les statistiques
    const statsData = await getProductStats('all', period);
    setStats(statsData);

    // Charger les avis récents
    const reviews = await searchProducts('', {}, { field: 'created_at', direction: 'desc' }, 1, 5);
    setRecentReviews(reviews);

    // Charger les produits les plus vendus
    const topSelling = await searchProducts('', {}, { field: 'sales', direction: 'desc' }, 1, 5);
    setTopProducts(topSelling);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Cartes de statistiques */}
          <StatCard
            title="Ventes Totales"
            value={stats?.total_sales || 0}
            trend={+5.2}
            icon="📈"
          />
          <StatCard
            title="Revenu"
            value={`${stats?.total_revenue || 0}€`}
            trend={+3.1}
            icon="💰"
          />
          <StatCard
            title="Avis"
            value={recentReviews.length}
            trend={+12.5}
            icon="⭐"
          />
          <StatCard
            title="Notifications"
            value={unreadCount}
            trend={0}
            icon="🔔"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Graphique des ventes */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Évolution des ventes</h3>
            {stats?.daily_stats && (
              <Line
                data={{
                  labels: stats.daily_stats.map(d => d.date),
                  datasets: [{
                    label: 'Ventes',
                    data: stats.daily_stats.map(d => d.sales),
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.1
                  }]
                }}
              />
            )}
          </div>

          {/* Graphique des revenus */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Revenus</h3>
            {stats?.daily_stats && (
              <Bar
                data={{
                  labels: stats.daily_stats.map(d => d.date),
                  datasets: [{
                    label: 'Revenus',
                    data: stats.daily_stats.map(d => d.revenue),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)'
                  }]
                }}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Derniers avis */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Derniers avis</h3>
            <div className="space-y-4">
              {recentReviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </div>

          {/* Produits les plus vendus */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Top Produits</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <ProductCard key={index} product={product} rank={index + 1} />
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Notifications récentes</h3>
            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <NotificationItem key={index} notification={notif} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composants auxiliaires
function StatCard({ title, value, trend, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`mt-2 text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="border-l-4 border-blue-500 pl-4">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium">{review.user_name}</p>
          <p className="text-sm text-gray-500">{review.review}</p>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, rank }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-2xl font-bold text-gray-400">#{rank}</span>
      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-gray-500">{product.sales} ventes</p>
      </div>
      <p className="font-medium text-green-600">{product.price}€</p>
    </div>
  );
}

function NotificationItem({ notification }) {
  return (
    <div className={`p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="font-medium">{notification.title}</p>
          <p className="text-sm text-gray-500">{notification.message}</p>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(notification.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
} 