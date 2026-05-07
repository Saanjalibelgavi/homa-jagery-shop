import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import PaymentStatusChart from '../components/PaymentStatusChart'
import RecentTransactions from '../components/RecentTransactions'
import TopShops from '../components/TopShops'
import {
  dashboardStats,
  revenueData,
  paymentStatusData,
  recentTransactions,
  topShops
} from '../data/dummy'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-heading mb-2">Dashboard</h1>
        <p className="text-earthy-brown">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <PaymentStatusChart data={paymentStatusData} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={recentTransactions} />
        </div>
        <div>
          <TopShops shops={topShops} />
        </div>
      </div>
    </div>
  )
}
