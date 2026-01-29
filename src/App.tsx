import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Shield, Menu, X, CheckCircle, Users, Mail, Activity, 
  ArrowRight, Globe, Terminal, FileText, Award, Twitter, Linkedin 
} from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * --- UTILS & CONSTANTS ---
 */
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

const CONTACT_INFO = { email: "contact@humanls.com", phone: "3052820302", founder: "Nicolas Su Nobrega Garces" };

const QUOTES = [
  { text: "Amateurs hack systems, professionals hack people.", author: "Bruce Schneier" },
  { text: "Humans are the weakest link in security.", author: "Kevin Mitnick" },
  { text: "Social engineering is the art of manipulating people so they give up confidential information.", author: "Kevin Mitnick" },
  { text: "Security is not a product, it’s a process.", author: "Bruce Schneier" },
  { text: "The human factor is truly security's weakest link.", author: "Kevin Mitnick" },
  { text: "The only truly secure system is one that is powered off...", author: "Gene Spafford" },
  { text: "There are only two types of companies: those that have been hacked and those that will be.", author: "Robert Mueller" },
  { text: "Trust, but verify.", author: "Ronald Reagan" }
];

const EASING = [0.22, 1, 0.36, 1];
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fadeInUp = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASING }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

/**
 * --- SEO / META COMPONENT ---
 */
const PageMeta = ({ title, description }: { title: string, description?: string }) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
};

/**
 * --- CUSTOM INTERACTION COMPONENTS ---
 */
const Reveal: React.FC<{ children: React.ReactNode, width?: "fit-content" | "100%", delay?: number, className?: string }> = ({ children, width = "fit-content", delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASING } }
      }}
      initial="hidden"
      animate={controls}
      className={className}
      style={{ width, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

const CountUp: React.FC<{ from?: number, to: number, duration?: number, suffix?: string, className?: string }> = ({ from = 0, to, duration = 2, suffix = "", className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
        setCount(from + (to - from) * ease);
        if (percentage < 1) animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref} className={className}>{Math.floor(count)}{suffix}</span>;
};

/**
 * --- UI COMPONENTS ---
 */
const Button: React.FC<Omit<React.ComponentProps<typeof motion.button>, 'children'> & { variant?: 'primary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg', children: React.ReactNode }> = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
  const base = "inline-flex items-center justify-center font-display font-semibold transition-all focus:outline-none disabled:opacity-50 rounded-full cursor-pointer relative overflow-hidden group";
  const vars = {
    primary: "bg-primary text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] border border-transparent",
    outline: "border border-white/20 text-white hover:border-primary hover:text-primary bg-transparent hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };
  const sizes = { sm: "h-9 px-4 text-xs", md: "h-12 px-8 text-sm", lg: "h-14 px-10 text-base" };
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant !== 'primary' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, vars[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      )}
    </motion.button>
  );
};

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={cn("py-20 md:py-24 px-6 relative overflow-hidden", className)}>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto relative z-10"
    >
      {children}
    </motion.div>
  </section>
);

/**
 * --- FEATURE COMPONENTS ---
 */
const HowWeWork = () => (
  <Section className="bg-surface relative overflow-hidden">
    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent hidden md:block opacity-20" />
    <div className="text-center mb-20 relative z-10">
      <Reveal className="inline-block" width="100%">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
          <Activity className="w-3 h-3" /> Process
        </div>
      </Reveal>
      <Reveal delay={0.1} width="100%"><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How We <span className="text-primary">Work</span></h2></Reveal>
      <Reveal delay={0.2} width="100%"><p className="text-gray-400 max-w-2xl mx-auto text-lg">Four steps to turn your biggest vulnerability into your strongest defense.</p></Reveal>
    </div>

    <div className="grid md:grid-cols-4 gap-6 relative z-10">
      {[
        { t: "Test", d: "Realistic phishing emails. Custom templates. Real threats.", i: Mail, step: "01", bg: "group-hover:bg-blue-500", shadow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]" },
        { t: "Catch", d: "Safe fail page. No shame. No reporting to manager.", i: FileText, step: "02", bg: "group-hover:bg-red-500", shadow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]" },
        { t: "Teach", d: "90-second instant lesson. Teach the 'why' and 'how'.", i: Activity, step: "03", bg: "group-hover:bg-amber-500", shadow: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]" },
        { t: "Improve", d: "Track metrics. Watch click rates drop. Export reports.", i: CheckCircle, step: "04", bg: "group-hover:bg-emerald-500", shadow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]" }
      ].map((s, i) => (
        <motion.div variants={fadeInUp} key={i} className="group relative p-8 bg-black/40 border border-white/5 rounded-[2rem] hover:bg-white/5 hover:border-white/10 transition-colors duration-300 will-change-transform overflow-hidden" whileHover={{ y: -5 }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/10 transition-colors" />
          <div className="inline-block px-3 py-1 mb-6 border border-white/10 rounded-full text-xs font-mono font-bold shadow-xl group-hover:border-white/20 transition-colors text-white bg-surface">
            STEP {s.step}
          </div>
          <div className={cn("mb-6 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-black transition-all duration-300 group-hover:scale-110", s.bg, s.shadow)}>
            <s.i className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{s.t}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{s.d}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

const WhyChoose = () => (
  <Section className="bg-black relative overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 max-w-6xl mx-auto">
      <div className="text-left">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold mb-6 uppercase tracking-widest backdrop-blur-md">
            <Shield className="w-3 h-3 text-primary" /> The Standard
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Companies Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Human Layer</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            We built this platform to solve the problems other security training companies ignore. Most training is boring, punitive, and forgotten in 5 minutes.
          </p>
        </Reveal>
        <div className="grid gap-6">
          {[
            { t: "Zero Shame", d: "No public humiliation. Just private, immediate training.", i: Shield },
            { t: "Compliance Ready", d: "Automatic SOC 2, ISO 27001, & HIPAA documentation.", i: Award },
            { t: "5 Minute Setup", d: "No IT department needed. Launch your campaign today.", i: Activity }
          ].map((item, i) => (
            <Reveal key={i} delay={0.3 + (i * 0.1)} width="100%">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <item.i className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.t}</h4>
                  <p className="text-sm text-gray-400">{item.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="grid gap-6">
        {[
          { t: "Real Templates", d: "Law firms get court notices. Finance gets wire transfers.", i: FileText, c: "from-rose-500/20 to-orange-500/20", iconC: "text-rose-400" },
          { t: "Clear Analytics", d: "Track improvement. Export reports for insurance.", i: Terminal, c: "from-violet-500/20 to-purple-500/20", iconC: "text-violet-400" },
          { t: "Instant Learning", d: "Training happens the second they click. Not next week.", i: Mail, c: "from-blue-500/20 to-cyan-500/20", iconC: "text-blue-400" }
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50 p-8 hover:border-white/20 transition-all duration-500"
          >
            <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", f.c)} />
            <div className="relative z-10 flex items-center gap-6">
              <div className={cn("w-12 h-12 rounded-2xl bg-black/50 flex items-center justify-center shrink-0 border border-white/10", f.iconC)}>
                <f.i className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{f.t}</h3>
                <p className="text-gray-400 text-sm">{f.d}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

/**
 * --- NAVIGATION & FOOTER ---
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={cn("fixed w-full z-50 transition-all duration-300 px-4", scrolled ? "top-4" : "top-0")}>
      <div className={cn(
        "max-w-7xl mx-auto px-6 h-20 flex justify-between items-center transition-all duration-300",
        scrolled ? "glass rounded-full border border-white/10 shadow-lg shadow-black/50" : "bg-transparent border-transparent"
      )}>
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <img src="/humanlayerlogo.png" alt="Human Layer Security" loading="lazy" className="h-12 md:h-16 w-auto object-contain transition-all" />
          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-white text-lg md:text-xl tracking-tight leading-none group-hover:text-primary">HUMAN&nbsp;&nbsp;LAYER</span>
            <span className="font-display font-bold text-primary text-[10px] md:text-sm tracking-[0.2em] leading-none">SECURITY</span>
          </div>
        </Link>

        <div className="hidden md:flex gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm relative z-10">
          {['SERVICES', 'ABOUT', 'PARTNERSHIP'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="relative px-6 py-2 text-xs font-bold text-gray-300 hover:text-white rounded-full transition-colors">
              <span className="relative z-10">{item}</span>
              {location.pathname === `/${item.toLowerCase()}` && (
                <motion.div layoutId="navbar-indicator" className="absolute inset-0 bg-white/10 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <div className="flex items-center gap-3 pr-4 border-r border-white/10 mr-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Twitter className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin className="w-4 h-4" /></a>
          </div>
          <Link to="/contact"><Button size="sm" className="bg-green-600 text-white">Secure My Team</Button></Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black border border-white/10 absolute top-24 left-4 right-4 rounded-2xl z-50">
            <div className="p-4 flex flex-col gap-2">
              {['SERVICES', 'ABOUT', 'PARTNERSHIP'].map((item) => <Link key={item} to={`/${item.toLowerCase()}`} className="block p-4 text-white font-bold">{item}</Link>)}
              <Link to="/contact" className="block p-4 bg-green-600/20 text-green-500 rounded-xl font-bold text-center">Secure My Team</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/5 pt-0 relative overflow-hidden">
    <div className="border-b border-white/5 bg-surface/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Ready to Secure <span className="text-primary">Your Team?</span></h2>
          <p className="text-gray-400">Get a free risk assessment and see your baseline phishing risk in 24 hours.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/contact"><Button size="lg" className="bg-green-600 text-white">Get Free Assessment</Button></Link>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-4 mb-6 group">
            <img src="/humanlayerlogo.png" alt="Human Layer Security" loading="lazy" className="h-20 w-auto object-contain" />
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-white text-2xl tracking-tight leading-none">HUMAN&nbsp;&nbsp;LAYER</span>
              <span className="font-display font-bold text-primary text-sm tracking-[0.25em] leading-none">SECURITY</span>
            </div>
          </Link>
          <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
            The first phishing defense platform built for the way people actually learn.
          </p>
          <Link to="/contact"><Button variant="outline">Contact Support</Button></Link>
        </div>
        <div><h4 className="text-white font-bold mb-6 text-sm">COMPANY</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/about">About Us</Link></li><li><Link to="/services">Services</Link></li><li><Link to="/partnership">Partnerships</Link></li></ul></div>
        <div><h4 className="text-white font-bold mb-6 text-sm">LEGAL</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/privacy">Privacy Policy</Link></li><li><Link to="/terms">Terms of Service</Link></li></ul></div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2026 HumanLayer Security. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 items-center">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin className="w-5 h-5" /></a>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

/**
 * --- PAGES ---
 */
const Home = () => {
  const [quote, setQuote] = useState(QUOTES[0]);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  return (
    <>
      <PageMeta title="HumanLayer Security | Stop Phishing Attacks" description="AI-powered phishing defense for your team." />
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(34,197,94,0.1),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col text-left">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Phishing Defense Platform
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                One phishing email can <span className="text-red-500 underline decoration-4 underline-offset-4">destroy your business.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                Realistic tests. Instant training. Zero shame. Build a team that recognizes threats before the click.
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="flex gap-4 flex-wrap">
                <Link to="/contact"><Button size="lg" className="bg-green-600 text-white">Get Free Assessment</Button></Link>
                <Link to="/services"><Button size="lg" variant="outline">Watch 2 Min Demo</Button></Link>
              </div>
            </Reveal>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden lg:flex justify-center">
            <img src="/hero-network.png" alt="Human Defense Network" className="w-full h-auto object-contain drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <WhyChoose />
      <HowWeWork />
    </>
  );
};

const Services = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageMeta title="Services | HumanLayer Security" />
    <Section>
      <Reveal><h1 className="text-5xl md:text-7xl font-bold text-white mb-12">Our <span className="text-primary">Services</span></h1></Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { t: "Monthly Simulations", d: "Practice under real conditions.", i: Activity },
          { t: "Instant Training", d: "Learn at the point of failure.", i: Globe },
          { t: "Analytics", d: "Track improvement in real-time.", i: Terminal }
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="p-8 border border-white/10 bg-surface/40 rounded-3xl group h-full">
              <s.i className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">{s.t}</h3>
              <p className="text-gray-400">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageMeta title="About Us | HumanLayer Security" />
    <Section>
      <Reveal><h1 className="text-5xl md:text-7xl font-bold text-white mb-12">Who <span className="text-primary">We Are</span></h1></Reveal>
      <div className="prose prose-invert prose-lg max-w-4xl">
        <p>Founded by {CONTACT_INFO.founder}, we are cybersecurity experts dedicated to protecting the human layer of security.</p>
      </div>
    </Section>
  </div>
);

const Partnership = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageMeta title="Partnership | HumanLayer Security" />
    <Section>
      <Reveal><h1 className="text-5xl md:text-7xl font-bold text-white mb-12">Partner <span className="text-primary">With Us</span></h1></Reveal>
      <p className="text-xl text-gray-400 max-w-2xl">Earn recurring revenue while protecting your clients.</p>
      <div className="mt-12"><Link to="/contact"><Button size="lg">Discuss Partnership</Button></Link></div>
    </Section>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-white pb-20 pt-32">
      <Section>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-bold mb-8">Contact <span className="text-primary">Us</span></h1>
            <p className="text-gray-400 text-lg">Schedule your free baseline assessment today.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 bg-surface/50 p-8 rounded-3xl border border-white/10">
            <input required type="text" placeholder="Name" className="w-full p-4 bg-black border border-white/10 rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Work Email" className="w-full p-4 bg-black border border-white/10 rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <textarea placeholder="Message" className="w-full p-4 bg-black border border-white/10 rounded-xl h-32" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            <Button type="submit" size="lg" className="w-full bg-green-600 text-white" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Submit Request'}
            </Button>
            {status === 'success' && <p className="text-primary text-center">✓ Thank you! We'll be in touch.</p>}
          </form>
        </div>
      </Section>
    </div>
  );
};

const Legal = () => (
  <div className="pt-32 px-6 min-h-screen pb-20 bg-background text-white">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Legal Documentation</h1>
      <p className="text-gray-400">Please contact support for official Terms of Service and Privacy Policy details. (Last Updated: 2026)</p>
    </div>
  </div>
);

/**
 * --- MAIN APP ---
 */
export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary font-sans overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

