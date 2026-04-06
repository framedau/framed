import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <footer ref={ref} className="bg-cream border-t border-ink/10">
      <div className="px-5 sm:px-8 md:px-16 py-12 md:py-16 max-w-7xl mx-auto">
        {/* Footer content */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-12">
          {/* Logo and branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <img
              src="/framed logo RED-16.PNG"
              alt="Framed"
              className="w-12 h-12 object-contain"
            />
            <span
              className="hidden md:inline font-display text-2xl font-light"
              style={{ color: '#4B0507' }}
            >
              Framed
            </span>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <a
              href="https://instagram.com/framed.adl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm tracking-widest uppercase text-ink/40 hover:text-ink/60 transition-colors"
            >
              Instagram
            </a>
          </motion.div>
        </div>

      </div>
    </footer>
  )
}
