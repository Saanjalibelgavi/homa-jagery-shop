import { AlertCircle } from 'lucide-react'

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helpText,
  icon: Icon,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-earthy-dark mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earthy-brown">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
            Icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-earthy-light focus:ring-earthy-green'
          }`}
          {...props}
        />
      </div>

      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {helpText && !error && (
        <p className="text-xs text-earthy-brown mt-1">{helpText}</p>
      )}
    </div>
  )
}
