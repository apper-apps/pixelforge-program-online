import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const BlogCard = ({ post, className = '' }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`card-gradient rounded-lg border border-slate-800 overflow-hidden hover-lift ${className}`}
    >
      <Link to={`/post/${post.Id}`}>
        <div className="relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="primary" size="sm">
              {post.category}
            </Badge>
          </div>
          {post.toolData?.performanceScore && (
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
              <div className="flex items-center text-white text-sm font-semibold">
                <ApperIcon name="Zap" size={16} className="mr-1 text-yellow-400" />
                {post.toolData.performanceScore}%
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-100 mb-2 hover:text-indigo-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-slate-400 mb-4 line-clamp-2">
            {post.excerpt || post.content.substring(0, 150) + '...'}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-slate-500">
              <ApperIcon name="Calendar" size={14} className="mr-1" />
              {format(new Date(post.publishDate), 'MMM d, yyyy')}
            </div>
            
            <div className="flex items-center text-sm text-slate-500">
              <ApperIcon name="User" size={14} className="mr-1" />
              {post.author}
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" size="xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogCard