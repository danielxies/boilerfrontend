'use client'

import { alice, vastago } from '../fonts';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className={`min-h-screen bg-[#1a1a1a] ${alice.variable} ${vastago.variable} flex items-center justify-center`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className={`${alice.className} text-[#d1cfbf] text-5xl md:text-6xl mb-8`}>
            Demo
          </h1>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${vastago.className} text-rose-400 text-2xl hover:text-rose-300 hover:underline transition-all`}
          >
            Watch Demo on YouTube
          </a>
        </div>
      </div>
    </div>
  );
} 