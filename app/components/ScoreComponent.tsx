"use client";

import { NumberTicker } from "@/components/magicui/number-ticker";

const GradientText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient ${className}`}>
    {children}
  </span>
);

interface ScoreComponentProps {
  clarityScore: number;
  depthScore: number;
  confidenceScore: number;
}

export function ScoreComponent({
  clarityScore,
  depthScore,
  confidenceScore,
}: ScoreComponentProps) {
  // Calculate average score
  const averageScore = Math.round(
    (clarityScore + depthScore + confidenceScore) / 3
  );

  return (
    <div className="flex flex-col items-center justify-center bg-black p-6 rounded-lg space-y-6 w-full shadow-lg">
      {/* Score Header */}

      {/* Main Score */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">
          <NumberTicker value={averageScore} className="text-6xl" />
        </h1>
      </div>

      {/* Individual Scores */}
      <div className="space-y-6 w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-1 tracking-wider">
            <GradientText>CLARITY</GradientText>
          </h2>
          <div className="text-xl font-semibold text-white">
            <NumberTicker value={clarityScore} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-1 tracking-wider">
            <GradientText>DEPTH</GradientText>
          </h2>
          <div className="text-xl font-semibold text-white">
            <NumberTicker value={depthScore} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-1 tracking-wider">
            <GradientText>CONFIDENCE</GradientText>
          </h2>
          <div className="text-xl font-semibold text-white">
            <NumberTicker value={confidenceScore} />
          </div>
        </div>
      </div>
    </div>
  );
}