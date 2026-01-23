import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Menu, X, CheckCircle, Users, Mail, Phone, Activity, ArrowRight, Lock, Globe, Terminal, FileText, Award, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


// --- UTILS ---
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- DATA ---
const CONTACT_INFO = { email: "nicolassunobrega2@gmail.com", phone: "3052820302", founder: "Nicolas Su Nobrega Garces" };

const QUOTES = [
  { text: "Security is not a product, but a process.", author: "Bruce Schneier" },
  { text: "Amateurs hack systems, professionals hack people.", author: "Bruce Schneier" },
  { text: "There is no patch for human stupidity.", author: "Kevin Mitnick" },
  { text: "Humans are the weakest link in security.", author: "Kevin Mitnick" },
  { text: "Social engineering is the art of deception.", author: "Kevin Mitnick" },
  { text: "The human factor is truly security's weakest link.", author: "Kevin Mitnick" },
  { text: "If you think technology can solve your security problems, then you don't understand the problems and you don't understand the technology.", author: "Bruce Schneier" }
];


// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- UI COMPONENTS ---
const Button: React.FC<React.ComponentProps<typeof motion.button> & { variant?: 'primary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }> = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
  const base = "inline-flex items-center justify-center font-display font-semibold transition-all focus:outline-none disabled:opacity-50 rounded-full cursor-pointer";
  const vars = {
    primary: "bg-primary text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] border border-transparent",
    outline: "border border-white/20 text-white hover:border-primary hover:text-primary bg-transparent hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };
  const sizes = { sm: "h-9 px-4 text-xs", md: "h-12 px-8 text-sm", lg: "h-14 px-10 text-base" };

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cn(base, vars[variant], sizes[size], className)} {...props}>
      {children}
    </motion.button>
  );
};

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={cn("py-20 md:py-24 px-6 relative overflow-hidden", className)}>
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="max-w-7xl mx-auto relative z-10">
      {children}
    </motion.div>
  </section>
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
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/humanlayerlogo.png" alt="HumanLayer Security" className="h-12 md:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-white text-lg md:text-xl tracking-tight leading-none group-hover:text-primary transition-colors">HUMANLAYER</span>
            <span className="font-display font-bold text-primary text-[10px] md:text-xs tracking-[0.2em] leading-none">SECURITY</span>
          </div>
        </Link>

        <div className="hidden md:flex gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
          {['SERVICES', 'ABOUT', 'PARTNERSHIP'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className={cn(
              "px-6 py-2 text-xs font-bold text-gray-300 hover:text-white rounded-full transition-all tracking-wide",
              location.pathname === `/${item.toLowerCase()}` ? "bg-white/10 text-white shadow-inner" : "hover:bg-white/5"
            )}>{item}</Link>
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
  <footer className="bg-black border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-4 mb-6 group">
            <img src="/humanlayerlogo.png" alt="HumanLayer Security" className="h-24 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-white text-2xl tracking-tight leading-none group-hover:text-primary transition-colors">HUMANLAYER</span>
              <span className="font-display font-bold text-primary text-sm tracking-[0.25em] leading-none">SECURITY</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-6 max-w-sm leading-tight">Securing the human operating system.</h2>
          <div className="flex gap-4">
            <Link to="/contact"><Button>Contact Us</Button></Link>
          </div>
        </div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">COMPANY</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li><li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li><li><Link to="/partnership" className="hover:text-primary transition-colors">Partnerships</Link></li></ul></div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">CONTACT</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/contact" className="hover:text-primary flex items-center gap-2">Contact Us <ArrowRight size={14} /></Link></li></ul></div>
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

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);



  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.05),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 via-primary/5 to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> System Active
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Humans are your <span className="text-primary">strongest firewall.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Is your team prepared for the next social engineering attack? We transform your workforce from a liability into a high-fidelity sensor network.
            </p>
            <div className="flex gap-4">
              <Link to="/contact"><Button size="lg" className="bg-green-600 hover:bg-green-500 shadow-green-900/20 border-green-500/20 text-white">Contact Us</Button></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative group perspective-1000">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-surface/50 backdrop-blur-sm transform transition-transform duration-700 group-hover:rotate-y-2">
              <img src="/hero-network.png" alt="Human Defense Network" className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-green-400 font-mono mb-1 uppercase tracking-wider">Human Risk</div>
                  <div className="text-2xl font-bold text-white flex items-center gap-2">MITIGATED</div>
                </div>
                <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-green-400 font-mono mb-1 uppercase tracking-wider">Resilience Score</div>
                  <div className="text-2xl font-bold text-white">99.9%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-white/5 border-y border-white/5 backdrop-blur-sm overflow-hidden py-4 flex relative z-20">
        <motion.div className="flex gap-20 whitespace-nowrap" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white/50 font-mono text-sm tracking-widest uppercase flex items-center gap-4"><Activity className="text-primary w-4 h-4" /> Your people, your strongest layer</span>
              <span className="text-white/50 font-mono text-sm tracking-widest uppercase flex items-center gap-4"><Lock className="text-primary w-4 h-4" /> Awareness is the first line of defense</span>
              <span className="text-white/50 font-mono text-sm tracking-widest uppercase flex items-center gap-4"><Shield className="text-primary w-4 h-4" /> Empowered employees, secured company</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* HOW WE WORK */}
      <Section className="bg-surface">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From user as a problem to user as a sensor. A 4-step monthly cycle.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-4 gap-4 mb-12">
          {[{ t: "Simulate", d: "We send monthly controlled phishing campaigns.", i: Mail }, { t: "Educate", d: "Instant micro-trainings for those who click.", i: FileText }, { t: "Report", d: "Comprehensive vulnerability trend analysis.", i: Activity }, { t: "Improve", d: "Hardening the human operating system over time.", i: CheckCircle }].map((s, i) => (
            <motion.div variants={fadeInUp} key={i} className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="absolute top-0 right-0 p-4 text-7xl font-bold text-white/5 font-display select-none group-hover:text-white/10 transition-colors">0{i + 1}</div>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><s.i className="w-6 h-6 text-primary" /></div>
              <h3 className="text-xl font-bold text-white mb-2">{s.t}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center">
          <Link to="/about"><Button size="lg" variant="outline">Learn More About Us</Button></Link>
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section id="services-preview">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="mb-6 md:mb-0"><h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2><p className="text-gray-400">Specialized. Focused. Effective.</p></div>
          <Button variant="outline" className="hidden md:flex" onClick={() => navigate('/services')}>All Services</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 p-10 rounded-3xl bg-surface border border-white/10 min-h-[300px] flex flex-col justify-end group transition-all hover:border-primary/30">
            <Shield className="w-12 h-12 text-primary mb-auto" />
            <h3 className="text-2xl font-bold text-white mb-2">Ethical Phishing Simulations</h3>
            <p className="text-gray-300">We don't hack systems; we test people. Controlled campaigns that identify weak points before attackers do.</p>
          </div>
          <div className="p-10 rounded-3xl bg-surface border border-white/10 flex flex-col justify-end group hover:bg-white/5 transition-colors">
            <Users className="w-12 h-12 text-white/50 mb-auto group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-bold text-white mb-2">Training</h3>
            <p className="text-gray-400">Contextual learning moments.</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/services"><Button size="lg">Explore Our Services</Button></Link>
        </div>
      </Section>

      {/* SOCIAL PROOF / VALUE PROP */}
      <Section className="bg-surface/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Why Choose Us?</h2>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Human-Centric Approach</h4>
                  <p className="text-gray-400 text-sm">We believe in empowerment, not punishment. We turn your biggest liability into your biggest asset.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">2</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Data-Driven Results</h4>
                  <p className="text-gray-400 text-sm">Measurable reduction in click rates and distinct improvement in reporting speed.</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Link to="/contact"><Button>Contact Us</Button></Link>
            </div>
          </div>
          <div className="p-8 rounded-2xl bg-black/40 border border-white/5">
            <Quote className="text-primary w-12 h-12 mb-6 opacity-50" />
            <p className="text-xl text-gray-300 italic mb-6 leading-relaxed">
              "{quote.text}"
            </p>
            <div className="text-sm font-bold text-white">- {quote.author}</div>
            <div className="mt-8">
              <Link to="/services"><Button variant="outline">See How We Work</Button></Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

// --- INNER PAGES ---
const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <section className="pt-40 pb-20 px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-30 pointer-events-none" />
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">{title}</h1>
      <p className="text-xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">{subtitle}</p>
    </motion.div>
  </section>
);

const Services = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Our Services" subtitle="We provide a full spectrum of human-centric security services, ranging from preventative education to active crisis management." />
    <Section className="!pt-0">
      <div className="grid gap-6">
        {[
          { t: "Simulated Phishing Campaigns", d: "Monthly, controlled tests using the latest threat templates. We find the gaps before the bad guys do.", i: Activity },
          { t: "Human-Centric Training", d: "Immediate, contextual feedback moments. We teach employees to recognize the signs, not just memorize rules.", i: Globe },
          { t: "Vulnerability Reporting", d: "Deep insights into which departments and individuals are targeted and most susceptible.", i: Terminal },
          { t: "Executive Workshops", d: "High-level strategy sessions for leadership to understand the human risk factor.", i: Shield },
          { t: "Spear Phishing Sims", d: "Highly targeted campaigns designed to test your C-suite's resilience against sophisticated social engineering.", i: Mail }
        ].map((s, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="flex flex-col md:flex-row gap-8 p-10 border border-white/5 bg-surface/50 rounded-2xl hover:border-primary/50 hover:bg-white/5 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(34,197,94,0.15)] border border-white/10 relative z-10">
              <s.i className="w-10 h-10 text-primary" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 text-white">{s.t}</h3>
              <p className="text-gray-400 leading-relaxed max-w-3xl mb-4 text-lg">{s.d}</p>
            </div>
            <div className="md:ml-auto flex items-center relative z-10">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors group-hover:text-black">
                <ArrowRight size={20} className="text-current" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DUPLICATED HOW WE WORK SECTION */}
      <div className="my-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From user as a problem to user as a sensor. A 4-step monthly cycle.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-4 gap-4 mb-12">
          {[{ t: "Simulate", d: "We send monthly controlled phishing campaigns.", i: Mail }, { t: "Educate", d: "Instant micro-trainings for those who click.", i: FileText }, { t: "Report", d: "Comprehensive vulnerability trend analysis.", i: Activity }, { t: "Improve", d: "Hardening the human operating system over time.", i: CheckCircle }].map((s, i) => (
            <motion.div variants={fadeInUp} key={i} className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="absolute top-0 right-0 p-4 text-7xl font-bold text-white/5 font-display select-none group-hover:text-white/10 transition-colors">0{i + 1}</div>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><s.i className="w-6 h-6 text-primary" /></div>
              <h3 className="text-xl font-bold text-white mb-2">{s.t}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center">
          <Link to="/about"><Button size="lg" variant="outline">Learn More About Us</Button></Link>
        </div>
      </div>

      <div className="mt-16 text-center bg-black/40 backdrop-blur-md p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="grid md:grid-cols-3 gap-12 mb-12 relative z-10">
          {/* STAT 1: CIRCULAR GRAPHIC */}
          <div className="flex flex-col items-center group">
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#262626" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#22C55E" strokeWidth="8" strokeDasharray="283" strokeDashoffset="180" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">37%</div>
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Avg. Phishing Click Rate (Pre-Training)</div>
          </div>

          {/* STAT 2: CENTRAL HERO GRAPHIC */}
          <div className="flex flex-col items-center group">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse filter blur-xl"></div>
              <div className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center relative bg-black/50 backdrop-blur-sm">
                <div className="text-7xl font-bold text-primary tracking-tighter drop-shadow-[0_0_15px_rgba(34,197,94,1)]">4%</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Click Rate After 6 Months</div>
          </div>

          {/* STAT 3: BAR GRAPHIC */}
          <div className="flex flex-col items-center justify-center group h-full">
            <div className="flex items-end gap-2 h-32 mb-6">
              <div className="w-6 h-10 bg-white/10 rounded-t-lg"></div>
              <div className="w-6 h-16 bg-white/20 rounded-t-lg"></div>
              <div className="w-6 h-20 bg-white/30 rounded-t-lg"></div>
              <div className="w-6 h-32 bg-primary rounded-t-lg shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div className="text-5xl font-bold text-white mb-2">8x</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Faster Incident Reporting</div>
          </div>
        </div>
        <p className="text-3xl text-white font-bold mb-10 font-display italic">"Numbers don't lie. Training works."</p>
        <Link to="/contact"><Button size="lg" className="bg-green-600 hover:bg-green-500 text-white h-auto min-h-[4rem] px-6 py-4 text-base md:text-lg whitespace-normal leading-tight text-center">Ready to get started? Contact Us</Button></Link>
      </div>
    </Section>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Who We Are" subtitle="We are a collective of former white-hat hackers, intelligence analysts, and psychological operations experts." />
    <Section className="!pt-0">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="text-center md:text-left text-lg text-gray-300 leading-relaxed">
            <h3 className="text-2xl font-bold text-white mb-4">Why We Started HumanLayer Security</h3>
            <p className="mb-4">It began with a realization during a red team engagement. We spent weeks building advanced malware, only to find the easiest way in was a simple phone call.</p>
            <p className="mb-4">The cybersecurity industry keeps buying brighter boxes and smarter firewalls, but the attackers have moved on. They aren't hacking machines anymore; they're hacking people.</p>
            <div className="bg-white/5 border-l-4 border-primary p-6 my-8 rounded-r-xl">
              <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Our Philosophy</h4>
              <p className="italic text-white/80">"Employees shouldn't be the weakest link. They should be the first line of defense."</p>
            </div>
            <p className="mb-4">We believe in a future where security awareness isn't a compliance checkbox, but a core cultural pillar. By empowering people instead of blaming them, we're changing the DNA of security culture across the globe.</p>
          </div>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <Link to="/services"><Button>Explore Our Services</Button></Link>
            <Link to="/contact"><Button variant="outline">Ready to talk? Contact Us</Button></Link>
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
                  <p className="text-gray-500 text-sm">Offensive Security Expert & Human Risk Specialist.</p>
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
                  <p className="text-gray-500 text-sm">Expert in human-centric security analysis.</p>
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
                  <p className="text-gray-500 text-sm">Technical visionary and systems architect.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-surface/50">
            <p className="text-xl font-bold text-white italic">"Call us crazy, but we believe your employees are your best defense, not your biggest risk."</p>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const Partnership = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Partnership" subtitle="Security is a team sport. We enable MSPs and agencies to offer elite human-layer defense." />
    <Section>
      <div className="mb-12 md:mb-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">We Believe in Partnerships</h2>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>At HumanLayer Security, we don't just work for organizations—we work with them. True cybersecurity isn't a product you buy; it's a culture you build. That's why we approach every client relationship as a partnership, not a transaction.</p>
            <p>Your team knows your organization better than anyone. Our expertise is in human behavior and social engineering tactics. Together, we create a security-aware culture that's authentic to your company and sustainable over time. We succeed when you succeed.</p>
            <p>As your partner, we're committed to transparency, continuous improvement, and measurable results. We don't just send phishing emails—we help you understand your human risk landscape and turn your people into your strongest defense layer.</p>
          </div>
        </div>
        <div className="bg-surface p-6 md:p-8 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          <img src="/partnership-hero.png" alt="Strategic Partnership" className="w-full h-auto object-contain relative z-10 filter drop-shadow-[0_0_30px_rgba(34,197,94,0.4)] transform hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
        {[
          { t: "White Label", d: "Deploy our high-fidelity simulations under your own brand identity.", i: FileText },
          { t: "Rev Share", d: "Earn generous recurring commissions for every client referral.", i: Award },
          { t: "Sales Support", d: "We provide technical expertise to help you close the deal.", i: Users }
        ].map((s, i) => (
          <div key={i} className="p-8 bg-surface/50 border border-white/10 rounded-2xl text-center group hover:bg-white/5 transition-all hover:border-primary/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform relative z-10 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <s.i className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white relative z-10">{s.t}</h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-surface to-background border border-white/10 rounded-3xl p-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
        <p className="text-gray-400 mb-8">Join our network of elite security providers.</p>
        <a href={`mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`}><Button size="lg">Contact Partner Team</Button></a>
      </div>
    </Section>
  </div>
);



const Contact = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Contact Us" subtitle="Ready to transform your users from risk to defense?" />
    <Section className="!pt-0">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-10 rounded-3xl bg-surface border border-white/10 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
          <Mail className="w-16 h-16 text-primary mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
          <p className="text-gray-400 mb-6">For general inquiries and partnership opportunities.</p>
          <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-bold text-primary hover:underline">{CONTACT_INFO.email}</a>
        </div>
        <div className="p-10 rounded-3xl bg-surface border border-white/10 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
          <Phone className="w-16 h-16 text-primary mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
          <p className="text-gray-400 mb-6">Speak directly with our team.</p>
          <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-bold text-primary hover:underline">{CONTACT_INFO.phone}</a>
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


  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;




