import {useTranslations} from 'next-intl';
import BirdsScene from '../components/BirdsScene';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return  (
    <main>
      <BirdsScene />
    </main>
  );;
}
