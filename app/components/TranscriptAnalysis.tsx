"use client"

import React, { useState } from 'react';
import { AudioPlayer } from './AudioPlayer';

interface InterviewExchange {
  interviewer: string;
  interviewee: string;
  interviewer_feedback: string;
  score: number;
}

interface TranscriptAnalysisProps {
  exchanges: InterviewExchange[];
  audioFile?: string;
}

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent">
    {children}
  </span>
);

const getColorForScore = (score: number) => {
  // Convert score from 1-10 to percentage
  const normalizedScore = score / 10;
  
  if (normalizedScore < 0.45) {
    return 'rgb(255, 80, 80)'; // Red for low scores
  } else if (normalizedScore < 0.75) {
    return 'rgb(255, 200, 80)'; // Yellow for medium scores
  } else {
    return 'rgb(100, 200, 100)'; // Green for high scores
  }
};

export const TranscriptAnalysis: React.FC<TranscriptAnalysisProps> = ({
  exchanges,
  audioFile,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const increaseZoom = () => setZoomLevel(prev => Math.min(prev + 0.2, 1.6));
  const decreaseZoom = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.6));

  const getTextSize = () => {
    return `text-[${Math.round(14 * zoomLevel)}px]`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">
          <GradientText>Transcript Analysis:</GradientText>
        </h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={decreaseZoom}
            className="text-white hover:text-gray-300 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800"
          >
            −
          </button>
          <button 
            onClick={increaseZoom}
            className="text-white hover:text-gray-300 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800"
          >
            +
          </button>
        </div>
      </div>

      {audioFile && (
        <div className="mb-4">
          <AudioPlayer src={audioFile} />
        </div>
      )}

      <div 
        className="space-y-3 max-h-[545px] overflow-y-auto pr-2"
        style={{ 
          fontSize: `${Math.round(14 * zoomLevel)}px`,
          lineHeight: '1.5'
        }}
      >
        {exchanges.map((exchange, index) => (
          <div 
            key={index} 
            className="bg-[#2b2d31] rounded-lg p-3 relative border border-[#1e1f22]"
            style={{ padding: `${Math.round(12 * zoomLevel)}px` }}
          >
            <div className="flex">
              <div className="flex-1 mr-6 max-w-[600px]">
                {/* Interviewer's question */}
                <div className="mb-2">
                  <div className="text-white">
                    <span className="font-bold text-[#5865f2]">Interviewer:</span>{' '}
                    <span className="italic">{exchange.interviewer}</span>
                  </div>
                </div>
                
                {/* Interviewee's response */}
                <div className="mb-2">
                  <div className="text-white">
                    <span className="font-bold text-[#5865f2]">You:</span>{' '}
                    {exchange.interviewee}
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <div className="text-[#949ba4] text-sm italic">
                    <span className="font-bold text-[#b5bac1]">Feedback:</span>{' '}
                    {exchange.interviewer_feedback}
                  </div>
                </div>
              </div>
              
              {/* Score display */}
              <div 
                className="flex-shrink-0 absolute right-3 top-1/2 -translate-y-1/2 font-bold"
                style={{ 
                  color: getColorForScore(exchange.score),
                  fontSize: `${Math.round(16 * zoomLevel)}px`
                }}
              >
                {exchange.score}/10
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 