import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: 'Mail',
      title: 'Email',
      description: 'Send us an email anytime',
      value: 'hello@pixelforge.pro'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Chat with our team',
      value: 'Available 24/7'
    },
    {
      icon: 'MapPin',
      title: 'Office',
      description: 'Visit our headquarters',
      value: 'San Francisco, CA'
    },
    {
      icon: 'Phone',
      title: 'Phone',
      description: 'Call us during business hours',
      value: '+1 (555) 123-4567'
    }
  ]

  const faqs = [
    {
      question: 'How do I convert images using your tools?',
      answer: 'Simply select the tool you need, upload your image, choose your settings, and download the converted result. All processing happens in your browser for privacy.'
    },
    {
      question: 'Are my images stored on your servers?',
      answer: 'No, all image processing happens locally in your browser. We never store, access, or transmit your images to our servers.'
    },
    {
      question: 'What image formats do you support?',
      answer: 'We support 50+ formats including JPG, PNG, WebP, AVIF, SVG, GIF, TIFF, and many more. Check our tools page for the complete list.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'The limit depends on your browser and device memory. Most modern browsers can handle files up to 100MB without issues.'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Have questions, feedback, or need help? We're here to assist you. 
              Reach out and let's start a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-gradient rounded-lg p-8 border border-slate-800"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-6">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                
                <Input
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your question or feedback..."
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-6">
                  Contact Information
                </h2>
                <p className="text-slate-400 mb-8">
                  Choose the best way to reach us. We're here to help and would love to hear from you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-gradient rounded-lg p-6 border border-slate-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <ApperIcon name={info.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-2">
                      {info.description}
                    </p>
                    <p className="text-indigo-400 font-medium">
                      {info.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="card-gradient rounded-lg p-6 border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Twitter', icon: 'Twitter' },
                    { name: 'GitHub', icon: 'Github' },
                    { name: 'LinkedIn', icon: 'Linkedin' },
                    { name: 'Discord', icon: 'MessageCircle' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                    >
                      <ApperIcon name={social.icon} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Quick answers to common questions about our tools and services.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-gradient rounded-lg p-6 border border-slate-800"
              >
                <h3 className="text-lg font-semibold text-slate-100 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-400">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact