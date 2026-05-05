import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => (
  <div className="min-h-screen bg-[#050a0e] relative overflow-hidden flex items-center justify-center"
    style={{backgroundImage:'linear-gradient(rgba(0,214,143,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,0.035) 1px,transparent 1px)', backgroundSize:'44px 44px'}}>
    {/* Orbs */}
    <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -top-48 -right-36"
      style={{background:'radial-gradient(circle,rgba(0,214,143,0.1) 0%,transparent 70%)'}} />
    <div className="fixed w-[450px] h-[450px] rounded-full pointer-events-none -bottom-28 -left-28"
      style={{background:'radial-gradient(circle,rgba(0,168,107,0.07) 0%,transparent 70%)'}} />
    <Navbar />
    <Header />
  </div>
)

export default Home
