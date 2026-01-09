import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Statistics.css'

function Statistics({ stats, statisticsData }) {
  return (
    <div className="statistics-panel">
      <h2>Live Statistics</h2>

      <div className="stats-summary">
        <div className="stat-box total">
          <div className="stat-label">Total Capacity</div>
          <div className="stat-value">{stats.totalSlots}</div>
        </div>
        <div className="stat-box occupied">
          <div className="stat-label">Occupied</div>
          <div className="stat-value">{stats.occupiedSlots}</div>
        </div>
        <div className="stat-box available">
          <div className="stat-label">Available</div>
          <div className="stat-value">{stats.availableSlots}</div>
        </div>
        <div className="stat-box percent">
          <div className="stat-label">Occupancy %</div>
          <div className="stat-value">{stats.occupancyPercent}%</div>
        </div>
      </div>

      <div className="vehicle-breakdown">
        <div className="breakdown-section">
          <h3>🚗 Car Statistics</h3>
          <div className="breakdown-stats">
            <div className="breakdown-item">
              <span>Total Slots:</span>
              <strong>{stats.carStats.total}</strong>
            </div>
            <div className="breakdown-item">
              <span>Occupied:</span>
              <strong className="occupied-text">{stats.carStats.occupied}</strong>
            </div>
            <div className="breakdown-item">
              <span>Available:</span>
              <strong className="available-text">{stats.carStats.available}</strong>
            </div>
          </div>
        </div>
        
        <div className="breakdown-section">
          <h3>🏍️ Bike Statistics</h3>
          <div className="breakdown-stats">
            <div className="breakdown-item">
              <span>Total Capacity:</span>
              <strong>{stats.bikeStats.total}</strong>
            </div>
            <div className="breakdown-item">
              <span>Occupied:</span>
              <strong className="occupied-text">{stats.bikeStats.occupied}</strong>
            </div>
            <div className="breakdown-item">
              <span>Available:</span>
              <strong className="available-text">{stats.bikeStats.available}</strong>
            </div>
          </div>
        </div>
      </div>

      {statisticsData.length > 0 && (
        <div className="chart-container">
          <h3>Occupancy Trend (Real-time)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={statisticsData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 11, fill: '#a0aec0' }}
                interval={Math.max(0, Math.floor(statisticsData.length / 4))}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#a0aec0' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value) => [`${value}%`, 'Occupancy']}
              />
              <Line
                type="monotone"
                dataKey="occupancy"
                stroke="#667eea"
                strokeWidth={3}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#764ba2' }}
                isAnimationActive={false}
                name="Occupancy %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="statistics-insights">
        <h3>System Insights</h3>
        <ul>
          <li>
            <strong>Multi-Vehicle Support:</strong> Dedicated sections for cars and bikes
          </li>
          <li>
            <strong>Space Efficiency:</strong> 2 bikes per slot doubles bike capacity
          </li>
          <li>
            <strong>Smart Allocation:</strong> Nearest available slot assignment
          </li>
          <li>
            <strong>Ultra-Fast Simulation:</strong> Real-time traffic patterns with 400-800ms intervals
          </li>
          <li>
            <strong>Peak Hour Management:</strong> Dynamic traffic flow adaptation
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Statistics
