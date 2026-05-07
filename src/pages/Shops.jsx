import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { shops } from '../data/dummy'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import SearchBox from '../components/SearchBox'
import FilterDropdown from '../components/FilterDropdown'
import StatusBadge from '../components/StatusBadge'
import Table from '../components/Table'

export default function Shops() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.phone.includes(searchQuery)

      const matchesPayment =
        paymentFilter === 'All' || shop.paymentStatus === paymentFilter

      const matchesStatus = statusFilter === 'All' || shop.status === statusFilter

      return matchesSearch && matchesPayment && matchesStatus
    })
  }, [searchQuery, paymentFilter, statusFilter])

  const columns = [
    { key: 'name', label: 'Shop Name', width: '20%' },
    { key: 'ownerName', label: 'Owner Name', width: '15%' },
    { key: 'phone', label: 'Phone', width: '12%' },
    {
      key: 'address',
      label: 'Address',
      width: '20%',
      render: (value) => <span className="text-xs">{value}</span>
    },
    { key: 'totalSales', label: 'Total Sales', width: '12%' },
    {
      key: 'pendingBalance',
      label: 'Pending Balance',
      width: '12%',
      render: (value) => <span className="font-semibold text-red-600">{value}</span>
    },
    {
      key: 'paymentStatus',
      label: 'Payment Status',
      width: '10%',
      render: (value) => <StatusBadge status={value} variant="payment" />
    }
  ]

  const rowActions = [
    {
      icon: <Eye className="w-4 h-4" />,
      onClick: (shop) => navigate(`/shops/${shop.id}`),
      className: 'p-2 hover:bg-earthy-light rounded transition text-earthy-brown hover:text-earthy-dark',
      title: 'View Details'
    },
    {
      icon: <Edit className="w-4 h-4" />,
      onClick: (shop) => {},
      className: 'p-2 hover:bg-earthy-light rounded transition text-earthy-brown hover:text-earthy-dark',
      title: 'Edit'
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (shop) => {},
      className: 'p-2 hover:bg-red-100 rounded transition text-red-600',
      title: 'Delete'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-heading mb-2">Shops Management</h1>
          <p className="text-earthy-brown">Manage all your retail shops</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Shop
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <SearchBox
            placeholder="Search by shop name, owner, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <FilterDropdown
          label="Payment Status"
          options={[
            { label: 'All', value: 'All' },
            { label: 'Paid', value: 'Paid' },
            { label: 'Partial', value: 'Partial' },
            { label: 'Pending', value: 'Pending' }
          ]}
          value={paymentFilter}
          onChange={setPaymentFilter}
        />
        <FilterDropdown
          label="Status"
          options={[
            { label: 'All', value: 'All' },
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' }
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-earthy-brown">
        Showing <span className="font-semibold">{filteredShops.length}</span> of{' '}
        <span className="font-semibold">{shops.length}</span> shops
      </div>

      {/* Responsive Table / Cards */}
      <div className="card hidden md:block">
        <Table columns={columns} data={filteredShops} rowActions={rowActions} />
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredShops.map((shop) => (
          <div key={shop.id} className="card">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-earthy-dark truncate">{shop.name}</h4>
                  <p className="text-xs text-earthy-brown">{shop.ownerName}</p>
                </div>
                <StatusBadge status={shop.paymentStatus} variant="payment" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-earthy-brown">Phone</p>
                  <p className="font-medium text-earthy-dark">{shop.phone}</p>
                </div>
                <div>
                  <p className="text-earthy-brown">Total Sales</p>
                  <p className="font-medium text-earthy-green">{shop.totalSales}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-earthy-light">
                <button
                  onClick={() => navigate(`/shops/${shop.id}`)}
                  className="flex-1 p-2 bg-earthy-cream hover:bg-earthy-light rounded transition text-sm text-earthy-dark font-medium"
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  View
                </button>
                <button className="p-2 bg-earthy-cream hover:bg-earthy-light rounded transition text-earthy-dark">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-100 hover:bg-red-200 rounded transition text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredShops.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-earthy-brown">No shops found matching your criteria</p>
        </div>
      )}
    </div>
  )
}
