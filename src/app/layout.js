import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/components/Providers/Provider';
import RoughNavBar from '@/components/Rough/RoughNavBar';
import NextTopLoader from 'nextjs-toploader';
import Navbar from '@/components/Navbar/Navbar';
import MyConditionalNavbar from '@/components/Navbar/MyConditionalNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nepsix Care',
  description: 'Leading Industry In Repairs',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextTopLoader />
        <Provider>
          {/* <Navbar /> */}
          <MyConditionalNavbar>{children}</MyConditionalNavbar>
        </Provider>
      </body>
    </html>
  );
}
