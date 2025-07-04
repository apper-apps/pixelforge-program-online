import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search tools, tutorials, and guides..." }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`)
      }
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-2xl mx-auto"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 bg-slate-800 border border-slate-600 rounded-l-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" size={20} className="text-slate-400" />
        </div>
      </div>
      
      <Button 
        type="submit"
        variant="primary"
        size="lg"
        className="rounded-l-none px-6"
        disabled={!query.trim()}
      >
        Search
      </Button>
    </motion.form>
  )
}

export default SearchBar