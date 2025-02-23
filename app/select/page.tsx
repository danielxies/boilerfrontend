'use client'

import { useRouter } from 'next/navigation';
import { Phone, Code2 } from "lucide-react";
import { alice, vastago } from '../fonts';

export default function SelectPage() {
  const router = useRouter();

  return (
    <div className={`min-h-screen bg-[#1a1a1a] ${alice.variable} ${vastago.variable} flex items-center justify-center`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`${alice.className} text-[#d1cfbf] text-4xl md:text-5xl text-center mb-12`}>
          Choose Your Practice Mode
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone Screen Practice */}
          <div 
            onClick={() => router.push('/interview')}
            className="bg-[#252525] hover:bg-[#2a2a2a] transition-all p-8 rounded-xl cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-rose-400 rounded-full">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h2 className={`${vastago.className} text-2xl text-[#d1cfbf]`}>Phone Screen Practice</h2>
              <p className={`${vastago.className} text-[#a0a0a0]`}>
                Practice behavioral questions and improve your communication skills for phone interviews.
              </p>
            </div>
          </div>

          {/* Technical Interview Practice */}
          <div 
            onClick={() => router.push('/technical')}
            className="bg-[#252525] hover:bg-[#2a2a2a] transition-all p-8 rounded-xl cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-500 rounded-full">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h2 className={`${vastago.className} text-2xl text-[#d1cfbf]`}>Technical Interview Practice</h2>
              <p className={`${vastago.className} text-[#a0a0a0]`}>
                Practice coding problems and system design questions with real-time feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 