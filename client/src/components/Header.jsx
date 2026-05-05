import React, { useContext } from 'react'
import { AppContent } from '../context/AppContext'

const Header = () => {
  const { userData } = useContext(AppContent)

  return (
    <div className="flex flex-col items-center text-center px-6 mt-28">

      {/* Avatar */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/50">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="rgba(4,12,8,0.9)"/>
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/50">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3 3 7-7" stroke="#040c08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Chip */}
      <span className="inline-block px-3 py-1 rounded-full border border-emerald-800 text-emerald-400 text-xs bg-emerald-950/40 mb-5 tracking-widest" style={{fontFamily:'Space Mono, monospace'}}>
        WELCOME BACK
      </span>

      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4 text-emerald-50 tracking-tight">
        Hey,{' '}
        <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
          {userData ? userData.name : 'Developer'}
        </span>{' '}
        👋
      </h1>

      <p className="text-base font-light max-w-md leading-relaxed text-emerald-900/80 mb-4">
        Your secure gateway is ready.{' '}
        <span className="text-emerald-700">Everything you need is one click away.</span>
      </p>

      {/* Divider */}
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-700 to-transparent mb-8" />

      <button className="px-8 py-3 rounded-xl border border-emerald-800 text-emerald-400 font-medium bg-emerald-950/30 hover:bg-emerald-900/30 hover:border-emerald-600 transition-all cursor-pointer text-sm">
        Get Started →
      </button>
    </div>
  )
}

export default Header
