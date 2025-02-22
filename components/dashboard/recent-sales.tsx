"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-white">Olivia Martin</p>
          <p className="text-sm text-[#666666]">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium text-white">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-white">Jackson Lee</p>
          <p className="text-sm text-[#666666]">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium text-white">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-white">Isabella Nguyen</p>
          <p className="text-sm text-[#666666]">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto font-medium text-white">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-white">William Kim</p>
          <p className="text-sm text-[#666666]">will@email.com</p>
        </div>
        <div className="ml-auto font-medium text-white">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-white">Sofia Davis</p>
          <p className="text-sm text-[#666666]">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto font-medium text-white">+$39.00</div>
      </div>
    </div>
  )
} 