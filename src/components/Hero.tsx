import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINES = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  delay: i * 0.2,
  duration: 6 + Math.random() * 2,
  left: Math.random() * 100,
}))

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#4B0507',
      }}
    >

      {/* Content */}
      <div className="relative z-10 px-5 sm:px-8 md:px-16 py-20 md:py-32 text-center max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
          className="mb-8 md:mb-12"
        >
          <img
            src="/framed-logo-cream.png"
            alt="Framed"
            style={{ width: 'clamp(140px, 32vw, 420px)', height: 'auto' }}
            className="mx-auto mb-6 md:mb-8"
          />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#F5EFE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Seamless bottom blend */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 100%)',
        }}
      />
    </section>
  )
}
