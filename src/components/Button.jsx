export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ...props
}) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2'

  const variantStyles = {
    primary: 'bg-earthy-green text-white hover:bg-earthy-dark disabled:bg-gray-400',
    secondary: 'bg-earthy-light text-earthy-dark hover:bg-earthy-brown disabled:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
    ghost: 'text-earthy-green hover:bg-earthy-cream disabled:text-gray-400',
    outline: 'border-2 border-earthy-green text-earthy-green hover:bg-earthy-cream disabled:border-gray-400 disabled:text-gray-400'
  }

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
