import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { comparisonService } from '@/services/api/comparisonService'

const Comparisons = () => {
  const [comparisons, setComparisons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadComparisons()
  }, [])

  const loadComparisons = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await comparisonService.getAll()
      setComparisons(data)
    } catch (err) {
      setError('Failed to load comparisons. Please try again.')
      console.error('Error loading comparisons:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-16">
          <Loading type="cards" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16">
        <Error message={error} onRetry={loadComparisons} />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              Tool <span className="gradient-text">Comparisons</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Compare different image conversion tools side-by-side to find the perfect 
              solution for your specific needs and workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <ApperIcon name="BarChart3" size={20} className="text-purple-400 mx-3" />
                <span className="text-slate-300 text-sm">Performance Metrics</span>
              </div>
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <ApperIcon name="CheckCircle" size={20} className="text-green-400 mx-3" />
                <span className="text-slate-300 text-sm">Expert Analysis</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          {comparisons.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {comparisons.map((comparison, index) => (
                <motion.div
                  key={comparison.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-gradient rounded-lg border border-slate-800 overflow-hidden hover-lift"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-100">
                        {comparison.title}
                      </h3>
                      <Badge variant="primary" size="sm">
                        {comparison.category}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-400 mb-6">
                      {comparison.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {comparison.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <img 
                              src={tool.icon} 
                              alt={tool.name}
                              className="w-6 h-6 rounded mr-2"
                            />
                            <h4 className="font-semibold text-slate-100">{tool.name}</h4>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Performance</span>
                              <span className="text-slate-300">{tool.performance}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Size</span>
                              <span className="text-slate-300">{tool.size}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Rating</span>
                              <div className="flex items-center">
                                <ApperIcon name="Star" size={14} className="text-yellow-400 mr-1" />
                                <span className="text-slate-300">{tool.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-slate-500">
                        <ApperIcon name="Clock" size={14} className="mr-1" />
                        {comparison.readTime} min read
                      </div>
                      <Button variant="outline" size="sm">
                        Read Comparison
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty 
              title="No comparisons available"
              description="We're working on creating detailed tool comparisons for you!"
              icon="BarChart3"
              actionLabel="Request Comparison"
              onAction={() => window.location.href = '/contact'}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Comparisons