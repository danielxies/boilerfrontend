"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NumberTicker } from "@/components/magicui/number-ticker"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

const GradientText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient ${className}`}>
    {children}
  </span>
);

interface Score {
  [key: string]: number | string
}

interface ScoreboardProps {
  scores: Score
}

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  feedback: string
  score: number
}

function FeedbackModal({ isOpen, onClose, title, feedback, score }: FeedbackModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
        <DialogHeader className="pt-8">
          <DialogTitle className="flex items-center justify-between">
            <span className="capitalize">{title.replace(/_/g, ' ')}</span>
            <span className="text-2xl font-bold">
              <GradientText>
                <NumberTicker 
                  value={score}
                  decimalPlaces={1}
                  className="text-2xl font-bold"
                />
              </GradientText>
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-[#999999] leading-relaxed">
            {feedback}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Add this utility function before the Scoreboard component
const getScoreColor = (score: number) => {
  // Assuming scores are between 0 and 10
  if (score >= 7) {
    return 'rgb(40, 167, 69)';  // Green
  } else if (score >= 4) {
    return 'rgb(255, 193, 7)';  // Yellow
  } else {
    return 'rgb(220, 53, 69)';  // Red
  }
};

export function Scoreboard({ scores }: ScoreboardProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<{
    title: string;
    feedback: string;
    score: number;
  } | null>(null);

  // Use the overall score directly from the API
  const displayScore = scores.overall_score || 0;

  return (
    <div className="grid gap-4 grid-cols-11">
      <Card className="col-span-1 bg-[#1a1a1a] border-[#2a2a2a] rounded-lg h-full flex flex-col">
        <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-3xl font-medium text-white text-center">
            <GradientText>
              Score
            </GradientText>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <NumberTicker 
              value={displayScore} 
              decimalPlaces={1}
              className="text-5xl font-bold"
              style={{ color: getScoreColor(displayScore) }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-10 bg-[#1a1a1a] border-[#2a2a2a] rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-medium text-white">
            <GradientText>
              Detailed Scores
            </GradientText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between w-full">
            {Object.entries(scores).map(([key, value]) => {
              if (key.includes('comment') || key === 'summary' || key === 'passion') return null;
              const comment = scores[`${key}_comment`] as string;
              
              return (
                <div key={key} className="flex-1 flex justify-center">
                  <button
                    onClick={() => setSelectedFeedback({
                      title: key,
                      feedback: comment,
                      score: value as number
                    })}
                    className="group flex flex-col items-center gap-2 w-full"
                  >
                    <div className="text-2xl font-bold group-hover:underline">
                      <NumberTicker 
                        value={value as number} 
                        decimalPlaces={1}
                        className="text-4xl font-bold"
                        style={{ color: getScoreColor(value as number) }}
                      />
                    </div>
                    <h3 className="text-base font-medium text-[#666666] capitalize whitespace-nowrap text-center">
                      {key.replace(/_/g, ' ')}
                    </h3>
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedFeedback && (
        <FeedbackModal
          isOpen={!!selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
          title={selectedFeedback.title}
          feedback={selectedFeedback.feedback}
          score={selectedFeedback.score}
        />
      )}
    </div>
  )
} 