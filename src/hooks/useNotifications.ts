'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface Notification {
  id: string;
  read: boolean;
  title: string;
  message: string;
  created_at: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
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

  const handleNewReview = (review: any) => {
    // Version simple sans JSX
    toast.success(`Nouvel avis : ${review.rating} étoiles - ${review.review?.substring(0, 50) || ''}...`, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#fff',
        color: '#333',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      icon: '⭐',
    });

    // Mettre à jour les notifications
    loadNotifications();
  };

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (!error) {
      loadNotifications();
    }
  };

  const clearAll = async () => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);

    if (!error) {
      loadNotifications();
    }
  };

  return {
    notifications,
    unreadCount,
    loadNotifications,
    markAsRead,
    clearAll
  };
} 