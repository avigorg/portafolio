import {useTranslations} from 'next-intl';
import BirdsScene from '../components/birds-animation/BirdsScene';
import Menu from '../components/layout/Menu';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return  (
    <main>
      <Menu />
      <BirdsScene />
    </main>
  );;
}
