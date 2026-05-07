import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Store
} from 'lucide-react'

const iconMap = {
  TrendingUp: TrendingUp,
  TrendingDown: TrendingDown,
  DollarSign: DollarSign,
  Clock: Clock,
  Store: Store
}

export default function StatCard({ title, value, percentage, trend, icon }) {
  const Icon = iconMap[icon]

  return (
    <div className="card group">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-earthy-brown mb-2">{title}</p>
          <p className="text-3xl font-bold text-earthy-dark mb-4">{value}</p>
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 text-sm font-semibold ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {percentage}
            </span>
          </div>
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-earthy-green to-earthy-sage rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {Icon && <Icon className="w-7 h-7 text-white" />}
        </div>
      </div>
    </div>
  )
}
