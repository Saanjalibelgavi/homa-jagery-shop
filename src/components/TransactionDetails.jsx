import React from 'react'
import { X, Printer, Download, Mail } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/helpers'
import { Button } from './index'

const TransactionDetails = ({ isOpen, onClose, transaction, businessName = 'HOMA-NATURALS' }) => {
  if (!isOpen || !transaction) return null

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Placeholder for PDF download
    alert('PDF download functionality can be integrated with libraries like jsPDF or react-pdf')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 bg-gradient-to-r from-dark to-secondary-700 text-white">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Print Area */}
        <div className="p-8 space-y-6 print:p-0">
          {/* Business Header */}
          <div className="text-center space-y-2 pb-6 border-b-2 border-dark">
            <h1 className="text-4xl font-black text-dark">{businessName}</h1>
            <p className="text-gray-600 font-medium">Powder Jaggery Wholesale Business</p>
            <p className="text-sm text-gray-500">Premium Quality • Trusted Since Years</p>
          </div>

          {/* Invoice Info */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left - Invoice Details */}
            <div className="space-y-2">
              <h3 className="font-bold text-dark mb-3">Invoice Information</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serial No.:</span>
                  <span className="font-mono font-bold text-primary-600">
                    {transaction.serialNo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bill No.:</span>
                  <span className="font-mono font-bold text-dark">
                    {transaction.billNo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {formatDate(transaction.date, 'long')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-bold px-2 py-1 rounded text-xs ${
                    transaction.status === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - GST & Shop Info */}
            <div className="space-y-2">
              <h3 className="font-bold text-dark mb-3">Billing Information</h3>
              <div className="space-y-1 text-sm bg-gray-50 p-3 rounded">
                <div className="flex justify-between">
                  <span className="text-gray-600">GST No.:</span>
                  <span className="font-mono font-medium text-dark">
                    {transaction.gstNo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shop Name:</span>
                  <span className="font-bold text-gray-900">
                    {transaction.shopName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3">
            <h3 className="font-bold text-dark">Transaction Details</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-100 to-accent-100 border-b-2 border-dark">
                    <th className="px-4 py-2 text-left font-bold text-dark">Description</th>
                    <th className="px-4 py-2 text-center font-bold text-dark">Quantity</th>
                    <th className="px-4 py-2 text-right font-bold text-dark">Unit Price</th>
                    <th className="px-4 py-2 text-right font-bold text-dark">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">
                      <div className="font-bold">Half-Kg Powder Jaggery Packets</div>
                      <div className="text-xs text-gray-500">Premium Quality</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold">
                        {transaction.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium">₹50.00</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-gray-900">
                        {formatCurrency(transaction.quantityAmount)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax Calculation */}
          <div className="space-y-2 bg-bg-cream rounded-lg p-4">
            <h3 className="font-bold text-dark mb-3">Tax & Amount Calculation</h3>

            <table className="w-full text-sm">
              <tbody className="space-y-2">
                <tr className="flex justify-between py-1 border-b border-accent-200">
                  <td className="text-gray-700 font-medium">Subtotal (Quantity Amount)</td>
                  <td className="font-bold text-gray-900">
                    {formatCurrency(transaction.quantityAmount)}
                  </td>
                </tr>
                <tr className="flex justify-between py-1 border-b border-accent-200">
                  <td className="text-gray-700 font-medium">
                    CGST @ 2.5%
                  </td>
                  <td className="font-bold text-green-600">
                    + {formatCurrency(transaction.cgst)}
                  </td>
                </tr>
                <tr className="flex justify-between py-1 border-b border-accent-200">
                  <td className="text-gray-700 font-medium">
                    SGST @ 2.5%
                  </td>
                  <td className="font-bold text-blue-600">
                    + {formatCurrency(transaction.sgst)}
                  </td>
                </tr>
                <tr className="flex justify-between py-2 text-lg border-t-2 border-dark font-bold pt-2">
                  <td className="text-dark">TOTAL AMOUNT PAYABLE</td>
                  <td className="text-primary-600">
                    {formatCurrency(transaction.totalAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* GST Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
              <p className="text-xs font-semibold text-gray-600 mb-1">CGST (2.5%)</p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(transaction.cgst)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
              <p className="text-xs font-semibold text-gray-600 mb-1">SGST (2.5%)</p>
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(transaction.sgst)}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
              <p className="text-xs font-semibold text-gray-600 mb-1">Total GST (5%)</p>
              <p className="text-lg font-bold text-purple-600">
                {formatCurrency(transaction.cgst + transaction.sgst)}
              </p>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-dark mb-2">Terms & Conditions</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Payment is due within 30 days from invoice date</li>
              <li>• GST is calculated at applicable rates</li>
              <li>• Please preserve this invoice for GST compliance</li>
              <li>• All goods are subject to our standard terms and conditions</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-dark pt-4 text-center">
            <p className="text-xs text-gray-500">
              {businessName} | Invoice Generated on {formatDate(new Date().toISOString())}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Thank you for your business!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t bg-gray-50 p-4 flex gap-3 print:hidden">
          <Button
            onClick={handlePrint}
            variant="primary"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </Button>
          <Button
            onClick={handleDownload}
            variant="secondary"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .print\:hidden {
            display: none;
          }
          .print\:p-0 {
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default TransactionDetails
