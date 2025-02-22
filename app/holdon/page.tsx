'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Custom404() {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  const goRegister = () => {
    router.push('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Icon on the left */}
      <div className="absolute top-4 left-4">
        <Image src="/icon.png" alt="Apollo Project Icon" width={40} height={40} onClick={goHome} />
      </div>

      {/* Center content */}
      <div className="text-center">
        <div className="inline-block bg-indigo-500 text-white rounded-full px-3 py-1 text-sm font-semibold mb-4">
          404
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Sorry.</h1>
        <p className="text-lg text-gray-300 mb-8 font-cooper">
          You do not have access to this page.
          <br />
          Feel free to{' '}
          <span className="underline cursor-pointer hover:text-indigo-500 transition-colors duration-300" onClick={goRegister}>
            register
          </span>{' '}
          or go{' '}
          <span className="underline cursor-pointer hover:text-indigo-500 transition-colors duration-300" onClick={goHome}>
            home
          </span>.
        </p>
      </div>
    </div>
  );
}
