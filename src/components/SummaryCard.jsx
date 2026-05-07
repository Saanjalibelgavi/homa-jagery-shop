export default function SummaryCard({ label, value, subtext, icon: Icon, color = 'green' }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800'
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-earthy-brown mb-2">{label}</p>
          <h3 className="text-3xl font-bold text-earthy-dark mb-2">{value}</h3>
          {subtext && <p className="text-xs text-earthy-brown">{subtext}</p>}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}
