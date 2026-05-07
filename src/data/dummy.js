export const dashboardStats = [
  {
    id: 1,
    title: 'Total Monthly Sales',
    value: '₹2,45,000',
    percentage: '+12.5%',
    trend: 'up',
    icon: 'TrendingUp'
  },
  {
    id: 2,
    title: 'Total Revenue',
    value: '₹18,50,000',
    percentage: '+8.2%',
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    id: 3,
    title: 'Pending Amount',
    value: '₹65,000',
    percentage: '-3.1%',
    trend: 'down',
    icon: 'Clock'
  },
  {
    id: 4,
    title: 'Total Shops',
    value: '24',
    percentage: '+2 this month',
    trend: 'up',
    icon: 'Store'
  }
]

export const revenueData = [
  { month: 'Jan', revenue: 180000 },
  { month: 'Feb', revenue: 195000 },
  { month: 'Mar', revenue: 210000 },
  { month: 'Apr', revenue: 225000 },
  { month: 'May', revenue: 245000 },
  { month: 'Jun', revenue: 265000 },
  { month: 'Jul', revenue: 280000 },
  { month: 'Aug', revenue: 290000 },
  { month: 'Sep', revenue: 310000 },
  { month: 'Oct', revenue: 325000 },
  { month: 'Nov', revenue: 340000 },
  { month: 'Dec', revenue: 360000 }
]

export const paymentStatusData = [
  { name: 'Paid', value: 75, fill: '#7BA428' },
  { name: 'Pending', value: 25, fill: '#D2B48C' }
]

export const recentTransactions = [
  {
    id: 1,
    shopName: 'Green Valley Store',
    amount: '₹45,000',
    date: '2024-05-15',
    status: 'Paid',
    type: 'Credit'
  },
  {
    id: 2,
    shopName: 'Natural Goods Mart',
    amount: '₹32,500',
    date: '2024-05-14',
    status: 'Pending',
    type: 'Invoice'
  },
  {
    id: 3,
    shopName: 'Organic Shop Hub',
    amount: '₹28,000',
    date: '2024-05-13',
    status: 'Paid',
    type: 'Credit'
  },
  {
    id: 4,
    shopName: 'Pure Nature Wholesale',
    amount: '₹52,000',
    date: '2024-05-12',
    status: 'Paid',
    type: 'Invoice'
  },
  {
    id: 5,
    shopName: 'Health First Store',
    amount: '₹18,500',
    date: '2024-05-11',
    status: 'Pending',
    type: 'Credit'
  }
]

export const topShops = [
  {
    id: 1,
    name: 'Green Valley Store',
    sales: '₹1,85,000',
    orders: 24,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Pure Nature Wholesale',
    sales: '₹1,52,000',
    orders: 19,
    rating: 4.6
  },
  {
    id: 3,
    name: 'Natural Goods Mart',
    sales: '₹1,28,000',
    orders: 16,
    rating: 4.5
  },
  {
    id: 4,
    name: 'Organic Shop Hub',
    sales: '₹98,000',
    orders: 12,
    rating: 4.3
  }
]

export const shops = [
  {
    id: 1,
    name: 'Green Valley Store',
    ownerName: 'Rajesh Kumar',
    phone: '9876543210',
    address: 'MG Road, Bangalore - 560001',
    email: 'greenvalley@shop.com',
    totalSales: '₹1,85,000',
    pendingBalance: '₹45,000',
    paymentStatus: 'Partial',
    status: 'Active',
    joinDate: '2023-01-15',
    totalOrders: 24,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Pure Nature Wholesale',
    ownerName: 'Priya Sharma',
    phone: '9876543211',
    address: 'Bandra West, Mumbai - 400050',
    email: 'purenature@shop.com',
    totalSales: '₹1,52,000',
    pendingBalance: '₹0',
    paymentStatus: 'Paid',
    status: 'Active',
    joinDate: '2023-03-20',
    totalOrders: 19,
    rating: 4.6
  },
  {
    id: 3,
    name: 'Natural Goods Mart',
    ownerName: 'Amit Patel',
    phone: '9876543212',
    address: 'Connaught Place, Delhi - 110001',
    email: 'naturalgoods@shop.com',
    totalSales: '₹1,28,000',
    pendingBalance: '₹32,500',
    paymentStatus: 'Pending',
    status: 'Active',
    joinDate: '2023-05-10',
    totalOrders: 16,
    rating: 4.5
  },
  {
    id: 4,
    name: 'Organic Shop Hub',
    ownerName: 'Neha Desai',
    phone: '9876543213',
    address: 'Kalyani Nagar, Pune - 411006',
    email: 'organicshop@hub.com',
    totalSales: '₹98,000',
    pendingBalance: '₹18,500',
    paymentStatus: 'Partial',
    status: 'Inactive',
    joinDate: '2023-07-05',
    totalOrders: 12,
    rating: 4.3
  },
  {
    id: 5,
    name: 'Health First Store',
    ownerName: 'Vikram Singh',
    phone: '9876543214',
    address: 'Salt Lake, Kolkata - 700064',
    email: 'healthfirst@store.com',
    totalSales: '₹1,10,000',
    pendingBalance: '₹0',
    paymentStatus: 'Paid',
    status: 'Active',
    joinDate: '2023-09-12',
    totalOrders: 14,
    rating: 4.4
  },
  {
    id: 6,
    name: 'Wellness Hub',
    ownerName: 'Anjali Verma',
    phone: '9876543215',
    address: 'Sector 18, Noida - 201301',
    email: 'wellness@hub.com',
    totalSales: '₹95,000',
    pendingBalance: '₹25,000',
    paymentStatus: 'Pending',
    status: 'Active',
    joinDate: '2023-11-08',
    totalOrders: 11,
    rating: 4.2
  }
]

export const shopDetails = {
  1: {
    id: 1,
    name: 'Green Valley Store',
    ownerName: 'Rajesh Kumar',
    phone: '9876543210',
    address: 'MG Road, Bangalore - 560001',
    email: 'greenvalley@shop.com',
    totalSales: '₹1,85,000',
    pendingBalance: '₹45,000',
    paidAmount: '₹1,40,000',
    paymentStatus: 'Partial',
    status: 'Active',
    joinDate: '2023-01-15',
    totalOrders: 24,
    rating: 4.8,
    monthlySalesData: [
      { month: 'Jan', sales: 15000, orders: 2 },
      { month: 'Feb', sales: 18000, orders: 2 },
      { month: 'Mar', sales: 22000, orders: 3 },
      { month: 'Apr', sales: 20000, orders: 2 },
      { month: 'May', sales: 25000, orders: 3 }
    ],
    yearlySalesData: [
      { year: '2023', sales: 90000 },
      { year: '2024', sales: 95000 }
    ],
    recentPayments: [
      { id: 1, date: '2024-05-10', amount: '₹25,000', status: 'Paid', type: 'Invoice' },
      { id: 2, date: '2024-04-15', amount: '₹20,000', status: 'Paid', type: 'Credit' },
      { id: 3, date: '2024-03-20', amount: '₹30,000', status: 'Paid', type: 'Invoice' }
    ]
  }
}

export const inventory = [
  {
    id: 1,
    productName: 'Premium Powder Jaggery',
    quantity: 500,
    unit: 'kg',
    price: '₹450/kg',
    stock: 'In Stock',
    lastUpdated: '2024-05-15'
  },
  {
    id: 2,
    productName: 'Standard Powder Jaggery',
    quantity: 250,
    unit: 'kg',
    price: '₹380/kg',
    stock: 'In Stock',
    lastUpdated: '2024-05-14'
  },
  {
    id: 3,
    productName: 'Organic Powder Jaggery',
    quantity: 80,
    unit: 'kg',
    price: '₹520/kg',
    stock: 'Low Stock',
    lastUpdated: '2024-05-13'
  },
  {
    id: 4,
    productName: 'Bulk Jaggery Powder',
    quantity: 50,
    unit: 'kg',
    price: '₹400/kg',
    stock: 'Low Stock',
    lastUpdated: '2024-05-12'
  }
]

export const transactions = [
  {
    id: 1,
    serialNo: 1,
    date: '2024-05-15',
    billNo: 'HN-2026-001',
    gstNo: '27AABCT1234H1Z0',
    shopName: 'Green Valley Store',
    quantity: 100,
    quantityAmount: 5000,
    cgst: 125.00,
    sgst: 125.00,
    totalAmount: 5250.00,
    status: 'Paid'
  },
  {
    id: 2,
    serialNo: 2,
    date: '2024-05-14',
    billNo: 'HN-2026-002',
    gstNo: '27AABCU5678H2Z0',
    shopName: 'Natural Goods Mart',
    quantity: 75,
    quantityAmount: 3750,
    cgst: 93.75,
    sgst: 93.75,
    totalAmount: 3937.50,
    status: 'Pending'
  },
  {
    id: 3,
    serialNo: 3,
    date: '2024-05-13',
    billNo: 'HN-2026-003',
    gstNo: '27AABCV9012H3Z0',
    shopName: 'Organic Shop Hub',
    quantity: 65,
    quantityAmount: 3250,
    cgst: 81.25,
    sgst: 81.25,
    totalAmount: 3412.50,
    status: 'Paid'
  },
  {
    id: 4,
    serialNo: 4,
    date: '2024-05-12',
    billNo: 'HN-2026-004',
    gstNo: '27AABCW3456H4Z0',
    shopName: 'Pure Nature Wholesale',
    quantity: 120,
    quantityAmount: 6000,
    cgst: 150.00,
    sgst: 150.00,
    totalAmount: 6300.00,
    status: 'Paid'
  },
  {
    id: 5,
    serialNo: 5,
    date: '2024-05-11',
    billNo: 'HN-2026-005',
    gstNo: '27AABCX7890H5Z0',
    shopName: 'Health First Store',
    quantity: 40,
    quantityAmount: 2000,
    cgst: 50.00,
    sgst: 50.00,
    totalAmount: 2100.00,
    status: 'Pending'
  },
  {
    id: 6,
    serialNo: 6,
    date: '2024-05-10',
    billNo: 'HN-2026-006',
    gstNo: '27AABCY1234H6Z0',
    shopName: 'Wellness Hub',
    quantity: 145,
    quantityAmount: 7250,
    cgst: 181.25,
    sgst: 181.25,
    totalAmount: 7612.50,
    status: 'Paid'
  },
  {
    id: 7,
    serialNo: 7,
    date: '2024-05-09',
    billNo: 'HN-2026-007',
    gstNo: '27AABCU5678H7Z0',
    shopName: 'Natural Goods Mart',
    quantity: 80,
    quantityAmount: 4000,
    cgst: 100.00,
    sgst: 100.00,
    totalAmount: 4200.00,
    status: 'Paid'
  },
  {
    id: 8,
    serialNo: 8,
    date: '2024-05-08',
    billNo: 'HN-2026-008',
    gstNo: '27AABCT1234H8Z0',
    shopName: 'Green Valley Store',
    quantity: 95,
    quantityAmount: 4750,
    cgst: 118.75,
    sgst: 118.75,
    totalAmount: 4987.50,
    status: 'Pending'
  },
  {
    id: 9,
    serialNo: 9,
    date: '2024-05-07',
    billNo: 'HN-2026-009',
    gstNo: '27AABCW3456H9Z0',
    shopName: 'Pure Nature Wholesale',
    quantity: 110,
    quantityAmount: 5500,
    cgst: 137.50,
    sgst: 137.50,
    totalAmount: 5775.00,
    status: 'Paid'
  },
  {
    id: 10,
    serialNo: 10,
    date: '2024-05-06',
    billNo: 'HN-2026-010',
    gstNo: '27AABCX7890H10Z0',
    shopName: 'Health First Store',
    quantity: 55,
    quantityAmount: 2750,
    cgst: 68.75,
    sgst: 68.75,
    totalAmount: 2887.50,
    status: 'Paid'
  },
  {
    id: 11,
    serialNo: 11,
    date: '2024-05-05',
    billNo: 'HN-2026-011',
    gstNo: '27AABCZ5555H11Z0',
    shopName: 'Organic Shop Hub',
    quantity: 78,
    quantityAmount: 3900,
    cgst: 97.50,
    sgst: 97.50,
    totalAmount: 4095.00,
    status: 'Paid'
  },
  {
    id: 12,
    serialNo: 12,
    date: '2024-05-04',
    billNo: 'HN-2026-012',
    gstNo: '27AABCY1234H12Z0',
    shopName: 'Wellness Hub',
    quantity: 62,
    quantityAmount: 3100,
    cgst: 77.50,
    sgst: 77.50,
    totalAmount: 3255.00,
    status: 'Pending'
  }
]
