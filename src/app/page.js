import Head from 'next/head.js';
import LandingPage from '../components/LandingPage.jsx';
import BurgerMenu from '@/components/BurgerMenu.jsx';

export default function Homepage() {
  return (
    <>
      <nav>
      <BurgerMenu/>
      </nav>
   
      <h1>Homepage</h1>
      <p>Welcome. Collect money. Upgrade your Gear. Defeat the Boss. Simple.</p>
      <LandingPage />
    </>
  );
}
