import React, { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Printer, Eye, Trash2, DollarSign } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/helpers'
import { StatusBadge } from './index'

const TransactionTable = ({
  transactions = [],
  onView = () => {},
  onPrint = () => {},
  onDelete = () => {},
  searchQuery = '',
  shopFilter = 'All',
  sortBy = 'date',
  sortOrder = 'desc'
}) => {
  const [expandedRow, setExpandedRow] = useState(null)

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.billNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shopName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.gstNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.serialNo?.toString().includes(searchQuery)
      )
    }

    // Apply shop filter
    if (shopFilter && shopFilter !== 'All') {
      filtered = filtered.filter(t => t.shopName === shopFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal

      switch (sortBy) {
        case 'date':
          aVal = new Date(a.date)
          bVal = new Date(b.date)
          break
        case 'amount':
          aVal = a.totalAmount
          bVal = b.totalAmount
          break
        case 'serial':
          aVal = a.serialNo
          bVal = b.serialNo
          break
        default:
          aVal = a.serialNo
          bVal = b.serialNo
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return filtered
  }, [transactions, searchQuery, shopFilter, sortBy, sortOrder])

  // Calculate totals
  const totals = useMemo(() => {
    return {
      quantity: filteredTransactions.reduce((sum, t) => sum + (t.quantity || 0), 0),
      quantityAmount: filteredTransactions.reduce((sum, t) => sum + (t.quantityAmount || 0), 0),
      cgst: filteredTransactions.reduce((sum, t) => sum + (t.cgst || 0), 0),
      sgst: filteredTransactions.reduce((sum, t) => sum + (t.sgst || 0), 0),
      totalAmount: filteredTransactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0)
    }
  }, [filteredTransactions])

  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">No transactions found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="bg-gradient-to-r from-dark to-secondary-700 text-white">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">S.No.</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Bill No.</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">GST No.</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Shop Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold uppercase">Qty</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase">Amount</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase">CGST</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase">SGST</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase">Total</th>
              <th className="px-4 py-3 text-center text-xs font-bold uppercase">Status</th>
              <th className="px-4 py-3 text-center text-xs font-bold uppercase">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-mono font-bold text-primary-600 text-sm">
                    {transaction.serialNo}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono bg-bg-cream px-2 py-1 rounded text-sm font-semibold text-dark">
                    {transaction.billNo}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {transaction.gstNo}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 text-sm">
                    {transaction.shopName}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm">
                    {transaction.quantity}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(transaction.quantityAmount)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-green-600 font-medium">
                    {formatCurrency(transaction.cgst)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-blue-600 font-medium">
                    {formatCurrency(transaction.sgst)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-bold text-lg text-primary-600">
                    {formatCurrency(transaction.totalAmount)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={transaction.status} />
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(transaction)}
                      className="p-1 hover:bg-blue-100 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onPrint(transaction)}
                      className="p-1 hover:bg-green-100 rounded transition-colors"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Footer with Totals */}
          <tfoot>
            <tr className="bg-gradient-to-r from-dark-50 to-secondary-50 border-t-2 border-dark font-bold">
              <th colSpan="5" className="px-4 py-3 text-left text-gray-900">
                TOTAL ({filteredTransactions.length} transactions)
              </th>
              <th className="px-4 py-3 text-center text-dark">
                {totals.quantity}
              </th>
              <th className="px-4 py-3 text-right text-dark">
                {formatCurrency(totals.quantityAmount)}
              </th>
              <th className="px-4 py-3 text-right text-green-700">
                {formatCurrency(totals.cgst)}
              </th>
              <th className="px-4 py-3 text-right text-blue-700">
                {formatCurrency(totals.sgst)}
              </th>
              <th className="px-4 py-3 text-right text-primary-700 text-lg">
                {formatCurrency(totals.totalAmount)}
              </th>
              <th colSpan="2"></th>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3 p-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Card Header - Click to Expand */}
            <button
              onClick={() =>
                setExpandedRow(expandedRow === transaction.id ? null : transaction.id)
              }
              className="w-full bg-gradient-to-r from-primary-50 to-accent-50 px-4 py-3 flex items-center justify-between hover:from-primary-100 hover:to-accent-100 transition-colors"
            >
              <div className="text-left flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-primary-600">
                    #{transaction.serialNo}
                  </span>
                  <span className="font-mono text-xs bg-white px-2 py-1 rounded text-dark">
                    {transaction.billNo}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {transaction.shopName}
                </p>
              </div>
              <div className="text-right mr-2">
                <p className="font-bold text-lg text-primary-600">
                  {formatCurrency(transaction.totalAmount)}
                </p>
                <StatusBadge status={transaction.status} />
              </div>
              {expandedRow === transaction.id ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Expanded Details */}
            {expandedRow === transaction.id && (
              <div className="px-4 py-3 bg-white space-y-2 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">GST No.</p>
                    <p className="font-mono text-xs text-gray-700">
                      {transaction.gstNo}
                    </p>
                  </div>
                </div>

                <div className="bg-bg-cream rounded p-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Quantity:</span>
                    <span className="font-bold text-primary-600">
                      {transaction.quantity} packets
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Amount:</span>
                    <span className="font-bold">
                      {formatCurrency(transaction.quantityAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">CGST (2.5%):</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(transaction.cgst)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">SGST (2.5%):</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(transaction.sgst)}
                    </span>
                  </div>
                  <div className="border-t border-accent-200 pt-2 flex justify-between font-bold text-primary-600">
                    <span>Total:</span>
                    <span className="text-lg">
                      {formatCurrency(transaction.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onView(transaction)}
                    className="flex-1 px-2 py-2 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => onPrint(transaction)}
                    className="flex-1 px-2 py-2 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="flex-1 px-2 py-2 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          <span className="font-medium">Summary:</span> {filteredTransactions.length} transactions •
          <span className="ml-2">{totals.quantity} packets</span> •
          <span className="ml-2 font-bold text-primary-600">
            Total: {formatCurrency(totals.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TransactionTable
