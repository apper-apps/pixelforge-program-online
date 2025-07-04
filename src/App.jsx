import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import Tools from '@/components/pages/Tools'
import Tutorials from '@/components/pages/Tutorials'
import Comparisons from '@/components/pages/Comparisons'
import About from '@/components/pages/About'
import Contact from '@/components/pages/Contact'
import BlogPost from '@/components/pages/BlogPost'
import SearchResults from '@/components/pages/SearchResults'
import Category from '@/components/pages/Category'
import NotFound from '@/components/pages/NotFound'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="tools" element={<Tools />} />
              <Route path="tutorials" element={<Tutorials />} />
              <Route path="comparisons" element={<Comparisons />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="post/:id" element={<BlogPost />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="category/:category" element={<Category />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="z-50"
        />
      </div>
    </Router>
  )
}

export default App