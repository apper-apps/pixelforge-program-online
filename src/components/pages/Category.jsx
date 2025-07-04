import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import BlogCard from '@/components/molecules/BlogCard'
import ToolCard from '@/components/molecules/ToolCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { blogService } from '@/services/api/blogService'
import { toolService } from '@/services/api/toolService'

const Category = () => {
  const { category } = useParams()
  const [content, setContent] = useState({ posts: [], tools: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    loadCategoryContent()
  }, [category])

  const loadCategoryContent = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [posts, tools] = await Promise.all([
        blogService.getByCategory(category),
        toolService.getByCategory(category)
      ])
      
      setContent({ posts, tools })
    } catch (err) {
      setError('Failed to load category content. Please try again.')
      console.error('Error loading category content:', err)
    } finally {
      setLoading(false)
    }
  }

  const categoryInfo = {
    'png-tools': {
      title: 'PNG Tools',
      description: 'Professional PNG conversion and optimization tools',
      icon: 'Image',
      color: 'from-blue-500 to-cyan-500'
    },
    'jpeg-tools': {
      title: 'JPEG Tools',
      description: 'High-quality JPEG conversion and compression tools',
      icon: 'Camera',
      color: 'from-green-500 to-emerald-500'
    },
    'webp-tools': {
      title: 'WebP Tools',
      description: 'Modern WebP conversion for optimal web performance',
      icon: 'Zap',
      color: 'from-purple-500 to-pink-500'
    },
    'svg-tools': {
      title: 'SVG Tools',
      description: 'Vector graphics tools for scalable designs',
      icon: 'Layers',
      color: 'from-orange-500 to-red-500'
    }
  }

  const info = categoryInfo[category] || {
    title: category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: 'Discover tools and content in this category',
    icon: 'Folder',
    color: 'from-indigo-500 to-purple-500'
  }

  const tabs = [
    { id: 'all', label: 'All', count: content.posts.length + content.tools.length },
    { id: 'tools', label: 'Tools', count: content.tools.length },
    { id: 'posts', label: 'Posts', count: content.posts.length },
  ]

  const filteredContent = () => {
    switch (activeTab) {
      case 'tools':
        return { posts: [], tools: content.tools }
      case 'posts':
        return { posts: content.posts, tools: [] }
      default:
        return content
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
        <Error message={error} onRetry={loadCategoryContent} />
      </div>
    )
  }

  const totalContent = content.posts.length + content.tools.length

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
            <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <ApperIcon name={info.icon} size={32} className="text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              {info.title}
            </h1>
            
            <p className="text-xl text-slate-400 mb-8">
              {info.description}
            </p>
            
            <div className="flex items-center justify-center bg-slate-800 rounded-lg p-1 border border-slate-700 w-fit mx-auto">
              <ApperIcon name="Package" size={20} className="text-slate-400 mx-3" />
              <span className="text-slate-300 text-sm pr-3">
                {totalContent} item{totalContent !== 1 ? 's' : ''} available
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="whitespace-nowrap"
              >
                {tab.label} ({tab.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          {totalContent > 0 ? (
            <div className="space-y-12">
              {/* Tools */}
              {filteredContent().tools.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">
                    Tools ({filteredContent().tools.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent().tools.map((tool, index) => (
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
                </div>
              )}

              {/* Posts */}
              {filteredContent().posts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">
                    Posts ({filteredContent().posts.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent().posts.map((post, index) => (
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
                </div>
              )}
            </div>
          ) : (
            <Empty 
              title="No content in this category"
              description={`We're working on adding ${info.title.toLowerCase()} content for you!`}
              icon={info.icon}
              actionLabel="Browse All Categories"
              onAction={() => window.location.href = '/'}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Category