import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">PixelForge Pro</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Master the art of image conversion with professional tools, 
            tutorials, and expert insights
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              icon="ArrowRight"
              iconPosition="right"
              as={Link}
              to="/tools"
            >
              Explore Tools
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              icon="PlayCircle"
              as={Link}
              to="/tutorials"
            >
              Watch Tutorials
            </Button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: 'Zap',
              title: 'Lightning Fast',
              description: 'Convert images in milliseconds with optimized algorithms'
            },
            {
              icon: 'Shield',
              title: 'Privacy First',
              description: 'Your images never leave your device during conversion'
            },
            {
              icon: 'Layers',
              title: 'Multiple Formats',
              description: 'Support for 50+ image formats including WebP, AVIF, and more'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="card-gradient p-6 rounded-lg border border-slate-800 hover-lift"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name={feature.icon} size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ApperIcon name="ChevronDown" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero