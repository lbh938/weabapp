import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
