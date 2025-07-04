import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No content found", 
  description = "There's nothing here yet. Check back later or try a different search.",
  icon = "Search",
  actionLabel = "Browse All Content",
  onAction,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex flex-col items-center justify-center min-h-[400px] p-8 text-center ${className}`}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"></div>
        <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 rounded-full border border-indigo-500/20">
          <ApperIcon name={icon} size={48} className="text-indigo-400" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-100 mb-2">
        {title}
      </h3>
      
      <p className="text-slate-400 mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
        >
          <ApperIcon name="ArrowRight" size={18} className="mr-2" />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty