import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { ChevronDown, Sun, Moon, Code2, Palette, Rocket, Sparkles } from 'lucide-react'

export default function App() {
  const [motionPref, setMotionPref] = useState('no-preference')
  useEffect(() => {
    try {
      const saved = localStorage.getItem('limitless-motion')
      if (saved) setMotionPref(saved)
      else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setMotionPref('reduce')
    } catch {}
  }, [])
  const toggleMotion = () => {
    const next = motionPref === 'no-preference' ? 'reduce' : 'no-preference'
    setMotionPref(next)
    try { localStorage.setItem('limitless-motion', next) } catch {}
  }

  // cursor tilt for hero
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-50, 50], [8, -8])
  const rotY = useTransform(x, [-50, 50], [-8, 8])
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      x.set(dx * 50)
      y.set(dy * 50)
    }
    if (motionPref !== 'reduce') window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [motionPref, x, y])

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/5 bg-black/30 px-4 py-3 backdrop-blur-md">
            <a href="#top" className="text-xl font-semibold tracking-tight text-white hover:text-blue-400 transition-colors">Limitless</a>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
                <a className="hover:text-white transition-colors" href="#about">About</a>
                <a className="hover:text-white transition-colors" href="#services">Services</a>
                <a className="hover:text-white transition-colors" href="#work">Work</a>
                <a className="hover:text-white transition-colors" href="#contact">Contact</a>
              </nav>
              <button onClick={toggleMotion} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors" aria-pressed={motionPref === 'reduce'} aria-label="Toggle reduced motion">
                {motionPref === 'reduce' ? (<><Moon size={14} className="text-blue-400" /> Reduced Motion</>) : (<><Sun size={14} className="text-yellow-300" /> Motion On</>)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section id="top" className="relative min-h-screen w-full overflow-hidden bg-[#0b0c10]">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#0b0c10]" />

        <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center" transition={{ type: 'spring', stiffness: 60, damping: 20 }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="bg-gradient-to-br from-white via-white to-blue-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Design & Development
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Without Limits</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-6 max-w-2xl text-balance text-base text-white/70 sm:text-lg">
            We craft expressive digital products and brand systems with a premium, future-facing aesthetic.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-10 flex items-center gap-4">
            <a href="#about" className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]">Explore the work</a>
          </motion.div>
          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70">
            <div className="flex flex-col items-center text-xs">
              <span>Scroll</span>
              <ChevronDown className="mt-1 animate-bounce" />
            </div>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
      </section>

      {/* About / horizontal story */}
      <AboutSection motionPref={motionPref} />

      {/* Services */}
      <ServicesSection />

      {/* Portfolio */}
      <PortfolioSection />

      {/* Contact */}
      <ContactSection />

      <footer className="border-t border-white/10 py-10 text-center text-white/50">© {new Date().getFullYear()} Limitless — All rights reserved.</footer>
    </div>
  )
}

function AboutSection({ motionPref }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize(); window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const containerRef = useScrollTarget()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  const cards = useMemo(() => ([
    { img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop', text: 'We start with story. The narrative defines form.' },
    { img: 'https://images.unsplash.com/photo-1520975922284-7b683aee0f22?q=80&w=1600&auto=format&fit=crop', text: 'Design as performance — every pixel has intent.' },
    { img: 'https://images.unsplash.com/photo-1551281044-8d8f302f0f84?q=80&w=1600&auto=format&fit=crop', text: 'Technology as canvas — systems that scale with style.' },
    { img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop', text: 'Motion to guide, never distract. Precision and play.' },
    { img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop', text: 'Outcomes that feel inevitable — crafted without limits.' },
  ]), [])

  return (
    <section id="about" ref={containerRef} className="relative bg-[#0b0c10] py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Our Philosophy</h2>
          <p className="mt-3 max-w-2xl text-white/70">A creative-first practice blending brand, product and motion to build experiences that feel inevitable.</p>
        </div>
      </div>
      <div className="relative w-full">
        <motion.div style={!isMobile && motionPref !== 'reduce' ? { x } : undefined} className="flex gap-6 sm:gap-8 will-change-transform px-6">
          {cards.map((c, i) => (
            <motion.article key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="min-w-[75%] sm:min-w-[55%] md:min-w-[40%] lg:min-w-[32%] xl:min-w-[28%]">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img src={c.img} alt="story visual" className="h-64 sm:h-80 w-full object-cover opacity-90" loading="lazy" />
                <div className="p-5 sm:p-6">
                  <p className="text-white/80 text-sm sm:text-base">{c.text}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function useScrollTarget() {
  const [el, setEl] = useState(null)
  return Object.assign((node) => setEl(node), { current: el })
}

function ServicesSection() {
  const services = [
    { Icon: Palette, title: 'Brand & Identity', desc: 'Expressive visual systems, design languages and premium brand assets.', accent: 'from-blue-500 to-cyan-400' },
    { Icon: Code2, title: 'Product & Engineering', desc: 'Robust web apps, design systems and performant frontends.', accent: 'from-cyan-400 to-sky-300' },
    { Icon: Rocket, title: 'Launch & Growth', desc: 'Go-to-market sites, content engines and measurable outcomes.', accent: 'from-blue-600 to-indigo-500' },
    { Icon: Sparkles, title: 'Motion & Interactivity', desc: 'Micro-interactions, 3D and motion systems that guide and delight.', accent: 'from-sky-400 to-blue-300' },
  ]
  return (
    <section id="services" className="relative bg-[#0b0c10] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Capabilities</h2>
          <p className="mt-3 max-w-2xl text-white/70">A modular set of services designed to move brands from spark to scale.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: idx * 0.05 }} whileHover={{ y: -6, scale: 1.02 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6">
              <div className={`absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r ${s.accent} blur-2xl`} />
              <div className="relative">
                <s.Icon className="h-6 w-6 text-blue-400" />
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                <button className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-all group-hover:bg-white/10 group-hover:text-white">Learn more</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PortfolioSection() {
  const items = [
    { id: 1, title: 'Nebula UI', tag: 'Brand', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop' },
    { id: 2, title: 'Astra Commerce', tag: 'Product', img: 'https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1600&auto=format&fit=crop' },
    { id: 3, title: 'Pulse Motion', tag: 'Motion', img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600&auto=format&fit=crop' },
    { id: 4, title: 'Flux System', tag: 'Product', img: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1600&auto=format&fit=crop' },
    { id: 5, title: 'Cobalt Site', tag: 'Web', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop' },
    { id: 6, title: 'Orion Brand', tag: 'Brand', img: 'https://images.unsplash.com/photo-1520974735194-8d95b0d6d3b8?q=80&w=1600&auto=format&fit=crop' },
  ]
  const filters = ['All', 'Brand', 'Product', 'Motion', 'Web']
  const [active, setActive] = useState('All')
  const filtered = useMemo(() => active === 'All' ? items : items.filter(i => i.tag === active), [active])
  return (
    <section id="work" className="relative bg-[#0b0c10] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 sm:mb-12 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Selected Work</h2>
            <p className="mt-3 max-w-2xl text-white/70">A rotating selection of brand, product and motion projects.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${active === f ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-white/10 bg-white/5 text-white/70 hover:text-white'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="md:hidden mb-6">
          <select value={active} onChange={(e)=>setActive(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-white/80">
            {filters.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((it) => (
              <motion.article key={it.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img src={it.img} alt={it.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-semibold">{it.title}</h3>
                  <p className="text-xs text-white/70">{it.tag}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault(); setLoading(true); await new Promise(r => setTimeout(r, 800)); setSent(true); setLoading(false)
  }
  return (
    <section id="contact" className="relative bg-[#0b0c10] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Let’s build without limits</h2>
          <p className="mt-3 max-w-2xl text-white/70">Tell us about your brand or product. We’ll get back within 24h.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input required className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white placeholder:text-white/40" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input type="email" required className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white placeholder:text-white/40" placeholder="jane@studio.com" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm text-white/70">Project brief</label>
              <textarea rows={5} required className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white placeholder:text-white/40" placeholder="What are we building together?" />
            </div>
            <motion.button type="submit" disabled={loading || sent} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative mt-6 inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-500 group-hover:scale-110" />
              <span className="relative">{sent ? 'Sent — we’ll be in touch' : loading ? 'Sending…' : 'Send message'}</span>
            </motion.button>
          </form>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 p-8">
            <h3 className="text-white text-xl font-semibold">A premium partner for creative teams</h3>
            <p className="mt-3 text-white/80">We fuse brand, product and motion to deliver experiences that feel inevitable. From concept to ship — with precision and play.</p>
            <ul className="mt-6 space-y-3 text-sm text-white/70 list-disc list-inside">
              <li>Senior design and engineering hands-on</li>
              <li>Motion systems and design ops baked-in</li>
              <li>Performance-first, accessible experiences</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
