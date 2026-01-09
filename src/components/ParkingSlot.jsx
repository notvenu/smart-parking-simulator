import './ParkingSlot.css'

function ParkingSlot({ slot, onExit }) {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getSlotClass = () => {
    let classes = 'parking-slot'
    
    if (slot.section === 'car') {
      classes += slot.isOccupied ? ' occupied' : ' free'
    } else {
      if (slot.occupancyCount === 0) classes += ' free'
      else if (slot.occupancyCount === 1) classes += ' partial'
      else classes += ' occupied'
    }
    
    if (slot.isHighlighted) classes += ' highlighted'
    return classes
  }

  const renderCarSlot = () => (
    <div className="slot-content">
      {slot.isOccupied ? (
        <>
          <div className="vehicle-icon">🚗</div>
          <div className="vehicle-id">{slot.vehicleId}</div>
          <div className="duration">{formatDuration(slot.parkedDuration)}</div>
          <button 
            className="exit-btn" 
            onClick={(e) => {
              e.stopPropagation()
              onExit()
            }}
            title="Click to exit vehicle"
          >
            EXIT
          </button>
        </>
      ) : (
        <>
          <div className="available-icon">🚗</div>
          <div className="available-text">CAR</div>
        </>
      )}
    </div>
  )

  const renderBikeSlot = () => (
    <div className="slot-content bike-content">
      {slot.occupancyCount === 0 ? (
        <>
          <div className="available-icon">🏍️</div>
          <div className="available-text">2 BIKES</div>
        </>
      ) : (
        <>
          <div className="bike-display">
            {slot.vehicleIds.map((vehicleId, index) => (
              <div key={vehicleId} className="bike-item">
                <div className="vehicle-icon">🏍️</div>
                <div className="vehicle-id">{vehicleId}</div>
                <button 
                  className="exit-btn bike-exit" 
                  onClick={(e) => {
                    e.stopPropagation()
                    onExit(vehicleId)
                  }}
                  title={`Exit bike ${vehicleId}`}
                >
                  ×
                </button>
              </div>
            ))}
            {slot.occupancyCount === 1 && (
              <div className="empty-bike-slot">
                <div className="available-icon small">🏍️</div>
                <div className="available-text small">+1</div>
              </div>
            )}
          </div>
          <div className="duration">{formatDuration(slot.parkedDuration)}</div>
          <div className="occupancy-info">{slot.occupancyCount}/2 bikes</div>
        </>
      )}
    </div>
  )

  return (
    <div
      className={getSlotClass()}
      onClick={slot.section === 'car' && slot.isOccupied ? onExit : undefined}
    >
      {slot.section === 'car' ? renderCarSlot() : renderBikeSlot()}
    </div>
  )
}

export default ParkingSlot
