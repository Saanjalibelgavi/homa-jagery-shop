/**
 * Format currency values
 */
export const formatCurrency = (value) => {
  if (!value) return '₹0'
  const num = typeof value === 'string' ? parseInt(value.replace(/,/g, '').replace('₹', '')) : value
  return `₹${num.toLocaleString('en-IN')}`
}

/**
 * Format date
 */
export const formatDate = (dateString, format = 'short') => {
  const date = new Date(dateString)
  
  if (format === 'short') {
    return date.toLocaleDateString('en-IN')
  } else if (format === 'long') {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } else if (format === 'time') {
    return date.toLocaleTimeString('en-IN')
  }
  
  return date.toLocaleDateString('en-IN')
}

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

/**
 * Parse currency string to number
 */
export const parseCurrency = (value) => {
  if (!value) return 0
  if (typeof value === 'number') return value
  return parseInt(value.replace(/,/g, '').replace('₹', ''))
}

/**
 * Calculate growth percentage
 */
export const calculateGrowth = (current, previous) => {
  if (previous === 0) return 0
  return Math.round(((current - previous) / previous) * 100)
}

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Capitalize first letter
 */
export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/
  return regex.test(phone.replace(/\D/g, ''))
}

/**
 * Sort array by key
 */
export const sortBy = (array, key, order = 'asc') => {
  const sorted = [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
  return sorted
}

/**
 * Group array by key
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key]
    if (!result[group]) {
      result[group] = []
    }
    result[group].push(item)
    return result
  }, {})
}

/**
 * Filter array by multiple conditions
 */
export const filterBy = (array, conditions) => {
  return array.filter(item =>
    Object.entries(conditions).every(([key, value]) => {
      if (value === 'All' || value === '') return true
      return item[key] === value
    })
  )
}

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Get status color
 */
export const getStatusColor = (status) => {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-gray-100 text-gray-800',
    'Paid': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Partial': 'bg-blue-100 text-blue-800',
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

/**
 * Summary calculations
 */
export const calculateSummary = (item) => {
  return {
    totalRevenue: item.reduce((sum, i) => sum + parseCurrency(i.totalSales), 0),
    totalOrders: item.reduce((sum, i) => sum + i.totalOrders, 0),
    totalPending: item.reduce((sum, i) => sum + parseCurrency(i.pendingBalance), 0),
    avgOrderValue: 0
  }
}

/**
 * Calculate Quantity Amount (Quantity × 50)
 * Each packet is 50gm (half-kg) at ₹50
 */
export const calculateQuantityAmount = (quantity) => {
  if (!quantity) return 0
  return parseFloat(quantity) * 50
}

/**
 * Calculate CGST (2.5% of Quantity Amount)
 */
export const calculateCGST = (quantityAmount) => {
  if (!quantityAmount) return 0
  return Math.round((parseFloat(quantityAmount) * 2.5) / 100 * 100) / 100
}

/**
 * Calculate SGST (2.5% of Quantity Amount)
 */
export const calculateSGST = (quantityAmount) => {
  if (!quantityAmount) return 0
  return Math.round((parseFloat(quantityAmount) * 2.5) / 100 * 100) / 100
}

/**
 * Calculate Total GST (CGST + SGST = 5%)
 */
export const calculateTotalGST = (quantityAmount) => {
  if (!quantityAmount) return 0
  return Math.round((parseFloat(quantityAmount) * 5) / 100 * 100) / 100
}

/**
 * Calculate Total Amount (Quantity Amount + CGST + SGST)
 */
export const calculateTotalAmount = (quantityAmount) => {
  if (!quantityAmount) return 0
  const cgst = calculateCGST(quantityAmount)
  const sgst = calculateSGST(quantityAmount)
  return Math.round((parseFloat(quantityAmount) + cgst + sgst) * 100) / 100
}

/**
 * Calculate complete GST breakdown for a transaction
 */
export const calculateGSTBreakdown = (quantity) => {
  const quantityAmount = calculateQuantityAmount(quantity)
  const cgst = calculateCGST(quantityAmount)
  const sgst = calculateSGST(quantityAmount)
  const totalAmount = calculateTotalAmount(quantityAmount)

  return {
    quantity,
    quantityAmount: Math.round(quantityAmount * 100) / 100,
    cgst: cgst,
    sgst: sgst,
    totalGST: Math.round((cgst + sgst) * 100) / 100,
    totalAmount: totalAmount
  }
}

/**
 * Generate unique serial number
 */
export const generateSerialNumber = (existingTransactions = []) => {
  if (!existingTransactions || existingTransactions.length === 0) {
    return 1
  }
  const maxSerial = Math.max(...existingTransactions.map(t => t.serialNo || 0))
  return maxSerial + 1
}

/**
 * Generate bill number with prefix
 */
export const generateBillNumber = (existingTransactions = []) => {
  if (!existingTransactions || existingTransactions.length === 0) {
    return 'HN-2026-001'
  }
  const year = new Date().getFullYear()
  const yearBills = existingTransactions.filter(t => t.billNo && t.billNo.includes(year.toString()))
  const nextNum = yearBills.length + 1
  return `HN-${year}-${String(nextNum).padStart(3, '0')}`
}

/**
 * Format bill number for display
 */
export const formatBillNumber = (billNo) => {
  if (!billNo) return 'N/A'
  return billNo.toString().toUpperCase()
}

/**
 * Validate GST number format (16 characters)
 */
export const validateGSTNumber = (gstNo) => {
  if (!gstNo) return false
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return gstRegex.test(gstNo.toUpperCase()) || gstNo.length >= 2 // Allow partially entered GST
}

/**
 * Calculate transaction summary stats
 */
export const calculateTransactionStats = (transactions = []) => {
  return {
    totalTransactions: transactions.length,
    totalQuantity: transactions.reduce((sum, t) => sum + (t.quantity || 0), 0),
    totalQuantityAmount: Math.round(transactions.reduce((sum, t) => sum + (t.quantityAmount || 0), 0) * 100) / 100,
    totalCGST: Math.round(transactions.reduce((sum, t) => sum + (t.cgst || 0), 0) * 100) / 100,
    totalSGST: Math.round(transactions.reduce((sum, t) => sum + (t.sgst || 0), 0) * 100) / 100,
    totalAmount: Math.round(transactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0) * 100) / 100
  }
}
