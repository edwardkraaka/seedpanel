"use client"

import { memo } from 'react'
import { AlertTriangleIcon, ShieldIcon, InfoIcon } from 'lucide-react'
import { Notice } from '@/lib/crypto/types'
import { MINERS_FEE, ACCEPTED_KYC_DOCUMENTS } from '@/lib/crypto/constants'

interface NoticeCardProps {
  notice: Notice
  theme?: 'light' | 'dark'
}

/**
 * Notice Card Component - Coinbase Design Pattern
 *
 * Displays important notices with ultra-minimal styling matching
 * the feature cards pattern from Coinbase screenshots.
 * Shows miner's fee amount for fee-related notices.
 */
export const NoticeCard = memo(({ notice, theme = 'light' }: NoticeCardProps) => {
  const isDark = theme === 'dark'

  // Get icon and colors based on notice type
  const getNoticeStyles = () => {
    switch (notice.type) {
      case 'miners-fee':
        return {
          icon: AlertTriangleIcon,
          iconBgColor: isDark ? 'bg-orange-500/20' : 'bg-orange-100',
          iconColor: isDark ? 'text-orange-400' : 'text-orange-600',
          accentColor: isDark ? 'text-orange-400' : 'text-orange-700',
        }
      case 'kyc-required':
        return {
          icon: ShieldIcon,
          iconBgColor: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
          iconColor: isDark ? 'text-blue-400' : 'text-[#0052FF]',
          accentColor: isDark ? 'text-blue-400' : 'text-[#0052FF]',
        }
      case 'warning':
        return {
          icon: AlertTriangleIcon,
          iconBgColor: isDark ? 'bg-red-500/20' : 'bg-red-100',
          iconColor: isDark ? 'text-red-400' : 'text-red-600',
          accentColor: isDark ? 'text-red-400' : 'text-red-700',
        }
      default:
        return {
          icon: InfoIcon,
          iconBgColor: isDark ? 'bg-gray-700' : 'bg-gray-100',
          iconColor: isDark ? 'text-gray-400' : 'text-gray-600',
          accentColor: isDark ? 'text-gray-400' : 'text-gray-700',
        }
    }
  }

  const styles = getNoticeStyles()
  const Icon = styles.icon

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        isDark
          ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
          : 'bg-white border-gray-100 hover:border-gray-200'
      }`}
      style={{
        padding: '32px',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-start gap-5">
        {/* Circular Icon Background - matching screenshot 2 pattern */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${styles.iconBgColor}`}
        >
          <Icon className={`w-7 h-7 ${styles.iconColor}`} />
        </div>

        <div className="flex-1 pt-1">
          {/* Bold heading - 18px */}
          <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            {notice.title}
          </h3>

          {/* Secondary text - 15px, Coinbase gray */}
          <p className={`text-[15px] leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
            {notice.message}
          </p>

          {/* Miner's Fee Amount Display */}
          {notice.type === 'miners-fee' && (
            <div className={`mb-4 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-baseline gap-2">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
                  Required Fee:
                </span>
                <span className={`text-lg font-bold ${styles.accentColor}`}>
                  ${MINERS_FEE.amountUSD}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  ({MINERS_FEE.amountBTC} BTC)
                </span>
              </div>
            </div>
          )}

          {/* KYC Required Documents Display */}
          {notice.type === 'kyc-required' && (
            <div className={`mb-4 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex flex-col gap-2">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
                  Accepted Documents:
                </span>
                <ul className="space-y-1.5">
                  {ACCEPTED_KYC_DOCUMENTS.map((doc) => (
                    <li
                      key={doc}
                      className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <span className={`text-lg ${styles.accentColor}`}>•</span>
                      <span className="font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action link with arrow */}
          {notice.actionLabel && notice.actionHref && (
            <a
              href={notice.actionHref}
              className={`inline-flex items-center gap-1 text-[15px] font-semibold ${styles.accentColor} hover:opacity-80 transition-opacity`}
            >
              {notice.actionLabel}
              <span className="text-lg">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
})

NoticeCard.displayName = 'NoticeCard'
