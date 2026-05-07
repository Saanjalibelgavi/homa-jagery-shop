import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, Calendar } from 'lucide-react'
import { shops, shopDetails } from '../data/dummy'
import SummaryCard from '../components/SummaryCard'
import MonthlySalesChart from '../components/MonthlySalesChart'
import StatusBadge from '../components/StatusBadge'

export default function ShopDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const shop = shops.find(s => s.id === parseInt(id))
  const details = shopDetails[parseInt(id)]

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-earthy-dark mb-4">Shop Not Found</h1>
          <button
            onClick={() => navigate('/shops')}
            className="btn-primary"
          >
            Back to Shops
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/shops')}
          className="flex items-center gap-2 text-earthy-green hover:text-earthy-dark mb-4 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shops
        </button>

        <div className="card">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-heading mb-2">{shop.name}</h1>
              <p className="text-earthy-brown mb-4">Owner: {shop.ownerName}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-earthy-brown">
                  <Phone className="w-4 h-4" />
                  {shop.phone}
                </div>
                <div className="flex items-center gap-2 text-earthy-brown">
                  <Mail className="w-4 h-4" />
                  {shop.email}
                </div>
                <div className="flex items-center gap-2 text-earthy-brown">
                  <MapPin className="w-4 h-4" />
                  {shop.address}
                </div>
                <div className="flex items-center gap-2 text-earthy-brown">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(shop.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <StatusBadge status={shop.status} variant="active" />
              <StatusBadge status={shop.paymentStatus} variant="payment" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          label="Total Sales"
          value={shop.totalSales}
          subtext={`${shop.totalOrders} orders`}
          color="green"
        />
        <SummaryCard
          label="Paid Amount"
          value={details?.paidAmount || '₹0'}
          subtext="Received payments"
          color="blue"
        />
        <SummaryCard
          label="Pending Amount"
          value={shop.pendingBalance}
          subtext="Outstanding balance"
          color="yellow"
        />
        <SummaryCard
          label="Rating"
          value={`${shop.rating}/5`}
          subtext={`${shop.totalOrders} transactions`}
          color="green"
        />
      </div>

      {/* Charts and Transactions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {details?.monthlySalesData && (
            <MonthlySalesChart data={details.monthlySalesData} />
          )}
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h3 className="text-subheading mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-earthy-cream rounded-lg">
              <span className="text-sm text-earthy-brown">Total Orders</span>
              <span className="font-bold text-earthy-dark">{shop.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-earthy-cream rounded-lg">
              <span className="text-sm text-earthy-brown">Avg Order Value</span>
              <span className="font-bold text-earthy-dark">
                ₹{Math.round(parseInt(shop.totalSales.replace(/,/g, '').replace('₹', '')) / shop.totalOrders)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-earthy-cream rounded-lg">
              <span className="text-sm text-earthy-brown">Payment Rate</span>
              <span className="font-bold text-earthy-green">
                {Math.round((parseInt(details?.paidAmount.replace(/,/g, '').replace('₹', '')) || 0) / (parseInt(shop.totalSales.replace(/,/g, '').replace('₹', '')) || 1) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="card">
        <h3 className="text-subheading mb-6">Recent Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-earthy-light">
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Invoice</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Status</th>
              </tr>
            </thead>
            <tbody>
              {details?.recentPayments?.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-earthy-light hover:bg-earthy-cream transition"
                >
                  <td className="py-4 px-6 text-sm text-earthy-dark">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-earthy-dark">
                    {payment.amount}
                  </td>
                  <td className="py-4 px-6 text-sm text-earthy-brown">{payment.type}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={payment.status} variant="transaction" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
