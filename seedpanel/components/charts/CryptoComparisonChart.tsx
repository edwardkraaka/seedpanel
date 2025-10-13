"use client"

import { useState, useMemo, memo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TimeRange, PricePoint } from '@/lib/crypto/types'
import { format } from 'date-fns'

interface CryptoComparisonChartProps {
  btcData: PricePoint[]
  dotData: PricePoint[]
  selectedRange: TimeRange
  onRangeChange: (range: TimeRange) => void
  theme?: 'light' | 'dark'
  className?: string
}

/**
 * Multi-line Crypto Comparison Chart
 * Shows BTC vs DOT price trends with time range selector
 */
export const CryptoComparisonChart = memo(
  ({ btcData, dotData, selectedRange, onRangeChange, theme = 'light', className = '' }: CryptoComparisonChartProps) => {
    const isDark = theme === 'dark'
    const [hoveredData, setHoveredData] = useState<any | null>(null)

    // Merge and format data for chart
    const chartData = useMemo(() => {
      return btcData.map((btcPoint, index) => ({
        timestamp: btcPoint.timestamp,
        btcPrice: btcPoint.price,
        dotPrice: dotData[index]?.price || 0,
      }))
    }, [btcData, dotData])

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
      if (!active || !payload?.length) return null

      const data = payload[0].payload

      return (
        <div className={`rounded-lg p-3 shadow-lg border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {format(data.timestamp, 'MMM dd, HH:mm')}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium" style={{ color: '#F7931A' }}>
                BTC
              </span>
              <span className={`text-sm font-mono ${isDark ? 'text-white' : 'text-black'}`}>
                ${data.btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium" style={{ color: '#E6007A' }}>
                DOT
              </span>
              <span className={`text-sm font-mono ${isDark ? 'text-white' : 'text-black'}`}>
                ${data.dotPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
            </div>
          </div>
        </div>
      )
    }

    // Format X-axis based on time range
    const formatXAxis = (timestamp: number) => {
      if (selectedRange === '1H') return format(timestamp, 'HH:mm')
      if (selectedRange === '1D') return format(timestamp, 'HH:mm')
      return format(timestamp, 'MMM dd')
    }

    // Calculate percentage changes
    const btcChange = useMemo(() => {
      if (chartData.length < 2) return 0
      const first = chartData[0].btcPrice
      const last = chartData[chartData.length - 1].btcPrice
      return ((last - first) / first) * 100
    }, [chartData])

    const dotChange = useMemo(() => {
      if (chartData.length < 2) return 0
      const first = chartData[0].dotPrice
      const last = chartData[chartData.length - 1].dotPrice
      return ((last - first) / first) * 100
    }, [chartData])

    const timeRanges: TimeRange[] = ['1H', '1D', '3D', '1W', '1M']

    return (
      <div className={`w-full ${className}`}>
        {/* Header with stats and time selector */}
        <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-3">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Price Comparison</h3>
            <div className="flex gap-8">
              <div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>BTC</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    ${chartData[chartData.length - 1]?.btcPrice.toLocaleString() || '0'}
                  </span>
                  <span className={`text-sm font-semibold ${btcChange >= 0 ? 'text-[#05B169]' : 'text-[#DF5F67]'}`}>
                    {btcChange >= 0 ? '↑ ' : '↓ '}
                    {Math.abs(btcChange).toFixed(2)}%
                  </span>
                </div>
              </div>
              <div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>DOT</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    ${chartData[chartData.length - 1]?.dotPrice.toFixed(4) || '0'}
                  </span>
                  <span className={`text-sm font-semibold ${dotChange >= 0 ? 'text-[#05B169]' : 'text-[#DF5F67]'}`}>
                    {dotChange >= 0 ? '↑ ' : '↓ '}
                    {Math.abs(dotChange).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Time range selector */}
          <div className={`flex gap-1 rounded-xl p-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`} role="tablist" aria-label="Time range selector">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => onRangeChange(range)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  selectedRange === range
                    ? isDark
                      ? 'bg-[#00D4AA] text-black shadow-lg'
                      : 'bg-[#0052FF] text-white shadow-lg'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
                role="tab"
                aria-selected={selectedRange === range}
                aria-controls="crypto-chart"
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div
          id="crypto-chart"
          role="img"
          aria-label={`Price comparison chart showing BTC and DOT over ${selectedRange}`}
          className={`rounded-2xl p-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              onMouseMove={(e: any) => {
                if (e.activePayload) {
                  setHoveredData(e.activePayload[0].payload)
                }
              }}
              onMouseLeave={() => setHoveredData(null)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} opacity={0.3} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                yAxisId="btc"
                orientation="left"
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="dot"
                orientation="right"
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
              <Line
                yAxisId="btc"
                type="monotone"
                dataKey="btcPrice"
                stroke="#F7931A"
                strokeWidth={2}
                dot={false}
                name="Bitcoin (BTC)"
                activeDot={{ r: 4 }}
                isAnimationActive={true}
                animationDuration={300}
              />
              <Line
                yAxisId="dot"
                type="monotone"
                dataKey="dotPrice"
                stroke="#E6007A"
                strokeWidth={2}
                dot={false}
                name="Polkadot (DOT)"
                activeDot={{ r: 4 }}
                isAnimationActive={true}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
)

CryptoComparisonChart.displayName = 'CryptoComparisonChart'
