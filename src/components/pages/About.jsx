import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const About = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Full-stack developer with 8+ years of experience in image processing and web technologies.',
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Creative designer passionate about user experience and modern web design principles.',
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Emma Thompson',
      role: 'Technical Writer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Technical writer and developer advocate with expertise in creating clear documentation.',
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
  ]

  const stats = [
    { label: 'Active Users', value: '50,000+', icon: 'Users' },
    { label: 'Tools Available', value: '50+', icon: 'Wrench' },
    { label: 'Images Converted', value: '10M+', icon: 'Image' },
    { label: 'Countries Served', value: '150+', icon: 'Globe' },
  ]

  const values = [
    {
      icon: 'Shield',
      title: 'Privacy First',
      description: 'Your images are processed locally in your browser. We never store or access your files.'
    },
    {
      icon: 'Zap',
      title: 'Performance',
      description: 'Optimized algorithms ensure fast conversion times without compromising quality.'
    },
    {
      icon: 'Heart',
      title: 'User-Centric',
      description: 'Every feature is designed with user experience and accessibility in mind.'
    },
    {
      icon: 'Code',
      title: 'Open Source',
      description: 'We believe in transparency and contribute back to the developer community.'
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              About <span className="gradient-text">PixelForge Pro</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              We're a team of passionate developers and designers dedicated to creating 
              the best image conversion tools and educational resources for the web community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} size={24} className="text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Our Story</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Born from the need for better image conversion tools that respect user privacy 
                and deliver exceptional performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate prose-invert max-w-none"
            >
              <div className="card-gradient rounded-lg p-8 border border-slate-800">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  PixelForge Pro was created in 2023 when our team of developers and designers 
                  became frustrated with existing image conversion tools that were either too 
                  slow, required uploads to external servers, or lacked the features professionals needed.
                </p>
                
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  We set out to build something different - a platform that prioritizes user privacy 
                  by processing images locally in the browser, delivers lightning-fast performance 
                  through optimized algorithms, and provides comprehensive educational resources 
                  to help developers master image conversion techniques.
                </p>
                
                <p className="text-slate-300 text-lg leading-relaxed">
                  Today, PixelForge Pro is used by thousands of developers, designers, and content 
                  creators worldwide who trust us to provide the tools and knowledge they need 
                  to work with images effectively and efficiently.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Our Values</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do at PixelForge Pro.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-gradient rounded-lg p-6 border border-slate-800"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name={value.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Meet the Team</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The talented individuals behind PixelForge Pro who make it all possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-gradient rounded-lg p-6 border border-slate-800 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-slate-100 mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-400 mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm mb-4">{member.bio}</p>
                
                <div className="flex justify-center space-x-3">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                    >
                      <ApperIcon 
                        name={platform === 'github' ? 'Github' : platform === 'linkedin' ? 'Linkedin' : 'Twitter'} 
                        size={14} 
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 mb-8">
              Join thousands of developers and designers who trust PixelForge Pro 
              for their image conversion needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon="ArrowRight"
                iconPosition="right"
                onClick={() => window.location.href = '/tools'}
              >
                Explore Tools
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon="MessageCircle"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About