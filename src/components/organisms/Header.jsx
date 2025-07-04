import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Comparisons', path: '/comparisons' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Image" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              PixelForge Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors relative ${
                  isActive(item.path)
                    ? 'text-indigo-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="w-64">
              <SearchBar placeholder="Quick search..." />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              <ApperIcon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <ApperIcon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-800 mt-4 pt-4"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-indigo-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-6 pt-4 border-t border-slate-800">
                <SearchBar placeholder="Search..." />
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="p-2"
                >
                  <ApperIcon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
                  <span className="ml-2">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header