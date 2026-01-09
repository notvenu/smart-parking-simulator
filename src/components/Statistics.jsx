import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function Statistics({ stats, statisticsData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gradient mb-2">Analytics</h2>
        <p className="text-sm text-white/60">Real-time parking insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3">
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60 mb-1">Total Capacity</div>
          <div className="text-3xl font-bold text-white">{stats.totalSlots}</div>
          <div className="text-xs text-white/40 mt-1">Parking spaces</div>
        </div>
        
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60 mb-1">Currently Occupied</div>
          <div className="text-3xl font-bold text-blue-400">{stats.occupiedSlots}</div>
          <div className="text-xs text-blue-400/60 mt-1">
            {((stats.occupiedSlots / stats.totalSlots) * 100).toFixed(1)}% full
          </div>
        </div>
        
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60 mb-1">Available Now</div>
          <div className="text-3xl font-bold text-green-400">{stats.availableSlots}</div>
          <div className="text-xs text-green-400/60 mt-1">Ready to park</div>
        </div>
        
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60 mb-1">Occupancy Rate</div>
          <div className="text-3xl font-bold text-amber-400">{stats.occupancyPercent}%</div>
          <div className="text-xs text-amber-400/60 mt-1">
            {stats.occupancyPercent >= 90 ? 'Critical' : stats.occupancyPercent >= 70 ? 'High' : stats.occupancyPercent >= 50 ? 'Moderate' : 'Low'}
          </div>
        </div>
      </div>

      {/* Vehicle Breakdown */}
      <div className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white/80 mb-4">Vehicle Breakdown</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">🚗 Cars</span>
              <span className="font-semibold text-blue-300">
                {stats.carStats.occupied}/{stats.carStats.total}
              </span>
            </div>
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full transition-all duration-500 glow-blue"
                style={{ width: `${(stats.carStats.occupied / stats.carStats.total) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Occupied: {stats.carStats.occupied}</span>
              <span>Available: {stats.carStats.available}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">🏍️ Bikes</span>
              <span className="font-semibold text-purple-300">
                {stats.bikeStats.occupied}/{stats.bikeStats.total}
              </span>
            </div>
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-full transition-all duration-500 glow-purple"
                style={{ width: `${(stats.bikeStats.occupied / stats.bikeStats.total) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Occupied: {stats.bikeStats.occupied}</span>
              <span>Available: {stats.bikeStats.available}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white/80 mb-4">Occupancy Trend</h3>
        <div className="h-48">
          {statisticsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statisticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '10px' }}
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '10px' }}
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(99,102,241,0.5)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#818cf8"
                  strokeWidth={2}
                  dot={{ fill: '#818cf8', r: 3 }}
                  activeDot={{ r: 5, fill: '#6366f1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-white/40">Collecting data...</p>
            </div>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="glass-dark rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white/80 mb-3">💡 Insights</h3>
        <ul className="space-y-2 text-xs text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-primary-400">▸</span>
            <span>Total: {stats.totalSlots} parking spaces</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">▸</span>
            <span>{stats.carStats.total} car slots (single occupancy)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">▸</span>
            <span>{stats.bikeStats.total} bike capacity (shared slots)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">▸</span>
            <span>{stats.availableSlots} spaces available right now</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Statistics
