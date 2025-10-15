import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

const Contact = () => {
  const [socials, setSocials] = useState([])

  useEffect(() => {
    const fetchSocials = async () => {
      const { getAll } = await import('../utils/api')
      const data = await getAll('socials')
      setSocials(data)
    }
    fetchSocials()
  }, [])

  return (
    <div className="min-h-screen cosmic-bg">
      <div className="pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Bouton Retour */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Retour au menu</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 flex justify-center"
          >
            <div className="inline-block bg-black/90 backdrop-blur-xl rounded-full px-16 py-10 border-2 border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              <h1 className="text-5xl md:text-7xl font-bold mb-3 text-white">
                Contactez-Nous
              </h1>
              <p className="text-lg text-gray-300">
                Une question ? N'hésitez pas à nous contacter
              </p>
            </div>
          </motion.div>

          {/* Réseaux Sociaux */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="neon-border rounded-2xl p-8 bg-slate-900/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-theme-heading mb-6 flex items-center justify-center">
                <span className="text-4xl mr-3">🌐</span>
                Réseaux Sociaux
              </h3>
                <div className="space-y-3">
                  {socials.map((social) => (
                    <SocialLink 
                      key={social.id}
                      icon={social.icon} 
                      name={social.name} 
                      description={social.description}
                      href={social.url}
                    />
                  ))}
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

const SocialLink = ({ icon, name, description, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-start p-4 bg-slate-800/50 rounded-xl border border-gray-700/20 hover:border-white/50 transition-all cursor-pointer group"
  >
    <span className="text-3xl mr-4 group-hover:scale-110 transition-transform">{icon}</span>
    <div className="flex-1">
      <h4 className="text-theme-heading font-semibold text-lg mb-1">{name}</h4>
      <p className="text-theme-secondary text-sm">{description}</p>
    </div>
    <span className="text-theme-heading text-xl group-hover:translate-x-1 transition-transform">→</span>
  </motion.a>
)

export default Contact
