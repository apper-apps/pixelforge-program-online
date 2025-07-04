import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ToolCard from '@/components/molecules/ToolCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { toolService } from '@/services/api/toolService'

const Tools = () => {
  const [tools, setTools] = useState([])
  const [filteredTools, setFilteredTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadTools()
  }, [])

  useEffect(() => {
    filterTools()
  }, [tools, selectedCategory, searchQuery])

  const loadTools = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await toolService.getAll()
      setTools(data)
    } catch (err) {
      setError('Failed to load tools. Please try again.')
      console.error('Error loading tools:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterTools = () => {
    let filtered = tools

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => 
        tool.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.supportedFormats.some(format => 
          format.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    setFilteredTools(filtered)
  }

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'PNG Tools', value: 'png' },
    { name: 'JPEG Tools', value: 'jpeg' },
    { name: 'WebP Tools', value: 'webp' },
    { name: 'SVG Tools', value: 'svg' },
    { name: 'Converters', value: 'converter' },
    { name: 'Optimizers', value: 'optimizer' },
  ]

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
        <Error message={error} onRetry={loadTools} />
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
              Professional Image <span className="gradient-text">Conversion Tools</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Discover our comprehensive collection of image conversion tools, 
              designed for developers and designers who demand quality and performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <ApperIcon name="Zap" size={20} className="text-yellow-400 mx-3" />
                <span className="text-slate-300 text-sm">50+ Tools Available</span>
              </div>
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <ApperIcon name="Shield" size={20} className="text-green-400 mx-3" />
                <span className="text-slate-300 text-sm">100% Privacy Protected</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools by name, description, or format..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ApperIcon name="Search" size={20} className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          {filteredTools.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-100">
                  {selectedCategory === 'all' 
                    ? `All Tools (${filteredTools.length})`
                    : `${categories.find(c => c.value === selectedCategory)?.name} (${filteredTools.length})`
                  }
                </h2>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Sort by:</span>
                  <select className="bg-slate-800 border border-slate-600 rounded text-slate-100 px-3 py-1 text-sm">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Performance</option>
                    <option>Name A-Z</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ToolCard tool={tool} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <Empty 
              title="No tools found"
              description={`No tools match your current filters. Try adjusting your search or category selection.`}
              icon="Search"
              actionLabel="Clear Filters"
              onAction={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Tools