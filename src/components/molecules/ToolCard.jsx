import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const ToolCard = ({ tool, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`card-gradient rounded-lg border border-slate-800 overflow-hidden hover-lift ${className}`}
    >
      <div className="relative">
        <img
          src={tool.screenshots[0]}
          alt={tool.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary" size="sm">
            {tool.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
          <div className="flex items-center text-white text-sm font-semibold">
            <ApperIcon name="Zap" size={16} className="mr-1 text-yellow-400" />
            {tool.performanceScore}%
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-100 mb-2">
          {tool.name}
        </h3>
        
        <p className="text-slate-400 mb-4 line-clamp-2">
          {tool.description}
        </p>
        
        <div className="mb-4">
          <div className="flex items-center text-sm text-slate-500 mb-2">
            <ApperIcon name="FileImage" size={14} className="mr-1" />
            Formats: {tool.supportedFormats.join(', ')}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                style={{ width: `${tool.performanceScore}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-slate-400">
              {tool.performanceScore}% efficient
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(tool.downloadUrl, '_blank')}
          >
            <ApperIcon name="Download" size={16} className="mr-1" />
            Download
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ToolCard