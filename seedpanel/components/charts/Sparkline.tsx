"use client"

import { useEffect, useRef, memo } from 'react'

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  strokeWidth?: number
  color?: string
  fillColor?: string
  showFill?: boolean
  className?: string
  ariaLabel?: string
}

/**
 * High-performance canvas-based sparkline chart
 * Lightweight component for displaying price trends
 */
export const Sparkline = memo(
  ({
    data,
    width = 100,
    height = 30,
    strokeWidth = 1.5,
    color = 'currentColor',
    fillColor = 'currentColor',
    showFill = false,
    className = '',
    ariaLabel = 'Sparkline chart',
  }: SparklineProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas || !data.length) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set high DPI for retina displays
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Calculate points
      const min = Math.min(...data)
      const max = Math.max(...data)
      const range = max - min || 1
      const stepX = width / (data.length - 1)

      // Draw fill if enabled
      if (showFill) {
        ctx.beginPath()
        ctx.moveTo(0, height)

        data.forEach((value, index) => {
          const x = index * stepX
          const y = height - ((value - min) / range) * height
          if (index === 0) {
            ctx.lineTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.lineTo(width, height)
        ctx.closePath()

        // Create gradient for fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, fillColor.replace('currentColor', color) + '20') // 20% opacity
        gradient.addColorStop(1, fillColor.replace('currentColor', color) + '00') // 0% opacity

        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = strokeWidth
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      data.forEach((value, index) => {
        const x = index * stepX
        const y = height - ((value - min) / range) * height

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    }, [data, width, height, strokeWidth, color, fillColor, showFill])

    // Calculate trend for accessibility
    const trend = data.length >= 2 ? (data[data.length - 1] > data[0] ? 'up' : 'down') : 'neutral'
    const min = Math.min(...data)
    const max = Math.max(...data)

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={className}
        role="img"
        aria-label={`${ariaLabel}. Trend: ${trend}. Range: ${min.toFixed(2)} to ${max.toFixed(2)}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    )
  }
)

Sparkline.displayName = 'Sparkline'

/**
 * Trend-colored sparkline that automatically adjusts color based on direction
 */
interface TrendSparklineProps extends Omit<SparklineProps, 'color' | 'fillColor'> {
  upColor?: string
  downColor?: string
  neutralColor?: string
}

export const TrendSparkline = memo(
  ({
    data,
    upColor = 'rgb(34, 197, 94)', // green-500
    downColor = 'rgb(239, 68, 68)', // red-500
    neutralColor = 'rgb(156, 163, 175)', // gray-400
    ...props
  }: TrendSparklineProps) => {
    const trend =
      data.length < 2 ? 'neutral' : data[data.length - 1] > data[0] ? 'up' : data[data.length - 1] < data[0] ? 'down' : 'neutral'

    const color = trend === 'up' ? upColor : trend === 'down' ? downColor : neutralColor

    return <Sparkline data={data} color={color} fillColor={color} {...props} />
  }
)

TrendSparkline.displayName = 'TrendSparkline'
