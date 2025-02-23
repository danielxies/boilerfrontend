'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Delete } from "lucide-react"
import { alice, vastago } from '@/app/fonts'
import { useRouter } from 'next/navigation'

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

export default function Dialpad() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const dialPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"]

  const formatPhoneNumber = (value: string) => {
    if (value.length === 0) return "";
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)}-${value.slice(3)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  };

  const handleNumberClick = (num: string) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber((prev) => prev + num)
    }
  }

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1))
  }

  const handleCall = async () => {
    if (phoneNumber.length === 10) {
      setIsLoading(true)
      
      try {
        // Navigate to the good luck page immediately
        router.push('/interview/good-luck')
        
        // Make the API call
        const response = await fetch(`https://api.meriedith.com/ringring?phone_number=${phoneNumber}`)
        const data = await response.json()
        
        if (data.status === 'success') {
          // Store the response data in localStorage for the results page
          localStorage.setItem('interviewData', JSON.stringify(data))
          
          // Navigate to processing page after call ends
          router.push('/interview/processing')
        } else {
          console.error('API call failed:', data.message)
          // Handle error case
          router.push('/interview/error')
        }
      } catch (error) {
        console.error('Error making call:', error)
        router.push('/interview/error')
      }
      
      setPhoneNumber("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key >= "0" && e.key <= "9" && phoneNumber.length < 10) {
      handleNumberClick(e.key);
    } else if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key === "Enter" && phoneNumber.length === 10) {
      handleCall();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [phoneNumber]);

  return (
    <div className={`w-full max-w-sm bg-[#252525] p-8 rounded-xl shadow-lg border border-[#2a2a2a] ${alice.variable} ${vastago.variable}`}>
      <div className="mb-8 text-center">
        <h2 className={`${alice.className} text-2xl font-bold text-white mb-2`}>
          Enter your <GradientText>Phone Number</GradientText>
        </h2>
      </div>
      
      <div className="relative mb-8">
        <Input
          type="text"
          value={formatPhoneNumber(phoneNumber)}
          readOnly
          placeholder="(555) 555-5555"
          className={`${vastago.className} text-xl text-center h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white focus:outline-none focus-visible:ring-0 placeholder:text-[#666666]`}
        />
        {phoneNumber.length > 0 && (
          <button
            onClick={handleBackspace}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white transition-colors"
          >
            <Delete className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {dialPad.map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num)}
            disabled={isLoading || phoneNumber.length >= 10}
            className={`
              ${vastago.className} text-2xl h-16 rounded-lg
              bg-[#1a1a1a] hover:bg-[#2a2a2a] 
              text-white border border-[#2a2a2a]
              transition-all duration-200
              ${(isLoading || phoneNumber.length >= 10) ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {num}
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleCall}
          disabled={phoneNumber.length !== 10 || isLoading}
          className={`
            text-xl h-16 w-full rounded-lg
            ${phoneNumber.length === 10 && !isLoading
              ? 'bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] hover:brightness-110' 
              : 'bg-[#2a2a2a] opacity-50 cursor-not-allowed'}
            text-white
            transition-all duration-200
            flex items-center justify-center gap-2
          `}
        >
          <Phone className="h-6 w-6" />
          <span className={`${vastago.className}`}>{isLoading ? 'Calling...' : 'Call'}</span>
        </Button>
      </div>
    </div>
  );
} 