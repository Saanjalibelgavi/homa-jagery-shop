import { ArrowRight } from 'lucide-react'

export default function RecentTransactions({ transactions }) {
  const getStatusColor = (status) => {
    return status === 'Paid'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-subheading">Recent Transactions</h3>
        <button className="text-earthy-green hover:text-earthy-dark font-semibold flex items-center gap-1 transition">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-earthy-light">
              <th className="text-left py-3 px-4 text-sm font-semibold text-earthy-brown">Shop Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-earthy-brown">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-earthy-brown">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-earthy-brown">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-earthy-brown">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-earthy-light hover:bg-earthy-cream transition"
              >
                <td className="py-3 px-4 text-sm text-earthy-dark font-medium">
                  {transaction.shopName}
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-earthy-dark">
                  {transaction.amount}
                </td>
                <td className="py-3 px-4 text-sm text-earthy-brown">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-earthy-brown">
                  {transaction.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
