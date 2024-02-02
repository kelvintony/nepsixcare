'use client';

import React from 'react';
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RoughNavBar = () => {
  const { user } = useContext(AppContext);
  const router = useRouter();

  //   console.log('from navbar', user);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* <p>
        the navbar/ is user authenticated:{' '}
        {user.authenticated ? 'true' : 'false'}
      </p> */}
      <Link href='/users/dashboard'>dashboard</Link>
      <Link href='/'>home</Link>
      <Link href='/rough'>rough</Link>
    </div>
  );
};

export default RoughNavBar;
