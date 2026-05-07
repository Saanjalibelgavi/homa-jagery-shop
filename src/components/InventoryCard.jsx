import { AlertTriangle, Zap } from 'lucide-react'

export default function InventoryCard({ product, variant = 'normal' }) {
  const stockPercentage = (product.quantity / 500) * 100
  const isLowStock = product.stock === 'Low Stock'

  return (
    <div className={`card ${isLowStock ? 'border-2 border-yellow-300' : ''}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-earthy-dark truncate">{product.productName}</h4>
            <p className="text-xs text-earthy-brown">{product.price}</p>
          </div>
          {isLowStock && (
            <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          )}
        </div>

        {/* Stock Info */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-earthy-brown">Current Stock</p>
            <p className="text-lg font-bold text-earthy-dark">{product.quantity} kg</p>
          </div>
          <div>
            <p className="text-xs text-earthy-brown">Status</p>
            <p className={`text-lg font-bold ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
              {product.stock}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-earthy-brown">Stock Level</p>
            <p className="text-xs font-semibold text-earthy-dark">{Math.round(stockPercentage)}%</p>
          </div>
          <div className="w-full h-2 bg-earthy-light rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                stockPercentage > 50 ? 'bg-earthy-green' : stockPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(stockPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-earthy-brown pt-2 border-t border-earthy-light">
          Last updated: {new Date(product.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
