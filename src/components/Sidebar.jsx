import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Package,
  BarChart3,
  Settings,
  X,
  Leaf
} from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Store, label: 'Shops', path: '/shops' },
    { icon: CreditCard, label: 'Transactions', path: '/transactions' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-earthy-dark text-white transition-transform duration-300 transform lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-earthy-brown flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-earthy-green" />
            <div>
              <h2 className="text-lg font-bold text-white">HOMA</h2>
              <p className="text-xs text-earthy-light">NATURALS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-earthy-brown rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
                  active
                    ? 'bg-earthy-green text-white shadow-lg'
                    : 'text-earthy-light hover:bg-earthy-brown hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="bg-earthy-brown rounded-lg p-4">
            <p className="text-xs text-earthy-light mb-2">Business Version</p>
            <p className="text-sm font-semibold text-white">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
