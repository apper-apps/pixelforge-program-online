import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import ScrollToTop from '@/components/organisms/ScrollToTop'

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-16"
      >
        <Outlet />
      </motion.main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout