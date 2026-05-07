import React, { useState, useEffect } from 'react'
import { X, CalendarIcon, DollarSign, FileText, Building2, Package } from 'lucide-react'
import { Button } from './index'
import { 
  calculateGSTBreakdown, 
  generateSerialNumber, 
  generateBillNumber,
  formatCurrency,
  validateGSTNumber 
} from '../utils/helpers'
import { shops } from '../data/dummy'

const TransactionForm = ({ isOpen, onClose, onSubmit, existingTransactions = [] }) => {
  const [formData, setFormData] = useState({
    serialNo: 0,
    date: new Date().toISOString().split('T')[0],
    billNo: '',
    gstNo: '',
    shopName: '',
    quantity: '',
    quantityAmount: 0,
    cgst: 0,
    sgst: 0,
    totalAmount: 0,
    status: 'Pending'
  })

  const [errors, setErrors] = useState({})
  const [showShopDropdown, setShowShopDropdown] = useState(false)
  const [gstBreakdown, setGstBreakdown] = useState(null)

  // Initialize serial and bill numbers on mount
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        serialNo: generateSerialNumber(existingTransactions),
        billNo: generateBillNumber(existingTransactions)
      }))
    }
  }, [isOpen, existingTransactions])

  // Auto-calculate GST when quantity changes
  useEffect(() => {
    if (formData.quantity && formData.quantity > 0) {
      const breakdown = calculateGSTBreakdown(formData.quantity)
      setGstBreakdown(breakdown)
      setFormData(prev => ({
        ...prev,
        quantityAmount: breakdown.quantityAmount,
        cgst: breakdown.cgst,
        sgst: breakdown.sgst,
        totalAmount: breakdown.totalAmount
      }))
    } else {
      setGstBreakdown(null)
      setFormData(prev => ({
        ...prev,
        quantityAmount: 0,
        cgst: 0,
        sgst: 0,
        totalAmount: 0
      }))
    }
  }, [formData.quantity])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.billNo) newErrors.billNo = 'Bill number is required'
    if (!formData.gstNo) newErrors.gstNo = 'GST number is required'
    if (!formData.gstNo || !validateGSTNumber(formData.gstNo)) {
      newErrors.gstNo = 'Valid GST number is required'
    }
    if (!formData.shopName) newErrors.shopName = 'Shop name is required'
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({
      ...formData,
      id: Date.now(),
      quantity: parseInt(formData.quantity)
    })

    // Reset form
    setFormData({
      serialNo: generateSerialNumber(existingTransactions),
      date: new Date().toISOString().split('T')[0],
      billNo: generateBillNumber(existingTransactions),
      gstNo: '',
      shopName: '',
      quantity: '',
      quantityAmount: 0,
      cgst: 0,
      sgst: 0,
      totalAmount: 0,
      status: 'Pending'
    })
    setErrors({})
    setGstBreakdown(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 bg-gradient-to-r from-primary-50 to-accent-50 border-b">
          <div>
            <h2 className="text-2xl font-bold text-dark">New Transaction</h2>
            <p className="text-sm text-gray-600 mt-1">Enter transaction details with automatic GST calculation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Serial No & Date & Bill No */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Serial No (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Serial No.
                  </span>
                </label>
                <input
                  type="number"
                  value={formData.serialNo}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Date
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
              </div>

              {/* Bill No */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Bill No.
                  </span>
                </label>
                <input
                  type="text"
                  name="billNo"
                  value={formData.billNo}
                  onChange={handleInputChange}
                  placeholder="HN-2026-001"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.billNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.billNo && <p className="text-xs text-red-600 mt-1">{errors.billNo}</p>}
              </div>
            </div>

            {/* Row 2: GST No & Shop Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GST No */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GST No. (16 Character)
                </label>
                <input
                  type="text"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleInputChange}
                  placeholder="27AABCT1234H1Z0"
                  maxLength="16"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono ${
                    errors.gstNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.gstNo && <p className="text-xs text-red-600 mt-1">{errors.gstNo}</p>}
                <p className="text-xs text-gray-500 mt-1">Format: 27AABCT1234H1Z0</p>
              </div>

              {/* Shop Name with Dropdown */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Shop Name
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    onFocus={() => setShowShopDropdown(true)}
                    placeholder="Select or type shop name"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.shopName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />

                  {/* Dropdown */}
                  {showShopDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {shops
                        .filter(shop =>
                          shop.name.toLowerCase().includes(formData.shopName.toLowerCase())
                        )
                        .slice(0, 5)
                        .map(shop => (
                          <div
                            key={shop.id}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, shopName: shop.name }))
                              setShowShopDropdown(false)
                            }}
                            className="px-3 py-2 hover:bg-primary-50 cursor-pointer border-b last:border-b-0"
                          >
                            <p className="font-medium text-gray-900">{shop.name}</p>
                            <p className="text-xs text-gray-500">{shop.owner}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {errors.shopName && <p className="text-xs text-red-600 mt-1">{errors.shopName}</p>}
              </div>
            </div>

            {/* Row 3: Quantity */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Quantity (Half-Kg Packets @ ₹50 each)
                  </span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter number of packets"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.quantity ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>}
                <p className="text-xs text-gray-500 mt-1">Each packet = 500gm (half-kg) @ ₹50</p>
              </div>
            </div>

            {/* Calculation Display */}
            {gstBreakdown && (
              <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-4 rounded-lg border border-accent-200">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">Amount Calculation</h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {/* Quantity Amount */}
                  <div className="bg-white p-3 rounded-lg border border-accent-100">
                    <p className="text-xs font-medium text-gray-600 mb-1">Quantity Amount</p>
                    <p className="text-lg font-bold text-primary-600">
                      {formatCurrency(gstBreakdown.quantityAmount)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {gstBreakdown.quantity} × ₹50
                    </p>
                  </div>

                  {/* CGST */}
                  <div className="bg-white p-3 rounded-lg border border-green-100">
                    <p className="text-xs font-medium text-gray-600 mb-1">CGST (2.5%)</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(gstBreakdown.cgst)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Applied</p>
                  </div>

                  {/* SGST */}
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <p className="text-xs font-medium text-gray-600 mb-1">SGST (2.5%)</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(gstBreakdown.sgst)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Applied</p>
                  </div>

                  {/* Total GST */}
                  <div className="bg-white p-3 rounded-lg border border-purple-100">
                    <p className="text-xs font-medium text-gray-600 mb-1">Total GST (5%)</p>
                    <p className="text-lg font-bold text-purple-600">
                      {formatCurrency(gstBreakdown.totalGST)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Combined</p>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-gradient-to-br from-primary-500 to-dark p-3 rounded-lg border-2 border-primary-600">
                    <p className="text-xs font-medium text-white mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-white">
                      {formatCurrency(gstBreakdown.totalAmount)}
                    </p>
                    <p className="text-xs text-primary-100 mt-1">Final</p>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Table */}
            {gstBreakdown && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Item</th>
                      <th className="px-4 py-2 text-right font-semibold text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">Quantity Amount ({gstBreakdown.quantity} packets × ₹50)</td>
                      <td className="px-4 py-2 text-right font-medium text-gray-900">
                        {formatCurrency(gstBreakdown.quantityAmount)}
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">CGST @ 2.5%</td>
                      <td className="px-4 py-2 text-right font-medium text-green-600">
                        {formatCurrency(gstBreakdown.cgst)}
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">SGST @ 2.5%</td>
                      <td className="px-4 py-2 text-right font-medium text-blue-600">
                        {formatCurrency(gstBreakdown.sgst)}
                      </td>
                    </tr>
                    <tr className="bg-gradient-to-r from-primary-50 to-accent-50 font-bold border-t-2 border-primary-300">
                      <td className="px-4 py-2 text-primary-900">Total Amount Payable</td>
                      <td className="px-4 py-2 text-right text-lg text-primary-600">
                        {formatCurrency(gstBreakdown.totalAmount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Save Transaction
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TransactionForm
