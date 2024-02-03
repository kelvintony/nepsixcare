'use client';
import Link from 'next/link';
import styles from '@/components/widgets/Widgets.module.css';
import { RxDashboard } from 'react-icons/rx';
import { BsClipboardData, BsJournalBookmarkFill } from 'react-icons/bs';
import { FiLogOut, FiPhoneCall } from 'react-icons/fi';
import { FaHornbill } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { RiMenu3Line, RiPriceTag2Line } from 'react-icons/ri';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiAdminLine } from 'react-icons/ri';
import { AiOutlineWhatsApp } from 'react-icons/ai';

import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { MdRefresh } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

const menuItems = [
  {
    id: 'dasboard',
    url: '/user/dashboard',
    menuName: 'Dashboard',
    iconsType: <RxDashboard />,
  },
  {
    id: 'bookOrder',
    url: '/user/book-order',
    menuName: 'Book Order',
    iconsType: <BsClipboardData />,
  },

  {
    id: 'transaction',
    url: '/user/dashboard',
    menuName: 'Transactions',
    iconsType: <BsJournalBookmarkFill />,
  },
  {
    id: 'trackOrder',
    url: '/user/dashboard',
    menuName: 'Track Order',
    iconsType: <RiPriceTag2Line />,
  },
];
export default function LayoutScreen({ children }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const { status, data: session } = useSession();

  const [loadBalance, setLoadBalance] = useState(false);

  const { user, setUser } = useContext(AppContext);

  console.log('dashboard Layout ran');

  // console.log('from dashboard', state?.userTransactionProfile);
  // console.log('from dashboard', state?.userTransactionProfile?.loading);

  // useEffect(() => {
  //   const fetchUserTransaction = async () => {
  //     // dispatch({ type: authConstants.FETCH_USER_TRANSACTION_DETAILS_REQUEST });
  //     try {
  //       const res = await axios.get('/api/customers/user-transaction-details');
  //       if (res) {
  //         dispatch({
  //           type: authConstants.FETCH_USER_TRANSACTION_DETAILS,
  //           payload: res.data,
  //         });
  //       }
  //     } catch (error) {
  //       console.log('');
  //     }
  //   };
  //   fetchUserTransaction();
  // }, [dispatch]);

  // const fetchUserTransaction = async () => {
  //   setLoadBalance(true);
  //   try {
  //     const res = await axios.get('/api/customers/user-transaction-details');
  //     if (res) {
  //       setLoadBalance(false);

  //       dispatch({
  //         type: authConstants.FETCH_USER_TRANSACTION_DETAILS,
  //         payload: res.data,
  //       });
  //     }
  //   } catch (error) {
  //     setLoadBalance(false);

  //     console.log(error);
  //   }
  // };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const toggle = () => {
    router.push('/user/dashboard/#payments');
  };

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/auth/login' });
  };
  return (
    <div className={styles.dashboard_container}>
      {/* ist content  */}
      <div className={styles.dashboard_topBar}>
        <div className={styles.site_message}>
          <h3>Announcement!!</h3>
          <p>Always check your inbox to know the status of your order!</p>
        </div>
        <RiMenu3Line onClick={toggleMenu} className={styles.mobile_men_close} />
      </div>

      <div className={`${styles.dashboard_topBar} ${styles.extra_menu}`}>
        <div className={`${styles.user_info} ${styles.margin_top}`}>
          {user?.user?.fullName && <h4>{user?.user?.fullName.slice(0, 2)}</h4>}
          <div className={styles.user_balance}>
            <p>{user?.user?.fullName}</p>
            {/* <p style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {state?.userTransactionProfile?.loading && <BalanceLoader />}
              <>
                &#8358;
                {state?.userTransactionProfile?.accountBalance?.toLocaleString()}
                
                5000
              </>

              {''}
              {loadBalance ? null : ( // <BalanceLoader />
                <MdRefresh
                  // onClick={fetchUserTransaction}
                  size={20}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </p> */}
          </div>
        </div>
        <button onClick={toggle} className={styles.deposit_amount}>
          Deposit
        </button>
        <RiMenu3Line onClick={toggleMenu} className={styles.mobile_men_close} />
      </div>

      {/* second content  */}
      <div
        className={`${styles.left_sideBar} ${
          showMenu ? styles.active : styles.inactive
        }`}
      >
        <IoIosCloseCircleOutline
          onClick={toggleMenu}
          className={styles.mobile_men}
        />
        <div className={styles.user_info}>
          {user?.user?.fullName && <h4>{user?.user?.fullName.slice(0, 2)}</h4>}
          {/* state?.userTransactionProfile?.loading */}
          <div className={styles.user_balance}>
            <p>{user?.user?.fullName}</p>
            {/* <p style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              Wallet Balance:{' '}
              {state?.userTransactionProfile?.loading && <BalanceLoader />}
              <>
                &#8358;
                {state?.userTransactionProfile?.accountBalance?.toLocaleString()}
                5000
              </>
              {''}
              {loadBalance ? (
                <BalanceLoader />
              ) : (
                <MdRefresh
                  // onClick={fetchUserTransaction}
                  size={20}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </p> */}
          </div>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.dashboard_menus}>
          {menuItems.map((item) => {
            return (
              <Link
                onClick={closeMenu}
                key={item.id}
                className={styles.menu_items}
                href={item.url}
              >
                <span className={styles.item_icon}>{item.iconsType}</span>
                {item.menuName}
              </Link>
            );
          })}
          {session?.user?.superUser === true && (
            <button
              onClick={() => router.push('/user/admin')}
              className={styles.user_admin}
            >
              <RiAdminLine className={styles.item_icon} />
              Admin
            </button>
          )}
          <button onClick={logoutClickHandler} className={styles.user_logout}>
            <FiLogOut className={styles.logout_icon} />
            Logout
          </button>
        </div>
      </div>

      {/* 3rd content  */}

      <div className={styles.main_content}>
        {/*include this letter  */}

        {/* <div className={styles.quick_nav}>
          <button
            onClick={() => router.push('/user/category/data')}
            className={styles.quick_nav_button}
          >
            Buy Data
          </button>
          <button
            onClick={() => router.push('/user/category/airtime')}
            className={styles.quick_nav_button}
          >
            Buy Airtime
          </button>

          <button
            onClick={() => router.push('/user/transactions')}
            className={styles.quick_nav_button}
          >
            Transactions
          </button>
        </div> */}
        {/*include this letter top here stop here  */}

        <div>{children}</div>
      </div>

      {/* bottom bar  */}
      <div className={styles.dashboard_bottomBar}>
        <div className={styles.bottomBar_message}>
          {/* <h4>Announcement!!</h4> */}
          <p>
            Reach us via whatsapp{' '}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0px 5px',
              }}
            >
              <AiOutlineWhatsApp />
            </span>{' '}
            - 08110056647
          </p>
          <p> Reach us via whatsapp - 08110056647</p>
        </div>
      </div>
    </div>
  );
}
