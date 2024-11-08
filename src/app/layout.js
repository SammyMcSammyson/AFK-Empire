import { Inter } from "next/font/google";
import "./globals.css";
import InitialPage from "@/components/InitialPage";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "The-AFK-Empire",
  description: "An exciting game to try",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* <SignedOut>
            <InitialPage />
          </SignedOut> */}
          {/* <SignedIn> */}
          {children}

          {/* </SignedIn> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
