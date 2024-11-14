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
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'The-AFK-Empire',
  description: 'An exciting game to try',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider dynamic>
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
            <ToastContainer
              position='bottom-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='colored'
            />
          </SignedIn>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
