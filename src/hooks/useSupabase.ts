import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function useSupabase() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'état de l'authentification
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const createOrder = async (orderData) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id,
            total_amount: orderData.totalAmount,
            status: 'pending',
            shipping_address: orderData.shippingAddress
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Insérer les items de la commande
      const orderItems = orderData.items.map(item => ({
        order_id: data.id,
        product_id: item.productId,
        customizations: {
          model: item.customizations.model,
          color: item.customizations.color,
          material: item.customizations.material,
          protection: item.customizations.protection,
          finish: item.customizations.finish,
          customText: item.customizations.customText,
          imageUrl: item.customizations.imageUrl
        },
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    createOrder
  };
} 