import { Star, ArrowRight } from 'lucide-react'

export default function TopShops({ shops }) {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-subheading">Top Performing Shops</h3>
        <button className="text-earthy-green hover:text-earthy-dark font-semibold flex items-center gap-1 transition">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {shops.map((shop, index) => (
          <div
            key={shop.id}
            className="flex items-center justify-between p-4 bg-earthy-cream rounded-lg hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-earthy-green to-earthy-sage rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-earthy-dark">{shop.name}</h4>
                <p className="text-xs text-earthy-brown">
                  {shop.orders} orders • ₹{shop.sales.replace('₹', '')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-800">{shop.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
