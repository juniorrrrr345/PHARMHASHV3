import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const BackButton = ({ to = "/", text = "Retour au menu", className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`mb-4 sm:mb-6 ${className}`}
    >
      <Link 
        to={to}
        className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
      >
        <motion.div
          whileHover={{ x: -5 }}
          className="text-xl"
        >
          ←
        </motion.div>
        <span className="text-sm sm:text-base font-medium group-hover:underline">
          {text}
        </span>
      </Link>
    </motion.div>
  )
}

export default BackButton