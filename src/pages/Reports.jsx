import { useState } from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Download, TrendingUp, Calendar } from 'lucide-react'
import Button from '../components/Button'
import { topShops, revenueData, paymentStatusData } from '../data/dummy'

const salesGrowthData = [
  { month: 'Jan', growth: 0 },
  { month: 'Feb', growth: 8.3 },
  { month: 'Mar', growth: 7.7 },
  { month: 'Apr', growth: 7.1 },
  { month: 'May', growth: 8.9 },
  { month: 'Jun', growth: 8.2 },
  { month: 'Jul', growth: 5.7 },
  { month: 'Aug', growth: 3.6 },
  { month: 'Sep', growth: 6.9 },
  { month: 'Oct', growth: 4.8 },
  { month: 'Nov', growth: 4.6 },
  { month: 'Dec', growth: 5.9 }
]

const monthlyPendingData = [
  { month: 'Jan', pending: 15000, paid: 165000 },
  { month: 'Feb', pending: 18000, paid: 177000 },
  { month: 'Mar', pending: 20000, paid: 190000 },
  { month: 'Apr', pending: 22000, paid: 203000 },
  { month: 'May', pending: 25000, paid: 220000 }
]

const yearlyRevenueData = [
  { year: '2022', revenue: 850000 },
  { year: '2023', revenue: 1200000 },
  { year: '2024', revenue: 1850000 }
]

export default function Reports() {
  const [dateRange, setDateRange] = useState('month')

  const ReportCard = ({ title, value, subtitle, icon: Icon, color = 'green' }) => (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-earthy-brown mb-2">{title}</p>
          <p className="text-3xl font-bold text-earthy-dark mb-1">{value}</p>
          {subtitle && <p className="text-xs text-earthy-brown">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            color === 'green' ? 'bg-green-100 text-green-600' :
            color === 'blue' ? 'bg-blue-100 text-blue-600' :
            color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading mb-2">Reports & Analytics</h1>
        <p className="text-earthy-brown">Comprehensive business analysis and insights</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'This Month', value: 'month' },
          { label: 'Quarterly', value: 'quarter' },
          { label: 'Yearly', value: 'year' },
          { label: 'All Time', value: 'all' }
        ].map((range) => (
          <button
            key={range.value}
            onClick={() => setDateRange(range.value)}
            className={`px-4 py-2 rounded-lg transition ${
              dateRange === range.value
                ? 'bg-earthy-green text-white'
                : 'bg-earthy-cream text-earthy-dark hover:bg-earthy-light'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard
          title="Total Revenue"
          value="₹18.5L"
          subtitle="+12% from last month"
          icon={TrendingUp}
          color="green"
        />
        <ReportCard
          title="Total Orders"
          value="247"
          subtitle="Across all shops"
          color="blue"
        />
        <ReportCard
          title="Avg Order Value"
          value="₹74.9k"
          subtitle="Per order"
          color="purple"
        />
        <ReportCard
          title="Pending Amount"
          value="₹65k"
          subtitle="From customers"
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Bar Chart */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-subheading">Monthly Revenue Trend</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" />
              <XAxis dataKey="month" stroke="#8B6F47" />
              <YAxis stroke="#8B6F47" />
              <Tooltip contentStyle={{ backgroundColor: '#FFFCF7', border: '2px solid #D2B48C', borderRadius: '8px' }} />
              <Bar dataKey="revenue" fill="#7BA428" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Pie Chart */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-subheading">Payment Status Distribution</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Growth and Payment Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Growth Line Chart */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-subheading">Sales Growth Rate</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesGrowthData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" />
              <XAxis dataKey="month" stroke="#8B6F47" />
              <YAxis stroke="#8B6F47" />
              <Tooltip contentStyle={{ backgroundColor: '#FFFCF7', border: '2px solid #D2B48C', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="growth" stroke="#7BA428" strokeWidth={2} dot={{ fill: '#7BA428' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Paid vs Pending */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-subheading">Paid vs Pending Trend</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPendingData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" />
              <XAxis dataKey="month" stroke="#8B6F47" />
              <YAxis stroke="#8B6F47" />
              <Tooltip contentStyle={{ backgroundColor: '#FFFCF7', border: '2px solid #D2B48C', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="paid" fill="#7BA428" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#D2B48C" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yearly Revenue and Top Shops */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Revenue */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-subheading">Yearly Revenue Growth</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyRevenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" />
              <XAxis dataKey="year" stroke="#8B6F47" />
              <YAxis stroke="#8B6F47" />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFCF7', border: '2px solid #D2B48C', borderRadius: '8px' }}
                formatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
              />
              <Bar dataKey="revenue" fill="#7BA428" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Shops Performance */}
        <div className="card">
          <h3 className="text-subheading mb-6">Top Performing Shops</h3>
          <div className="space-y-4">
            {topShops.map((shop, index) => (
              <div key={shop.id} className="p-4 bg-earthy-cream rounded-lg hover:bg-earthy-light transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-earthy-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-earthy-dark">{shop.name}</h4>
                  </div>
                  <span className="text-earthy-green font-bold">{shop.sales}</span>
                </div>
                <div className="flex justify-between text-xs text-earthy-brown">
                  <span>{shop.orders} orders</span>
                  <span>⭐ {shop.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="card bg-gradient-to-r from-earthy-dark to-earthy-brown text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Export Reports</h3>
            <p className="text-earthy-light">Download comprehensive reports in PDF or Excel format</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="md">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="secondary" size="md">
              <Download className="w-4 h-4" />
              Download Excel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
