'use client';

import Link from 'next/link';
import { UserMenu } from './UserMenu';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Undo2 } from 'lucide-react';

export function DashboardNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Hide on landing page
  if (pathname === '/') return null;

  // Check if we're on a technical page
  const isTechnicalPage = pathname.startsWith('/technical');

  return (
    <nav className={`fixed top-0 w-full p-6 z-50 ${isTechnicalPage ? 'bg-transparent' : 'bg-[#1a1a1a]/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side with Logo and Back button */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/icon.png" 
              alt="Logo" 
              width={31} 
              height={31}
              className="cursor-pointer invert brightness-200"
            />
          </Link>
          {pathname !== '/' && (
            <button
              onClick={() => router.back()}
              className="text-[#d1cfbf] hover:text-white transition-colors"
            >
              <Undo2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Menu */}
        <div className="flex justify-end">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
} 