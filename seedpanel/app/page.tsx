"use client"

import { useState } from "react"
import HeroSection from "../hero-section"
import CaseNumberForm from "../case-number-form"
import SeedPhrasePage from "../seed-phrase-page"

export default function Page() {
  const [currentView, setCurrentView] = useState<"hero" | "case-form" | "seed-phrase">("hero")
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const handleGetStarted = () => {
    setCurrentView("case-form")
  }

  const handleCaseNumberSubmit = () => {
    setCurrentView("seed-phrase")
  }

  const handleBack = () => {
    setCurrentView("hero")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {currentView === "hero" && (
        <HeroSection onGetStarted={handleGetStarted} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {currentView === "case-form" && (
        <CaseNumberForm
          onSuccess={handleCaseNumberSubmit}
          onBack={handleBack}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {currentView === "seed-phrase" && (
        <SeedPhrasePage onBack={handleBack} theme={theme} onToggleTheme={toggleTheme} />
      )}
    </>
  )
}
