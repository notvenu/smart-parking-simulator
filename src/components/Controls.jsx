import React from 'react'
import { CarIcon, BikeIcon, PlusIcon, ExitIcon, PlayIcon, PauseIcon, BoltIcon, SunIcon } from './icons'

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
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gradient mb-2">Control Center</h2>
        <p className="text-sm text-white/60">Manage parking operations</p>
      </div>

      {/* Vehicle Type Selector */}
      <div>
        <h3 className="text-sm font-semibold text-white/80 mb-3">Select Vehicle Type</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onVehicleTypeChange('car')}
            className={`px-4 py-3 rounded-xl font-semibold text-sm border transition-all ${
              selectedVehicleType === 'car'
                ? 'bg-blue-500/20 border-blue-400 text-blue-300 glow-blue'
                : 'glass-dark border-white/10 text-white/70 hover:border-blue-400/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <CarIcon className="w-8 h-8" />
              <span>Car</span>
            </div>
          </button>
          <button
            onClick={() => onVehicleTypeChange('bike')}
            className={`px-4 py-3 rounded-xl font-semibold text-sm border transition-all ${
              selectedVehicleType === 'bike'
                ? 'bg-purple-500/20 border-purple-400 text-purple-300 glow-purple'
                : 'glass-dark border-white/10 text-white/70 hover:border-purple-400/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <BikeIcon className="w-8 h-8" />
              <span>Bike</span>
            </div>
          </button>
        </div>
      </div>

      {/* Vehicle Controls */}
      <div>
        <h3 className="text-sm font-semibold text-white/80 mb-3">Manual Controls</h3>
        <div className="space-y-2">
          <button
            onClick={() => onVehicleEnter(selectedVehicleType)}
            disabled={isFull}
            className={`w-full px-4 py-3 rounded-xl font-semibold transition-all ${
              isFull
                ? 'bg-gray-500/10 border border-gray-500/30 text-gray-500 cursor-not-allowed'
                : 'bg-green-500/20 border border-green-400/50 text-green-300 hover:bg-green-500/30 hover:border-green-400 glow-green'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {selectedVehicleType === 'car' ? <CarIcon className="w-5 h-5" /> : <BikeIcon className="w-5 h-5" />}
              <span>Enter {selectedVehicleType === 'car' ? 'Car' : 'Bike'}</span>
            </div>
          </button>
          <button
            onClick={onVehicleExit}
            className="w-full px-4 py-3 rounded-xl font-semibold bg-red-500/20 border border-red-400/50 text-red-300 hover:bg-red-500/30 hover:border-red-400 transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <ExitIcon className="w-5 h-5" />
              <span>Random Exit</span>
            </div>
          </button>
        </div>
        {isFull && (
          <div className="mt-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span>Parking lot is full!</span>
            </div>
          </div>
        )}
      </div>

      {/* Simulation Mode */}
      <div>
        <h3 className="text-sm font-semibold text-white/80 mb-3">Automation</h3>
        <button
          onClick={() => onToggleAutoMode(!autoMode)}
          className={`w-full px-4 py-3 rounded-xl font-semibold border transition-all ${
            autoMode
              ? 'bg-primary-500/20 border-primary-400 text-primary-300 glow-primary'
              : 'glass-dark border-white/10 text-white/70 hover:border-primary-400/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {autoMode ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            <span>Auto Mode {autoMode ? 'ON' : 'OFF'}</span>
          </div>
        </button>
        <p className="mt-2 text-xs text-white/50 text-center">
          {autoMode
            ? '🚀 Vehicles entering/exiting automatically'
            : '⏸️ Manual control enabled'}
        </p>
      </div>

      {/* Peak Hour Toggle */}
      <div>
        <h3 className="text-sm font-semibold text-white/80 mb-3">Traffic Mode</h3>
        <button
          onClick={() => onTogglePeakHour(!isPeakHour)}
          className={`w-full px-4 py-3 rounded-xl font-semibold border transition-all ${
            isPeakHour
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 glow-amber'
              : 'glass-dark border-white/10 text-white/70 hover:border-amber-400/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {isPeakHour ? <BoltIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            <span>{isPeakHour ? 'Peak Hours' : 'Normal Hours'}</span>
          </div>
        </button>
        <p className="mt-2 text-xs text-white/50 text-center">
          {isPeakHour
            ? '⚡ High traffic - 400ms intervals'
            : '☀️ Normal traffic - 800ms intervals'}
        </p>
      </div>

      {/* Quick Tips */}
      <div className="glass-dark rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white/80 mb-2">💡 Quick Tips</h3>
        <ul className="space-y-1.5 text-xs text-white/60">
          <li>• Cars use 1 slot, bikes share (2/slot)</li>
          <li>• Nearest slot is auto-assigned</li>
          <li>• Auto mode simulates traffic</li>
          <li>• Peak hours increase arrival rate</li>
        </ul>
      </div>
    </div>
  )
}

export default Controls
