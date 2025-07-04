import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Large 404 */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="relative text-8xl md:text-9xl font-bold gradient-text">
              404
            </div>
          </div>

          {/* Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto opacity-80">
              <ApperIcon name="SearchX" size={48} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track!
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon="Home"
              as={Link}
              to="/"
            >
              Go Home
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              icon="Search"
              as={Link}
              to="/search"
            >
              Search Site
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-slate-400 mb-4">
              Or try one of these popular sections:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                to="/tools"
                className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                <ApperIcon name="Wrench" size={16} className="mr-2" />
                Tools
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                <ApperIcon name="BookOpen" size={16} className="mr-2" />
                Tutorials
              </Link>
              <Link
                to="/comparisons"
                className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                <ApperIcon name="BarChart3" size={16} className="mr-2" />
                Comparisons
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                <ApperIcon name="Info" size={16} className="mr-2" />
                About
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound