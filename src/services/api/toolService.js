import tools from '@/services/mockData/tools.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const toolService = {
  async getAll() {
    await delay(300)
    return [...tools]
  },

  async getById(id) {
    await delay(200)
    const tool = tools.find(t => t.Id === id)
    if (!tool) throw new Error('Tool not found')
    return { ...tool }
  },

  async getFeaturedTools() {
    await delay(250)
    return tools.filter(tool => tool.featured).slice(0, 6)
  },

  async getByCategory(category) {
    await delay(300)
    const categoryMap = {
      'png-tools': 'PNG',
      'jpeg-tools': 'JPEG',
      'webp-tools': 'WebP',
      'svg-tools': 'SVG'
    }
    const mappedCategory = categoryMap[category] || category
    return tools.filter(tool => 
      tool.category.toLowerCase().includes(mappedCategory.toLowerCase())
    )
  },

  async search(query) {
    await delay(400)
    const lowercaseQuery = query.toLowerCase()
    return tools.filter(tool =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.category.toLowerCase().includes(lowercaseQuery) ||
      tool.supportedFormats.some(format => 
        format.toLowerCase().includes(lowercaseQuery)
      )
    )
  },

  async create(tool) {
    await delay(500)
    const newTool = {
      ...tool,
      Id: Math.max(...tools.map(t => t.Id)) + 1,
      featured: false
    }
    tools.push(newTool)
    return { ...newTool }
  },

  async update(id, updates) {
    await delay(400)
    const index = tools.findIndex(t => t.Id === id)
    if (index === -1) throw new Error('Tool not found')
    
    tools[index] = { ...tools[index], ...updates }
    return { ...tools[index] }
  },

  async delete(id) {
    await delay(300)
    const index = tools.findIndex(t => t.Id === id)
    if (index === -1) throw new Error('Tool not found')
    
    const deletedTool = tools.splice(index, 1)[0]
    return { ...deletedTool }
  }
}