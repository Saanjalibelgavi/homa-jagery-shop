export default function StatusBadge({ status, variant = 'default' }) {
  const getStatusStyles = (status, variant) => {
    if (variant === 'payment') {
      switch (status) {
        case 'Paid':
          return 'bg-green-100 text-green-800'
        case 'Partial':
          return 'bg-blue-100 text-blue-800'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    if (variant === 'active') {
      return status === 'Active'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800'
    }

    if (variant === 'transaction') {
      return status === 'Paid'
        ? 'bg-green-100 text-green-800'
        : 'bg-yellow-100 text-yellow-800'
    }

    return 'bg-gray-100 text-gray-800'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(status, variant)}`}>
      {status}
    </span>
  )
}
