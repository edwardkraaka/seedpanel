"use client"

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon, ArrowLeftIcon } from 'lucide-react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { getCachedDashboardData } from '@/lib/crypto/mock-data'
import { DashboardData, TimeRange } from '@/lib/crypto/types'
import { formatCurrency, formatPercentage } from '@/lib/crypto/utils'
import { WalletCard } from '@/components/dashboard/WalletCard'
import { NoticeCard } from '@/components/dashboard/NoticeCard'
import { UserInfoCard } from '@/components/dashboard/UserInfoCard'
import { CryptoComparisonChart } from '@/components/charts/CryptoComparisonChart'
import { Tooltip } from '@/components/ui/tooltip'
import { DASHBOARD_NOTICES, MINERS_FEE } from '@/lib/crypto/constants'
import { InfoIcon } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export default function DashboardPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [data, setData] = useState<DashboardData | null>(null)
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1D')
  const isDark = theme === 'dark'

  useEffect(() => {
    // Load dashboard data
    const dashboardData = getCachedDashboardData()
    setData(dashboardData)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Get BTC and DOT data for comparison chart
  const btcWallet = data?.wallets.find((w) => w.symbol === 'BTC')
  const dotWallet = data?.wallets.find((w) => w.symbol === 'DOT')

  const btcData = useMemo(() => btcWallet?.historicalData[selectedRange] || [], [btcWallet, selectedRange])
  const dotData = useMemo(() => dotWallet?.historicalData[selectedRange] || [], [dotWallet, selectedRange])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  const isPositive = data.totalChange24h >= 0

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-[#0A0B0D]' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'} ${inter.variable} font-sans transition-colors duration-300`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-5'}`}
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className={`${isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} flex items-center gap-2`}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back
            </Button>
            <div className="relative h-6 w-24">
              <Image
                src={isDark ? '/Coinbase_Wordmark_White.svg' : '/Coinbase_Wordmark.svg'}
                alt="Coinbase"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full`}
          >
            {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative pt-24 px-6 pb-12 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-12">
            <h1 className={`text-5xl font-bold mb-6 tracking-tight leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
              Hey Thomas!
            </h1>
            <div>
              <div className="flex items-baseline gap-4">
                <p className={`text-6xl font-bold leading-none ${isDark ? 'text-white' : 'text-black'}`}>
                  {formatCurrency(data.totalBalance)}
                </p>
                <span className={`text-2xl font-semibold ${isPositive ? 'text-[#05B169]' : 'text-[#DF5F67]'}`}>
                  {isPositive ? '↑' : '↓'} {formatPercentage(data.totalChange24h).replace('+', '').replace('-', '')}
                </span>
                {/* Balance Info Tooltip */}
                <Tooltip
                  content={`This balance is currently locked behind a miner's fee, and the balance can only be unlocked once the miner's fee is paid. Required fee: $${MINERS_FEE.amountUSD} (${MINERS_FEE.amountBTC} BTC).`}
                  theme={theme}
                  position="bottom"
                  maxWidth={320}
                >
                  <InfoIcon
                    className={`w-6 h-6 ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors cursor-help`}
                  />
                </Tooltip>
              </div>
              <p className={`text-base mt-3 ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>Locked balance</p>
            </div>
          </div>

          {/* User Profile Card */}
          {data.userProfile && (
            <div className="mb-8">
              <UserInfoCard user={data.userProfile} theme={theme} />
            </div>
          )}

          {/* Notice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <NoticeCard notice={DASHBOARD_NOTICES.MINERS_FEE} theme={theme} />
            <NoticeCard notice={DASHBOARD_NOTICES.KYC_REQUIRED} theme={theme} />
          </div>

          {/* Price Comparison Chart */}
          <div className="mb-12">
            <CryptoComparisonChart
              btcData={btcData}
              dotData={dotData}
              selectedRange={selectedRange}
              onRangeChange={setSelectedRange}
              theme={theme}
            />
          </div>

          {/* Wallets Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Wallets</h2>
              {/* Toggle Tabs */}
              <div
                className={`inline-flex rounded-full p-1 ${isDark ? 'bg-gray-900' : 'bg-[#F7F8FA]'}`}
                role="tablist"
                aria-label="Wallet view selector"
              >
                <button
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isDark ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
                  role="tab"
                  aria-selected="true"
                >
                  All Assets
                </button>
                <button
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isDark ? 'text-gray-400 hover:text-white' : 'text-[#5B616E] hover:text-black'
                  }`}
                  role="tab"
                  aria-selected="false"
                >
                  Top Gainers
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.wallets.map((wallet) => (
                <WalletCard key={wallet.symbol} wallet={wallet} theme={theme} />
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className={`text-center mt-16 py-8 border-t ${isDark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
            <p className="text-sm">
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </p>
            <p className="text-xs mt-2">
              Mock data for demonstration purposes only
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
