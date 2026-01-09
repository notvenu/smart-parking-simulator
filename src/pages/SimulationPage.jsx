import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ParkingLot from '../components/ParkingLot'
import Controls from '../components/Controls'
import Dashboard from '../components/Dashboard'
import Statistics from '../components/Statistics'
import Popup from '../components/Popup'
import { ArrowLeftIcon } from '../components/icons'

function SimulationPage() {
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '', type: 'info' })
  
  const GRID_ROWS = 10
  const GRID_COLS = 10
  const TOTAL_SLOTS = 100
  const CAR_SLOTS_COUNT = 60
  const BIKE_SLOTS_COUNT = 40

  const [slots, setSlots] = useState(() => {
    return Array(TOTAL_SLOTS).fill(null).map((_, idx) => {
      const isBikeSlot = idx >= CAR_SLOTS_COUNT
      return {
        id: idx,
        row: Math.floor(idx / GRID_COLS),
        col: idx % GRID_COLS,
        isOccupied: false,
        parkedDuration: 0,
        vehicleId: null,
        vehicleIds: [],
        occupancyCount: 0,
        isHighlighted: false,
        type: isBikeSlot ? 'bike' : 'car',
        section: isBikeSlot ? 'bike' : 'car'
      }
    })
  })

  const [statistics, setStatistics] = useState([])
  const [isPeakHour, setIsPeakHour] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [nextVehicleId, setNextVehicleId] = useState(1)
  const [selectedVehicleType, setSelectedVehicleType] = useState('car')

  const showPopup = useCallback((title, message, type = 'info') => {
    setPopup({ isOpen: true, title, message, type })
  }, [])

  const stats = useMemo(() => {
    const carSlots = slots.filter(s => s.section === 'car')
    const bikeSlots = slots.filter(s => s.section === 'bike')
    
    const occupiedCarSlots = carSlots.filter(s => s.isOccupied).length
    const occupiedBikeCapacity = bikeSlots.reduce((sum, s) => sum + s.occupancyCount, 0)
    const totalOccupied = occupiedCarSlots + occupiedBikeCapacity
    
    const availableCarSlots = CAR_SLOTS_COUNT - occupiedCarSlots
    const availableBikeCapacity = BIKE_SLOTS_COUNT - occupiedBikeCapacity
    const totalAvailable = availableCarSlots + availableBikeCapacity
    
    const totalCapacity = CAR_SLOTS_COUNT + BIKE_SLOTS_COUNT
    const occupancyPercent = Math.round((totalOccupied / totalCapacity) * 100)
    
    return {
      totalSlots: totalCapacity,
      occupiedSlots: totalOccupied,
      availableSlots: totalAvailable,
      occupancyPercent,
      isFull: totalAvailable === 0,
      carStats: {
        total: CAR_SLOTS_COUNT,
        occupied: occupiedCarSlots,
        available: availableCarSlots
      },
      bikeStats: {
        total: BIKE_SLOTS_COUNT,
        occupied: occupiedBikeCapacity,
        available: availableBikeCapacity
      }
    }
  }, [slots, CAR_SLOTS_COUNT, BIKE_SLOTS_COUNT])

  const findNearestAvailableSlot = useCallback((vehicleType = 'car') => {
    let availableSlots
    
    if (vehicleType === 'car') {
      availableSlots = slots.filter(s => s.section === 'car' && !s.isOccupied)
    } else {
      availableSlots = slots.filter(s => s.section === 'bike' && s.occupancyCount < 2)
    }
    
    if (availableSlots.length === 0) return null

    const entryRow = 0
    const entryCol = GRID_COLS / 2

    let nearestSlot = availableSlots[0]
    let minDistance = Math.abs(nearestSlot.row - entryRow) + Math.abs(nearestSlot.col - entryCol)

    availableSlots.forEach(slot => {
      const distance = Math.abs(slot.row - entryRow) + Math.abs(slot.col - entryCol)
      if (distance < minDistance) {
        minDistance = distance
        nearestSlot = slot
      }
    })

    return nearestSlot
  }, [slots, GRID_COLS])

  const handleVehicleEnter = useCallback((vehicleType = selectedVehicleType) => {
    const nearestSlot = findNearestAvailableSlot(vehicleType)
    
    if (!nearestSlot) {
      showPopup(
        'Parking Full!',
        `No available ${vehicleType} slots. Please wait for a vehicle to exit.`,
        'error'
      )
      return
    }

    setSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.id === nearestSlot.id ? { ...slot, isHighlighted: true } : slot
      )
    )

    setTimeout(() => {
      setSlots(prevSlots =>
        prevSlots.map(slot => {
          if (slot.id === nearestSlot.id) {
            if (vehicleType === 'car') {
              return {
                ...slot,
                isOccupied: true,
                vehicleId: nextVehicleId,
                parkedDuration: 0,
                isHighlighted: false,
              }
            } else {
              return {
                ...slot,
                vehicleIds: [...slot.vehicleIds, nextVehicleId],
                occupancyCount: slot.occupancyCount + 1,
                parkedDuration: 0,
                isHighlighted: false,
              }
            }
          }
          return slot
        })
      )
      setNextVehicleId(prev => prev + 1)
    }, 200)
  }, [findNearestAvailableSlot, nextVehicleId, selectedVehicleType, showPopup])

  const handleVehicleExit = useCallback((slotId, vehicleId = null) => {
    setSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.id === slotId) {
          if (slot.section === 'car') {
            return {
              ...slot,
              isOccupied: false,
              vehicleId: null,
              parkedDuration: 0,
              isHighlighted: false,
            }
          } else {
            if (vehicleId) {
              const updatedVehicleIds = slot.vehicleIds.filter(id => id !== vehicleId)
              return {
                ...slot,
                vehicleIds: updatedVehicleIds,
                occupancyCount: updatedVehicleIds.length,
                parkedDuration: updatedVehicleIds.length > 0 ? slot.parkedDuration : 0,
                isHighlighted: false,
              }
            } else {
              const exitedBikeId = slot.vehicleIds[slot.vehicleIds.length - 1]
              const updatedVehicleIds = slot.vehicleIds.slice(0, -1)
              return {
                ...slot,
                vehicleIds: updatedVehicleIds,
                occupancyCount: updatedVehicleIds.length,
                parkedDuration: updatedVehicleIds.length > 0 ? slot.parkedDuration : 0,
                isHighlighted: false,
              }
            }
          }
        }
        return slot
      })
    )
  }, [])

  const handleVehicleExitRandom = useCallback(() => {
    const occupiedCarSlots = slots.filter(s => s.section === 'car' && s.isOccupied)
    const occupiedBikeSlots = slots.filter(s => s.section === 'bike' && s.occupancyCount > 0)
    const allOccupiedSlots = [...occupiedCarSlots, ...occupiedBikeSlots]
    
    if (allOccupiedSlots.length === 0) {
      showPopup('No Vehicles', 'No vehicles are currently parked', 'warning')
      return
    }

    const randomSlot = allOccupiedSlots[Math.floor(Math.random() * allOccupiedSlots.length)]
    handleVehicleExit(randomSlot.id)
  }, [slots, handleVehicleExit, showPopup])

  useEffect(() => {
    const interval = setInterval(() => {
      setSlots(prevSlots =>
        prevSlots.map(slot => {
          if (slot.section === 'car' && slot.isOccupied) {
            return { ...slot, parkedDuration: slot.parkedDuration + 1 }
          } else if (slot.section === 'bike' && slot.occupancyCount > 0) {
            return { ...slot, parkedDuration: slot.parkedDuration + 1 }
          }
          return slot
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStatistics(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        occupancy: stats.occupancyPercent,
      }].slice(-30))
    }, 5000)

    return () => clearInterval(interval)
  }, [stats.occupancyPercent])

  useEffect(() => {
    if (!autoMode) return

    const interval = setInterval(() => {
      const random = Math.random()
      const threshold = isPeakHour ? 0.8 : 0.6
      const vehicleType = Math.random() > 0.6 ? 'bike' : 'car'

      if (random < threshold) {
        handleVehicleEnter(vehicleType)
      } else if (random > 0.8) {
        handleVehicleExitRandom()
      }
    }, isPeakHour ? 400 : 800)

    return () => clearInterval(interval)
  }, [autoMode, isPeakHour, handleVehicleEnter, handleVehicleExitRandom])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-[2000px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/10 transition-all group"
            >
              <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gradient">Smart Parking System</h1>
              <p className="text-sm text-white/60 mt-1">AI-Powered Intelligent Parking Management</p>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="px-3 py-1.5 glass rounded-lg">
                <span className="text-white/60">Total: </span>
                <span className="font-bold text-white">{stats.totalSlots}</span>
              </div>
              <div className="px-3 py-1.5 glass rounded-lg">
                <span className="text-white/60">Available: </span>
                <span className="font-bold text-green-400">{stats.availableSlots}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Controls on Left, Parking Lot Center, Stats on Right */}
      <main className="max-w-[2000px] mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="col-span-3 space-y-6">
            <Controls
              onVehicleEnter={handleVehicleEnter}
              onVehicleExit={handleVehicleExitRandom}
              selectedVehicleType={selectedVehicleType}
              onVehicleTypeChange={setSelectedVehicleType}
              isPeakHour={isPeakHour}
              onTogglePeakHour={setIsPeakHour}
              autoMode={autoMode}
              onToggleAutoMode={setAutoMode}
              isFull={stats.isFull}
            />
            <Dashboard stats={stats} />
          </div>

          {/* Center - Parking Lot */}
          <div className="col-span-6">
            <ParkingLot 
              slots={slots}
              gridRows={GRID_ROWS}
              gridCols={GRID_COLS}
              onVehicleExit={handleVehicleExit}
            />
          </div>

          {/* Right Sidebar - Statistics */}
          <div className="col-span-3">
            <Statistics
              stats={stats}
              statisticsData={statistics}
            />
          </div>
        </div>
      </main>

      <Popup
        isOpen={popup.isOpen}
        onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))}
        title={popup.title}
        message={popup.message}
        type={popup.type}
      />
    </div>
  )
}

export default SimulationPage