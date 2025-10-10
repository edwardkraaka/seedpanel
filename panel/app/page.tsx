"use client"

import { useState } from "react"
import HeroSection from "../hero-section"
import CaseNumberForm from "../case-number-form"
import SeedPhrasePage from "../seed-phrase-page"

export default function Page() {
  const [currentView, setCurrentView] = useState<"hero" | "case-form" | "seed-phrase">("hero")

  const handleGetStarted = () => {
    setCurrentView("case-form")
  }

  const handleCaseNumberSubmit = () => {
    setCurrentView("seed-phrase")
  }

  const handleBack = () => {
    setCurrentView("hero")
  }

  return (
    <>
      {currentView === "hero" && <HeroSection onGetStarted={handleGetStarted} />}
      {currentView === "case-form" && <CaseNumberForm onSuccess={handleCaseNumberSubmit} onBack={handleBack} />}
      {currentView === "seed-phrase" && <SeedPhrasePage onBack={handleBack} />}
    </>
  )
}
