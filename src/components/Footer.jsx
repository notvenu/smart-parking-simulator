import React from 'react'

function Footer() {
  return (
    <footer className="glass border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-gradient mb-4">Smart Parking</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              AI-powered intelligent parking management system with real-time analytics and automated slot allocation.
            </p>
          </div>
          
          {/* Features */}
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>• Real-time slot tracking</li>
              <li>• Smart allocation algorithm</li>
              <li>• Multi-vehicle support</li>
              <li>• Peak hour simulation</li>
            </ul>
          </div>
          
          {/* Technology */}
          <div>
            <h4 className="font-semibold text-white mb-4">Technology</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>• React 19 & Vite</li>
              <li>• Tailwind CSS</li>
              <li>• Recharts Analytics</li>
              <li>• Modern JavaScript</li>
            </ul>
          </div>
          
          {/* Stats */}
          <div>
            <h4 className="font-semibold text-white mb-4">Capacity</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Total Slots</span>
                <span className="font-bold text-white">100</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Car Spaces</span>
                <span className="font-bold text-blue-400">60</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Bike Capacity</span>
                <span className="font-bold text-purple-400">40</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-sm text-gray-400">
              © 2026 Smart Parking System. Built for SIMVERSE Hackathon.
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Real-time Analytics</span>
              <span>•</span>
              <span>Multi-vehicle Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer