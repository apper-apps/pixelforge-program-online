import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const CommentCard = ({ comment, onReply, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-slate-800 rounded-lg p-4 border border-slate-700 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {comment.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <h4 className="font-semibold text-slate-100">{comment.author}</h4>
            <p className="text-xs text-slate-400">
              {format(new Date(comment.timestamp), 'MMM d, yyyy at h:mm a')}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReply(comment.Id)}
        >
          <ApperIcon name="Reply" size={16} className="mr-1" />
          Reply
        </Button>
      </div>
      
      <div className="prose prose-slate prose-invert max-w-none">
        {comment.hasCode ? (
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{comment.content}</code>
            </pre>
          </div>
        ) : (
          <p className="text-slate-300 whitespace-pre-wrap">
            {comment.content}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default CommentCard