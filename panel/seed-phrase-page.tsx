"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, CopyIcon, CheckIcon, AlertTriangleIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { Space_Mono } from "next/font/google"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

interface SeedPhrasePageProps {
  onBack: () => void
}

// Define your 12-word seed phrase here
const SEED_PHRASE = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
]

export default function SeedPhrasePage({ onBack }: SeedPhrasePageProps) {
  const [copied, setCopied] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  const handleCopy = async () => {
    const phraseText = SEED_PHRASE.join(" ")
    await navigator.clipboard.writeText(phraseText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen px-8 py-16 z-10">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-wide">Your Seed Phrase</h1>
            <p className="text-gray-400 text-lg">Store this phrase securely. You'll need it to recover your account.</p>
          </div>

          {/* Warning Alert */}
          <div className="mb-6 p-6 bg-red-500/10 border-2 border-red-500/50 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-400 font-bold text-lg mb-2">DO NOT REVEAL THIS TO ANYONE</h3>
                <p className="text-red-300 text-sm font-normal leading-relaxed">
                  Anyone with access to this seed phrase can access your account and funds. Never share it with anyone,
                  including support staff. Store it in a secure location offline.
                </p>
              </div>
            </div>
          </div>

          {/* Seed Phrase Box */}
          <div className="relative group">
            <div
              className={`p-8 bg-white/5 border-2 border-gray-700 rounded-lg transition-all duration-300 ${
                isRevealed ? "" : "blur-sm"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SEED_PHRASE.map((word, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-gray-700">
                    <span className="text-gray-500 font-bold text-sm w-6">{index + 1}.</span>
                    <span className="text-white font-normal text-lg">{word}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reveal/Hide Overlay */}
            {!isRevealed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => setIsRevealed(true)}
                  className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-lg font-bold flex items-center gap-2"
                >
                  <EyeIcon className="w-5 h-5" />
                  Reveal Seed Phrase
                </Button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isRevealed && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleCopy}
                className="flex-1 bg-white text-black hover:bg-gray-200 text-lg py-6 rounded-lg font-bold flex items-center justify-center gap-2"
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
                variant="outline"
                className="flex-1 border-gray-700 text-white hover:bg-white/10 text-lg py-6 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <EyeOffIcon className="w-5 h-5" />
                Hide Phrase
              </Button>
            </div>
          )}

          {/* Security Tips */}
          <div className="mt-8 p-6 bg-white/5 border border-gray-700 rounded-lg">
            <h3 className="text-white font-bold text-lg mb-3">Security Best Practices</h3>
            <ul className="space-y-2 text-gray-400 text-sm font-normal">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Write it down on paper and store in a secure location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Never store it digitally or take screenshots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Keep multiple copies in different secure locations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Never share it with anyone, even if they claim to be support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
