"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import RotatingCard from "./rotating-card"
import { ArrowRightIcon, PlayIcon, SunIcon, MoonIcon } from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

interface HeroSectionProps {
  onGetStarted?: () => void
  theme: "dark" | "light"
  onToggleTheme: () => void
}

export default function HeroSection({ onGetStarted, theme, onToggleTheme }: HeroSectionProps) {
  const isDark = theme === "dark"

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
      <header className="flex fixed top-0 left-0 right-0 items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto z-50 backdrop-blur-sm">
        <div className="relative h-8 w-32">
          <Image
            src={isDark ? "/Coinbase_Wordmark_White.svg" : "/Coinbase_Wordmark.svg"}
            alt="Coinbase"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <Link href="#" className={`${isDark ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
            Features
          </Link>
          <Link href="#" className={`${isDark ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
            Security
          </Link>
          <Link href="#" className={`${isDark ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
            Support
          </Link>
          <Link href="#" className={`${isDark ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className={`${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full`}
          >
            {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            className={`text-base font-medium ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"} hidden sm:flex`}
          >
            Sign in
          </Button>
          <Button
            className={`${isDark ? "bg-[#00D4AA] hover:bg-[#00BF9A]" : "bg-[#0052FF] hover:bg-[#0047E0]"} text-white text-base px-5 py-2 rounded-lg font-semibold transition-colors`}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24 gap-12 z-10">
        {/* Left Section */}
        <div className="flex-1 lg:pr-12 text-center lg:text-left">
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight ${isDark ? "text-white" : "text-black"}`}
          >
            The future of secure crypto storage
          </h1>
          <p
            className={`text-lg md:text-xl ${isDark ? "text-gray-400" : "text-gray-600"} mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal`}
          >
            We're the most trusted place for people and businesses to securely store and manage their digital assets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16">
            <Button
              onClick={onGetStarted}
              className={`${isDark ? "bg-[#00D4AA] hover:bg-[#00BF9A]" : "bg-[#0052FF] hover:bg-[#0047E0]"} text-white text-lg px-8 py-6 rounded-xl flex items-center gap-2 font-semibold transition-colors shadow-lg`}
            >
              Access Vault <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Link
              href="#"
              className={`flex items-center gap-3 text-base ${isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors font-medium`}
            >
              <div
                className={`w-12 h-12 rounded-full ${isDark ? "border-gray-700 bg-gray-800/50" : "border-gray-300 bg-gray-100"} border flex items-center justify-center transition-colors`}
              >
                <PlayIcon className="w-5 h-5 ml-0.5" />
              </div>
              Learn More
            </Link>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 text-center lg:text-left">
            <div>
              <div className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}>256-bit</div>
              <div className={`${isDark ? "text-gray-500" : "text-gray-600"} text-sm font-medium mt-1`}>Encryption</div>
            </div>
            <div>
              <div className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}>99.9%</div>
              <div className={`${isDark ? "text-gray-500" : "text-gray-600"} text-sm font-medium mt-1`}>Uptime</div>
            </div>
            <div>
              <div className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}>24/7</div>
              <div className={`${isDark ? "text-gray-500" : "text-gray-600"} text-sm font-medium mt-1`}>Support</div>
            </div>
          </div>
        </div>

        {/* Right Section - Rotating Card */}
        <div className="relative flex-1 flex justify-center items-center min-h-[400px] lg:min-h-[auto] lg:w-1/2">
          <div className="relative w-[350px] h-[220px] transform lg:rotate-[-8deg] scale-105">
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
