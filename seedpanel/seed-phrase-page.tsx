"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftIcon,
  CopyIcon,
  CheckIcon,
  AlertTriangleIcon,
  EyeIcon,
  EyeOffIcon,
  ShieldIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

interface SeedPhrasePageProps {
  onBack: () => void
  theme: "dark" | "light"
  onToggleTheme: () => void
}

// Helper function to parse seed phrase from environment variable
const getSeedPhraseFromEnv = (): string[] => {
  const envPhrase = process.env.NEXT_PUBLIC_SEED_PHRASE

  if (!envPhrase) {
    console.error("NEXT_PUBLIC_SEED_PHRASE is not defined in environment variables")
    return []
  }

  // Split by comma or space and clean up
  const words = envPhrase
    .split(/[,\s]+/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 0)

  // Validate that we have exactly 12 words
  if (words.length !== 12) {
    console.error(`Invalid seed phrase: expected 12 words, got ${words.length}`)
    return []
  }

  return words
}

export default function SeedPhrasePage({ onBack, theme, onToggleTheme }: SeedPhrasePageProps) {
  const [copied, setCopied] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [copiedWordIndex, setCopiedWordIndex] = useState<number | null>(null)
  const isDark = theme === "dark"

  // Get seed phrase from environment variable
  const SEED_PHRASE = useMemo(() => getSeedPhraseFromEnv(), [])

  const handleCopy = async () => {
    const phraseText = SEED_PHRASE.join(" ")
    await navigator.clipboard.writeText(phraseText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWordCopy = async (word: string, index: number) => {
    await navigator.clipboard.writeText(word)
    setCopiedWordIndex(index)
    setTimeout(() => setCopiedWordIndex(null), 1500)
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

      {/* Header */}
      <div className="fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-8 max-w-4xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className={`${isDark ? "text-white hover:bg-gray-800" : "text-black hover:bg-gray-100"} flex items-center gap-2 font-medium`}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Button>
        <div className="flex items-center gap-4">
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
      </div>

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen px-6 py-24 z-10">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${isDark ? "bg-[#00D4AA]/10" : "bg-[#0052FF]/10"} mb-6`}
            >
              <ShieldIcon className={`w-8 h-8 ${isDark ? "text-[#00D4AA]" : "text-[#0052FF]"}`} />
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-black"}`}
            >
              Your Recovery Phrase
            </h1>
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-600"} text-lg font-normal leading-relaxed max-w-2xl mx-auto`}
            >
              Store this phrase securely. You'll need it to recover your account.
            </p>
          </div>

          {/* Warning Alert */}
          <div
            className={`mb-8 p-6 ${isDark ? "bg-red-500/10 border-red-500/30" : "bg-red-50 border-red-200"} border-2 rounded-2xl`}
          >
            <div className="flex items-start gap-4">
              <AlertTriangleIcon className={`w-6 h-6 ${isDark ? "text-red-400" : "text-red-600"} flex-shrink-0 mt-1`} />
              <div>
                <h3 className={`${isDark ? "text-red-400" : "text-red-700"} font-bold text-lg mb-2`}>
                  DO NOT REVEAL THIS TO ANYONE
                </h3>
                <p className={`${isDark ? "text-red-300" : "text-red-600"} text-sm font-normal leading-relaxed`}>
                  Anyone with access to this recovery phrase can access your account and funds. Never share it with
                  anyone. Store it in a secure location offline.
                </p>
              </div>
            </div>
          </div>

          {/* Seed Phrase Box */}
          <div className="relative group">
            <div
              className={`p-8 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-200"} border-2 rounded-2xl transition-all duration-300 ${
                isRevealed ? "" : "blur-md"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SEED_PHRASE.map((word, index) => (
                  <div
                    key={index}
                    onClick={() => handleWordCopy(word, index)}
                    className={`flex items-center gap-3 p-4 ${isDark ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800" : "bg-white border-gray-300 hover:bg-gray-50"} rounded-xl border cursor-pointer transition-all duration-200 relative group`}
                  >
                    <span className={`${isDark ? "text-gray-500" : "text-gray-400"} font-semibold text-sm w-6`}>
                      {index + 1}.
                    </span>
                    <span className={`${isDark ? "text-white" : "text-black"} font-medium text-base flex-1`}>{word}</span>
                    {copiedWordIndex === index ? (
                      <CheckIcon className={`w-4 h-4 ${isDark ? "text-[#00D4AA]" : "text-[#0052FF]"}`} />
                    ) : (
                      <CopyIcon className={`w-4 h-4 ${isDark ? "text-gray-600" : "text-gray-400"} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reveal Overlay */}
            {!isRevealed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => setIsRevealed(true)}
                  className={`${isDark ? "bg-[#00D4AA] hover:bg-[#00BF9A]" : "bg-[#0052FF] hover:bg-[#0047E0]"} text-white text-base px-8 py-6 rounded-xl font-semibold flex items-center gap-2 shadow-lg`}
                >
                  <EyeIcon className="w-5 h-5" />
                  Reveal Recovery Phrase
                </Button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isRevealed && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleCopy}
                className={`flex-1 ${isDark ? "bg-[#00D4AA] hover:bg-[#00BF9A]" : "bg-[#0052FF] hover:bg-[#0047E0]"} text-white text-base py-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors`}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-5 h-5" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
              <Button
                onClick={() => setIsRevealed(false)}
                className={`flex-1 ${isDark ? "border-gray-700 text-white hover:bg-gray-800" : "border-gray-300 text-black hover:bg-gray-100"} border-2 bg-transparent text-base py-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors`}
              >
                <EyeOffIcon className="w-5 h-5" />
                Hide Phrase
              </Button>
            </div>
          )}

          {/* Security Tips */}
          <div
            className={`mt-8 p-6 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-200"} border-2 rounded-2xl`}
          >
            <h3 className={`${isDark ? "text-white" : "text-black"} font-bold text-lg mb-4`}>
              Security Best Practices
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className={`${isDark ? "text-[#00D4AA]" : "text-[#0052FF]"} mt-0.5 text-lg`}>✓</span>
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm font-normal leading-relaxed`}>
                  Write it down on paper and store in a secure location
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className={`${isDark ? "text-[#00D4AA]" : "text-[#0052FF]"} mt-0.5 text-lg`}>✓</span>
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm font-normal leading-relaxed`}>
                  Never store it digitally or take screenshots
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className={`${isDark ? "text-[#00D4AA]" : "text-[#0052FF]"} mt-0.5 text-lg`}>✓</span>
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm font-normal leading-relaxed`}>
                  Keep multiple copies in different secure locations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className={`${isDark ? "text-[#00D4AA]" : "text-[#0052FF]"} mt-0.5 text-lg`}>✓</span>
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm font-normal leading-relaxed`}>
                  Never share it with anyone, even if they claim to be support
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
