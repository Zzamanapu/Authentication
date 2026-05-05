import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#5a7a6a" strokeWidth="1.5"/>
    <path d="M22 6l-10 7L2 6" stroke="#5a7a6a" strokeWidth="1.5"/>
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#5a7a6a" strokeWidth="1.5"/>
    <path d="M8 11V7a4 4 0 018 0v4" stroke="#5a7a6a" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const stepTitles = ['Reset password', 'Enter OTP code', 'New password']
const stepSubs = [
  'Enter your registered email to receive a reset code.',
  'Enter the 6-digit code sent to your inbox.',
  'Choose a strong new password.',
]

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
  const inputRefs = React.useRef([])

  const step = !isEmailSent ? 0 : !isOtpSubmitted ? 1 : 2

  const handleInput = (e, i) => { if (e.target.value.length > 0 && i < 5) inputRefs.current[i + 1].focus() }
  const handleKeyDown = (e, i) => { if (e.key === 'Backspace' && e.target.value === '' && i > 0) inputRefs.current[i - 1].focus() }
  const handlePaste = (e) => { e.clipboardData.getData('text').split('').forEach((char, i) => { if (inputRefs.current[i]) inputRefs.current[i].value = char }) }

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) { toast.error(error.message) }
  }
  const onSubmitOTP = async (e) => {
    e.preventDefault()
    setOtp(inputRefs.current.map(r => r.value).join(''))
    setIsOtpSubmitted(true)
  }
  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) { toast.error(error.message) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050a0e] relative overflow-hidden"
      style={{backgroundImage:'linear-gradient(rgba(0,214,143,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,0.035) 1px,transparent 1px)', backgroundSize:'44px 44px'}}>

      <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -top-48 -right-36"
        style={{background:'radial-gradient(circle,rgba(0,214,143,0.1) 0%,transparent 70%)'}} />
      <div className="fixed w-[450px] h-[450px] rounded-full pointer-events-none -bottom-28 -left-28"
        style={{background:'radial-gradient(circle,rgba(0,168,107,0.07) 0%,transparent 70%)'}} />

      {/* Logo */}
      <div className="absolute top-6 left-6 sm:left-14 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#050a0e]" />
        </div>
        <span className="font-bold tracking-tight text-emerald-400 text-base" style={{fontFamily:'Space Mono, monospace'}}>
          auth<span className="text-green-400">.</span>app
        </span>
      </div>

      {/* Step indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {[0, 1, 2].map(i => (
          <React.Fragment key={i}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${i <= step ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-[#040c08]' : 'bg-emerald-950/40 text-emerald-800 border border-emerald-900'}`}
              style={{fontFamily:'Space Mono, monospace'}}>
              {i + 1}
            </div>
            {i < 2 && <div className={`w-8 h-px transition-all ${i < step ? 'bg-emerald-500' : 'bg-emerald-900'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-[#0a1218]/90 border border-emerald-900/50 backdrop-blur-xl rounded-2xl p-8 z-10 shadow-2xl">

        <span className="inline-block px-3 py-1 rounded-full border border-emerald-800 text-emerald-400 text-xs bg-emerald-950/40 mb-3 tracking-widest" style={{fontFamily:'Space Mono, monospace'}}>
          STEP {step + 1} OF 3
        </span>

        <h1 className="text-2xl font-bold text-emerald-50 tracking-tight mb-1">{stepTitles[step]}</h1>
        <p className="text-sm text-emerald-900/70 mb-5">{stepSubs[step]}</p>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-800 to-transparent mb-5" />

        {/* Step 1 */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 focus-within:border-emerald-600/50 focus-within:bg-emerald-950/30 transition-all">
              <MailIcon />
              <input className="bg-transparent outline-none text-emerald-100 text-sm w-full placeholder-emerald-900"
                type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-[#040c08] font-semibold text-sm cursor-pointer border-none mt-1 hover:opacity-90 transition-opacity shadow-lg shadow-emerald-900/40">
              Send Reset Code
            </button>
          </form>
        )}

        {/* Step 2 */}
        {!isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitOTP}>
            <div className="flex justify-between gap-2 mb-7" onPaste={handlePaste}>
              {Array(6).fill(0).map((_, i) => (
                <input key={i} type="text" maxLength="1" required
                  className="w-11 h-14 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-emerald-400 text-center text-xl outline-none focus:border-emerald-500 focus:bg-emerald-950/50 transition-all"
                  style={{fontFamily:'Space Mono, monospace'}}
                  ref={e => inputRefs.current[i] = e}
                  onInput={e => handleInput(e, i)}
                  onKeyDown={e => handleKeyDown(e, i)}
                />
              ))}
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-[#040c08] font-semibold text-sm cursor-pointer border-none hover:opacity-90 transition-opacity shadow-lg shadow-emerald-900/40">
              Verify Code
            </button>
          </form>
        )}

        {/* Step 3 */}
        {isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 focus-within:border-emerald-600/50 focus-within:bg-emerald-950/30 transition-all">
              <LockIcon />
              <input className="bg-transparent outline-none text-emerald-100 text-sm w-full placeholder-emerald-900"
                type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-[#040c08] font-semibold text-sm cursor-pointer border-none mt-1 hover:opacity-90 transition-opacity shadow-lg shadow-emerald-900/40">
              Set New Password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
