'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dialpad from '@/app/components/Dialpad';
import { WordRotate } from '@/components/magicui/word-rotate';

export default function BoilermakePage() {
  const router = useRouter();

  const affirmations = [
    "You've got this!",
    "Stay confident",
    "Breathe deeply",
    "Trust yourself",
    "Speak clearly",
    "Be authentic",
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-24">      
      <div className="flex min-h-[calc(100vh-6rem)]">
        {/* Left side with phone */}
        <div className="flex-1 flex items-center justify-end pr-12">
          <Dialpad />
        </div>

        {/* Right side with affirmations */}
        <div className="flex-1 flex items-center justify-start pl-12">
          <div className="text-4xl font-bold">
            <WordRotate 
              words={affirmations}
              duration={3000}
              motionProps={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              className="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 