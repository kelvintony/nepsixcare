'use client';
import React, { useState } from 'react';
import styles from './Register.module.css';
import LogoItem from '@/components/LogoItem/LogoItem';
import SiginLoader from '@/components/SigninLoader/SiginLoader';
import toast from 'react-hot-toast';

import { IoEyeOffSharp } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';

import axios from 'axios';

const Register = () => {
  const router = useRouter();

  const params = useSearchParams();
  const { status, data: session } = useSession();

  let callbackUrl = params.get('callbackUrl') || '/user/dashboard';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPasword, setShowPasword] = useState(false);

  const submitFormData = async () => {
    setErrorMessage(null);
    setResponseMessage(null);
    if (
      formData.firstName.length === 0 ||
      formData.lastName.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.confirmPassword.length === 0 ||
      formData.phoneNumber.length === 0
    ) {
      return setFormDataError(true);
    }

    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.phoneNumber
    ) {
      try {
        setLoading(true);
        const res = await axios.post('/api/auth/register', formData);
        if (res) {
          setLoading(false);
          setResponseMessage(res.data.message);
          toast.success(res.data.message, {
            style: {
              padding: '10px',
              color: '#fff',
              backgroundColor: 'green',
            },
            position: 'bottom-center',
            // iconTheme: {
            //   primary: '#713200',
            //   secondary: '#FFFAEE',
            // },
          });
          router.push('/auth/register/#verify_user');
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // router.push('/auth/login');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
          });
        }
        setLoading(false);
        console.clear();
      } catch (error) {
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        toast.error(error?.response?.data?.message, {
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
        console.clear();
      }
    }
  };

  const loginHandler = () => {
    router.push('/auth/login');
  };
  return (
    <div id='verify_user' className={styles.login_container}>
      <div className={styles.container_inner}>
        <div onClick={() => router.push('/')} className={styles.logo_item}>
          <LogoItem />
        </div>
        <div className={styles.login_wrapper}>
          <h3>Create account</h3>
          <p>Set up your Nepsix Care account in just 2mins.</p>

          {responseMessage ? (
            <h4
              style={{
                color: '#09CE5A',
                padding: '5px',
              }}
            >
              {responseMessage}
            </h4>
          ) : (
            <>
              <div className={styles.input_wrapper}>
                <label htmlFor='firstName'>
                  First Name: <br />
                  <input
                    type='text'
                    name='firstName'
                    className={styles.form_control}
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <br />
                  {formDataError && formData.firstName.length <= 0 ? (
                    <span style={{ color: 'red' }}>* required</span>
                  ) : (
                    ''
                  )}
                </label>
              </div>
              <div className={styles.input_wrapper}>
                <label htmlFor='lastName'>
                  Last Name: <br />
                  <input
                    type='text'
                    name='lastName'
                    className={styles.form_control}
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                  <br />
                  {formDataError && formData.lastName.length <= 0 ? (
                    <span style={{ color: 'red' }}>* required</span>
                  ) : (
                    ''
                  )}
                </label>
              </div>
              <div className={styles.input_wrapper}>
                <label htmlFor='email'>
                  Email: <br />
                  <input
                    type='email'
                    name='email'
                    className={styles.form_control}
                    value={formData.email}
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
                <label htmlFor='phoneNumber'>
                  Phone number: <br />
                  <input
                    type='phoneNumber'
                    name='phoneNumber'
                    className={styles.form_control}
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                  <br />
                  {formDataError && formData.phoneNumber.length <= 0 ? (
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
                    style={{ paddingRight: '40px' }}
                    type={showPasword ? 'text' : 'password'}
                    value={formData.password}
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
                  {showPasword ? (
                    <IoEyeOffSharp
                      onClick={() => setShowPasword(!showPasword)}
                      className={styles.password_icon}
                      size={20}
                    />
                  ) : (
                    <IoEyeOutline
                      onClick={() => setShowPasword(!showPasword)}
                      className={styles.password_icon}
                      size={20}
                    />
                  )}
                </label>
              </div>
              <div className={styles.input_wrapper}>
                <label htmlFor='confirmPassword'>
                  Confirm Password: <br />
                  <input
                    type={showPasword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData?.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <br />
                  {formDataError && formData.confirmPassword.length <= 0 ? (
                    <span style={{ color: 'red' }}>* required</span>
                  ) : (
                    ''
                  )}
                </label>
              </div>
              {/* <div className={styles.input_wrapper}>
                <label htmlFor='referralId'>
                  Referral ID: <br />
                  <input
                    type='text'
                    value={formData.referralId}
                    placeholder='optional'
                    onChange={(e) =>
                      setFormData({ ...formData, referralId: e.target.value })
                    }
                  />
                  <br />
                  {formDataError && formData.referralId.length <= 0 ? (
                    <span style={{ color: 'red' }}>* required</span>
                  ) : (
                    ''
                  )}
                </label>
              </div> */}
              <p>
                By clicking the &#34;Create My Account&#34; button, you agree to{' '}
                <br />
                dexomPay&apos;s{' '}
                <span
                  style={{ cursor: 'pointer' }}
                  className={styles.create_account_inner}
                >
                  terms of acceptable use.
                </span>{' '}
              </p>
              <button
                onClick={submitFormData}
                className={
                  loading
                    ? `${styles.btn_hero} ${styles.btn_hero_inactive}`
                    : styles.btn_hero
                }
                disabled={loading}
              >
                {loading ? <SiginLoader /> : 'Create my account'}
              </button>
              <button onClick={loginHandler} className={styles.create_account}>
                Already have an account?{' '}
                <span className={styles.create_account_inner}>Log in</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
