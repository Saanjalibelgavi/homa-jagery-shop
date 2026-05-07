export default function Card({ children, className = '', variant = 'default' }) {
  const variantStyles = {
    default: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6',
    compact: 'bg-white rounded-lg shadow-sm p-4',
    elevated: 'bg-white rounded-lg shadow-lg p-6',
    bordered: 'bg-white rounded-lg border-2 border-earthy-light p-6',
    gradient: 'bg-gradient-to-br from-earthy-dark to-earthy-brown text-white rounded-lg shadow-lg p-6'
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  )
}
