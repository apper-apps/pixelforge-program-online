import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Footer = () => {
  const footerSections = [
    {
      title: 'Tools',
      links: [
        { name: 'PNG Converter', path: '/tools/png' },
        { name: 'JPEG Optimizer', path: '/tools/jpeg' },
        { name: 'WebP Generator', path: '/tools/webp' },
        { name: 'SVG Editor', path: '/tools/svg' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Tutorials', path: '/tutorials' },
        { name: 'Comparisons', path: '/comparisons' },
        { name: 'Blog', path: '/blog' },
        { name: 'Documentation', path: '/docs' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ]
    },
  ]

  const socialLinks = [
    { name: 'GitHub', icon: 'Github', url: 'https://github.com' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com' },
    { name: 'Discord', icon: 'MessageCircle', url: 'https://discord.com' },
  ]

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Image" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                PixelForge Pro
              </span>
            </Link>
            
            <p className="text-slate-400 mb-6 max-w-sm">
              Professional image conversion tools and tutorials for developers, 
              designers, and content creators.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                >
                  <ApperIcon name={social.icon} size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                Stay Updated
              </h3>
              <p className="text-slate-400">
                Get the latest tools and tutorials delivered to your inbox.
              </p>
            </div>
            
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-slate-800 border border-slate-600 rounded-l-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Button
                variant="primary"
                size="md"
                className="rounded-l-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">
              © 2024 PixelForge Pro. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer