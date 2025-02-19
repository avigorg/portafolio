import { useTranslations } from 'next-intl';
import BirdsScene from '../../components/birds-animation/BirdsScene';
import Menu from '../../components/layout/Menu';
import HeroSection from '../../components/hero-section/HeroSection';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <Menu />
      <div className="relative h-screen w-full">
        <BirdsScene />
        <HeroSection />
      </div>
    </main>
  );
}
