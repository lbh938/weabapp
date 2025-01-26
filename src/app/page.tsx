'use client';

export const dynamic = 'force-dynamic';

import Navbar from '../components/Navbar';
import Hero from '@/components/Hero';
import { ProductsSection } from '@/components/ProductsSection';
import CustomizationSection from '@/components/CustomizationSection';
import ContentSection from '@/components/ContentSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />
      <Hero />
      <ProductsSection />
      <CustomizationSection />
      <ContentSection />
    </div>
  );
}
