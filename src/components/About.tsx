import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden pt-20 md:pt-32 pb-20 md:pb-32"
      style={{ backgroundColor: '#4B0507' }}
    >
      {/* Seamless top blend - very subtle */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 px-5 sm:px-8 md:px-16 grid md:grid-cols-12 gap-10 md:gap-8 items-center">
        {/* Left — parallax image/logo frame */}
        <div className="md:col-span-5 flex items-center justify-center">
          <motion.div
            className="relative"
            style={{ y: imgY, willChange: 'transform' }}
          >
            <img
              src="/framed pfp TRANSPARENT-10.png"
              alt="Framed monogram"
              className="w-80 h-80 object-contain"
            />
          </motion.div>
        </div>

        {/* Right — copy */}
        <div ref={headerRef} className="md:col-span-7 md:pl-8">
          <motion.p
            className="font-sans text-sm tracking-widest3 uppercase text-cream mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            About
          </motion.p>
          <motion.div
            className="space-y-7"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="font-sans text-base leading-relaxed text-cream/80 font-light">
              We are <span className="font-semibold">FRAMED</span>, founded by Martin & Luke, filmmakers from Adelaide, Australia. Our partnership grew from a shared passion for storytelling and filmmaking, and a spontaneous first wedding filmed together.
            </p>
            <p className="font-sans text-base leading-relaxed text-cream/80 font-light">
              Our goal is to create <span className="font-semibold">timeless</span> films that reflect your story. From intimate moments to big celebrations, we capture the emotions, laughter, and joy that make your day <span className="font-semibold">unforgettable</span>. Our passion of film is not just to make a video, but an <span className="font-semibold">experience</span> to re-live and connect to, which is why capturing weddings are so special to us.
            </p>
            <p className="font-sans text-base leading-relaxed text-cream/80 font-light">
              As a team, we bring two creative perspectives and double the dedication, ensuring every detail is preserved. Most importantly, <span className="italic">our heart</span> is to take the time to know <span className="italic">you</span> and what <span className="italic">you</span> are looking for, so your film feels natural, genuine, and uniquely yours.
            </p>
          </motion.div>

          {/* Signature quote */}
          <motion.blockquote
            className="mt-12 border-l-2 border-crimson/40 pl-5 -ml-5"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-display italic text-cream/80 text-lg leading-relaxed">
              "We're here to preserve your beautiful story, perfectly <span className="italic">framed</span> for a lifetime."
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
