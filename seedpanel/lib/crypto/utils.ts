/**
 * Crypto Dashboard Utilities
 * Helper functions for formatting and calculations
 */

import { CryptoWallet } from './types'

/**
 * Calculate total portfolio balance
 */
export function calculateTotalBalance(wallets: CryptoWallet[]): number {
  return wallets.reduce((sum, wallet) => sum + wallet.totalValue, 0)
}

/**
 * Calculate weighted average 24h change
 */
export function calculateWeighted24hChange(wallets: CryptoWallet[]): number {
  const totalValue = calculateTotalBalance(wallets)
  if (totalValue === 0) return 0

  return wallets.reduce((sum, wallet) => {
    const weight = wallet.totalValue / totalValue
    return sum + wallet.change24h * weight
  }, 0)
}

/**
 * Format currency values
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Format percentage changes
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

/**
 * Format large numbers (abbreviate millions, billions)
 */
export function formatLargeNumber(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
  return formatCurrency(value)
}

/**
 * Format crypto amount
 */
export function formatCryptoAmount(amount: number, symbol: string, decimals: number = 8): string {
  return `${amount.toFixed(decimals)} ${symbol}`
}

/**
 * Get top performing wallets
 */
export function getTopPerformers(wallets: CryptoWallet[], limit: number = 3): CryptoWallet[] {
  return [...wallets].sort((a, b) => b.change24h - a.change24h).slice(0, limit)
}

/**
 * Get worst performing wallets
 */
export function getWorstPerformers(wallets: CryptoWallet[], limit: number = 3): CryptoWallet[] {
  return [...wallets].sort((a, b) => a.change24h - b.change24h).slice(0, limit)
}
