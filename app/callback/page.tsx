'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '../services/auth';

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      
      if (code) {
        try {
          await auth.handleCallback(code);
          // Redirect to interview page after successful login
          router.push('/interview');
        } catch (error) {
          console.error('Error handling callback:', error);
          router.push('/');
        }
      } else {
        router.push('/');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="text-white text-xl">
        Logging you in...
      </div>
    </div>
  );
} 