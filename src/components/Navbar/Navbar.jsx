'use client';
import React from 'react';
import styles from './Navbar.module.css';
import LogoItem from '../LogoItem/LogoItemMain/LogoItem';
import Link from 'next/link';
import { IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { signIn, signOut, getSession, useSession } from 'next-auth/react';
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

const Navbar = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  console.log('Navsession', session);
  //
  const { user, setUser } = useContext(AppContext);
  // console.log('NavUser', user);

  const signoutHandler = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div className={styles.navbar_container}>
      <div className={styles.logo_section}>
        <LogoItem />
        <div className={styles.login_container}>
          <Link
            className={`${styles.btn_login} ${styles.btn}`}
            href='/auth/login'
          >
            Login
          </Link>
          <Link
            className={`${styles.btn_register} ${styles.btn}`}
            href='/auth/register'
          >
            Register
          </Link>
          {status === 'authenticated' && (
            <button onClick={signoutHandler}>Logout</button>
          )}

          {user && <p>{user?.user?.fullName}</p>}
        </div>
      </div>
      <div className={styles.navbar_right}>
        <Link className={styles.nav_items} href='/'>
          Home
        </Link>
        <Link className={styles.nav_items} href='/'>
          What We Fix
        </Link>
        <Link className={styles.nav_items} href='/'>
          Our Services
        </Link>
        <Link className={styles.nav_items} href='/'>
          Track Order
        </Link>
        <Link className={styles.nav_items} href='/'>
          Book NOW
        </Link>
        <Link className={styles.nav_items} href='/'>
          Support
        </Link>

        <label className={styles.search_container} htmlFor='search'>
          <IoIosSearch className={styles.search_icon} size={20} />
          <input
            className={styles.search_box}
            type='text'
            placeholder='search'
          />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
