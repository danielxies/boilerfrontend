'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { alice, vastago } from '@/app/fonts'
import { Loader2 } from 'lucide-react'

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

export default function ProcessingPage() {
  const router = useRouter()

  useEffect(() => {
    // Wait for 5 seconds then redirect to the report page
    const timer = setTimeout(() => {
      router.push('/interview/boilermake/report')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className={`min-h-screen bg-[#1a1a1a] flex items-center justify-center ${alice.variable} ${vastago.variable}`}>
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6">
            <Loader2 className="w-16 h-16 text-white animate-spin" />
          </div>
          <h1 className={`${alice.className} text-4xl font-bold text-white mb-4`}>
            Processing Your <GradientText>Interview</GradientText>
          </h1>
          <p className={`${vastago.className} text-lg text-[#666666]`}>
            We're analyzing your responses and preparing your feedback...
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-1 w-64 mx-auto bg-[#252525] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] animate-progress" />
          </div>
          <p className={`${vastago.className} text-sm text-[#666666]`}>
            This will only take a moment
          </p>
        </div>
      </div>
    </div>
  );
} 