"use client"

import { memo } from 'react'
import { CryptoWallet } from '@/lib/crypto/types'
import { formatCurrency, formatPercentage } from '@/lib/crypto/utils'
import { TrendSparkline } from '@/components/charts/Sparkline'

interface WalletCardProps {
  wallet: CryptoWallet
  theme?: 'light' | 'dark'
}

/**
 * Wallet Card Component
 * Displays cryptocurrency wallet information with sparkline
 */
export const WalletCard = memo(({ wallet, theme = 'light' }: WalletCardProps) => {
  const isPositive = wallet.change24h >= 0
  const isDark = theme === 'dark'

  return (
    <div
      className={`rounded-2xl border p-6 transition-all duration-200 hover:shadow-md ${
        isDark
          ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900 hover:border-gray-700'
          : 'bg-white border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
      }`}
      style={{
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}
            style={{ color: wallet.color }}
          >
            {wallet.icon}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-black'}`}>{wallet.name}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-[#5B616E]'}`}>{wallet.symbol}</p>
          </div>
        </div>
        <div
          className={`text-sm font-semibold flex items-center gap-1 ${isPositive ? 'text-[#05B169]' : 'text-[#DF5F67]'}`}
        >
          {isPositive ? '↑' : '↓'} {formatPercentage(wallet.change24h).replace('+', '').replace('-', '')}
        </div>
      </div>

      {/* Balance */}
      <div className="mb-5">
        <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
          {formatCurrency(wallet.totalValue)}
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
          {wallet.balance.toFixed(4)} {wallet.symbol} @ {formatCurrency(wallet.currentPrice)}
        </p>
      </div>

      {/* Sparkline */}
      <div className="h-14 -mx-2">
        <TrendSparkline
          data={wallet.sparkline.points}
          width={280}
          height={56}
          strokeWidth={2}
          showFill
          upColor={isDark ? '#00D4AA' : '#05B169'}
          downColor={isDark ? '#FF6B6B' : '#DF5F67'}
          ariaLabel={`${wallet.name} price trend over 24 hours`}
        />
      </div>
    </div>
  )
})

WalletCard.displayName = 'WalletCard'
