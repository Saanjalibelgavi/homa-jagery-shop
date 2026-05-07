export default function ProgressBar({ value = 50, max = 100, label, color = 'green', size = 'md' }) {
  const percentage = (value / max) * 100

  const colorClasses = {
    green: 'bg-earthy-green',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500'
  }

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  return (
    <div className={`w-full ${sizeClasses[size]} bg-earthy-light rounded-full overflow-hidden`}>
      <div
        className={`${colorClasses[color]} transition-all duration-500 ease-out flex items-center justify-end pr-2`}
        style={{ width: `${Math.min(percentage, 100)}%`, height: '100%' }}
      >
        {percentage > 10 && label && <span className="text-xs font-bold text-white">{Math.round(percentage)}%</span>}
      </div>
    </div>
  )
}
