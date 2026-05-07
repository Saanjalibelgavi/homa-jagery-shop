import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FilterDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-earthy-light rounded-lg hover:bg-earthy-cream transition bg-white text-sm font-medium text-earthy-dark"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-earthy-light rounded-lg shadow-lg py-2 z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition ${
                value === option.value
                  ? 'bg-earthy-green text-white'
                  : 'text-earthy-dark hover:bg-earthy-cream'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
