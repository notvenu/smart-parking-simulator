import './LandingPage.css'

function LandingPage({ onEnter }) {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="hero-section">
          <div className="logo-container">
            <div className="animated-car">🚗</div>
            <div className="animated-bike">🏍️</div>
          </div>
          
          <h1 className="hero-title">
            <span className="gradient-text">Smart Parking</span>
            <br />
            <span className="subtitle">Management System</span>
          </h1>
          
          <p className="hero-description">
            Experience intelligent parking slot allocation with real-time monitoring,
            automated vehicle management, and advanced analytics.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-Time Tracking</h3>
              <p>Live occupancy monitoring with instant updates</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Allocation</h3>
              <p>Nearest slot assignment using intelligent algorithms</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Comprehensive insights and trend analysis</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Peak Hour Support</h3>
              <p>Handle high traffic with automated simulation</p>
            </div>
          </div>

          <div className="stats-preview">
            <div className="stat-item">
              <div className="stat-value">100</div>
              <div className="stat-label">Total Slots</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">60</div>
              <div className="stat-label">Car Slots</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">40</div>
              <div className="stat-label">Bike Slots</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">70%</div>
              <div className="stat-label">Time Saved</div>
            </div>
          </div>

          <button className="enter-button" onClick={onEnter}>
            <span>Enter Simulation</span>
            <span className="arrow">→</span>
          </button>

          <div className="tech-stack">
            <span>Built with React • Vite • Recharts</span>
          </div>
        </div>
      </div>

      <div className="animated-background">
        <div className="grid-lines"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
