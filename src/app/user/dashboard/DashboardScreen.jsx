'use client';
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

import React from 'react';
import { signIn, signOut, getSession, useSession } from 'next-auth/react';
import styles from './Dashboard.module.css';

const DashboardScreen = () => {
  const { status, data: session } = useSession();
  const { user, setUser } = useContext(AppContext);
  console.log('dashboard ran');
  return (
    <div>
      <h1>
        Ahoy{' '}
        {user && (
          <span
            style={{
              background: 'linear-gradient(90deg,#4ca5ff,#b573f8)',
              // backgroundClip: 'text',
              padding: '0px 5px',
            }}
          >
            {user?.user?.fullName?.split(' ')[0]}
          </span>
        )}
        welcome to Nepsix Care
      </h1>
      <p style={{ fontSize: '15px', marginTop: '10px' }}>
        Health is power they say, always keep your phone healthy
      </p>
    </div>
  );
};

export default DashboardScreen;
