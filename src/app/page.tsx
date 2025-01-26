import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import ProductCarousel from '../components/ProductCarousel';
import ContentSection from '@/components/ContentSection';
import Hero from '@/components/Hero';
import CustomizationSection from '@/components/CustomizationSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />
      <Hero />
      <ProductCarousel />
      <CustomizationSection />
      <ContentSection />
    </div>
  );
}
