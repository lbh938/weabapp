export const dynamic = 'force-dynamic';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          throw new Error('Supabase environment variables are not configured');
        }

        const supabase = createClientComponentClient<Database>();
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (supabaseError) throw supabaseError;
        if (data) setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
      }
    };

    loadProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-300">
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

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
