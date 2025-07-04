import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600',
    outline: 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-700',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  }

  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-lg
    transition-all duration-200 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : size === 'xl' ? 24 : 18

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <ApperIcon name="Loader2" size={iconSize} className="animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <ApperIcon name={icon} size={iconSize} className="mr-2" />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <ApperIcon name={icon} size={iconSize} className="ml-2" />
          )}
        </>
      )}
    </motion.button>
  )
}

export default Button