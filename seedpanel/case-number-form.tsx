"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, SunIcon, MoonIcon } from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

interface CaseNumberFormProps {
  onSuccess: () => void
  theme: "dark" | "light"
  onToggleTheme: () => void
}

export default function CaseNumberForm({ onSuccess, theme, onToggleTheme }: CaseNumberFormProps) {
  const [caseNumber, setCaseNumber] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Get case number from environment variable or use default
  const CORRECT_CASE_NUMBER = process.env.NEXT_PUBLIC_CASE_NUMBER || "CASE-2024-001"
  const isDark = theme === "dark"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      // Case-insensitive comparison
      if (caseNumber.trim().toUpperCase() === CORRECT_CASE_NUMBER.toUpperCase()) {
        onSuccess()
      } else {
        setError("Invalid case number. Please try again.")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-[#0A0B0D]" : "bg-white"} ${isDark ? "text-white" : "text-black"} ${inter.variable} font-sans transition-colors duration-300`}
    >
      <div
        className={`absolute inset-0 ${isDark ? "opacity-10" : "opacity-5"}`}
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header with Logo and Theme Toggle */}
      <div className="fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-8 max-w-3xl mx-auto">
        <div className="relative h-6 w-24">
          <Image
            src={isDark ? "/Coinbase_Wordmark_White.svg" : "/Coinbase_Wordmark.svg"}
            alt="Coinbase"
            fill
            className="object-contain"
            priority
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          className={`${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full`}
        >
          {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Form Content */}
      <div className="relative flex items-center justify-center min-h-screen px-6 z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${isDark ? "bg-[#00D4AA]/10" : "bg-[#0052FF]/10"} mb-6`}
            >
              <LockIcon className={`w-8 h-8 ${isDark ? "text-[#00D4AA]" : "text-[#0052FF]"}`} />
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-black"}`}
            >
              Enter Case Number
            </h1>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-lg font-normal leading-relaxed`}>
              Please enter your case number to access your secure vault
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="caseNumber"
                className={`block text-sm font-semibold mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
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
                placeholder="XXXXXXX"
                className={`w-full ${isDark ? "bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-600" : "bg-white border-gray-300 text-black placeholder:text-gray-400"} h-14 text-base font-medium rounded-xl focus:ring-2 ${isDark ? "focus:ring-[#00D4AA]" : "focus:ring-[#0052FF]"} transition-all`}
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !caseNumber.trim()}
              className={`w-full ${isDark ? "bg-[#00D4AA] hover:bg-[#00BF9A]" : "bg-[#0052FF] hover:bg-[#0047E0]"} text-white text-base py-6 rounded-xl font-semibold transition-colors shadow-lg disabled:opacity-50`}
            >
              {isLoading ? "Verifying..." : "Continue"}
            </Button>
          </form>

          <div
            className={`mt-8 p-5 ${isDark ? "bg-blue-500/10 border-blue-500/20" : "bg-blue-50 border-blue-200"} border rounded-xl`}
          >
            <p
              className={`${isDark ? "text-blue-400" : "text-blue-700"} text-sm font-medium text-center leading-relaxed`}
            >
              Your case number was provided in your confirmation SMS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
