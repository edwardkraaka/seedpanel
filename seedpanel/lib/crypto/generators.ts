/**
 * Crypto Data Generators
 * Realistic price data generation using Brownian motion
 */

import { PricePoint, CryptoSymbol, TimeRange, SparklineData } from './types'
import { CRYPTO_METADATA, TIME_RANGES } from './constants'

/**
 * Generates realistic price movement using Brownian motion with drift
 * Creates smooth, organic-looking price charts
 */
export function generatePriceHistory(
  symbol: CryptoSymbol,
  timeRange: TimeRange,
  seed?: number
): PricePoint[] {
  const metadata = CRYPTO_METADATA[symbol]
  const config = TIME_RANGES[timeRange]
  const dataPoints = config.dataPoints

  // Seeded random for reproducible data
  let randomSeed = seed || Date.now()
  const seededRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280
    return randomSeed / 233280
  }

  const now = Date.now()
  const intervalMs = (config.minutes * 60 * 1000) / dataPoints
  const prices: PricePoint[] = []

  let currentPrice = metadata.basePrice

  // Add trend component
  const trendSeed = seededRandom()
  const trend = trendSeed > 0.6 ? 0.0001 : trendSeed < 0.4 ? -0.0001 : 0

  for (let i = 0; i < dataPoints; i++) {
    const timestamp = now - (dataPoints - i - 1) * intervalMs

    // Brownian motion: random walk with drift
    const randomChange = (seededRandom() - 0.5) * 2 // -1 to 1
    const volatilityFactor = metadata.volatility * randomChange
    const drift = trend * currentPrice

    // Apply changes
    currentPrice = currentPrice * (1 + volatilityFactor) + drift

    // Prevent negative prices
    currentPrice = Math.max(currentPrice, metadata.basePrice * 0.5)

    // Add some volume variation
    const volume = metadata.basePrice * 1000000 * (0.8 + seededRandom() * 0.4)

    prices.push({
      timestamp,
      price: parseFloat(currentPrice.toFixed(2)),
      volume: parseFloat(volume.toFixed(2)),
    })
  }

  return prices
}

/**
 * Creates sparkline data from price history
 */
export function generateSparkline(priceHistory: PricePoint[]): SparklineData {
  // Take last 24 hours of data for sparkline
  const last24h = priceHistory.slice(-24)
  const points = last24h.map((p) => p.price)

  const firstPrice = points[0]
  const lastPrice = points[points.length - 1]
  const change24h = ((lastPrice - firstPrice) / firstPrice) * 100

  return {
    points,
    change24h: parseFloat(change24h.toFixed(2)),
    isPositive: change24h >= 0,
  }
}

/**
 * Calculates percentage change between two prices
 */
export function calculateChange(oldPrice: number, newPrice: number): number {
  return ((newPrice - oldPrice) / oldPrice) * 100
}

/**
 * Generates interesting, varied chart patterns
 * Each crypto gets a different pattern type
 */
export function generateInterestingPattern(symbol: CryptoSymbol, timeRange: TimeRange): PricePoint[] {
  const patterns: Record<CryptoSymbol, string> = {
    BTC: 'steady-growth',
    ETH: 'volatile-growth',
    LTC: 'sideways',
    LINK: 'recovery',
    BNB: 'dip-recovery',
    SOL: 'high-volatility',
    DOT: 'downtrend',
  }

  const pattern = patterns[symbol]
  const seed = symbol.charCodeAt(0) * 1000 // Consistent seed per symbol

  // Generate base data
  const baseData = generatePriceHistory(symbol, timeRange, seed)

  // Apply pattern transformations
  switch (pattern) {
    case 'steady-growth':
      return baseData.map((p, i) => ({
        ...p,
        price: p.price * (1 + (i / baseData.length) * 0.15), // 15% growth
      }))

    case 'volatile-growth':
      return baseData.map((p, i) => ({
        ...p,
        price: p.price * (1 + (i / baseData.length) * 0.2 + Math.sin(i / 10) * 0.05),
      }))

    case 'sideways':
      return baseData.map((p) => ({
        ...p,
        price: p.price * (0.98 + Math.random() * 0.04), // ±2% range
      }))

    case 'recovery':
      return baseData.map((p, i) => {
        const progress = i / baseData.length
        const dip = progress < 0.3 ? 1 - progress * 0.5 : 0.85 + (progress - 0.3) * 0.5
        return { ...p, price: p.price * dip }
      })

    case 'dip-recovery':
      return baseData.map((p, i) => {
        const progress = i / baseData.length
        let factor = 1
        if (progress < 0.4) factor = 1 - progress * 0.25
        else if (progress < 0.6) factor = 0.9
        else factor = 0.9 + (progress - 0.6) * 0.4
        return { ...p, price: p.price * factor }
      })

    case 'high-volatility':
      return baseData.map((p, i) => ({
        ...p,
        price: p.price * (1 + Math.sin(i / 5) * 0.15),
      }))

    case 'downtrend':
      return baseData.map((p, i) => ({
        ...p,
        price: p.price * (1 - (i / baseData.length) * 0.1), // 10% decline
      }))

    default:
      return baseData
  }
}
