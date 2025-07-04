import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BlogCard from '@/components/molecules/BlogCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { blogService } from '@/services/api/blogService'

const Tutorials = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, selectedCategory, searchQuery])

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await blogService.getAll()
      setPosts(data)
    } catch (err) {
      setError('Failed to load tutorials. Please try again.')
      console.error('Error loading tutorials:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    setFilteredPosts(filtered)
  }

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Tutorials', value: 'tutorial' },
    { name: 'Guides', value: 'guide' },
    { name: 'Tips & Tricks', value: 'tips' },
    { name: 'Best Practices', value: 'best-practices' },
    { name: 'Tool Reviews', value: 'review' },
    { name: 'Performance', value: 'performance' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-16">
          <Loading type="posts" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16">
        <Error message={error} onRetry={loadPosts} />
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
              Learn Image <span className="gradient-text">Conversion</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Master the art of image conversion with our comprehensive tutorials, 
              guides, and expert tips for developers and designers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <ApperIcon name="BookOpen" size={20} className="text-blue-400 mx-3" />
                <span className="text-slate-300 text-sm">100+ Tutorials</span>
              </div>
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <ApperIcon name="Users" size={20} className="text-green-400 mx-3" />
                <span className="text-slate-300 text-sm">Expert Authors</span>
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
                  placeholder="Search tutorials by title, content, or tags..."
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

      {/* Posts Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-100">
                  {selectedCategory === 'all' 
                    ? `All Tutorials (${filteredPosts.length})`
                    : `${categories.find(c => c.value === selectedCategory)?.name} (${filteredPosts.length})`
                  }
                </h2>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Sort by:</span>
                  <select className="bg-slate-800 border border-slate-600 rounded text-slate-100 px-3 py-1 text-sm">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>A-Z</option>
                    <option>Reading Time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <Empty 
              title="No tutorials found"
              description={`No tutorials match your current filters. Try adjusting your search or category selection.`}
              icon="BookOpen"
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

export default Tutorials