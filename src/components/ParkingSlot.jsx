import React from 'react'
import { CarIcon, BikeIcon, PlusIcon, CloseIcon } from './icons'

function ParkingSlot({ slot, onVehicleExit }) {
  const { id, isOccupied, vehicleId, vehicleIds, occupancyCount, parkedDuration, isHighlighted, section } = slot

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getSlotClasses = () => {
    let baseClasses = 'relative rounded-xl p-4 transition-all duration-300 border backdrop-blur-sm h-24 '
    
    if (isHighlighted) {
      return baseClasses + 'bg-primary-500/30 border-primary-400 glow-primary animate-pulse scale-105 z-10'
    }
    
    if (section === 'car') {
      if (isOccupied) {
        return baseClasses + 'bg-blue-500/10 border-blue-400/50 hover:border-blue-400 glow-blue'
      }
      return baseClasses + 'bg-emerald-500/10 border-emerald-400/30 hover:border-emerald-400'
    } else {
      if (occupancyCount === 0) {
        return baseClasses + 'bg-emerald-500/10 border-emerald-400/30 hover:border-emerald-400'
      }
      if (occupancyCount === 1) {
        return baseClasses + 'bg-amber-500/10 border-amber-400/50 hover:border-amber-400 glow-amber'
      }
      return baseClasses + 'bg-purple-500/10 border-purple-400/50 hover:border-purple-400 glow-purple'
    }
  }

  const renderCarSlot = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-white/50">#{id + 1}</span>
        {isOccupied && <CarIcon className="w-6 h-6 text-blue-400" />}
      </div>
      {isOccupied ? (
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-blue-300">Car-{vehicleId}</div>
            <div className="text-xs font-mono text-white/60">{formatDuration(parkedDuration)}</div>
          </div>
          <button
            onClick={() => onVehicleExit(id)}
            className="mt-2 w-full py-1.5 px-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-400/30 hover:border-red-400/50 transition-all"
          >
            Exit
          </button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-2xl text-emerald-400/30">+</span>
        </div>
      )}
    </div>
  )

  const renderBikeSlot = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-white/50">#{id + 1}</span>
        <div className="flex items-center gap-1">
          <BikeIcon className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-white/70">{occupancyCount}/2</span>
        </div>
      </div>
      {occupancyCount > 0 ? (
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            {vehicleIds.map((vId) => (
              <div key={vId} className="flex items-center justify-between bg-black/20 rounded px-2 py-1">
                <span className="text-xs font-semibold text-purple-300">Bike-{vId}</span>
                <button
                  onClick={() => onVehicleExit(id, vId)}
                  className="w-5 h-5 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs border border-red-400/30 hover:border-red-400/50 transition-all flex items-center justify-center"
                >
                  <CloseIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-xs font-mono text-white/60 mt-2">{formatDuration(parkedDuration)}</div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-2xl text-emerald-400/30">+</span>
        </div>
      )}
    </div>
  )

  return (
    <div className={getSlotClasses()}>
      {section === 'car' ? renderCarSlot() : renderBikeSlot()}
    </div>
  )
}

export default ParkingSlot
