import './Dashboard.css'

function Dashboard({ stats }) {
  const { totalSlots, occupiedSlots, occupancyPercent, isFull } = stats

  const getStatusColor = () => {
    if (isFull) return '#ff4444'
    if (occupancyPercent > 80) return '#ff9500'
    if (occupancyPercent > 50) return '#ffcc00'
    return '#4caf50'
  }

  const getStatusLabel = () => {
    if (isFull) return 'FULL'
    if (occupancyPercent > 80) return 'CRITICAL'
    if (occupancyPercent > 50) return 'HIGH'
    if (occupancyPercent > 30) return 'MODERATE'
    return 'LOW'
  }

  return (
    <div className="dashboard">
      <div className="dashboard-section status-section">
        <h2>System Status</h2>
        <div className="status-card">
          <div className="status-visual">
            <div className="status-ring">
              <svg viewBox="0 0 100 100" className="progress-ring-svg">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getStatusColor()}
                  strokeWidth="8"
                  strokeDasharray={`${(occupancyPercent / 100) * 283} 283`}
                  transform="rotate(-90 50 50)"
                  className="progress-ring"
                />
                <text x="50" y="50" textAnchor="middle" dy="0.3em" className="progress-text">
                  {occupancyPercent}%
                </text>
              </svg>
            </div>
            <div className="status-indicator">
              <div className="status-label" style={{ color: getStatusColor() }}>
                {getStatusLabel()}
              </div>
              <div className="status-subtext">Overall Occupancy</div>
            </div>
          </div>
          <div className="status-details">
            <div className="detail-row">
              <span>Total Capacity:</span>
              <strong>{totalSlots}</strong>
            </div>
            <div className="detail-row">
              <span>Occupied:</span>
              <strong style={{ color: '#ff6b6b' }}>{occupiedSlots}</strong>
            </div>
            <div className="detail-row">
              <span>Available:</span>
              <strong style={{ color: '#51cf66' }}>{totalSlots - occupiedSlots}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section breakdown-section">
        <h2>Capacity Breakdown</h2>
        <div className="capacity-bars">
          <div className="capacity-item">
            <div className="capacity-header">
              <span>🚗 Cars</span>
              <span>{stats.carStats.occupied}/{stats.carStats.total}</span>
            </div>
            <div className="capacity-bar">
              <div 
                className="capacity-fill car-fill"
                style={{ width: `${(stats.carStats.occupied / stats.carStats.total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="capacity-item">
            <div className="capacity-header">
              <span>🏍️ Bikes</span>
              <span>{stats.bikeStats.occupied}/{stats.bikeStats.total}</span>
            </div>
            <div className="capacity-bar">
              <div 
                className="capacity-fill bike-fill"
                style={{ width: `${(stats.bikeStats.occupied / stats.bikeStats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section alerts-section">
        <h2>System Alerts</h2>
        <div className="alerts-container">
          {isFull && (
            <div className="alert alert-critical">
              <span className="alert-icon">🚨</span>
              <div className="alert-content">
                <strong>PARKING FULL</strong>
                <p>All slots occupied. Vehicles must wait for exit.</p>
              </div>
            </div>
          )}
          {occupancyPercent > 80 && !isFull && (
            <div className="alert alert-warning">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <strong>HIGH OCCUPANCY</strong>
                <p>Above 80% capacity. Only {totalSlots - occupiedSlots} spaces remaining.</p>
              </div>
            </div>
          )}
          {occupancyPercent > 50 && occupancyPercent <= 80 && (
            <div className="alert alert-info">
              <span className="alert-icon">ℹ️</span>
              <div className="alert-content">
                <strong>MODERATE OCCUPANCY</strong>
                <p>System operating normally at {occupancyPercent}% capacity.</p>
              </div>
            </div>
          )}
          {occupancyPercent <= 50 && (
            <div className="alert alert-success">
              <span className="alert-icon">✅</span>
              <div className="alert-content">
                <strong>LOW OCCUPANCY</strong>
                <p>Plenty of parking available. {totalSlots - occupiedSlots} spaces free.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
