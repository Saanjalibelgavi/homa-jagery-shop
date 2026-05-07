import { useState, useMemo } from 'react'
import { inventory } from '../data/dummy'
import { Plus, AlertTriangle, TrendingDown, Package } from 'lucide-react'
import SearchBox from '../components/SearchBox'
import InventoryCard from '../components/InventoryCard'
import Button from '../components/Button'

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or table

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const lowStockItems = inventory.filter((item) => item.stock === 'Low Stock')
  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = inventory.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/,/g, '').replace('₹', '').split('/')[0])
    return sum + price * item.quantity
  }, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-heading mb-2">Inventory Management</h1>
          <p className="text-earthy-brown">Manage product stock and inventory</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <p className="text-sm text-earthy-brown mb-2">Total Stock</p>
          <p className="text-3xl font-bold text-earthy-dark mb-2">{totalStock} kg</p>
          <p className="text-xs text-earthy-brown">Across all products</p>
        </div>
        <div className="card">
          <p className="text-sm text-earthy-brown mb-2">Stock Value</p>
          <p className="text-3xl font-bold text-earthy-green mb-2">₹{(totalValue / 100000).toFixed(1)}L</p>
          <p className="text-xs text-earthy-brown">Current inventory value</p>
        </div>
        <div className="card">
          <p className="text-sm text-earthy-brown mb-2">Products</p>
          <p className="text-3xl font-bold text-earthy-dark mb-2">{inventory.length}</p>
          <p className="text-xs text-earthy-brown">Active products</p>
        </div>
        <div className="card">
          <p className="text-sm text-earthy-brown mb-2">Low Stock Alert</p>
          <p className="text-3xl font-bold text-red-600 mb-2">{lowStockItems.length}</p>
          <p className="text-xs text-earthy-brown">Need restock soon</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="card bg-yellow-50 border border-yellow-300">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-2">Low Stock Alert</h3>
              <p className="text-sm text-yellow-800 mb-3">
                {lowStockItems.length} product(s) have low inventory levels. Please restock soon.
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockItems.map((item) => (
                  <span
                    key={item.id}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full"
                  >
                    {item.productName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <SearchBox
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 border border-earthy-light rounded-lg p-1 bg-white">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-1 rounded transition ${
              viewMode === 'grid'
                ? 'bg-earthy-green text-white'
                : 'text-earthy-brown hover:bg-earthy-cream'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-1 rounded transition ${
              viewMode === 'table'
                ? 'bg-earthy-green text-white'
                : 'text-earthy-brown hover:bg-earthy-cream'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredInventory.map((item) => (
            <InventoryCard key={item.id} product={item} />
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-earthy-light bg-earthy-cream">
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Product Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Current Stock</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Unit</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Price</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Stock Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Last Updated</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b border-earthy-light hover:bg-earthy-cream transition">
                  <td className="py-4 px-6 font-medium text-earthy-dark">{item.productName}</td>
                  <td className="py-4 px-6 text-earthy-dark font-semibold">{item.quantity}</td>
                  <td className="py-4 px-6 text-earthy-brown">{item.unit}</td>
                  <td className="py-4 px-6 text-earthy-dark font-semibold">{item.price}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.stock === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-earthy-brown">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-earthy-green hover:text-earthy-dark transition font-medium text-sm">
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredInventory.length === 0 && (
        <div className="card text-center py-12">
          <Package className="w-12 h-12 text-earthy-light mx-auto mb-4" />
          <p className="text-earthy-brown">No products found</p>
        </div>
      )}
    </div>
  )
}
