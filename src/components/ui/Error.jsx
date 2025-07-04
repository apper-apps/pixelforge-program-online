import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry, showRetry = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
        <div className="relative bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-full border border-red-500/20">
          <ApperIcon name="AlertTriangle" size={48} className="text-red-500" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-100 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate-400 mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
        >
          <ApperIcon name="RefreshCw" size={18} className="mr-2" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error