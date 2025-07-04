import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label,
  type = 'text',
  error,
  icon,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = `
    w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
    text-slate-100 placeholder-slate-400
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    transition-all duration-200
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${icon ? 'pl-10' : ''}
    ${className}
  `

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-slate-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={baseClasses}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <ApperIcon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input