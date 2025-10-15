"use client"

import { memo } from 'react'
import { AlertTriangleIcon, InfoIcon, CheckCircle2Icon } from 'lucide-react'
import { Notice } from '@/lib/crypto/types'
import { MINERS_FEE } from '@/lib/crypto/constants'
import { Tooltip } from '@/components/ui/tooltip'

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
          icon: CheckCircle2Icon,
          iconBgColor: isDark ? 'bg-green-500/20' : 'bg-green-100',
          iconColor: 'text-[#05B169]',
          accentColor: 'text-[#05B169]',
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

          {/* Daily Limits Display for Verified Status */}
          {notice.type === 'kyc-required' && (
            <div className={`mb-4 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
                    Daily Transfer Limit:
                  </span>
                  <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    $100,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
                    Daily Withdrawal Limit:
                  </span>
                  <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    $50,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
                    Daily Deposit Limit:
                  </span>
                  <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    Unlimited
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Miner's Fee Amount Display with Progress Bar */}
          {notice.type === 'miners-fee' && (() => {
            const totalAmount = typeof MINERS_FEE.amountUSD === 'string'
              ? parseFloat(MINERS_FEE.amountUSD.replace(/,/g, ''))
              : MINERS_FEE.amountUSD
            const paidAmount = MINERS_FEE.amountPaid
            const remainingAmount = totalAmount - paidAmount
            const percentage = (paidAmount / totalAmount) * 100

            return (
              <div className={`mb-4 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                {/* Total Fee Info */}
                <div className="flex items-baseline gap-2 mb-4">
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

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    {/* Green paid section */}
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#05B169] to-[#04D97F] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                    {/* Red remaining section */}
                    <div
                      className="absolute right-0 top-0 h-full bg-gradient-to-r from-[#DF5F67] to-[#E74C3C]"
                      style={{ width: `${100 - percentage}%` }}
                    />
                    {/* Percentage text overlay with tooltip */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Tooltip
                        content={`${percentage.toFixed(1)}% of the miner's fee has been paid. $${paidAmount.toLocaleString()} out of $${totalAmount.toLocaleString()} completed.`}
                        theme={theme}
                        position="top"
                        maxWidth={250}
                      >
                        <span className="text-xs font-bold text-white drop-shadow-md cursor-help">
                          {percentage.toFixed(1)}%
                        </span>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Amount labels */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#05B169]" />
                      <span className="font-semibold text-[#05B169]">
                        Paid: ${paidAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#DF5F67]">
                        Remaining: ${remainingAmount.toLocaleString()}
                      </span>
                      <div className="w-3 h-3 rounded-full bg-[#DF5F67]" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}


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
