"use client"

import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="ml-auto">
      <Input
        type="search"
        placeholder="Search..."
        className="w-[300px] bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666666] focus-visible:ring-[#2a2a2a]"
      />
    </div>
  )
} 