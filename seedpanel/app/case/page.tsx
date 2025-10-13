"use client"

import { useState } from "react"
import CaseNumberForm from "../../case-number-form"
import SeedPhrasePage from "../../seed-phrase-page"

export default function Page() {
  const [currentView, setCurrentView] = useState<"case-form" | "seed-phrase">("case-form")
  const [theme, setTheme] = useState<"dark" | "light">("light")

  const handleCaseNumberSubmit = () => {
    setCurrentView("seed-phrase")
  }

  const handleBack = () => {
    setCurrentView("case-form")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {currentView === "case-form" && (
        <CaseNumberForm
          onSuccess={handleCaseNumberSubmit}
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
