'use client'

import { alice, vastago } from '../fonts';

export default function QuickstartPage() {
  return (
    <div className={`min-h-screen bg-[#1a1a1a] ${alice.variable} ${vastago.variable} flex items-center justify-center`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className={`${alice.className} text-[#d1cfbf] text-5xl md:text-6xl text-center mb-12`}>
            Get Started
          </h1>
          
          <div className="space-y-8">
            <div className="text-center">
              <h2 className={`${vastago.className} text-[#d1cfbf] text-2xl mb-4`}>
                1. Choose Interview
              </h2>
              <div className="flex justify-center space-x-6">
                <div className={`${vastago.className} text-rose-400 text-xl hover:underline cursor-pointer`}>Behavioral</div>
                <div className={`${vastago.className} text-rose-400 text-xl hover:underline cursor-pointer`}>Technical</div>
              </div>
            </div>

            <div className="text-center">
              <h2 className={`${vastago.className} text-[#d1cfbf] text-2xl mb-4`}>
                2. Prep!
              </h2>
              <p className={`${vastago.className} text-[#d1cfbf] text-lg`}>
                Start your interview preparation journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 