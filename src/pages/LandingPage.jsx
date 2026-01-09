import React from 'react'
import { Link } from 'react-router-dom'
import { CarIcon, BikeIcon, ArrowRightIcon, DashboardIcon, AnalyticsIcon, SmartIcon, BoltIcon } from '../components/icons'

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute w-80 h-80 -bottom-40 -right-40 bg-gradient-to-br from-gray-400/10 to-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Logo Animation */}
          <div className="relative mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 glass rounded-2xl animate-float">
                <CarIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="p-3 sm:p-4 glass rounded-2xl animate-float" style={{animationDelay: '1s'}}>
                <BikeIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-gray-300/20 blur-3xl"></div>
          </div>

          {/* Hero Text */}
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-7xl font-bold mb-4 sm:mb-6">
              <span className="text-gradient">Smart Parking</span>
              <br />
              <span className="text-2xl sm:text-5xl text-gray-300">Management System</span>
            </h1>
            
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Experience intelligent parking slot allocation with real-time monitoring,
              automated vehicle management, and advanced analytics powered by AI.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform group">
              <div className="mb-3 sm:mb-4 flex justify-center">
                <BoltIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 text-gradient">Real-Time Tracking</h3>
              <p className="text-xs sm:text-sm text-gray-400">Live occupancy monitoring with instant updates</p>
            </div>
            
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform group">
              <div className="mb-3 sm:mb-4 flex justify-center">
                <SmartIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 text-gradient">Smart Allocation</h3>
              <p className="text-xs sm:text-sm text-gray-400">Nearest slot assignment using intelligent algorithms</p>
            </div>
            
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform group">
              <div className="mb-3 sm:mb-4 flex justify-center">
                <AnalyticsIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 text-gradient">Analytics Dashboard</h3>
              <p className="text-xs sm:text-sm text-gray-400">Comprehensive insights and trend analysis</p>
            </div>
            
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform group">
              <div className="mb-3 sm:mb-4 flex justify-center">
                <DashboardIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 text-gradient">Peak Hour Support</h3>
              <p className="text-xs sm:text-sm text-gray-400">Handle high traffic with automated simulation</p>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 mb-12 sm:mb-16">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">100</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Slots</div>
            </div>
            <div className="w-px h-8 sm:h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">60</div>
              <div className="text-xs sm:text-sm text-gray-400">Car Spaces</div>
            </div>
            <div className="w-px h-8 sm:h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-gray-300 mb-1 sm:mb-2">40</div>
              <div className="text-xs sm:text-sm text-gray-400">Bike Capacity</div>
            </div>
          </div>

          {/* Get Started Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get Started in 3 Simple Steps</h2>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="glass-dark rounded-xl p-4 sm:p-6 text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg sm:text-xl mx-auto mb-3 sm:mb-4">1</div>
                <h3 className="font-semibold text-white mb-2">Enter System</h3>
                <p className="text-xs sm:text-sm text-gray-400">Click the button below to access the parking management interface</p>
              </div>
              <div className="glass-dark rounded-xl p-4 sm:p-6 text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg sm:text-xl mx-auto mb-3 sm:mb-4">2</div>
                <h3 className="font-semibold text-white mb-2">Select Vehicle</h3>
                <p className="text-xs sm:text-sm text-gray-400">Choose between car or bike and use manual or auto mode</p>
              </div>
              <div className="glass-dark rounded-xl p-4 sm:p-6 text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg sm:text-xl mx-auto mb-3 sm:mb-4">3</div>
                <h3 className="font-semibold text-white mb-2">Monitor & Analyze</h3>
                <p className="text-xs sm:text-sm text-gray-400">View real-time statistics and intelligent parking allocation</p>
              </div>
            </div>
          </div>

          {/* Enter Button */}
          <div className="relative">
            <Link
              to="/simulation"
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-3 sm:py-4 bg-white text-black rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 glow-primary hover:shadow-2xl"
            >
              <span className="relative z-10">Enter Parking System</span>
              <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gray-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-sm text-white/40">
              Powered by React & AI • Real-time Analytics • Multi-vehicle Support
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
    </div>
  )
}

export default LandingPage