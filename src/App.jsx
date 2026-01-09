import { useState, useEffect, useCallback, useMemo } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ParkingLot from './components/ParkingLot'
import Controls from './components/Controls'
import Dashboard from './components/Dashboard'
import Statistics from './components/Statistics'

function App() {
  // Landing page state
  const [showLanding, setShowLanding] = useState(true)
  
  // Parking configuration: 60 car slots + 20 bike visual slots (40 bike capacity)
  const CAR_ROWS = 6
  const CAR_COLS = 10
  const BIKE_ROWS = 4
  const BIKE_COLS = 5
  const TOTAL_CAR_SLOTS = CAR_ROWS * CAR_COLS // 60 car slots
  const TOTAL_BIKE_VISUAL_SLOTS = BIKE_ROWS * BIKE_COLS // 20 visual slots for bikes
  const TOTAL_BIKE_CAPACITY = TOTAL_BIKE_VISUAL_SLOTS * 2 // 40 bike capacity (2 per slot)
  const TOTAL_SLOTS = TOTAL_CAR_SLOTS + TOTAL_BIKE_VISUAL_SLOTS

  // State management
  const [slots, setSlots] = useState(() => {
    const carSlots = Array(TOTAL_CAR_SLOTS).fill(null).map((_, idx) => ({
      id: idx,
      row: Math.floor(idx / CAR_COLS),
      col: idx % CAR_COLS,
      isOccupied: false,
      parkedDuration: 0,
      vehicleId: null,
      isHighlighted: false,
      type: 'car',
      section: 'car'
    }))
    
    const bikeSlots = Array(TOTAL_BIKE_VISUAL_SLOTS).fill(null).map((_, idx) => ({
      id: TOTAL_CAR_SLOTS + idx,
      row: Math.floor(idx / BIKE_COLS),
      col: idx % BIKE_COLS,
      isOccupied: false,
      parkedDuration: 0,
      vehicleIds: [], // Array for bike IDs since 2 bikes per slot
      occupancyCount: 0, // 0, 1, or 2 bikes
      isHighlighted: false,
      type: 'bike',
      section: 'bike'
    }))
    
    return [...carSlots, ...bikeSlots]
  })

  const [statistics, setStatistics] = useState([])
  const [isPeakHour, setIsPeakHour] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [nextVehicleId, setNextVehicleId] = useState(1)
  const [selectedVehicleType, setSelectedVehicleType] = useState('car')

  // Calculate statistics
  const stats = useMemo(() => {
    const carSlots = slots.filter(s => s.section === 'car')
    const bikeSlots = slots.filter(s => s.section === 'bike')
    
    const occupiedCarSlots = carSlots.filter(s => s.isOccupied).length
    const occupiedBikeCapacity = bikeSlots.reduce((sum, s) => sum + s.occupancyCount, 0)
    const totalOccupied = occupiedCarSlots + occupiedBikeCapacity
    
    const availableCarSlots = TOTAL_CAR_SLOTS - occupiedCarSlots
    const availableBikeCapacity = TOTAL_BIKE_CAPACITY - occupiedBikeCapacity
    const totalAvailable = availableCarSlots + availableBikeCapacity
    
    const totalCapacity = TOTAL_CAR_SLOTS + TOTAL_BIKE_CAPACITY
    const occupancyPercent = Math.round((totalOccupied / totalCapacity) * 100)
    
    return {
      totalSlots: totalCapacity,
      occupiedSlots: totalOccupied,
      availableSlots: totalAvailable,
      occupancyPercent,
      isFull: totalAvailable === 0,
      carStats: {
        total: TOTAL_CAR_SLOTS,
        occupied: occupiedCarSlots,
        available: availableCarSlots
      },
      bikeStats: {
        total: TOTAL_BIKE_CAPACITY,
        occupied: occupiedBikeCapacity,
        available: availableBikeCapacity
      }
    }
  }, [slots, TOTAL_CAR_SLOTS, TOTAL_BIKE_CAPACITY])

  // Find nearest available slot
  const findNearestAvailableSlot = useCallback((vehicleType = 'car', entryPoint = 'top-center') => {
    let availableSlots
    let gridCols, entryRow, entryCol
    
    if (vehicleType === 'car') {
      availableSlots = slots.filter(s => s.section === 'car' && !s.isOccupied)
      gridCols = CAR_COLS
      entryRow = 0
      entryCol = CAR_COLS / 2
    } else {
      availableSlots = slots.filter(s => s.section === 'bike' && s.occupancyCount < 2)
      gridCols = BIKE_COLS
      entryRow = 0
      entryCol = BIKE_COLS / 2
    }
    
    if (availableSlots.length === 0) return null

    // Find nearest slot using Manhattan distance
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
  }, [slots, CAR_COLS, BIKE_COLS])

  // Vehicle enters
  const handleVehicleEnter = useCallback((vehicleType = selectedVehicleType) => {
    const nearestSlot = findNearestAvailableSlot(vehicleType)
    
    if (!nearestSlot) {
      alert(`${vehicleType === 'car' ? '🚗' : '🏍️'} Parking Full! No available ${vehicleType} slots.`)
      return
    }

    // Highlight the nearest slot briefly
    setSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.id === nearestSlot.id ? { ...slot, isHighlighted: true } : slot
      )
    )

    // After animation, occupy the slot
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
    }, 200) // Faster animation
  }, [findNearestAvailableSlot, nextVehicleId, selectedVehicleType])

  // Vehicle exits
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
            // Bike slot - remove one bike or specific bike
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
              // Remove one bike (last one)
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

  // Exit random vehicle
  const handleVehicleExitRandom = useCallback(() => {
    const occupiedCarSlots = slots.filter(s => s.section === 'car' && s.isOccupied)
    const occupiedBikeSlots = slots.filter(s => s.section === 'bike' && s.occupancyCount > 0)
    const allOccupiedSlots = [...occupiedCarSlots, ...occupiedBikeSlots]
    
    if (allOccupiedSlots.length === 0) {
      alert('No vehicles parked to exit!')
      return
    }

    const randomSlot = allOccupiedSlots[Math.floor(Math.random() * allOccupiedSlots.length)]
    handleVehicleExit(randomSlot.id)
  }, [slots, handleVehicleExit])

  // Update parking duration
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

  // Record statistics every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStatistics(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        occupancy: stats.occupancyPercent,
      }].slice(-30)) // Keep last 30 data points
    }, 5000)

    return () => clearInterval(interval)
  }, [stats.occupancyPercent])

  // Auto mode - simulate vehicles entering/exiting
  useEffect(() => {
    if (!autoMode) return

    const interval = setInterval(() => {
      const random = Math.random()
      const threshold = isPeakHour ? 0.8 : 0.6 // Higher arrival rate during peak hours
      const vehicleType = Math.random() > 0.6 ? 'bike' : 'car' // More bikes in simulation

      if (random < threshold) {
        handleVehicleEnter(vehicleType)
      } else if (random > 0.8) {
        handleVehicleExitRandom()
      }
    }, isPeakHour ? 400 : 800) // Much faster simulation

    return () => clearInterval(interval)
  }, [autoMode, isPeakHour, handleVehicleEnter, handleVehicleExitRandom])

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <button className="back-button" onClick={() => setShowLanding(true)}>← Back to Home</button>
        <h1>🚗 Smart Parking Management System</h1>
        <p>Real-time slot allocation • 60 Car Slots • 40 Bike Capacity</p>
      </header>

      <main className="app-main">
        <div className="main-content">
          <div className="left-panel">
            <ParkingLot 
              slots={slots} 
              carRows={CAR_ROWS}
              carCols={CAR_COLS}
              bikeRows={BIKE_ROWS}
              bikeCols={BIKE_COLS}
              onVehicleExit={handleVehicleExit}
            />
          </div>

          <div className="right-panel">
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

            <Statistics
              stats={stats}
              statisticsData={statistics}
            />

            <Dashboard
              stats={stats}
            />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Smart Parking System v2.0 | Multi-vehicle support with advanced analytics</p>
      </footer>
    </div>
  )
}

export default App
