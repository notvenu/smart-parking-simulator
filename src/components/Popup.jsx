import { useEffect } from 'react'

function Popup({ isOpen, onClose, title, message, type = 'info', autoClose = true }) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, autoClose])

  if (!isOpen) return null

  const typeStyles = {
    success: 'border-green-500/50 bg-green-500/10',
    error: 'border-red-500/50 bg-red-500/10',
    warning: 'border-yellow-500/50 bg-yellow-500/10',
    info: 'border-blue-500/50 bg-blue-500/10',
  }

  const iconStyles = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-slide-down">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative glass border-2 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slide-up ${typeStyles[type]}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex items-start gap-4">
          <div className="text-4xl">{iconStyles[type]}</div>
          <div className="flex-1">
            {title && <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>}
            <p className="text-white/80">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
