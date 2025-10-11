"use client"

import { useEffect } from "react"

interface ChatwootWindow extends Window {
  chatwootSettings?: {
    hideMessageBubble: boolean
    position: string
    locale: string
    type: string
  }
  chatwootSDK?: {
    run: (config: { websiteToken: string; baseUrl: string }) => void
  }
}

declare const window: ChatwootWindow

export default function ChatwootWidget() {
  useEffect(() => {
    // Get environment variables
    const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN
    const baseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL

    // Only load if token and URL are configured
    if (!websiteToken || !baseUrl) {
      console.warn("Chatwoot: Missing NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN or NEXT_PUBLIC_CHATWOOT_BASE_URL")
      return
    }

    // Configure Chatwoot settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right",
      locale: "en",
      type: "standard",
    }

    // Load Chatwoot SDK
    const script = document.createElement("script")
    script.src = `${baseUrl}/packs/js/sdk.js`
    script.async = true
    script.onload = () => {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: websiteToken,
          baseUrl: baseUrl,
        })
      }
    }

    const firstScript = document.getElementsByTagName("script")[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    }

    // Cleanup function
    return () => {
      // Remove script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
