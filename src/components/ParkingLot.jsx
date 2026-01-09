import React from 'react'
import ParkingSlot from './ParkingSlot'

function ParkingLot({ slots, gridRows, gridCols, onVehicleExit }) {
  const carSlots = slots.filter(slot => slot.section === 'car')
  const bikeSlots = slots.filter(slot => slot.section === 'bike')
  const totalOccupiedCars = carSlots.filter(s => s.isOccupied).length
  const totalOccupiedBikes = bikeSlots.reduce((sum, s) => sum + s.occupancyCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gradient mb-2">Unified Parking Lot</h2>
            <p className="text-sm text-white/60">Real-time slot monitoring with AI tracking</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 glass-dark rounded-xl text-center">
              <div className="text-sm text-white/60">Cars</div>
              <div className="text-2xl font-bold text-blue-400">{totalOccupiedCars}<span className="text-sm text-white/40">/60</span></div>
            </div>
            <div className="px-4 py-2 glass-dark rounded-xl text-center">
              <div className="text-sm text-white/60">Bikes</div>
              <div className="text-2xl font-bold text-purple-400">{totalOccupiedBikes}<span className="text-sm text-white/40">/40</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Entry Gate */}
      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
        <div className="px-6 py-2 glass-dark rounded-full text-sm font-semibold text-primary-400 border border-primary-400/30 glow-primary animate-pulse-slow">
          ⬇️ ENTRY GATE ⬇️
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
      </div>

      {/* Unified Grid - Larger slots */}
      <div className="glass rounded-2xl p-8">
        <div className="grid gap-4" style={{
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
        }}>
          {slots.map(slot => (
            <ParkingSlot
              key={slot.id}
              slot={slot}
              onVehicleExit={onVehicleExit}
            />
          ))}
        </div>
      </div>

      {/* Exit Gate */}
      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
        <div className="px-6 py-2 glass-dark rounded-full text-sm font-semibold text-green-400 border border-green-400/30 glow-green animate-pulse-slow">
          ⬆️ EXIT GATE ⬆️
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
      </div>

      {/* Legend */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-400/50"></div>
            <span className="text-white/70">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-400/50"></div>
            <span className="text-white/70">Car Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-400/50"></div>
            <span className="text-white/70">Bike Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500/20 border border-amber-400/50"></div>
            <span className="text-white/70">Partial (1 Bike)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingLot
