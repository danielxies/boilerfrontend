'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { alice, vastago } from '../fonts';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] ${alice.variable} ${vastago.variable}`}>
      <div className="text-center px-4">
        <div className="inline-block bg-rose-400 text-white rounded-full px-4 py-1 text-sm font-semibold mb-6">
          401
        </div>
        <h1 className={`${alice.className} text-4xl font-bold text-white mb-6`}>
          Access Denied
        </h1>
        <p className={`${vastago.className} text-lg text-gray-300 mb-8 max-w-md mx-auto`}>
          You need to be signed in to access this page.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/api/auth/login')}
            className="bg-rose-400 text-white px-6 py-2 rounded-md hover:bg-rose-500 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-[#2a2a2a] text-white px-6 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
} 