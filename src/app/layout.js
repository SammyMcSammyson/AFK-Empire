import { Inter } from 'next/font/google';
import './globals.css';
import InitialPage from '@/components/InitialPage';
import BurgerMenu from '@/components/BurgerMenu';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'The-AFK-Empire',
  description: 'An exciting game to try',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
        <header>
            <BurgerMenu />
          </header>

          <SignedOut>
            <InitialPage />
          </SignedOut>
          <SignedIn>
          {children}

          </SignedIn>
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
