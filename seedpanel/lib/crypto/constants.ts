/**
 * Crypto Dashboard Constants
 * Cryptocurrency metadata and configuration constants
 */

import { CryptoSymbol, CryptoMetadata, TimeRange, TimeRangeConfig, MinersFee, UserProfile } from './types'

// Cryptocurrency metadata with brand colors and base prices
export const CRYPTO_METADATA: Record<CryptoSymbol, CryptoMetadata> = {
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    fullName: 'Bitcoin',
    color: '#F7931A',
    icon: '₿',
    basePrice: 43000,
    volatility: 0.05, // 5% typical daily variation
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    fullName: 'Ethereum',
    color: '#627EEA',
    icon: 'Ξ',
    basePrice: 2300,
    volatility: 0.07,
  },
  LTC: {
    symbol: 'LTC',
    name: 'Litecoin',
    fullName: 'Litecoin',
    color: '#345D9D',
    icon: 'Ł',
    basePrice: 72,
    volatility: 0.08,
  },
  LINK: {
    symbol: 'LINK',
    name: 'Chainlink',
    fullName: 'Chainlink',
    color: '#2A5ADA',
    icon: '⬡',
    basePrice: 15,
    volatility: 0.10,
  },
  BNB: {
    symbol: 'BNB',
    name: 'Binance',
    fullName: 'Binance Coin',
    color: '#F3BA2F',
    icon: 'B',
    basePrice: 310,
    volatility: 0.06,
  },
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    fullName: 'Solana',
    color: '#14F195',
    icon: '◎',
    basePrice: 98,
    volatility: 0.12, // Higher volatility
  },
  DOT: {
    symbol: 'DOT',
    name: 'Polkadot',
    fullName: 'Polkadot',
    color: '#E6007A',
    icon: '●',
    basePrice: 7,
    volatility: 0.09,
  },
}

// Time range configurations
export const TIME_RANGES: Record<TimeRange, TimeRangeConfig> = {
  '1H': { minutes: 60, dataPoints: 60, label: '1 Hour' },
  '1D': { minutes: 1440, dataPoints: 288, label: '1 Day' },
  '3D': { minutes: 4320, dataPoints: 432, label: '3 Days' },
  '1W': { minutes: 10080, dataPoints: 672, label: '1 Week' },
  '1M': { minutes: 43200, dataPoints: 720, label: '1 Month' },
} as const

/**
 * USER WALLET BALANCES - EASILY CONFIGURABLE
 *
 * Change these values to set custom balances for the dashboard.
 * These are fixed values and will remain consistent across sessions.
 *
 * Example:
 *   BTC: 0.5    -> User owns 0.5 Bitcoin
 *   ETH: 5.2    -> User owns 5.2 Ethereum
 */
export const SEED_BALANCES: Record<CryptoSymbol, number> = {
  BTC: 4,     // Bitcoin balance
  ETH: 60.2,     // Ethereum balance
  LTC: 1,      // Litecoin balance
  LINK: 800,    // Chainlink balance
  BNB: 15,      // Binance Coin balance
  SOL: 120,     // Solana balance
  DOT: 500,     // Polkadot balance
}

/**
 * MINER'S FEE CONFIGURATION
 *
 * Configure the network fee required to unlock balances.
 * The fee can be displayed in both BTC and USD equivalent.
 */
export const MINERS_FEE: MinersFee = {
  amountBTC: 0.19,
  amountUSD: '40,500',
  amountPaid: 19000, // Amount paid so far in USD
  description: 'Network fee to process and unlock your balance',
}

/**
 * ACCEPTED KYC DOCUMENTS
 *
 * List of documents accepted for identity verification
 */
export const ACCEPTED_KYC_DOCUMENTS = [
  'Driver\'s License',
  'Passport',
  'Government ID',
] as const

// Dashboard notices
export const DASHBOARD_NOTICES = {
  MINERS_FEE: {
    type: 'miners-fee' as const,
    title: "Miner's Fee Required to Unlock Balance",
    message: 'A small network fee ensures your transaction is processed quickly and securely by miners.',
    actionLabel: 'Learn More',
    actionHref: '#',
  },
  KYC_REQUIRED: {
    type: 'kyc-required' as const,
    title: 'Fully Verified',
    message: 'Your account is fully verified and in good standing.',
    actionLabel: undefined,
    actionHref: undefined,
  },
} as const

/**
 * USER PROFILE DATA
 *
 * Configure the user profile information displayed in the dashboard.
 * Update these values to customize the user's account details.
 */
export const DEFAULT_USER_PROFILE: UserProfile = {
  fullName: 'Joseph Gregory Thomas',
  email: 'tjmacafee@yahoo.com',
  profilePicture: undefined, // Set to image URL/path if available
  isVerified: true,
  accountCreated: Date.now() - 2950 * 24 * 60 * 60 * 1000, // 180 days ago
  userId: 'user_' + Math.random().toString(36).substr(2, 9),
}
