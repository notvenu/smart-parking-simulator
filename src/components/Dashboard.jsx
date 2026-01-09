import React from 'react'

function Dashboard({ stats }) {
  const getStatusColor = () => {
    if (stats.isFull) return 'text-red-400'
    if (stats.occupancyPercent >= 90) return 'text-orange-400'
    if (stats.occupancyPercent >= 70) return 'text-amber-400'
    if (stats.occupancyPercent >= 50) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getStatusText = () => {
    if (stats.isFull) return 'FULL'
    if (stats.occupancyPercent >= 90) return 'CRITICAL'
    if (stats.occupancyPercent >= 70) return 'HIGH'
    if (stats.occupancyPercent >= 50) return 'MODERATE'
    return 'LOW'
  }

  const getProgressColor = () => {
    if (stats.isFull) return '#ef4444'
    if (stats.occupancyPercent >= 90) return '#f97316'
    if (stats.occupancyPercent >= 70) return '#f59e0b'
    if (stats.occupancyPercent >= 50) return '#eab308'
    return '#22c55e'
  }

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (stats.occupancyPercent / 100) * circumference

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gradient mb-2">Live Dashboard</h2>
        <p className="text-sm text-white/60">Real-time occupancy status</p>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="54"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="96"
              cy="96"
              r="54"
              stroke={getProgressColor()}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
              style={{
                filter: `drop-shadow(0 0 8px ${getProgressColor()})`
              }}
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getStatusColor()}`}>
              {stats.occupancyPercent}%
            </span>
            <span className="text-xs text-white/60 mt-1">Occupied</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <div className={`px-4 py-2 rounded-full glass-dark border ${getStatusColor()}`}
             style={{ borderColor: getProgressColor() }}>
          <span className={`text-sm font-bold ${getStatusColor()}`}>
            {getStatusText()} USAGE
          </span>
        </div>
      </div>

      {/* Capacity Breakdown */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">🚗 Car Capacity</span>
            <span className="text-sm font-semibold text-blue-300">
              {stats.carStats.occupied}/{stats.carStats.total}
            </span>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${(stats.carStats.occupied / stats.carStats.total) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">🏍️ Bike Capacity</span>
            <span className="text-sm font-semibold text-purple-300">
              {stats.bikeStats.occupied}/{stats.bikeStats.total}
            </span>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${(stats.bikeStats.occupied / stats.bikeStats.total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-dark rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.availableSlots}</div>
          <div className="text-xs text-white/60 mt-1">Available</div>
        </div>
        <div className="glass-dark rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.occupiedSlots}</div>
          <div className="text-xs text-white/60 mt-1">Occupied</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
