'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient, User } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

export function useSupabase() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Vérifier l'état de l'authentification
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const createOrder = async (orderData: any) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id,
            items: orderData.items,
            total_amount: orderData.totalAmount,
            shipping_address: orderData.shippingAddress,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const getOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  const getOrderById = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    createOrder,
    getOrders,
    getOrderById,
  };
} 