"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Play, 
  Pause,
  Volume2,
} from "lucide-react"

interface AudioPlayerProps {
  src: string;  // Can be either a URL or base64 string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [audioSrc, setAudioSrc] = useState<string>("")
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if the source is base64 data
    if (src.startsWith('data:audio')) {
      setAudioSrc(src)
    } else if (src.startsWith('data:')) {
      // If it's base64 but missing audio MIME type, add it
      setAudioSrc(`data:audio/mp3;base64,${src.split(',')[1]}`)
    } else if (src.match(/^[A-Za-z0-9+/=]+$/)) {
      // Raw base64 string, add full data URI
      setAudioSrc(`data:audio/mp3;base64,${src}`)
    } else {
      // Regular URL
      setAudioSrc(src)
    }
  }, [src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime)
      }
    }

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [isDragging])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !progressRef.current || !audioRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = x / rect.width
    const newTime = percentage * duration

    setCurrentTime(newTime)
  }

  const handleDragEnd = () => {
    if (!audioRef.current) return

    audioRef.current.currentTime = currentTime
    setIsDragging(false)
  }

  return (
    <div className="flex items-center gap-2 w-full bg-[#2b2d31] rounded-full p-2">
      <audio ref={audioRef} src={audioSrc} />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className="h-8 w-8 rounded-full bg-[#5865f2] hover:bg-[#4752c4] text-white flex-shrink-0"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </Button>

      {/* Progress bar */}
      <div 
        ref={progressRef}
        className="flex-1 h-2 bg-[#1e1f22] rounded-full cursor-pointer relative"
        onClick={handleProgressClick}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={handleProgressDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div 
          className="absolute h-full bg-[#5865f2] rounded-full transition-all duration-100"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <span className="text-xs text-[#b5bac1] min-w-[40px] text-right flex-shrink-0">
        {formatTime(duration - currentTime)}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="text-[#b5bac1] hover:text-white h-8 w-8 flex-shrink-0"
      >
        <Volume2 className="h-4 w-4" />
      </Button>
    </div>
  )
} 