import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [results, setResults] = useState({ posts: [], tools: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true)
      setError('')
      
      const [posts, tools] = await Promise.all([
        blogService.search(searchQuery),
        toolService.search(searchQuery)
      ])
      
      setResults({ posts, tools })
    } catch (err) {
      setError('Failed to perform search. Please try again.')
      console.error('Error performing search:', err)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'all', label: 'All', count: results.posts.length + results.tools.length },
    { id: 'posts', label: 'Posts', count: results.posts.length },
    { id: 'tools', label: 'Tools', count: results.tools.length },
  ]

  const filteredResults = () => {
    switch (activeTab) {
      case 'posts':
        return { posts: results.posts, tools: [] }
      case 'tools':
        return { posts: [], tools: results.tools }
      default:
        return results
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
        <Error message={error} onRetry={() => performSearch(query)} />
      </div>
    )
  }

  const totalResults = results.posts.length + results.tools.length

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              Search Results
            </h1>
            <p className="text-xl text-slate-400 mb-4">
              Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
            </p>
            
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 w-fit">
              <ApperIcon name="Search" size={20} className="text-slate-400 mx-3" />
              <span className="text-slate-300 text-sm pr-3">{query}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
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

      {/* Results */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          {totalResults > 0 ? (
            <div className="space-y-12">
              {/* Tools Results */}
              {filteredResults().tools.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">
                    Tools ({filteredResults().tools.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults().tools.map((tool, index) => (
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

              {/* Posts Results */}
              {filteredResults().posts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">
                    Posts ({filteredResults().posts.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults().posts.map((post, index) => (
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
              title="No results found"
              description={`No content matches "${query}". Try different keywords or browse our categories.`}
              icon="Search"
              actionLabel="Browse All Content"
              onAction={() => window.location.href = '/'}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default SearchResults