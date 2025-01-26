import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Charger les notifications existantes
    loadNotifications();

    // Écouter les nouvelles notifications en temps réel
    const channel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'product_ratings',
        },
        (payload) => {
          handleNewReview(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    }
  };

  const handleNewReview = (review) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-white shadow-lg rounded-lg p-4`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-blue-500">⭐</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              Nouvel avis ({review.rating} étoiles)
            </p>
            <p className="text-sm text-gray-500">{review.review.substring(0, 50)}...</p>
          </div>
        </div>
      </div>
    ));
  };

  return {
    notifications,
    unreadCount,
    loadNotifications
  };
} 