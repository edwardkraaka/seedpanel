"use client"

import { useState, useRef, useEffect, ReactNode, useCallback } from 'react'

interface TooltipProps {
  content: string | ReactNode
  children: ReactNode
  theme?: 'light' | 'dark'
  position?: 'top' | 'bottom' | 'left' | 'right'
  maxWidth?: number
}

/**
 * Coinbase-styled Tooltip Component
 *
 * A reusable, accessible tooltip with Coinbase design patterns.
 * Supports hover interactions with proper positioning.
 * Fixed: No more flashing/blinking on hover.
 */
export function Tooltip({
  content,
  children,
  theme = 'light',
  position = 'bottom',
  maxWidth = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [calculatedPosition, setCalculatedPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const isDark = theme === 'dark'

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + 8
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - 8
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + 8
        break
    }

    // Keep tooltip within viewport bounds
    const padding = 8
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding))
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding))

    setCalculatedPosition({ top, left })
  }, [position])

  useEffect(() => {
    if (isVisible) {
      // Calculate position once when tooltip becomes visible
      requestAnimationFrame(calculatePosition)
    }
  }, [isVisible, calculatePosition])

  const handleMouseEnter = () => setIsVisible(true)
  const handleMouseLeave = () => setIsVisible(false)

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block cursor-help"
        role="button"
        aria-label="Show tooltip"
        tabIndex={0}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-50 rounded-xl border pointer-events-none ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-black'
          }`}
          style={{
            top: `${calculatedPosition.top}px`,
            left: `${calculatedPosition.left}px`,
            maxWidth: `${maxWidth}px`,
            padding: '16px',
            boxShadow: isDark
              ? '0 4px 12px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.12)',
          }}
          role="tooltip"
          aria-live="polite"
        >
          <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-[#5B616E]'}`}>
            {content}
          </div>
        </div>
      )}
    </>
  )
}
