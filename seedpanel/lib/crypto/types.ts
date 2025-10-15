/**
 * Crypto Dashboard Type Definitions
 * Comprehensive type system for the cryptocurrency dashboard
 */

// Cryptocurrency symbol identifiers
export type CryptoSymbol = 'BTC' | 'ETH' | 'LTC' | 'LINK' | 'BNB' | 'SOL' | 'DOT'

// Time range options for charts
export type TimeRange = '1H' | '1D' | '3D' | '1W' | '1M'

// Single price point in time series
export interface PricePoint {
  timestamp: number // Unix timestamp in milliseconds
  price: number // Price in USD
  volume?: number // Trading volume (optional)
}

// Sparkline data for mini charts
export interface SparklineData {
  points: number[] // Array of prices
  change24h: number // 24h percentage change
  isPositive: boolean // Whether change is positive
}

// Cryptocurrency wallet information
export interface CryptoWallet {
  symbol: CryptoSymbol
  name: string
  balance: number // Amount of crypto owned
  currentPrice: number // Current price in USD
  totalValue: number // balance * currentPrice
  change24h: number // 24h percentage change
  change7d: number // 7d percentage change
  sparkline: SparklineData
  historicalData: {
    '1H': PricePoint[]
    '1D': PricePoint[]
    '3D': PricePoint[]
    '1W': PricePoint[]
    '1M': PricePoint[]
  }
  icon?: string // Icon identifier
  color: string // Brand color for charts
}

// Complete dashboard data structure
export interface DashboardData {
  wallets: CryptoWallet[]
  totalBalance: number
  totalChange24h: number
  totalChange7d: number
  lastUpdated: number // Unix timestamp
  userProfile?: UserProfile // Optional user profile data
}

// Cryptocurrency metadata
export interface CryptoMetadata {
  symbol: CryptoSymbol
  name: string
  fullName: string
  color: string
  icon: string
  basePrice: number // Approximate real-world price
  volatility: number // 0-1 scale for price variation
}

// Time range configuration
export interface TimeRangeConfig {
  minutes: number
  dataPoints: number
  label: string
}

// Transaction types
export type TransactionType = 'buy' | 'sell'

export interface Transaction {
  type: TransactionType
  symbol: CryptoSymbol
  amount: number
  price: number
  total: number
  timestamp: number
}

// Notice types
export type NoticeType = 'miners-fee' | 'kyc-required' | 'info' | 'warning'

export interface Notice {
  type: NoticeType
  title: string
  message: string
  actionLabel?: string
  actionHref?: string
}

// Miner's fee configuration
export interface MinersFee {
  amountBTC: number // Fee in BTC
  amountUSD: number | string // Fee in USD equivalent (can be formatted string like "92 354.66")
  amountPaid: number // Amount paid so far in USD
  description: string
}

// User profile information
export interface UserProfile {
  fullName: string
  email: string
  profilePicture?: string // URL or path to profile image
  isVerified: boolean
  accountCreated: number // Unix timestamp
  userId?: string
}

// Theme type (extending existing)
export type Theme = 'light' | 'dark'

// Chart configuration
export interface ChartConfig {
  width?: number
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  animate?: boolean
}

// Buy/Sell form data
export interface TradeFormData {
  type: TransactionType
  symbol: CryptoSymbol
  amountUSD: string
  amountCrypto: string
}
