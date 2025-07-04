import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '@/components/organisms/Hero'
import BlogCard from '@/components/molecules/BlogCard'
import ToolCard from '@/components/molecules/ToolCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { blogService } from '@/services/api/blogService'
import { toolService } from '@/services/api/toolService'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [postsData, toolsData] = await Promise.all([
        blogService.getFeaturedPosts(),
        toolService.getFeaturedTools()
      ])
      
      setPosts(postsData)
      setTools(toolsData)
    } catch (err) {
      setError('Failed to load content. Please try again.')
      console.error('Error loading content:', err)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { name: 'PNG Tools', icon: 'Image', count: 12, color: 'from-blue-500 to-cyan-500' },
    { name: 'JPEG Tools', icon: 'Camera', count: 8, color: 'from-green-500 to-emerald-500' },
    { name: 'WebP Tools', icon: 'Zap', count: 6, color: 'from-purple-500 to-pink-500' },
    { name: 'SVG Tools', icon: 'Layers', count: 4, color: 'from-orange-500 to-red-500' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loading type="hero" />
        <div className="container mx-auto px-4 py-16">
          <Loading type="cards" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Error message={error} onRetry={loadContent} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Tools Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Featured Tools
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover our most popular image conversion tools, trusted by thousands 
              of developers and designers worldwide.
            </p>
          </motion.div>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.Id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty 
              title="No tools available"
              description="We're working on adding amazing tools for you!"
              icon="Wrench"
              actionLabel="View All Tools"
              onAction={() => window.location.href = '/tools'}
            />
          )}

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              as={Link}
              to="/tools"
              icon="ArrowRight"
              iconPosition="right"
            >
              View All Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Browse by Category
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Find the perfect tool for your specific image format needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="block group"
                >
                  <div className="card-gradient rounded-lg p-6 border border-slate-800 hover-lift">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <ApperIcon name={category.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" size="sm">
                        {category.count} tools
                      </Badge>
                      <ApperIcon name="ArrowRight" size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Latest Articles
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Stay updated with the latest tutorials, tips, and insights from our team.
            </p>
          </motion.div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post, index) => (
                <motion.div
                  key={post.Id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty 
              title="No articles available"
              description="We're working on publishing great content for you!"
              icon="BookOpen"
              actionLabel="View All Articles"
              onAction={() => window.location.href = '/tutorials'}
            />
          )}

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              as={Link}
              to="/tutorials"
              icon="ArrowRight"
              iconPosition="right"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home