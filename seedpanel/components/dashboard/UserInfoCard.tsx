"use client"

import { memo } from 'react'
import { UserProfile } from '@/lib/crypto/types'
import { CheckCircle2Icon, UserIcon } from 'lucide-react'

interface UserInfoCardProps {
  user: UserProfile
  theme?: 'light' | 'dark'
}

/**
 * User Info Card Component - Coinbase Design Pattern
 *
 * Displays user profile information with minimal styling
 * matching the wallet card design pattern.
 */
export const UserInfoCard = memo(({ user, theme = 'light' }: UserInfoCardProps) => {
  const isDark = theme === 'dark'

  // Format account age
  const getAccountAge = () => {
    const ageInDays = Math.floor((Date.now() - user.accountCreated) / (1000 * 60 * 60 * 24))
    if (ageInDays < 30) return `${ageInDays} days`
    if (ageInDays < 365) return `${Math.floor(ageInDays / 30)} months`
    return `${Math.floor(ageInDays / 365)} years`
  }

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        isDark
          ? 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700'
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
      }`}
      style={{
        padding: '24px',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Profile Picture or Default Avatar */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className={`w-8 h-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          )}
        </div>

        {/* User Details */}
        <div className="flex-1 min-w-0">
          {/* Full Name with Verification Badge */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-bold text-lg truncate ${isDark ? 'text-white' : 'text-black'}`}>
              {user.fullName}
            </h3>
            {user.isVerified && (
              <CheckCircle2Icon className="w-5 h-5 text-[#05B169] flex-shrink-0" aria-label="Verified" />
            )}
          </div>

          {/* Email Address */}
          <p className={`text-sm mb-1 truncate ${isDark ? 'text-gray-400' : 'text-[#5B616E]'}`}>
            {user.email}
          </p>

          {/* Account Age */}
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Member for {getAccountAge()}
          </p>

          {/* Verification Status Badge */}
          {user.isVerified && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05B169]/10 border border-[#05B169]/20">
              <span className="text-xs font-semibold text-[#05B169]">Verified Account</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

UserInfoCard.displayName = 'UserInfoCard'
