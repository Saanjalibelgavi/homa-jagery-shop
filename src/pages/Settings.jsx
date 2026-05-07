import { useState } from 'react'
import { Settings as SettingsIcon, Bell, Lock, User, Save, Moon, Globe } from 'lucide-react'
import Button from '../components/Button'

export default function Settings() {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [notifications, setNotifications] = useState({
    email: true,
    payment: true,
    inventory: true,
    reports: true
  })

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-heading mb-2">Settings & Preferences</h1>
        <p className="text-earthy-brown">Manage your business and account settings</p>
      </div>

      {/* Business Information */}
      <div className="card">
        <h3 className="text-subheading mb-6 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-earthy-green" />
          Business Information
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">Business Name</label>
            <input
              type="text"
              defaultValue="HOMA-NATURALS"
              className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition"
            />
            <p className="text-xs text-earthy-brown mt-1">The name displayed throughout your account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-earthy-dark mb-2">Business Email</label>
              <input
                type="email"
                defaultValue="business@homajaggery.com"
                className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-earthy-dark mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="+91 9876543210"
                className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">Business Address</label>
            <textarea
              rows="3"
              defaultValue="Shop No. 42, Market Road, Bangalore - 560001"
              className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="card">
        <h3 className="text-subheading mb-6 flex items-center gap-2">
          <Moon className="w-5 h-5 text-earthy-green" />
          Appearance
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-3">Theme</label>
            <div className="flex gap-4">
              {[
                { id: 'light', label: 'Light Mode' },
                { id: 'dark', label: 'Dark Mode' },
                { id: 'auto', label: 'Auto (System)' }
              ].map(option => (
                <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={option.id}
                    checked={theme === option.id}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-4 h-4 text-earthy-green"
                  />
                  <span className="text-sm text-earthy-dark">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Language & Regional Settings */}
      <div className="card">
        <h3 className="text-subheading mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-earthy-green" />
          Regional Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">Currency</label>
            <select className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition">
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">Timezone</label>
            <select className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition">
              <option>IST (India Standard Time)</option>
              <option>UTC</option>
              <option>EST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h3 className="text-subheading mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-earthy-green" />
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
            { key: 'payment', label: 'Payment Alerts', desc: 'Get notified about new payments' },
            { key: 'inventory', label: 'Inventory Alerts', desc: 'Alert when stock is low' },
            { key: 'reports', label: 'Report Summaries', desc: 'Weekly business summaries' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-earthy-cream rounded-lg hover:bg-earthy-light transition">
              <div>
                <p className="font-medium text-earthy-dark">{item.label}</p>
                <p className="text-xs text-earthy-brown">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={() => handleNotificationChange(item.key)}
                className="w-5 h-5 rounded text-earthy-green cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* User Account Settings */}
      <div className="card">
        <h3 className="text-subheading mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-earthy-green" />
          User Account
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">User Role</label>
            <select className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition">
              <option>Manager</option>
              <option>Administrator</option>
              <option>Viewer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-earthy-dark mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="admin@example.com"
              className="w-full px-4 py-3 border border-earthy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-earthy-green transition"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card">
        <h3 className="text-subheading mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-earthy-green" />
          Security
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left p-4 border border-earthy-light rounded-lg hover:bg-earthy-cream transition">
            <p className="font-medium text-earthy-dark">Change Password</p>
            <p className="text-xs text-earthy-brown">Update your login password regularly</p>
          </button>
          <button className="w-full text-left p-4 border border-earthy-light rounded-lg hover:bg-earthy-cream transition">
            <p className="font-medium text-earthy-dark">Two-Factor Authentication</p>
            <p className="text-xs text-earthy-brown">Enable extra layer of security</p>
          </button>
          <button className="w-full text-left p-4 border border-red-300 rounded-lg hover:bg-red-50 transition">
            <p className="font-medium text-red-600">Delete Account</p>
            <p className="text-xs text-red-500">Permanently delete your account and data</p>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button variant="primary" size="lg" onClick={handleSave}>
          <Save className="w-5 h-5" />
          Save Changes
        </Button>
        <Button variant="secondary" size="lg">
          Cancel
        </Button>
      </div>

      {/* Data & Privacy Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Data & Privacy</h4>
        <p className="text-sm text-blue-800">
          Your data is encrypted and secured. We comply with all Indian data protection regulations. 
          <a href="#" className="ml-1 font-semibold underline hover:text-blue-700">Learn more</a>
        </p>
      </div>
    </div>
  )
}
