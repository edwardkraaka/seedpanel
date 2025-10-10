"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon, LockIcon } from "lucide-react"
import { Space_Mono } from "next/font/google"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

interface CaseNumberFormProps {
  onSuccess: () => void
  onBack: () => void
}

export default function CaseNumberForm({ onSuccess, onBack }: CaseNumberFormProps) {
  const [caseNumber, setCaseNumber] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Define the correct case number (you can change this)
  const CORRECT_CASE_NUMBER = "CASE-2024-001"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate validation delay
    setTimeout(() => {
      if (caseNumber.trim() === CORRECT_CASE_NUMBER) {
        onSuccess()
      } else {
        setError("Invalid case number. Please try again.")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className={`min-h-screen bg-[#1a1a1a] text-white ${spaceMono.variable} font-mono`}>
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(to right, #444 1px, transparent 1px),
          linear-gradient(to bottom, #444 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Button onClick={onBack} variant="ghost" className="text-white hover:bg-gray-800 flex items-center gap-2">
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Button>
      </div>

      {/* Form Content */}
      <div className="relative flex items-center justify-center min-h-screen px-8 z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <LockIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-wide">Enter Case Number</h1>
            <p className="text-gray-400 text-lg">Please enter your case number to access your secure information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="caseNumber" className="block text-sm font-bold mb-2 text-gray-300">
                Case Number
              </label>
              <Input
                id="caseNumber"
                type="text"
                value={caseNumber}
                onChange={(e) => {
                  setCaseNumber(e.target.value)
                  setError("")
                }}
                placeholder="CASE-XXXX-XXX"
                className="w-full bg-white/5 border-gray-700 text-white placeholder:text-gray-500 h-12 text-lg font-mono"
                disabled={isLoading}
              />
              {error && <p className="text-red-400 text-sm mt-2 font-normal">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !caseNumber.trim()}
              className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6 rounded-lg font-bold"
            >
              {isLoading ? "Verifying..." : "Continue"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm font-normal text-center">
              Your case number was provided in your confirmation email
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
