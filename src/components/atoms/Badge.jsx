import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
    secondary: 'bg-slate-600 text-slate-100',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  }

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-sm',
    md: 'px-3 py-1.5 text-base',
    lg: 'px-4 py-2 text-lg',
  }

  const baseClasses = `
    inline-flex items-center font-semibold rounded-full
    transition-all duration-200
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={baseClasses}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export default Badge