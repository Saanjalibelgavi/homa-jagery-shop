import { useState, useMemo } from 'react'
import { transactions as initialTransactions, shops } from '../data/dummy'
import { Download, Filter, Plus, FileText, TrendingUp } from 'lucide-react'
import SearchBox from '../components/SearchBox'
import FilterDropdown from '../components/FilterDropdown'
import Button from '../components/Button'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import TransactionDetails from '../components/TransactionDetails'
import { calculateTransactionStats, formatCurrency } from '../utils/helpers'

export default function Transactions() {
  // State management
  const [allTransactions, setAllTransactions] = useState(initialTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [shopFilter, setShopFilter] = useState('All')
  const [monthFilter, setMonthFilter] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...allTransactions]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.billNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shopName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.gstNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.serialNo?.toString().includes(searchQuery)
      )
    }

    // Shop filter
    if (shopFilter && shopFilter !== 'All') {
      filtered = filtered.filter(t => t.shopName === shopFilter)
    }

    // Month filter
    if (monthFilter && monthFilter !== 'All') {
      const [year, month] = monthFilter.split('-')
      filtered = filtered.filter(t => {
        const tDate = new Date(t.date)
        return tDate.getFullYear() === parseInt(year) &&
               tDate.getMonth() === parseInt(month) - 1
      })
    }

    return filtered
  }, [allTransactions, searchQuery, shopFilter, monthFilter])

  // Calculate statistics
  const stats = useMemo(() => {
    return calculateTransactionStats(filteredTransactions)
  }, [filteredTransactions])

  // Get unique shop names for filter
  const shopOptions = useMemo(() => {
    const uniqueShops = [...new Set(allTransactions.map(t => t.shopName))]
    return [
      { label: 'All Shops', value: 'All' },
      ...uniqueShops.map(shop => ({ label: shop, value: shop }))
    ]
  }, [allTransactions])

  // Get unique months for filter
  const monthOptions = useMemo(() => {
    const uniqueMonths = new Set()
    allTransactions.forEach(t => {
      const date = new Date(t.date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      uniqueMonths.add(key)
    })
    
    const options = [{ label: 'All Dates', value: 'All' }]
    Array.from(uniqueMonths)
      .sort()
      .reverse()
      .forEach(month => {
        const [year, m] = month.split('-')
        const monthName = new Date(year, parseInt(m) - 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' })
        options.push({ label: monthName, value: month })
      })
    
    return options
  }, [allTransactions])

  // Handle handlers
  const handleAddTransaction = (newTransaction) => {
    setAllTransactions(prev => [newTransaction, ...prev])
    setIsFormOpen(false)
  }

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction)
    setShowDetails(true)
  }

  const handlePrintTransaction = (transaction) => {
    // Open print preview
    setSelectedTransaction(transaction)
    setTimeout(() => window.print(), 100)
  }

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setAllTransactions(prev => prev.filter(t => t.id !== id))
    }
  }

  const handleExportCSV = () => {
    const headers = ['S.No', 'Date', 'Bill No', 'GST No', 'Shop Name', 'Qty', 'Amount', 'CGST', 'SGST', 'Total', 'Status']
    const rows = filteredTransactions.map(t => [
      t.serialNo,
      t.date,
      t.billNo,
      t.gstNo,
      t.shopName,
      t.quantity,
      t.quantityAmount,
      t.cgst,
      t.sgst,
      t.totalAmount,
      t.status
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">Transaction Management</h1>
          <p className="text-gray-600">Professional transaction entry and reporting system</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            onClick={() => setIsFormOpen(true)}
            variant="primary"
            className="flex-1 md:flex-none flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Transaction
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="secondary"
            className="flex-1 md:flex-none flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          {/* Search bar */}
          <div>
            <SearchBox
              placeholder="Search by Bill No, Shop Name, GST No, or Serial No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <FilterDropdown
              label="Shop"
              options={shopOptions}
              value={shopFilter}
              onChange={setShopFilter}
            />
            <FilterDropdown
              label="Month"
              options={monthOptions}
              value={monthFilter}
              onChange={setMonthFilter}
            />
            <FilterDropdown
              label="Sort By"
              options={[
                { label: 'Date (Latest)', value: 'date' },
                { label: 'Serial No', value: 'serial' },
                { label: 'Amount', value: 'amount' }
              ]}
              value={sortBy}
              onChange={setSortBy}
            />
            <FilterDropdown
              label="Order"
              options={[
                { label: 'Descending', value: 'desc' },
                { label: 'Ascending', value: 'asc' }
              ]}
              value={sortOrder}
              onChange={setSortOrder}
            />
          </div>

          <div className="pt-2 border-t flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <strong>{filteredTransactions.length}</strong> transaction(s) found
            </span>
            {searchQuery || shopFilter !== 'All' || monthFilter !== 'All' ? (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setShopFilter('All')
                  setMonthFilter('All')
                }}
                className="text-primary-600 hover:underline font-medium"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg shadow p-4 border border-primary-200">
          <p className="text-xs font-semibold text-gray-600 mb-1">Transactions</p>
          <p className="text-2xl font-bold text-primary-600">{stats.totalTransactions}</p>
          <p className="text-xs text-gray-500 mt-1">Total entries</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-4 border border-purple-200">
          <p className="text-xs font-semibold text-gray-600 mb-1">Total Quantity</p>
          <p className="text-2xl font-bold text-purple-600">{stats.totalQuantity}</p>
          <p className="text-xs text-gray-500 mt-1">packets (500gm each)</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-4 border border-blue-200">
          <p className="text-xs font-semibold text-gray-600 mb-1">Subtotal</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(stats.totalQuantityAmount)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Quantity Amount</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-4 border border-green-200">
          <p className="text-xs font-semibold text-gray-600 mb-1">CGST (2.5%)</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.totalCGST)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Combined</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg shadow p-4 border border-cyan-200">
          <p className="text-xs font-semibold text-gray-600 mb-1">SGST (2.5%)</p>
          <p className="text-2xl font-bold text-cyan-600">
            {formatCurrency(stats.totalSGST)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Combined</p>
        </div>

        <div className="bg-gradient-to-br from-primary-500 to-dark rounded-lg shadow p-4 border-2 border-primary-600">
          <p className="text-xs font-semibold text-white mb-1">GRAND TOTAL</p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(stats.totalAmount)}
          </p>
          <p className="text-xs text-primary-100 mt-1">Final amount</p>
        </div>
      </div>

      {/* Transaction Table */}
      <TransactionTable
        transactions={filteredTransactions}
        onView={handleViewTransaction}
        onPrint={handlePrintTransaction}
        onDelete={handleDeleteTransaction}
        searchQuery={searchQuery}
        shopFilter={shopFilter}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />

      {/* Forms and Modals */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddTransaction}
        existingTransactions={allTransactions}
      />

      <TransactionDetails
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        transaction={selectedTransaction}
      />
    </div>
  )
}

