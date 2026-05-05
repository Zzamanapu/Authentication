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
const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="#5a7a6a"/>
  </svg>
)

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })
        if (data.success) { setIsLoggedin(true); getUserData(); navigate('/') }
        else toast.error(data.message)
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })
        if (data.success) { setIsLoggedin(true); getUserData(); navigate('/') }
        else toast.error(data.message)
      }
    } catch (error) { toast.error(error.message) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050a0e] relative overflow-hidden"
      style={{backgroundImage:'linear-gradient(rgba(0,214,143,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,0.035) 1px,transparent 1px)', backgroundSize:'44px 44px'}}>

      {/* Orbs */}
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

      {/* Card */}
      <div className="w-full max-w-sm bg-[#0a1218]/90 border border-emerald-900/50 backdrop-blur-xl rounded-2xl p-8 z-10 shadow-2xl">

        <span className="inline-block px-3 py-1 rounded-full border border-emerald-800 text-emerald-400 text-xs bg-emerald-950/40 mb-3 tracking-widest" style={{fontFamily:'Space Mono, monospace'}}>
          {state === 'Sign Up' ? 'NEW ACCOUNT' : 'SIGN IN'}
        </span>

        <h2 className="text-2xl font-bold text-emerald-50 tracking-tight mb-1">
          {state === 'Sign Up' ? 'Create account' : 'Welcome back'}
        </h2>
        <p className="text-sm text-emerald-900/70 mb-5">
          {state === 'Sign Up' ? 'Fill in the details to get started.' : 'Enter your credentials to continue.'}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-800 to-transparent mb-5" />

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
          {state === 'Sign Up' && (
            <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 focus-within:border-emerald-600/50 focus-within:bg-emerald-950/30 transition-all">
              <PersonIcon />
              <input className="bg-transparent outline-none text-emerald-100 text-sm w-full placeholder-emerald-900"
                type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}

          <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 focus-within:border-emerald-600/50 focus-within:bg-emerald-950/30 transition-all">
            <MailIcon />
            <input className="bg-transparent outline-none text-emerald-100 text-sm w-full placeholder-emerald-900"
              type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 focus-within:border-emerald-600/50 focus-within:bg-emerald-950/30 transition-all">
            <LockIcon />
            <input className="bg-transparent outline-none text-emerald-100 text-sm w-full placeholder-emerald-900"
              type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          {state === 'Login' && (
            <button type="button" onClick={() => navigate('/reset-password')}
              className="text-emerald-500 text-xs text-left cursor-pointer bg-transparent border-none p-0 hover:text-emerald-400 transition-colors">
              Forgot password?
            </button>
          )}

          <button type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-[#040c08] font-semibold text-sm cursor-pointer border-none mt-1 hover:opacity-90 transition-opacity shadow-lg shadow-emerald-900/40">
            {state === 'Sign Up' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-emerald-900/60 mt-5">
          {state === 'Sign Up' ? 'Already have an account? ' : "Don't have an account? "}
          <span className="text-emerald-500 cursor-pointer underline hover:text-emerald-400 transition-colors"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}>
            {state === 'Sign Up' ? 'Sign in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
