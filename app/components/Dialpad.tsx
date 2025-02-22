'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"

export default function Dialpad() {
  const [phoneNumber, setPhoneNumber] = useState("")

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

  const handleCall = () => {
    if (phoneNumber.length === 10) {
      alert(`Calling ${phoneNumber}`)
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
    <div className="w-full max-w-xs bg-black p-8 rounded-3xl shadow-xl">
      <Input
        type="text"
        value={formatPhoneNumber(phoneNumber)}
        readOnly
        placeholder="What's a good phone number?"
        className="text-sm text-center mb-4 bg-black border border-white text-white focus:outline-none focus-visible:ring-0 placeholder:text-gray-500"
      />
      <div className="grid grid-cols-3 gap-1 mb-4">
        {dialPad.map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="text-2xl h-16 w-16 rounded-full bg-[#1a1a1a] hover:bg-gray-600 text-white mx-auto"
          >
            {num}
          </Button>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleCall}
          disabled={phoneNumber.length !== 10}
          className="text-xl h-16 w-16 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center"
        >
          <Phone className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
} 