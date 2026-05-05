import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {
  axios.defaults.withCredentials = true
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)
  const navigate = useNavigate()
  const inputRefs = React.useRef([])

  const handleInput = (e, index) => { if (e.target.value.length > 0 && index < 5) inputRefs.current[index + 1].focus() }
  const handleKeyDown = (e, index) => { if (e.key === 'Backspace' && e.target.value === '' && index > 0) inputRefs.current[index - 1].focus() }
  const handlePaste = (e) => { e.clipboardData.getData('text').split('').forEach((char, i) => { if (inputRefs.current[i]) inputRefs.current[i].value = char }) }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const otp = inputRefs.current.map(r => r.value).join('')
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
      if (data.success) { toast.success(data.message); getUserData(); navigate('/') }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => { isLoggedin && userData && userData.isAccountVerified && navigate('/') }, [isLoggedin, userData])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050a0e] relative overflow-hidden"
      style={{backgroundImage:'linear-gradient(rgba(0,214,143,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,0.035) 1px,transparent 1px)', backgroundSize:'44px 44px'}}>

      <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -top-48 -right-36"
        style={{background:'radial-gradient(circle,rgba(0,214,143,0.1) 0%,transparent 70%)'}} />
      <div className="fixed w-[450px] h-[450px] rounded-full pointer-events-none -bottom-28 -left-28"
        style={{background:'radial-gradient(circle,rgba(0,168,107,0.07) 0%,transparent 70%)'}} />

      <div className="absolute top-6 left-6 sm:left-14 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#050a0e]" />
        </div>
        <span className="font-bold tracking-tight text-emerald-400 text-base" style={{fontFamily:'Space Mono, monospace'}}>
          auth<span className="text-green-400">.</span>app
        </span>
      </div>

      <form onSubmit={onSubmitHandler} className="w-full max-w-sm bg-[#0a1218]/90 border border-emerald-900/50 backdrop-blur-xl rounded-2xl p-8 z-10 shadow-2xl">

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-emerald-950/50 border border-emerald-800/40 flex items-center justify-center mx-auto mb-5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#34d399" strokeWidth="1.5"/>
            <path d="M22 6l-10 7L2 6" stroke="#34d399" strokeWidth="1.5"/>
          </svg>
        </div>

        <span className="block w-fit mx-auto px-3 py-1 rounded-full border border-emerald-800 text-emerald-400 text-xs bg-emerald-950/40 mb-3 tracking-widest" style={{fontFamily:'Space Mono, monospace'}}>
          VERIFY EMAIL
        </span>

        <h1 className="text-2xl font-bold text-emerald-50 tracking-tight text-center mb-2">Check your inbox</h1>
        <p className="text-sm text-emerald-900/70 text-center mb-5">Enter the 6-digit code sent to your email address.</p>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-800 to-transparent mb-6" />

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
          Verify Email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify
