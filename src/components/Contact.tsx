import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const budgets = ['$3k – $5k', '$5k – $10k', '$10k – $15k', '$15k+']
const services = ['Highlight Reel', 'Full Film', 'Ceremony', 'Reception', 'Speeches', 'Teaser Video']
const FORMSPREE_ID = 'xaqldnbl'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '', email: '', budget: '', service: [] as string[], message: '',
  })

  // Email validation helper
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!form.budget) {
      newErrors.budget = 'Please select a budget'
    }

    if (form.service.length === 0) {
      newErrors.service = 'Please select at least one service'
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please tell us more about your vision'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Send to Formspree
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          budget: form.budget,
          services: form.service.join(', '),
          message: form.message,
        }),
      })

      if (response.ok) {
        setSent(true)
        setForm({ name: '', email: '', budget: '', service: [], message: '' })
        setErrors({})
      } else {
        setErrors({ submit: 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-5 sm:px-8 md:px-16 bg-cream">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <motion.p
            className="font-sans text-sm tracking-widest3 uppercase mb-4"
            style={{ color: '#4B0507' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            Contact
          </motion.p>
          <motion.h2
            className="font-display font-light text-ink"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)', lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.645, 0.045, 0.355, 1] }}
          >
            Start a<br />
            <span className="italic" style={{ color: '#4B0507' }}>conversation.</span>
          </motion.h2>
          <div className="rule mt-6" />
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
        >
          {sent ? (
            <div className="py-20 text-center">
              <p className="font-display italic text-5xl text-crimson font-light mb-4">
                Got it.
              </p>
              <p className="font-sans text-sm text-ink/40 tracking-wider">
                We'll follow up within a day, usually sooner.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div
                className="space-y-8"
                style={{ backgroundColor: '#4B0507', padding: 'clamp(1.25rem, 5vw, 3rem)', border: '1px solid rgba(75,5,7,0.15)' }}
              >
                {/* Contact info */}
                <div className="space-y-6">
                  <div className="group">
                    <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-cream/30 pb-3 font-sans text-sm text-cream placeholder:text-cream/40
                                 focus:outline-none focus:border-cream/60 transition-colors duration-300"
                    />
                    {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="group">
                    <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="framed.adl@gmail.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-cream/30 pb-3 font-sans text-sm text-cream placeholder:text-cream/40
                                 focus:outline-none focus:border-cream/60 transition-colors duration-300"
                    />
                    {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Budget selector */}
                <div>
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-4">
                    Estimated Budget
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {budgets.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, budget: b }))}
                        className="font-sans text-sm uppercase tracking-widest px-4 py-2.5 border transition-colors duration-300"
                        style={{
                          borderColor: form.budget === b ? '#F5EFE0' : 'rgba(245,239,224,0.25)',
                          color: form.budget === b ? '#4B0507' : 'rgba(245,239,224,0.65)',
                          backgroundColor: form.budget === b ? '#F5EFE0' : 'transparent',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {errors.budget && <p className="text-red-300 text-xs mt-2">{errors.budget}</p>}
                </div>

                {/* Service selector — multi-select */}
                <div>
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-4">
                    What you'd like
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {services.map(s => {
                      const isSelected = form.service.includes(s)
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm(f => ({
                            ...f,
                            service: isSelected
                              ? f.service.filter(item => item !== s)
                              : [...f.service, s]
                          }))}
                          className="font-sans text-sm uppercase tracking-widest px-4 py-2.5 border transition-colors duration-300"
                          style={{
                            borderColor: isSelected ? '#F5EFE0' : 'rgba(245,239,224,0.25)',
                            color: isSelected ? '#4B0507' : 'rgba(245,239,224,0.65)',
                            backgroundColor: isSelected ? '#F5EFE0' : 'transparent',
                          }}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                  {errors.service && <p className="text-red-300 text-xs mt-2">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-4">
                    Tell us more
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Any details about your wedding or vision..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-transparent border-b border-cream/30 pb-3 font-sans text-sm text-cream placeholder:text-cream/40
                               focus:outline-none focus:border-cream/60 transition-colors duration-300 resize-none"
                  />
                  {errors.message && <p className="text-red-300 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit error */}
                {errors.submit && (
                  <p className="text-red-300 text-sm">{errors.submit}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-sans text-sm tracking-wider" style={{ color: '#4B0507' }}>
                  Usually back within a day.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center gap-3 font-sans text-sm tracking-widest2 uppercase
                             bg-crimson text-cream px-6 py-3 sm:px-8 sm:py-4 hover:bg-crimson-dark transition-colors duration-300 w-full sm:w-auto justify-center sm:justify-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                  {!loading && (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
