'use client';

import React, { useState, useEffect, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import CodeEditor from './CodeEditor';
import LeftPanel from './LeftPanelDynamic';

interface Transcript {
  id: string;
  userQuestion: string;
  textResponse: string | null;
  responseAudio: Blob | null;
}

interface DanielsEditorProps {
  title: string;
  description: string;
  examples: string[];
  constraints: string[];
  starterCode: string;
  questionNumber: number;
  solution: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const DanielsEditor: React.FC<DanielsEditorProps> = ({
  title,
  description,
  examples,
  constraints,
  starterCode,
  questionNumber,
  solution,
  difficulty,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioBlob, setAudioBlob] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<any>(null);
  const [leftPaneWidth, setLeftPaneWidth] = useState<number>(0);
  const isDraggingRef = useRef(false);
  const [codeText, setCodeText] = useState<string>(starterCode);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialWidth = window.innerWidth * 0.35;
    setLeftPaneWidth(initialWidth);
  }, []);

  const startRecording = async () => {
    try {
      recorderRef.current = new MicRecorder({ bitRate: 128 });
      await recorderRef.current.start();
      setIsRecording(true);
    } catch (e: any) {
      showError('Could not start recording: ' + e.message);
    }
  };

  const stopRecording = async () => {
    try {
      const [buffer, blob] = await recorderRef.current.stop().getMp3();
      const file = new File(buffer, 'recording.mp3', {
        type: blob.type,
        lastModified: Date.now(),
      });
      setIsRecording(false);
      setAudioBlob(file);
    } catch (e: any) {
      showError('Could not stop recording: ' + e.message);
    }
  };

  const handleRecordingToggle = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    if (audioBlob) {
      transcribeAudio();
    }
  }, [audioBlob]);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const transcribeAudio = async () => {
    if (!audioBlob) return;
    setIsProcessing(true);

    // Convert the blob to a File object with proper MIME type
    const audioFile = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', audioFile);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transcription failed');
      }

      const data = await response.json();
      setTranscript(data.text);
      await handleSubmit(data.text);
    } catch (e: any) {
      showError('Transcription failed: ' + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (transcribedText: string) => {
    if (!transcribedText.trim()) return;

    const newTranscriptId = Date.now().toString();
    const newTranscript: Transcript = {
      id: newTranscriptId,
      userQuestion: transcribedText,
      textResponse: null,
      responseAudio: null,
    };

    setTranscripts(prev => [newTranscript]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: transcribedText,
          code: codeText,
          solution: solution,
          maxSentences: 2, // Request concise response
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Get audio response using Cartesia
      const audioResponse = await fetch('/api/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: data.text,
          useCartesia: true,
        }),
      });

      if (!audioResponse.ok) {
        throw new Error('Failed to get audio response');
      }

      const audioBlob = await audioResponse.blob();
      
      // Create and play audio immediately
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();

      setTranscripts(prev =>
        prev.map(t =>
          t.id === newTranscriptId
            ? { ...t, textResponse: data.text, responseAudio: audioBlob }
            : t
        )
      );
    } catch (e: any) {
      showError('Failed to get response: ' + e.message);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const newWidth = Math.min(Math.max(e.clientX, 200), containerWidth - 200);
    setLeftPaneWidth(newWidth);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div ref={containerRef} className="flex h-full bg-[#1a1a1a]">
      <LeftPanel
        width={leftPaneWidth}
        title={title}
        description={description}
        examples={examples}
        constraints={constraints}
        questionNumber={questionNumber}
        difficulty={difficulty}
        isRecording={isRecording}
        onRecordingToggle={handleRecordingToggle}
        transcripts={transcripts}
        error={error}
        isProcessing={isProcessing}
      />
      <div
        className="w-1 bg-gray-800 cursor-col-resize hover:bg-blue-500"
        onMouseDown={handleMouseDown}
      />
      <div className="flex-1 h-full bg-[#1a1a1a]">
        <CodeEditor
          value={codeText}
          onChange={setCodeText}
          language="python"
        />
      </div>
    </div>
  );
};

export default DanielsEditor; 