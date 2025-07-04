import comments from '@/services/mockData/comments.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const commentService = {
  async getAll() {
    await delay(200)
    return [...comments]
  },

  async getById(id) {
    await delay(150)
    const comment = comments.find(c => c.Id === id)
    if (!comment) throw new Error('Comment not found')
    return { ...comment }
  },

  async getByPostId(postId) {
    await delay(250)
    return comments.filter(comment => comment.postId === postId)
  },

  async create(comment) {
    await delay(300)
    const newComment = {
      ...comment,
      Id: Math.max(...comments.map(c => c.Id)) + 1,
      timestamp: new Date().toISOString()
    }
    comments.push(newComment)
    return { ...newComment }
  },

  async update(id, updates) {
    await delay(250)
    const index = comments.findIndex(c => c.Id === id)
    if (index === -1) throw new Error('Comment not found')
    
    comments[index] = { ...comments[index], ...updates }
    return { ...comments[index] }
  },

  async delete(id) {
    await delay(200)
    const index = comments.findIndex(c => c.Id === id)
    if (index === -1) throw new Error('Comment not found')
    
    const deletedComment = comments.splice(index, 1)[0]
    return { ...deletedComment }
  }
}