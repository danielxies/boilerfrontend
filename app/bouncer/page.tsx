'use client'

import { alice, vastago } from '../fonts';
import { Vortex } from '@/components/ui/vortex';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Bouncer() {
  const { login, isAuthenticated, logout, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/interview');
    }
  }, [isAuthenticated, router]);

  return (
    <div className={`min-h-screen bg-[#1a1a1a] ${alice.variable} ${vastago.variable} overflow-x-hidden`}>
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative">
        {/* Background Vortex */}
        <Vortex
          backgroundColor="transparent"
          containerClassName="absolute inset-0"
          baseHue={350}
          baseSpeed={2.3}
          rangeY={100}
          particleCount={250}
        />
        
        {/* Auth Container */}
        <div className="z-10 bg-[#2a2a2a]/80 p-8 rounded-lg backdrop-blur-sm border border-[#3a3a3a] shadow-xl">
          <h1 className={`${alice.className} text-[#d1cfbf] text-4xl mb-6 text-center`}>
            Welcome to <span className="text-rose-400">Meredith</span>
          </h1>
          <div className={`${vastago.className} text-[#d1cfbf] text-center`}>
            {isLoading ? (
              <p>Loading...</p>
            ) : isAuthenticated ? (
              <div className="space-y-4">
                <p className="mb-2">Welcome, {user?.name}!</p>
                <p className="text-sm text-gray-400">Redirecting to interview...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="mb-2">Please login to continue</p>
                <button 
                  onClick={() => login()}
                  className="bg-rose-400 text-white px-6 py-2 rounded-md hover:bg-rose-500 transition-colors"
                >
                  Login with Auth0
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 