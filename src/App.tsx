import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Menu, X, CheckCircle, Users, Mail, Activity, ArrowRight, Globe, Terminal, FileText, Award } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Explicitly check window to avoid SSR issues (though simple here)
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// --- UTILS ---
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- DATA ---
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




// --- ANIMATION VARIANTS ---
// --- ANIMATION SYSTEM ---
const EASING = [0.22, 1, 0.36, 1]; // Custom cubic-bezier for "buttery" feel

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



// --- CUSTOM INTERACTION COMPONENTS ---

const Reveal: React.FC<{ children: React.ReactNode, width?: "fit-content" | "100%", delay?: number, className?: string }> = ({ children, width = "fit-content", delay = 0, className = "" }) => {
  const ref = React.useRef(null);
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
  const ref = React.useRef(null);
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

        // Easing function: easeOutExpo
        const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

        setCount(from + (to - from) * ease);

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref} className={className}>{Math.floor(count)}{suffix}</span>;
};

// --- UI COMPONENTS ---
// --- UI COMPONENTS ---
const Button: React.FC<Omit<React.ComponentProps<typeof motion.button>, 'children'> & { variant?: 'primary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg', children: React.ReactNode }> = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
  const base = "inline-flex items-center justify-center font-display font-semibold transition-all focus:outline-none disabled:opacity-50 rounded-full cursor-pointer relative overflow-hidden group";
  const vars = {
    primary: "bg-primary text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] border border-transparent",
    outline: "border border-white/20 text-white hover:border-primary hover:text-primary bg-transparent hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };
  const sizes = { sm: "h-9 px-4 text-xs", md: "h-12 px-8 text-sm", lg: "h-14 px-10 text-base" };

  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: variant === 'primary' ? "0 0 40px rgba(34,197,94,0.6)" : undefined }}
      whileTap={{ scale: 0.98, boxShadow: variant === 'primary' ? "0 0 20px rgba(34,197,94,0.4)" : undefined }}
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

const MagneticButton: React.FC<{ children: React.ReactNode, className?: string } & React.ComponentProps<typeof motion.button>> = ({ children, className, ...props }) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
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
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const SkeletonCard = () => (
  <div className="animate-pulse p-8 rounded-3xl bg-surface/40 border border-white/10 h-full">
    <div className="h-12 w-12 bg-white/10 rounded-full mb-4" />
    <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
    <div className="h-4 bg-white/10 rounded w-full mb-2" />
    <div className="h-4 bg-white/10 rounded w-5/6" />
  </div>
);

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

const HowWeWork = () => (
  <Section className="bg-surface relative overflow-hidden">
    {/* Background Trace */}
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

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-4 gap-6 relative z-10"
    >
      {[
        { t: "Test", d: "Realistic phishing emails. Custom templates. Real threats.", i: Mail, step: "01" },
        { t: "Catch", d: "Safe fail page. No shame. No reporting to manager.", i: FileText, step: "02" },
        { t: "Teach", d: "90-second instant lesson. Teach the 'why' and 'how'.", i: Activity, step: "03" },
        { t: "Improve", d: "Track metrics. Watch click rates drop. Export reports.", i: CheckCircle, step: "04" }
      ].map((s, i) => (
        <motion.div variants={fadeInUp} key={i} className="group relative p-6 bg-black/40 border border-white/5 rounded-3xl hover:bg-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
          <div className="absolute -top-4 left-6 bg-surface px-2 py-1 border border-white/10 rounded-lg text-xs font-mono text-primary font-bold shadow-xl group-hover:border-primary/50 transition-colors">
            STEP {s.step}
          </div>

          <div className="mt-4 mb-4 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_0_0_rgba(34,197,94,0)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <s.i className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{s.t}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{s.d}</p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

const WhyChoose = () => (
  <Section className="bg-black border-y border-white/5">
    <div className="text-center mb-16">
      <Reveal width="100%">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Why Companies Choose <span className="text-primary">Human Layer</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1} width="100%">
        <p className="text-gray-400 max-w-2xl mx-auto">
          We built this platform to solve the problems other security training companies ignore.
        </p>
      </Reveal>
    </div>

    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[
        { t: "Zero Shame", d: "No public humiliation. Just private, immediate training.", i: Shield, c: "text-green-500", b: "group-hover:border-green-500/50", bg: "group-hover:bg-green-500/10" },
        { t: "Compliance Ready", d: "Automatic SOC 2, ISO 27001, & HIPAA documentation.", i: Award, c: "text-yellow-500", b: "group-hover:border-yellow-500/50", bg: "group-hover:bg-yellow-500/10" },
        { t: "5-Minute Setup", d: "No IT department needed. Launch your first campaign today.", i: Activity, c: "text-blue-400", b: "group-hover:border-blue-400/50", bg: "group-hover:bg-blue-400/10" },
        { t: "Real Templates", d: "Law firms get court notices. Finance gets wire transfers.", i: FileText, c: "text-red-500", b: "group-hover:border-red-500/50", bg: "group-hover:bg-red-500/10" },
        { t: "Clear Analytics", d: "Track improvement. Export reports for insurance.", i: Terminal, c: "text-purple-400", b: "group-hover:border-purple-400/50", bg: "group-hover:bg-purple-400/10" },
        { t: "Instant Learning", d: "Training happens the second they click. Not next week.", i: Mail, c: "text-orange-400", b: "group-hover:border-orange-400/50", bg: "group-hover:bg-orange-400/10" }
      ].map((f, i) => (
        <motion.div variants={fadeInUp} key={i} className={cn("flex flex-col items-center text-center group p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-1 cursor-default", f.b)}>
          <div className={cn("w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 py-4 border border-white/5 transition-all duration-500 group-hover:scale-110", f.bg)}>
            <f.i className={cn("w-8 h-8 text-gray-400 transition-colors duration-500", `group-hover:${f.c}`)} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">{f.t}</h3>
          <p className="text-gray-400 leading-relaxed text-sm max-w-xs">{f.d}</p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);



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
    <nav className={cn("fixed w-full z-50 transition-all duration-500 px-4", scrolled ? "top-4" : "top-0")}>
      <div className={cn(
        "max-w-7xl mx-auto px-6 h-20 flex justify-between items-center transition-all duration-300",
        scrolled ? "glass rounded-full border border-white/10 shadow-lg shadow-black/50" : "bg-transparent border-transparent"
      )}>
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <img src="/humanlayerlogo.png" alt="Human Layer Security" loading="lazy" decoding="async" className="h-14 md:h-20 w-auto object-contain transition-all duration-300 group-hover:scale-102 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-white text-lg md:text-xl tracking-tight leading-none group-hover:text-primary transition-colors">HUMAN&nbsp;&nbsp;LAYER</span>
            <span className="font-display font-bold text-primary text-[10px] md:text-sm tracking-[0.2em] leading-none">SECURITY</span>
          </div>
        </Link>

        <div className="hidden md:flex gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm relative z-10">
          {['SERVICES', 'ABOUT', 'PARTNERSHIP'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="relative px-6 py-2 text-xs font-bold text-gray-300 hover:text-white rounded-full transition-colors tracking-wide group">
              <span className="relative z-10">{item}</span>
              {location.pathname === `/${item.toLowerCase()}` && (
                <motion.div layoutId="navbar-indicator" className="absolute inset-0 bg-white/10 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <div className="absolute inset-x-0 bottom-0 h-px bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          <Link to="/contact"><Button size="sm" className="gap-2 shadow-none hover:shadow-lg bg-green-600 hover:bg-green-500 border-green-500/50 shadow-green-900/20 text-white">Contact Us</Button></Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black border-b border-white/10 overflow-hidden absolute top-24 left-4 right-4 rounded-2xl border border-white/10 z-50 shadow-2xl">
            <div className="p-4 flex flex-col gap-2">
              {['SERVICES', 'ABOUT', 'PARTNERSHIP'].map((item) => <Link key={item} to={`/${item.toLowerCase()}`} className="block p-4 text-white hover:bg-white/5 rounded-xl font-bold font-display">{item}</Link>)}
              <Link to="/contact" className="block p-4 bg-green-600/20 text-green-500 hover:bg-green-600/30 rounded-xl font-bold text-center border border-green-500/20">Contact Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/5 pt-0 relative overflow-hidden">
    {/* NEW CTA SECTION */}
    <div className="border-b border-white/5 bg-surface/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Ready to Secure <span className="text-primary">Your Team?</span></h2>
          <p className="text-gray-400">Get a free risk assessment and see your baseline phishing risk in 24 hours.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/contact"><Button size="lg" className="bg-green-600 hover:bg-green-500 text-white">Get Free Assessment</Button></Link>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-4 mb-6 group">
            <img src="/humanlayerlogo.png" alt="Human Layer Security" loading="lazy" decoding="async" className="h-24 w-auto object-contain transition-transform group-hover:scale-102" />
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-white text-2xl tracking-tight leading-none group-hover:text-primary transition-colors">HUMAN&nbsp;&nbsp;LAYER</span>
              <span className="font-display font-bold text-primary text-sm tracking-[0.25em] leading-none">SECURITY</span>
            </div>
          </Link>
          <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
            The first phishing defense platform built for the way people actually learn. No shame. No boring videos. Just real security.
          </p>
          <div className="flex gap-4">
            <Link to="/contact"><Button variant="outline">Contact Support</Button></Link>
          </div>
        </div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">COMPANY</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li><li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li><li><Link to="/partnership" className="hover:text-primary transition-colors">Partnerships</Link></li></ul></div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">LEGAL</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li><li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li></ul></div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2026 HumanLayer Security. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0"><Link to="/privacy" className="hover:text-white">Privacy</Link><Link to="/terms" className="hover:text-white">Terms</Link></div>
      </div>
    </div>
  </footer>
);

// --- HOME PAGE ---
const Home = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState(QUOTES[0]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  useEffect(() => {
    // Random quote on mount/refresh
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);



  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden perspective-1000">
        {/* Animated Background */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.05),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 via-primary/5 to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} initial="hidden" animate="visible" variants={staggerContainer}>
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Phishing Defense Platform
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-6xl">
                One phishing email can <span className="text-red-500 decoration-red-900/50 underline decoration-4 underline-offset-4">destroy your business.</span> <br className="hidden md:block" />
                We train your team to <span className="text-primary decoration-primary/30 underline decoration-4 underline-offset-4">recognize it before they click.</span>
              </h1>
            </Reveal>

            {/* Feature Pills */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">No Shame Policy</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Setup in 5 Minutes</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Compliance Certificates Included</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                We send realistic phishing tests to your employees. When someone clicks, they get instant training on what they missed. Your team gets better every month. Your company gets safer every day.
              </p>
            </Reveal>

            {/* Social Proof */}
            <Reveal delay={0.5}>
              <div className="flex items-center gap-6 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">Trusted by 50+ companies</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary font-bold">4.8/5 avg reduction in click rates</span>
                </div>
              </div>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={0.6}>
              <div className="flex gap-4 flex-wrap">
                <Link to="/contact">
                  <Button size="lg" className="bg-green-600 hover:bg-green-500 shadow-green-900/20 border-green-500/20 text-white">
                    Get Free Risk Assessment
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline">
                    Watch 2-Min Demo
                  </Button>
                </Link>
              </div>
              {/* Trust Line */}
              <p className="text-sm text-white/50 mt-4">
                No credit card required • Setup in under 5 minutes • Cancel anytime
              </p>
            </Reveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-surface/50 backdrop-blur-sm transition-all duration-500 group"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />

            <img src="/hero-network.png" alt="Human Defense Network" loading="lazy" decoding="async" className="w-full h-auto object-cover opacity-90 transition-transform duration-700 ease-out relative z-0 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-20" />

            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4 z-30">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="text-xs text-green-400 font-mono mb-1 uppercase tracking-wider">Team Awareness</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">GROWING</div>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }} className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="text-xs text-green-400 font-mono mb-1 uppercase tracking-wider">Training Style</div>
                <div className="text-2xl font-bold text-white">INSTANT</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-white/5 border-y border-white/5 backdrop-blur-sm overflow-hidden py-4 flex relative z-20">
        <div
          className="flex gap-20 whitespace-nowrap"
          style={{ animation: 'marquee 40s linear infinite', willChange: 'transform' }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {/* Duplicate content 3 times for seamless loop on large screens */}
          {[...Array(6)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              <span className="text-white/70 font-mono text-sm tracking-widest uppercase flex items-center gap-4">
                <Shield className="text-primary w-4 h-4" /> Zero Shame Training Policy
              </span>
              <span className="text-white/70 font-mono text-sm tracking-widest uppercase flex items-center gap-4">
                <Award className="text-primary w-4 h-4" /> Compliance Certificates Included
              </span>
              <span className="text-white/70 font-mono text-sm tracking-widest uppercase flex items-center gap-4">
                <Activity className="text-primary w-4 h-4" /> Setup in Under 5 Minutes
              </span>
              <span className="text-white/70 font-mono text-sm tracking-widest uppercase flex items-center gap-4">
                <FileText className="text-primary w-4 h-4" /> Industry-Specific Templates
              </span>
              <span className="text-white/70 font-mono text-sm tracking-widest uppercase flex items-center gap-4">
                <Terminal className="text-primary w-4 h-4" /> Monthly Analytics Reports
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* WHY US SECTION */}
      <WhyChoose />

      {/* THE PROBLEM SECTION */}
      < Section className="bg-black border-y border-white/5" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Why Your Current Training <span className="text-primary">Isn't Working</span></h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/30">
              <div className="text-4xl font-bold text-red-500 mb-2">82%</div>
              <p className="text-gray-400 text-sm">of breaches involve phishing</p>
            </div>
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/30">
              <div className="text-4xl font-bold text-red-500 mb-2">$4.9M</div>
              <p className="text-gray-400 text-sm">average cost of a data breach</p>
            </div>
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/30">
              <div className="text-4xl font-bold text-red-500 mb-2">90%</div>
              <p className="text-gray-400 text-sm">of employees forget training in 30 days</p>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">Annual compliance videos don't work. Generic "be careful" warnings don't work. Your employees need <span className="text-primary font-bold">practice with immediate feedback</span> — the same way you learned any other skill.</p>

          <Link to="/services"><Button variant="outline">See Our Approach</Button></Link>
        </div>
      </Section >

      {/* HOW WE WORK */}
      <HowWeWork />

      {/* SERVICES PREVIEW */}
      < Section id="services-preview" >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="mb-6 md:mb-0"><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What You <span className="text-primary">Get</span></h2><p className="text-gray-400 text-lg">Everything you need to build a security aware team. Nothing you don't.</p></div>
          <Button variant="outline" className="hidden md:flex" onClick={() => navigate('/services')}>View All Features</Button>
        </div>
        <div className="space-y-4">
          {[
            { t: "Realistic Attack Simulations", d: "We send phishing emails that look and feel exactly like real attacks—because they're based on real attacks. Your employees see them in their actual inbox. They make decisions under real conditions.", i: Shield },
            { t: "Training at the Point of Failure", d: "The second someone clicks a phishing link, they see what they missed and why it worked. Not next week in a training session. Not in an annual compliance video. Right now.", i: Users },
            { t: "Monthly Intelligence Reports", d: "See exactly where your vulnerabilities are. Who's clicking. What's working. Which departments need extra training. Export compliance reports for auditors.", i: FileText },
            { t: "Compliance Documentation", d: "Generate documentation automatically. SOC 2, ISO 27001, CMMC — formatted correctly and ready to submit. Your auditor gets what they need. You get back to work.", i: Award }
          ].map((s, i) => (
            <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 items-start">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center shrink-0 text-primary border border-white/10">
                <s.i className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{s.t}</h3>
                <p className="text-white/70 leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PRICING PREVIEW */}
        <div className="mt-16 p-10 rounded-3xl bg-surface/60 border border-white/10 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Simple, <span className="text-primary">Transparent Pricing</span></h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">From startups to enterprises. Month-to-month contracts. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {/* STARTER */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-left hover:border-primary/30 transition-colors">
              <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Starter</div>
              <div className="text-3xl font-bold text-white mb-1">$299<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500 mb-6">Up to 50 employees</div>
              <ul className="space-y-3 text-sm text-gray-300 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">8 campaigns/month</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">50+ templates</strong> (industry-specific)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">No shame policy</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Compliance certificates</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Basic dashboard</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">5-minute setup</strong></span></li>
              </ul>
              <Link to="/contact"><Button variant="outline" className="w-full">Get Started</Button></Link>
            </div>
            {/* PROFESSIONAL */}
            <div className="p-6 rounded-2xl bg-primary/10 border-2 border-primary relative hover:border-primary transition-colors">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">MOST POPULAR</div>
              <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Professional</div>
              <div className="text-3xl font-bold text-white mb-1">$799<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500 mb-6">Up to 200 employees</div>
              <ul className="space-y-3 text-sm text-gray-200 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Unlimited campaigns</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Custom template builder</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">No shame policy</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Advanced compliance certificates</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Real-time dashboard</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>API access</span></li>
              </ul>
              <Link to="/contact"><Button className="w-full">Get Started</Button></Link>
            </div>
            {/* ENTERPRISE */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-left hover:border-primary/30 transition-colors">
              <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Enterprise</div>
              <div className="text-3xl font-bold text-white mb-1">Custom</div>
              <div className="text-sm text-gray-500 mb-6">Unlimited employees</div>
              <ul className="space-y-3 text-sm text-gray-300 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Everything in Pro</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Dedicated manager</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">White-label option</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Custom compliance</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Threat intelligence</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>99.9% SLA</span></li>
              </ul>
              <Link to="/contact"><Button variant="outline" className="w-full">Contact Sales</Button></Link>
            </div>
          </div>
          <Link to="/contact"><Button>Get Custom Quote</Button></Link>
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/services"><Button size="lg">Explore All Features</Button></Link>
        </div>
      </Section >

      {/* SOCIAL PROOF / VALUE PROP */}
      {/* SOCIAL PROOF / VALUE PROP */}
      < Section className="bg-surface/50" >
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Why This Approach <span className="text-primary">Works</span></h2>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                <div>
                  <h4 className="font-bold text-white mb-1">No Shame, <span className="text-primary">Real Learning</span></h4>
                  <p className="text-gray-400 text-sm max-w-2xl">We don't report clicks to management. We don't publish 'walls of shame.' We don't make anyone feel stupid. When someone clicks, they see a private learning moment. Most employees actually appreciate the training because it helps them protect themselves.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">2</div>
                <div>
                  <h4 className="font-bold text-white mb-1">You'll See <span className="text-primary">the Difference</span></h4>
                  <p className="text-gray-400 text-sm max-w-2xl">Month by month, you'll watch click rates drop. You'll see employees start forwarding suspicious emails to IT. You'll notice the shift from "I hope this is safe" to "I know what to look for." The data proves what you'll feel—your team is getting sharper.</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Link to="/contact"><Button>Start Building Your Defense</Button></Link>
            </div>

            {/* Trusted Industries - MOVED HERE */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <h5 className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Built For Teams In</h5>
              <div className="flex flex-wrap gap-4 text-gray-400 font-display font-bold text-sm">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Law Firms</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Medical Practices</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Financial Services</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Tech Startups</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Small Businesses</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC QUOTE COMPONENT */}
          <div className="md:col-span-1 relative group perspective-1000 h-full min-h-[400px]">
            {/* Simple Background */}
            <div className="absolute inset-0 bg-surface/30 rounded-[2rem] border border-white/10" />

            <div className="relative h-full rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-yellow-500 text-[9px] font-bold tracking-[0.1em] uppercase">Tip</span>
                </div>

                <blockquote className="text-lg font-display font-medium text-white leading-relaxed mb-6">
                  "{quote.text}"
                </blockquote>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div className="w-4 h-[1px] bg-white/20" />
                <div className="text-white/50 font-mono text-[9px] uppercase tracking-widest font-bold">
                  {quote.author}
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section >
      {/* PROOF SECTION */}
      < Section className="bg-black" >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Results That <span className="text-primary">Actually Matter</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">This isn't theory. These are real metrics from companies using our platform.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Case Study 1 */}
          <div className="p-8 rounded-3xl bg-surface/40 border border-white/10 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">LS</div>
              <div><div className="font-bold text-white">Law Firm, 75 employees</div><div className="text-sm text-gray-500">Miami, FL</div></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5"><div className="text-sm text-gray-500 mb-1">Before</div><div className="text-3xl font-bold text-red-400">41%</div><div className="text-xs text-gray-600">click rate</div></div>
              <div className="p-4 rounded-xl bg-black/40 border border-primary/20"><div className="text-sm text-gray-500 mb-1">After 90 days</div><div className="text-3xl font-bold text-primary">7%</div><div className="text-xs text-gray-600">click rate</div></div>
            </div>
            <p className="text-gray-400 text-sm italic">"We went from being terrified of phishing to confident our team can spot it. The training actually works because it happens right when someone makes a mistake."</p>
          </div>

          {/* Case Study 2 */}
          <div className="p-8 rounded-3xl bg-surface/40 border border-white/10 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">MC</div>
              <div><div className="font-bold text-white">Medical Practice, 120 employees</div><div className="text-sm text-gray-500">Boston, MA</div></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5"><div className="text-sm text-gray-500 mb-1">Before</div><div className="text-3xl font-bold text-red-400">38%</div><div className="text-xs text-gray-600">click rate</div></div>
              <div className="p-4 rounded-xl bg-black/40 border border-primary/20"><div className="text-sm text-gray-500 mb-1">After 6 months</div><div className="text-3xl font-bold text-primary">4%</div><div className="text-xs text-gray-600">click rate</div></div>
            </div>
            <p className="text-gray-400 text-sm italic">"HIPAA compliance required security training. This was the only solution that actually changed behavior instead of just checking a box."</p>
          </div>
        </div>

        <div className="text-center p-10 rounded-3xl bg-primary/5 border border-primary/20">
          <h3 className="text-2xl font-bold text-white mb-4">Want to see these results for your team?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Let's run a baseline assessment. We'll show you where your vulnerabilities are, then demonstrate how the platform works with your actual team.</p>
          <Link to="/contact"><Button size="lg">Schedule Free Assessment</Button></Link>
        </div>
      </Section >

      {/* FAQ SECTION */}
      < Section className="bg-black" >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Common <span className="text-primary">Questions</span></h2>
          <div className="space-y-4">
            {[
              { q: "Won't this upset our employees?", a: "No — and here's why: We don't report clicks to management. We don't publish 'walls of shame.' We don't make anyone feel stupid. When someone clicks, they see a private learning moment. Most employees actually appreciate the training because it helps them protect themselves." },
              { q: "How is this different from KnowBe4 or Proofpoint?", a: "Three main differences: (1) We're faster to set up (minutes vs weeks), (2) Our scenarios are more realistic because we customize to your actual threats, (3) Our pricing is transparent and simple. Most importantly, we built this platform from scratch in 2024 with modern technology — not legacy systems from 2010." },
              { q: "What if employees figure out it's a test?", a: "That's actually good! It means they're being vigilant. The goal isn't to trick people — it's to build instincts. If someone thinks 'this might be a phishing test,' they're already thinking more carefully about email security. That's exactly what we want." },
              { q: "How long until we see results?", a: "Most companies see measurable improvement within 60-90 days. Click rates typically drop 50-80% within the first six months. But you'll notice behavioral changes sooner — employees start forwarding suspicious emails to IT instead of clicking them." },
              { q: "Do you handle the technical setup?", a: "Yes. Setup takes under 5 minutes. We handle email authentication, domain configuration, and platform setup. You just provide your employee list and select your first campaign. We take care of the technical details." },
              { q: "Can we cancel anytime?", a: "Yes. Month-to-month contracts. Cancel with 30 days notice. No long-term commitments. No cancellation fees. We're confident you'll see value, so we don't lock you in." }
            ].map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-surface/40 border border-white/10 hover:border-primary/30 transition-colors cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-white text-lg list-none"><span>{faq.q}</span><ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" /></summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <Link to="/contact"><Button variant="outline">Talk to Us</Button></Link>
          </div>
        </div>
      </Section >
    </>
  );
};

// --- INNER PAGES ---
const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <section className="pt-40 pb-20 px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-30 pointer-events-none" />
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-7xl mx-auto relative z-10">
      <Reveal>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          {title.split(' ').slice(0, Math.ceil(title.split(' ').length / 2)).join(' ')} <span className="text-primary">{title.split(' ').slice(Math.ceil(title.split(' ').length / 2)).join(' ')}</span>
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">{subtitle}</p>
      </Reveal>
    </motion.div>
  </section>
);

const Services = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Our Services" subtitle="Realistic phishing tests. Instant training. Clear analytics. Built by cybersecurity professionals who understand how attackers actually operate." />
    <Section className="!pt-0">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
        {[
          { t: "Monthly Phishing Simulations", d: "Regular phishing emails designed to mimic real attacks your team actually faces. Fake delivery notifications. Payroll updates. IT security alerts. Each one is a chance to practice under real conditions before a real attacker tries the same thing.", i: Activity, span: "lg:col-span-3" },
          { t: "Instant, Targeted Training", d: "The instant someone clicks a test, they see exactly what they missed in that specific email. Then a 90 second lesson on that exact tactic. No generic compliance videos. No scheduling training sessions. Just immediate, relevant learning when it counts most.", i: Globe, span: "lg:col-span-3" },
          { t: "Clear Analytics Dashboard", d: "See who's clicking, which attacks are working, and where your vulnerabilities are concentrated. Track improvement over time. Identify patterns. Export reports for compliance audits. Understand your real security posture in plain English.", i: Terminal, span: "lg:col-span-2" },
          { t: "Direct Platform Support", d: "Questions about a campaign? Want to customize scenarios? Need help interpreting results? Direct access to the team that built this platform. We're invested in your success because your success is our success.", i: Shield, span: "lg:col-span-2" },
          { t: "Role-Specific Scenarios", d: "Different roles face different threats. Finance teams get fake invoice approvals. HR gets suspicious resumes. IT gets fake security alerts. Executives get targeted spear phishing. We customize scenarios to match the actual risks each department faces.", i: Mail, span: "lg:col-span-2" }
        ].map((s, i) => (
          <motion.div
            variants={fadeInUp}
            key={i}
            className={twMerge(
              "flex flex-col p-8 border border-white/10 bg-surface/40 backdrop-blur-sm rounded-3xl hover:border-primary/50 hover:bg-surface/60 transition-all duration-500 group relative overflow-hidden min-h-[280px]",
              s.span
            )}
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Tech Decoration */}
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="w-16 h-16 rounded-full border border-primary/20 dashed-border" />
            </div>

            <div className="w-16 h-16 bg-black/50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner border border-white/5 relative z-10 mb-6 group-hover:border-primary/30">
              <s.i className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {s.t.split(' ').slice(0, Math.ceil(s.t.split(' ').length / 2)).join(' ')} <span className="text-primary">{s.t.split(' ').slice(Math.ceil(s.t.split(' ').length / 2)).join(' ')}</span>
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{s.d}</p>
            </div>


          </motion.div>
        ))}
      </motion.div>
    </Section>

    {/* COMPARISON SECTION */}
    <Section className="bg-surface/30 border-y border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why We're <span className="text-primary">Better</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">The old way of doing security training is broken. Here's how we fixed it.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-gray-500 font-normal">Feature</th>
              <th className="p-4 text-white font-bold text-lg bg-surface/50 border-x border-white/10 w-1/3">HumanLayer Security</th>
              <th className="p-4 text-gray-500 font-normal w-1/3">Competitor K</th>
              <th className="p-4 text-gray-500 font-normal w-1/3">Competitor P</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { f: "Setup Time", h: "5 Minutes", c1: "3+ Weeks", c2: "2+ Weeks" },
              { f: "Shame Policy", h: "Zero Shame (Private)", c1: "Report to Manager", c2: "Public \"Wall of Shame\"" },
              { f: "Training Timing", h: "Instant (Point of Failure)", c1: "Next scheduled meeting", c2: "Monthly video" },
              { f: "Content Updates", h: "Weekly", c1: "Quarterly", c2: "Monthly" },
              { f: "Pricing", h: "Transparent/Monthly", c1: "Quote Only/Annual", c2: "Quote Only/Annual" },
            ].map((row, i) => (
              <tr key={i} className="group hover:bg-white/5 transition-colors">
                <td className="p-4 text-white font-bold">{row.f}</td>
                <td className="p-4 text-primary font-bold bg-primary/5 border-x border-primary/10 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> {row.h}
                </td>
                <td className="p-4 text-gray-500">{row.c1}</td>
                <td className="p-4 text-gray-500">{row.c2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    {/* CERTIFICATES */}
    <Section className="bg-black">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Compliance <span className="text-primary">Solved</span></h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Stop stressing about audits. We generate the documentation you need automatically. Export perfectly formatted reports for SOC 2, ISO 27001, HIPAA, and cyber insurance carriers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['SOC 2 Type II', 'ISO 27001', 'HIPAA', 'CMMC 2.0', 'GDPR', 'PCI-DSS'].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 border border-white/10">
                <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                <span className="text-white font-bold text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30" />
          <div className="relative p-8 rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <div className="text-white font-bold">Compliance_Report_2026.pdf</div>
                <div className="text-xs text-gray-500">Generated 2 minutes ago</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-white/10 rounded w-3/4" />
              <div className="h-2 bg-white/10 rounded w-full" />
              <div className="h-2 bg-white/10 rounded w-5/6" />
              <div className="h-2 bg-white/10 rounded w-4/6" />
            </div>
            <div className="mt-6 flex justify-end">
              <Button size="sm" variant="outline">Download PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>

    {/* SETUP SPEED */}
    <Section className="bg-gradient-to-b from-surface/20 to-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Setup in <span className="text-primary">Minutes</span>, Not Weeks</h2>
        <div className="relative pt-10">
          <div className="absolute top-[2.5rem] left-0 right-0 h-1 bg-white/10 rounded-full" />
          <div className="grid grid-cols-3 relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-surface border-4 border-primary flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">1</div>
              <h3 className="text-white font-bold mb-2">Upload Details</h3>
              <p className="text-xs text-gray-400 max-w-[150px]">Upload CSV of employees</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-surface border-4 border-white/20 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">2</div>
              <h3 className="text-gray-300 font-bold mb-2">Select Campaign</h3>
              <p className="text-xs text-gray-500 max-w-[150px]">Choose industry template</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-surface border-4 border-white/20 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">3</div>
              <h3 className="text-gray-300 font-bold mb-2">Launch</h3>
              <p className="text-xs text-gray-500 max-w-[150px]">Automatic training begins</p>
            </div>
          </div>
        </div>
      </div>
    </Section>

    {/* TRUST BADGES */}
    <Section className="bg-black border-t border-white/5">
      <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">Securing Teams At</p>
      <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {['TechFlow', 'MediCorp', 'LegalShield', 'FinSecure', 'BuildRight'].map((brand, i) => (
          <div key={i} className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full" /> {brand}
          </div>
        ))}
      </div>
    </Section>

    {/* REUSED HOW WE WORK SECTION */}
    <HowWeWork />

    <div className="mt-16 text-center bg-black/40 backdrop-blur-md p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
          }
        }}
        className="grid md:grid-cols-3 gap-12 mb-12 relative z-10"
      >
        {/* STAT 1: CIRCULAR GRAPHIC */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="flex flex-col items-center group"
        >
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#262626" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none" stroke="#22C55E" strokeWidth="8"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                whileInView={{ strokeDashoffset: 180 }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"><CountUp to={37} suffix="%" /></div>
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Where Most Teams Start</div>
        </motion.div>

        {/* STAT 2: CENTRAL HERO GRAPHIC */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="flex flex-col items-center group"
        >
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse filter blur-xl"></div>
            <div className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center relative bg-black/50 backdrop-blur-sm">
              <div className="text-7xl font-bold text-primary tracking-tighter drop-shadow-[0_0_15px_rgba(34,197,94,1)]"><CountUp to={4} suffix="%" /></div>
            </div>
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Where You Can Be</div>
        </motion.div>

        {/* STAT 3: BAR GRAPHIC */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="flex flex-col items-center justify-center group h-full"
        >
          <div className="flex items-end gap-2 h-32 mb-6">
            <motion.div initial={{ height: 0 }} whileInView={{ height: 40 }} transition={{ duration: 0.5 }} className="w-6 bg-white/10 rounded-t-lg"></motion.div>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 64 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-6 bg-white/20 rounded-t-lg"></motion.div>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 80 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-6 bg-white/30 rounded-t-lg"></motion.div>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 128 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-6 bg-primary rounded-t-lg shadow-[0_0_15px_rgba(34,197,94,0.5)]"></motion.div>
          </div>
          <div className="text-5xl font-bold text-white mb-2"><CountUp to={8} suffix="x" /></div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Improved Threat Response</div>
        </motion.div>
      </motion.div>
      <p className="text-3xl text-white font-bold mb-10 font-display italic">"This is what happens when training actually works."</p>
      <Link to="/contact"><Button size="lg" className="bg-green-600 hover:bg-green-500 text-white h-auto min-h-[4rem] px-6 py-4 text-base md:text-lg whitespace-normal leading-tight text-center">Get These Results for Your Team</Button></Link>
    </div>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Who We Are" subtitle="We're cybersecurity and engineering graduates who built a phishing training platform because the existing solutions weren't good enough." />
    <Section className="!pt-0">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="text-center md:text-left text-lg text-gray-300 leading-relaxed">
            <h3 className="text-3xl font-bold text-white mb-6">Why We Started <span className="text-primary">Human Layer Security</span></h3>
            <p className="mb-4">We studied cybersecurity and electrical engineering. We learned how attacks work. How social engineering bypasses every technical defense. How one convincing email can compromise an entire organization.</p>
            <p className="mb-4">Then we looked at how companies actually train their employees against these attacks. Annual compliance videos. Generic "be careful with emails" warnings. Boring slide decks that people click through while checking their phone.</p>
            <p className="mb-4">It doesn't work. And we knew why it doesn't work.</p>
            <p className="mb-4">Real learning happens in the moment. You don't get better at recognizing phishing by watching videos—you get better by practicing with realistic examples and getting immediate feedback when you make a mistake.</p>
            <p className="mb-4">So we built what we wished existed: a platform that tests people with realistic phishing attacks and teaches them instantly when they click. No shame. No punishment. Just practice and learning until recognizing phishing becomes instinct.</p>
            <p className="mb-4">That's HumanLayer Security.</p>
            <div className="bg-white/5 border-l-4 border-primary p-6 my-8 rounded-r-xl">
              <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">What We <span className="text-primary">Believe</span></h4>
              <p className="italic text-white/80">"Your employees aren't stupid. They're busy, distracted, and untrained. Give them realistic practice with immediate feedback, and they get better fast. That's not philosophy. That's how learning works."</p>
            </div>
            <p className="mb-4">We're not a legacy security company. We're a small team that saw a massive problem and built a solution. We're confident in what we built because we built it the right way. And we're committed to helping every company we work with actually solve their phishing problem—not just check a compliance box.</p>
          </div>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <Link to="/services"><Button>See What We Built</Button></Link>
            <Link to="/contact"><Button variant="outline">Let's Talk</Button></Link>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-surface rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">Leadership</h3>
            <div className="flex flex-col gap-8">
              {/* Nicolas */}
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-black border-2 border-primary/20 flex items-center justify-center text-xl font-bold text-white overflow-hidden relative">
                  NS
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{CONTACT_INFO.founder}</div>
                  <div className="text-primary font-mono text-xs mb-2">FOUNDER & PRINCIPAL</div>
                  <p className="text-gray-500 text-sm">Founder. FIU Cybersecurity. Built the phishing simulation engine and platform architecture.</p>
                </div>
              </div>
              {/* Alejandro */}
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-black border-2 border-primary/20 flex items-center justify-center text-xl font-bold text-white overflow-hidden relative">
                  AM
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Alejandro Marcone</div>
                  <div className="text-primary font-mono text-xs mb-2">CO-FOUNDER & CYBER ANALYST</div>
                  <p className="text-gray-500 text-sm">Co-Founder. ISIL Cybersecurity (Peru). Designed training methodology and threat analysis systems.</p>
                </div>
              </div>
              {/* Branco */}
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-black border-2 border-primary/20 flex items-center justify-center text-xl font-bold text-white overflow-hidden relative">
                  BF
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Branco Forti</div>
                  <div className="text-primary font-mono text-xs mb-2">CO-FOUNDER & ELECTRICAL ENGINEER</div>
                  <p className="text-gray-500 text-sm">Co-Founder. FIU Electrical Engineering. Built platform infrastructure and automation systems.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-surface/50">
            <p className="text-xl font-bold text-white italic">"We built this to solve a real problem. Now we're helping companies actually solve it."</p>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const Partnership = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <section className="pt-40 pb-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-30 pointer-events-none" />
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Partner <span className="text-primary">ship</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">Partner with us. Offer phishing training under your brand. Earn recurring revenue on every client.</p>
      </motion.div>
    </section>
    <Section className="relative !pt-8">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mb-24 flex flex-col md:flex-row items-center gap-16">
        {/* Mobile: Image First | Desktop: Image Left */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 relative w-full group order-1 md:order-2">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-surface/50 backdrop-blur-sm transition-all duration-500">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />

            <img src="/partnership-hero.png" alt="Strategic Partnership" className="w-full h-auto object-cover opacity-90 transition-transform duration-700 ease-out relative z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-20" />

            {/* Data Overlays matching Home Page vibe */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4 z-30">
              <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-green-400 font-mono mb-1 uppercase tracking-wider">Partnership</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">AVAILABLE</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-green-400 font-mono mb-1 uppercase tracking-wider">Revenue</div>
                <div className="text-lg font-bold text-white">RECURRING</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 space-y-8 z-10 order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">Let's Grow <span className="text-primary">Together</span></h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>If you work with businesses that need security training — MSPs, IT consultants, compliance advisors — you already know your clients need phishing protection.</p>
            <p>Building a phishing training platform would take you months and cost tens of thousands of dollars. We've already built it. White label our platform and offer it to your clients under your brand.</p>
            <p>Here's how it works: We provide the platform. You provide the client relationship. We handle infrastructure, updates, and technical support. You earn recurring revenue on every client you bring on.</p>
            <p>Your clients get better security. You get a new revenue stream. We get to help more companies. Everyone wins.</p>
          </div>
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 mb-24">
        {[
          { t: "Your Brand, Our Platform", d: "We customize the platform with your logo, your colors, your domain. Your clients see your brand on every email, dashboard, and report. You own the relationship. We power the technology behind it.", i: FileText },
          { t: "Recurring Revenue Share", d: "You bring the client. We deliver the platform. You earn a percentage of monthly subscription revenue as long as they're a customer. Build predictable, recurring income without building the technology.", i: Award },
          { t: "We Handle the Technical Side", d: "Platform questions? We'll answer them. Customer support? We'll handle it. New features? We'll build them. Security updates? We'll deploy them. You focus on your clients. We focus on making the platform excellent.", i: Users }
        ].map((s, i) => (
          <motion.div variants={fadeInUp} key={i} className="group relative p-10 rounded-[2.5rem] bg-surface/40 hover:bg-surface/60 border border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-16 h-16 mb-6 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-primary/30 transition-all duration-500 relative z-10 shadow-inner">
              <s.i className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
              {s.t.split(' ').slice(0, Math.ceil(s.t.split(' ').length / 2)).join(' ')} <span className="text-primary">{s.t.split(' ').slice(Math.ceil(s.t.split(' ').length / 2)).join(' ')}</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">{s.d}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative rounded-[3rem] overflow-hidden p-12 text-center border border-white/10 group">
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Become a <span className="text-primary">Partner</span></h2>
          <p className="text-gray-400 mb-10 text-xl leading-relaxed">We're building a network of partners who help small and medium businesses improve their security. If you work with companies that need phishing training, let's talk about working together.</p>
          <a href={`mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`}><Button size="lg" className="shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)]">Let's Discuss Partnership</Button></a>
        </div>
      </div>
    </Section>
  </div>
);



const Contact = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Start Your Defense" subtitle="Schedule a demo, get a quote, or just ask a question. We're here to help you secure your team." />

    <Section className="!pt-0">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form / Info */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-surface/50 border border-white/10 hover:border-primary/30 transition-colors">
            <Mail className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Schedule a Demo</h3>
            <p className="text-gray-400 mb-6">See the platform in action. We'll show you how to launch your first campaign in 5 minutes.</p>
            <Button className="w-full">Book 15-Min Demo</Button>
          </div>

          <div className="p-8 rounded-3xl bg-surface/50 border border-white/10 hover:border-primary/30 transition-colors">
            <Shield className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">General Inquiry</h3>
            <p className="text-gray-400 mb-6">Questions about pricing, features, or partnerships? Drop us a line.</p>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-bold text-white hover:text-primary transition-colors block mb-4">{CONTACT_INFO.email}</a>
            <p className="text-sm text-gray-500">Response time: &lt; 2 hours</p>
          </div>
        </div>

        {/* FAQ Preview */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              { q: "Is there a free trial?", a: "Yes. We offer a free 14-day trial with full access to all features. No credit card required." },
              { q: "Do you offer discounts for non-profits?", a: "Yes. We offer a 20% discount for registered non-profits and educational institutions." },
              { q: "Can I manage multiple companies?", a: "Yes. Our Partner Program is designed for MSPs and consultants who need to manage multiple clients from one dashboard." },
              { q: "What happens if I cancel?", a: "You can export all your data and reports. We keep your account active until the end of your billing cycle. No hidden fees." }
            ].map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-surface/30 border border-white/10 hover:border-primary/20 transition-colors cursor-pointer open:bg-surface/50">
                <summary className="flex justify-between items-center font-bold text-white list-none"><span>{faq.q}</span><ArrowRight className="w-4 h-4 text-primary transform group-open:rotate-90 transition-transform" /></summary>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const Legal = () => (
  <div className="pt-32 px-6 min-h-screen pb-20 bg-background text-white">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 font-display">Legal</h1>
      <div className="prose prose-invert prose-lg">
        <p>Please contact our legal department for full documentation regarding Privacy Policy and Terms of Service.</p>
        <p className="text-gray-500">Last updated: January 2026</p>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---
function App() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("min-h-screen bg-background text-white selection:bg-primary selection:text-white font-sans overflow-x-hidden transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Home />
            </motion.div>
          } />
          <Route path="/services" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Services />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <About />
            </motion.div>
          } />
          <Route path="/partnership" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Partnership />
            </motion.div>
          } />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/contact" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Contact />
            </motion.div>
          } />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      {/* CSS Marquee Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default App;
