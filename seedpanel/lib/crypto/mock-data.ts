/**
 * Mock Data Architecture
 * Complete mock data generation and caching
 */

import { CryptoWallet, DashboardData, CryptoSymbol } from './types'
import { CRYPTO_METADATA, SEED_BALANCES, DEFAULT_USER_PROFILE } from './constants'
import { generateInterestingPattern, generateSparkline, calculateChange } from './generators'

/**
 * Generate complete wallet data for a cryptocurrency
 */
function generateWalletData(symbol: CryptoSymbol, balance: number): CryptoWallet {
  const metadata = CRYPTO_METADATA[symbol]

  // Generate historical data for all time ranges
  const historicalData = {
    '1H': generateInterestingPattern(symbol, '1H'),
    '1D': generateInterestingPattern(symbol, '1D'),
    '3D': generateInterestingPattern(symbol, '3D'),
    '1W': generateInterestingPattern(symbol, '1W'),
    '1M': generateInterestingPattern(symbol, '1M'),
  } as const

  // Current price is the last point in 1H data
  const currentPrice = historicalData['1H'][historicalData['1H'].length - 1].price

  // Calculate changes
  const price24hAgo = historicalData['1D'][historicalData['1D'].length - 24]?.price || currentPrice
  const price7dAgo = historicalData['1W'][0]?.price || currentPrice

  const change24h = calculateChange(price24hAgo, currentPrice)
  const change7d = calculateChange(price7dAgo, currentPrice)

  // Generate sparkline
  const sparkline = generateSparkline(historicalData['1D'])

  return {
    symbol,
    name: metadata.name,
    balance,
    currentPrice: parseFloat(currentPrice.toFixed(2)),
    totalValue: parseFloat((balance * currentPrice).toFixed(2)),
    change24h: parseFloat(change24h.toFixed(2)),
    change7d: parseFloat(change7d.toFixed(2)),
    sparkline,
    historicalData,
    icon: metadata.icon,
    color: metadata.color,
  }
}

/**
 * Generate complete dashboard mock data
 */
export function generateMockDashboardData(): DashboardData {
  const wallets: CryptoWallet[] = Object.entries(SEED_BALANCES).map(([symbol, balance]) =>
    generateWalletData(symbol as CryptoSymbol, balance)
  )

  // Calculate total portfolio value
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.totalValue, 0)

  // Calculate weighted average changes
  const totalChange24h = wallets.reduce(
    (sum, wallet) => sum + (wallet.change24h * wallet.totalValue) / totalBalance,
    0
  )

  const totalChange7d = wallets.reduce(
    (sum, wallet) => sum + (wallet.change7d * wallet.totalValue) / totalBalance,
    0
  )

  return {
    wallets,
    totalBalance: 664343.89, // Fixed locked balance amount
    totalChange24h: parseFloat(totalChange24h.toFixed(2)),
    totalChange7d: parseFloat(totalChange7d.toFixed(2)),
    lastUpdated: Date.now(),
    userProfile: DEFAULT_USER_PROFILE,
  }
}

/**
 * Get single wallet data
 */
export function getMockWalletData(symbol: CryptoSymbol): CryptoWallet {
  const balance = SEED_BALANCES[symbol]
  return generateWalletData(symbol, balance)
}

// Export singleton instance for consistent data across components
let cachedDashboardData: DashboardData | null = null

export function getCachedDashboardData(): DashboardData {
  if (!cachedDashboardData) {
    cachedDashboardData = generateMockDashboardData()
  }
  return cachedDashboardData
}

export function refreshDashboardData(): DashboardData {
  cachedDashboardData = generateMockDashboardData()
  return cachedDashboardData
}
