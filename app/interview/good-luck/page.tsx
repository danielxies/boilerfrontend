'use client'

import { alice, vastago } from '@/app/fonts'
import { Phone } from 'lucide-react'

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

export default function GoodLuckPage() {
  return (
    <div className={`min-h-screen bg-[#1a1a1a] flex items-center justify-center ${alice.variable} ${vastago.variable}`}>
      <div className="text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] p-[2px] animate-pulse">
            <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className={`${alice.className} text-4xl font-bold text-white mb-4`}>
            Good Luck with Your <GradientText>Interview!</GradientText>
          </h1>
          <p className={`${vastago.className} text-lg text-[#666666] mb-6`}>
            Your phone will ring any moment now. Take a deep breath and remember:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#252525] p-6 rounded-xl border border-[#2a2a2a]">
            <h3 className={`${vastago.className} text-white font-semibold mb-3`}>Do's</h3>
            <ul className="text-[#666666] text-left space-y-2">
              <li>✓ Speak clearly and confidently</li>
              <li>✓ Take a moment to think before answering</li>
              <li>✓ Use specific examples</li>
              <li>✓ Stay positive and professional</li>
            </ul>
          </div>

          <div className="bg-[#252525] p-6 rounded-xl border border-[#2a2a2a]">
            <h3 className={`${vastago.className} text-white font-semibold mb-3`}>Don'ts</h3>
            <ul className="text-[#666666] text-left space-y-2">
              <li>✗ Rush your answers</li>
              <li>✗ Use filler words excessively</li>
              <li>✗ Interrupt the interviewer</li>
              <li>✗ Forget to be yourself</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <p className={`${vastago.className} text-[#666666] text-sm animate-pulse`}>
            Calling...
          </p>
        </div>
      </div>
    </div>
  );
} 