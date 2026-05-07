import { Bell, User, Menu, X, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ onMenuToggle }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <nav className="bg-white border-b border-earthy-light shadow-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Menu Toggle + Business Name */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-earthy-cream rounded-lg transition"
            >
              <Menu className="w-5 h-5 text-earthy-dark" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-earthy-green hidden sm:block">
              HOMA-NATURALS
            </h1>
          </div>

          {/* Center: Date (hidden on mobile) */}
          <div className="hidden md:block text-center">
            <p className="text-sm text-earthy-brown font-medium">{today}</p>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-earthy-cream rounded-lg transition group">
              <Bell className="w-5 h-5 text-earthy-dark group-hover:text-earthy-green transition" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-earthy-cream rounded-lg transition"
              >
                <div className="hidden sm:flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-earthy-dark">Admin</p>
                    <p className="text-xs text-earthy-brown">Manager</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-earthy-green to-earthy-sage rounded-full flex items-center justify-center hover:shadow-md transition">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-earthy-light rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-earthy-light">
                    <p className="text-sm font-semibold text-earthy-dark">Admin User</p>
                    <p className="text-xs text-earthy-brown">Business Manager</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 hover:bg-earthy-cream text-sm text-earthy-dark transition flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-earthy-cream text-sm text-earthy-dark transition flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Preferences
                  </button>
                  <hr className="my-2 border-earthy-light" />
                  <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 transition flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
