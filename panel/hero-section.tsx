"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import RotatingCard from "./rotating-card"
import { ArrowRightIcon, PlayIcon } from "lucide-react"
import { Space_Mono } from "next/font/google"

// Initialize the Space Mono font
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // Using 400 and 700 for distinct weights
  variable: "--font-space-mono",
})

interface HeroSectionProps {
  onGetStarted?: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className={`min-h-screen bg-[#1a1a1a] text-white ${spaceMono.variable} font-mono`}>
      {" "}
      {/* Changed font-sans to font-mono */}
      {/* Background Grid */}
      <div
        className="absolute inset-0  opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(to right, #444 1px, transparent 1px),
          linear-gradient(to bottom, #444 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      ></div>
      {/* Header */}
      <header className="flex  fixed top-0 left-0 right-0 items-center justify-between px-8 py-6 max-w-7xl mx-auto z-50">
        <div className="text-2xl font-bold tracking-wide">PREMIUM.</div> {/* Adjusted tracking for monospace */}
        <nav className="hidden md:flex space-x-8 text-lg font-normal">
          {" "}
          {/* Adjusted font weight */}
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Benefits
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Rewards
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Support
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Apply
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-lg font-normal hover:bg-gray-800">
            {" "}
            {/* Adjusted font weight */}
            Login
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200 text-lg px-6 py-3 rounded-lg font-bold">
            {" "}
            {/* Adjusted font weight */}
            Sign Up
          </Button>
        </div>
      </header>
      {/* Hero Content */}
      <main className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 z-50 lg:py-24 gap-12 z-10">
        {/* Left Section */}
        <div className="flex-1 lg:pr-16 text-center lg:text-left mt-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-wide">
            {" "}
            {/* Adjusted font weight/tracking */}
            Unlock Exclusive Financial Freedom
            <span className="inline-block ml-4 text-yellow-400 text-6xl animate-pulse">&#x2728;</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {" "}
            {/* Adjusted line height */}
            Experience unparalleled benefits, global acceptance, and personalized service with our premium credit card.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-16">
            <Button
              onClick={onGetStarted}
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-3 rounded-lg flex items-center gap-2 font-bold"
            >
              Apply Now <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Link
              href="#"
              className="flex items-center gap-3 text-lg text-gray-300 hover:text-white transition-colors font-normal"
            >
              {" "}
              {/* Adjusted font weight */}
              <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
                <PlayIcon className="w-6 h-6" />
              </div>
              Explore Benefits
            </Link>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 text-center lg:text-left">
            <div>
              <div className="text-4xl font-bold tracking-wide">50K+</div> {/* Adjusted font weight/tracking */}
              <div className="text-gray-400 text-sm font-normal">Premium Members</div> {/* Adjusted font weight */}
            </div>
            <div>
              <div className="text-4xl font-bold tracking-wide">3X</div> {/* Adjusted font weight/tracking */}
              <div className="text-gray-400 text-sm font-normal">Exclusive Rewards</div> {/* Adjusted font weight */}
            </div>
            <div>
              <div className="text-4xl font-bold tracking-wide">180+</div> {/* Adjusted font weight/tracking */}
              <div className="text-gray-400 text-sm font-normal">Countries Accepted</div> {/* Adjusted font weight */}
            </div>
          </div>
        </div>

        {/* Right Section - Rotating Card */}
        <div className="relative flex-1 flex justify-center items-center min-h-[400px] lg:min-h-[auto] lg:w-1/2">
          <div className="relative w-[350px] h-[220px] transform rotate-[-20deg] scale-105">
            {" "}
            {/* Adjusted initial rotation */}
            <RotatingCard
              frontImageSrc="https://i.ibb.co/LdWYSCJM/Cardf.png"
              backImageSrc="https://i.ibb.co/JFxTfQyv/Cardb.png"
              className="w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
