'use client'

import { alice, vastago } from '../fonts';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className={`min-h-screen bg-[#1a1a1a] ${alice.variable} ${vastago.variable} flex items-center justify-center`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className={`${alice.className} text-[#d1cfbf] text-5xl md:text-6xl mb-8`}>
            Contact Us
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <Mail className="text-rose-400 w-6 h-6" />
            <a 
              href="mailto:danielxiepriority@gmail.com"
              className={`${vastago.className} text-rose-400 text-2xl hover:text-rose-300 hover:underline transition-all`}
            >
              danielxiepriority@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 