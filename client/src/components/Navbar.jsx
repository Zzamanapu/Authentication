import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, backendUrl, setIsLoggedin, setUserData } = useContext(AppContent)
  const [open, setOpen] = useState(false)

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if (data.success) { navigate('/email-verify'); toast.success(data.message) }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
    } catch (error) { toast.error(error.message) }
  }

  return (
    <nav className="w-full flex justify-between items-center px-6 sm:px-16 py-5 absolute top-0 z-20">

      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <div className="w-3 h-3 rounded-sm bg-[#050a0e]" />
        </div>
        <span className="font-bold tracking-tight text-emerald-400 text-lg" style={{fontFamily:'Space Mono, monospace'}}>
          auth<span className="text-green-400">.</span>app
        </span>
      </div>

      {userData ? (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[#040c08] font-bold text-sm cursor-pointer">
            {userData.name[0].toUpperCase()}
          </div>
          {open && (
            <ul className="absolute top-full right-0 mt-2 bg-[#0a1a12] border border-emerald-900 rounded-xl overflow-hidden min-w-36 shadow-xl z-50 p-0 m-0">
              {!userData.isAccountVerified && (
                <li className="px-4 py-2.5 text-sm text-emerald-300 cursor-pointer hover:bg-emerald-900/30 hover:text-emerald-400 list-none"
                  onClick={sendVerificationOtp}>Verify Email</li>
              )}
              <li className="px-4 py-2.5 text-sm text-emerald-300 cursor-pointer hover:bg-emerald-900/30 hover:text-emerald-400 list-none"
                onClick={logout}>Logout</li>
            </ul>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-emerald-800 rounded-lg px-5 py-2 text-emerald-400 text-sm font-medium bg-emerald-950/30 hover:bg-emerald-900/30 hover:border-emerald-600 transition-all cursor-pointer">
          Sign in
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </nav>
  )
}

export default Navbar
