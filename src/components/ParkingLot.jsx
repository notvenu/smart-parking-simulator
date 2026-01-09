import ParkingSlot from './ParkingSlot'
import './ParkingLot.css'

function ParkingLot({ slots, carRows, carCols, bikeRows, bikeCols, onVehicleExit }) {
  const carSlots = slots.filter(slot => slot.section === 'car')
  const bikeSlots = slots.filter(slot => slot.section === 'bike')

  return (
    <div className="parking-lot">
      <div className="lot-header">
        <h2>Smart Parking Facility</h2>
        <p className="lot-summary">60 Car Slots • 40 Bike Capacity • 100 Total Spaces</p>
      </div>

      {/* Car Section */}
      <div className="section-container">
        <div className="section-header">
          <h3>🚗 Car Section</h3>
          <span className="section-info">{carRows} × {carCols} = {carRows * carCols} slots</span>
        </div>
        
        <div className="entry-gate-top">
          <div className="gate-icon">� ENTRY</div>
        </div>

        <div className="parking-grid car-section" style={{
          gridTemplateColumns: `repeat(${carCols}, 1fr)`,
          gridTemplateRows: `repeat(${carRows}, 1fr)`,
        }}>
          {carSlots.map((slot) => (
            <ParkingSlot
              key={slot.id}
              slot={slot}
              onExit={() => onVehicleExit(slot.id)}
            />
          ))}
        </div>

        <div className="exit-gate-bottom">
          <div className="gate-icon">� EXIT</div>
        </div>
      </div>

      {/* Bike Section */}
      <div className="section-container">
        <div className="section-header">
          <h3>🏍️ Bike Section</h3>
          <span className="section-info">{bikeRows} × {bikeCols} = 40 bike capacity</span>
        </div>
        
        <div className="entry-gate-top bike-gate">
          <div className="gate-icon">🏍️ ENTRY</div>
        </div>

        <div className="parking-grid bike-section" style={{
          gridTemplateColumns: `repeat(${bikeCols}, 1fr)`,
          gridTemplateRows: `repeat(${bikeRows}, 1fr)`,
        }}>
          {bikeSlots.map((slot) => (
            <ParkingSlot
              key={slot.id}
              slot={slot}
              onExit={(vehicleId) => onVehicleExit(slot.id, vehicleId)}
            />
          ))}
        </div>

        <div className="exit-gate-bottom bike-gate">
          <div className="gate-icon">🏍️ EXIT</div>
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color free"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color occupied"></div>
          <span>Occupied</span>
        </div>
        <div className="legend-item">
          <div className="legend-color highlighted"></div>
          <span>Nearest Slot</span>
        </div>
        <div className="legend-item">
          <div className="legend-color partial"></div>
          <span>Partial (1 Bike)</span>
        </div>
      </div>
    </div>
  )
}

export default ParkingLot
