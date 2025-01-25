import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import ProductCarousel from '../components/ProductCarousel';
import ContentSection from '@/components/ContentSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />
      <HeroSlider />
      <ProductCarousel />
      <ContentSection />
    </div>
  );
}
