import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-earthy-light sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-earthy-dark">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-earthy-cream rounded transition text-earthy-brown hover:text-earthy-dark"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex gap-3 p-6 border-t border-earthy-light bg-earthy-cream">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
