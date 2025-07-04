import blogPosts from '@/services/mockData/blogPosts.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const blogService = {
  async getAll() {
    await delay(300)
    return [...blogPosts]
  },

  async getById(id) {
    await delay(200)
    const post = blogPosts.find(p => p.Id === id)
    if (!post) throw new Error('Post not found')
    return { ...post }
  },

  async getFeaturedPosts() {
    await delay(250)
    return blogPosts.filter(post => post.featured).slice(0, 6)
  },

  async getByCategory(category) {
    await delay(300)
    const categoryMap = {
      'png-tools': 'PNG Tools',
      'jpeg-tools': 'JPEG Tools',
      'webp-tools': 'WebP Tools',
      'svg-tools': 'SVG Tools'
    }
    const mappedCategory = categoryMap[category] || category
    return blogPosts.filter(post => 
      post.category.toLowerCase().includes(mappedCategory.toLowerCase())
    )
  },

  async search(query) {
    await delay(400)
    const lowercaseQuery = query.toLowerCase()
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    )
  },

  async create(post) {
    await delay(500)
    const newPost = {
      ...post,
      Id: Math.max(...blogPosts.map(p => p.Id)) + 1,
      publishDate: new Date().toISOString(),
      featured: false
    }
    blogPosts.push(newPost)
    return { ...newPost }
  },

  async update(id, updates) {
    await delay(400)
    const index = blogPosts.findIndex(p => p.Id === id)
    if (index === -1) throw new Error('Post not found')
    
    blogPosts[index] = { ...blogPosts[index], ...updates }
    return { ...blogPosts[index] }
  },

  async delete(id) {
    await delay(300)
    const index = blogPosts.findIndex(p => p.Id === id)
    if (index === -1) throw new Error('Post not found')
    
    const deletedPost = blogPosts.splice(index, 1)[0]
    return { ...deletedPost }
  }
}