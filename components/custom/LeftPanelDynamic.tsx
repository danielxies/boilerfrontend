'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Mic, StopCircle, Loader2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AudioPlayer } from '@/components/AudioPlayer';
import { alice, vastago } from '@/app/fonts';

interface Transcript {
  id: string;
  userQuestion: string;
  textResponse: string | null;
  responseAudio: Blob | null;
}

interface LeftPanelProps {
  width: number;
  title: string;
  description: string;
  examples: string[];
  constraints: string[];
  questionNumber: number;
  difficulty: "Easy" | "Medium" | "Hard";
  isRecording: boolean;
  onRecordingToggle: () => void;
  transcripts: Transcript[];
  error: string | null;
  isProcessing?: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  width,
  title,
  description,
  examples,
  constraints,
  questionNumber,
  difficulty,
  isRecording,
  onRecordingToggle,
  transcripts,
  error,
  isProcessing = false,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showTranscripts, setShowTranscripts] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [transcripts]);

  const getDifficultyColor = (difficulty: "Easy" | "Medium" | "Hard"): string => {
    switch (difficulty) {
      case "Easy":
        return "#00b8a3";
      case "Medium":
        return "#fec11d";
      case "Hard":
        return "#ff375f";
      default:
        return "#ffffff";
    }
  };

  return (
    <div
      style={{ width: `${width}px` }}
      className="h-full bg-[#1a1a1a] text-white flex flex-col"
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className={`${vastago.className} text-xl font-bold`}>{title}</h2>
          <span
            style={{ color: getDifficultyColor(difficulty) }}
            className={`${vastago.className} font-bold`}
          >
            {difficulty}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className={`${alice.className} text-sm text-gray-400`}>Question {questionNumber}</div>
          <Button
            variant="ghost"
            size="sm"
            className={`${vastago.className} text-gray-400 hover:text-white flex items-center gap-2`}
            onClick={() => setShowTranscripts(!showTranscripts)}
          >
            <MessageSquare className="h-4 w-4" />
            {showTranscripts ? "Description" : "Transcript"}
          </Button>
        </div>
      </div>

      {showTranscripts ? (
        <div className={`${alice.className} flex-1 overflow-y-auto p-4`}>
          {transcripts.length > 0 ? (
            <div className="space-y-4">
              {transcripts.map((transcript) => (
                <div key={transcript.id} className="space-y-2">
                  <div className="bg-[#2b2d31] p-3 rounded-lg">
                    <p className="text-sm text-gray-300">{transcript.userQuestion}</p>
                  </div>
                  {transcript.textResponse && (
                    <div className="bg-[#373430] p-3 rounded-lg">
                      <p className="text-sm text-gray-300">{transcript.textResponse}</p>
                      {transcript.responseAudio && (
                        <div className="mt-2">
                          <AudioPlayer src={URL.createObjectURL(transcript.responseAudio)} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-8">
              No transcripts available yet. Start recording to begin a conversation.
            </div>
          )}
        </div>
      ) : (
        <div className={`${alice.className} flex-1 overflow-y-auto p-4`}>
          <div className="prose prose-invert max-w-none">
            <div className="mb-6">
              <h3 className={`${vastago.className} text-lg font-semibold mb-2`}>Description</h3>
              <p className="text-gray-300">{description}</p>
            </div>

            <div className="mb-6">
              <h3 className={`${vastago.className} text-lg font-semibold mb-2`}>Examples</h3>
              {examples.map((example, index) => (
                <pre key={index} className="bg-[#2b2d31] p-3 rounded-lg mb-2 whitespace-pre-wrap">
                  {example}
                </pre>
              ))}
            </div>

            <div className="mb-6">
              <h3 className={`${vastago.className} text-lg font-semibold mb-2`}>Constraints</h3>
              <ul className="list-disc list-inside">
                {constraints.map((constraint, index) => (
                  <li key={index} className="text-gray-300 mb-1">{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-2 bg-red-500 text-white text-center">
          {error}
        </div>
      )}

      <div className="p-4 border-t border-gray-700 flex justify-center">
        <Button
          onClick={onRecordingToggle}
          variant={isRecording ? "destructive" : "default"}
          size="icon"
          className="w-16 h-16 rounded-full"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : isRecording ? (
            <StopCircle className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LeftPanel; 