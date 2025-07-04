import comparisons from '@/services/mockData/comparisons.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const comparisonService = {
  async getAll() {
    await delay(300)
    return [...comparisons]
  },

  async getById(id) {
    await delay(200)
    const comparison = comparisons.find(c => c.Id === id)
    if (!comparison) throw new Error('Comparison not found')
    return { ...comparison }
  },

  async create(comparison) {
    await delay(500)
    const newComparison = {
      ...comparison,
      Id: Math.max(...comparisons.map(c => c.Id)) + 1
    }
    comparisons.push(newComparison)
    return { ...newComparison }
  },

  async update(id, updates) {
    await delay(400)
    const index = comparisons.findIndex(c => c.Id === id)
    if (index === -1) throw new Error('Comparison not found')
    
    comparisons[index] = { ...comparisons[index], ...updates }
    return { ...comparisons[index] }
  },

  async delete(id) {
    await delay(300)
    const index = comparisons.findIndex(c => c.Id === id)
    if (index === -1) throw new Error('Comparison not found')
    
    const deletedComparison = comparisons.splice(index, 1)[0]
    return { ...deletedComparison }
  }
}