import { Search, X } from 'lucide-react'

export default function SearchBox({ placeholder, value, onChange, clearable = true }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-earthy-brown">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-2 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green bg-white"
      />
      {clearable && value && (
        <button
          onClick={() => onChange({ target: { value: '' } })}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-earthy-brown hover:text-earthy-dark"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
