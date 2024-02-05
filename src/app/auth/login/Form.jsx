'use client';
import React, { useState, forwardRef, useEffect } from 'react';
import styles from './Login.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import LogoItem from '@/components/LogoItem/LogoItem';
import SiginLoader from '@/components/SigninLoader/SiginLoader';
import toast from 'react-hot-toast';

import { signIn, getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { status, data: session } = useSession();

  let callbackUrl = params.get('callbackUrl') || '/user/dashboard';

  const { user, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const submitFormData = async () => {
    setErrorMessage(null);
    setResponseMessage(null);
    if (formData.email.length === 0 || formData.password.length === 0) {
      return setFormDataError(true);
    }

    if (formData.email && formData.password) {
      setLoading(true);

      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      try {
        if (result.ok) {
          const session = await getSession();
          setUser(session);
          // setLoading(false);
          setFormData({
            email: '',
            password: '',
          });
          // toast.success('Login successful', {
          //   style: {
          //     padding: '10px',
          //     color: '#fff',
          //     backgroundColor: 'green',
          //   },
          //   position: 'bottom-center',
          // });
          // router.push('/user/dashboard');
        } else {
          setLoading(false);
          toast.error(result.error, {
            style: {
              padding: '10px',
              color: '#fff',
              backgroundColor: '#ff0000',
            },
            position: 'bottom-center',
            iconTheme: {
              primary: '#ff3333',
              secondary: '#fff',
            },
          });
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        console.log(error);
      }
    }
  };

  const registerHandler = () => {
    router.push('/auth/register');
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.container_inner}>
        <div onClick={() => router.push('/')} className={styles.logo_item}>
          <LogoItem />
        </div>
        <div className={styles.login_wrapper}>
          <h3>Welcome, kindly Login to your account</h3>

          <div className={styles.input_wrapper}>
            <label htmlFor='email'>
              Email: <br />
              <input
                type='email'
                name='email'
                className={styles.form_control}
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <br />
              {formDataError && formData.email.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor='password'>
              Password: <br />
              <input
                type='password'
                value={formData?.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <br />
              {formDataError && formData.password.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <button
            onClick={() => router.push('/auth/forgot-password')}
            className={styles.forgot_password}
          >
            Forgot Password?
          </button>
          <button
            onClick={submitFormData}
            className={
              loading
                ? `${styles.btn_hero} ${styles.btn_hero_inactive}`
                : styles.btn_hero
            }
            disabled={loading}
          >
            {loading ? <SiginLoader /> : 'Login'}
          </button>
          <button onClick={registerHandler} className={styles.create_account}>
            Don&apos;t have an account?{' '}
            <span className={styles.create_account_inner}>Sign up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
