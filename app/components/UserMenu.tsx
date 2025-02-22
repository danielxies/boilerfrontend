'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { alice, vastago } from '@/app/fonts';

export function UserMenu() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  if (!user) {
    return (
      <Link
        href="/api/auth/login"
        className="bg-[#d1d3c7] text-black px-6 py-1 rounded-md hover:bg-[#c1c3b7] transition-colors text-lg"
      >
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full ring-2 ring-rose-400/30 hover:ring-rose-400/50 transition-all">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.picture || ''} alt={user.name || ''} />
            <AvatarFallback className="bg-rose-400 text-white">
              {user.name?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-72 bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#2a2a2a] shadow-2xl" 
        align="end"
      >
        <DropdownMenuLabel className="px-4 py-3 border-b border-[#2a2a2a]">
          <div className="flex flex-col space-y-1">
            <p className={`${alice.className} text-[#d1cfbf] text-xl`}>
              {user.name}
            </p>
            <p className={`${vastago.className} text-[#d1cfbf]/60 text-sm tracking-wide`}>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <div className="p-2">
          <DropdownMenuItem asChild>
            <Link 
              href="/profile" 
              className={`${vastago.className} flex items-center px-3 py-2.5 text-[#d1cfbf] hover:text-white hover:bg-[#2a2a2a]/50 rounded-md transition-all duration-200 text-lg tracking-wide`}
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              href="/api/auth/logout"
              className={`${vastago.className} flex items-center px-3 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-[#2a2a2a]/50 rounded-md transition-all duration-200 text-lg tracking-wide`}
            >
              Log out
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 