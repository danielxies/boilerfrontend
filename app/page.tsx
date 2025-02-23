'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TypewriterEffectMultiline } from '@/components/custom/typewriter';
import { alice, vastago } from './fonts';
import { Safari } from '@/components/magicui/safari';
import { Vortex } from '@/components/ui/vortex';
import Footer from './components/Footer';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordRotate } from '@/components/magicui/word-rotate';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { UserMenu } from './components/UserMenu';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GradientText = ({ children, className, onClick }: GradientTextProps) => (
  <span 
    onClick={onClick}
    className={`inline-block bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 bg-clip-text text-transparent animate-gradient cursor-pointer decoration-blue-400 underline underline-offset-4 hover:decoration-blue-600 transition-all ${className}`}
  >
    {children}
  </span>
);

export default function LandingPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const words = [
    // First line
    {
      text: "Interview",
      className: `${alice.className} text-[#d1cfbf] text-6xl md:text-7xl lg:text-8xl`,
    },
    {
      text: "Prep",
      className: `${alice.className} text-[#d1cfbf] text-6xl md:text-7xl lg:text-8xl`,
    },
    {
      text: "\n",
      className: `${alice.className}`,
    },
    // Second line
    {
      text: "was",
      className: `${alice.className} text-[#d1cfbf] text-6xl md:text-7xl lg:text-8xl`,
    },
    {
      text: "Never",
      className: `${alice.className} text-rose-400 italic text-6xl md:text-7xl lg:text-8xl`,
    },
    {
      text: " ",
      className: `${alice.className} text-[#d1cfbf] text-6xl md:text-7xl lg:text-8xl`,
    },
    {
      text: "this",
      className: `${alice.className} text-[#d1cfbf] text-6xl md:text-7xl lg:text-8xl`,
    },
    {
      text: "easy",
      className: `${alice.className} text-[#d1cfbf] text-6xl md:text-7xl lg:text-8xl`,
    },
  ];

  return (
    <div className={`min-h-screen bg-[#1a1a1a] ${alice.variable} ${vastago.variable} overflow-x-hidden`}>
      {/* Navigation Bar - Fixed at top */}
      <nav className="fixed top-0 w-full p-6 z-50 bg-[#1a1a1a]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image 
              src="/icon.png" 
              alt="Logo" 
              width={31} 
              height={31}
              className="cursor-pointer invert brightness-200"
            />
          </div>

          {/* Center Navigation */}
          <div className="flex items-center justify-center space-x-5">
            <button 
              onClick={() => router.push('/quickstart')}
              className="text-[#d1cfbf] hover:text-white transition-colors text-lg"
            >
              Quickstart
            </button>
            <button 
              onClick={() => router.push('/demo')}
              className="text-[#d1cfbf] hover:text-white transition-colors text-lg"
            >
              Demo
            </button>
            <button 
              onClick={() => router.push('/contact')}
              className="text-[#d1cfbf] hover:text-white transition-colors text-lg"
            >
              Contact
            </button>
          </div>

          {/* Sign In Button */}
          <div className="flex justify-end">
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <div className="min-h-screen w-full flex flex-col items-center justify-center pt-[9.2rem] relative">
          <div className="text-center space-y-7 relative">
            {/* Vortex Background - Only behind typewriter */}

            <Vortex
                backgroundColor="transparent"
                containerClassName="top-[8rem]"
                baseHue={350}
                baseSpeed={2.3}
                rangeY={100}
                particleCount={250}
              />
            <div className="z-10 flex items-center justify-center">
              <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                <span className={`${vastago.className} inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`}>
                  introducing mockmate
                </span>
              </AnimatedGradientText>
            </div>

            <TypewriterEffectMultiline 
              words={words} 
              showCursor={false}
              cursorColor="bg-rose-400" 
            />
            <p className={`${vastago.className} text-[#d1cfbf] mt-2 text-2xl tracking-wide`}>
              Built by students, for students&ndash; we&apos;re here to help you land your dream job.
            </p>
            <button 
              onClick={() => router.push('/select')}
              className={`${vastago.className} mt-4 bg-rose-400 text-white px-6 py-2 rounded-md hover:bg-rose-500 transition-colors text-lg z-20 relative`}
            >
              Get Started
            </button>
            
            {/* Browser Preview Section */}
            <div className="w-full max-w-6xl px-8 pt-[5rem] flex justify-center">
              <Safari
                url="prep.meredith.com"
                imageSrc="/screenshot.png"
                width={1203}
                height={753}
              />
            </div>

            {/* Community Driven Section */}
            <div className="w-full max-w-4xl mx-auto pt-32 pb-16">
              <h2 className={`${alice.className} text-[#d1cfbf] text-5xl md:text-6xl text-center mb-8`}>
                <i className="text-rose-400">Community</i> Driven
              </h2>
              <p className={`${vastago.className} text-[#d1cfbf] text-xl text-center mb-12`}>
                We are a community-driven project. This project aimed to solve a problem we faced as students. We are always looking for feedback and suggestions.
              </p>
              <div className="flex justify-center items-center space-x-16">
                <div className="flex items-center space-x-2 text-[#d1cfbf]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10" />
                  </svg>
                  <span className={`${vastago.className}`}>View on GitHub</span>
                </div>
                <div className="flex items-center space-x-2 text-[#d1cfbf]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className={`${vastago.className}`}>Privacy-focused</span>
                </div>
              </div>
            </div>

            {/* Code Preview Section */}
            <div className="w-full max-w-6xl px-8 pt-[5rem] flex justify-center">
              <Safari
                url="code.meredith.com"
                imageSrc="/code.png"
                width={1203}
                height={800}
              />
            </div>

            {/* Interview Anywhere Section */}
            <div className="w-full max-w-4xl mx-auto pt-32 pb-16">
              <h2 className={`${alice.className} text-[#d1cfbf] text-5xl md:text-6xl text-center mb-8`}>
                Interview from{" "}
                <WordRotate 
                  words={["a Coffee Shop", "Home", " the Airport"]}
                  className="text-rose-400 underline underline-offset-4 decoration-rose-400/30"
                  duration={2000}
                />
              </h2>
              <p className={`${vastago.className} text-[#d1cfbf] text-xl text-center mb-12`}>
                Your interview prep shouldn&apos;t be confined to a desk. Practice and prepare from anywhere, anytime &ndash; we&apos;ve designed our platform to adapt to your lifestyle.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}