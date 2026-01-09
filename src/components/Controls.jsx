import './Controls.css'

function Controls({
  onVehicleEnter,
  onVehicleExit,
  selectedVehicleType,
  onVehicleTypeChange,
  isPeakHour,
  onTogglePeakHour,
  autoMode,
  onToggleAutoMode,
  isFull,
}) {
  return (
    <div className="controls-panel">
      <h2>Control Panel</h2>

      <div className="control-section">
        <h3>Vehicle Type</h3>
        <div className="vehicle-type-selector">
          <button
            className={`type-btn ${selectedVehicleType === 'car' ? 'active' : ''}`}
            onClick={() => onVehicleTypeChange('car')}
          >
            🚗 Car
          </button>
          <button
            className={`type-btn ${selectedVehicleType === 'bike' ? 'active' : ''}`}
            onClick={() => onVehicleTypeChange('bike')}
          >
            🏍️ Bike
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>Vehicle Controls</h3>
        <div className="button-group">
          <button
            className="btn btn-enter"
            onClick={() => onVehicleEnter(selectedVehicleType)}
            disabled={isFull}
          >
            {selectedVehicleType === 'car' ? '🚗' : '🏍️'} {selectedVehicleType === 'car' ? 'Car' : 'Bike'} Enters
          </button>
          <button
            className="btn btn-exit"
            onClick={onVehicleExit}
          >
            🚪 Random Exit
          </button>
        </div>
        {isFull && (
          <div className="alert alert-full">
            ⚠️ Parking is FULL! No available slots.
          </div>
        )}
      </div>

      <div className="control-section">
        <h3>Simulation Mode</h3>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${autoMode ? 'active' : ''}`}
            onClick={() => onToggleAutoMode(!autoMode)}
          >
            {autoMode ? '⏸️ Auto Mode ON' : '▶️ Auto Mode OFF'}
          </button>
        </div>
        <p className="mode-description">
          {autoMode
            ? isPeakHour
              ? '🚀 Fast simulation: High traffic with mixed vehicles'
              : '🚀 Fast simulation: Normal traffic flow'
            : '⏸️ Manual mode - select vehicle type and control entry'}
        </p>
      </div>

      <div className="control-section">
        <h3>Time Simulation</h3>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${isPeakHour ? 'active' : ''}`}
            onClick={() => onTogglePeakHour(!isPeakHour)}
          >
            {isPeakHour ? '⚡ Peak Hour' : '☀️ Normal Hours'}
          </button>
        </div>
        <p className="time-description">
          {isPeakHour
            ? '⚡ Peak hours: Ultra-fast arrival rates (400ms intervals)'
            : '☀️ Normal hours: Fast traffic flow (800ms intervals)'}
        </p>
      </div>

      <div className="control-section legend-section">
        <h3>Quick Tips</h3>
        <ul className="tips-list">
          <li>Select vehicle type (Car/Bike) before manual entry</li>
          <li>Cars occupy 1 slot each, bikes share slots (2 per slot)</li>
          <li>Click individual vehicles or use "Random Exit"</li>
          <li>Enable "Auto Mode" for high-speed simulation</li>
          <li>Toggle peak hours for ultra-fast traffic</li>
        </ul>
      </div>
    </div>
  )
}

export default Controls
