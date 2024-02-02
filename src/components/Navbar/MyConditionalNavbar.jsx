'use client';

import Navbar from './Navbar';
import Footer from '../Footer/Footer';
import { usePathname } from 'next/navigation';

const MyConditionalNavbar = ({ children }) => {
  const pathname = usePathname();
  const regex = new RegExp('/user/*');
  const regexa = new RegExp('/auth/*');

  return (
    <>
      {regex.test(pathname) || regexa.test(pathname) ? null : <Navbar />}
      {children}
      {/* {regex.test(pathname) || regexa.test(pathname) ? null : <Footer />} */}
    </>
  );
};

export default MyConditionalNavbar;
