'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ProductCarousel } from '@/components/ProductCarousel';
import type { Database } from '@/types/supabase';
import Navbar from '../components/Navbar';
import Hero from '@/components/Hero';
import CustomizationSection from '@/components/CustomizationSection';
import ContentSection from '@/components/ContentSection';

type Product = Database['public']['Tables']['products']['Row'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setProducts(data);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />
      <Hero />
      <ProductCarousel products={products} />
      <CustomizationSection />
      <ContentSection />
    </div>
  );
}
