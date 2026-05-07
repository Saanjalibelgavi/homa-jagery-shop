import { AlertCircle, CheckCircle, AlertTriangle, InfoIcon, X } from 'lucide-react'

export default function Alert({ type = 'info', title, description, dismissible = true, onDismiss }) {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      titleColor: 'text-green-900',
      descColor: 'text-green-800',
      closeColor: 'text-green-600 hover:text-green-700'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      titleColor: 'text-red-900',
      descColor: 'text-red-800',
      closeColor: 'text-red-600 hover:text-red-700'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      titleColor: 'text-yellow-900',
      descColor: 'text-yellow-800',
      closeColor: 'text-yellow-600 hover:text-yellow-700'
    },
    info: {
      icon: InfoIcon,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      titleColor: 'text-blue-900',
      descColor: 'text-blue-800',
      closeColor: 'text-blue-600 hover:text-blue-700'
    }
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 flex gap-3`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.titleColor}`} />
      
      <div className="flex-1">
        {title && <p className={`font-semibold ${config.titleColor}`}>{title}</p>}
        {description && <p className={`text-sm ${config.descColor}`}>{description}</p>}
      </div>

      {dismissible && (
        <button
          onClick={onDismiss}
          className={`flex-shrink-0 ${config.closeColor} transition`}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
