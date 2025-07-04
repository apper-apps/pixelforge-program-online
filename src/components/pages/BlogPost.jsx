import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import CommentCard from '@/components/molecules/CommentCard'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { blogService } from '@/services/api/blogService'
import { commentService } from '@/services/api/commentService'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newComment, setNewComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [postData, commentsData] = await Promise.all([
        blogService.getById(parseInt(id)),
        commentService.getByPostId(parseInt(id))
      ])
      
      setPost(postData)
      setComments(commentsData)
    } catch (err) {
      setError('Failed to load post. Please try again.')
      console.error('Error loading post:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      setCommentLoading(true)
      
      const comment = {
        content: newComment,
        author: 'Anonymous User',
        postId: parseInt(id),
        hasCode: newComment.includes('```')
      }
      
      const createdComment = await commentService.create(comment)
      setComments(prev => [...prev, createdComment])
      setNewComment('')
    } catch (err) {
      console.error('Error adding comment:', err)
    } finally {
      setCommentLoading(false)
    }
  }

  const handleReply = (commentId) => {
    // Implementation for reply functionality
    console.log('Reply to comment:', commentId)
  }

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
        <Error message={error} onRetry={loadPost} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16">
        <Empty 
          title="Post not found"
          description="The post you're looking for doesn't exist or has been removed."
          icon="FileText"
          actionLabel="Back to Home"
          onAction={() => window.location.href = '/'}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <article className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary" size="sm">
                  {post.category}
                </Badge>
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between text-slate-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ApperIcon name="User" size={16} className="mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Calendar" size={16} className="mr-1" />
                    {format(new Date(post.publishDate), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Clock" size={16} className="mr-1" />
                    5 min read
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Share" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Bookmark" size={16} />
                  </Button>
                </div>
              </div>
            </motion.header>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-slate prose-invert max-w-none mb-12"
            >
              <div className="card-gradient rounded-lg p-8 border border-slate-800">
                <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </motion.div>

            {/* Tool Data */}
            {post.toolData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <div className="card-gradient rounded-lg p-6 border border-slate-800">
                  <h3 className="text-xl font-bold text-slate-100 mb-4">
                    Tool Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {post.toolData.performanceScore}%
                      </div>
                      <div className="text-sm text-slate-400">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {post.toolData.compressionRatio}%
                      </div>
                      <div className="text-sm text-slate-400">Compression</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {post.toolData.processingTime}ms
                      </div>
                      <div className="text-sm text-slate-400">Processing Time</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Comments Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-t border-slate-800 pt-12"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-8">
                Comments ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="card-gradient rounded-lg p-6 border border-slate-800">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts or ask a question..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-slate-400">
                      Tip: Use ``` to format code blocks
                    </p>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      loading={commentLoading}
                      disabled={!newComment.trim()}
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <CommentCard
                      key={comment.Id}
                      comment={comment}
                      onReply={handleReply}
                    />
                  ))
                ) : (
                  <Empty
                    title="No comments yet"
                    description="Be the first to share your thoughts on this post!"
                    icon="MessageCircle"
                    className="py-8"
                  />
                )}
              </div>
            </motion.section>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPost