'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const ForceRefresh = () => {
  const router = useRouter();
  useEffect(() => {
    router.reload();
    console.log('force refresh ran');
  }, []);
  console.log('force refresh ran');

  return <></>;
};
