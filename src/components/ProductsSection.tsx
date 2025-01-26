'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import { ProductCarousel } from './ProductCarousel';

type Product = Database['public']['Tables']['products']['Row'];

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const supabase = createClientComponentClient<Database>();
        const { data } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (data) setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        // Gérer silencieusement l'erreur
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  // Toujours afficher le carousel, même vide
  return <ProductCarousel products={products} />;
} 